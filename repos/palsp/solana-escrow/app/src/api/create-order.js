import { Provider, web3 } from "@project-serum/anchor";
import { findPDAAccount, findProductAccountAddress } from ".";
import { ESCROW_VAULT_SEED, NATIVE_SOL } from "../utils";
import store from "@/store";
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const createOrder = async (
  { wallet, program, connection, provider },
  product
) => {
  if (product.mint === NATIVE_SOL.mintAddress) {
    return createOrderOfSol({ wallet, program }, product);
  }
  const [productAccount] = await findProductAccountAddress(
    product.seller,
    product.name,
    program.value.programId
  );

  const tokenAccounts = store.getters["wallet/tokenAccounts"];

  const ataAccountInfo = tokenAccounts[product.mint];

  if (!ataAccountInfo) throw new Error("You must have token account");

  const tempTokenAccountKeypair = web3.Keypair.generate();

  const createTempAccountIx = web3.SystemProgram.createAccount({
    programId: TOKEN_PROGRAM_ID,
    space: AccountLayout.span,
    lamports: await connection.getMinimumBalanceForRentExemption(
      AccountLayout.span
    ),
    fromPubkey: wallet.value.publicKey,
    newAccountPubkey: tempTokenAccountKeypair.publicKey,
  });

  const initTempTokenAccountIx = Token.createInitAccountInstruction(
    TOKEN_PROGRAM_ID,
    new web3.PublicKey(product.mint),
    tempTokenAccountKeypair.publicKey,
    wallet.value.publicKey
  );

  const ataAccountPubkey = new web3.PublicKey(
    ataAccountInfo.tokenAccountAddress
  );
  const transferTokenToTempAccountIx = Token.createTransferInstruction(
    TOKEN_PROGRAM_ID,
    ataAccountPubkey,
    tempTokenAccountKeypair.publicKey,
    wallet.value.publicKey,
    [],
    product.price.toNumber()
  );

  const createOrderIx = await program.value.instruction.createOrder({
    accounts: {
      buyer: wallet.value.publicKey,
      productAccount,
      tempTokenAccount: tempTokenAccountKeypair.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
  });

  const tx = new web3.Transaction().add(
    createTempAccountIx,
    initTempTokenAccountIx,
    transferTokenToTempAccountIx,
    createOrderIx
  );

  return provider.value.send(tx, [tempTokenAccountKeypair]);
};

export const createOrderOfSol = async ({ wallet, program }, product) => {
  const [productAccount] = await findProductAccountAddress(
    product.seller,
    product.name,
    program.value.programId
  );

  const [pdaAccount] = await findPDAAccount(
    [Buffer.from(ESCROW_VAULT_SEED)],
    program.value.programId
  );

  return program.value.rpc.createOrderSol({
    accounts: {
      buyer: wallet.value.publicKey,
      productAccount,
      pdaAccount,
      systemProgram: web3.SystemProgram.programId,
    },
  });
};
