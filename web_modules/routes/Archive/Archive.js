import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import enhanceCollection from 'statinamic/lib/enhance-collection'

import ArchiveList from './ArchiveList'
import Page from '../../layouts/Page'

export default class Archive extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired
  };

  get collection () {
    let collection = enhanceCollection(this.context.collection, {
      filter: (t) => {
        const isPost = t.layout === 'Post'
        if (process.env.NODE_ENV === 'production') {
          return (t.draft === undefined && isPost)
        }
        return isPost
      },
      sort: 'date',
      reverse: true
    })

    collection = groupBy(collection, (t) =>
      moment(t.date)
        .utc()
        .startOf('month')
        .format()
    )
    collection = map(collection, ArchiveList)
    return collection
  }

  render () {
    const {
      collection
    } = this.context

    return (
      <Page
        head={{
          title: 'Bài viết'
        }}
        __url='/article'
      >
      {
        Boolean(!collection || !collection.length) &&
          <p>No entry</p>
      }
      {
        Boolean(collection && collection.length) &&
          <div>{this.collection}</div>
      }
      </Page>
    )
  }
}
