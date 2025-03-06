import { useForm, useSelect } from "@refinedev/core"

export const EditProduct = () => {
	const { onFinish, mutation, query } = useForm({
		action: "edit",
		resource: "products",
		id: "1"
	});

	const record = query.data?.data;

	console.log(record);


	// const { options } = useSelect({
	// 	resource: "category",
	// });

	// const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	const data = Object.fromEntries(new FormData(event.currentTarget).entries());

	// 	onFinish({
	// 		...data,
	// 		// price: Number(data.price).toFixed(2),
	// 		category: { id: Number(data.category) }
	// 	});

	// }


	return (
		<h1>test</h1>
		// <form onSubmit={onSubmit}>
		// 	<label htmlFor="name">Name</label>
		// 	<input type="text" id="name" name="name" defaultValue={record?.name} />

		// 	<br />

		// 	<label htmlFor="description">Description</label>
		// 	<textarea
		// 		id="description"
		// 		name="description"
		// 		defaultValue={record?.description}
		// 	/>
		// 	<br />


		// 	<label htmlFor="price">Price</label>
		// 	<input
		// 		type="text"
		// 		id="price"
		// 		name="price"
		// 		pattern="\d*\.?\d*"
		// 		defaultValue={record?.price}
		// 	/>
		// 	<br />


		// 	<label htmlFor="material">Material</label>
		// 	<input
		// 		type="text"
		// 		id="material"
		// 		name="material"
		// 		defaultValue={record?.material}
		// 	/>
		// 	<br />


		// 	<label htmlFor="category">Category</label>
		// 	<select id="category" name="category">
		// 		{options?.map((option) => (
		// 			<option
		// 				key={option.value}
		// 				value={option.value}
		// 				selected={record?.category.id == option.value}
		// 			>
		// 				{option.label}
		// 			</option>
		// 		))}
		// 	</select>

		// 	{mutation.isSuccess && <span>successfully submitted!</span>}
		// 	<button type="submit">Submit</button>
		// </form>
	);
}