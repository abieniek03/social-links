import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { Reducer as userReducer } from "@/store/user/reducers";

export const rootReducer = combineReducers({
	user: userReducer,
});

const persistConfig = {
	key: "remoteJobIT",
	storage: storage,
	whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}).concat(...middlewares),
});

export default store;

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = (...args: any[]) => void;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
