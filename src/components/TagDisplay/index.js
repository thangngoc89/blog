import React, { Component, PropTypes } from "react"
import Link from "react-router/lib/Link"

export default class TagDisplay extends Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
  };

  render() {
    return (
      <span>
        <Link
          to={ "/tag/" + this.props.tag }
          className="tag"
        >
          { "#" }
          { this.props.tag }
        </Link>
      </span>
    )
  }
}
