import React, { PropTypes } from 'react'
import moment from 'moment'

const Date = (props) => {
  const date = moment(props.date).utc().format('DD MMM YYYY')
  return (
    <span {...props}>{date}</span>
  )
}

Date.propTypes = {
  date: PropTypes.string
}

export default Date
