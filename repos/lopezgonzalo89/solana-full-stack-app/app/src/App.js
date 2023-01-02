import "./App.css";
import { useEffect, useState } from "react";
import { Connection } from "@solana/web3.js";
import { AnchorProvider, web3 } from "@project-serum/anchor";

import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { RouterSDK } from "./SDK";

const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  getPhantomWallet(),
];

const { Keypair } = web3;
/* create an account  */
const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed",
};

function useFacadeWallet(wallet) {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (wallet) {
      const network = "http://127.0.0.1:8899";
      const connection = new Connection(network, opts.preflightCommitment);
      const provider = new AnchorProvider(
        connection,
        wallet,
        opts.preflightCommitment
      );
      setProvider(provider);
    }
  }, [wallet]);

  return { provider };
}

function App() {
  const [initialized, setInitialized] = useState(false);
  const [value, setValue] = useState(null);
  const [programValue, setProgramValue] = useState(null);

  const wallet = useWallet();

  const { provider } = useFacadeWallet(wallet);

  const [sdk, setSDK] = useState(null);

  useEffect(() => {
    if (provider) {
      const loadSDK = async () => {
        if (provider) {
          const _sdk = new RouterSDK(provider, {}, "SOLANA");
          setSDK(_sdk);
        }
      };

      loadSDK();
    }
  }, [provider]);

  async function initialize() {
    try {
      await sdk.initialize();
      setInitialized(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function createCounter() {
    if (sdk) {
      try {
        const count = await sdk.createCounter(baseAccount);
        setValue(count);
      } catch (err) {
        console.log("Transaction error: ", err);
      }
    }
  }

  async function increment() {
    if (sdk) {
      const count = await sdk.increment(baseAccount);
      setValue(count);

      const programCount = await sdk.totalProgramCount();
      setProgramValue(programCount);
    }
  }

  if (!wallet.connected) {
    /* If the user's wallet is not connected, display connect wallet button. */
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <WalletMultiButton />
      </div>
    );
  } else {
    return (
      <div className="App">
        {!provider && (
          <div>
            CARGANDO PROVIDER{" "}
            <button onClick={() => console.log(provider)}>ver provider</button>
          </div>
        )}
        <div>
          {!initialized && (
            <button onClick={initialize}>Initialize Program</button>
          )}
          {!value && <button onClick={createCounter}>Create counter</button>}
          {value && <button onClick={increment}>Increment counter</button>}

          {value && value >= Number(0) ? (
            <>
              <h2>User value: {value}</h2>
              <h2>Program value: {programValue}</h2>
            </>
          ) : initialized ? (
            <h2>Counter not created</h2>
          ) : (
            <h2>Program not initialized</h2>
          )}
        </div>
      </div>
    );
  }
}

const AppWithProvider = () => (
  <ConnectionProvider endpoint="http://127.0.0.1:8899">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);

export default AppWithProvider;
