"use client";

import { FC, useState } from "react";
import Button from "./Button";

import { useAppSelector } from "@/store/store";

import axios from "axios";

const AccountButton: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const store = useAppSelector((store) => store);

	const isVerified = store.user.details?.verify || false;
	const user = store.user.details?.user;

	const handleLogout = () => {
		axios.get("/api/auth/logout").then(() => (window.location.href = "/"));
	};

	return (
		<div className="relative">
			<Button variant="primary" label="Moje konto" size="sm" onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<div className="absolute w-64 right-0 p-3 rounded-md border text-sm border-light-hover dark:border-dark-hover bg-white dark:bg-dark top-10">
					<div className="text-center flex flex-col gap-2">
						{isVerified ? (
							<>
								<span className="font-bold text-lg">{user?.fullName}</span>
								<hr className="mt-1.5" />
								<Button path="/ustawienia" variant="secondary" size="sm" label="Ustawienia" />
								<Button variant="primary" size="sm" label="Wyloguj się" onClick={handleLogout} />
							</>
						) : (
							<>
								<p>Zaloguj się i uzyskaj dostęp do&nbsp;funkcji portalu.</p>
								<Button path="/logowanie" variant="secondary" size="sm" label="Zaloguj się" />
								<hr className="mt-1.5" />
								<p>Nie masz jeszcze konta?</p>
								<Button path="/rejestracja" variant="primary" size="sm" label="Zarejestuj się" />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default AccountButton;
