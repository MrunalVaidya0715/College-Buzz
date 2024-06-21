import { AiOutlineClose } from "react-icons/ai"
import { ImSpinner9 } from "react-icons/im"
import { Link } from "react-router-dom"

const SearchContent = ({ isLoading, error, data, setSearchQuery }) => {

    return (


        <div className='absolute p-2 bg-white w-[80%] max-w-[500px] max-h-[150px] overflow-visible overflow-y-auto scrollbar-none top-36 left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-lg border-[1px] border-gray-300'>

            <div className="flex gap-2 w-full items-center flex-col justify-center">
                {
                    isLoading ? <ImSpinner9 className=" text-2xl animate-spin text-blue-700" /> :
                        error ? <p className="font-semibold">Something went wrong</p> :
                            data?.length === 0 ? (
                                <div className="flex gap-2 w-full items-center justify-center">
                                    <p className="font-semibold">No Questions Found</p>
                                    <div onClick={()=>setSearchQuery(null)} className="p-2 bg-slate-200 rounded-full">
                                        <AiOutlineClose />
                                    </div>
                                </div>
                            ) :
                                data?.map((res) => (
                                    <Link onClick={() => setSearchQuery(false)} className="w-full" key={res._id} to={`/posts/${res._id}`}>
                                        <div className="flex gap-2 items-center hover:bg-slate-100 rounded-md w-full py-1 px-2">
                                            <img className="w-8 h-8 rounded-full" src={res.userInfo.profileImg} alt="" />
                                            <p className=" font-semibold">{res.title}</p>
                                        </div>
                                    </Link>
                                ))
                }
            </div>
        </div>

    )
}

export default SearchContent