import { useState } from 'react'
import Aiink from '/AIINKLOGO.png'
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
