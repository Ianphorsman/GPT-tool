import PropTypes from 'prop-types'
import clsx from 'clsx'

const Main = ({ children, styles = '' }) => {
  const mainStyles = clsx(styles)
  return (
    <main style={{ height: '87vh' }} className={mainStyles}>
      {children}
    </main>
  )
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  styles: PropTypes.string
}

export default Main
