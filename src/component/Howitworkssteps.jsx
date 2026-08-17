import React from "react";
import {
  Plug,
  Link,
  Send,
  Check,
} from "lucide-react";

const cards = [
  {
    id: 1,
    icon: Plug,
    title: "Connect your site or store",
    description:
      "For WordPress and WooCommerce install the plugin and connect your website. For Shopify, paste your domain and access token securely.",
    points: [
      "Works with WordPress, WooCommerce & Shopify",
      "About two minutes, no code",
      "Disconnect anytime",
    ],
  },
  {
    id: 2,
    icon: Link,
    title: "Connect your own AI",
    description:
      "Add the MCP connector inside Claude, ChatGPT or any compatible AI client. Your tools instantly appear inside your AI.",
    points: [
      "One MCP link works everywhere",
      "Bring your own AI account",
      "Nothing else to install",
    ],
  },
  {
    id: 3,
    icon: Send,
    title: "Just ask — you approve",
    description:
      "Tell the AI what you need in plain English. Review the changes before anything goes live.",
    points: [
      "Plain-English instructions",
      "Nothing publishes without approval",
      "Automatic backup before edits",
    ],
  },
];

const Howitworkssteps = () => {
  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-4xl mx-auto">

          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            Three steps to run
            <br />
            WordPress
            <span className="text-blue-600">
              {" "}from your own AI
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-500">
            Connect your site, connect your AI, then just ask —
            everything runs inside the AI you already use.
          </p>

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className="bg-white border border-gray-200 rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
              >
                {/* Top Icons */}

                <div className="flex items-center gap-3 mb-8">

                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    {card.id}
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Icon size={22} />
                  </div>

                </div>

                {/* Title */}

                <h3 className="text-2xl font-bold text-gray-900">
                  {card.title}
                </h3>

                {/* Description */}

                <p className="mt-5 text-gray-600 leading-8">
                  {card.description}
                </p>

                {/* Features */}

                <div className="mt-8 space-y-4">

                  {card.points.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>

                      <div className="flex items-center gap-2">
                        <Check
                          size={18}
                          className="text-green-500"
                        />

                        <p className="text-gray-700">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Howitworkssteps;