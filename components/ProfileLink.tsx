"use client";

import { FC, useState } from "react";

import EditInput from "./EditInput";

import { IoMdTrash } from "react-icons/io";
import { MdModeEdit, MdDone, MdOutlineClose } from "react-icons/md";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm, Controller } from "react-hook-form";
import { IEditLinkForm } from "@/validation/links/edit/types";
import { editLinkFormSchema } from "@/validation/links/edit/schema";

interface IProfileLink {
	isAuth: boolean | undefined;
	media: string;
	value?: string;
}

const ProfileLink: FC<IProfileLink> = ({ isAuth, media, value }) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const form = useForm<IEditLinkForm>({
		resolver: zodResolver(editLinkFormSchema),
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	const saveChanges = (data: any) => {
		console.log(data);
		console.log("wysłano");
	};

	const deleteLink = () => {
		alert("Czy na pewno chcesz usunąć ten link?");
	};

	if (isAuth) {
		return (
			<div className="w-full pb-7">
				<FormProvider {...form}>
					<form className="w-full mr-5 flex justify-between items-start" onSubmit={form.handleSubmit(saveChanges)}>
						{isEdit ? (
							<Controller
								name="name"
								control={form.control}
								render={({ field }) => <EditInput {...field} id="name" placeholder="Podaj nazwę" />}
							/>
						) : (
							<span className="text-xl font-bold">{media}</span>
						)}

						<div className="text-2xl flex gap-2 ml-5 mt-1">
							{isEdit ? (
								<>
									<button type="submit">
										<MdDone className="text-primary" />
									</button>
									<button
										onClick={() => {
											setIsEdit(false);
										}}
									>
										<MdOutlineClose className="text-error" />
									</button>
								</>
							) : (
								<>
									<button
										onClick={() => {
											setIsEdit(true);
										}}
									>
										<MdModeEdit className={`text-lg ${isEdit ? "text-primary" : "text-white"}`} />
									</button>
									<button onClick={deleteLink}>
										<IoMdTrash className="text-lg text-error" />
									</button>
								</>
							)}
						</div>
					</form>
				</FormProvider>
			</div>
		);
	}

	return (
		<div>
			{media}
			<span>siema</span>
			<p>elo</p>
		</div>
	);
};

export default ProfileLink;
