import React, { PropTypes } from "react"

const GitHubEditLink = ({ baseUrl, fileName, ...props }) => {
  const url = baseUrl + fileName

  return (
    <section {...props}>
      { "Bài viết sai chính tả? Có điểm chưa rõ ràng?" }
      { '  ' }
      <a href={ url } target="_blank">
        { "Sửa bài viết trên Github" }
      </a>
    </section>
  )
}

GitHubEditLink.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
}

export default GitHubEditLink
