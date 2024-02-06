import React from 'react'
import { Modal } from 'react-daisyui'

const Stats = React.forwardRef(({
  totalTokensUsed = 0
}, ref) => {
  return (
    <Modal ref={ref} backdrop>
    </Modal>
  )
})

Stats.displayName = 'Stats'

export default Stats
