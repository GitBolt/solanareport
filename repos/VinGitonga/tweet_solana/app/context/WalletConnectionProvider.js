import {
    ConnectionProvider,
    WalletProvider
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import {
    PhantomWalletAdapter, SolflareWalletAdapter
} from "@solana/wallet-adapter-wallets"
import { useMemo } from "react"
import { SOLANA_HOST } from "../utils/constants"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

const network = WalletAdapterNetwork.Devnet

const WalletConnectionProvider = ({ children }) => {
    const endpoint = useMemo(() => SOLANA_HOST, [])

    const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })], [])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletConnectionProvider
