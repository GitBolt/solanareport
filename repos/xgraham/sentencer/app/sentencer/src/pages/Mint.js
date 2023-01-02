import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, IconButton, Input, Snackbar, Typography} from "@mui/material";
import {Connection, PublicKey, SystemProgram} from '@solana/web3.js';
import {Program, Provider} from '@project-serum/anchor';
import idl from '../sentencer.json';
import {useWallet} from "@solana/wallet-adapter-react";
import CloseIcon from '@mui/icons-material/Close';
import * as PropTypes from "prop-types";

const anchor = require('@project-serum/anchor');
const programID = new PublicKey(idl.metadata.address);
const opts = {
    preflightCommitment: "processed"
}

export default function Mint(props) {

    const [sentName, setName] = useState('');
    const [sentBody, setBody] = useState('');
    const [open, setOpen] = React.useState(false);
    const [toastmsg, setToastMsg] = React.useState('Test')
    const wallet = useWallet();

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

    async function createSentence(owner, name, body) {
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        const [sentenceAccount, bump] = await anchor.web3.PublicKey.findProgramAddress([
            "sentencer",
            owner.toBytes(),
            name.slice(0, 32)
        ], program.programId);

        await program.rpc.newSentence(name, body, bump, {
            accounts: {
                sentence: sentenceAccount,
                user: owner.toString(),
                systemProgram: SystemProgram.programId,
            },
        });

        let sentence = await program.account.sentencer.fetch(sentenceAccount);
        return {publicKey: sentenceAccount, data: sentence};
    }

    function handleClick() {
        createSentence(wallet.publicKey, sentName, sentBody).then(r  =>{
            setToastMsg('Sentence was minted! '+r.data.toString())
            setOpen(true)
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Card>
            <CardContent>
                <Typography  variant={'body2'} sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Mint a new sentence
                </Typography>
                <Typography variant="body2">
                    Name:
                </Typography>
                <Input value={sentName} onChange={e => setName(e.target.value)}> </Input>
                <Typography variant="body2">
                    Body:
                </Typography>

                <Input value={sentBody} onChange={e => setBody(e.target.value)}/>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleClick}>Mint</Button>
            </CardActions>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={toastmsg}
                action={action}
            />
        </Card>


    )
}