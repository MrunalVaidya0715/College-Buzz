import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../utils/newRequest.js";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    try {
      const decodedResponse = jwt_decode(response.credential);
      const { email, given_name, family_name, picture, exp } = decodedResponse;
      const res = await newRequest.post("auth/google-login", {
        username: given_name + " " + (family_name || ""),
        email: email,
        profileImg: picture,
        exp: exp,
      });

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // Schedule the token expiration handling
      scheduleTokenExpiry(exp);

      navigate("/");
    } catch (error) {
      console.error("Error decoding credentialResponse:", error);
    }
  };

  const scheduleTokenExpiry = (exp) => {
    const currentTime = Math.floor(Date.now()); 
    const remainingTime = exp - currentTime;
    

    if (remainingTime > 0) {

      setTimeout(() => {
        localStorage.setItem("currentUser",null);
      }, remainingTime);
    }
  };

  useEffect(() => {
    // Check if there's a currentUser in localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.exp) {
      scheduleTokenExpiry(currentUser.exp);
    }
  }, []);

  return (
    <div className=" flex w-full p-6 min-h-[500px] h-screen justify-center items-center">
      <form className="flex py-8 px-6 lg:px-8 max-w-[400px] w-full h-fit rounded-lg border-[1px] border-gray-300 shadow-sm hover:shadow-xl flex-col gap-2 justify-center items-center transition-all ease-in-out duration-200">
        <img src="/assets/CollegeBuzz.png" alt="" />
        <div>
          <h1 className=" text-lg lg:text-xl font-semibold text-blue-600">
            Continue with Google
          </h1>
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            alert("Login Failed");
          }}
        />
      </form>
    </div>
  );
};

export default Login;
