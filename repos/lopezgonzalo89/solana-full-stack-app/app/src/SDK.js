import { PublicKey } from "@solana/web3.js";
import { Program, web3, utils } from "@project-serum/anchor";
import idl from "./idl.json";

const getErc20RouterContract = (idl, provider) => {
  const programID = new PublicKey(idl.metadata.address);
  const erc20RouterContract = new Program(idl, programID, provider);
  return erc20RouterContract;
};

const { SystemProgram } = web3;

class RouterSDK {
  constructor(signerOrProvider, optionalParams, chainType) {
    return (() => {
      this.signerOrProvider = signerOrProvider;
      this.ERC20RouterIDL = idl;
      this.chainType = chainType;

      const contractsTypes = {
        SOLANA: {
          erc20RouterContract: getErc20RouterContract(
            this.ERC20RouterIDL,
            this.signerOrProvider
          ),
        },
      };

      this.erc20RouterContract =
        contractsTypes[this.chainType].erc20RouterContract;
    })();
  }

  async initialize() {
    const [programAccountPDA] = await PublicKey.findProgramAddress(
      [utils.bytes.utf8.encode("initialize")],
      this.erc20RouterContract.programId
    );

    await this.erc20RouterContract.methods
      .initialize()
      .accounts({
        programAccount: programAccountPDA,
        user: this.signerOrProvider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([])
      .rpc({
        commitment: "confirmed",
      });
  }

  async createCounter(baseAccount) {
    await this.erc20RouterContract.methods
      .create()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: this.signerOrProvider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers(baseAccount)
      .rpc({
        commitment: "confirmed",
      });

    const { count } = await this.erc20RouterContract.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    return count.toString();
  }

  async increment(baseAccount) {
    const [programAccountPDA] = await PublicKey.findProgramAddress(
      [utils.bytes.utf8.encode("initialize")],
      this.erc20RouterContract.programId
    );

    await this.erc20RouterContract.methods
      .increment()
      .accounts({
        baseAccount: baseAccount.publicKey,
        programAccount: programAccountPDA,
      })
      .rpc({
        commitment: "confirmed",
      });

    const { count } = await this.erc20RouterContract.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    return count.toString();
  }

  async totalProgramCount() {
    const [programAccountPDA] = await PublicKey.findProgramAddress(
      [utils.bytes.utf8.encode("initialize")],
      this.erc20RouterContract.programId
    );

    const programAccount =
      await this.erc20RouterContract.account.programAccount.fetch(
        programAccountPDA
      );

    console.log("Count: ", programAccount.count.toString());
    return programAccount.count.toString();
  }
}

export { RouterSDK };
