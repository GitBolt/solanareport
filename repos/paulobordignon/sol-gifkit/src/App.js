import React, { useEffect, useState } from "react";
import "./App.css";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";

import idl from "./idl.json";
import kp from "./keypair.json";

// SystemProgram is the 'executor' (runtime) of Solana!
const { SystemProgram } = web3;

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// Get our program's id from IDL file.
const programID = new PublicKey(idl.metadata.address);

// Defines our network to devnet.
const network = clusterApiUrl("devnet");

// Controls how we want to 'know' when a transaction is 'ready'
const opts = {
  preflightCommitment: "processed",
};

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
          console.log(
            "Connected with public key:",
            response.publicKey.toString()
          );
        }
      } else {
        alert("Please, install the Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with public key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const sendGif = async () => {
    if (inputValue.length === 0) {
      console.log("Please, fill out the link!");
      return;
    }
    setInputValue("");
    console.log("GIF Link:", inputValue);
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      await program.rpc.addGif(inputValue, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("GIF has been sent with success", inputValue);

      await getGifList();
    } catch (error) {
      console.log("Error during sending GIF:", error);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const getGifList = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      console.log("Account obtained", account);
      setGifList(account.gifList);
    } catch (error) {
      console.log("Error getGifList: ", error);
      setGifList(null);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      console.log("Obtaining the GIF list...");
      getGifList();
    }
  }, [walletAddress]);

  const createGifAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log("ping");
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        "BaseAccount has been created :",
        baseAccount.publicKey.toString()
      );
      await getGifList();
    } catch (error) {
      console.log("Error during the creation of BaseAccount:", error);
    }
  };

  const renderNotConnectedContainer = () => (
    <div className="header-container">
      <p className="header">🖼 Public GIFs repository 🖼</p>
      <p className="sub-text">You can share with me your favorite GIF ✨</p>
      <p className="alert">The program was deployed on Solana Devnet!</p>
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    </div>
  );

  const renderConnectedContainer = () => {
    // Was not the program account initialized?
    if (gifList === null) {
      return (
        <div className="connected-container">
          <button
            className="cta-button submit-gif-button"
            onClick={createGifAccount}
          >
            Single boot for GIF program account
          </button>
        </div>
      );
    }
    // The program account is initialized then users can send gifs.
    else {
      return (
        <div className="connected-container">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendGif();
            }}
          >
            <input
              type="text"
              placeholder="Fill out here the GIF link!"
              value={inputValue}
              onChange={onInputChange}
            />
            <button type="submit" className="cta-button submit-gif-button">
              Send
            </button>
          </form>
          <div className="gif-grid">
            {gifList.map((item, index) => (
              <div className="gif-item" key={index}>
                <img src={item.gifLink} alt="gif" />
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        {!walletAddress && renderNotConnectedContainer()}
        {walletAddress && renderConnectedContainer()}
      </div>
    </div>
  );
};

export default App;
