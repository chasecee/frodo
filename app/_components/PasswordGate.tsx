"use client";
import React, { useState, useEffect, ReactNode } from "react";

interface PasswordGateProps {
  password: string;
  children: ReactNode;
}

export function PasswordGate({ password, children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>("");

  useEffect(() => {
    // Check localStorage only on the client side
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputPassword === password) {
      setIsAuthenticated(true);
      // Save authentication state to localStorage
      localStorage.setItem("isAuthenticated", "true");
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
