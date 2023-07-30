import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="flex flex-col text-purple-600 bg-gray-100 w-full min-h-screen items-center justify-center">
            <h1 className=" font-extrabold text-6xl">404</h1>
            <p className=" text-xl text-center font-semibold">Oh no! Page not Found</p>
            <Link to="/">
                <button className=" mt-4 px-6 py-2 bg-purple-600 hover:opacity-70 active:opacity-30 rounded-xl text-white transition-all duration-200 ease-in-out ">Go Home</button>
            </Link>
        </div>
    )
}

export default NotFound