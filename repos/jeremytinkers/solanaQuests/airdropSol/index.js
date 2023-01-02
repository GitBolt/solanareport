const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const newPair = new Keypair();

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
// console.log(publicKey);
const secretKey = newPair._keypair.secretKey;
// console.log(secretKey);

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(secretKey);
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    console.log(`Wallet address ${publicKey}`);
    console.log(`Balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`);
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    console.log("Airdropping 1 SOL");
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      1 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

const driverFunction = async () => {
  console.log("Before Airdrop");
  await getWalletBalance();
  await airDropSol();
  console.log("After Airdrop");
  await getWalletBalance();
};

driverFunction();
