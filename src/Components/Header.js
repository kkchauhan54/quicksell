import React from 'react'
import './Header.css'

const Header = ({ imagePath, title, length }) => {
  return (
    <div className="column-header">
      <div className="header-left">
        <img src={imagePath} alt={title} className="header-icon" />
        <span>{title}</span>
        <span style={{color:'grey'}}>{length}</span>
      </div>
      <div className="header-right">
        <img
          src="/images/icons/add.svg"
          alt="icon1"
          className="header-right-icon"
        />
        <img
          src="/images/icons/3 dot menu.svg"
          alt="icon2"
          className="header-right-icon"
        />
      </div>
    </div>
  )
}

export default Header
