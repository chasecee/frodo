import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

SyntaxHighlighter.registerLanguage("json", json);

interface GenerationComponentProps {
  generation: string;
}

export const GenerationComponent: React.FC<GenerationComponentProps> = ({
  generation,
}) => {
  return (
    <div>
      <div className="max-w-full overflow-x-auto text-[10px]">
        <SyntaxHighlighter
          language="json"
          style={atomOneDark}
          wrapLongLines={true}
          className="rounded-md overflow-hidden"
        >
          {generation}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
