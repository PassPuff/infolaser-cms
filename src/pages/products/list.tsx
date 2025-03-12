import { useTable, /*useMany*/ } from '@refinedev/core';
import { Category, Product } from "../../types/interface";
import { Button } from "@/components/ui/button";


export const ListProducts = () => {


	const {
		tableQuery: { data, isLoading },
		current,
		setCurrent,
		pageCount,
		sorters,
		setSorters,
		} = useTable({
			resource: 'products',
			pagination: { current: 1, pageSize: 4 },
			sorters: {initial: [{ field: 'id', order: 'asc' }]}
		});

	if (isLoading) return <h1>Loading...</h1>;

	const onPrevious = () => {
		if (current > 1) {
			setCurrent(current - 1);
		}
	};

	const onNext = () => {
		if (current < pageCount) {
			setCurrent(current + 1);
		}
	};

	const onPage = (page: number) => {
		setCurrent(page);
	};

	const getSorter = (field: string) => {
		const sorter = sorters?.find((sorter) => sorter.field === field);

		if (sorter) {
			return sorter.order;
		}
	}

	// We'll use this function to toggle the sorters when the user clicks on the table headers.
	const onSort = (field: string) => {
		const sorter = getSorter(field);
		setSorters(
			sorter === "desc" ? [] : [
				{
					field,
					order: sorter === "asc" ? "desc" : "asc",
				},
			]
		);
	}

	// We'll use this object to display visual indicators for the sorters.
	const indicator = { asc: "⬆️", desc: "⬇️" };

	return (
		<div>
			<h1 className="text-2xl py-10 text-cyan-800 font-bold">Products LIST</h1>

			<table>
				<thead>
					<tr className="border-2 p-2">
						<th onClick={() => onSort("id")}>ID {indicator[getSorter("id")]}</th>
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

			<h3>page current: {current}</h3>

			<div className="flex gap-5 mt-5">
				<Button type="button" onClick={onPrevious}>
					{current - 1 > 0 && <span onClick={() => onPage(current - 1)}>{"< "}{current - 1}</span>}
				</Button>
				<div>
					<span>{current}</span>
				</div>
				<Button type="button" onClick={onNext}>
					{current + 1 < pageCount && <span onClick={() => onPage(current + 1)}>{current + 1} {">"}</span>}
				</Button>
			</div>
		</div>
	);
}