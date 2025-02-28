import { useOne } from "@refinedev/core"

export const ShowProduct = () => {
	const { data, isLoading } = useOne({ resource: "products", id: "123" });

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Product name</h1>
			<h2>{data?.data.name}</h2>
			<p>{data?.data.description}</p>
			<p>{data?.data.price}</p>
		</div>
	);
}