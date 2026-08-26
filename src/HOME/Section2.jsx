import { motion } from "framer-motion";
import {
  Globe,
  PackagePlus,
  SearchCheck,
  ExternalLink,
  Image,
  Bot,
  Brain,
  BookOpen,
} from "lucide-react";

const Section2 = () => {
  const elements = [
    { title: "GEO", icon: Globe },
    { title: "Create Product", icon: PackagePlus },
    { title: "Update SEO", icon: SearchCheck },
    { title: "Create Redirect", icon: ExternalLink },
    { title: "Set Image", icon: Image },
    { title: "Set AI", icon: Bot },
    { title: "Set ML", icon: Brain },
    { title: "Learn WordPress", icon: BookOpen },
  ];

  return (
    <section className="w-full overflow-hidden bg-white py-12">

      {/* =========================
          SECTION HEADING
      ========================= */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-8 text-center"
      >
        <motion.p
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            text-xs font-bold uppercase
            tracking-[0.35em]
            text-blue-600
          "
        >
          {/* Powerful Features */}
        </motion.p>

        {/* <h2
  className="
    mt-3 mx-auto
    max-w-[1000px]
    text-4xl md:text-7xl
    font-black
    tracking-[-0.04em]
    text-gray-950
  "
>
  Everything You Need{" "}
  <span
    className="
      bg-gradient-to-r
      from-blue-700
      via-blue-500
      to-blue-800
      bg-clip-text
      text-transparent
    "
  >
    In One Place
  </span>
</h2> */}

        {/* <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
          Powerful AI and SEO tools designed to make your workflow
          faster, smarter and easier.
        </p> */}
      </motion.div>

      {/* =========================
          SLIDER
      ========================= */}
      <div
        className="
          relative mx-auto w-[92%]
          overflow-hidden
          rounded-[2rem]
          border border-blue-100
          bg-gradient-to-r
          from-blue-50
          via-white
          to-blue-50
          py-6
          shadow-[0_10px_40px_rgba(37,99,235,0.08)]
          md:w-[88%]
        "
      >

        {/* LEFT GLOW */}
        <div
          className="
            pointer-events-none
            absolute left-0 top-0 z-20
            h-full w-24
            bg-gradient-to-r
            from-blue-50
            via-blue-50/80
            to-transparent
          "
        />

        {/* RIGHT GLOW */}
        <div
          className="
            pointer-events-none
            absolute right-0 top-0 z-20
            h-full w-24
            bg-gradient-to-l
            from-blue-50
            via-blue-50/80
            to-transparent
          "
        />

        {/* =========================
            MOVING TRACK
        ========================= */}
        <motion.div
          className="flex w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        >

          {/* FIRST SET */}
          <div className="flex shrink-0 items-center gap-5 pr-5">

            {elements.map((element, index) => {
              const Icon = element.icon;

              return (
                <motion.div
                  key={`first-${index}`}
                  whileHover={{
                    scale: 1.08,
                    y: -5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="
                    group relative
                    flex items-center gap-3
                    overflow-hidden
                    rounded-2xl
                    border border-blue-100
                    bg-white
                    px-7 py-4
                    shadow-sm
                    transition-all duration-500
                    hover:border-blue-300
                    hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)]
                  "
                >

                  {/* SHIMMER */}
                  <motion.div
                    animate={{
                      x: ["-150%", "150%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "linear",
                    }}
                    className="
                      pointer-events-none
                      absolute inset-0
                      w-1/3
                      skew-x-12
                      bg-gradient-to-r
                      from-transparent
                      via-blue-100/40
                      to-transparent
                    "
                  />

                  {/* ICON */}
                  <motion.div
                    animate={{
                      y: [0, -2, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.15,
                    }}
                    className="
                      relative z-10
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      transition-all duration-300
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >
                    <Icon size={19} strokeWidth={2.2} />
                  </motion.div>

                  {/* TEXT */}
                  <motion.span
                    whileHover={{
                      letterSpacing: "0.12em",
                    }}
                    className="
                      relative z-10
                      whitespace-nowrap
                      text-sm
                      font-extrabold
                      uppercase
                      tracking-[0.08em]
                      text-gray-700
                      transition-all
                      duration-300
                      group-hover:text-blue-600
                      md:text-base
                    "
                  >
                    {element.title}
                  </motion.span>

                  {/* DOT */}
                  <motion.span
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="
                      relative z-10
                      h-1.5 w-1.5
                      rounded-full
                      bg-blue-500
                    "
                  />
                </motion.div>
              );
            })}

          </div>

          {/* =========================
              DUPLICATE SET
          ========================= */}
          <div className="flex shrink-0 items-center gap-5 pr-5">

            {elements.map((element, index) => {
              const Icon = element.icon;

              return (
                <motion.div
                  key={`second-${index}`}
                  whileHover={{
                    scale: 1.08,
                    y: -5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="
                    group relative
                    flex items-center gap-3
                    overflow-hidden
                    rounded-2xl
                    border border-blue-100
                    bg-white
                    px-7 py-4
                    shadow-sm
                    transition-all duration-500
                    hover:border-blue-300
                    hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)]
                  "
                >

                  {/* SHIMMER */}
                  <motion.div
                    animate={{
                      x: ["-150%", "150%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "linear",
                    }}
                    className="
                      pointer-events-none
                      absolute inset-0
                      w-1/3
                      skew-x-12
                      bg-gradient-to-r
                      from-transparent
                      via-blue-100/40
                      to-transparent
                    "
                  />

                  {/* ICON */}
                  <motion.div
                    animate={{
                      y: [0, -2, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.15,
                    }}
                    className="
                      relative z-10
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      transition-all duration-300
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >
                    <Icon size={19} strokeWidth={2.2} />
                  </motion.div>

                  {/* TEXT */}
                  <span
                    className="
                      relative z-10
                      whitespace-nowrap
                      text-sm
                      font-extrabold
                      uppercase
                      tracking-[0.08em]
                      text-gray-700
                      transition-all
                      duration-300
                      group-hover:text-blue-600
                      md:text-base
                    "
                  >
                    {element.title}
                  </span>

                  {/* DOT */}
                  <motion.span
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="
                      relative z-10
                      h-1.5 w-1.5
                      rounded-full
                      bg-blue-500
                    "
                  />

                </motion.div>
              );
            })}

          </div>

        </motion.div>
      </div>

      {/* =========================
          BOTTOM TEXT
      ========================= */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="
          mt-6 text-center
          text-xs font-medium
          tracking-wide
          text-gray-400
        "
      >
        Explore powerful tools designed to improve your workflow
      </motion.p>

    </section>
  );
};

export default Section2;