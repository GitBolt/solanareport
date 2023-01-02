import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { lt, TokenAmount } from "@/models";
import { NATIVE_SOL } from "./tokens";
import { PublicKey } from "@solana/web3.js";

export const findAssociateTokenAddress = (wallet, tokenMintAddress) => {
  return Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    new PublicKey(tokenMintAddress),
    wallet.value.publicKey
  );
};

export const getTokenAccounts = async ({ connection, wallet }) => {
  const parsedTokenAccount = await connection.getParsedTokenAccountsByOwner(
    wallet.value.publicKey,
    {
      programId: TOKEN_PROGRAM_ID,
    },
    "confirmed"
  );
  const tokenAccounts = {};
  for (const tokenAccountInfo of parsedTokenAccount.value) {
    const tokenAccountPubKey = tokenAccountInfo.pubkey;
    const tokenAccountAddress = tokenAccountInfo.pubkey.toBase58();
    const parsedInfo = tokenAccountInfo.account.data.parsed.info;
    const mintAddress = parsedInfo.mint;
    const balance = new TokenAmount(
      parsedInfo.tokenAmount.amount,
      parsedInfo.tokenAmount.decimals
    );

    const ata = await findAssociateTokenAddress(wallet, mintAddress);

    if (ata.equals(tokenAccountPubKey)) {
      tokenAccounts[mintAddress] = {
        tokenAccountAddress,
        balance,
      };
    }
  }

  const solBalance = await connection.getBalance(
    wallet.value.publicKey,
    "confirmed"
  );
  tokenAccounts[NATIVE_SOL.mintAddress] = {
    tokenAccountAddress: wallet.value.publicKey.toBase58(),
    balance: new TokenAmount(solBalance, NATIVE_SOL.decimals),
  };

  return tokenAccounts;
};
