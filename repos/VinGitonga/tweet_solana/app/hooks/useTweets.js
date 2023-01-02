import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useWallet } from "@solana/wallet-adapter-react"
import { SOLANA_HOST } from "../utils/constants"
import { getProgramInstance } from "../utils/utils"
const anchor = require("@project-serum/anchor")
const utf8 = anchor.utils.bytes.utf8
const { BN, web3 } = anchor
const { SystemProgram } = web3

const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId
}

/**
 * 
 * @param {*} setTweets fn that updates the tweets array
 * @param {*} tweetContent contains the content of a tweet to be saved
 * @param {*} setTweetContent fn to update the tweet content
 * @param {*} userDetail an object contains user detail currently logged in
 * @returns getTweets - fn that sets the tweets
 * @return createTweetComment - fn that creates a new comment to a tweet
 * @returns newTweet - fn that saves a new tweet to chain
 * @returns getTweetComments - fn that fetches all comments that belong to a tweet
 */

const useTweets = (
    setTweets, 
    tweetContent, 
    setTweetContent, 
    userDetail,
) => {
    const wallet = useWallet()
    const connection = new anchor.web3.Connection(SOLANA_HOST)
    const program = getProgramInstance(connection, wallet)

    /**
     * This fn fetches all tweets that are onchain
     */
    const getTweets = async() => {
        // fetch all tweets onchain
        const tweets = await program.account.tweetAccount.all()
        // sort the tweets by time
        tweets.sort(
            (a,b) => b.account.tweetTime.toNumber() - a.account.tweetTime.toNumber()
        )

        // Log all tweets fetched
        console.log(tweets)
        setTweets(tweets)
    }

    /**
     * This fn creates a tweet and saves it on chain
     */

    const newTweet = async () => {
        let [state_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("state")],
            program.programId
        );

        let stateInfo

        // Check if state is created and if not create one
        try {
            stateInfo = await program.account.stateAccount.fetch(state_pda)
            console.log(stateInfo)
        } catch {
            await program.rpc.createState({
                accounts: {
                    state: state_pda,
                    authority: wallet.publicKey,
                    ...defaultAccount,
                }
            })
            return
        }

        stateInfo = await program.account.stateAccount.fetch(state_pda)

        let [tweet_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("tweet"),
                stateInfo.tweetCount.toArrayLike(Buffer, "be", 8)
            ],
            program.programId
        )

        const tx = await program.rpc.createTweet(tweetContent, userDetail.userName, {
            accounts: {
                state: state_pda,
                tweet: tweet_pda,
                authority: wallet.publicKey,
                ...defaultAccount,
            }
        })

        // log the transaction
        console.log(tx)
        // Reset the input fields
        setTweetContent("")
    }

    /**
     * Takes three params
     * @param index - index of the tweet
     * @param count - current comment count
     * @param comment_text - comment itself
     */

    const createTweetComment = async (index, count, comment_text) => {
        // get the tweet pda
        let [tweet_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("tweet"),
                new BN(index).toArrayLike(Buffer, "be", 8)
            ],
            program.programId
        );

        // get the comment pda
        let [comment_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [
                utf8.encode("comment"),
                new BN(index).toArrayLike(Buffer, "be", 8),
                new BN(count).toArrayLike(Buffer, "be", 8),
            ],
            program.programId,
        )

        if (userDetail){
            const tx = await program.rpc.createComment(
                comment_text,
                userDetail.userName,
                {
                    accounts: {
                        tweet: tweet_pda,
                        comment: comment_pda,
                        authority: wallet.publicKey,
                        ...defaultAccount,
                    }
                }
            )

            // log the transaction
            console.log(tx)
        }


    }

    /**
     * 
     * @param {*} index Its the index of the tweet
     * @param {*} count Its the current commentCount
     * @returns an array of comments
     */

    const getTweetComments = async (index, count) => {
        let commentSigners = [] // stores a list of all comment signers of all comments

        for (let i = 0; i < count; i++) {
            let [commentSigner] = await anchor.web3.PublicKey.findProgramAddress(
                [
                    utf8.encode("comment"),
                    new BN(index).toArrayLike(Buffer, "be", 8),
                    new BN(i).toArrayLike(Buffer, "be", 8)
                ],
                program.programId
            );

            commentSigners.push(commentSigner)
        }

        const comments = await program.account.commentAccount.fetchMultiple(commentSigners)

        comments.sort(
            (a,b) => b.commentTime.toNumber() - a.commentTime.toNumber()
        )

        // log all comments
        // console.log(comments)

        return comments
    }


    return {
        getTweets,
        newTweet,
        createTweetComment,
        getTweetComments
    }



}

export default useTweets
