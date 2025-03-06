import { useForm, useSelect } from "@refinedev/core"

export const CreateProduct = () => {
	const { onFinish, mutation } = useForm({
		action: "create",
		resource: "products"
	});

	// const { options } = useSelect({
	// 	resource: "categories",
	// 	// optionLabel: "title", // Default value is "title" so we don't need to provide it.
	// 	// optionValue: "id", // Default value is "id" so we don't need to provide it.
	// });



	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget).entries());

		onFinish(data);

	}

	return (
		<div>
			<h1>Create Product</h1>
			<form onSubmit={onSubmit}>
				<label htmlFor="name">Name</label>
				<br />
				<input type="text" id="name" name="name" />
				<br />
				<label htmlFor="slug">Slug</label>
				<br />
				<input type="text" id="slug" name="slug" />
				<br />
				<label htmlFor="description">Description</label>
				<br />
				<textarea id="description" name="description" />
				<br />
				<br />

				<label htmlFor="orderPrice">Order Price</label>
				<br />
				<input type="number" id="orderPrice" name="orderPrice" />
				<br />

				<label htmlFor="stockPrice">Stock Price</label>
				<br />
				<input type="number" id="stockPrice" name="stockPrice" />
				<br />

				<label htmlFor="newPrice">New Price</label>
				<br />
				<input type="number" id="newPrice" name="newPrice" />
				<br />

				<label htmlFor="newPrice">New Price</label>
				<br />
				<input type="number" id="newPrice" name="newPrice" />
				<br />


				<br />
				{mutation.isSuccess && <span>successfully submitted!</span>}
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}