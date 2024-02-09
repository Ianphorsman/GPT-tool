import React, { useState } from 'react'
import { Button, Divider, Select, Textarea } from 'react-daisyui'
import RangeBlock from '../RangeBlock'
import { MODEL_OPTIONS } from "~/constants"

const GenerationSettings = ({
  model,
  setModel,
  setCustomInstructions,
  setMaxMessageLength,
  maxMessageLength,
  setMaxResponses,
  maxResponses,
  setTemperature,
  temperature,
  activeAgent
}) => {
  const [_customInstructions, _setCustomInstructions] = useState('')
  const [hasMadeChanges, setHasMadeChanges] = useState(false)
  const id = activeAgent.id

  const onApplyChangesClick = () => {
    setCustomInstructions(id, _customInstructions)
    setHasMadeChanges(false)
  }

  const onInputChange = (e) => {
    _setCustomInstructions(e.target.value)
    setHasMadeChanges(!!e.target.value)
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-1 flex-col justify-center items-stretch gap-3">
        <Textarea
          label="Custom Instructions"
          onChange={onInputChange}
          placeholder="Type your custom instructions here..."
          className="flex-1"
        />
        <Button onClick={onApplyChangesClick} disabled={!hasMadeChanges}>Save</Button>
      </div>
      <Divider horizontal />
      <div className="flex flex-1 flex-col justify-center items-stretch gap-3">
        <Select onChange={(e) => setModel(id, e.target.value)}>
          {MODEL_OPTIONS.map(({ name, access }) => {
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
          onChange={(e) => setMaxMessageLength(id, e.target.value)}
          min={1}
          max={2000}
          step={maxMessageLength}
        />
        <RangeBlock
          label="Temperature"
          size="xs"
          color="ghost"
          onChange={(e) => setTemperature(id, e.target.value)}
          min={0}
          max={200}
          step={temperature}
        />
        <RangeBlock
          label="Max responses"
          size="xs"
          color="ghost"
          onChange={(e) => setMaxResponses(id, e.target.value)}
          min={1}
          max={10}
          step={maxResponses}
        />
      </div>
    </div>
  )
}

export default GenerationSettings
