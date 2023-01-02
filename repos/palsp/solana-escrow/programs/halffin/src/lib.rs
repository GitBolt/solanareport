use anchor_lang::prelude::*;
use anchor_spl::token::{ self ,Transfer, TokenAccount, Token, SetAuthority};
use spl_token::instruction::AuthorityType;
use std::ops::Deref;

declare_id!("28Y6Ezy4za168iKHsWb1iUih7pDw1NzBWFJ4Kya8FmQb");

#[program]
pub mod halffin {
    use super::*;

    const VAULT_PDA_SEED: &[u8] = b"escrow_vault";


    pub fn initialize_product(
        ctx: Context<Initialize>,
        name: String,
        bump: u8,
        price: u64,
        lock_period: u64,
    ) -> ProgramResult {
        msg!("INITIALIZE PRODUCT");
        if name.len() <= 0 {
            return Err(ErrorCode::EmptyName.into())
        }
        let product_account = &mut ctx.accounts.product_account;
        let name_bytes = name.as_bytes();
        let mut name_data = [b' '; 20];
        name_data[..name_bytes.len()].copy_from_slice(name_bytes);

        product_account.name = name_data;
        product_account.bump = bump;
        product_account.price = price;
        product_account.lock_period = lock_period;
        product_account.seller = *ctx.accounts.authority.to_account_info().key;
        product_account.token_to_receive_account_pubkey = ctx.accounts.token_to_receive_account.key();
        product_account.mint_pubkey = ctx.accounts.token_to_receive_account.mint;

        Ok(())
    }

    pub fn initialize_product_sol(
        ctx: Context<InitializeNativeSOL>,
        name: String, 
        bump: u8,
        price: u64,
        lock_period: u64,
    ) -> ProgramResult {
        msg!("INITIALIZE NATIVE SOL");
        let product_account = &mut ctx.accounts.product_account;
        let name_bytes = name.as_bytes();
        let mut name_data = [b' '; 20];
        name_data[..name_bytes.len()].copy_from_slice(name_bytes);

        product_account.name = name_data;
        product_account.bump = bump;
        product_account.price = price;
        product_account.lock_period = lock_period;
        product_account.seller = *ctx.accounts.authority.to_account_info().key;
        
        Ok(())
    }

    pub fn create_order(ctx: Context<CreateOrder>) -> ProgramResult {
        msg!("CREATE ORDER");
        let clock: Clock = Clock::get().unwrap();

        ctx.accounts.product_account.buyer = *ctx.accounts.buyer.to_account_info().key;
        ctx.accounts.product_account.stage = Stage::WaitForShipping;
        ctx.accounts.product_account.timestamp = clock.unix_timestamp;
        ctx.accounts.product_account.temp_token_account_pubkey = ctx.accounts.temp_token_account.key();

        token::set_authority(ctx.accounts.into(), AuthorityType::AccountOwner, Some(ctx.accounts.product_account.key()))?;
        Ok(())
    }

    pub fn create_order_sol(ctx: Context<CreateOrderSOL>) -> ProgramResult {
        msg!("CREATE ORDER SOL");
        let clock: Clock = Clock::get().unwrap();

        ctx.accounts.product_account.buyer = *ctx.accounts.buyer.to_account_info().key;
        ctx.accounts.product_account.stage = Stage::WaitForShipping;
        ctx.accounts.product_account.timestamp = clock.unix_timestamp;

        let (pda, _bump_seed) = Pubkey::find_program_address(&[VAULT_PDA_SEED], ctx.program_id);

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.buyer.key(), 
            &pda, 
            ctx.accounts.product_account.price);

        anchor_lang::solana_program::program::invoke(
            &ix, 
            &[
                ctx.accounts.buyer.to_account_info(),
                ctx.accounts.pda_account.clone(),
                ctx.accounts.system_program.to_account_info(),
            ])?;

        msg!("PROGRAM HAS {} lamports",ctx.accounts.pda_account.lamports());

