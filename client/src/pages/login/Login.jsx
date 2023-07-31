import { useNavigate } from "react-router-dom"
import newRequest from "../../../utils/newRequest.js"
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from 'jwt-decode'
const Login = () => {
  

  const navigate = useNavigate()

  
  const handleGoogleLogin = async(response) => {
    try {
      const decodedResponse = jwt_decode(response.credential);
      console.log(decodedResponse)
      const { email, given_name, family_name, picture } = decodedResponse;
      const res = await newRequest.post("auth/google-login", {
        username: given_name + ' ' + (family_name || ""),
        email: email,
        profileImg: picture

      })
      localStorage.setItem("currentUser", JSON.stringify(res.data))
      navigate("/")
    } catch (error) {
      console.error('Error decoding credentialResponse:', error);
    }



  };

  return (
    <div className=" flex w-full p-6 min-h-[500px] h-screen justify-center items-center">
      <form className="flex py-8 px-6 lg:px-8 max-w-[400px] w-full h-fit rounded-lg border-[1px] border-gray-300 shadow-sm hover:shadow-xl flex-col gap-2 justify-center items-center transition-all ease-in-out duration-200">
        <img src="/assets/CollegeBuzz.png" alt="" />
        <div>
          <h1 className=" text-lg lg:text-xl font-semibold text-blue-600">Continue with Google</h1>
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            alert('Login Failed');
          }}
        />
      
      </form>
    </div>
  )
}

export default Login