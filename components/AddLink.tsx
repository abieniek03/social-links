"use client";

import { FC, useState } from "react";

import Button from "./Button";
import EditInput from "./EditInput";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IAddLinkForm } from "@/validation/links/add/types";
import { addLinkFormSchema } from "@/validation/links/add/schema";

const AddLink: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const form = useForm<IAddLinkForm>({
		resolver: zodResolver(addLinkFormSchema),
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	const addLink = (data: any) => {
		console.log(data);
	};
	return (
		<div className="w-full">
			{isOpen ? (
				<FormProvider {...form}>
					<form className="flex flex-col gap-2.5" onSubmit={form.handleSubmit(addLink)}>
						<select
							{...form.register("media")}
							defaultValue=""
							id="media"
							className="w-full bg-light-hover border border-light dark:border-gray-600 dark:bg-dark-hover font-bold text-secondary text-sm rounded-lg outline-none ring-2 ring-transparent focus:ring-primary block px-2.5 py-1"
						>
							<option value="" disabled>
								Select Social Media
							</option>
							<option value="linkedin">Linkedin</option>
							<option value="x">X</option>
							<option value="ig">Instagram</option>
							<option value="tt">TikTok</option>
						</select>
						<EditInput id="name" placeholder="Podaj nazwę" />
						<div className="flex flex-col gap-2 md:flex-row">
							<Button variant="primary" label="Dodaj" size="sm" fullWidth={true} />
							<Button variant="secondary" label="Anuluj" size="sm" fullWidth={true} onClick={() => setIsOpen(false)} />
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
