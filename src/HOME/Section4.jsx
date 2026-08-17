import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

const Section4 = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const data = [
    {
      question: "Is it safe to give AI access to my live site?",
      answer:
        "Yes. wptaskify keeps you in control: nothing publishes or changes without your approval, an automatic backup runs before any file edit, code is PHP syntax-checked before saving, and your credentials are encrypted with AES-256 with every account fully isolated. For safety, order tools are read-and-update only - the AI can't delete orders or customer data.",
    },
    {
      question: "Which AI does wptaskify use - do I need my own?",
      answer:
        "You bring your own AI. Connect Claude Desktop, ChatGPT or any MCP-compatible client to wptaskify's MCP server and it can use all 280 tools on your site from your own AI chat. You pay for your AI directly - wptaskify only charges for the tools and the server, so there's no second AI subscription from us.",
    },
    {
      question: "Is there a free plan?",
      answer:
        "You can start with the tools available in your plan and upgrade whenever you need additional capabilities. Your existing AI subscription remains separate from wptaskify.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 md:px-10 lg:px-16">

      {/* =========================
          BACKGROUND EFFECTS
      ========================= */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

      {/* =========================
          HEADER
      ========================= */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >

        {/* Small badge */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex justify-center"
        >
          <div className="rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-semibold tracking-wide text-blue-600">
            Your Questions Answered
          </div>
        </motion.div>

        {/* Heading */}

        <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 md:text-lg">
          Everything you need to know about wptaskify, AI access,
          security and how the platform works.
        </p>

      </motion.div>

      {/* =========================
          FAQ CONTAINER
      ========================= */}

      <div className="relative z-10 mx-auto mt-14 max-w-3xl">

        <div className="flex flex-col gap-4">

          {data.map((element, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 25,
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
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className={`
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "border-blue-200 bg-blue-50/40 shadow-[0_10px_35px_rgba(37,99,235,0.08)]"
                      : "border-gray-100 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.04)] hover:border-blue-100 hover:shadow-[0_10px_30px_rgba(37,99,235,0.08)]"
                  }
                `}
              >

                {/* =========================
                    QUESTION
                ========================= */}

                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center gap-5 px-5 py-5 text-left md:px-7"
                >

                  {/* Number */}

                  <div
                    className={`
                      flex h-10 w-10
                      shrink-0
                      items-center justify-center
                      rounded-xl
                      text-sm font-bold
                      transition-all duration-300
                      ${
                        isOpen
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Question */}

                  <span
                    className={`
                      flex-1
                      text-base
                      font-bold
                      leading-6
                      transition-colors duration-300
                      md:text-lg
                      ${
                        isOpen
                          ? "text-blue-600"
                          : "text-gray-800 group-hover:text-blue-600"
                      }
                    `}
                  >
                    {element.question}
                  </span>

                  {/* Icon */}

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className={`
                      flex h-9 w-9
                      shrink-0
                      items-center justify-center
                      rounded-full
                      transition-all duration-300
                      ${
                        isOpen
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                      }
                    `}
                  >
                    {isOpen ? (
                      <X size={17} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </motion.div>

                </button>

                {/* =========================
                    ANSWER
                ========================= */}

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="border-t border-blue-100 px-5 pb-6 pt-5 md:px-7">

                        <div className="flex gap-4">

                          {/* Blue line */}

                          <div className="w-1 shrink-0 rounded-full bg-blue-500" />

                          {/* Answer */}

                          <p className="text-sm leading-7 text-gray-600 md:text-base">
                            {element.answer}
                          </p>

                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}

        </div>

      </div>

      {/* =========================
          BOTTOM TEXT
      ========================= */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-10 text-center"
      >
        <p className="text-sm text-gray-400">
          Still have questions? We're here to help.
        </p>
      </motion.div>

    </section>
  );
};

export default Section4;