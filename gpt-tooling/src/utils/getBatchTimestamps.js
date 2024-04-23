function getBatchTimestamps(baseTimestamp, count) {
  let timestamps = []
  let timeIncrement = 1

  for (let i = 0; i < count; i++) {
      let time = new Date(baseTimestamp.getTime() + i * timeIncrement)
      timestamps.push(time)
  }

  return timestamps
}

export default getBatchTimestamps
