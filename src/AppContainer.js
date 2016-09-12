import React, { Component, PropTypes } from "react"

import "./sass/main.scss"

import DefaultHeadMeta from "./components/DefaultHeadMeta"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default class AppContainer extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  render() {
    return (
      <div>
        <DefaultHeadMeta />
        <Header />
        <div className="content">
          { this.props.children }
        </div>
        <Footer />
      </div>
    )
  }
}
