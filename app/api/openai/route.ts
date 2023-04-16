import { OpenAIStream } from "@/lib/utils";
import { type RequestBody } from "@/types/type";

export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  try {
    const { messages, model, apiKey } = (await req.json()) as RequestBody;

    const stream = await OpenAIStream(messages, model, apiKey);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
