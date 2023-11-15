import { FC } from "react";
import { useFormContext, useController } from "react-hook-form";

interface IEditInput {
	id: string;
	placeholder: string;
	username?: string;
}

const EditInput: FC<IEditInput> = ({ id, placeholder, username }) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const { field } = useController({
		control,
		name: id,
		defaultValue: username,
	});

	return (
		<div className="w-full">
			<input
				type="text"
				id={id}
				className="w-full bg-light-hover border border-light dark:border-gray-600 dark:bg-dark-hover font-bold text-secondary text-sm rounded-lg outline-none ring-2 ring-transparent focus:ring-primary block px-2.5 py-1"
				placeholder={placeholder}
				value={field.value}
				onChange={field.onChange}
				required
			/>
			<span className="text-error text-xs font-semibold">{errors[id]?.message?.toString()}</span>
		</div>
	);
};

export default EditInput;
