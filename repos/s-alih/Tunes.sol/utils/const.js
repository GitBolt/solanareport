import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import spotify from "./spotify.json";

export const SOLANA_HOST = clusterApiUrl("devnet");

export const STABLE_POOL_PROGRAM_ID = new PublicKey(
  "A4yw6wtFgaPKCQv5X3F9V3oY8cscB6fVtPjdjskU97Nx"
);

export const STABLE_POOL_IDL = spotify;
