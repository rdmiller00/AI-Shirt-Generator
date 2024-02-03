import { useState } from 'react'
import Aiink from '/AIINKLOGO.png'
import './App.css'
import Prompt from './components/Prompt'
import BuyButton from './components/BuyButton'
import Display from './components/Display'
import ImageSplitter from './components/ImageSplitter'

function App() {

  return (
    <>
    <body>
    <header>
          <img src={Aiink} className="logo" alt="Aiink logo" />
    </header>

    <section>Prompt
    <Prompt />
    </section>

    <aside>T-Shirt Area
    <BuyButton />
    </aside>

    </body>
    </>
  )
}

export default App
