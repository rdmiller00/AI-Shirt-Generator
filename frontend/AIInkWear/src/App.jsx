import { useState } from 'react'
import Aiink from '/AIINKLOGO.png'
import BobbyLogo from './images/BOBBYLogoDark.png'
import ChadLogo from './images/CHADLogo.png'
import MichaelLogo from './images/MICHAELLogo.png'
import './App.css'
import Prompt from './components/Prompt'
import BuyButton from './components/BuyButton'
import Navbar from './components/NavBar'


function App() {
  const [selectedImage, setSelectedImage] = useState(null);


  return (  
    <div className='appBody'>
      <header>
      <img src={Aiink} className="logo" alt="Aiink logo" />
      </header>
    <header2>
    <a href="https://www.linkedin.com/in/eric-bonstein-866a578b/" target="_blank" rel="noopener noreferrer">
    <img src={ChadLogo} className="headShot" alt="Chad logo" />
    </a>
    <a href="https://www.linkedin.com/in/robert-bobby-miller-pmp-2a2539266/" target="_blank" rel="noopener noreferrer">
    <img src={BobbyLogo} className="headShot" alt="Bobby logo" />
    </a>
    <a href="https://www.linkedin.com/in/michael-carrico-b43889b9/" target="_blank" rel="noopener noreferrer">
    <img src={MichaelLogo} className="headShot" alt="Michael logo" />
    </a>
    </header2>
    
    <section>
    <Prompt selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
    <h3>&copy; AiiNKWARE 2024</h3>
    </section>

    <aside>
    <BuyButton selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
    </aside>
    <Navbar />
    </div>
    
  )
}

export default App
