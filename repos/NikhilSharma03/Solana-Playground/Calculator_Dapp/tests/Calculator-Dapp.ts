import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { CalculatorDapp } from "../target/types/calculator_dapp";

describe("Calculator-Dapp", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.CalculatorDapp as Program<CalculatorDapp>;

  it("Create a calculator!", async () => {
    await program.rpc.create("Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [calculator],
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.greeting === "Solana");
  });

  it("Add the numbers", async () => {
    await program.rpc.add(new anchor.BN(5), new anchor.BN(5), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(10)));
  });

  it("Subtract the numbers", async () => {
    await program.rpc.sub(new anchor.BN(10), new anchor.BN(5), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(5)));
  });

  it("Multiply the number", async () => {
    await program.rpc.mul(new anchor.BN(5), new anchor.BN(5), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(25)));
  });

  it("Divide the numbers", async () => {
    await program.rpc.div(new anchor.BN(6), new anchor.BN(5), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(1)));
    assert.ok(account.remainder.eq(new anchor.BN(1)));
  });
});
