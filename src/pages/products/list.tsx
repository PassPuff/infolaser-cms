import { useTable } from '@refinedev/core';

export const ListProducts = () => {


	const {
		tableQuery: { data, isLoading } } = useTable({
			resource: 'products',
			pagination: { current: 1, pageSize: 6 }
		});


	if (isLoading) return <h1>Loading...</h1>;

	return (
		<div>
			<h1>Products</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Category</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{data?.data?.map((product) => (
						<tr key={product.id}>
							<td>{product.id}</td>
							<td>{product.name}</td>

							<td>{product.description}</td>
							<td>{product.orderPrice}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}