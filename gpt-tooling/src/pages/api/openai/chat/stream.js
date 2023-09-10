import { Configuration, OpenAIApi } from 'openai'
import { NextApiResponse } from 'next';
import axios from 'axios';
import { getChatBody } from '~/utils/skeletonKey';

const DEBUG = true

async function* chunksToLines(chunksAsync) {
  let previous = "";
  for await (const chunk of chunksAsync) {
      const bufferChunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      previous += bufferChunk;
      let eolIndex;
      while ((eolIndex = previous.indexOf("\n")) >= 0) {
          // line includes the EOL
          const line = previous.slice(0, eolIndex + 1).trimEnd();
          if (line === "data: [DONE]") break;
          if (line.startsWith("data: ")) yield line;
          previous = previous.slice(eolIndex + 1);
      }
  }
}

async function* linesToMessages(linesAsync) {
  for await (const line of linesAsync) {
      const message = line.substring("data :".length);

      yield message;
  }
}

async function* streamCompletion(data) {
  yield* linesToMessages(chunksToLines(data));
}

const defaultBody = {
  model: 'gpt-3.5-turbo',
  max_tokens: 50,
  temperature: 0,
  messages: [{ role: 'user', content: 'say hello world' }]
}

export default async function handler(
  req,
  res
) {
  const overrideBody = getChatBody()
  const orgId = 'org-2bWZRq1wen4Xwz7k47WiGK39'
  try {
    const response = await axios.post(
      `https://api.openai.com/v1/chat/completions`, {...defaultBody, ...req.body, ...overrideBody },
      {
          responseType: "stream",
          headers: {
              Accept: "text/event-stream",
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
          },
      },
    );

    res.setHeader("content-type", "text/event-stream");

    for await (const message of streamCompletion(response.data)) {
      try {
          const parsed = JSON.parse(message);
          delete parsed.id;
          delete parsed.created;
          const { content } = parsed.choices[0].delta;
          if (content) {
            console.log('content', content)
            res.write(`${JSON.stringify(parsed)}\n\n`);
          }
      } catch (error) {
          if (DEBUG) console.error("Could not JSON parse stream message", message, error);
      }
    }

    res.write(`[DONE]`);
    res.end();
  } catch (error) {
    try {
      if (error.response && error.response.data) {
          let errorResponseStr = "";

          for await (const message of error.response.data) {
              errorResponseStr += message;
          }

          errorResponseStr = errorResponseStr.replace(/org-[a-zA-Z0-9]+/, orgId);

          const errorResponseJson = JSON.parse(errorResponseStr);
          return res.status(error.response.status).send(errorResponseJson);
      } else {
          if (DEBUG) console.error("Could not JSON parse stream message", error);
          return res.status(500).send({
              status: false,
              error: "something went wrong!"
          });
      }
    }
    catch (e) {
        if (DEBUG) console.log(e);
        return res.status(500).send({
            status: false,
            error: "something went wrong!"
        });
    }
  }
}
