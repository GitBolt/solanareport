import { cloneDeep } from "lodash";

export const NATIVE_SOL = {
  symbol: "SOL",
  name: "Native Solana",
  mintAddress: "11111111111111111111111111111111",
  decimals: 9,
};

export const TOKENS = {
  WSOL: {
    symbol: "WSOL",
    name: "Wrapped Solana",
    mintAddress: "So11111111111111111111111111111111111111112",
    decimals: 9,
  },
};

export const TOKENS_SYMBOL = { NATIVE_SOL, ...TOKENS };

export const getTokenSymbolByMintAddress = (mintAddress) => {
  if (mintAddress === NATIVE_SOL.mintAddress) {
    return cloneDeep(NATIVE_SOL);
  }

  const token = Object.values(TOKENS).find(
    (item) => item.mintAddress === mintAddress
  );
  return token ? cloneDeep(token) : null;
};
