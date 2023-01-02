import React from 'react';
import {Program, Provider} from "@project-serum/anchor";
import idl from "../sentencer.json";
import {useWallet} from "@solana/wallet-adapter-react";
import {Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Input,
    Snackbar,
    Typography
} from "@mui/material";

const anchor = require('@project-serum/anchor');
const programID = new PublicKey(idl.metadata.address);
const opts = {
    preflightCommitment: "processed"
}


export default function MySentences(props) {

    const [open, setOpen] = React.useState(false);
    const [toastmsg, setToastMsg] = React.useState('Test')
    const wallet = useWallet();
    const [accounts, setAccounts] = React.useState([]);

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

    async function listSentence(item_key, owner_key, name, price) {
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);



        await program.rpc.listSentence(name, new anchor.BN(price * LAMPORTS_PER_SOL), {
            accounts: {
                sentence: item_key,
                sentenceOwner: owner_key,
                user: owner_key,
            },
        })

        let sentence = await program.account.sentencer.fetch(item_key);
        getAccount()
        return {publicKey: sentence.publicKey, data: sentence};
    }

    async function getAccount() {
        await wallet.connect()
        if (wallet.connected) {
            const provider = await getProvider();
            const program = new Program(idl, programID, provider);
            let accounts = null
            try {
                console.log('in try')
                console.log(wallet.publicKey.toString())
                accounts = await program.account.sentencer.all([
                    {
                        memcmp: {
                            offset: 8, // Discriminator.
                            bytes: wallet.publicKey.toBase58(),
                        }
                    }
                ]);
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

        } else {
            console.log('wallet not connected')
        }
    }

    function handleClick(item, index) {
        let price = 0
        if (document.getElementById('list' + index.toString()).value) {
             price = document.getElementById('list' + index.toString()).value
        }
        listSentence(item.publicKey, item.account.sentenceOwner, item.account.name, price)
    }

    React.useEffect(() => {


            if (wallet) {
                getAccount()
            }
        }
        ,
        []
    )

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                k
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );


    function Sentences() {

        function lamportsToSol(price) {
            const result = price / LAMPORTS_PER_SOL;
            return result
        }

        if (accounts.length > 0) {
            return (<Grid container spacing={4}>
                    {accounts.map((item, index) =>
                        <Grid item key={index} xs={10} md={6} lg={4}>
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
                                        This sentence is {item.account.listed ? '' : ' not '} listed.
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Input placeholder={lamportsToSol(item.account.price)} id={'list' + index.toString()}/>
                                    <Button size="small" onClick={()=>handleClick(item, index)}>List</Button>
                                </CardActions>
                            </Card>
                        </Grid>
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

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={toastmsg}
                action={action}
            />
        </>
    )
}