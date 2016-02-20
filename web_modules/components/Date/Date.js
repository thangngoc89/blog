import React, { PropTypes } from 'react'
import moment from 'moment'

moment.locale('vi')

const Date = (props) => {
  const date = moment(props.date).utc().format('DD MMMM YYYY')
  return (
    <span {...props}>{date}</span>
  )
}

Date.propTypes = {
  date: PropTypes.any
}

export default Date
