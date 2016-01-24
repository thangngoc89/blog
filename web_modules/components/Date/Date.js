import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import styles from './Date.scss'

export default class Date extends Component {
  static propTypes = {
    date: PropTypes.string
  };

  render () {
    if (this.props.date === undefined) {
      return (<span></span>)
    }
    let date = moment(this.props.date)
    const diff = moment.duration(moment().diff(date)).asDays()

    // If less than a month, show a human readable string
    date = (diff < 30) ? date.fromNow() : date.format('DD-MM-YYYY')

    return (
      <span className={styles.date}>{date}</span>
    )
  }
}
