use anchor_lang::prelude::*;

declare_id!("FtSHo9DxJqmyM4AoMyAVAE5umLdQvc5LfbVepwy7419Q");

#[program]
pub mod solanatestproject {
  use super::*;
  pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
    // Get a reference to the account.
    let base_account = &mut ctx.accounts.base_account;

    // Initialize total_gifs.
    base_account.total_gifs = 0;
    Ok(())
  }

  pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> ProgramResult {
    // Get a reference to the account.
    let base_account = &mut ctx.accounts.base_account;

    let user = &mut ctx.accounts.user;
    // Increment total_gifs.
    base_account.total_gifs += 1;

    base_account.gif_list.push(ItemStore {gif_link: gif_link.to_string(), user_address: *user.to_account_info().key});
    Ok(())
  }
}

#[derive(Accounts)]
pub struct AddGif<'info> {
    #[account(mut)]
    base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    user: Signer<'info>
}

// Attach certain variables to the StartStuffOff context.
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

// Tell Solana what we want to store on this account.
#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
    pub gif_list: Vec<ItemStore>
}

#[derive(Debug,Clone,AnchorSerialize,AnchorDeserialize)]
pub struct ItemStore {
    pub gif_link: String,
    pub user_address: Pubkey
}