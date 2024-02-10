import React from 'react'
import { Checkbox } from 'react-daisyui'

const FormFieldBlock = ({
  label,
  description,
  checked,
  onChange,
  disabled
}) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-between">
      <div>
        <p>{label}</p>
        <small className="block">{description}</small>
      </div>
      <Checkbox
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default FormFieldBlock
