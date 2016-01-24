import React, { PropTypes } from 'react'

const GitHubEditLink = ({ baseUrl, fileName }) => {
  const url = baseUrl + fileName

  return (
    <div>
      <hr />
      <p>
        Bài viết sai chính tả? Có điểm chưa rõ ràng?
        { '  ' }
        <a href={url} target='_blank'>
          Sửa bài viết trên Github
        </a>
      </p>
    </div>
  )
}

GitHubEditLink.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired
}

export default GitHubEditLink
