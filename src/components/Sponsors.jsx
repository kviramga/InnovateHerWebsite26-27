import React from 'react'
import './Sponsors.css'

function Sponsors() {
  const sponsors = [
    { id: 1, name: 'Sponsor 1' },
    { id: 2, name: 'Sponsor 2' },
    { id: 3, name: 'Sponsor 3' },
    { id: 4, name: 'Sponsor 4' },
  ]

  return (
    <section className="sponsors">
      <h2>Our Sponsors</h2>
      <p>Thank you to our partners who support InnovateHer</p>
      <div className="sponsors-container">
        {sponsors.map(sponsor => (
          <div key={sponsor.id} className="sponsor-logo">
            <div className="placeholder">{sponsor.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Sponsors
