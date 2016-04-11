import React, { Component, PropTypes } from "react"
import styles from "./Placeholder.scss"

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
        className={ styles.block }
        style={ { height: this.props.height } }
      >
        <div
          className={ styles.placeholder }
        >
          { this.props.children }
        </div>
      </div>
    )
  }
}
