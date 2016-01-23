import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Page from 'containers/Page'

import { connect } from 'react-redux'
import enhanceCollection from 'statinamic/lib/enhance-collection'

export class Homepage extends Component {
  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    collection: PropTypes.array
  };

  render () {
    const {
      collection
    } = this.props
    return (
      <Page {...this.props}>
      {
        Boolean(!collection || !collection.length) &&
        <div>
          { "No entry" }
        </div>
      }
      {
        Boolean(collection && collection.length) &&
        <div>
          <ul>
          {
            enhanceCollection(collection, {
              filter: { layout: 'Post' },
              sort: 'date',
              reverse: true
            })
            .map((item) => {
              return (
                <li key={ item.__url }>
                  <Link to={item.__url}>
                    {item.title}
                  </Link>
                </li>
              )
            })
          }
          </ul>

        </div>
      }
      </Page>
    )
  }
}

export default connect(
  ({ collection }) => {
    return { collection }
  }
)(Homepage)
