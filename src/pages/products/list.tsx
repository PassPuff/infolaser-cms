import { useTable, /*useMany*/ } from '@refinedev/core';
import { Category, Product } from "../../types/interface";

export const ListProducts = () => {


	const {
		tableQuery: { data, isLoading }} = useTable({
			resource: 'products',
			pagination: { current: 1, pageSize: 4 },
			sorters: {initial: [{ field: 'id', order: 'asc' }]}
		});

	// const { data: category } = useMany({
	// 	resource: "category",
	// 	ids: data?.data?.map((product) => {
	// 		if (product.categories.length > 0 ) {
	// 			product.categories.map((category) => console.log(category))
	// 		}
	// 	})
	// })

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<div>
			<h1 className="text-2xl py-10 text-cyan-800 font-bold">Products LIST</h1>
			<table>
				<thead>
					<tr className="border-2 p-2">
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Category</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{data?.data?.map((product) => (
						<tr  className="border-2 p-2" key={product.id}>
							<td>{product.id}</td>
							<td>{product.name}</td>
							<td>{product.description}</td>
							<td>
							{product.categories.map((category: Category ) =>
								<div key={category.id}>{category.name}</div>
							)}
							</td>
							<td>{product.orderPrice}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}