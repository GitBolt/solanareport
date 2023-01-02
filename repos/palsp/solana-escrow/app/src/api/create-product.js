import { web3, BN, Provider } from "@project-serum/anchor";
import { getTokenAccounts, createAssociateTokenAccount } from "@/utils";
import { PublicKey } from "@solana/web3.js";
import { NATIVE_SOL, getTokenSymbolByMintAddress } from "@/utils/tokens";
import { findProductAccountAddress } from ".";

export const createProduct = async (
  { wallet, program, connection },
  productData,
  mintAddress
) => {
  if (mintAddress === NATIVE_SOL.mintAddress) {
    return createProductOfSol({ wallet, program }, productData);
  }
  const [productAccount, productAccountBump] = await findProductAccountAddress(
    wallet.value.publicKey,
    productData.name,
    program.value.programId
  );
  const tokenAccounts = await getTokenAccounts({ connection, wallet });

  let tokenAccount = tokenAccounts[mintAddress];
  const transactions = [];
  if (!tokenAccount) {
    tokenAccount = await createAssociateTokenAccount(
      { wallet },
      mintAddress,
      transactions
    );
  }

  const token = getTokenSymbolByMintAddress(mintAddress);
  const price = new BN(+productData.price * 1 * 10 ** token.decimals);

  const txid = await program.value.rpc.initializeProduct(
    productData.name,
    productAccountBump,
    price,
    new BN(productData.lockPeriod),
    {
      accounts: {
        authority: wallet.value.publicKey,
        productAccount,
        tokenToReceiveAccount: new PublicKey(tokenAccount.tokenAccountAddress),
        systemProgram: web3.SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
      preInstructions: transactions,
    }
  );

  return [txid, productAccount];
};

export const createProductOfSol = async ({ wallet, program }, productData) => {
  const [productAccount, productAccountBump] = await findProductAccountAddress(
    wallet.value.publicKey,
    productData.name,
    program.value.programId
  );

  const txid = await program.value.rpc.initializeProductSol(
    productData.name,
    productAccountBump,
    new BN(+productData.price * 1 * 10 ** NATIVE_SOL.decimals),
    new BN(productData.lockPeriod),
    {
      accounts: {
        authority: wallet.value.publicKey,
        productAccount,
        systemProgram: web3.SystemProgram.programId,
      },
    }
  );

  return [txid, productAccount];
};
