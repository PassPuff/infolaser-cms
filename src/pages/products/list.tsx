import { useTable, useMany, useNavigation, BaseKey  } from "@refinedev/core";
import { Category, Product } from "../../types/interface";
import { Button } from "@/components/ui/button";

export const ListProducts: React.FC = () => {
  const {
    tableQuery: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    // resource: "products",
    pagination: { current: 1, pageSize: 10, mode: "server" },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  // You can also use methods like show or list to trigger navigation.
  // We're using url methods to provide more semantically correct html.
  const { show, edit, create } = useNavigation();

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

  const getSortOrder = (field: string) => {
    return sorters?.find((sorter) => sorter.field === field)?.order;
  };

  const onSort = (field: string) => {
    const currentOrder = getSortOrder(field);
    setSorters([
      {
        field,
        order: currentOrder === "asc" ? "desc" : "asc",
      },
    ]);
  };

  // const findSorterByFieldName = (fieldName: string) => {
  //   return sorters.find((sorter) => sorter.field === fieldName);
  // };

  return (
    <div>
      <h1 className="text-2xl py-10 text-cyan-800 font-bold">Products LIST</h1>
      <Button onClick={() => create("products")}>Create Product</Button>
      <table className="w-full">
        <thead>
          <tr className="border-2 p-2">
            <th
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("id")}
            >
              ID{" "}
              {getSortOrder("id") === "asc"
                ? "↑"
                : getSortOrder("id") === "desc"
                ? "↓"
                : ""}
            </th>
            <th
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("name")}
            >
              Name{" "}
              {getSortOrder("name") === "asc"
                ? "↑"
                : getSortOrder("name") === "desc"
                ? "↓"
                : ""}
            </th>
            <th>Description</th>
            <th>Category</th>
            <th
              className="cursor-pointer hover:bg-gray-100 p-2"
              onClick={() => onSort("orderPrice")}
            >
              Price{" "}
              {getSortOrder("orderPrice") === "asc"
                ? "↑"
                : getSortOrder("orderPrice") === "desc"
                ? "↓"
                : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product) => (
            <tr className="border-2 p-2" key={product.id}>
              <td className="text-center">{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                {product.categories.map((category: Category) => (
                  <div key={category.id}>{category.name}</div>
                ))}
              </td>
              <td className="text-right">{product.orderPrice}</td>
              <td className="flex gap-2 px-10">
                <Button
                  variant="secondary"
                  onClick={() => show("products", product.id as BaseKey)}
                >
                  Show
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => edit("products", product.id as BaseKey)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <hr />
      Sorting by field:
      <b>
        {findSorterByFieldName("price")?.field}, order{" "}
        {findSorterByFieldName("price")?.order}
      </b>
      <br />


      <Button
        onClick={() => {
          setSorters([
            {
              field: "price",
              order:
                findSorterByFieldName("price")?.order === "asc"
                  ? "desc"
                  : "asc",
            },
          ]);
        }}
      >
        Toggle Sort
      </Button> */}

      <div className="flex gap-5 mt-5 items-center justify-center">
        <Button type="button" onClick={onPrevious} disabled={current <= 1}>
          Предыдущая
        </Button>
        <div className="flex gap-2">
          {current > 1 && (
            <Button variant="outline" onClick={() => onPage(current - 1)}>
              {current - 1}
            </Button>
          )}
          <Button variant="secondary">{current}</Button>
          {current < pageCount && (
            <Button variant="outline" onClick={() => onPage(current + 1)}>
              {current + 1}
            </Button>
          )}
        </div>
        <Button type="button" onClick={onNext} disabled={current >= pageCount}>
          Следующая
        </Button>
      </div>
    </div>
  );
};
