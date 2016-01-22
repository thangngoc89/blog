import React, {PropTypes} from 'react'

const Markdown = ({contents}) => {
  return (
    <div
      dangerouslySetInnerHTML={{__html: contents}}
    />
  )
}

Markdown.propTypes = {
  contents: PropTypes.object
}
export default Markdown
