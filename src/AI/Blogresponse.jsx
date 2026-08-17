
import { useLocation } from 'react-router-dom';

const Blogresponse = () => {

    const location=useLocation();
             const question = location.state?.question || "";
         const  keywords = location.state?.keywords || [];

        console.log("Question:", question);
           console.log("Keywords:", keywords);
       

  return (
    <div>
           
         <div>
             <p>Blog creation step 1 </p>

             {keywords?.length===0?
             <p>No keywords found </p>:
              (
                <div>
                    {keywords.map((item,index)=>{
                        
                        return(
                            <div key={index}>
                                

                          <p>{item.keyword}  </p>
                         </div>

                        )
                         

                        
                    })}
                </div>
              )  }

         </div>


    </div>
  )
}

export default Blogresponse