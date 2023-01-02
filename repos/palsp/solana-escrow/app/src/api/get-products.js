import { PublicKey } from "@solana/web3.js";
import { Product } from "../models";

export const getProducts = async ({ program }, filters = []) => {
  const _products = await program.value.account.product.all(filters);
  const products = _products.map(
    (product) => new Product(product.publicKey, product.account)
  );
  return products;
};

export const sellerFilter = (sellerBase58Pubkey) => ({
  memcmp: {
    offset: 8,
    bytes: sellerBase58Pubkey,
  },
});

export const buyerFilter = (buyerBase58Pubkey) => ({
  memcmp: {
    offset:
      8 + // Discriminator.
      32, // seller pubkey.
    bytes: buyerBase58Pubkey,
  },
});

export const getProductByID = async ({ program }, productPubkeyBase58) => {
  const productPubkey = new PublicKey(productPubkeyBase58);

  const product = await program.value.account.product.fetch(productPubkey);
  return new Product(productPubkey, product);
};
