"use client";
import React, { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import defaultTailwindCode from "./defaultTailwindCode";
import { generate } from "../actions";
import { readStreamableValue } from "ai/rsc";
import { DebugComponent } from "./DebugComponent";
import { DownloadComponent } from "./DownloadComponent";
import { GenerationComponent } from "./GenerationComponent";
import { HeaderComponent } from "./HeaderComponent";
import { GearIcon } from "@radix-ui/react-icons";

export const FormComponent: React.FC = () => {
  const [blockName, setBlockName] = useState("Hero");
  const [tailwindCode, setTailwindCode] = useState(defaultTailwindCode);
  const [customFields, setCustomFields] = useState("");
  const [generateContent, setGenerateContent] = useState(true);
  const [generateStyles, setGenerateStyles] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generation, setGeneration] = useState<string>("");

  const debugData = {
    blockName,
    tailwindCode,
    customFields,
    generateContent,
    generateStyles,
  };

  const handleGenerateClick = async () => {
    setIsLoading(true);
    setError(null);

    const prompt = JSON.stringify({
      blockName,
      tailwindCode,
      customFields,
      generateContent,
      generateStyles,
      additionalData: "",
    });

    try {
      const { output } = await generate(prompt);

      for await (const partialObject of readStreamableValue(output)) {
        if (partialObject) {
          setGeneration(JSON.stringify(partialObject.acf, null, 2));
        }
      }
    } catch (err) {
      console.error("Error during field generation:", err);
      setError("Failed to generate fields. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <HeaderComponent />
      <div className="flex flex-col md:flex-row gap-2 relative">
        <div className="md:w-1/3 relative">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 min-w-[300px] sticky top-2"
          >
            <div>
              <label
                htmlFor="block-name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Block Name
              </label>
              <input
                id="block-name"
                className="w-full px-3 bg-black placeholder:text-gray-400 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter block name (e.g. Hero Section)"
                value={blockName}
                onChange={(e) => setBlockName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="tailwind-code"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Tailwind CSS Code
              </label>
              <textarea
                id="tailwind-code"
                className="w-full px-3 py-2 bg-black placeholder:text-gray-400 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste your Tailwind CSS code here"
                rows={4}
                value={tailwindCode}
                onChange={(e) => setTailwindCode(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox.Root
                id="generate-content"
                checked={generateContent}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") {
                    setGenerateContent(checked);
                  }
                }}
                className="w-5 h-5 border border-gray-600 rounded flex items-center justify-center"
              >
                <Checkbox.Indicator>
                  <CheckIcon className="w-4 h-4 text-blue-500" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label
                htmlFor="generate-content"
                className="text-sm text-gray-300"
              >
                Generate Content Fields
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox.Root
                id="generate-styles"
                checked={generateStyles}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") {
                    setGenerateStyles(checked);
                  }
                }}
                className="w-5 h-5 border border-gray-600 rounded flex items-center justify-center"
              >
                <Checkbox.Indicator>
                  <CheckIcon className="w-4 h-4 text-blue-500" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label
                htmlFor="generate-styles"
                className="text-sm text-gray-300"
              >
                Generate Style Fields
              </label>
            </div>

            <div>
              <label
                htmlFor="custom-fields"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Custom Fields (optional)
              </label>
              <textarea
                id="custom-fields"
                className="w-full px-3 py-2 bg-black placeholder:text-gray-400 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter custom fields (one per line, format: Field Name:field_type)"
                rows={4}
                value={customFields}
                onChange={(e) => setCustomFields(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleGenerateClick}
              disabled={isLoading}
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <GearIcon className="animate-spin mr-2 h-5 w-5" />
                  Generating...
                </>
              ) : (
                "Generate ACF Fields"
              )}
            </button>
          </form>
        </div>
        <div className="mt-0 md:w-2/3">
          {generation && (
            <>
              <div className="flex flex-row bg-black sticky top-0 w-full justify-between items-center py-2">
                <h3 className="text-sm font-medium text-gray-300 mb-1">
                  Generated Fields
                </h3>
                <DownloadComponent
                  blockName={blockName}
                  generation={generation}
                  tailwindCode={tailwindCode}
                />
              </div>
              <GenerationComponent generation={generation} />
            </>
          )}
          <DebugComponent data={debugData} />
        </div>
      </div>
    </>
  );
};
