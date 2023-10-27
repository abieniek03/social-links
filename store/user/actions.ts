import { createAction } from "@reduxjs/toolkit";
import { IUser } from "@/store/user/types";
import { IError } from "@/store/common/common";

export const getUserDataInit = createAction("user/data/init");
export const getUserDataSuccess = createAction<IUser>("user/data/success");
export const getUserDataFailure = createAction<IError>("user/data/failure");
