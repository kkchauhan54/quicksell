import React from 'react'
import './Card.css'

const Card = ({ id, title, tag }) => {
  return (
    <div className="ticket-card">
      <div className="card-id">{id}</div>
      <div className="card-title">{title}</div>
      <div className="card-tag"><img className='card-tag-img' src="images/icons/To-do.svg" alt="To-do" />{tag}</div>
    </div>
  )
}

export default Card
