import { useState } from 'react'
import Aiink from '/AIINKLOGO.png'
import BobbyLogo from './images/BOBBYLogoDark.png'
import ChadLogo from './images/CHADLogo.png'
import MichaelLogo from './images/MICHAELLogo.png'
import './App.css'
import Prompt from './components/Prompt'
import BuyButton from './components/BuyButton'


function App() {
  const [selectedImage, setSelectedImage] = useState(null);


  return (  
    <div className='appBody'>
      <header>
      <img src={Aiink} className="logo" alt="Aiink logo" />
      </header>
    <header2>
    <img src={ChadLogo} className="headShot" alt="Chad logo" />
    <img src={BobbyLogo} className="headShot" alt="Bobby logo" />
    <img src={MichaelLogo} className="headShot" alt="Michael logo" />
    </header2>

    <section>
    <Prompt selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
    </section>

    <aside>
    <BuyButton selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
    </aside>

    </div>
    
  )
}

export default App
