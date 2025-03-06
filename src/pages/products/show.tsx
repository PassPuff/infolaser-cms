import { useOne } from "@refinedev/core"

export const ShowProduct = () => {
	const { data, isLoading } = useOne({ resource: 'products', id: "12" });

	if (isLoading) return <h1>Loading...</h1>;

	const result = data?.data?.Product;

	return (
		<div>
			<h1> {result.id} - {result.name}</h1>
			<p>{result.description}</p>
			<p>{result.orderPrice} Price</p>
			<p>{result.rating} Raiting</p>
		</div>
	);
}