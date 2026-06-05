import React from 'react'
import './ExecBoard.css'

function ExecBoard() {
  const members = [
    { id: 1, name: 'Member 1', role: 'President' },
    { id: 2, name: 'Member 2', role: 'Vice President' },
    { id: 3, name: 'Member 3', role: 'Treasurer' },
    { id: 4, name: 'Member 4', role: 'Secretary' },
  ]

  return (
    <section className="exec-board">
      <h2>Executive Board</h2>
      <div className="board-container">
        {members.map(member => (
          <div key={member.id} className="member-card">
            <div className="member-image"></div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ExecBoard
