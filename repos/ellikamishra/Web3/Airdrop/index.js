const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");


   //creating wallet
   const newPair= new Keypair();

   const publicKey=new PublicKey(newPair._keypair.publicKey).toString();

   const secretKey=newPair._keypair.secretKey

   //check wallet balance


   const getWalletBalance=async()=>{

    try{
        //connect to devnet
        const connection=new Connection(clusterApiUrl("devnet"),"confirmed");
        //wallet object create

        const myWallet=await Keypair.fromSecretKey(secretKey);

        //getBalance 
        const walletBalance=await connection.getBalance(

        new PublicKey(myWallet.publicKey)
        );

   console.log(`wallet balance:${walletBalance}`);

    }catch(err){

    }

   };

   
   
//airDrop created
const airDropSol=async()=>{
    try{
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);

        console.log(`--Airdrop 2 SOL--`)
        const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(walletKeyPair.publicKey),
        2 * LAMPORTS_PER_SOL
);
    await connection.confirmTransaction(fromAirDropSignature);
    
}catch(err){

        console.log(err);
    }
};


const driverFunc=async()=>{

    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunc();