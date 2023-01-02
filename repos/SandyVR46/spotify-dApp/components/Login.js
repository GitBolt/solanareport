import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Wallet } from '@project-serum/anchor'
import Payment from './Payment'


const styles = {
    loginPage: `w-screen h-screen bg-black flex justify-center flex-col items-center`,
    text:`text-4xl text-white mb-10`
}





const Login = () => {

  const wallet = useWallet()

  if(wallet.connected) return <Payment />
  return (
    
    <div className={styles.loginPage}>
        <img height="300" width="300" src='https://media4.giphy.com/media/eHABhT7ESge27w2T6Z/giphy.gif?cid=ecf05e47uq2jjtxjujbr467prrdcl6dj5uipjl6voo44u6n9&rid=giphy.gif&ct=s' />
        <p className={styles.text}>Spotify dApp</p>
        <WalletMultiButton /> 
    </div>
  )
}

export default Login
