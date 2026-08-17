import { Rocket,ShieldCheck,Zap,Headphones } from "lucide-react";

const ToolsBanner = () => {
  const features = [
    {
      icon: Rocket,
      title: "100+ Free Tools",
      description:
        "Powerful tools for SEO, Web, Image, Text, Developer and more.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Reliable",
      description:
        "Your data is safe with us. We never store or share your information.",
    },
    {
      icon: Zap,
      title: "Fast & Easy to Use",
      description:
        "Simple, fast and user-friendly tools to save your time.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "We're here to help you anytime you need.",
    },
  ];

  return (
    <div className="relative min-h-screen w-[30vw] shrink-0 overflow-hidden bg-gradient-to-b from-blue-700 to-blue-600 px-8 py-10 text-white">

      {/* Decorations */}
      <div className="absolute -right-28 top-48 h-72 w-72 rounded-full border-[70px] border-blue-500/30" />

      <div className="absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-blue-800/30" />

      <div className="absolute -bottom-20 -right-24 h-72 w-72 rounded-full bg-blue-800/30" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-[360px]">

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight">
            All the Tools
            <br />
            You Need.
            <br />
            <span className="text-blue-300">
              One Place.
            </span>
          </h1>

          <p className="mt-5 max-w-[280px] text-sm leading-6 text-blue-100">
            ToolHub provides 100+ free online tools to
            make your work faster, easier and smarter.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-10 space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500/70">
                  <Icon size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-1 max-w-[240px] text-xs leading-5 text-blue-100">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
export default ToolsBanner