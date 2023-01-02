import { web3 } from "@project-serum/anchor";

export const findProductAccountAddress = (
  sellerPubkey,
  productName,
  programId
) => {
  return web3.PublicKey.findProgramAddress(
    [sellerPubkey.toBuffer(), Buffer.from(productName)],
    programId
  );
};

export const findPDAAccount = (seeds, programId) => {
  return web3.PublicKey.findProgramAddress(seeds, programId);
};
