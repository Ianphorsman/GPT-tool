const mapAgents = (agents) => {
  return agents.reduce((acc, { agent_id, agents }) => {
    acc[agent_id] = {
      id: agent_id,
      name: agents.name,
      initials: agents.initials,
      model: agents.model,
      customInstructions: {
        promptText: agents.system_prompts.prompt_text,
        id: agents.system_prompts.id
      },
      maxMessageLength: agents.max_message_length,
      maxResponses: agents.max_responses || 10,
      temperature: agents.temperature
    }
    return acc
  }, {})
}

export default mapAgents
