import React from "react";
import { useLogin } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Login = () => {
  const { mutate, isLoading } = useLogin();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    // Calling mutate to submit with the data we've collected from the form.
    mutate(data);
  };

  return (
    <div>
      <h1 className="text-4xl py-10 text-center">Login</h1>
      <form className="max-w-xl m-auto" onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          // We're providing default values for demo purposes.
          defaultValue="admin@admin.com"
        />

        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          // We're providing default values for demo purposes.
          defaultValue="123456"
        />

        {isLoading && <span>loading...</span>}
        <Button className="mt-5" type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};
