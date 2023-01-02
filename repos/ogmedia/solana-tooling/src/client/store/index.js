import {
    createStore,
    createLogger
} from "vuex";

import { 
    establishConnection,
    createPayer,
    getProgramInfo,
    // checkProgram,
    testTransaction,
    ACCT_SIZE,
    createProgramAccountKeyWithSeed,
    createProgramAccount,
    airdrop,
} from "../solana_lib.js";

const logger = createLogger({
  collapsed: false, // auto-expand logged mutations
  filter (mutation, stateBefore, stateAfter) {
    // returns `true` if a mutation should be logged
    // `mutation` is a `{ type, payload }`
    return mutation.type !== "aBlacklistedMutation"
  },
  actionFilter (action, state) {
    // same as `filter` but for actions
    // `action` is a `{ type, payload }`
    return action.type !== "aBlacklistedAction"
  },
  transformer (state) {
    // transform the state before logging it.
    // for example return only a specific sub-tree
    return state.subTree
  },
  mutationTransformer (mutation) {
    // mutations are logged in the format of `{ type, payload }`
    // we can format it any way we want.
    return mutation.type
  },
  actionTransformer (action) {
    // Same as mutationTransformer but for actions
    return action.type
  },
  logActions: true, // Log Actions
  logMutations: true, // Log mutations
  logger: console, // implementation of the `console` API, default `console`
});