        Ok(())
    }

    pub fn update_shipping_detail(ctx: Context<UpdateShippingDetail> , tracking_id: String) -> ProgramResult {
        msg!("UPDATE SHIPPING DETAIL");
        let tracking_id_bytes = tracking_id.as_bytes();

        if  tracking_id_bytes.len() <= 0 || tracking_id_bytes.len() > 10 {
            return Err(ErrorCode::InvalidTrackingId.into());
        }

        let mut tracking_id_data = [b' '; 10];
        tracking_id_data[..tracking_id_bytes.len()].copy_from_slice(tracking_id_bytes);
        ctx.accounts.product_account.tracking_id = tracking_id_data;
        ctx.accounts.product_account.stage = Stage::ShippingInProgress;
        Ok(())
    }

    pub fn fulfill_shipping_detail(ctx: Context<FulFillShippingDetail>) -> ProgramResult {
        msg!("FULFILL SHIPPING DETAIL");
        // TODO: replace mock with chainlink oracle
        ctx.accounts.product_account.stage = Stage::Delivered;
        Ok(())
    }

    pub fn withdraw_fund(ctx : Context<WithdrawFund>) -> ProgramResult {
        msg!("WITHDRAW FUND");
        let product_name = ctx.accounts.product_account.name.as_ref();
        let seeds = &[
            ctx.accounts.authority.to_account_info().key.as_ref(),
            product_name.trim_ascii_whitespace(),
            &[ctx.accounts.product_account.bump],
        ];

        let signer = &[&seeds[..]];
        let cpi_accounts = Transfer {
            from : ctx.accounts.temp_token_account.to_account_info(),
            to : ctx.accounts.seller_token_to_receive_account.to_account_info(),
            authority : ctx.accounts.product_account.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);

        token::transfer(cpi_ctx, ctx.accounts.temp_token_account.amount)?;
        
        Ok(())
    }

    pub fn withdraw_sol(ctx : Context<WithdrawSol>) -> ProgramResult {
        msg!("WITHDRAW FUND");
        msg!("PDA ACCOUNT HAS {} lamports" , ctx.accounts.pda_account.lamports());

        let (_pda , bump_seed) = Pubkey::find_program_address(&[VAULT_PDA_SEED], ctx.program_id);
        let seeds = [&VAULT_PDA_SEED[..], &[bump_seed]];

        let signer = &[&seeds[..]];


        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.pda_account.key(), 
            &ctx.accounts.authority.key(), 
            ctx.accounts.product_account.price);

        anchor_lang::solana_program::program::invoke_signed(
            &ix, 
            &[
                ctx.accounts.pda_account.to_account_info(),
                ctx.accounts.authority.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            signer
        )?;

       
        Ok(())
    }

}



/**
 * NOTE: order of parameters of instruction matter!!!!!!
 */
#[derive(Accounts)]
#[instruction(name: String, bump: u8)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init, 
        seeds = [
            authority.key().as_ref(),
            name.as_bytes()],
        bump = bump,
        payer = authority,
    )]
    pub product_account: Box<Account<'info, Product>>,

    pub token_to_receive_account: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,

    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(name: String, bump : u8)]
pub struct InitializeNativeSOL<'info> {
    pub authority: Signer<'info>,

    #[account(
        init, 
        seeds = [
            authority.key().as_ref(),
            name.as_bytes()],
        bump = bump,
        payer = authority,
    )]
    pub product_account: Box<Account<'info, Product>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateOrder<'info> {
    buyer: Signer<'info>,

    #[account(
        mut, 
        constraint = product_account.stage == Stage::Initiate @ ErrorCode::InvalidStage , 
        constraint = buyer.key() != product_account.seller)]
    product_account: Account<'info, Product>,


    #[account(
        mut,
        constraint = product_account.price == temp_token_account.amount @ ErrorCode::InsufficientFund, 
        constraint = temp_token_account.mint == product_account.mint_pubkey,
    )]
    temp_token_account : Account<'info, TokenAccount>,

    token_program : Program<'info, Token>,
}


#[derive(Accounts)]
pub struct CreateOrderSOL<'info>{
    #[account(mut)]
    buyer: Signer<'info>,

    #[account(
        mut, 
        constraint = product_account.stage == Stage::Initiate @ ErrorCode::InvalidStage , 
        constraint = buyer.key() != product_account.seller)]
    product_account: Account<'info, Product>,
    
    #[account(mut)]
    pda_account: AccountInfo<'info>,


    system_program : Program<'info, System>,
}


