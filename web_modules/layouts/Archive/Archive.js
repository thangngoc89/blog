import React, { Component, PropTypes } from 'react'
import Page from '../Page'
import moment from 'moment'
import { connect } from 'react-redux'
import _ from 'lodash'
import ArchiveList from './ArchiveList'

export class Archive extends Component {
  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired
  };

  static contextTypes = {
    collection: PropTypes.array.isRequired
  };

  get collection () {
    let value = this.context.collection
    value = value.filter(t => t.layout === 'Post')
    value = _.orderBy(value, ['date'], ['desc'])
    value = _.uniqBy(value, '__url')
    // Exclude draft in production build
    if (process.env.NODE_ENV === 'production') {
      value = value.filter(t => t.draft === undefined)
    }
    value = _.groupBy(value, t =>
      moment(t.date)
        .utc()
        .startOf('month')
        .format()
    )
    value = _.map(value, ArchiveList)
    return value
  }

  render () {
    const {
      collection
    } = this.context

    return (
      <Page {...this.props}>
      {
        Boolean(!collection || !collection.length) &&
        <p>No entry</p>
      }
      {
        Boolean(collection && collection.length) &&
        <div>
          {this.collection}
        </div>
      }
      </Page>
    )
  }
}

export default connect(
  ({ collection }) => ({ collection })
)(Archive)
