import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGeminiSearch from "../hooks/useGeminiSearch";
import { useLocation } from "react-router-dom";
import bgImage from "../assets/bg-blog.jpg";
const Blogintro = () => {
   //const[loading,setLoading]=useState(false);
  //  const[question,setQuestion]=useState("");
      const location = useLocation();

const isBlogPage = location.pathname === "/blog";   


     const{question,loading,setQuestion,
      handleSubmit:searchKeywords,}=useGeminiSearch(); 

    const navigate =useNavigate();
    async  function handleSubmit(){
      const keywords =await searchKeywords();
        
      if(!keywords){
        return;
      }
        navigate("/blog", {
          state:{
            question,
            keywords:keywords,
          }
        });
    }

  return (
    <div   className={` px-6 py-10 min-h-fit  bg-gradient-to-r from-slate-300 to-slate-500 
  ${
    isBlogPage
      ? "bg-cover bg-center   "
      : "bg-white"
  }`}
  style={
    isBlogPage
      ? {
 }
      : {}
  }>
      <p className="text-black w-fit  font-bold text-5xl text-centr mx-auto ">Create a blog with us </p>

          <div className="mt-8 flex flex-col w-[60%] p-4 mx-auto gap-4 md:flex-row">

              <div className="flex flex-1 items-center bg-white rounded-xl border border-gray-300 px-4">
                <Search className="text-gray-400" size={20} />

                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  placeholder="Enter blog title..."
                  className="w-full px-3 py-4 outline-none bg-white "
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`rounded-xl px-8 py-4 font-semibold text-white transition ${
                  loading
                    ? "cursor-not-allowed bg-gray-500"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Searching..." : "Search Now →"}
              </button>

            </div>


    </div>
  )
}

export default Blogintro