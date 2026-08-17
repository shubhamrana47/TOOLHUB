import { Search, CheckCircle, Lock, UserPlus } from "lucide-react";

const KeywordCTA = () => {
  return (
    <div className="w-[80%] mx-auto mt-8 border border-green-200 rounded-xl bg-gradient-to-r from-green-50 to-white shadow-sm">

      <div className="flex items-center justify-between p-6">

        {/* Left Section */}
        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-xl bg-blue-100 flex items-center justify-center">
            <Search size={45} className="text-blue-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Want to Discover More Keywords?
            </h2>

            <p className="text-gray-600 mt-2 max-w-xl">
              Login or create an account to unlock more keyword ideas,
              competitor keywords and advanced SEO insights.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-6 mt-5 text-sm">

              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={18} />
                <span>Access 1000+ More Keywords</span>
              </div>

              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={18} />
                <span>See Competitor Keywords</span>
              </div>

              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={18} />
                <span>Get Advanced SEO Insights</span>
              </div>

            </div>

          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition">

            <Lock size={18} />

            Login to Continue

          </button>

          <button className="flex items-center gap-2 border border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition">

            <UserPlus size={18} />

            Create Free Account

          </button>

        </div>

      </div>

    </div>
  );
};

export default KeywordCTA;