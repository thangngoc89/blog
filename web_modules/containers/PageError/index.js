import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

/**
 * Error page
 */
export default class PageError extends Component {
  static propTypes = {
    error: PropTypes.number.isRequired,
    errorText: PropTypes.string.isRequired
  };

  render () {
    const {
      error,
      errorText
    } = this.props

    return (
      <div className='container-fluid'>
        <Helmet
          title={`${error} - ${errorText}`}
        />
        <div className='row'>
          <div className='col-xs-8 center-block'>
            <h1>{error}</h1>
            <p>{errorText}</p>
          </div>
        </div>
      </div>
    )
  }
}
