
const Footer = () => {
  return (
    <div className='flex items-start pt-4 flex-row p-7 bg-white text-black text-[15px]  justify-evenly'>

            <div className=" w-1/4 font-[15px] flex flex-col gap-x-2 font-semibold">
               <span className="text-blue-600 font-bold text-6xl">TASKIFY</span> <br></br> 
                Connect your Wordpress,Woocommerce or shopify and put it on Autopilot -write,optimize,sell or publish automatically 
            </div>





            <div className=" flex flex-col gap-y-3   font-semibold">
                     <p className="text-gray-700">PRODUCT</p>
                      <p>Feature</p>
                       <p>Tool</p>
                        <p>Ai Checker for seo</p>
                         <p>AI Visibility </p>
                          <p>Pricing</p>
                           <p>FAQ</p>

            </div>


            <div className="flex flex-col gap-y-3 font-semibold">
                <p className="text-gray-700">AI SERVICES</p>
                <p>All services</p>
                <p>ai seo services </p>
                <p>wordpress Ai</p>
                <p>Blog</p>
                
            </div>



            <div  className="flex flex-col gap-y-3 font-semibold">
                <p className="text-gray-700">COMPANY</p>
                <p>About </p>
                <p>Community</p>
                <p>Contact </p>
                <p>Reviews</p>
                <p>Terms</p>
                <p>Privacy</p>
            </div>
    </div>
  )
}

export default Footer