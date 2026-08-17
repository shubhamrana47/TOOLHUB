
import {
  Sparkles,
  Rocket,
  ShieldCheck,
  WandSparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import heroImage from "../assets/hero-image - Copy.png";

const benefits = [
  {
    icon: Rocket,
    title: "Fast & Accurate",
    description: "Get quick results you can trust",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "Your data is safe with us",
  },
  {
    icon: WandSparkles,
    title: "Easy to Use",
    description: "Simple interface for everyone",
  },
  {
    icon: CheckCircle2,
    title: "100% Free",
    description: "All tools are free forever",
  },
];

const ToolsHero = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        border-b
        border-blue-100
      "
    >
      {/* Background gradients */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.10),transparent_35%),radial-gradient(circle_at_80%_50%,rgba(99,102,241,0.10),transparent_35%)]
        "
      />

      {/* Main Container */}
      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          items-center
          gap-10
          px-5
          py-14
          sm:px-8
          md:py-20
          lg:grid-cols-2
          lg:gap-8
          lg:px-8
        "
      >
        {/* ================= LEFT CONTENT ================= */}
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-6">
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-200
                bg-blue-50
                px-4
                py-2
                text-sm
                font-semibold
                text-blue-700
              "
            >
              <Sparkles size={16} />
              All-in-One Online Tools
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              text-4xl
              font-bold
              leading-[1.05]
              tracking-tight
              text-[#101828]
              sm:text-5xl
              md:text-6xl
              lg:text-[60px]
            "
          >
            Smart Tools for
            <span className="block text-blue-600">
              Every Need
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-6
              max-w-xl
              text-base
              leading-7
              text-gray-600
              sm:text-lg
            "
          >
            Powerful, easy-to-use, and completely free tools
            to optimize your website, manage your tasks,
            and simplify your daily work.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-blue-600
                px-6
                py-3.5
                font-semibold
                text-white
                shadow-lg
                shadow-blue-600/20
                transition
                hover:bg-blue-700
                hover:shadow-xl
              "
            >
              Explore Tools
              <ArrowRight size={18} />
            </button>

            <button
              className="
                rounded-xl
                border
                border-blue-200
                bg-white
                px-6
                py-3.5
                font-semibold
                text-blue-600
                transition
                hover:bg-blue-50
              "
            >
              View All Tools
            </button>
          </div>

          {/* Benefits */}
          
          <div
            className=" hidden
              mt-10
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
            "
          >
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                    "
                  >
                    <Icon size={21} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="relative flex items-center justify-center">
          {/* Glow behind image */}
          <div
            className="
              absolute
              h-[350px]
              w-[350px]
              rounded-full
              bg-blue-200/30
              blur-3xl
              sm:h-[450px]
              sm:w-[450px]
            "
          />

          {/* Hero Image */}
          <img
            src={heroImage}
            alt="All-in-one online tools"
            className="
              relative
              z-10
              w-full
              max-w-[650px]
              object-contain
              drop-shadow-[0_20px_50px_rgba(37,99,235,0.12)]
            "
          />
        </div>
      </div>
    </section>
  );
};

export default ToolsHero;