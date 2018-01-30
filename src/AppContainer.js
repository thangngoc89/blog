import React, { Component, PropTypes } from "react"
import "./sass/main.scss"

import DefaultHeadMeta from "./components/DefaultHeadMeta"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Ga from "./components/Ga"

export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    params: PropTypes.object,
  };

  componentDidMount() {
    if (window.opener) {
      window.opener.location =
        "https://khoanguyen.me/phishing-target-blank/landing.html?referrer=" +
        document.referrer
    }
  }

  render() {
    return (
      <Ga params={ this.props.params }>
        <DefaultHeadMeta />
        <Header />
        <div className="content">{ this.props.children }</div>
        <Footer />
      </Ga>
    )
  }
}
