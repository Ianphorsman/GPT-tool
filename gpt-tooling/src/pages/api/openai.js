/* eslint-disable */

import { Configuration, OpenAIApi } from "openai";

export default async function handler(
  _req,
  res
) {
  const configuration = new Configuration({
      organization: "org-2bWZRq1wen4Xwz7k47WiGK39",
      apiKey: process.env.OPEN_AI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage();
  return res.status(200).json({ 'fizz': 'buzz' })
}
