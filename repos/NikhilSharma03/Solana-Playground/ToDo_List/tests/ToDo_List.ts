import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { ToDoList } from "../target/types/to_do_list";

describe("ToDo List", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const todoList = anchor.web3.Keypair.generate();
  const program = anchor.workspace.ToDoList as Program<ToDoList>;

  it("Creates todo list", async () => {
    await program.rpc.create("Solana", {
      accounts: {
        todoList: todoList.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [todoList],
    });

    const todo = await program.account.toDoList.fetch(todoList.publicKey);
    assert.ok(todo.userName === "Solana");
  });

  it("Creates a new task in the list", async () => {
    await program.rpc.newTask("Learn Anchor", {
      accounts: {
        todoList: todoList.publicKey,
      },
    });

    const todo = await program.account.toDoList.fetch(todoList.publicKey);
    assert.ok(todo.tasks.length === 1);
    assert.ok(todo.tasks.at(0) === "Learn Anchor");
  });
});
