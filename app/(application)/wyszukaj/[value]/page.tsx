"use client";

import { FC, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { IResult } from "@/components/NavbarSearch";

import axios from "axios";
import Loading from "@/components/Loading";

const SearchResultPage: FC = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const [searchResponse, setSearchResponse] = useState<IResult[]>();

	const searchValue = usePathname().split("wyszukaj/")[1];
	useEffect(() => {
		setLoading(true);
		axios
			.get(`/api/search/${searchValue}`)
			.then((res) => {
				setLoading(false);
				setSearchResponse(res.data.result);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			<h1 className="my-4 pb-2 font-bold text-center text-primary text-xl lg:text-3xl">Wyniki wyszukiwania</h1>

			{loading ? (
				<Loading />
			) : (
				<div className="py-2 grid grid-cols-1 md:grid-cols-2 md:gap-10">
					{searchResponse?.map((el, index) => (
						<a
							href={`/profil/${el.profileId}`}
							key={index}
							className="flex items-center gap-5 hover:bg-light-hover dark:hover:bg-dark-hover p-2.5 rounded-lg "
						>
							<Image src={el.avatar} alt="" height={75} width={75} className="rounded-full" />
							<div className="flex flex-col">
								<span className="font-bold text-xl">
									{el.firstName} {el.lastName}
								</span>
								<span className="text-sm">{el.profileDescription}</span>
							</div>
						</a>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchResultPage;
