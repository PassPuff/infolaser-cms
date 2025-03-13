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
    <header className="flex items-center justify-between max-w-3xl">
      <h2 className="text-2xl font-bold">Welcome! Infolaser CMS</h2>
      <Link to={listUrl("products")}>List Products</Link>
      <Link to={createUrl("products")}>Create Product</Link>
      <Button
        type="button"
        variant="destructive"
        disabled={isLoading}
        onClick={() => mutate()}
      >
        Logout
      </Button>
    </header>
  );
};
