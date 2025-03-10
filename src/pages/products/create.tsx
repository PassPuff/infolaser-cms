import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const ProductCreate = () => {
	const { formProps, saveButtonProps } = useForm({});

	return (
		<Create saveButtonProps={saveButtonProps}>
			<Form {...formProps} layout="vertical">
				<Form.Item
					label={"Title"}
					name={["title"]}
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={"Price"}
					name={["price"]}
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Create>
	);
};
