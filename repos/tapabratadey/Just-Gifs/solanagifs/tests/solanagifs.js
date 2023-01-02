// import anchor
const anchor = require('@project-serum/anchor');

// import SystemProgram
const { SystemProgram } = anchor.web3;

// run main asynchronously
const main = async () => {
  console.log('🚀 Starting test...');

  // create and set the provider.
  // letting Anchor get local environment to run code locally
  // and communicate with the frontend
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  // run rust program
  const program = anchor.workspace.Solanagif;

  // create an account keypair for Solana program to use.
  const baseAccount = anchor.web3.Keypair.generate();

  // local validator will mine the instructions in
  // startStuffOff() so we await it
  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log('📝 Your transaction signature', tx);

  // fetch data from the account and access totalGifs
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString());

  // add a new GIF
  await program.rpc.addGif(
    'https://media.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif',
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );

  // fetch totalGifs again
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 GIF Count', account.totalGifs.toString());

  // Access gif_list on the account!
  console.log('👀 GIF List', account.gifList);
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
