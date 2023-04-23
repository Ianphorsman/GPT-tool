import PropTypes from 'prop-types'
import clsx from 'clsx'
import colors from 'tailwindcss/colors'

const Message = ({
  children,
  textColor = 'text-slate-300',
  bgColor = 'bg-slate-900',
  isStreaming = false
}) => {
  const containerStyles = clsx(bgColor)
  const messageStyles = clsx(
    'max-w-prose',
    'm-auto',
    'container',
    'p-4',
    'transition',
    'relative',
    'antialiased',
    'bg-slate-300',
    textColor
  )
  return (
    <div className={containerStyles}>
      <article
        className={messageStyles}
        style={{
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textFillColor: 'transparent',
          WebkitMask: 'text'
        }}
      >
        {children}
        {isStreaming ? (
          <div
            style={{
              WebkitBackgroundClip: 'text',
              //backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
              backdropFilter: 'brightness(200%) blur(0.2rem) invert(1)',
              WebkitMask: 'text',
              width: '3rem',
              height: '1.15rem',
              transform: 'translateY(0.15rem) translateX(-3rem)',
              position: 'absolute',
              display: 'inline-block'
            }}
          ></div>
        ) : null}
      </article>
    </div>
  )
}

Message.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Message
