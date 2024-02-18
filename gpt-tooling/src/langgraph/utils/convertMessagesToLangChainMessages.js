import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages"

const convertMessagesToLangChainMessages = (messages) => (
  messages.map((message) => {
    switch (message.type) {
      case "user":
        return new HumanMessage(message.content)
      case "assistant":
        return new AIMessage(message.content)
      case "system":
        return new SystemMessage(message.content)
      default:
        return new AIMessage(message.content)
    }
  })
)

export default convertMessagesToLangChainMessages
