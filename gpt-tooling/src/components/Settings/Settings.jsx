import React, { useState } from "react"
import { Modal } from "react-daisyui"
import SettingsTabs from "./SettingsTabs"

const Settings = React.forwardRef(({
  agents,
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
}, ref) => {
  const [activeTab, setActiveTab] = useState('Generation Settings')
  return (
    <Modal ref={ref} backdrop className="w-11/12 max-w-5xl">
      <Modal.Body>
        <SettingsTabs
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
      </Modal.Body>
    </Modal>
  )
})

Settings.displayName = 'Settings'

export default Settings
