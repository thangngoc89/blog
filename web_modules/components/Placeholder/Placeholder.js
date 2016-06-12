import React, { Component, PropTypes } from "react"
import styles from "./Placeholder.css"

export default class Placeholder extends Component {
  static propTypes = {
    children: PropTypes.string,
    height: PropTypes.string,
  };

  static defaultProps = {
    height: "10rem",
  };

  render() {
    return (
      <div
        className={ styles.placeholder }
        style={ { height: this.props.height } }
      >
        { this.props.children }
      </div>
    )
  }
}
