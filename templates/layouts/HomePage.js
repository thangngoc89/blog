import React, {PropTypes} from 'react'
import Header from '../components/Header'
import Markdown from '../components/Markdown'
import Base from './Base'
const debug = require('debug')('template:HomePage')

const DefaultTemplate = (props, context) => {
  debug(props)
  const {
    file: {title, contents},
    config: {site}
  } = props

  return (
    <Base title={title} site={site}>
      <div className='container-fluid'>
        <Header />

        <div className='row'>
          <Markdown contents={contents} />
        </div>
      </div>

    </Base>
  )
}

DefaultTemplate.propTypes = {
  file: PropTypes.object.isRequired
}

export default DefaultTemplate
