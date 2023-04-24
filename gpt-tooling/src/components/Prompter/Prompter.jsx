import { useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import colors from 'tailwindcss/colors'
import Input from '../Input'
import Button from '../Button/Button'
import useEventListener from '~/hooks/useEventListener'

const Prompter = ({
  onChange,
  onSubmit,
  linearGradientColor = colors.slate[950],
  radialGradientColorFrom = colors.sky[950],
  radialGradientColorTo = colors.indigo[950]
}) => {
  const inputRef = useRef(null)

  const _onSubmit = () => {
    onSubmit()
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
    'max-w-prose',
    'self-end'
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
      <Input
        initialValue=""
        label="Enter your prompt here"
        className="flex-grow"
        onChange={onChange}
        inputRef={inputRef}
      />
      <Button onClick={_onSubmit} style={{}}>Chat</Button>
    </section>
  )
}

Prompter.propTypes = {
  onSubmit: PropTypes.func
}

export default Prompter
