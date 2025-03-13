import React from "react";
import { useLogout, useGetIdentity } from "@refinedev/core";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  // const { data: identity } = useGetIdentity();

  return (
    <header className="flex items-center justify-between max-w-3xl">
      <h2 className="text-2xl font-bold">Welcome! Infolaser CMS</h2>
      {/* <p>{identity?.name ?? ""}</p> */}
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
