// app/components/TailwindForm.tsx
import React, { useState } from "react";

interface TailwindFormProps {
  onSubmit: (code: string) => void;
  isLoading: boolean;
}

export function TailwindForm({ onSubmit, isLoading }: TailwindFormProps) {
  const [tailwindCode, setTailwindCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(tailwindCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full h-40 p-2 border rounded"
        value={tailwindCode}
        onChange={(e) => setTailwindCode(e.target.value)}
        placeholder="Paste your Tailwind code here"
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? "Converting..." : "Convert"}
      </button>
    </form>
  );
}
