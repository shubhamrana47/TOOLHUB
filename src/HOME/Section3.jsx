const Section3 = () => {
  const features = [
    {
      title: "Access Powerful Tools Instantly",
      desc: "No complicated software or technical setup. Choose your tool, enter your input, and get instant results.",
      tag: "Easy · Fast · Online",
      icon: "💬",
    },
    {
      title: "Create More in Less Time",
      desc: "Generate, edit, convert, optimize, and manage digital content with simple tools designed to save time.",
      tag: "Content · Text · Images",
      icon: "✎",
    },
    {
      title: "Improve Your SEO & Website Performance",
      desc: "Analyze URLs, generate metadata, check performance, optimize content, and improve your online presence.",
      tag: "SEO · Website · Optimization",
      icon: "✓",
    },
    {
      title: "Convert & Manage Your Files",
      desc: "Convert, compress, merge, edit, and manage images, PDFs, documents, and other files without complicated software.",
      tag: "PDF · Images · Converters",
      icon: "⊕",
    },
    {
      title: "Create Without Limits",
      desc: "Generate QR codes, create content, edit images, work with text, and access useful productivity tools.",
      tag: "Creative · Productivity · Utilities",
      icon: "💬",
    },
    {
      title: "One Hub for Every Task",
      desc: "From developers and marketers to students and business owners, ToolsHubs gives you the right tool for every task.",
      tag: "Simple tools · Powerful results",
      icon: "✓",
    },
  ];

  return (
    <div className="bg-white">

      {/* ================= SECTION HEADER ================= */}

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-14 text-center sm:px-6 sm:pt-16 md:pt-20">

        {/* BADGE */}

        <span
          className="
            rounded-full
            bg-blue-600
            px-4
            py-2
            text-xs
            font-extrabold
            uppercase
            tracking-[0.18em]
            text-white
            shadow-sm
            sm:px-5
            sm:text-sm
          "
        >
          CAPABILITIES
        </span>

        {/* HEADING */}

        <h2
          className="
            mt-5
            max-w-4xl
            text-3xl
            font-black
            leading-tight
            tracking-tight
            text-gray-950
            sm:text-4xl
            md:text-5xl
            lg:text-[52px]
          "
        >
          Everything you need.
          <span className="block text-blue-600">
            All the tools in one hub.
          </span>
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            mt-5
            max-w-3xl
            text-sm
            font-medium
            leading-6
            text-gray-600
            sm:text-base
            sm:leading-7
            md:text-lg
            md:leading-8
          "
        >
          ToolsHubs brings together powerful online tools for SEO, images,
          PDFs, text, developers, calculators, converters, and everyday
          digital tasks — all in one place.
        </p>
      </div>

      {/* ================= FEATURES ================= */}

      <section
        className="
          mx-auto
          w-full
          max-w-6xl
          px-5
          py-10
          sm:px-6
          sm:py-12
          md:py-16
        "
      >

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {features.map((item, index) => (
            <article
              key={index}
              className="
                group
                flex
                flex-col
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
                sm:p-6
              "
            >

              {/* TOP ROW */}

              <div className="flex items-center justify-between">

                {/* ICON */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-blue-100
                    bg-blue-50
                    text-lg
                    text-blue-600
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                >
                  {item.icon}
                </div>

                {/* NUMBER */}

                <span
                  className="
                    text-xs
                    font-bold
                    text-gray-300
                  "
                >
                  0{index + 1}
                </span>

              </div>

              {/* TITLE */}

              <h3
                className="
                  mt-4
                  text-lg
                  font-extrabold
                  leading-6
                  text-gray-900
                  sm:text-xl
                  sm:leading-7
                "
              >
                {item.title}
              </h3>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  leading-6
                  text-gray-500
                "
              >
                {item.desc}
              </p>

              {/* TAG */}

              <div className="mt-4">
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-blue-50
                    px-3
                    py-1
                    text-[11px]
                    font-bold
                    text-blue-600
                    sm:text-xs
                  "
                >
                  {item.tag}
                </span>
              </div>

            </article>
          ))}

        </div>

      </section>
    </div>
  );
};

export default Section3;