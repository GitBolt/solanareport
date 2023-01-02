use anchor_lang::prelude::*;

declare_id!("2yr87xMTQZxR8JCF6xQR22Q5qh64qyhX1CvcCSWZGAZE");

#[program]
mod mysolanaapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let program_account = &mut ctx.accounts.program_account;
        program_account.count = 0;
        program_account.bump = *ctx.bumps.get("program_account").unwrap();
        Ok(())
    }

    pub fn create(ctx: Context<Create>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count += 1;

        let program_account = &mut ctx.accounts.program_account;
        program_account.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8 + 1, seeds = [b"initialize".as_ref()], bump)]
    pub program_account: Account<'info, ProgramAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut, seeds = [b"initialize".as_ref()], bump = program_account.bump)]
    pub program_account: Account<'info, ProgramAccount>,
}

#[account]
#[derive(Default)]
pub struct BaseAccount {
    pub count: u64,
}

#[account]
#[derive(Default)]
pub struct ProgramAccount {
    pub count: u64,
    pub bump: u8,
}
