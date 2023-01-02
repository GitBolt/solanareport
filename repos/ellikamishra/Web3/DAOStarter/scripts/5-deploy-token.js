import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule("0x91b841cDC106D866732f8B90d1F97D8F890110D3");

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: "ChaiKiTapriDAO Governance Token",
      // What's your token's symbol? Ex. "ETH"
      symbol: "Tapri",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();
//address of token contract
//Successfully deployed token module, address: 0x3418AA364aAddbFF91Ed0d74D415C4c4D2Fe6324