import React from "react";
import { useLogout } from "@refinedev/core";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { mutate, isLoading } = useLogout();

  return (
    <header className="flex items-center justify-between max-w-3xl">
      <h2 className="text-2xl font-bold">Welcome! Infolaser CMS</h2>
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
