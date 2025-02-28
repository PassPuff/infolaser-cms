import { useOne, useUpdate } from "@refinedev/core"

export const EditProduct = () => {
	const { data, isLoading } = useOne({ resource: "products", id: "123" });
	const { mutate, isLoading: isUpdating } = useUpdate();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const upadatePrice = async () => {
		await mutate({
			resource: "products",
			id: 123,
			values: {
				price: Math.floor(Math.random() * 100),

			}
		});
	};

	return (
		<div>
			<h1>Product name</h1>
			<h2>{data?.data.name}</h2>
			<p>{data?.data.description}</p>
			<div>Product price: ${data?.data.price}</div>
			<button onClick={upadatePrice}>Update Price</button>
		</div>
	);
}