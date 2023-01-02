const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3
async function main(){
  console.log('start test')
  const provider = anchor.Provider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Solanatestproject
  const baseAccount = anchor.web3.Keypair.generate()
  const tx = await program.rpc.initialize({
    accounts :{
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers: [baseAccount]
  })
  console.log("📝 Your transaction signature", tx);
  

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log('gif count',account.totalGifs.toString());

  await program.rpc.addGif("gif link",{
    accounts :{
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    }
  })
  account = await program.account.baseAccount.fetch(baseAccount.publicKey)
  console.log('gif count',account.totalGifs.toString());
  console.log('gif list',account.gifList);

}

async function runMain(){
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()

// describe('solana-test-project', () => {

//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.Provider.env());

//   it('Is initialized!', async () => {
//     // Add your test here.
//     const program = anchor.workspace.SolanaTestProject;
//     const tx = await program.rpc.initialize();
//     console.log("Your transaction signature", tx);
//   });
// });
