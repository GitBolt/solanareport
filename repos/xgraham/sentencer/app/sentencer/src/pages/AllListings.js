import {Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram} from "@solana/web3.js";
import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import React from "react";
import {Program, Provider} from "@project-serum/anchor";
import idl from "../sentencer.json";
import {useWallet} from "@solana/wallet-adapter-react";

const anchor = require('@project-serum/anchor');
const programID = new PublicKey(idl.metadata.address);
const opts = {
    preflightCommitment: "processed"
}

export default function AllListings() {
    const [accounts, setAccounts] = React.useState([]);
    const wallet = useWallet();


    React.useEffect(() => {


            if (wallet) {
                try {
                    getAccount()
                } catch (error) {
                    console.log(error)
                }
            }
        }
        ,
        [wallet]
    )

    async function getProvider() {
        /* create the provider and return it to the caller */
        /* network set to local network for now */
        const network = "http://127.0.0.1:8899";
        const connection = new Connection(network, opts.preflightCommitment);

        const provider = new Provider(
            connection, wallet, opts.preflightCommitment,
        );
        return provider;
    }

    async function getAccount() {

        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        let accounts = null
        try {
            accounts = await program.account.sentencer.all();
            accounts.forEach((account, index) => {
                if (!account.account.listed) {
                    accounts.splice(index, 1)
                }
            })
            console.log(accounts)
            if (accounts.length > 0) {
                setAccounts(accounts)
            }

        } catch (e) {
            console.log(e)
        }
        //if they have an account do this:
        if (accounts) {
            console.log('hello')
        }


    }

    async function buySentence(sent, owner_key, buyer, name) {
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);

        const [sentenceAccount, bump] = await anchor.web3.PublicKey.findProgramAddress([
            "sentencer",
            owner_key.toBytes(),
            name.slice(0, 32)
        ], program.programId);


        await program.rpc.buySentence(name, {
            accounts: {
                sentence: sent,
                sentenceOwner: owner_key,
                user: buyer,
                systemProgram: SystemProgram.programId,
            },
            signers: [
                buyer.key,
            ]
        })

        let sentence = await program.account.sentencer.fetch(sentenceAccount);
        return {publicKey: sentenceAccount, data: sentence};
    }

    function Sentences() {

        function lamportsToSol(price) {
            const result = price / LAMPORTS_PER_SOL;
            return result
        }

        function handleClick(item, index) {
            buySentence(item.publicKey, item.account.sentenceOwner, wallet.publicKey, item.account.name)
        }

        if (accounts.length > 0) {
            return (<Grid container spacing={4}>
                    {accounts.map((item, index) => {
                            if (item.account.listed) {
                                return (
                                    <Grid item key={index} xs={10} md={6} spacing={4}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant='body2' sx={{fontSize: 14}}
                                                            gutterBottom>

                                                    {item.account.name}
                                                </Typography>
                                                <Typography variant="body1" sx={{fontSize: 14}}>

                                                    {item.account.body}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{fontSize: 10}}>
                                                    Owner: {item.account.sentenceOwner.toString()}
                                                </Typography>

                                            </CardContent>
                                            <CardActions>
                                                <Typography> Price: {lamportsToSol(item.account.price)} </Typography>
                                                <Button size="small" onClick={() => handleClick(item, index)}>Buy</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>)
                            } else {
                                return (
                                    <></>)
                            }
                        }
                    )}
                </Grid>
            );
        } else {
            return (<></>);
        }
    }

    return (
        <>
            <Box>
                <Sentences/>
            </Box>


        </>
    )
}