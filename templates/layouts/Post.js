import React, {PropTypes} from 'react'
import Header from '../components/Header'
import Markdown from '../components/Markdown'
import Base from './Base'
const debug = require('debug')('template:DefaultTemplate')

const DefaultTemplate = (props, context) => {
  debug(props)
  const {
    file: {title, contents},
    config: {site}
  } = props

  return (
    <Base title={title} site={site}>
      <Header />
      <Markdown contents={contents} />
    </Base>
  )
}

DefaultTemplate.propTypes = {
  file: PropTypes.object.isRequired
}

export default DefaultTemplate
