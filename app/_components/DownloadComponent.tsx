import React from "react";
import JSZip from "jszip";
import {
  generateRegisterACFBlocksPHP,
  generateBlockJSON,
  generateBlockPHP,
  generateTemplatePHP,
} from "../_utils/fileUtils";

interface DownloadComponentProps {
  blockName: string;
  generation: string;
  tailwindCode: string;
}

export const DownloadComponent: React.FC<DownloadComponentProps> = ({
  blockName,
  generation,
  tailwindCode,
}) => {
  const handleDownloadFiles = async () => {
    const zip = new JSZip();

    const registerACFBlocksPHP = generateRegisterACFBlocksPHP(blockName);
    const blockJSON = generateBlockJSON(blockName, generation);
    const blockPHP = generateBlockPHP(blockName);
    const templatePHP = generateTemplatePHP(blockName, tailwindCode);

    // Add files to the zip
    zip.file("register-acf-blocks.php", registerACFBlocksPHP);
    zip.file("block.json", blockJSON);
    zip.file("block.php", blockPHP);
    zip.file("template.php", templatePHP);

    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" });

    // Trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `${blockName.toLowerCase()}-block.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownloadJSON = () => {
    const blockJSON = generateBlockJSON(blockName, generation);
    const blob = new Blob([blockJSON], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${blockName.toLowerCase()}-block.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="flex flex-row gap-2 text-[12px]">
      <button
        onClick={handleDownloadFiles}
        className="bg-green-600/50 ring-1 text-white py-1 px-4 rounded-md hover:ring-4 transition-[box-shadow] focus:outline-none focus:ring-2 ring-green-600 focus:ring-green-500 focus:ring-offset-2"
      >
        Download Files
      </button>
      <button
        onClick={handleDownloadJSON}
        className="bg-blue-600/20 ring-1 text-white py-1 px-4 rounded-md hover:ring-4 transition-[box-shadow] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Download JSON
      </button>
    </div>
  );
};
