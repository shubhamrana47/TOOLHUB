
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Features from "./component/Features";

import HomePage from "./pages/HomePage";
import GEMINIRESPONSE from "./AI/GEMINIRESPONSE";
import Howitworks from "./pages/Howitworks";
import Blog from "./pages/Blog";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Review from "./pages/Review";
import Pricing from "./component/Pricing";
import ProtectedRoute from "./ProtectedRoute";
import Blogdisplay from "./pages/Blogdisplay";
import Dashboard from "./component/Dashboard";
import Dashboardpage from "./pages/Dashboardpage";
import Websiteauditpage from "./pages/Websiteauditpage";
import ImageConverter from "./component/ImageConvertor";
import ImageConvertorPage from "./pages/ImageConvertorPage";
import DocumentConvertorPage from "./pages/DocumentConvertorPage";
import CodeFormatter from "./component/CodeFormatter";
import CodeFormatterPage from "./pages/CodeFormatterPage";
import Pluginpage from "./pages/Pluginpage";
function App() {
  return (
    <div className="w-full h-full">
      <Routes> 
        <Route path="/" 
         element={<HomePage/>}
        ></Route>
          <Route path="/howitworks" 
          element={<Howitworks/>}></Route>
          <Route path="/blogdisplay"
             element={
             
                   <Blogdisplay/>
            
            }></Route>
            
            <Route 
             path="/blog" element={
              <ProtectedRoute>
                <Blog/>
              </ProtectedRoute>
             }
            ></Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}></Route>  
           <Route path="/dashboard" element={<Dashboardpage/>}></Route>
           
         <Route path="/forgot-password" element={<ForgotPassword/>}/>
           <Route path="/reset-password" element={<ResetPassword/>}/>


            
            <Route path="/geminiResponse" 
            element={
            <ProtectedRoute>
           <GEMINIRESPONSE/>
            </ProtectedRoute>
}/>

           <Route path="/wpplugin" element={<ProtectedRoute>
            <Pluginpage/>
           </ProtectedRoute>}>

           </Route>


           <Route  path="/websiteaudit" element={<ProtectedRoute>
            <Websiteauditpage/>
           </ProtectedRoute>}></Route>

          <Route path="/features" element={<Features/>}></Route>
            
            <Route path="/blogdisplay" element={<Blogdisplay/>}></Route>
            

          <Route path="/imageconvertor" element={<ImageConvertorPage/>}></Route>
           
           <Route path="/documentconvertor" element={<DocumentConvertorPage/>} ></Route>

           <Route path="/codeformatter" element={<CodeFormatterPage/>}></Route>
          <Route path="/review"
          element={<ProtectedRoute>
                <Review/>
          </ProtectedRoute>
           } ></Route>
         <Route path="/pricing" element={<Pricing/>}></Route>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />


    </div>
    
  )

}

export default App;
