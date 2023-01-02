import { useState, useEffect } from 'react';
import { Box, Flex } from "@chakra-ui/react";
import AddTweet from './AddTweet';
import Side from './Side';
import Tweet from './Tweet';
import Signup from './Signup';

import { useWallet } from "@solana/wallet-adapter-react"
import { SOLANA_HOST } from "../utils/constants";
import { getProgramInstance } from "../utils/utils";
import useAuth from '../hooks/useAuth';
import useTweets from "../hooks/useTweets"


const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;




const Feed = () => {
    const [isAccount, setIsAccount] = useState(false);
    const [userDetail, setUserDetail] = useState();
    const [tweetContent, setTweetContent] = useState("")
    const[tweets, setTweets] = useState([])
    const wallet = useWallet();

    const connection = new anchor.web3.Connection(SOLANA_HOST);

    const program = getProgramInstance(connection, wallet);

    const { signup } = useAuth()

    // check account is created in blockchain
    const checkAccount = async () => {
        let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode('user'), wallet.publicKey.toBuffer()],
            program.programId,
        )

        // confirm if account exists using try and catch block
        try {
            const userInfo = await program.account.userAccount.fetch(user_pda);
            console.log(userInfo);
            setUserDetail(userInfo);
            setIsAccount(true);
        } catch (e) {
            console.log(e);
            setIsAccount(false);
        }
    }

    useEffect(() => {
        if (wallet.connected) {
            checkAccount();
        }
    }, [wallet.connected])

    const {
        getTweetComments,
        getTweets,
        createTweetComment,
        newTweet
    } = useTweets(setTweets, tweetContent, setTweetContent, userDetail)

    return (
        <>
            {isAccount ? (
                <Flex fontFamily={"Poppins"} px={2} py={12} mx="auto">
                    <Side userDetail={userDetail} getTweets={getTweets} />
                    <Box mx="auto" w={{ lg: 8 / 12, xl: 5 / 12 }}>
                        <AddTweet 
                            tweetContent={tweetContent} 
                            setTweetContent={setTweetContent} 
                            sendTweet={newTweet} 
                            userName={userDetail.userName} 
                        />
                        {tweets.map(tweet => (
                            <Tweet 
                                tweetDetail={tweet.account} 
                                key={tweet.account.tweetIndex} 
                                userName={userDetail.userName} 
                                createComment={createTweetComment}
                                getTweetComments={getTweetComments}
                            />
                        ))}
                    </Box>
                </Flex>
            ) : (
                <Signup signup={signup} />
            )}
        </>
    );
};


export default Feed;