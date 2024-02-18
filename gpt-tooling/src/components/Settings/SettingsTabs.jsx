import React from 'react'
import { Tabs } from 'react-daisyui'
import GenerationSettings from './GenerationSettings'
import AgentBehaviourSettings from './AgentBehaviourSettings'

const { RadioTab } = Tabs

const SETTINGS_TABS = [
  'Generation Settings',
  'Agent Behaviours'
]

const componentMap = {
  'Generation Settings': GenerationSettings,
  'Agent Behaviours': AgentBehaviourSettings
}

const SettingsTabs = ({
  agents,
  activeTab,
  setActiveTab,
  activeAgent,
  setModel,
  setCustomInstructions,
  setMaxMessageLength,
  setMaxResponses,
  setResponsesLeft,
  setTemperature,
  temperature,
  maxResponses,
  maxMessageLength,
  model,
  setWillAutoRespondToAgent,
  setCannotAutoRespondToAgent,
  api,
  setApi
}) => {
  const Component = componentMap[activeTab] ?? GenerationSettings
  return (
    <Tabs variant="bordered">
      {SETTINGS_TABS.map(tab => (
        <RadioTab
          key={tab}
          active={activeTab === tab}
          onClick={() => setActiveTab(tab)}
          name={tab}
          label={tab}
          className="mx-1 mb-6"
        >
          <Component
            agents={agents}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            activeAgent={activeAgent}
            setModel={setModel}
            setCustomInstructions={setCustomInstructions}
            setMaxMessageLength={setMaxMessageLength}
            setMaxResponses={setMaxResponses}
            setResponsesLeft={setResponsesLeft}
            setTemperature={setTemperature}
            temperature={temperature}
            maxResponses={maxResponses}
            maxMessageLength={maxMessageLength}
            model={model}
            setWillAutoRespondToAgent={setWillAutoRespondToAgent}
            setCannotAutoRespondToAgent={setCannotAutoRespondToAgent}
            api={api}
            setApi={setApi}
          />
        </RadioTab>
      ))}
    </Tabs>
  )
}

export default SettingsTabs
