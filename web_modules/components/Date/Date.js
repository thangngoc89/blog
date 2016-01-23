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

    const date = moment(this.props.date).format('DD MMMM YYYY')

    return (
      <span className={styles.date}>{date}</span>
    )
  }
}