impl<'info> From<&mut CreateOrder<'info>> for CpiContext<'_, '_, '_, 'info, SetAuthority<'info>> {
    fn from(accounts: &mut CreateOrder<'info>) -> Self {
      let cpi_accounts = SetAuthority {
        account_or_mint: accounts.temp_token_account.to_account_info().clone(),
        current_authority: accounts.buyer.to_account_info().clone(),
      };
      let cpi_program = accounts.token_program.to_account_info();
      CpiContext::new(cpi_program, cpi_accounts)
    }
  }


#[derive(Accounts)] 
pub struct UpdateShippingDetail<'info> {
    authority: Signer<'info>,

    #[account(mut, 
        constraint = product_account.seller == authority.key(),
        constraint = product_account.stage == Stage::WaitForShipping
    )]
    product_account: Account<'info, Product>
}

#[derive(Accounts)]
pub struct FulFillShippingDetail<'info>{
    authority: Signer<'info>,


    #[account(
        mut,
        constraint = product_account.seller == authority.key(),
        constraint = product_account.stage == Stage::ShippingInProgress @ ErrorCode::InvalidStage
    )]
    product_account: Account<'info, Product>
}

#[derive(Accounts)]
pub struct WithdrawFund<'info> {
    authority: Signer<'info>,

    #[account(
        mut, 
        constraint = product_account.seller == authority.key(),
        constraint = product_account.stage == Stage::Delivered @ ErrorCode::InvalidStage,
        constraint = product_account.token_to_receive_account_pubkey == seller_token_to_receive_account.key(),
        constraint = product_account.temp_token_account_pubkey == temp_token_account.key(),
        close = authority,
    )]
    product_account : Account<'info, Product>,

    #[account(mut)]
    temp_token_account : Account<'info, TokenAccount>,

    #[account(mut)]
    seller_token_to_receive_account: Account<'info, TokenAccount>,


    token_program : Program<'info, Token>,

}

#[derive(Accounts)]
pub struct WithdrawSol<'info> {
    #[account(mut)]
    authority: Signer<'info>,

    #[account(
        mut, 
        constraint = product_account.seller == authority.key(),
        constraint = product_account.stage == Stage::Delivered @ ErrorCode::InvalidStage,
        close = authority,
    )]
    product_account : Account<'info, Product>,


    #[account(mut)]
    pda_account: AccountInfo<'info>,

    system_program : Program<'info, System>,

}


// impl<'info>

#[account]
#[derive(Default)]
pub struct Product {
    seller: Pubkey,
    buyer: Pubkey,
    name: [u8; 20],
    bump : u8,
    tracking_id : [u8; 10],
    mint_pubkey: Pubkey,
    lock_period: u64,
    stage: Stage,
    price: u64,
    timestamp : i64,
    temp_token_account_pubkey :Pubkey,
    token_to_receive_account_pubkey: Pubkey,
}



#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq)]
pub enum Stage {
    Initiate,
    WaitForShipping,
    ShippingInProgress,
    Delivered,
}

impl Default for Stage {
    fn default() -> Self {
        Stage::Initiate
    }
}


#[error]
pub enum ErrorCode {
    #[msg("invalid tracking id")]
    InvalidTrackingId,
    #[msg("invalid stage")]
    InvalidStage,
    #[msg("insufficient fund")]
    InsufficientFund,
    #[msg("name must not be empty")]
    EmptyName,
}


/// Trait to allow trimming ascii whitespace from a &[u8].
pub trait TrimAsciiWhitespace {
    /// Trim ascii whitespace (based on `is_ascii_whitespace()`) from the
    /// start and end of a slice.
    fn trim_ascii_whitespace(&self) -> &[u8];
  }
  
  impl<T: Deref<Target = [u8]>> TrimAsciiWhitespace for T {
    fn trim_ascii_whitespace(&self) -> &[u8] {
      let from = match self.iter().position(|x| !x.is_ascii_whitespace()) {
        Some(i) => i,
        None => return &self[0..0],
      };
      let to = self.iter().rposition(|x| !x.is_ascii_whitespace()).unwrap();
      &self[from..=to]
    }
  }