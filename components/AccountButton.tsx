"use client";

import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Button from "./Button";

import defaultAvatar from "@/assets/default-avatar.png";

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
				<div className="absolute z-10 w-64 top-10 right-0 p-3 rounded-md border text-sm border-light-hover dark:border-dark-hover bg-white dark:bg-dark ">
					<div className="text-center flex flex-col gap-2.5">
						{isVerified && user ? (
							<>
								<Link
									onClick={() => setIsOpen(!isOpen)}
									href={`/profil/${user.profileId}`}
									className="flex justify-center gap-2 cursor-pointer pb-2 border-b dark:border-dark-hover"
								>
									<Image src={user.avatar || ""} alt="" height={25} width={25} className="rounded-full" />
									<span className="font-bold text-lg">
										{user.firstName} {user.lastName}
									</span>
								</Link>
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
