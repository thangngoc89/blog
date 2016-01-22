import React, {PropTypes} from 'react'
import Header from '../components/Header'
import Markdown from '../components/Markdown'

const Base = ({title, site, children}) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <title>{title} | {site}</title>
        <link href="/styles/core.css" rel="stylesheet" />
      </head>
      <body>
        <div>
          {children}
        </div>
        <script src="/script.js"></script>
      </body>
    </html>
  )
}

Base.propTypes = {
  site: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Base
