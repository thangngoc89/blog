import React, { Component, PropTypes } from 'react'
import Page from 'containers/Page'
import Date from 'components/Date'

/**
 * Template for blog post
 */
export default class Post extends Component {
  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired
  };

  render () {
    const {
      head,
      body
    } = this.props

    return (
      <Page {...this.props}>
        <h1>{head.title}</h1>
        <Date date={head.date} />
        {
          body &&
          <div
            dangerouslySetInnerHTML={{__html: body}}
          ></div>
        }
      </Page>
    )
  }
}
