
import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import colors from 'tailwindcss/colors'
import { Button, InputGroup, Input } from 'react-daisyui'
import useEventListener from '~/hooks/useEventListener'

const Prompter = ({
  onChange,
  onSubmit,
  linearGradientColor = colors.slate[950],
  radialGradientColorFrom = colors.sky[950],
  radialGradientColorTo = colors.indigo[950]
}) => {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const _onChange = (e) => {
    setText(e.target.value)
    onChange(e)
  }

  const _onSubmit = () => {
    onSubmit(text)
    setText('')
    inputRef.current.value = ''
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      _onSubmit()
    }
  }

  useEventListener('keydown', handleEnter)

  const prompterStyles = clsx(
    'flex',
    'flex-row',
    'container',
    'mx-auto',
    'max-w-prose'
  )
  
  return (
    <section
      style={{
        border: 'double 2px transparent',
        backgroundImage: `linear-gradient(to bottom right, ${linearGradientColor}, ${linearGradientColor}), radial-gradient(circle at top left, ${radialGradientColorFrom}, ${radialGradientColorTo})`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box'
      }}
      className={prompterStyles}
    >
      <InputGroup className="flex flex-row w-full">
        <Input
          type="text"
          placeholder="Enter your prompt here"
          onChange={_onChange}
          className="flex-grow focus:outline-none"
          ref={inputRef}
        />
        <Button onClick={_onSubmit} className="btn btn-ghost">Chat</Button>
      </InputGroup>
    </section>
  )
}

Prompter.propTypes = {
  onSubmit: PropTypes.func
}

export default Prompter
