import React, { Component, PropTypes } from "react"
import "./index.scss"

export default class PageError extends Component {

  static propTypes = {
    error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    errorText: PropTypes.string,
  };

  static defaultProps = {
    error: 404,
    errorText: "Page Not Found",
  };

  render() {
    const {
      error,
      errorText,
    } = this.props

    return (
      <div className="PageError--container">
        <div className="PageError--oops">{ "😱 Oooops!" }</div>
        <div>
          <p className="PageError--title">
            <strong>{ error }</strong>
            { " " }
            { errorText }
          </p>
          {
            error === 404 &&
            <div>
              { "It seems you found a broken link. " }
              { "Sorry about that. " }
              <br />
              { "Do not hesitate to report this page 😁." }
            </div>
          }
        </div>
      </div>
    )
  }
}
