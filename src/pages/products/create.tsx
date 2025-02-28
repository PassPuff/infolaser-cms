import { useForm } from "@refinedev/core"

export const CreateProduct = () => {
	const { onFinish, mutation } = useForm({
		action: "create",
		resource: "products"
	});

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
				<input type="text" id="name" name="name" />

				<label htmlFor="description">Description</label>
				<textarea id="description" name="description" />

				<label htmlFor="price">Price</label>
				<input type="number" id="price" name="price" step=".01" />

				<label htmlFor="material">Material</label>
				<input type="text" id="material" name="material" />

				<label htmlFor="category">Category ID</label>
				<input type="number" id="category" name="category" />

				{mutation.isSuccess && <span>successfully submitted!</span>}
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}