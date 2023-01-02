import * as anchor from "@project-serum/anchor"
import { WalletNotConnectedError } from "@solana/wallet-adapter-base"
import {
    TWEET_SOLANA_IDL,
    TWEET_SOLANA_PROGRAM_ID
} from "./constants"

export function getProgramInstance(connection, wallet) {
    // check if wallet is connected, if not throw error
    if (!wallet.publicKey) throw new WalletNotConnectedError()

    // get the provider
    const provider = new anchor.AnchorProvider(
        connection,
        wallet,
        anchor.AnchorProvider.defaultOptions(), // default options
    )

    const idl = TWEET_SOLANA_IDL
    // Address of the deployed program
    const programId = TWEET_SOLANA_PROGRAM_ID

    // Create a new program instance
    const program = new (anchor).Program(idl, programId, provider);

    return program
}