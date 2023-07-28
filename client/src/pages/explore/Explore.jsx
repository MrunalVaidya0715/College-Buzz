import { categories } from "../../data/categories"
import { Link, useNavigate } from "react-router-dom"
const Explore = () => {
  const navigate = useNavigate()
  return (
    <div className="flex w-full flex-col ">
      <h1 className=" text-center text-3xl font-semibold">Explore Questions</h1>
      <div className="mt-8 w-full grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3">
        {
          categories.map((cat) => (
            <Link key={cat.id} to={`/?category=${cat.path}`}>
              <div className=" w-full flex py-4 px-2 justify-center items-center bg-gradient-to-br from-orange-300 to-orange-500 border-[1px] border-black shadow-[-5px_5px_0px_0px_#c30f0f] hover:shadow-[-5px_12px_0px_0px_#c30f0f] hover:-translate-y-2 rounded-md delay-150 transition-all duration-200 ease-in-out">
                <h1 className=" text-white font-semibold tracking-wider text-lg">{cat.name}</h1>
              </div>
            </Link>

          ))
        }
      </div>
    </div>
  )
}

export default Explore