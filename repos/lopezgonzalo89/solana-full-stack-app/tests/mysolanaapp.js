const assert = require("assert");
const anchor = require("@project-serum/anchor");
const web3 = require("@solana/web3.js");

const { SystemProgram } = anchor.web3;
const { PublicKey } = web3;

describe("MySolanaApp", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  let _baseAccount;

  const program = anchor.workspace.Mysolanaapp;

  it("Initialize", async () => {
    const [programAccountPDA] = await PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("initialize")],
      program.programId
    );

    console.log("programAccountPDA: ", programAccountPDA.toString());

    await program.methods
      .initialize()
      .accounts({
        programAccount: programAccountPDA,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([])
      .rpc({
        commitment: "confirmed",
      });

    const programAccount = await program.account.programAccount.fetch(
      programAccountPDA
    );

    console.log("Count 0: ", programAccount.count.toString());
    assert.ok(programAccount.count.toString() == 0);
  });

  it("Creates and initializes an account in a single atomic transaction (simplified)", async () => {
    const baseAccount = anchor.web3.Keypair.generate();

    await program.methods
      .create()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc({
        commitment: "confirmed",
      });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Count 0: ", account.count.toString());
    assert.ok(account.count.toString() == 0);
    _baseAccount = baseAccount;
  });

  it("Updates a previously created account", async () => {
    // ACCOUNT 1
    const baseAccount = _baseAccount;

    const [programAccountPDA] = await PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("initialize")],
      program.programId
    );

    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
        programAccount: programAccountPDA,
      },
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Count 1: ", account.count.toString());
    assert.ok(account.count.toString() == 1);

    // ACCOUNT 2
    const baseAccount2 = anchor.web3.Keypair.generate();

    await program.methods
      .create()
      .accounts({
        baseAccount: baseAccount2.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([baseAccount2])
      .rpc({
        commitment: "confirmed",
      });

    let account2 = await program.account.baseAccount.fetch(
      baseAccount2.publicKey
    );
    console.log("Count 0: ", account2.count.toString());
    assert.ok(account2.count.toString() == 0);

    await program.methods
      .increment()
      .accounts({
        baseAccount: baseAccount2.publicKey,
        programAccount: programAccountPDA,
      })
      .rpc({
        commitment: "confirmed",
      });

    account2 = await program.account.baseAccount.fetch(baseAccount2.publicKey);

    console.log("Count 1: ", account2.count.toString());
    assert.ok(account2.count.toString() == 1);

    // TOTAL PROGRAM COUNT
    const accountPDA = await program.account.programAccount.fetch(
      programAccountPDA
    );

    console.log("Count 2: ", accountPDA.count.toString());
    assert.ok(accountPDA.count.toString() == 2);
  });
});
