import { BN } from "@project-serum/anchor";

export class TokenAmount {
  constructor(wei, decimals = 0, isWei = true) {
    this.decimals = decimals;
    this._decimals = new BN(10).pow(new BN(decimals));

    if (isWei) {
      this.wei = new BN(wei);
    } else {
      this.wei = new BN(wei).mul(this._decimals);
    }
  }

  toEther() {
    return this.wei.div(this._decimals);
  }

  toWei() {
    return this.wei;
  }

  isNullOrZero() {
    return this.wei.isZero();
  }
  // + plus
  // - minus
  // × multipliedBy
  // ÷ dividedBy
}

export function lt(a, b) {
  const valueA = new BN(a);
  const valueB = new BN(b);

  return valueA.lt(valueB);
}
