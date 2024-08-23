import React from "react";
import { LayersIcon } from "lucide-react";

export const HeaderComponent: React.FC = () => {
  return (
    <div className="flex flex-row gap-5 items-center my-2">
      <div className="flex items-center space-x-2">
        <LayersIcon className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold">FRODO</h2>
      </div>
      <p className="text-gray-700 ml-5">
        Field Renderer & Organizer using Dynamic Operations
      </p>
    </div>
  );
};
