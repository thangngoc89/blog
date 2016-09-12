import React, { Component } from "react"
import site from "../../config.yml"

export default class Footer extends Component {

  render() {
    if (site.theme_settings.footer_text) {
      return (
        <footer className="site-footer">
          <p
            className="text"
            dangerouslySetInnerHTML={ { __html: site.theme_settings.footer_text } }
          />
        </footer>
      )
    }
    return null
  }
}
