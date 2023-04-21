import PropTypes from 'prop-types'
import clsx from 'clsx'

const Main = ({ children }) => {
  const mainStyles = clsx('bg-slate-950', 'min-h-screen')
  return (
    <main className={mainStyles}>
      {children}
    </main>
  )
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default Main
