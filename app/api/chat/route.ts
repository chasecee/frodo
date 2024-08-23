import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToCoreMessages, StreamData } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  console.log("Form submitted");

  const {
    blockName,
    tailwindCode,
    customFields,
    generateContent,
    generateStyles,
  } = await req.json();

  console.log("Received request data:", {
    blockName,
    tailwindCode,
    customFields,
    generateContent,
    generateStyles,
  });

  const messages: { role: "system" | "user" | "assistant"; content: string }[] =
    [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates ACF fields for WordPress blocks based on provided Tailwind CSS code and custom inputs.",
      },
      {
        role: "user",
        content: `Block Name: ${blockName}\nTailwind CSS Code: ${tailwindCode}\nCustom Fields: ${customFields}\nGenerate Content: ${generateContent}\nGenerate Styles: ${generateStyles}`,
      },
    ];

  const data = new StreamData();

  try {
    const result = await streamText({
      model: anthropic("claude-3-opus-20240229"),
      messages: convertToCoreMessages(messages),
      onFinish() {
        console.log("Streaming finished");
        data.close();
      },
    });

    console.log("API connected, streaming response");

    const reader = result.body.getReader();
    const decoder = new TextDecoder();
    let fields = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fields += decoder.decode(value, { stream: true });
    }

    console.log("Streaming complete, fields received:", fields);

    return new Response(JSON.stringify({ fields: JSON.parse(fields) }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error during streaming:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    data.close(); // Ensures the stream is always closed
  }
}
