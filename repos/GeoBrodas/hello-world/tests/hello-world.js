const anchor = require('@project-serum/anchor');
const { assert } = require('chai');

describe('hello-world test program', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const provider = anchor.getProvider();

  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.HelloWorld;
    const accountKey = anchor.web3.Keypair.generate();

    const tx = await program.methods
      .initialize('Hello World!')
      .accounts({
        helloWorld: accountKey.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers(accountKey)
      .rpc();

    console.log('Your transaction signature', tx);
  });

  it('fetch all accounts', async () => {
    const program = anchor.workspace.HelloWorld;
    const accounts = await program.account.helloWorld.all();
    console.log(accounts);

    assert.ok(accounts.length === 1);
  });
});
