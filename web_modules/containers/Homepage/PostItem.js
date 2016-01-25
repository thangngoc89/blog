import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Date from 'components/Date'
import styles from './PostItem.scss'

const PostItem = ({__url, date, title}) => {
  return (
    <article
      key={__url}
      className={styles.article}
    >
      <Link
        to={__url}
        className={styles.title}
      >
        <h2>{title}</h2>
      </Link>
      <Date date={date} className={styles.date} />
    </article>
  )
}

PostItem.propTypes = {
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired
}

export default PostItem
