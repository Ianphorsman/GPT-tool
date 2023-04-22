import { useId } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import colors from 'tailwindcss/colors'

const Input = ({
  className,
  value,
  initialValue,
  onChange,
  label,
  isTextarea = false,
  inputRef
}) => {
  const inputId = useId()
  const wrapperStyles = clsx(
    'relative',
    'max-w-prose',
    className
  )
  const inputStyles = clsx(
    'p-4',
    'bg-transparent',
    'rounded-none',
    'outline-none',
    'w-full',
    'text-slate-300'
  )

  return (
    <div
      className={wrapperStyles}
    >
      <input
        id={inputId}
        className={inputStyles}
        type="text"
        defaultValue={initialValue}
        placeholder='Enter your prompt here...'
        onChange={onChange}
        ref={inputRef}
      />
    </div>
  )
}

Input.propTypes = {
  value: PropTypes.string,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  isTextarea: PropTypes.bool
}

export default Input
