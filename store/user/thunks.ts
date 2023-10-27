import axios, { AxiosResponse } from "axios";
import { AppThunk } from "../store";
import { getUserDataFailure, getUserDataInit, getUserDataSuccess } from "@/store/user/actions";
import { IUser } from "@/store/user/types";
import { IError } from "@/store/common/common";

export const getUserData = (token: string) => (dispatch: AppThunk) => {
	dispatch(getUserDataInit());
	return new Promise<IUser>((resolve, reject) => {
		axios<IUser>({
			method: "GET",
			url: "/api/auth/user",
			headers: {
				Authorization: `Barer ${token}`,
			},
		})
			.then(async (response: AxiosResponse) => {
				dispatch(getUserDataSuccess(response.data));
				resolve(response.data);
			})
			.catch((error: IError) => {
				dispatch(getUserDataFailure(error));
				reject(error);
			});
	});
};
