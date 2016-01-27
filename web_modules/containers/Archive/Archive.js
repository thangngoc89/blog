import React, { Component, PropTypes } from 'react'
import Page from 'containers/Page'
import moment from 'moment'
import { connect } from 'react-redux'
import _ from 'lodash'
import ArchiveList from './ArchiveList'

export class Homepage extends Component {
  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    collection: PropTypes.array
  };

  get collection () {
    let value = _.chain(this.props.collection)
      .filter(t => t.layout === 'Post')

    // Exclude draft in production build
    if (__PROD__) {
      value = value
       .filter(t => t.draft === undefined)
    }
    // sort reverse by date
    // group by month
    return value
      .orderBy(['date'], ['desc'])
      .uniqBy('__url')
      .groupBy(t => moment(t.date).utc().startOf('month').format())
      .map(ArchiveList)
      .value()
  }

  render () {
    const {
      collection
    } = this.props

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
)(Homepage)
