

const cta = {
  title: "Ready to connect your site or store?",
  description:
    "Connect WordPress with the free plugin or Shopify with a store token, link your Claude, ChatGPT or any MCP client, and ship your first AI change today. Free to start, no credit card required.",
  button: "Connect Free",
};

const Howitworkscard = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-white shadow-xl p-12 text-center">

          {/* Decorative Blur */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {cta.title}
            </h2>

            <p className="mt-6 max-w-4xl mx-auto text-lg text-gray-600 leading-8">
              {cta.description}
            </p>

            <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg transition">
              {cta.button}
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Howitworkscard;