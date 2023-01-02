// use is the equivalent to the import statement
use anchor_lang::prelude::*;

// the id of the program and tells solana how to run the program
// the id is a hash of the program source code
// update the id from the placeholder initially created with anchor init
declare_id!("E1sKKb4RBperWd4uT1o7mXxRovGfmauytybquhsnwY7r");

// #[] is a macro http://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/macros.html
// They allows us to define a function that takes no arguments and returns nothing
// sorta like inheriting a class
#[program]
// pub mod is a rust module. https://stevedonovan.github.io/rust-gentle-intro/4-modules.html
// Pub is the equivalent to the public keyword. A module is an easy way to define a collection of function and variables
pub mod project_2_solana_gif_portal_starter_contract {
    use super::*;
    // start_stuff_off takes some Context and outputs a ProgramResult
    // OK(()) is a ProgramResult that is a success https://doc.rust-lang.org/std/result/
    pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {
        // reference to the account. We use &mut to get a "mutable reference" to base_account. Allows us to modify the account
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_gifs = 0;
        Ok(())
    }

    // add_gif Function.. Context is set to Context<AddGif>
    // add_gif also allows to accept the gif_link as an argument
    pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> ProgramResult {
        // Get a reference to the account and increment total_gifs.
        let base_account = &mut ctx.accounts.base_account;

        // reference to the user account.
        let user = &mut ctx.accounts.user;

        // item is a struct that contains the gif_link and the user_address
        let item = ItemStruct {
            gif_link: gif_link.to_string(),
            user_address: *user.to_account_info().key,
        };

        // Add the item to the list of gifs
        base_account.gif_list.push(item);

        // Increment total_gifs
        base_account.total_gifs += 1;
        Ok(())
    }

    pub fn clear_gifs(ctx: Context<ClearGifs>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.gif_list.clear();
        base_account.total_gifs = 0;
        Ok(())
    }
}

// another macro which acts like a class, interface, or an object
// Attach certain variables to the StartStuffOff context.
#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    // initializes the BaseAccount data
    // https://docs.solana.com/developing/programming-model/accounts#rent
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>, // base_account is a reference to the BaseAccount

    #[account(mut)]
    pub user: Signer<'info>, // data passed into the program that proves to the program that the user calling this program actually owns their wallet account.

    pub system_program: Program<'info, System>, //  It is a program that is run by the system. SystemProgram is the program that basically runs Solana.
                                                // https://docs.solana.com/developing/runtime-facilities/programs#system-program
}

// Specify what data you want in the AddGif Context.
#[derive(Accounts)]
pub struct AddGif<'info> {
    // account(mut) is a reference to the BaseAccount and allows to change the total_gifs value
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,

    // we add the signer who calls the AddGif method to the struct to save it in the AddGif context
    #[account(mut)]
    pub user: Signer<'info>,
}

// clear_gifs is a struct that contains the BaseAccount and the user
#[derive(Accounts)]
pub struct ClearGifs<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,

    #[account(mut)]
    pub user: Signer<'info>,
}

// declaring a new struct called ItemStruct
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)] // https://docs.rs/anchor-lang/0.4.0/anchor_lang/trait.AnchorSerialize.html
pub struct ItemStruct {
    pub gif_link: String,
    pub user_address: Pubkey,
}

// Tell Solana what we want to store on this account. Data is stored in accounts not on the contract
// https://docs.solana.com/developing/programming-model/accounts
#[account]
pub struct BaseAccount {
    // total_gifs is the number of gifs in the gif_list
    // u64 is a 64 bit unsigned integer
    pub total_gifs: u64,

    //gif_list is a new parameter
    // vec is a vector of ItemStruct
    // https://doc.rust-lang.org/std/vec/struct.Vec.html
    pub gif_list: Vec<ItemStruct>,
}
