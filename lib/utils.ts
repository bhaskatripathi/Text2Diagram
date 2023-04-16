import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import endent from "endent";
import { deflate } from "pako";
import { fromUint8Array } from "js-base64";

import { type Message } from "@/types/type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const systemPrompt = endent`
  You are an assistant to help user build diagram with Mermaid.
  You only need to return the output Mermaid code block.
  Do not include any description, do not include the \`\`\`.
  Code (no \`\`\`):
  `;

export const OpenAIStream = async (
  messages: Message[],
  model: string,
  key: string
) => {
  const system = { role: "system", content: systemPrompt };
  const res = await fetch(`https://api.openai.com/v1/chat/completions`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key || process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      model,
      messages: [system, ...messages],
      temperature: 0,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const statusText = res.statusText;
    const result = await res.body?.getReader().read();
    throw new Error(
      `OpenAI API returned an error: ${
        decoder.decode(result?.value) || statusText
      }`
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};

export const parseCodeFromMessage = (message: string) => {
  const regex = /```(?:mermaid)?\s*([\s\S]*?)```/;
  const match = message.match(regex);

  if (match) {
    return match[1];
  } else {
    return message;
  }
};

export const serializeCode = (code: string) => {
  const state = {
    code: parseCodeFromMessage(code),
    mermaid: JSON.stringify(
      {
        theme: "default",
      },
      undefined,
      2
    ),
    autoSync: true,
    updateDiagram: true,
  };
  const data = new TextEncoder().encode(JSON.stringify(state));
  const compressed = deflate(data, { level: 9 });
  return fromUint8Array(compressed, true);
};
