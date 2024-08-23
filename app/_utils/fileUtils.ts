import { generateRegisterACFBlocksPHP } from "./generateRegisterACFBlocksPHP";
import { generateBlockJSON } from "./generateBlockJSON";
import { generateBlockPHP } from "./generateBlockPHP";
import { generateTemplatePHP } from "./generateTemplatePHP";

export {
  generateRegisterACFBlocksPHP,
  generateBlockJSON,
  generateBlockPHP,
  generateTemplatePHP,
};

export const downloadFile = (filename: string, content: string | Blob) => {
  const blob =
    typeof content === "string"
      ? new Blob([content], { type: "text/plain" })
      : content;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
