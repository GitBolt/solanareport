
/*
* * Solana programs are stateless by design. They don't hold data permanently like Ethereum smart contracts do.
* * Solana programs interact w/ accounts. They can read and write data to and from accounts.
* * Solana programs can also make an "account" that it can interact with.
* * In Solana, users need to pay "rent" to store data in an account, equivalent to storing it in a database. 
* * The SystemProgram is a program the creators of Solana deployed that other programs can talk to — it has an id of 11111111111111111111111111111111
*/


// import Anchor tools
use anchor_lang::prelude::*;

// information for Solana on how to run the program (gen by Anchor)
declare_id!("2KJ3ACmu7Us62Z5hhMRJxZydPXE9xEr8t7VNd5fEtJxE");

#[program] //let's frontend client call Solana program via fetch req
pub mod solanagif { // rust module
	use super::*;
	pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {
		// Get mutable reference to the base account (&mut)
		// this enables us to make changes to the base_account
		let base_account = &mut ctx.accounts.base_account;
		base_account.total_gifs = 0;
		Ok(())
	}

	// add gif to base account
	// function accepts a reference to the context and a gif link
	pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> ProgramResult {
		// Get mutable reference to the base account and increment total_gifs
		let base_account = &mut ctx.accounts.base_account;
		let user = &mut ctx.accounts.user;

		// set struct values
    let item = ItemStruct {
      gif_link: gif_link.to_string(),
      user_address: *user.to_account_info().key,
    };
		
		// Add item to the gif_list vector.
    base_account.gif_list.push(item);
		base_account.total_gifs += 1;
		Ok(())
	}

}

/*
 * * #[account(init, payer = user, space = 9000)] = instruct Solana how to initialize the base account
 * * init = tell Solana to create a new account owned by our current program.
 * * payer = user tells our program who is paying for this account to be created. (in this case, the user calling the program)
 * * space == 9000 tells Solana how much space to allocate for this account.
 * 
 * * pub user: Signer<'info> = data passed into the program that proves to the program the user calling this program actually owns their wallet account.
 * * pub system_program: a reference to the SystemProgram (a program that runs Solana)
 * 	 										 it's main task is to create accounts on Solana.
 */

// Attach certain variables to the StartStuffOff context.
#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

// Specify what data you want in the AddGif context
// Context named AddGif has a mutable reference to the base account
// Add the signer who calls the AddGif method to the struct so that we can save it
#[derive(Accounts)]
pub struct AddGif<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}


// struct that holds the data we want to save in the base account
// string w/ a get_link and Pubkey w/ the user_address
// #[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)] = instruct Anchor to serialize and deserialize this struct
// In solana, data is stored in accounts, which is basically a file
// We serialize the struct into binary format before storing it in the account
// We deserialize the binary data into the struct when we read it from the account
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub gif_link: String,
    pub user_address: Pubkey,
}

// Initializing an account
// Tell Solana what we want to store on this account.
// an integer counter and gif list vector type of ItemStruct
#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
	// Vector of type ItemStruct to the account.
    pub gif_list: Vec<ItemStruct>,
}