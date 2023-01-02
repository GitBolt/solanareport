// import os from 'os';
// import fs from 'mz/fs';
// import path from 'path';
// import yaml from 'yaml';
import {Account, Connection} from '@solana/web3.js';

// zzz
export function sleep( number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function newAccountWithLamports(
  connection,
  lamports = 1000000,
){
  const account = new Account();
  const signature = await connection.requestAirdrop(
    account.publicKey,
    lamports,
  );
  await connection.confirmTransaction(signature);
  
  return account;
}

async function getConfig(){
  // Path to Solana CLI config file
  // const CONFIG_FILE_PATH = path.resolve(
  //   os.homedir(),
  //   '.config',
  //   'solana',
  //   'cli',
  //   'config.yml',
  // );
  // const configYml = await fs.readFile(CONFIG_FILE_PATH, {encoding: 'utf8'});
  // return yaml.parse(configYml);
}

/**
 * Load and parse the Solana CLI config file to determine which RPC url to use
 */
export async function getRpcUrl(){
  try {
    const config = await getConfig();
    if (!config.json_rpc_url) throw new Error('Missing RPC URL');
    return config.json_rpc_url;
  } catch (err) {
    console.warn(
      'Failed to read RPC url from CLI config file, falling back to localhost',
    );
    return 'http://localhost:8899';
  }
}

/**
 * Load and parse the Solana CLI config file to determine which payer to use
 */
export async function getPayer(){
  try {
    const config = await getConfig();
    if (!config.keypair_path) throw new Error('Missing keypair path');
    // return readAccountFromFile(config.keypair_path);
  } catch (err) {
    console.warn(
      'Failed to read keypair from CLI config file, falling back to new random keypair',
    );
    return new Account();
  }
}

/**
 * Create an Account from a keypair file
 */
export async function readAccountFromFile(accountFile) {
  console.log("program account file", accountFile);
  const keypairBuffer = Buffer.from(accountFile);
  return new Account(keypairBuffer);
}
