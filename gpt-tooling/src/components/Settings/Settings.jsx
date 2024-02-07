import React, { useState } from "react"
import { Button, Modal, Range, Select, Textarea } from "react-daisyui"
import { MODEL_OPTIONS } from "~/constants"
import RangeBlock from "../RangeBlock"

const Settings = React.forwardRef(({
  model,
  setModel,
  setCustomInstructions,
  modelOptions = MODEL_OPTIONS,
  setMaxMessageLength,
  maxMessageLength,
  setMaxResponses,
  maxResponses
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
      <Modal.Header>Agent Settings</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col justify-center items-stretch gap-3">
          <Select onChange={(e) => setModel(e.target.value)}>
            {modelOptions.map(({ name, access }) => {
              return (
                <Select.Option value={name} selected={model === name} key={name} disabled={access !== 'free'}>
                  {name} {access === 'coming soon' ? access : null}
                </Select.Option>
              )
            })}
          </Select>
          <RangeBlock
            label="Max message length"
            size="xs"
            color="ghost"
            onChange={(e) => setMaxMessageLength(e.target.value)}
            min={1}
            max={2000}
            step={maxMessageLength}
          />
          <RangeBlock
            label="Max responses"
            size="xs"
            color="ghost"
            onChange={(e) => setMaxResponses(e.target.value)}
            min={1}
            max={10}
            step={maxResponses}
          />
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