const store = createStore({
    plugins: [logger],
    state (){
        return {
            appLoaded: false,
            connectionEstablished: false,
            connectionInfo: {},
            connectionError: null,
            connection: null,
            programAvailable: false,
            programError: false,
            program: {},
            programAccounts: [],
            payers: [],
        }
    },
    "getters": {
        appLoaded (state) {
            return state.appLoaded;
        },
        hasConnection (state) {
            return state.connectionEstablished;
        },
        connectionInfo (state) {
            return state.connectionInfo;
        },
        connectionError (state) {
            return state.connectionError;
        },
        connection (state) {
            return state.connection;
        },
        hasPayer (state) {
            return state.payerEstablished;
        },
        payerInfo (state) {
            return state.payerInfo;
        },
        programReady (state) {
            return state.programAvailable;
        },
        programInfo (state) {
            return state.program;
        },
        // imageGrey (state) {
        //     return state.imageGrey;
        // },

        getPayers(state) {
            return state.payers;
        },

        getProgramAccounts(state) {
            return state.programAccounts;
        },
        getProgramAccount(state, index) {
            const accts = state.programAccounts;
            return accts[index];
        },

        //
        hasProgramError (state) {
            return state.programError;
        },
    },
    "actions": {
        finishedLoading(context) {
            context.commit("FINISHED_LOADING");
        },
        async setupConnection(context) {
            try {
                const { connection, info } = await establishConnection();
                context.commit("UPDATE_CONNECTION_DETAILS", info);
                context.commit("UPDATE_CONNECTION_STATUS", true);
                context.commit("UPDATE_CONNECTION", connection);
                context.commit("SET_CONNECTION_ERROR", null);
            }
            catch (e) {
                console.error("Error establishing connection:", e);
                context.commit("SET_CONNECTION_ERROR", e);
            }
        },
        async setupPayer(context) {
            try {
                const { payerAccount, payerBalance, payerPublickey } = await createPayer(context.getters["connection"]);
                console.log("back with payer");
                console.log({ payerAccount, payerBalance });
                context.commit("ADD_PAYER", { payerAccount, payerBalance });
            }
            catch (e) {
                console.error("Error establishing payer:", e);
            }
        },
        async setupProgram(context) {
            try {
                const { 
                    programId, 
                    programInfo,
                } = await getProgramInfo(
                    context.getters["connection"],
                );

                context.commit("UPDATE_PROGRAM_STATUS", true);
                context.commit("UPDATE_PROGRAM_INFO", { programInfo, programId });
                context.commit("UPDATE_PROGRAM_ERROR", false);
                // context.commit("ADD_PROGRAM_ACCOUNT", perceptronPubkey);

            }
            catch (e) {
                console.log("Error finding program:", e);
                context.commit("UPDATE_PROGRAM_ERROR", e);
            }
        },
        async runTestTransaction(context) {
            // const conn = context.getters["connection"];
            // const { programId } = context.getters["programInfo"];
            // const { payerAccount } = context.getters["payerInfo"];
            // const res = await testTransaction(conn, perceptronPubkey, programId, payerAccount, null);
            // console.log("test transaction complete", res);
        },

        //
        //
        async createProgramKeyAndAccountFromSeed(context, { seed, payerIndex }) {
            const conn = context.getters["connection"];
            const { programId } = context.getters["programInfo"];
            const payer = context.state.payers[payerIndex];
            console.log(context);
            console.log(payer);
            const accountKey = await createProgramAccountKeyWithSeed (programId, payer.payerAccount, seed);
            console.log("created new programa account key");
            const programAccount = await createProgramAccount (conn, programId, accountKey, ACCT_SIZE, payer.payerAccount, seed);
            context.commit("ADD_PROGRAM_ACCOUNT", { accountKey, payerAccount: payer.payerAccount });
        },

        async getProgramAccountInfo(context, {accountKey}) {
            const conn = context.getters["connection"];
            let account = await conn.getAccountInfo(accountKey);
            console.log('account info:', account);
            return account;
        },
        // async createProgramAccountFromKey(context) {
        //     const conn = context.getters["connection"];
        //     const { perceptronPubkey, programId } = context.getters["programInfo"];
        //     const { payerAccount } = context.getters["payerInfo"];
        //     const res = await testTransaction(conn, perceptronPubkey, programId, payerAccount, null);
        //     console.log("test transaction complete", res);           
        // }
        async airdropAccount (context, payerIndex) {
            const conn = context.getters["connection"];
            const payer = context.state.payers[payerIndex];
            console.log("Airdrop initiated for", payer);
            const { payerAccount, payerBalance } = await airdrop(conn, payer.payerAccount, 10000000);
            context.commit("UPDATE_PAYER", { payerAccount, payerBalance, payerIndex });
        }
    },
    "mutations": {
        ["FINISHED_LOADING"] (state) {
            state.appLoaded = true;
        },
        ["UPDATE_CONNECTION_STATUS"] (state, status) {
            state.connectionEstablished = true;
        },
        ["UPDATE_CONNECTION_DETAILS"] (state, connInfo) {
            state.connectionInfo = connInfo;
        },
        ["SET_CONNECTION_ERROR"] (state, err) {
            state.connectionError = err;
        },
        ["UPDATE_CONNECTION"] (state, conn) {
            state.connection = conn;
        },
        ["UPDATE_PROGRAM_STATUS"] (state, status) {
            state.programAvailable = status;
        },
        ["UPDATE_PROGRAM_INFO"] (state, info) {
            state.program = info;
        },
        ["UPDATE_PAYER_STATUS"] (state, status) {
            state.payerEstablished = true;
        },
        ["UPDATE_PAYER_DETAILS"] (state, info) {
            state.payerInfo = info;
        },
        // ["UPDATE_IMAGE_DATA_RED"] (state, c) {
        //     state.imageRed = c;
        // },
        // ["UPDATE_IMAGE_DATA_GREEN"] (state, c) {
        //     state.imageGreen = c;
        // },
        // ["UPDATE_IMAGE_DATA_BLUE"] (state, c) {
        //     state.imageBlue = c;
        // },
        // ["UPDATE_IMAGE_DATA_GREY"] (state, c) {
        //     state.imageGrey = c;
        // },
        // ["UPDATE_IMAGE_DATA_INVERT"] (state, c) {
        //     state.imageInvert = c;
        // },

        ["ADD_PROGRAM_ACCOUNT"] (state, acct) {
            state.programAccounts.push(acct);
        },
        ["ADD_PAYER"] (state, pyr) {
            state.payers.push(pyr);
        },
        ["UPDATE_PAYER"] (state, { payerAccount, payerBalance, payerIndex }) {
            state.payers[payerIndex] = { payerAccount, payerBalance };
        },

        //
        ["UPDATE_PROGRAM_ERROR"] (state, c) {
            state.programError = c;
        },
    },
});

export default store;
