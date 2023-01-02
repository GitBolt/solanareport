import { getTokenSymbolByMintAddress } from "@/utils";

export class Product {
  constructor(publicKey, productData) {
    this.publicKey = publicKey;
    if (!productData) {
      this.name = "";
      this.description = "";
      this.price = 0;
      this.lockPeriod = 0;
    } else {
      this.name = String.fromCharCode.apply(null, productData.name).trim();
      this.price = productData.price;
      this.lockPeriod = productData.lockPeriod;
      this.seller = productData.seller;
      this.buyer = productData.buyer;
      this.stage = Object.keys(productData.stage)[0];
      this.mint = productData.mintPubkey.toBase58();
      const token = getTokenSymbolByMintAddress(this.mint);
      this.priceEther = this.price / (1 * 10 ** token.decimals);
      this.tokenSymbol = token.symbol;
      this.tempTokenAccountPubkey = productData.tempTokenAccountPubkey;
    }
  }
  get publicKeyBase58() {
    return this.publicKey ? this.publicKey.toBase58() : null;
  }

  get imageUrl() {
    return "https://picsum.photos/200";
  }
}

export const stage = {
  initiate: "initiate",
  waitForShipping: "waitForShipping",
  shippingInProgress: "shippingInProgress",
  delivered: "delivered",
};
