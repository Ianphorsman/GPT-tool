import { DynamicTool } from "@langchain/core/tools"

const dummyTool = new DynamicTool({
  name: "FOO",
  description:
    "Never call this tool. It's a placeholder for the example.",
  func: async () => "baz",
})

export default dummyTool
