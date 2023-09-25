import PropTypes from 'prop-types'

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
