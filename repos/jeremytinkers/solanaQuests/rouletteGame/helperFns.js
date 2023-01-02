function randomNumber(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

function totalAmtToBePaid(amountStaked) {
  if (amountStaked > 2 || amountStaked <= 0) {
    console.log("Please enter a valid bidding amount");
    return { valid: false };
  }
  return { valid: true, amountStaked };
}

function getReturnAmount(amountStaked, ratioStaking) {
  //took an assumption here for now, as solana can airdrop 2SOL max at a time
  //and airdroping a number bigger than 2 in several airdrop calls causes the server to be overwhelmed
  const actualAmt = amountStaked * ratioStaking;
  if (actualAmt > 2) {
    return 2;
  }
  return actualAmt;
}

export { randomNumber, totalAmtToBePaid, getReturnAmount };
