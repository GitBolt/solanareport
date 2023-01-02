const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('myepicproject', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Myepicproject;
  // Create an account keypair for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();

  it('Is initialized!', async function () {
    // Add your test here.
    const tx = await program.rpc.initialize();
    console.log("📝 Your transaction signature", tx);
  });

  it("Is retrieving", async function () {
    // Call start_stuff_off, pass it the params it needs!
    let tx = await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    console.log("📝 Your transaction signature", tx);

    // Fetch data from the account.
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString())
  })

  it("Is adding", async function () {
    // You'll need to now pass a GIF link to the function!
    await program.rpc.addGif("insert_a_giphy_link_here", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    // Call the account.
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString())

    // Access gif_list on the account!
    console.log('👀 GIF List', account.gifList)
  })
});
