"use client";

import { FC, useState } from "react";
import Link from "next/link";

import Alert from "@/components/Alert";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { ILoginForm } from "@/validation/login/types";
import { defaultLoginForm } from "@/validation/login/default";
import { loginFormSchema } from "@/validation/login/schema";

import axios from "axios";

const LoginPage: FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [errorAlert, setErrorAlert] = useState<string>("");

	const form = useForm<ILoginForm>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: defaultLoginForm,
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	const handleLogin = async (data: ILoginForm) => {
		setErrorAlert("");

		try {
			setLoading(true);
			const response = await axios.post("/api/auth/login", data);
			console.log(response);
			window.location.href = "/";
		} catch (error: any) {
			console.error(error);
			if (error.response.data.message) {
				setErrorAlert("Nie poprawne dane logowania.");
			} else {
				setErrorAlert("Nie udało się zalogować.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="text-center font-bold mb-8">
				<h1 className="text-primary text-4xl mb-2">Witaj ponownie!</h1>
				<p>Zaloguj się do swojego konta, aby kontynuować.</p>
			</div>
			<div className="w-full max-w-sm">
				{errorAlert !== "" && <Alert type="error" info={errorAlert} />}
				<FormProvider {...form}>
					<form className="w-full max-w-sm" onSubmit={form.handleSubmit(handleLogin)}>
						<FormInput type="email" id="email" label="Adres mailowy" />
						<FormInput type="password" id="password" label="Hasło" />
						<Button
							variant="primary"
							label="Zaloguj się"
							loading={loading}
							loadingLabel="Logowanie..."
							fullWidth={true}
						/>
					</form>
				</FormProvider>
				<hr className="mt-8 mb-6 border-neutral-300" />
				<Link href="/rejestracja" className=" block text-center hover:underline">
					Nie masz jeszcze konta? <span className="font-bold">Zarejestruj się.</span>
				</Link>
			</div>
		</>
	);
};

export default LoginPage;
