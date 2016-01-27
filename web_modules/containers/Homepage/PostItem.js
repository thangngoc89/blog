import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Date from 'components/Date'
import classnames from 'classnames'
import styles from './PostItem.scss'

const PostItem = ({__url, date, title, draft}) => {
  const articleClass = classnames({
    [styles.article]: true,
    [styles.draft]: draft
  })

  const linkClass = classnames({
    [styles.title]: true,
    [styles.titleDraft]: draft
  })

  return (
    <article
      key={__url}
      className={articleClass}
    >
      <Link
        to={__url}
        className={linkClass}
      >
        {title}
      </Link>
      <Date date={date} className={styles.date} />
    </article>
  )
}

PostItem.propTypes = {
  __url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  draft: PropTypes.boolean
}

export default PostItem
