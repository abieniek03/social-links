"use client";
import { FC, ChangeEvent, useState, useEffect } from "react";
import Image from "next/image";

import Button from "./Button";

import { IoSearchSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import axios from "axios";

export interface IResult {
	firstName: string;
	lastName: string;
	avatar: string;
	profileId: string;
	profileDescription: string;
}

const NavbarSearch: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchResponse, setSearchResponse] = useState<IResult[]>();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	useEffect(() => {
		if (searchValue !== "") {
			axios
				.get(`/api/search/${searchValue}`)
				.then((res) => setSearchResponse(res.data.result))
				.catch((error) => console.log(error));
		}
	}, [searchValue]);

	return (
		<>
			<button
				className="flex items-center gap-1 text-sm hover:text-primary p-1 rounded-lg"
				onClick={() => setIsOpen(true)}
			>
				<IoSearchSharp className="text-lg" />
				<span className="hidden md:block">Wyszukaj</span>
			</button>

			{isOpen && (
				<div className="bg-overlay absolute h-screen w-full top-0 left-0 z-50 flex justify-center items-center">
					<div className="w-full max-w-screen-md m-5">
						<div className="bg-white dark:bg-dark p-5 rounded-lg">
							<div className="flex justify-between border-b pb-2 dark:border-dark-hover">
								<p className="font-bold text-lg lg:text-2xl">Wyszukiwarka</p>
								<button className="text-2xl p-1 hover:text-primary" onClick={() => setIsOpen(false)}>
									<IoClose />
								</button>
							</div>

							<div className="border-b pb-5 dark:border-dark-hover">
								<input
									type="text"
									value={searchValue}
									onChange={handleInputChange}
									className="bg-light-hover border border-light dark:border-gray-600 dark:bg-dark-hover font-bold text-secondary text-sm rounded-lg outline-none ring-2 ring-transparent focus:ring-primary block w-full p-2.5 mt-5"
									placeholder="Imię i nazwisko"
								/>
							</div>
							<div className="mt-2.5">
								{searchValue === "" ? (
									<p className="text-center">Brak wyszukiwań</p>
								) : (
									<div className="flex flex-col gap-4">
										{searchResponse?.map((el, index) => (
											<a
												href={`/profil/${el.profileId}`}
												key={index}
												className="flex items-center gap-2.5 hover:bg-light-hover dark:hover:bg-dark-hover p-2.5 rounded-lg "
											>
												<Image src={el.avatar} alt="" height={30} width={30} className="rounded-full" />
												<span className="font-bold">
													{el.firstName} {el.lastName}
												</span>
											</a>
										))}
										<Button
											variant="secondary"
											label={`Wyszukaj: ${searchValue}`}
											fullWidth={true}
											size="sm"
											onClick={() => (window.location.href = `/wyszukaj/${searchValue.toLowerCase()}`)}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default NavbarSearch;
