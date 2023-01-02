use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod to_do_list {
    use super::*;

    pub fn create(ctx: Context<Create>, user_name: String) -> ProgramResult {
        let todo_list = &mut ctx.accounts.todo_list;
        todo_list.user_name = user_name;
        todo_list.tasks = vec![];
        Ok(())
    }

    pub fn new_task(ctx: Context<NewTask>, task_item: String) -> ProgramResult {
        let todo_list = &mut ctx.accounts.todo_list;
        todo_list.tasks.push(task_item);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=264)]
    pub todo_list: Account<'info, ToDoList>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct NewTask<'info> {
    #[account(mut)]
    pub todo_list: Account<'info, ToDoList>,
}

#[account]
pub struct ToDoList {
    pub user_name: String,
    pub tasks: Vec<String>,
}
