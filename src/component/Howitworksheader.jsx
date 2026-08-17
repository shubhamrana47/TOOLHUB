
import {
  Plug,
  Link,
  Send,
  Check,
} from "lucide-react";

const Howitworksheader = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Content */}
          <div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-black">
              How to connect
              <br />
              your site to
              <br />
              <span className="text-blue-500">
                Claude or
              </span>
              <br />
              <span className="text-blue-500">
                ChatGPT
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-600 leading-9 max-w-xl">
              Connect your WordPress, WooCommerce or Shopify site,
              add the MCP link to your own Claude, ChatGPT or any
              MCP client, then just ask — in under five minutes,
              no code.
            </p>

            <p className="mt-3 text-blue-500 font-semibold text-xl">
              Free to start.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <button className="bg-blue-400 hover:bg-blue-600 transition text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg">
                Connect my site free
              </button>

              <button className="border border-gray-300 hover:border-blue-500 transition px-8 py-4 rounded-xl text-lg font-semibold">
                See the 3 steps
              </button>

            </div>

          </div>

          {/* Right Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8">

            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>

              <p className="text-lg font-medium text-gray-700">
                Signup to first AI change
              </p>
            </div>

            {/* Step 1 */}
            <Step
              number="1"
              icon={<Plug size={24} />}
              title="Connect your site or store"
              subtitle="Free plugin or Shopify token"
            />

            {/* Line */}
            <div className="w-1 h-10 bg-blue-400 mx-8"></div>

            {/* Step 2 */}
            <Step
              number="2"
              icon={<Link size={24} />}
              title="Connect your AI"
              subtitle="Claude, ChatGPT or any MCP client"
            />

            {/* Line */}
            <div className="w-1 h-10 bg-blue-400 mx-8"></div>

            {/* Step 3 */}
            <Step
              number="3"
              icon={<Send size={24} />}
              title="Just ask - you're ready"
              subtitle="Plain English, all zero setup"
            />

            <div className="flex items-center gap-3 mt-8 text-gray-600">
              <Check className="text-green-500" />
              <span className="text-lg">
                All inside the AI you already pay for
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

const Step = ({ number, icon, title, subtitle }) => {
  return (
    <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-5 hover:shadow-md transition">

      <div className="w-12 h-12 bg-blue-500 rounded-xl text-white font-bold text-xl flex items-center justify-center">
        {number}
      </div>

      <div className="w-12 h-12 rounded-xl bg-orange-50 text-blue-500 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-xl text-gray-900">
          {title}
        </h3>

        <p className="text-gray-500 mt-1">
          {subtitle}
        </p>
      </div>

    </div>
  );
};

export default Howitworksheader;