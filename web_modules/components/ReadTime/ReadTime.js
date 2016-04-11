import React, { PropTypes } from "react"
import readingTime from "reading-time"
import moment from "moment"
moment.locale("vi")

const ReadTime = (props) => {
  const time = readingTime(props.text)
  const timeToString = moment.duration(time.time).humanize()

  return (
    <span {...props}>
      ~ { timeToString }
    </span>
  )
}

ReadTime.propTypes = {
  text: PropTypes.string,
}

export default ReadTime
