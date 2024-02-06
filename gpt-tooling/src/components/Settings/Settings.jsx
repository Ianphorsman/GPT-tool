import { Button, Modal, Select, Textarea } from "react-daisyui"
import React, { useState } from "react"

const MODEL_OPTIONS = [
  { name: 'gpt-3.5-turbo', access: 'free' },
  { name: 'gpt-3.5-turbo-0613', access: 'free' },
  { name: 'gpt-3.5-turbo-16k', access: 'free' },
  { name: 'gpt-3.5-turbo-16k-0613', access: 'free' },
  { name: 'gpt-4.0-turbo', access: 'coming soon' },
  { name: 'gpt-4-auto-summarizer', access: 'coming soon' },
]

const Settings = React.forwardRef(({
  model,
  setModel,
  setCustomInstructions,
  modelOptions = MODEL_OPTIONS
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
            {modelOptions.map(({ name, access }) => {
              return (
                <Select.Option value={name} selected={model === name} key={name} disabled={access !== 'free'}>
                  {name} {access === 'coming soon' ? access : null}
                </Select.Option>
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
