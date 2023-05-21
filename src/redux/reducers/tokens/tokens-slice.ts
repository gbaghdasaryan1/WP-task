import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITokens } from "./types";

export const initialState: ITokens = {
    apiTokenInstance: "",
    idInstance: "",
    tokenModal: true,
    selectedRecipientNumber: "",
    newNumber: "",
};

const slice = createSlice({
    name: "tokens",
    initialState,
    reducers: {
        setApiToken: (state, { payload }: PayloadAction<string>) => {
            state.apiTokenInstance = payload;
        },
        setIdInstance: (state, { payload }: PayloadAction<string>) => {
            state.idInstance = payload;
        },
        setTokenModal: (state, { payload }: PayloadAction<boolean>) => {
            state.tokenModal = payload;
        },
        setSelectedRecipientNumber: (state, { payload }: PayloadAction<string>) => {
            if (payload.includes("@")) {
                state.selectedRecipientNumber = payload;
            } else {
                state.selectedRecipientNumber = `${payload}@c.us`;
            }
        },
        setNewNumber: (state, { payload }: PayloadAction<string>) => {
            state.newNumber = payload;
        },
        resetTokens: (state) => {
            state.apiTokenInstance = "";
            state.idInstance = "";
        },
    },
});

export const { setApiToken, setIdInstance, resetTokens, setTokenModal, setSelectedRecipientNumber, setNewNumber } =
    slice.actions;

export default slice.reducer;
