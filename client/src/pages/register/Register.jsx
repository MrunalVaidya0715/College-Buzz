import { useState } from "react";
import newRequest from "../../../utils/newRequest.js";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",

  });
  console.log(user)

  const [isReg, setIsReg] = useState(false)
  const [err, setErr] = useState(null)

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsReg(true)
    try {

      await newRequest.post('/auth/register', {
        ...user,
      })
      setIsReg(false)
      navigate("/login")


    } catch (error) {
      setErr(error.response.data)
      setIsReg(false)
      console.log(error)

    }

  }
  return (
    <div className=" flex w-full p-6 min-h-[500px] h-screen justify-center items-center">
      <form onSubmit={handleRegister} className="flex py-4 px-6 lg:px-8 max-w-[400px] w-full h-fit rounded-lg border-[1px] border-gray-300 shadow-xl flex-col gap-2 justify-center items-center">
        <div>
          <h1 className=" text-xl lg:text-2xl font-bold">Register</h1>
        </div>

        <div className="mt-8 w-full flex flex-col justify-start items-start gap-1">
          <h1>Username<span className=" text-red-600">*</span></h1>
          <input onChange={handleChange} className=" rounded-md h-10 p-2 border-[1px] w-full" type="text" name="username" id="username" placeholder="Create Username" />
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <h1>Email<span className=" text-red-600">*</span></h1>
          <input onChange={handleChange} className=" rounded-md h-10 p-2 border-[1px] w-full" type="email" name="email" id="email" placeholder="Enter Email" />
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <h1>Password<span className=" text-red-600">*</span></h1>
          <input onChange={handleChange} className=" rounded-md h-10 p-2 border-[1px] w-full" type="password" name="password" id="password" placeholder="Create Password" />
        </div>
        <div className="mt-4 w-full">
          <button className=" bg-blue-500 w-full py-2 rounded-md text-white hover:opacity-70 active:opacity-25 transition-all duration-100 ease-in-out" type="submit">
            {
              isReg ? "Registering..." : "Register"
            }
          </button>
        </div>
        <div>
          <p className=" text-red-500 font-semibold">{err && err}</p>
        </div>
        <div>
          <Link to="/login">
            <p className=" text-sm text-blue-500">Already have an Account</p>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register