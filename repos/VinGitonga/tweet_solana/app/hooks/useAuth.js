import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useWallet } from "@solana/wallet-adapter-react"
import { SOLANA_HOST } from "../utils/constants"
import { getProgramInstance } from "../utils/utils"
const anchor = require("@project-serum/anchor")
const utf8 = anchor.utils.bytes.utf8;
const { web3 } = anchor
const { SystemProgram } = web3

// setup the default account
const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId
}

const useAuth = () => {
    const wallet = useWallet()
    const connection = new anchor.web3.Connection(SOLANA_HOST)
    const program = getProgramInstance(connection, wallet)

    const signup = async (name, email) => {
        let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("user"),
                wallet.publicKey.toBuffer()
            ],
            program.programId,
        )

        // Now create the user on chain
        await program.rpc.createUser(name, email, {
            accounts: {
                user: user_pda,
                authority: wallet.publicKey,
                ...defaultAccount
            }
        })
    }

    // Now return our signup fn
    return { signup }
}

export default useAuth
