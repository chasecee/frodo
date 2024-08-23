"use client";
import { useState } from "react";
import { Layers as LayersIcon } from "lucide-react";
import { FormComponent } from "./FormComponent";
import { Field } from "./types"; // Adjust the path as necessary based on your project structure

export default function Component() {
  const [generatedFields, setGeneratedFields] = useState<Field[]>([]);

  return (
    <div className="container mx-auto p-4 bg-gray-800 text-white">
      <div className="w-full max-w-2xl mx-auto bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <LayersIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">FRODO</h2>
          </div>
          <p className="text-gray-400 mb-1">
            Field Renderer & Organizer using Dynamic Operations
          </p>
          <FormComponent />
          <div>
            {generatedFields.map((field) => (
              <div key={field.id}>
                <label>{field.label}</label>
                <input type={field.type} value={field.value} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
