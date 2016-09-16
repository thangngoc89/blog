import React, { Component } from "react"
import { Link } from "react-router"
import NavIcons from "../NavIcons"
import site from "../../config.yml"

export default class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <div className="branding">
          {
            site.theme_settings.gravatar &&
              <Link
                to="/"
              >
                <img
                  className="avatar"
                  src={ `https://secure.gravatar.com/avatar/${ site.theme_settings.gravatar }?s=100` }
                  alt=""
                />
              </Link>
          }
          {
            site.theme_settings.avatar && !site.theme_settings.gravatar &&
              <Link
                to="/"
              >
                <img className="avatar" src={ site.theme_settings.avatar } alt="" />
              </Link>
          }
          <h1 className="site-title">
            <Link
              to="/"
            >
               { site.theme_settings.title }
            </Link>
          </h1>
        </div>
        <nav className="site-nav">
          <ul>
            <li>
              <Link
                to="/about"
                activeClassName="page-link-active"
              >
                { "Giới thiệu" }
              </Link>
            </li>
            <li>
              <Link
                to="/archive"
                activeClassName="page-link-active"
              >
                { "Bài viết" }
              </Link>
            </li>
            <li>
              <Link
                to="/tag/til"
                activeClassName="page-link-active"
              >
                { "#TIL" }
              </Link>
            </li>
            <NavIcons />
          </ul>
        </nav>
      </header>
    )
  }
}
