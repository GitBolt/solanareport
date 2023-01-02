import { web3 } from "@project-serum/anchor";
import { findProductAccountAddress } from ".";

export const updateShippingDetail = async (
  { wallet, program, provider },
  product,
  trackingID
) => {
  const [productAccount] = await findProductAccountAddress(
    product.seller,
    product.name,
    program.value.programId
  );

  const updateShipmentIX = program.value.instruction.updateShippingDetail(
    trackingID,
    {
      accounts: {
        authority: wallet.value.publicKey,
        productAccount,
      },
    }
  );

  // MOCK
  const fulfillIX = program.value.instruction.fulfillShippingDetail({
    accounts: {
      authority: wallet.value.publicKey,
      productAccount,
    },
  });

  const tx = new web3.Transaction();
  tx.add(updateShipmentIX, fulfillIX);

  return provider.value.send(tx);
};
