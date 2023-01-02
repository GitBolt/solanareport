/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Footer from './components/footer.js';
import Header from './components/header.js';
import Description from './components/description';
import RustSVG from './components/rust-svg';
import Main from './components/main';
import { useEffect, useState } from 'react';
import idl from './helper/idl.json';
import kp from './helper/keypair.json';

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the GIF data.
// let baseAccount = Keypair.generate();

//
const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

// Get our program's id form the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Control's how we want to acknowledge when a transaction is "done".
const opts = {
  preflightCommitment: 'processed',
};

const TEST_GIFs = [
  'https://media.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif',
  'https://media.giphy.com/media/EkO6UqwhwcKFqEYXQO/giphy.gif',
  'https://media.giphy.com/media/qOhzfrkMzQO8U/giphy.gif',
  'https://media.giphy.com/media/n71ex8ztZnhao/giphy.gif',
  'https://media.giphy.com/media/7hY945na01sbV4yqgR/giphy.gif',
  'https://media.giphy.com/media/SXZyXeDrorHKJ5vvWY/giphy.gif',
  'https://media.giphy.com/media/e7Fwo2ddFgjf8XsI0N/giphy.gif',
  'https://media.giphy.com/media/CuKEZdZ3V01gI/giphy.gif',
  'https://media.giphy.com/media/l46Cgctdy5C23iB0c/giphy.gif',
  'https://media.giphy.com/media/l3HBbltOYjoNq/giphy.gif',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://media.giphy.com/media/bC9czlgCMtw4cj8RgH/giphy.gif',
];

export default function Home() {
  // State
  const [walletAddress, setWalletAddress] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [gifList, setGifList] = useState([]);

  // check if wallet is available
  const checkIfWalletIsAvailable = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log('Wallet is available');
          // connecting to user wallet with solana.connect
          const res = await solana.connect({ onlyIfTrusted: true });
          //set the user wallet address
          setWalletAddress(res.publicKey.toString());
        }
      } else {
        alert('Get a Phantom Wallet');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        const res = await solana.connect();
        setWalletAddress(res.publicKey.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = (e) => {
    const { value } = e.target;
    setInputVal(value);
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

  const createGifAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log('ping');
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        'Created a new BaseAccount w/ address:',
        baseAccount.publicKey.toString()
      );
      await getGifList();
    } catch (error) {
      console.log('Error creating BaseAccount account:', error);
    }
  };

  const sendGif = async () => {
    if (inputVal.length === 0) {
      console.log('No gif link given!');
      return;
    }
    console.log('Gif link:', inputVal);
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      await program.rpc.addGif(inputVal, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log('GIF successfully sent to program', inputVal);

      await getGifList();
    } catch (error) {
      console.log('Error sending GIF:', error);
    }
  };

  const NotConnectedButton = () => (
    <button
      className={[styles.cta_button, styles.connect_wallet_button].join(' ')}
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderGIFContainer = () => {
    // when the program account is not initialized
    if (gifList === null) {
      return (
        <div className={styles.connected_container}>
          <button
            className={[styles.cta_button, styles.submit_gif_button].join(' ')}
            onClick={createGifAccount}
          >
            Do One-Time Initialization For GIF Program Account
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.connected_container}>
          <form
            className={styles.form_elem}
            onSubmit={(event) => {
              event.preventDefault();
              sendGif();
            }}
          >
            <input
              type="text"
              placeholder="Enter gif link!"
              value={inputVal}
              onChange={onInputChange}
            />
            <button
              type="submit"
              className={[styles.cta_button, styles.submit_gif_button].join(
                ' '
              )}
            >
              Submit
            </button>
          </form>
          <div className={styles.box}>
            {gifList.map((item, index) => (
              <div className={styles.gif_item} key={index}>
                <img src={item.gifLink} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  const getGifList = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      console.log('Got the account', account);
      setGifList(account.gifList);
    } catch (error) {
      console.log('Error in getGifList: ', error);
      setGifList(null);
    }
  };

  // when the page loads, check if wallet is available
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsAvailable();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching Gif list...');
      // call solana program to get the gif list
      getGifList();
      // set state
      // setGifList(TEST_GIFs);
    }
  }, [walletAddress]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Just GIFs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Description />

      <main className={walletAddress ? styles.authed_container : styles.main}>
        {!walletAddress && NotConnectedButton()}
        <div className={styles.sub_text}>
          {walletAddress && renderGIFContainer()}
        </div>
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
