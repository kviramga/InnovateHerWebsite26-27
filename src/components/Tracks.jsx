import React from 'react'
import './Tracks.css'

function Tracks() {
  const tracks = [
    { id: 1, name: 'Track 1', description: 'Placeholder content for track 1' },
    { id: 2, name: 'Track 2', description: 'Placeholder content for track 2' },
    { id: 3, name: 'Track 3', description: 'Placeholder content for track 3' },
  ]

  return (
    <section className="tracks">
      <h2>Tracks</h2>
      <div className="tracks-container">
        {tracks.map(track => (
          <div key={track.id} className="track-card">
            <h3>{track.name}</h3>
            <p>{track.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Tracks
