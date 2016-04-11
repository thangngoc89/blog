import React, { PropTypes } from "react"
import { Link } from "react-router"
import classnames from "classnames"

import Date from "../../components/Date"
import Tag from "../../components/Tag"
import styles from "./PostItem.scss"

const PostItem = ({ __url, date, title, draft, tags, description }) => {
  const articleClass = classnames(styles.article, {
    [styles.draft]: draft,
  })

  const linkClass = classnames(styles.title, {
    [styles.titleDraft]: draft,
  })

  return (
    <article
      key={ __url }
      className={ articleClass }
    >
      <Link
        to={ __url }
        className={ linkClass }
      >
        { title }
      </Link>
      <p>
        {
          tags &&
          Array.isArray(tags) &&
            tags.map((tag) =>
              <Tag key={ tag } name={ tag } />
            )
        }
        <Date date={ date } className={ styles.date } />
      </p>
      {
        description &&
          <p className={ styles.description }>{ description }</p>
      }
    </article>
  )
}

PostItem.propTypes = {
  __url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  draft: PropTypes.boolean,
  tags: PropTypes.array,
}

export default PostItem
