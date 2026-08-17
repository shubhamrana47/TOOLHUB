import { useLocation } from "react-router-dom"


const BlogStep1 = () => {
    const state=useLocation();
    console.log("blog state ",state);
  return (
    <div>

         HERE is the blog steps card
         yaha shhurur karoo

    </div>
  )
}

export default BlogStep1