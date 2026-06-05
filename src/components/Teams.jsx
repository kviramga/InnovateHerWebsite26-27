import React from 'react'
import './Teams.css'

function Teams() {
  const teams = [
    { id: 1, name: 'Event Planning', members: 8 },
    { id: 2, name: 'Marketing', members: 6 },
    { id: 3, name: 'Mentorship', members: 10 },
    { id: 4, name: 'Development', members: 7 },
  ]

  return (
    <section className="teams">
      <h2>Our Teams</h2>
      <div className="teams-container">
        {teams.map(team => (
          <div key={team.id} className="team-card">
            <h3>{team.name}</h3>
            <p className="team-members">{team.members} members</p>
            <button className="team-button">Learn More</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
