import { Button, Modal, Select, Textarea } from "react-daisyui"
import React, { useState } from "react"

const Settings = React.forwardRef(({
  model,
  setModel,
  setCustomInstructions,
  modelOptions = ['gpt-3.5-turbo', 'gpt-3.5-turbo-0613', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-16k-0613']
}, ref) => {
  const [_customInstructions, _setCustomInstructions] = useState('')
  return (
    <Modal ref={ref} backdrop>
      <Modal.Header>Settings</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4 justify-center items-stretch">
          <Select onChange={setModel}>
            {modelOptions.map((modelName) => {
              return (
                <Select.Option value={modelName} selected={model === modelName} key={modelName}>{modelName}</Select.Option>
              )
            })}
          </Select>
          <Textarea
            onChange={(e) => { _setCustomInstructions(e.target.value) }}
            placeholder="Type your custom instructions here..."
          />
          <Button onClick={() => setCustomInstructions(_customInstructions)}>Apply Changes</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
})

Settings.displayName = 'Settings'

export default Settings
