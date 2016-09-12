import React, { Component } from "react"
import Helmet from "react-helmet"
import TopBarProgressIndicator from "react-topbar-progress-indicator"

TopBarProgressIndicator.config({
  barColors: {
    "0": "#F98752",
    "1.0": "#F98752",
  },
  shadowBlur: 5,
})

export default class PageLoading extends Component {

  render() {
    return (
      <div>
        <Helmet
          title={ "Loading..." }
        />
        <TopBarProgressIndicator />
        <div className="loader">
          <div className="spinner" />
        </div>
      </div>
    )
  }
}
