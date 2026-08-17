
  import NAVBAR from "../HOME/NAVBAR"
import Section1 from "../HOME/Section1"

import Section2 from "../HOME/Section2"
import Section3 from "../HOME/Section3"
import Section4 from "../HOME/Section4"
import Footer from "../HOME/Footer";
import Popup from "../HOME/Popup"
import Howitworksintro from "../component/Howitworksintro"
import Blogintro from "../BLOG/Blogintro"
import HomeTools from "../HOME/HomeTools"
import ToolsHero from "../component/ToolsHero"



const HomePage = () => {
  return (
    <div> 
          <NAVBAR/>
           <ToolsHero/>
          {/* <Section1/> */}
          <Section2/>
          <HomeTools/>
          {/* <Popup/> */}
           {/* <Blogintro/> */}
          <Howitworksintro/>
          
         
          <Section3/>
          <Section4/>
            <Footer/>


    </div>
  )
}

export default HomePage