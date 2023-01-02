const anchor = require('@project-serum/anchor');

// Need the system program, will talk about this soon.
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("🚀 Starting test ...");
  // tell Anchor to set our provider. this data comes from solana config get
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  // automatically compile lib.rs and deploy to a validator
  const program = anchor.workspace.Project2SolanaGifPortalStarterContract;

  // Create an account keypair for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();

  // we call our function and await for a validator to "mine" the instruction
  const transaction = await program.rpc.startStuffOff({
    // pass in the parameters we want to pass to our function
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("Your transaction signature:", transaction);

  // Fetch data from the account.
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString())

  // Call add_gif!
  // added a parameter to our function with the url of the gif
  await program.rpc.addGif("https://giphy.com/gifs/youblewit-you-blew-it-3oKIPyqTWsP720AOXe", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  // Get the account again to see what changed.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString())

  // Access gif_list on the account!
  console.log('👀 GIF List', account.gifList)
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
