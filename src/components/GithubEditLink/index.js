import React, { PropTypes } from "react"

const GitHubEditLink = ({ baseUrl, fileName, ...props }) => {
  const url = baseUrl + fileName

  return (
    <section {...props}>
      { "Spotted typos or incorrect information?" }
      { '  ' }
      <a href={ url } target="_blank">
        { "Send me a PR on Github" }
      </a>
    </section>
  )
}

GitHubEditLink.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
}

export default GitHubEditLink
