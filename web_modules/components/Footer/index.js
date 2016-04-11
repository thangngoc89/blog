import React from "react"
import styles from "./index.scss"

const Footer = () => {
  return (
    <footer className={ styles.footer }>
      <div className="row">
        <div className={ styles.info }>
          <p>
            Built with
            <span className={ styles.heart }> ♥ </span>
            by Khoa Nguyen
          </p>
          <p>
            <a
              target="_blank"
              href="https://github.com/thangngoc89/blog"
            >
              Source code available under MIT License
            </a>
          </p>
        </div>
        <div className={ styles.copyright }>
          <p>Copyright©2015-present, Khoa Nguyen</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
