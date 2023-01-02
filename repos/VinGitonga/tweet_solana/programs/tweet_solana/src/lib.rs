use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};
use std::mem::size_of;

declare_id!("Axi1KZky2SVgKBY3HCkecagLv54GQw8YoTTeWQuCM7PP");

// Constants
const USER_NAME_LEGNTH: usize = 50;
const USER_EMAIL_LEGNTH: usize = 100;
const MAX_TWEET_LENGTH: usize = 1024;
const MAX_COMMENT_LENGTH: usize = 1024;

#[program]
pub mod tweet_solana {
    use super::*;

    pub fn create_state(
        ctx: Context<CreateState>
    ) -> Result<()> {
        // Get the state from the context
        let state = &mut ctx.accounts.state;

        // Save the authority to state
        state.authority = ctx.accounts.authority.key();

        // Initialize the tweet count
        state.tweet_count = 0;

        Ok(())
    }

    // create user
    // takes param name, email
    pub fn create_user(
        ctx: Context<CreateUser>,
        name: String,
        email: String,
    ) -> Result<()> {
        // Get the user
        let user = &mut ctx.accounts.user;
        // set the authority (wallet address)
        user.user_wallet_address = ctx.accounts.authority.key();

        // set the name
        user.user_name = name;
        // set the email
        user.user_email = email;

        Ok(())
    }

    // create tweet
    // takes param tweet_content and tweet_author
    pub fn create_tweet(
        ctx: Context<CreateTweet>,
        tweet_content: String,
        tweet_author: String,
    ) -> Result<()> {
        // Get the state first
        let state = &mut ctx.accounts.state;

        // Get the tweet
        let tweet = &mut ctx.accounts.tweet;
        // Now set the tweet authority
        tweet.authority = ctx.accounts.authority.key();
        // Set the tweet content
        tweet.tweet_content = tweet_content;
        // Set the tweet author
        tweet.tweet_author = tweet_author;

        // set tweet comment count to 0
        tweet.tweet_comment_count = 0;
        // set tweet index to state tweet count
        tweet.tweet_index = state.tweet_count;
        // increment the tweet count
        state.tweet_count += 1;
        // set the tweet timestamp
        tweet.tweet_time = ctx.accounts.clock.unix_timestamp;

        Ok(())
    }

    pub fn create_comment (
        ctx: Context<CreateComment>,
        comment_content: String,
        comment_author: String,
    ) -> Result<()> {
        // Get the tweet first
        let tweet = &mut ctx.accounts.tweet;
        // Get the comment
        let comment = &mut ctx.accounts.comment;
        // Now set the comment authority
        comment.authority = ctx.accounts.authority.key();
        // Set the comment content
        comment.comment_content = comment_content;
        // Set the comment author
        comment.comment_author = comment_author;
        // Set the comment index to tweet comment count
        comment.comment_index = tweet.tweet_comment_count;
        // Increment the tweet comment count
        tweet.tweet_comment_count += 1;
        // Set the comment clock time
        comment.comment_time = ctx.accounts.clock.unix_timestamp;

        Ok(())
    }

}


// Create State Struct
#[derive(Accounts)]
pub struct CreateState<'info> {
    // Authenticate state account
    #[account(
        init, 
        seeds = [b"state".as_ref()],
        bump,
        payer = authority,
        space = size_of::<StateAccount>() + 8 // size of state account and add 8 bytes for discriminator
    )]
    pub state: Account<'info, StateAccount>,

    // Authority who pays for the transaction fee
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,
}

// Create User context
#[derive(Accounts)]
pub struct CreateUser<'info> {
    // Authenticate user account
    #[account(
        init,
        // Use string user and authority as seeds
        seeds = [b"user".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority,
        space = size_of::<UserAccount>() + USER_NAME_LEGNTH + USER_EMAIL_LEGNTH + MAX_COMMENT_LENGTH + 8, // size of user account and USER_NAME_LEGNTH + USER_EMAIL_LEGNTH + 8 bytes for discriminator
    )]
    pub user: Account<'info, UserAccount>,

    // Authority who pays for the transaction fee
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,

    // Save the token program from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save the user created.
    pub clock: Sysvar<'info, Clock>,
}

// Create Tweet Context
#[derive(Accounts)]
pub struct CreateTweet<'info> {
    // Authenticate state account
    #[account(
        mut,
        seeds = [b"state".as_ref()],
        bump,
    )]
    pub state: Account<'info, StateAccount>,

    // Authenticate the tweet account
    #[account(
        init,
        seeds = [b"tweet".as_ref(), state.tweet_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<TweetAccount>() + USER_EMAIL_LEGNTH + USER_NAME_LEGNTH + MAX_TWEET_LENGTH + 8, // size of tweet account and USER_EMAIL_LEGNTH + USER_NAME_LEGNTH + MAX_TWEET_LENGTH + 8 bytes for discriminator
    )]
    pub tweet: Account<'info, TweetAccount>,

    // Authority who pays for the transaction fee
    #[account(mut)]
    pub authority: Signer<'info>,

    // System program for solana
    pub system_program: Program<'info, System>,

    // Save the token program from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save the tweet created.
    pub clock: Sysvar<'info, Clock>,
}

// Create Comment Context
#[derive(Accounts)]
pub struct CreateComment<'info> {
    // authenticate tweet account
    #[account(
        mut,
        seeds = [b"tweet".as_ref(), tweet.tweet_index.to_be_bytes().as_ref()],
        bump,
    )]
    pub tweet: Account<'info, TweetAccount>,
    // Authenticate comment account
    #[account(
        init,
        seeds = [b"comment".as_ref(), tweet.tweet_index.to_be_bytes().as_ref(), tweet.tweet_comment_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<CommentAccount>() + USER_EMAIL_LEGNTH + USER_NAME_LEGNTH + MAX_TWEET_LENGTH + 8, // size of comment account and USER_EMAIL_LEGNTH + USER_NAME_LEGNTH + MAX_TWEET_LENGTH + 8 bytes for discriminator
    )]
    pub comment: Account<'info, CommentAccount>,

    // Authority who pays for the transaction fee
    #[account(mut)]
    pub authority: Signer<'info>,
    // System program for solana
    pub system_program: Program<'info, System>,
    // Save the token program from spl_token
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save the comment created.
    pub clock: Sysvar<'info, Clock>,
}



// State Account
#[account]
pub struct StateAccount {
    // Signer address
    pub authority: Pubkey,
    // Tweet count
    pub tweet_count: u64,
}

// User Account
#[account]
pub struct UserAccount {
    // User name
    pub user_name: String,
    // User email
    pub user_email: String,
    // User wallet address
    pub user_wallet_address: Pubkey,
}

// Tweet Account
#[account]
pub struct TweetAccount {
    // authority
    pub authority: Pubkey,
    // tweet content
    pub tweet_content: String,
    // tweet author
    pub tweet_author: String,
    // tweet comment count
    pub tweet_comment_count: u64,
    // tweet index
    pub tweet_index: u64,
    // tweet created at
    pub tweet_time: i64,
}

// Comment Account 
#[account]
pub struct CommentAccount {
    // authority
    pub authority: Pubkey,
    // comment content
    pub comment_content: String,
    // comment author
    pub comment_author: String,
    // comment index
    pub comment_index: u64,
    // comment created at
    pub comment_time: i64,
}

