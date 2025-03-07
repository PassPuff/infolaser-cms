import { useForm, useSelect } from "@refinedev/core";

interface ICategory {
	id: number;
	name: string;
}

export const CreateProduct = () => {
	const { onFinish, mutation } = useForm({
		action: "create",
		resource: "products",
	});

	const { options } = useSelect({
		resource: "category",
		optionLabel: "name", // Указываем, какое поле использовать как label
		optionValue: "id",   // Указываем, какое поле использовать как value
	});

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget).entries());


		onFinish({
			...data,
			inStock: Number(data.inStock),
			isAccessory: Number(data.isAccessory),
			orderPrice: Number(data.orderPrice),
			stockPrice: Number(data.stockPrice),
			newPrice: Number(data.newPrice),
			guarantee: Number(data.guarantee),
			rating: Number(data.rating),
			order: Number(data.order),
			labels: data.labels ? data.labels.split(",") : [],
			categories: data.categories ? [data.categories] : [],
		});
	};

	return (
		<div>
			<h1>Create Product</h1>
			<form onSubmit={onSubmit}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" required />
				</div>

				<div>
					<label htmlFor="slug">Slug</label>
					<input type="text" id="slug" name="slug" required />
				</div>

				<div>
					<label htmlFor="description">Description</label>
					<textarea id="description" name="description" required />
				</div>

				<div>
					<label htmlFor="orderPrice">Order Price</label>
					<input type="number" id="orderPrice" name="orderPrice" required />
				</div>

				<div>
					<label htmlFor="stockPrice">Stock Price</label>
					<input type="number" id="stockPrice" name="stockPrice" required />
				</div>

				<div>
					<label htmlFor="newPrice">New Price</label>
					<input type="number" id="newPrice" name="newPrice" required />
				</div>

				<div>
					<label htmlFor="inStock">In Stock (1 - да, 0 - нет)</label>
					<input type="number" id="inStock" name="inStock" min="0" max="1" required />
				</div>

				<div>
					<label htmlFor="isAccessory">Is Accessory (1 - да, 0 - нет)</label>
					<input type="number" id="isAccessory" name="isAccessory" min="0" max="1" required />
				</div>

				<div>
					<label htmlFor="guarantee">Guarantee (гарантия в годах)</label>
					<input type="number" id="guarantee" name="guarantee" required />
				</div>

				<div>
					<label htmlFor="guaranteeContent">Guarantee Description</label>
					<textarea id="guaranteeContent" name="guaranteeContent" />
				</div>

				<div>
					<label htmlFor="rating">Rating</label>
					<input type="number" id="rating" name="rating" step="0.1" min="0" max="5" required />
				</div>

				<div>
					<label htmlFor="order">Order Priority</label>
					<input type="number" id="order" name="order" required />
				</div>

				<div>
					<label htmlFor="labels">Labels (разделяй запятой)</label>
					<input type="text" id="labels" name="labels" />
				</div>

				<div>
					<label htmlFor="product_attachments">Product Attachments (URLs через запятую)</label>
					<input type="text" id="product_attachments" name="product_attachments" />
				</div>

				<div>
					<label htmlFor="categories">Category</label>
					<select id="categories" name="categories">
						<option value="">Выбери категорию</option>

						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div >

				{mutation.isSuccess && <span>Successfully submitted!</span>}
				<button type="submit" > Submit</button >
			</form >
		</div >
	);
};
