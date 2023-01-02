use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, init_message: String) -> Result<()> {
        let hello_world = &mut ctx.accounts.hello_world;

        hello_world.author = *ctx.accounts.user.key;
        hello_world.init_message = init_message;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer=user, space=200)]
    pub hello_world: Account<'info, HelloWorld>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct HelloWorld {
    author: Pubkey,
    init_message: String,
}
