import PropTypes from 'prop-types'
import clsx from 'clsx'
import colors from 'tailwindcss/colors'
import Input from '../Input'
import Button from '../Button/Button'

const Prompter = ({
  onChange,
  onSubmit,
  linearGradientColor = colors.slate[950],
  radialGradientColorFrom = colors.sky[950],
  radialGradientColorTo = colors.indigo[950]
}) => {
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
      <Input
        initialValue=""
        label="Enter your prompt here"
        className="flex-grow"
        onChange={onChange}
      />
      <Button onClick={onSubmit} style={{}}>Chat</Button>
    </section>
  )
}

Prompter.propTypes = {
  onSubmit: PropTypes.func
}

export default Prompter
