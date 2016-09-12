/* eslint-disable react/no-multi-comp */
import React, { PropTypes } from "react"
import moment from "moment"
import { Link } from "react-router"
import _ from "lodash"
import classnames from "classnames"

import styles from "./ArchiveList.scss"

moment.locale("vi")

const PostLink = ({ item }) => {
  const day = moment(item.date).utc().format("DD")
  const linkClassName = classnames({
    [styles.draft]: item.draft,
  })
  return (
    <p className={ styles.link }>
      { day } { ' - ' }
      <Link
        to={ item.__url }
        className={ linkClassName }
      >
        { item.title }
      </Link>
    </p>
  )
}
PostLink.propTypes = {
  item: PropTypes.object.isRequired,
}

const ArchiveList = (group) => {
  const month = moment(group[0].date).format("MMMM/YYYY")
  const posts = _.map(group, (item) => <PostLink key={ item.__url } item={ item } />)

  return (
    <div key={ month }>
      <p className={ styles.month }>{ month }</p>
      { posts }
    </div>
  )
}

export default ArchiveList
