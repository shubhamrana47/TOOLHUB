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
    {
      title: "Set it and forget it safely",
      desc: "Nothing goes live without you. We wait for your actions.",
      icon: "💬",
    },
    {
      title: "Run your store from AI too",
      desc: "On WooCommerce, your AI handles your products, orders, inventory, collections, coupons, customers and many more.",
      icon: "✓",
    },
  ];

  return (
    <div className="bg-white">

      {/* =================================================
          SECTION HEADING
      ================================================= */}

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-5 pt-16 text-center sm:px-8 sm:pt-20 md:pt-24">

        {/* BADGE */}

        <p
          className="
            rounded-full
            bg-blue-600
            px-5
            py-2.5
            text-sm
            font-extrabold
            uppercase
            tracking-[0.2em]
            text-white
            shadow-sm
            sm:px-6
            sm:py-3
            sm:text-base
          "
        >
          CAPABILITIES
        </p>

        {/* MAIN HEADING */}

        <h2
          className="
            mx-auto
            max-w-6xl
            text-4xl
            font-black
            leading-[1.05]
            tracking-[-1.5px]
            text-gray-950
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
            xl:text-[60px]
            xl:tracking-[-3px]
          "
        >
          Everything your site and store need,
          <span className="text-blue-600">
            {" "}powered by AI.
          </span>
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            mx-auto
            max-w-4xl
            text-base
            font-bold
            leading-7
            text-gray-600
            sm:text-lg
            sm:leading-8
            md:text-xl
            md:leading-9
            lg:text-2xl
            lg:leading-10
          "
        >
          280 tools let your own AI turn a single message
          into real, published changes on your live
          WordPress site, WooCommerce or Shopify store.
        </p>

      </div>

      {/* =================================================
          FEATURES GRID
      ================================================= */}

      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 md:py-20">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {features.map((item, index) => (
            <div
              key={index}
              className="
                rounded-3xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-xl
                sm:p-7
                md:p-8
              "
            >

              {/* ICON */}

              <div
                className="
                  mb-5
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-blue-200
                  bg-blue-50
                  text-xl
                  text-blue-600
                "
              >
                {item.icon}
              </div>

              {/* TITLE */}

              <h3
                className="
                  mb-3
                  text-xl
                  font-extrabold
                  leading-7
                  text-gray-900
                  sm:text-2xl
                  sm:leading-8
                "
              >
                {item.title}
              </h3>

              {/* DESCRIPTION */}

              <p
                className="
                  text-sm
                  font-medium
                  leading-7
                  text-gray-500
                  sm:text-base
                  sm:leading-8
                "
              >
                {item.desc}
              </p>

              {/* TAG */}

              {item.tag && (
                <span
                  className="
                    mt-5
                    inline-block
                    rounded-full
                    bg-blue-50
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    text-blue-600
                    sm:text-sm
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
  );
};

export default Section3;