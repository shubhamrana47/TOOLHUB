import React from 'react'
import Howitworksintro from '../component/Howitworksintro'
import Howitworksheader from '../component/Howitworksheader'
import NAVBAR from '../HOME/NAVBAR'
import Footer from '../HOME/Footer'
import Howitworkssteps from '../component/Howitworkssteps'
import Howitworkscard from '../component/Howitworkscard'

const Howitworks = () => {
  return (
    <div>

        <NAVBAR/>
          {/* first section here  */}
          
           <Howitworksheader/>

          <Howitworksintro/>
          <Howitworkssteps/>
          <Howitworkscard/>

          <Footer/>
    </div>
  )
}

export default Howitworks