import { User } from "lucide-react"
import bcrypt from "bcrypt";
export const signup=async (req,res)=>{
    try {
        
          const {name,email,password,confirmPassword}=req.body;
           
          if(!name || !email || !password){
            return res.status(400).json({
                success:false,

                message:"Please fill all the required details"
            })
          }

          if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Both the passwords must be same "
            })
          }
         
          const existingUser=User.findOne({
            email:email.toLowerCase(),
          });
          if(existingUser){
            return res.status(400).json({
              success:false,
              message:"user already exists ",
            })
          }


          //paassword ko hash kra 
           const hashedPassword=await bcrypt.hash(password,10);

          ///creating userrrr
        
          const user=User.create({
            name:name,
            email:email,
            password:hashedPassword,
          })
         

       return res.status(201).json({
      success: true,
      message: "Signup successful. Please login.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    } catch (error) {
        console.log("error aagay bhai ",);
        console.error(error);
        return res.json({
          success:false,
          message:"problem occured during signup"
        })
    }
}

