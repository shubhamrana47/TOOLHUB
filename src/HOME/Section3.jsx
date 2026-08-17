

const Section3 = () => {
    const features = [
  {
    title: "Use the AI you already pay for",
    desc: "Connect Claude, ChatGPT or any MCP-compatible client. wptaskify gives it 280 tools to run your site - you keep using your own AI, so there's no second AI subscription.",
    icon: "💬",
  },
  {
    title: "Never stare at a blank page again",
    desc: "Ask your AI to write a complete, SEO-ready article or product description in your voice - with images and schema - and it publishes straight to your WordPress site or store.",
    tag: "Content · SEO · Images",
    icon: "✎",
  },
  {
    title: "Know why a post isn't ranking – and fix it in a click",
    desc: "The AI SEO Score checks On-Page, Technical, AEO and GEO, then fixes meta, content and broken links automatically.",
    tag: "On-Page · Technical · AEO · GEO",
    icon: "✓",
  },
  {
    title: "Stop hunting for images",
    desc: "Generate realistic, on-topic featured images automatically and set them on your posts - no stock photos or design tools needed.",
    icon: "⊕",
  },
  {title:"set it and forget it safely",
    desc:"Nothing goes live without you . we wait for your actions ",
icon:"💬 "},
{title:"Run your store from ai too",
    desc:"on WOOCOmmerce your ai handles yout products ,orders ,inventory ,collections,coupons ,customers and many more "
 ,icon:"✓"
}
];
  return (
    <div >
          <div className='flex flex-col gap-5 text-center mt-10'>
                <p className="text-white  mx-auto text-center  w-fit p-2 rounded-4xl bg-blue-500">CAPABILITIES</p>
               <p className=" text-5xl font-bold w-2/3 mx-auto ">Everything your site and  store need,<span className='text-blue-500'>powered by ai</span>.</p>
              
              <p className="w-2/5 mx-auto text-black font-semibold">280 tools let your own AI turn a single message into real, published changes on your live WordPress site, WooCommerce or Shopify store.</p>
         
          </div>

          {/* //grid part  */}
              <section className="bg-white p-16">

      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-5">

        {features.map((item,index)=>(
          <div
            key={index}
            className="
              rounded-3xl
              border border-gray-200
              bg-white
              p-7
              shadow-sm
              hover:shadow-xl
              transition
              duration-300
              "
          >

            {/* Icon */}
            <div
              className="
                w-12 h-12
                rounded-xl
                border
                border-orange-300
                bg-orange-50
                flex
                items-center
                justify-center
                text-orange-500
                text-xl
                mb-5
              "
            >
              {item.icon}
            </div>


            {/* Title */}
            <h3 className="
              text-xl
              font-bold
              text-gray-900
              mb-3
            ">
              {item.title}
            </h3>


            {/* Description */}
            <p className="
              text-gray-500
              leading-7
            ">
              {item.desc}
            </p>


            {/* Tag */}
            {item.tag && (
              <span
                className="
                  inline-block
                  mt-5
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-semibold
                  bg-orange-100
                  text-orange-600
                "
              >
                {item.tag}
              </span>
            )}

          </div>
        ))}

      </div>

    </section>


 
    </div>
  )
}

export default Section3