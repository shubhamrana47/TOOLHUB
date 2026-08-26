import { motion } from "framer-motion";
import {
  Plug,
  Bot,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

const data = [
  {
    title: "Choose Your Tool",
    desc: "Explore our collection of powerful online tools for SEO, images, PDFs, text, developers, calculators, converters, and much more.",
    icon: Plug,
  },
  {
    title: "Enter your input",
    desc: "Simply upload your file, paste your text, enter a URL, or provide the information required by the tool.",
    icon: Bot,
  },
  {
    title: " Get Instant Results",
    desc: "Our tools process your request and deliver results within seconds Download, copy, convert, optimize, generate, or use your result instantly — all in one place.",
    icon: MessageCircle,
  },
];

const Howitworksintro = () => {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 md:px-10 lg:px-16">


      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-blue-100/30 blur-3xl" />


      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex justify-center"
        >
          <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>

            Live in 3 minutes
          </div>
        </motion.div>

        {/* Heading */}

        <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
          HOW IT{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
            WORKS
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 md:text-lg">
           No complicated setup. No coding required.
         <div className="font-semibold text-gray-700">
            {" "}Choose a tool, enter your details, and get results instantly. 
          </div>
        </p>
      </motion.div>


      <div className="relative z-10 mx-auto mt-16 max-w-6xl">

        <div className="grid gap-7 md:grid-cols-3">

          {data.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative"
              >


                <div
                  className="
                    relative h-full
                    overflow-hidden
                    rounded-[2rem]
                    border border-gray-100
                    bg-white
                    p-7
                    shadow-[0_10px_35px_rgba(15,23,42,0.05)]
                    transition-all duration-500
                    hover:border-blue-200
                    hover:shadow-[0_20px_55px_rgba(37,99,235,0.12)]
                  "
                >

                  
                  <div
                    className="
                      absolute -right-20 -top-20
                      h-40 w-40
                      rounded-full
                      bg-blue-100/50
                      blur-3xl
                      transition-all duration-500
                      group-hover:bg-blue-200/60
                    "
                  />


                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="
                      relative
                      flex h-14 w-14
                      items-center justify-center
                      rounded-2xl
                      bg-blue-50
                      text-blue-600
                      transition-all duration-500
                      group-hover:bg-blue-600
                      group-hover:text-white
                      group-hover:shadow-lg
                      group-hover:shadow-blue-200
                    "
                  >
                    <Icon size={27} strokeWidth={1.8} />
                  </motion.div>


                  <h3
                    className="
                      relative mt-7
                      text-xl
                      font-extrabold
                      tracking-tight
                      text-gray-900
                      transition-colors duration-300
                      group-hover:text-blue-600
                    "
                  >
                    {item.title}
                  </h3>

                

                  <p className="relative mt-4 text-sm leading-7 text-gray-500">
                    {item.desc}
                  </p>

                 

                  <div
                    className="
                      relative mt-7
                      flex items-center
                      gap-2
                      text-sm
                      font-bold
                      text-blue-600
                    "
                  >
                    Explore tool

                    <motion.div
                      initial={{ x: 0, y: 0 }}
                      whileHover={{
                        x: 3,
                        y: -3,
                      }}
                    >
                      <ArrowUpRight size={17} />
                    </motion.div>
                  </div>

                
                  <div
                    className="
                      pointer-events-none
                      absolute inset-0
                      rounded-[2rem]
                      border-2
                      border-transparent
                      transition-all duration-500
                      group-hover:border-blue-100
                    "
                  />

                </div>
              </motion.div>
            );
          })}

        </div>
      </div>


      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-12 text-center text-sm font-medium tracking-wide text-gray-400"
      >
        Simple tools. Powerful automation. Your workflow.
      </motion.p>

    </section>
  );
};

export default Howitworksintro;