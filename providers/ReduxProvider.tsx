"use client";

import { FC } from "react";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/store/store";
import { Provider } from "react-redux";
import { ReactNode } from "react";

const ReduxProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{children}</PersistGate>
		</Provider>
	);
};

export default ReduxProvider;
