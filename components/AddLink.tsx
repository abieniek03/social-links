"use client";

import { FC, useState } from "react";

import Button from "./Button";
import EditInput from "./EditInput";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Alert from "./Alert";

import { IAddLinkForm } from "@/validation/links/add/types";
import { addLinkFormSchema } from "@/validation/links/add/schema";

import { useAppSelector } from "@/store/store";
import { IUser } from "@/store/user/types";

import axios from "axios";

interface ILinkData {
	media: string;
	username: string;
}

const AddLink: FC = () => {
	const user: IUser | null = useAppSelector((store) => store.user.details);
	const authToken = user?.authToken;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [errorCommunicate, setErrorCommunicate] = useState<string>("");

	const form = useForm<IAddLinkForm>({
		resolver: zodResolver(addLinkFormSchema),
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	const addLink = (data: ILinkData) => {
		setErrorCommunicate("");
		setLoading(true);
		axios
			.post("/api/link", data, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				setLoading(false);
				if (error.response.status === 409) {
					setErrorCommunicate("Wybrany link jest już dodany do Twojego profilu.");
				} else {
					setErrorCommunicate("Nie udało się dodać linku.");
				}
			});
	};

	return (
		<div className="w-full">
			{isOpen ? (
				<FormProvider {...form}>
					{errorCommunicate !== "" && <Alert type="error" info={errorCommunicate} />}
					<form className="flex flex-col gap-2.5" onSubmit={form.handleSubmit(addLink)}>
						<select
							{...form.register("media")}
							defaultValue=""
							id="media"
							className={`w-full bg-light-hover border border-light dark:border-gray-600 dark:bg-dark-hover font-bold text-secondary text-sm rounded-lg outline-none ring-2 ring-transparent focus:ring-primary block px-2.5 py-1 ${
								form.formState.errors.media ? "border-red-500" : ""
							}`}
						>
							<option value="" disabled>
								Select Social Media
							</option>
							<option value="Instagram">Instagram</option>
							<option value="LinkedIn">Linkedin</option>
							<option value="TikTok">TikTok</option>
							<option value="X">X</option>
						</select>
						{form.formState.errors.media && (
							<span className="text-error text-xs font-semibold">{form.formState.errors.media.message}</span>
						)}
						<EditInput id="username" placeholder="Podaj nazwę" />

						<div className="flex flex-col gap-2.5 sm:flex-row">
							<Button
								variant="primary"
								label="Dodaj"
								fullWidth={true}
								size="sm"
								loading={loading}
								loadingLabel="Dodawanie..."
							/>
							<Button variant="secondary" label="Anuluj" fullWidth={true} size="sm" onClick={() => setIsOpen(false)} />
						</div>
					</form>
				</FormProvider>
			) : (
				<Button variant="secondary" label="+ Dodaj link" fullWidth={true} size="sm" onClick={() => setIsOpen(true)} />
			)}
		</div>
	);
};

export default AddLink;
