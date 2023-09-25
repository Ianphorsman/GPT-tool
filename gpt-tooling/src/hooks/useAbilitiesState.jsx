import { useState } from 'react'

const useAbilitiesState = ({
  hasLongTermMemory
}) => {
  const [hasLongTermMemory, setHasLongTermMemory] = useState(hasLongTermMemory)
  return {
    setHasLongTermMemory
  }
}

export default useAbilitiesState
