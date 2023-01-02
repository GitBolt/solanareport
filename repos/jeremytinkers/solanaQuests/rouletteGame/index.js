import {
  getReturnAmount,
  randomNumber,
  totalAmtToBePaid,
} from "./helperFns.js";

import {
  transferSOL,
  getWalletBalance,
  airDropSol,
  userPair,
  gamePair,
} from "./solanaFns.js";
import prompt from "prompt";

async function driverFunction() {
  //intialize UserWallet with some balance , here 4SOL
  try {
    await airDropSol(2, userPair.publicKey);
    await getWalletBalance(userPair.publicKey);
  } catch (error) {
    console.log(error);
  }

  prompt.start();

  prompt.get(["amountStaked", "ratioStaking"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    if (!totalAmtToBePaid(result.amountStaked).valid) {
      process.exit();
    } else {
      console.log(`You need to pay ${result.amountStaked} to proceed`);
      try {
        async function f1() {
          await transferSOL(
            userPair.publicKey,
            userPair,
            gamePair.publicKey,
            result.amountStaked
          );
        }

        f1();

        console.log(
          `Guess the right random no, from between 1 to 5. You stand a chance to win ${getReturnAmount(
            result.amountStaked,
            result.ratioStaking
          )}`
        );
        const rno = randomNumber(1, 5);
        // console.log(rno);
        let amtStaked = result.amountStaked;
        let ratioStaking = result.ratioStaking;
        prompt.get(["userGuess"], function (err, result) {
          if (err) {
            return onErr(err);
          }
          if (Number(result.userGuess) === rno) {
            console.log("You have guessed accurately!");
            try {
              //airdrop to user
              async function f2() {
                const amt = getReturnAmount(
                  amtStaked,
                  ratioStaking
                );
                console.log(amt);
                await airDropSol(amt, userPair.publicKey);
                await getWalletBalance(userPair.publicKey);
              }
              f2();
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log("You have guessed incorrectly!");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
}

driverFunction();
