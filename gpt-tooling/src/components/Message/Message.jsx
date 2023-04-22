import PropTypes from 'prop-types'
import clsx from 'clsx'

const Message = ({
  children,
  textColor = 'text-slate-300',
  bgColor = 'bg-slate-900'
}) => {
  const containerStyles = clsx(bgColor)
  const messageStyles = clsx(
    'max-w-prose',
    'm-auto',
    'container',
    'p-4',
    'transition',
    textColor
  )
  return (
    <div className={containerStyles}>
      <p className={messageStyles}>
        {children}
      </p>
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
