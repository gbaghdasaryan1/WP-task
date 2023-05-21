import { combineReducers } from "@reduxjs/toolkit";
import { messagesApi } from "../services/messagesAPI";
import tokensReducer from "./reducers/tokens/tokens-slice";
import senderReducer from "./reducers/senders/senders-slice";

const rootReducer = combineReducers({
    tokens: tokensReducer,
    senders: senderReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
