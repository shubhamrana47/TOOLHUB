import  { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";
import NAVBAR from "../HOME/NAVBAR";
import Footer from "../HOME/Footer";

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      button: "Get Started",
      popular: false,
      features: [
        { text: "5 keyword searches / month", included: true },
        { text: "Basic SEO keyword data", included: true },
        { text: "2 AI generated blogs / month", included: true },
        { text: "Basic website audit", included: true },
        { text: "Advanced SEO insights", included: false },
        { text: "Priority support", included: false },
      ],
    },

    {
      name: "Pro",
      description: "For creators and growing websites",
      monthlyPrice: 499,
      yearlyPrice: 399,
      button: "Start Pro",
      popular: true,
      features: [
        { text: "100 keyword searches / month", included: true },
        { text: "Advanced SEO keyword data", included: true },
        { text: "20 AI generated blogs / month", included: true },
        { text: "Advanced website audit", included: true },
        { text: "SEO recommendations", included: true },
        { text: "Priority support", included: true },
      ],
    },

    {
      name: "Business",
      description: "For agencies and businesses",
      monthlyPrice: 999,
      yearlyPrice: 799,
      button: "Choose Business",
      popular: false,
      features: [
        { text: "Unlimited keyword searches", included: true },
        { text: "Advanced SEO keyword data", included: true },
        { text: "Unlimited AI generated blogs", included: true },
        { text: "Complete website audit", included: true },
        { text: "Advanced SEO recommendations", included: true },
        { text: "Priority support", included: true },
      ],
    },
  ];

  return (
    <div>  
        


         <section className="min-h-screen bg-white px-4 py-20 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">

        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
          <Sparkles size={16} />
          Simple & Transparent Pricing
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
  Choose the plan that{" "}
  <div className="text-blue-600">works for you</div>
</h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Powerful SEO tools, AI content generation and website auditing
          designed to help you grow faster.
        </p>

      </div>

      {/* Billing Toggle */}
      <div className="mt-10 flex justify-center">

        <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 p-1">

          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              billing === "monthly"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              billing === "yearly"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-500"
            }`}
          >
            Yearly
            <span className="ml-2 text-xs">
              Save 20%
            </span>
          </button>

        </div>

      </div>

      {/* Pricing Cards */}
      <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-3">

        {plans.map((plan) => {

          const price =
            billing === "monthly"
              ? plan.monthlyPrice
              : plan.yearlyPrice;

          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "border-blue-600 shadow-lg shadow-blue-100"
                  : "border-gray-200 shadow-sm"
              }`}
            >

              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h2>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                  {plan.description}
                </p>

              </div>

              {/* Price */}
              <div className="mt-8">

                <div className="flex items-end gap-1">

                  <span className="text-5xl font-bold text-gray-900">
                    ₹{price}
                  </span>

                  {price !== 0 && (
                    <span className="mb-2 text-sm text-gray-500">
                      /month
                    </span>
                  )}

                </div>

                {billing === "yearly" && price !== 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    Billed annually
                  </p>
                )}

              </div>

              {/* CTA */}
              <button
                className={`mt-8 w-full rounded-xl px-5 py-3.5 font-semibold transition ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
                }`}
              >
                {plan.button}
              </button>

              {/* Divider */}
              <div className="my-8 border-t border-gray-100" />

              {/* Features */}
              <div className="flex-1">

                <p className="mb-5 text-sm font-semibold text-gray-900">
                  What's included:
                </p>

                <ul className="space-y-4">

                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >

                      {feature.included ? (
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Check size={13} strokeWidth={3} />
                        </span>
                      ) : (
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                          <X size={13} />
                        </span>
                      )}

                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {feature.text}
                      </span>

                    </li>
                  ))}

                </ul>

              </div>

            </div>
          );
        })}

      </div>

      {/* Bottom Text */}
      <div className="mx-auto mt-14 max-w-2xl text-center">

        <p className="text-sm text-gray-500">
          All plans include secure access, regular updates and no hidden
          charges. Upgrade or cancel your plan whenever you want.
        </p>

      </div>

    </section>
        
    </div>
   
  );
};

export default Pricing;