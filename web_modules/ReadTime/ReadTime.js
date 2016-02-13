import React, { PropTypes } from 'react'
import readingTime from 'reading-time'

const ReadTime = props => {
  const time = readingTime(props.text)
  return (
    <span {...props}>{time.text}</span>
  )
}

ReadTime.propTypes = {
  text: PropTypes.string
}

export default ReadTime
