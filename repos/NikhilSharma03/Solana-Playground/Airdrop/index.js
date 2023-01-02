const {
  Keypair,
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

/**
 * Generates new wallet.
 *
 * @returns {Keypair} keypair of wallet.
 */
const generateWallet = () => {
  const keypair = Keypair.generate();
  return keypair;
};

/**
 * Returns wallet balance
 *
 * @param {PublicKey} walletAddress The wallet to check balance of.
 * @returns {Promise<number>} balance of the wallet.
 */
const getBalance = async (walletAddress) => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const balance = await connection.getBalance(walletAddress, "confirmed");
    return balance;
  } catch (err) {
    throw new Error("failed to get balance");
  }
};

/**
 * Airdrops sol to the provided wallet address
 *
 * @param {PublicKey} walletAddress The wallet to drop sol.
 * @param {number} quantity The number of SOLs to airdrop.
 */
const airdropSol = async (walletAddress, quantity) => {
  console.log("Airdrop", quantity, "SOL...");
  try {
    const connection = new Connection(clusterApiUrl("devnet"));
    const signature = await connection.requestAirdrop(
      walletAddress,
      quantity * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(signature);
  } catch (err) {
    throw new Error("failed to airdrop SOL");
  }
};

const main = async () => {
  const wallet = generateWallet();
  const publicKey = wallet.publicKey;

  try {
    const balance = await getBalance(publicKey);
    console.log("Wallet Balance:", balance / LAMPORTS_PER_SOL, "SOL");
  } catch (err) {
    console.log(err);
    return;
  }

  try {
    await airdropSol(publicKey, 2);
  } catch (err) {
    console.log(err);
    return;
  }

  try {
    const latestBalance = await getBalance(publicKey);
    console.log("Wallet Balance:", latestBalance / LAMPORTS_PER_SOL, "SOL");
  } catch (err) {
    console.log(err);
    return;
  }
};

main();
