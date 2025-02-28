import { useList } from '@refinedev/core';

export const ListProducts = () => {
	const { data, isLoading } = useList({
		resource: 'products',
		pagination: { current: 1, pageSize: 10 },
		sorters: [{ field: 'name', order: 'asc' }],
		filters: [{ field: "material", operator: "eq", value: "Aluminum" }],
	});

	if (isLoading) <div>Loading...</div>;


	return (
		<div>
			<h1>Products</h1>
			<ul>
				{data?.data.map((product) => (
					<li key={product.id}>
						<h2>{product.name}</h2>
						<br />
						<p>Material: {product.material}</p>
						<br />
						<p>Price: {product.price}</p>
					</li>
				))}
			</ul>
		</div>
	);
}