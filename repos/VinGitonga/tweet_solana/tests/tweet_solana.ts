const anchor = require("@project-serum/anchor");
const BN = require("bn.js");
import { Program } from "@project-serum/anchor"
import { TweetSolana } from "../target/types/tweet_solana";
const spl_token = require("@solana/spl-token");
const TOKEN_PROGRAM_ID = spl_token.TOKEN_PROGRAM_ID;
const _ = require("lodash")
const { web3 } = anchor;
const { SystemProgram } = web3
const assert = require("assert")
const utf8 = anchor.utils.bytes.utf8

const provider = anchor.AnchorProvider.env()
anchor.setProvider(provider)

// setting default accounts
const defaultAccount = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId
}

const program = anchor.workspace.TweetSolana as Program<TweetSolana>;
let creatorKey = provider.wallet.publicKey;
let stateSigner;
let userCreateSigner;
let tweetSigner;



describe("tweet_solana", () => {

    it("Should create a state", async () => {
        ;[stateSigner] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode('state')],
            program.programId,
        )

        // Check if state is created using try and catch
        try {
            const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        }
        catch {
            await program.rpc.createState({
                accounts: {
                    state: stateSigner,
                    authority: creatorKey,
                    ...defaultAccount,
                }
            })
        }

        const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        assert(
            stateInfo.authority.toString() === creatorKey.toString(),
            "State authority is not set to creator"
        )
    })

    // it("Should create a new user", async () => {
    //     ;[userCreateSigner] = await anchor.web3.PublicKey.findProgramAddress(
    //         [utf8.encode('user'), creatorKey.toBuffer()],
    //         program.programId,
    //     )

    //     await program.rpc.createUser("Riley Davis", "riley.davis@outlook.com",{
    //         accounts: {
    //             user: userCreateSigner,
    //             authority: creatorKey,
    //             ...defaultAccount,
    //         }
    //     })
    //     // try {
    //     //     const userInfo = await program.account.userAccount.fetch(userCreateSigner);
    //     //     console.log(userInfo)
    //     // } catch {
    //     // }

    //     const userInfo = await program.account.userAccount.fetch(userCreateSigner);
    //     console.log(userInfo)
    //     // assert(
    //     //     userInfo.authority.toString() === creatorKey.toString(),
    //     //     "User authority is not set to creator"
    //     // )

    // });

    // Fetch all users
    it("Should fetch all users", async () => {
        try {
            const users = await program.account.userAccount.all();
            console.log(users)
        } catch (e) {
            console.log(e)
        }
            
    })

    it("Create first tweet", async () => {
        const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        // log the current tweet count
        console.log(`Current tweet count: ${stateInfo.tweetCount}`)

        ;[tweetSigner] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("tweet"), stateInfo.tweetCount.toBuffer("be", 8)],
            program.programId,
        )

        try {
            const tweetInfo = await program.account.tweetAccount.fetch(tweetSigner);
            console.log(tweetInfo)
        } catch {
            await program.rpc.createTweet("Am coming home", "Dylan Kent", {
                accounts: {
                    state: stateSigner,
                    tweet: tweetSigner,
                    authority: creatorKey,
                    ...defaultAccount,
                }
            });
        }

    })

    // Fetch all tweets
    it("Fetch all tweets", async () => {
        const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        console.log(`Current tweet count: ${stateInfo.tweetCount}`)

        const tweets = await program.account.tweetAccount.all();
        console.log(tweets)
    })

    // Create second tweet
    it("Create second tweet", async () => {
        const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        // log the current tweet count
        console.log(`Current tweet count: ${stateInfo.tweetCount}`)

        ;[tweetSigner] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("tweet"), stateInfo.tweetCount.toBuffer("be", 8)],
            program.programId,
        )

        try {
            const tweetInfo = await program.account.tweetAccount.fetch(tweetSigner);
            console.log(tweetInfo)
        } catch {
            await program.rpc.createTweet("Guess who is here", "Jake Lenny", {
                accounts: {
                    state: stateSigner,
                    tweet: tweetSigner,
                    authority: creatorKey,
                    ...defaultAccount,
                }
            });
        }
    })

    // Fetch all tweets
    it("Fetch all tweets", async () => {
        const stateInfo = await program.account.stateAccount.fetch(stateSigner);
        console.log(`Current tweet count: ${stateInfo.tweetCount}`)

        const tweets = await program.account.tweetAccount.all();
        console.log(tweets)
    })

    // Create comment to first tweet
    it("Create comment to first tweet", async () => {
        [tweetSigner] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("tweet"), new BN(0).toBuffer("be", 8)],
            program.programId,
        );

        try {
            const tweetInfo = await program.account.tweetAccount.fetch(tweetSigner);
            console.log(tweetInfo)

            let [commentSigner] = await anchor.web3.PublicKey.findProgramAddress(
                [
                    utf8.encode("comment"),
                    tweetInfo.tweetIndex.toBuffer("be", 8),
                    tweetInfo.tweetCommentCount.toBuffer("be", 8)
                ],
                program.programId,
            );
            console.log(commentSigner)

            await program.rpc.createComment("I'm here am Man", "Paul Lenny", {
                accounts: {
                    tweet: tweetSigner,
                    comment: commentSigner,
                    authority: creatorKey,
                    ...defaultAccount,
                }
            });

            const commentInfo = await program.account.commentAccount.fetch(commentSigner);
            console.log(commentInfo)
            assert(
                tweetInfo.authority.toString() === creatorKey.toString(),
                "Comment creator is Invalid"
            )
        } catch {
            assert(false, "Comment creation failed")
        }
    })

    // Fetch all comments
    it("Fetch all comments", async () => {
        try {
            const commentList = await program.account.commentAccount.all();
            console.log(commentList)
        } catch (e) {
            console.log(e)
        }
    });

});
