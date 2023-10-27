import { createReducer } from "@reduxjs/toolkit";
import { IUserReducer } from "@/store/user/types";
import { getUserDataFailure, getUserDataInit, getUserDataSuccess } from "@/store/user/actions";

const initialState: IUserReducer = {
	error: { status: 0, message: "" },
	loading: false,
	details: null,
};

export const Reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(getUserDataInit, (state) => {
			state.loading = true;
		})
		.addCase(getUserDataSuccess, (state, action) => {
			state.loading = false;
			state.error = initialState.error;
			state.details = action.payload;
		})
		.addCase(getUserDataFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
});
