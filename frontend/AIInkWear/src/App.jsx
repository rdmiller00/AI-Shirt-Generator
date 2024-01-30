import { useState } from 'react'
import Aiink from '/AIINKLOGO.png'
import './App.css'
import Prompt from './components/Prompt'
import Display from './components/Display'
import ImageSplitter from './components/ImageSplitter'

function App() {

  return (
    <>
      <div>
          <img src={Aiink} className="logo" alt="Vite logo" />
      </div>
    <Prompt />
    </>
  )
}

export default App
