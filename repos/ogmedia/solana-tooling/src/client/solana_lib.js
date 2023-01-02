import {
    Account,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    TransactionInstruction,
    Transaction,
    TOKEN_PROGRAM_ID,
    sendAndConfirmTransaction,
    Token
} from '@solana/web3.js';

// import {
//     AccountLayout,
//     Token,
//     TOKEN_PROGRAM_ID
// } from "@solana/spl-token";

import {
    getPayer,
    getRpcUrl,
    newAccountWithLamports,
    readAccountFromFile,
} from './solana_utils';

import * as borsh from 'borsh';

import PROGRAM_KEYPAIR from "../../dist/program/neuralsol-keypair.json";
const PROGRAM_KEYPAIR_PATH = "../../dist/program/";

async function establishConnection() {
    const rpcUrl = await getRpcUrl();
    const connection = new Connection(rpcUrl, 'confirmed');
    const version = await connection.getVersion();
    console.log('Connection to cluster established:', rpcUrl, version);
    return { connection, "info": { rpcUrl, version } };
}

// class PerceptronLinkAccount {
//   balance_weight = 0.0;
//   constructor(fields) {
//     if (fields) {
//       this.balance_weight = fields.balance_weight;
//     }
//   }
// }
// const PerceptronLinkSchema = new Map([
//   [PerceptronLinkAccount, {kind: 'struct', fields: [['balance_weight', 'f64']]}],
// ]);
// const PERCEPTRON_LINK_SIZE = borsh.serialize(PerceptronLinkSchema, new PerceptronLinkAccount()).length;
const PERCEPTRON_LINK_SIZE = 1800;
async function createPayer(connection) {
    const payerAccount = new Account();
    const payerBalance = await connection.getBalance(payerAccount.publicKey);
    return { payerAccount, payerBalance };
}

// async function checkProgram(connection, payerAccount) {
//     // Read program id from keypair file
//     let programId;
//     try {
//         const programAccount = await readAccountFromFile(PROGRAM_KEYPAIR);
//         programId = programAccount.publicKey;
//     } catch (err) {
//         const errMsg = err;
//         throw new Error(
//           `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/helloworld.so\``,
//         );
//     }
//     console.log("has program id", programId);
//     // Check if the program has been deployed
//     const programInfo = await connection.getAccountInfo(programId);
//     if (programInfo === null) {
//     // if (fs.existsSync(PROGRAM_SO_PATH)) {
//     //   throw new Error(
//     //     'Program needs to be deployed with `solana program deploy dist/program/helloworld.so`',
//     //   );
//     // } else {
//         throw new Error('Program needs to be built and deployed');
//     // }
//     } else if (!programInfo.executable) {
//         throw new Error(`Program is not executable`);
//     }
//     console.log(`Using program ${programId.toBase58()}`);

//     // Derive the address of a greeting account from the program so that it's easy to find later.
//     const SEED = 'mainTestNode';

//     let perceptronPubkey = await createProgramAccountKeyWithSeed(programId, payerAccount, SEED);
//     console.log("program account pub key created", perceptronPubkey);

//     // Check if the greeting account has already been created
//     let perceptronAccount = await connection.getAccountInfo(perceptronPubkey);
//     console.log("program accounte exist check?", perceptronAccount);
//     if (perceptronAccount === null) {
//         perceptronAccount = await createProgramAccount(
//             connection,
//             programId,
//             perceptronPubkey,
//             PERCEPTRON_LINK_SIZE,
//             payerAccount,
//             SEED
//         );
//         console.log("Program account created:", perceptronAccount);
//     }
//     return { perceptronPubkey, programId, perceptronAccount };
// }

async function createProgramAccountKeyWithSeed (programId, payerAccount, seed) {
    console.log("inside dpakwf")
    const nk =  await PublicKey.createWithSeed(
        payerAccount.publicKey,
        seed,
        programId,
    );
    return nk;
}

async function createProgramAccount (connection, programId, pubKey, size, payerAccount, seed){
    console.log(
        'Creating account',
        pubKey.toBase58(),
        'to send test data to',
    );
    const lamports = await connection.getMinimumBalanceForRentExemption(
        size,
    );
    console.log("lamports needed", lamports);
    const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
            fromPubkey: payerAccount.publicKey,
            basePubkey: payerAccount.publicKey,
            seed: seed,
            newAccountPubkey: pubKey,
            lamports,
            space: size,
            programId,
        }),
    );
    return await sendAndConfirmTransaction(connection, transaction, [payerAccount]);
}

function createTransactionInstruction(pubKey, programId, data = null) {
    return new TransactionInstruction({
            keys: [{pubkey: pubKey, isSigner: false, isWritable: true}],
            programId,
            data: data ? Buffer.from(data) : Buffer.alloc(0), // All instructions are hellos
        });
}

async function getProgramInfo(connection) {
// Read program id from keypair file
    let programId;
    try {
        const programAccount = await readAccountFromFile(PROGRAM_KEYPAIR);
        programId = programAccount.publicKey;
    } catch (err) {
        const errMsg = err;
        throw new Error(
          `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/helloworld.so\``,
        );
    }
    console.log("has program id", programId);
    // Check if the program has been deployed
    const programInfo = await connection.getAccountInfo(programId);
    if (programInfo === null) {
    // if (fs.existsSync(PROGRAM_SO_PATH)) {
    //   throw new Error(
    //     'Program needs to be deployed with `solana program deploy dist/program/helloworld.so`',
    //   );
    // } else {
        throw new Error('Program needs to be built and deployed');
    // }
    } else if (!programInfo.executable) {
        throw new Error(`Program is not executable`);
    }
    console.log(`Using program ${programId.toBase58()}`);
    return { programId, programInfo }; 
}

async function airdrop (connection, payerAccount, amount = 1000000) {
    console.log("requesting airdrop for ", amount);
    const signature = await connection.requestAirdrop(
        payerAccount.publicKey,
        amount,
    );
    await connection.confirmTransaction(signature);
    console.log("Gettig new balance");
    const balance = await connection.getBalance(payerAccount.publicKey);
    return { payerAccount, payerBalance: balance};
}

async function testTransaction(
    connection, 
    perceptronPubkey, 
    programId, 
    payerAccount,
    data = null
    ) {
    console.log('sending test transaction to', perceptronPubkey.toBase58());
    const instruction = createTransactionInstruction(perceptronPubkey, programId, data); 
    return await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [payerAccount],
    );
}

export {
    establishConnection,
    createPayer,
    getProgramInfo,
    // checkProgram,
    testTransaction,
    createProgramAccountKeyWithSeed,
    createProgramAccount,
    airdrop,
    PERCEPTRON_LINK_SIZE as ACCT_SIZE,
};