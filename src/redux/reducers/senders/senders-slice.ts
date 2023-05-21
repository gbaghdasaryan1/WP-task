import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISenderInitialState } from "./types";
import { ISender } from "../../../shared/components/senders/types";

export const initialState: ISenderInitialState = {
    senders: [],
};

const slice = createSlice({
    name: "senders",
    initialState,
    reducers: {
        setSenders: (state, { payload }: PayloadAction<ISender[]>) => {
            state.senders = payload;
        },
    },
});

export const { setSenders } = slice.actions;

export default slice.reducer;
