import PropTypes from 'prop-types'
import clsx from 'clsx'

const Modal = ({
  children
}) => {
  return (
    <>
      {children}
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Modal
