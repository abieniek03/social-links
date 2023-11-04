"use client";

import { FC } from "react";

import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { IEditProfileForm } from "@/validation/edit-profile/types";
import { editProfileFormSchema } from "@/validation/edit-profile/schema";

const EditProfilePage: FC = () => {
	const form = useForm<IEditProfileForm>({
		resolver: zodResolver(editProfileFormSchema),
		// defaultValues: defaultEditProfileForm,
	});

	return (
		<div className="max-w-md mx-auto my-4">
			<h1 className="mb-4 font-bold text-2xl text-primary">Edycja profilu</h1>
			<FormProvider {...form}>
				<form>
					<FormInput id="firstName" label="Imię" />
					<FormInput id="lastName" label="Nazwisko" />
					<FormInput type="textarea" id="description" label="Opis" />
					<Button variant="primary" label="Zapisz" fullWidth={true} loading={false} loadingLabel="Zapisywanie..." />
				</form>
			</FormProvider>
		</div>
	);
};

export default EditProfilePage;
