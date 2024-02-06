import { Button, Modal, Select, Textarea } from "react-daisyui"
import React, { useState } from "react"
import { set } from "zod"

const Settings = React.forwardRef(({
  model,
  setModel,
  setCustomInstructions,
  modelOptions = ['gpt-3.5-turbo', 'gpt-3.5-turbo-0613', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-16k-0613']
}, ref) => {
  const [_customInstructions, _setCustomInstructions] = useState('')
  const [hasMadeChanges, setHasMadeChanges] = useState(false)

  const onApplyChangesClick = () => {
    setCustomInstructions(_customInstructions)
    setHasMadeChanges(false)
  }

  const onInputChange = (e) => {
    _setCustomInstructions(e.target.value)
    setHasMadeChanges(!!e.target.value)
  }
  return (
    <Modal ref={ref} backdrop>
      <Modal.Header>Settings</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col justify-center items-stretch">
          <Select onChange={setModel}>
            {modelOptions.map((modelName) => {
              return (
                <Select.Option value={modelName} selected={model === modelName} key={modelName}>{modelName}</Select.Option>
              )
            })}
          </Select>
          <Textarea
            onChange={onInputChange}
            placeholder="Type your custom instructions here..."
          />
          <Button onClick={onApplyChangesClick} disabled={!hasMadeChanges}>Apply Changes</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
})

Settings.displayName = 'Settings'

export default Settings
