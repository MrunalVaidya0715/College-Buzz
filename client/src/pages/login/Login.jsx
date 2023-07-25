import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import newRequest from "../../../utils/newRequest.js"
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassWord] = useState("")
  const [islogin, setIsLogin] = useState(false)
  const [err, setErr] = useState(null)
 
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLogin(true)
    try {
      const res = await newRequest.post("auth/login", {
        username,
        password

      })
      localStorage.setItem("currentUser", JSON.stringify(res.data))
      setIsLogin(false)
      navigate("/")
    } catch (err) {
      setErr(err.response.data)
      setIsLogin(false)
      console.log(err)


    }
  }
  return (
    <div className=" flex w-full p-6 min-h-[500px] h-screen justify-center items-center">
      <form onSubmit={handleLogin} className="flex py-4 px-6 lg:px-8 max-w-[400px] w-full h-fit rounded-lg border-[1px] border-gray-300 shadow-xl flex-col gap-2 justify-center items-center">
        <div>
          <h1 className=" text-xl lg:text-2xl font-bold">Login into your account</h1>
        </div>

        <div className="mt-8 w-full flex flex-col justify-start items-start gap-1">
          <h1>Username</h1>
          <input onChange={(e) => setUsername(e.target.value)} className=" rounded-md h-10 p-2 border-[1px] w-full" type="text" name="username" id="username" placeholder="Enter Username" />
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-1">
          <h1>Password</h1>
          <input onChange={(e) => setPassWord(e.target.value)} className=" rounded-md h-10 p-2 border-[1px] w-full" type="password" name="password" id="password" placeholder="Enter Password" />
        </div>
        <div className="mt-2 w-full">
          <button className=" bg-blue-500 w-full py-2 rounded-md text-white hover:opacity-70 active:opacity-25 transition-all duration-100 ease-in-out" type="submit">
            {
              islogin ? "loginin...":"Login"
            }
          </button>
        </div>
        <div>
          <p className=" text-red-500 font-semibold">{err && err}</p>
        </div>
        <div>
          <Link to="/register">
          <p className=" text-sm text-blue-500">Create an Account</p>
          </Link>
        </div>

        


      </form>
    </div>
  )
}

export default Login