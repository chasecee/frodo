"use client";
import React, { useState, ReactNode } from "react";

interface PasswordGateProps {
  password: string;
  children: ReactNode;
}

export function PasswordGate({ password, children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputPassword === password) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center fixed inset-0 items-center"
    >
      <input
        type="password"
        value={inputPassword}
        onChange={handleInputChange}
        placeholder="Enter password"
        className="mb-4 p-2 border rounded text-black"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
