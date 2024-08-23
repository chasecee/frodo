"use server";

import { streamObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

export async function generate(input: string) {
  const stream = createStreamableValue();
  console.log("Generating...");

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: anthropic("claude-3-haiku-20240307"),
      prompt: input,
      system:
        "You are a helpful coding assistant. You will receive tailwind code and generate ACF fields based on the tailwind code. You will only return JSON format for an acf.json file.",
      schema: z.object({
        acf: z.array(
          z.object({
            key: z.string(),
            title: z.string(),
            fields: z.array(
              z.object({
                key: z.string(),
                name: z.string(),
                type: z.string(),
                instructions: z.string().optional(),
                required: z.boolean().optional(),
              })
            ),
          })
        ),
      }),
    });

    for await (const partialObject of partialObjectStream) {
      //console.log("Received partial object:", partialObject);
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { output: stream.value };
}
