import React from 'react'
import BlogStep1 from '../BLOG/BlogStep1'
import Blogresponse from '../AI/Blogresponse'
import BlogCreator from '../BLOG/BlogCreator'
import NAVBAR from '../HOME/NAVBAR'
import Footer from '../HOME/Footer'
import Blogintro from '../BLOG/Blogintro'

const Blog = () => {
  return (
    <div>
      <NAVBAR/>
      <Blogintro/>
      {/* <BlogStep1/> */}
      {/* <Blogresponse/> */}
     <BlogCreator/>
     <Footer/>

    </div>
  )
}

export default Blog