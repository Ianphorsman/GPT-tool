import { StateGraph, END } from "@langchain/langgraph"
import { TavilySearchResults } from "@langchain/community/tools/tavily_search"
import { ToolExecutor } from "@langchain/langgraph/prebuilt"
import { ChatOpenAI } from "@langchain/openai"
import { convertToOpenAIFunction } from "@langchain/core/utils/function_calling"
import { FunctionMessage } from "@langchain/core/messages"
import { RunnableLambda } from "@langchain/core/runnables"
import { StreamingTextResponse } from "ai"
import convertMessagesToLangChainMessages from "~/langgraph/utils/convertMessagesToLangChainMessages"


export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const TAVILY_API_KEY = process.env.TAVILY_API_KEY

export const runtime = 'edge'

export default async function POST(req) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const body = await req.json()
    const { messages } = body
    const tools = [new TavilySearchResults({ maxResults: 1 })]
    const toolExecutor = new ToolExecutor({
      tools
    })
    const model = new ChatOpenAI({
      temperature: 0,
      streaming: true
    })
    const toolsAsOpenAIFunctions = tools.map((tool) =>
      convertToOpenAIFunction(tool)
    )
    const newModel = model.bind({
      functions: toolsAsOpenAIFunctions,
    })
    const agentState = {
      messages: {
        value: (x, y) => x.concat(y),
        default: () => [],
      }
    }
    const shouldContinue = (state) => {
      const { messages } = state;
      const lastMessage = messages[messages.length - 1];
      // If there is no function call, then we finish
      if (
        !("function_call" in lastMessage.additional_kwargs) ||
        !lastMessage.additional_kwargs.function_call
      ) {
        return "end"
      }
      // Otherwise if there is, we continue
      return "continue"
    }

    const _getAction = (state) => {
      const { messages } = state
      // Based on the continue condition
      // we know the last message involves a function call
      const lastMessage = messages[messages.length - 1]
      if (!lastMessage) {
        throw new Error("No messages found.")
      }
      if (!lastMessage.additional_kwargs.function_call) {
        throw new Error("No function call found in message.")
      }
      // We construct an AgentAction from the function_call
      return {
        tool: lastMessage.additional_kwargs.function_call.name,
        toolInput: JSON.stringify(
          lastMessage.additional_kwargs.function_call.arguments
        ),
        log: "",
      }
    }
    const callModel = async (
      state,
      config
    ) => {
      const { messages } = state
      const response = await newModel.invoke(messages, config)
      // We return a list, because this will get added to the existing list
      return {
        messages: [response],
      }
    }

    const callTool = async (
      state,
      config
    ) => {
      const action = _getAction(state)
      // We call the tool_executor and get back a response
      const response = await toolExecutor.invoke(action, config)
      // We use the response to create a FunctionMessage
      const functionMessage = new FunctionMessage({
        content: response,
        name: action.tool,
      })
      // We return a list, because this will get added to the existing list
      return { messages: [functionMessage] }
    }

    const workflow = new StateGraph({
      channels: agentState,
    })

    workflow.addNode("agent", new RunnableLambda({ func: callModel }))
    workflow.addNode("action", new RunnableLambda({ func: callTool }))

    workflow.setEntryPoint("agent")

    workflow.addConditionalEdges("agent", shouldContinue, { continue: "action", end: END })

    workflow.addEdge("action", "agent")

    const app = workflow.compile()


    const inputs = {
      messages: convertMessagesToLangChainMessages(messages)
    }

    const textEncoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const output of await app.stream(inputs)) {
          if (!output.action) {
            let content = ''
            if (output.agent || output.action) {
              content = (output?.agent ?? output?.action)?.messages[0].lc_kwargs.content
            }
            const encodedContent = textEncoder.encode(content)
            controller.enqueue(encodedContent);
          }
        }
        controller.close();
      }
    })

    return new StreamingTextResponse(readableStream)
  } catch (error) {
    console.error(error)
  }
}
