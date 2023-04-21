import clsx from 'clsx'
import PropTypes from 'prop-types'

const PageContainer = ({
  children
}) => {
  const mainStyles = clsx(
    'container', 'm-auto'
  )
  return (
    <div className={mainStyles}>
      {children}
    </div>
  )
}

PageContainer.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default PageContainer
