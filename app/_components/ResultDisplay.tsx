// app/components/ResultDisplay.tsx
import React from "react";

interface ResultDisplayProps {
  result: {
    acfJson: any;
    renderFile: string;
    registrationFile: string;
  } | null;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result) return null;

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">ACF JSON:</h2>
      <pre className="bg-gray-100 p-2 rounded mt-2">
        {JSON.stringify(result.acfJson, null, 2)}
      </pre>
      <h2 className="text-xl font-semibold mt-4">Render File:</h2>
      <pre className="bg-gray-100 p-2 rounded mt-2">{result.renderFile}</pre>
      <h2 className="text-xl font-semibold mt-4">Registration File:</h2>
      <pre className="bg-gray-100 p-2 rounded mt-2">
        {result.registrationFile}
      </pre>
    </div>
  );
}
