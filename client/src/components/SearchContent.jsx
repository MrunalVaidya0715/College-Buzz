import { AiOutlineClose } from "react-icons/ai"
import { ImSpinner9 } from "react-icons/im"
import { Link } from "react-router-dom"

const SearchContent = ({ isLoading, error, data, setSearchQuery }) => {

    return (


        <>
            <div className='fixed top-[4.5rem] left-[50%] -translate-x-[50%] w-[80%] max-w-[500px] flex flex-col gap-2 items-center justify-start overflow-visible   '>

                <div className="p-2 flex gap-2 w-full   max-h-[200px] bg-white items-center  justify-start flex-col rounded-lg border-[1px] border-gray-300 overflow-y-auto scrollbar-none">
                    {
                        isLoading ? <ImSpinner9 className=" text-2xl animate-spin text-blue-700" /> :
                            error ? <p className="font-semibold">Something went wrong</p> :
                                data?.length === 0 ? (
                                    <div className="py-2 flex gap-2 w-full items-center justify-center">
                                        <p className="font-semibold">No Questions Found</p>

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
                <div onClick={() => setSearchQuery(null)} className=" cursor-pointer p-2 w-fit bg-slate-200 border-[1px] border-gray-400 rounded-full">
                    <AiOutlineClose />
                </div>
            </div>
        </>

    )
}

export default SearchContent