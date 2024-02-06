import React from 'react'
import { Modal } from 'react-daisyui'

const Stats = React.forwardRef(({
  totalTokensUsed = 0
}, ref) => {
  return (
    <Modal ref={ref} backdrop>
      <Modal.Header>Stats</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col justify-center items-stretch">
          <p>Total Tokens Used: {totalTokensUsed}</p>
        </div>
      </Modal.Body>
    </Modal>
  )
})

Stats.displayName = 'Stats'

export default Stats
