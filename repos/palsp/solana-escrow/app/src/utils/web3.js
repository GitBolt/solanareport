import { web3 } from "@project-serum/anchor";
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { findAssociateTokenAddress } from ".";

export const createAssociateTokenAccount = async (
  { wallet },
  mintAddress,
  transactions
) => {
  const tx = new web3.Transaction();
  const tokenAccountAddress = await findAssociateTokenAddress(
    wallet,
    mintAddress
  );

  const createATAIX = Token.createAssociatedTokenAccountInstruction(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    new PublicKey(mintAddress),
    tokenAccountAddress,
    wallet.value.publicKey,
    wallet.value.publicKey
  );

  const tokenAccount = {
    tokenAccountAddress: tokenAccountAddress.toBase58(),
  };

  tx.add(createATAIX);
  transactions.push(tx);

  return tokenAccount;
};
