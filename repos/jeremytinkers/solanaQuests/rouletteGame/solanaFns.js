import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  Transaction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  SystemProgram,
} from "@solana/web3.js";

const gamePair = new Keypair();
const userPair = new Keypair();

const gamePublicKey = new PublicKey(gamePair._keypair.publicKey).toString();
const gameSecretKey = gamePair._keypair.secretKey;

const userPublicKey = new PublicKey(userPair._keypair.publicKey).toString();
const userSecretKey = userPair._keypair.secretKey;

const getWalletBalance = async (publicKey) => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(new PublicKey(publicKey));
    console.log(`Wallet address ${publicKey}`);
    console.log(`Balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`);
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async (prizeMoney, publicKey) => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    console.log(`Airdropping ${prizeMoney} SOL`);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(publicKey),
      prizeMoney * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

const transferSOL = async (
  fromPublicKey,
  fromKeyPair,
  toPublicKey,
  transferAmt
) => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(fromPublicKey),
        toPubkey: new PublicKey(toPublicKey),
        lamports: transferAmt * LAMPORTS_PER_SOL,
      })
    );
    console.log(transaction);
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      fromKeyPair,
    ]);
    console.log("Payment Transaction Signature : " + signature);
  } catch (err) {
    console.log(err);
  }
};

// For testing:-
// const driverFunction = async () => {
//   await getWalletBalance(userPublicKey);
//   await airDropSol(1, userPublicKey);
//   await getWalletBalance(userPublicKey);
//   await transferSOL(userPublicKey, userPair, gamePublicKey, 0.4);
//   await getWalletBalance(gamePublicKey);
//   await getWalletBalance(userPublicKey);
// };

// driverFunction();

export { transferSOL, getWalletBalance, airDropSol, gamePair, userPair };
