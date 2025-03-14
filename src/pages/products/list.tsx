import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  CreateButton,
  RefreshButton,
  DeleteButton,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Product } from "../../types/interface";
import { Loader } from "@/components/ui/loader";

export const ListProducts: React.FC = () => {
  const { dataGridProps } = useDataGrid<Product>({
    syncWithLocation: true,
  });

  if (dataGridProps.loading) return <Loader />;

  const columns: GridColDef<Product>[] = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 300,
    },
    {
      field: "categories",
      headerName: "Categories",
      minWidth: 250,

      renderCell: function render({ row }) {
        return (
          <div className="flex gap-2 overflow-x-scroll">
            {row.categories?.map((category) => (
              <span
                key={category.id}
                className="px-2 py-1 bg-gray-100 rounded-md text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      field: "orderPrice",
      headerName: "Order Price",
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: function render({ row }) {
        return (
          <div>
            <EditButton hideText recordItemId={row.id} />
            <ShowButton hideText recordItemId={row.id} />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Products</h1>
      <CreateButton />
      <RefreshButton />
      <DataGrid {...dataGridProps} columns={columns} />
    </div>
  );
};
