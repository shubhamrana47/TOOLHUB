import {motion} from "framer-motion"

const Section1 = () => {
        const steps = [
  {
    title: "You ask your AI",
    desc: '"write an SEO post about ebikes and publish it"',
    icon: "▢",
    color: "bg-orange-500/20 text-orange-400",
    border: "border-orange-500",
  },
  {
    title: "280 tools run",
    desc: "research · write · images · schema · SEO",
    icon: "✦",
    color: "bg-yellow-500/20 text-yellow-400",
  },
  {
    title: "Published to your site",
    desc: "with image, schema & meta · live",
    icon: "✓",
    color: "bg-green-500/20 text-green-400",
  },
];
  return (
    <div>
          <div className="flex flex-row justify-between ">

          {/* left  */}
          <div className=" flex flex-col gap-7 w-[50%] p-14">
             
             <div className="font-extrabold text-6xl"> Run your WORDPRESS site or run <span className="text-blue-600">from your own </span>  AI-Claude or Chatgpt</div>
             <div className="text-2xl ">Connect Claude, ChatGPT or any MCP client to your WordPress, WooCommerce or Shopify site and it can write, optimize, sell and publish for you - through 280 real tools. You bring your own AI, so there's no extra AI subscription from us. From ₹499/mo</div>
            
            
             <div className="flex gap-2">

                <button className="p-2 text-white bg-blue-600 rounded-sm hover:bg-white hover:text-black hover:border">
                    Connect my site free
                    </button>
                    
                    
                    <button className="p-2 text-black bg-white font-semibold rounded-sm hover:bg-white hover:text-black hover:border"> 
                        See how it works 
                    </button>
             </div>
           

          </div>



          {/* right */}


          
          <div className="border-b-gray-600   ">

           

    <div className="min-h-screen  flex items-center justify-center rounded-2xl p-2 mr-12 mt-20">

      <div className="w-[520px] z-10 rounded-3xl border border-gray-800  p-7 shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

          <p className="ml-3 text-gray-400 text-sm">
          </p>
        </div>


        {steps.map((step, index) => (
          <div key={index}>

            {/* Card */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.8,
                duration: 0.5
              }}

              className={`
                flex items-center gap-5
                rounded-2xl
                border
                ${step.border || "border-gray-800"}
                
                p-5
              `}
            >

              <div
                className={`
                  w-12 h-12
                  rounded-xl
                  flex items-center justify-center
                  text-xl
                  ${step.color}
                `}
              >
                {step.icon}
              </div>


              <div>
                <h3 className="text-black font-semibold text-lg">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {step.desc}
                </p>
              </div>

            </motion.div>


            
            {index !== steps.length - 1 && (
              <motion.div
                initial={{height:0}}
                animate={{height:45}}
                transition={{
                  delay:index * 0.8 + 0.5,
                  duration:0.4
                }}
                className="
                  w-0.5
                  bg-orange-500
                  ml-9
                  my-2
                "
              />
            )}

          </div>
        ))}

      </div>

        <div className="
    absolute
    w-36 h-36
    bg-orange-300
    rounded-full
    blur-3xl
  "></div>


    </div>
  



 
             {/* <div className="flex flex-col gap-2">
                   <p>You ask your AI</p>
                   <p>"write an SEO post about ebikes and publish it"</p>
             </div>

             <div className="flex flex-col gap-2">
                <p className="font-semibold">280 tools run</p>
                <p>research · write · images · schema · SEO</p>
             </div>


             <div className="flex flex-col gap-2">
                <p className="font-semibold">Published to your site</p>
                <p>with image, schema & meta - live</p>
             </div>
             */}
          </div>

          </div>

    </div>
  )
}

export default Section1