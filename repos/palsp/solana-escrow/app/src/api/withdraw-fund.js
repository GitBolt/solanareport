import { web3 } from "@project-serum/anchor";
import store from "@/store";
import { findPDAAccount, findProductAccountAddress } from ".";
import { ESCROW_VAULT_SEED, NATIVE_SOL } from "../utils";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const withdrawFund = async ({ wallet, program }, product) => {
  if (product.mint === NATIVE_SOL.mintAddress) {
    return withdrawSol({ wallet, program }, product);
  }
  const [productAccount] = await findProductAccountAddress(
    product.seller,
    product.name,
    program.value.programId
  );

  const tokenAccounts = store.getters["wallet/tokenAccounts"];
  const ataAccountInfo = tokenAccounts[product.mint];

  const ataAccountPubkey = new web3.PublicKey(
    ataAccountInfo.tokenAccountAddress
  );

  return program.value.rpc.withdrawFund({
    accounts: {
      authority: wallet.value.publicKey,
      productAccount,
      tempTokenAccount: product.tempTokenAccountPubkey,
      sellerTokenToReceiveAccount: ataAccountPubkey,
      tokenProgram: TOKEN_PROGRAM_ID,
    },
  });
};
export const withdrawSol = async ({ wallet, program }, product) => {
  const [productAccount] = await findProductAccountAddress(
    product.seller,
    product.name,
    program.value.programId
  );
  const [pdaAccount] = await findPDAAccount(
    [Buffer.from(ESCROW_VAULT_SEED)],
    program.value.programId
  );

  return program.value.rpc.withdrawSol({
    accounts: {
      authority: wallet.value.publicKey,
      productAccount,
      pdaAccount,
      systemProgram: web3.SystemProgram.programId,
    },
  });
};
