import { Modal, Select } from "react-daisyui"
import React from "react"

const Settings = React.forwardRef(({
  model,
  setModel,
  modelOptions = ['gpt-3.5-turbo', 'gpt-3.5-turbo-0613', 'gpt-3.5-turbo-16k', 'gpt-3.5-turbo-16k-0613']
}, ref) => {
  return (
    <Modal ref={ref} backdrop>
      <Modal.Header>Settings</Modal.Header>
      <Modal.Body>
        <Select onChange={setModel}>
          {modelOptions.map((modelName) => {
            return (
              <Select.Option value={modelName} selected={model === modelName} key={modelName}>{modelName}</Select.Option>
            )
          })}
        </Select>
      </Modal.Body>
    </Modal>
  )
})

Settings.displayName = 'Settings'

export default Settings
