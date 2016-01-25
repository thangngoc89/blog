import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import styles from './Date.scss'

export default class Date extends Component {
  static propTypes = {
    date: PropTypes.string
  };

  render () {
    const date = moment(this.props.date).format('DD MMM YYYY')
    return (
      <span className={styles.date}>{date}</span>
    )
  }
}
