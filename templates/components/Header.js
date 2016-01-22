import React from 'react'
import NavToggle from './NavToggle'

const Header = () => {
  return (
    <header className='Header--nav'>
      <NavToggle />
      <a href='/' className='Header--name'>
        Khoa Nguyen
      </a>
    </header>
  )
}

export default Header
