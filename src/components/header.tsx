import React from "react";
import { useLogout, useGetIdentity, useNavigation } from "@refinedev/core";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  // const { data: identity } = useGetIdentity();

  // You can also use methods like list or create to trigger navigation.
  // We're using url methods to provide more semantically correct html.
  const { listUrl, createUrl } = useNavigation();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome! Infolaser CMS
      </h2>
      <div className="flex items-center gap-4">
        <Link
          to={listUrl("products")}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Products
        </Link>
        <Button
          type="button"
          variant="destructive"
          disabled={isLoading}
          onClick={() => mutate()}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};
