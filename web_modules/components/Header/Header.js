import React from 'react'
import { Link } from 'react-router'
import styles from './Header.scss'
import SVGICon from '../SVGIcon'

const Header = () => {
  return (
    <header className={styles.nav}>
      <div className='container'>
        <div className='row'>
          <div className={styles.brand}>
            <Link to='/'>
              Khoa Nguyen
            </Link>
          </div>

          <div className={styles.navLink}>
            <Link to='/archive'>
              <SVGICon icon='bookmark-outline' />
              Bài viết
            </Link>
            <Link to='/about'>
              <SVGICon icon='person-outline' />
              Giới thiệu
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
