import React from 'react'
import TitleCard from './components/TitleCard'
import About from './components/About'
import Tracks from './components/Tracks'
import ExecBoard from './components/ExecBoard'
import FAQ from './components/FAQ'
import Teams from './components/Teams'
import Sponsors from './components/Sponsors'
import './App.css'

function App() {
  return (
    <div className="app">
      <TitleCard />
      <About />
      <Tracks />
      <ExecBoard />
      <FAQ />
      <Teams />
      <Sponsors />
    </div>
  )
}

export default App
