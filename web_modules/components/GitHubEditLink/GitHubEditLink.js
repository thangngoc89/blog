import React, { PropTypes } from 'react'
import styles from './GitHubEditLink.scss'

const GitHubEditLink = ({ baseUrl, fileName }) => {
  const url = baseUrl + fileName

  return (
    <p className={styles.text}>
      Bài viết sai chính tả? Có điểm chưa rõ ràng?
      {'  '}
      <a href={url} target='_blank'>
        Sửa bài viết trên Github
      </a>
    </p>
  )
}

GitHubEditLink.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired
}

export default GitHubEditLink
