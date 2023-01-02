use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint, 
    entrypoint::ProgramResult,
    msg, 
    pubkey::Pubkey,
};

entrypoint!(process_instruction);
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("TRANSACTION COMPLETE");
    msg!(
        "process_instruction: {}: {} accounts, data={:?}",
        program_id,
        accounts.len(),
        instruction_data
    );
    msg!(
        "listed account {:?}",
        accounts[0],
    );
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    msg!(
        "listed account {:?}",
        account,
    );
    Ok(())
}
