import React from 'react'

export default function Modal({message, onModal}) {
  return (
    <div className="verification-screen">
    <div className="verification-modal">
      <h3>{message}</h3>
      <div className="verification-buttons">
      <button onClick={()=> onModal(true)}>Yes</button>
      <button onClick={()=> onModal(false)}>No</button>
      </div>
    </div>
    </div>
  )
}
