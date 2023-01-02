import { clusterApiUrl, PublicKey } from "@solana/web3.js"
import tweet_solana from "./tweet_solana.json"

export const SOLANA_HOST = clusterApiUrl("devnet")

export const TWEET_SOLANA_PROGRAM_ID = new PublicKey(
    "Axi1KZky2SVgKBY3HCkecagLv54GQw8YoTTeWQuCM7PP"
)

export const TWEET_SOLANA_IDL = tweet_solana
