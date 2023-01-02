const {
  Keypair,
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");
const {
  createMint,
  getMint,
  getOrCreateAssociatedTokenAccount,
  getAccount,
  mintTo,
} = require("@solana/spl-token");

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
 * Airdrops sol to the provided wallet address.
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

/**
 * Creates a new fungible token.
 *
 * @param {Keypair} payer Payer of the transaction and initialization fees
 * @param {PublicKey} mintAuthority The PublicKey of Account that will control minting
 * @param {PublicKey} freezeAuthority The PublicKey of Optional account that can freeze
 * @returns {Promise<string>} The address of newly created fungible token
 */
const createFungibleToken = async (payer, mintAuthority, freezeAuthority) => {
  console.log("Creating new token...");
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const mint = await createMint(
      connection,
      payer,
      mintAuthority,
      freezeAuthority,
      9
    );

    return mint.toBase58();
  } catch (err) {
    throw new Error("failed to create token");
  }
};

/**
 * Returns mint supply
 *
 * @param {PublicKey} mint The mint token
 * @returns {Promise<bigint>} Supply of mint
 */
const getMintSupply = async (mint) => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const mintInfo = await getMint(connection, mint);
    return mintInfo.supply;
  } catch (err) {
    throw new Error("failed to return mint supply");
  }
};

/**
 * Creates a new account to hold the balance of token
 *
 * @param {Keypair} payer Payer of the transaction and initialization fees
 * @param {PublicKey} mint The mint of token
 * @returns {Promise<string>} The address of token account
 */
const createTokenAccount = async (payer, mint) => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey
    );
    return tokenAccount.address.toBase58();
  } catch (err) {
    throw new Error("failed to create account for token");
  }
};

/**
 * Returns amount of token
 *
 * @param {PublicKey} address The account address
 * @returns {Promise<bigint>} Returns amount of token
 */
const getAccountAmount = async (address) => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const tokenAccountInfo = await getAccount(connection, address);
    return tokenAccountInfo.amount;
  } catch (err) {
    throw new Error("failed to get account amount");
  }
};

/**
 * Mints token
 *
 * @param {Keypair} payer The payer of transactions
 * @param {PublicKey} mint The address of token mint
 * @param {PublicKey} destinationAddress The address of destination account
 * @param {Keypair} mintAuthority The address of mintAuthority account
 * @param {number} amount The mint amount
 */
const mintToken = async (
  payer,
  mint,
  destinationAddress,
  mintAuthority,
  amount
) => {
  console.log("Minting token...");
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    await mintTo(
      connection,
      payer,
      mint,
      destinationAddress,
      mintAuthority,
      amount * LAMPORTS_PER_SOL
    );
  } catch (err) {
    throw new Error("failed to mint token");
  }
};

const main = async () => {
  // Generate wallet
  const wallet = generateWallet();
  const publicKey = wallet.publicKey;
  // Airdrop 1 SOL
  try {
    await airdropSol(publicKey, 1);
  } catch (err) {
    console.log(err);
    return;
  }
  // Creating new token
  let minttoken;
  const mintAuthority = generateWallet();
  const freezeAuthority = generateWallet();
  try {
    minttoken = await createFungibleToken(
      wallet,
      mintAuthority.publicKey,
      freezeAuthority.publicKey
    );
    console.log(minttoken);
  } catch (err) {
    console.log(err);
    return;
  }
  // Check supply
  try {
    const mint = new PublicKey(minttoken);
    const mintSupply = await getMintSupply(mint);
    console.log("Supply :", mintSupply.toString());
  } catch (err) {
    console.log(err);
    return;
  }
  // Create Associated Token Account
  let tokenAccount;
  try {
    const mint = new PublicKey(minttoken);
    tokenAccount = await createTokenAccount(wallet, mint);
    console.log("Token Account:", tokenAccount);
  } catch (err) {
    console.log(err);
    return;
  }
  // Get Account amount
  try {
    const address = new PublicKey(tokenAccount);
    const tokenAmount = await getAccountAmount(address);
    console.log("Amount:", tokenAmount.toString());
  } catch (err) {
    console.log(err);
    return;
  }
  // Mint Tokens
  try {
    const mint = new PublicKey(minttoken);
    const destination = new PublicKey(tokenAccount);
    const amount = 100;
    await mintToken(wallet, mint, destination, mintAuthority, amount);
    console.log("Minted", amount, "token");
  } catch (err) {
    console.log(err);
    return;
  }
  // Check supply
  try {
    const mint = new PublicKey(minttoken);
    const mintSupply = await getMintSupply(mint);
    console.log("Supply :", mintSupply.toString());
  } catch (err) {
    console.log(err);
    return;
  }
  // Get Account amount
  try {
    const address = new PublicKey(tokenAccount);
    const tokenAmount = await getAccountAmount(address);
    console.log("Amount:", tokenAmount.toString());
  } catch (err) {
    console.log(err);
    return;
  }
};

main();
