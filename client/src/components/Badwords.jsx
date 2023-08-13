import { useState } from "react"
import { AiOutlinePlus,AiOutlineMinus } from 'react-icons/ai'
import { ImSpinner6 } from 'react-icons/im'
import { FaInfoCircle } from 'react-icons/fa'
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
const Badwords = () => {
    const [word, setWord] = useState("")
    const [err, setErr] = useState(null);
    const [isUploading, setisUploading] = useState(false)
    const [isManage, setIsManage] = useState(false)
    const { isLoading: isBWLoading, error: BWError, data: badwords } = useQuery({
        queryKey: ["badwords"],
        queryFn: () =>
            newRequest.get(`badwords`).then((res) => {
                return res.data;
            }),
    });
    const handleWord = async (e) => {
        setErr(null)
        e.preventDefault()
        if (word.trim() === "") {
            setErr("Empty input")
            return;
        }
        try {
            setisUploading(true)
            await newRequest.post('badwords', { word })
            setisUploading(false)
            alert("Word Added for Filtering")
            setWord("")
        } catch (error) {
            setisUploading(false)
            setErr(error.response.data)
            console.error(error)
        }
    }
    const handleDelete = async (wordSelected) => {
        
        try {
            
            await newRequest.delete('badwords', { wordSelected })
            
        } catch (error) {
            
            setErr(error.response.data)
            console.error(error)
        }
    }
    return (
        <div className="py-2 group flex flex-col items-center w-full gap-2">
            {
                isManage ? (
                    <div className=" flex flex-col items-center w-full gap-2">
                        <div className=" flex-wrap-reverse flex items-center gap-2">
                            <p className="font-semibold">Manage BadWords</p>

                        </div>
                        <div className=" scrollbar-none w-full bg-white flex  overflow-y-auto max-h-[100px] border-[1px] rounded-lg overflow-hidden flex-col items-center">
                            {
                                isBWLoading ? "Loading.." :
                                    BWError ? "-" : (
                                        badwords.map((wd) => (
                                            <div className="flex border-b-[1px] border-black/50 py-2 px-3 w-full items-center justify-between" key={wd._id}>
                                                <p>{wd.word}</p>
                                                <AiOutlineMinus onClick={()=>handleDelete(wd.word)} className=" text-red-700" size={16}/>
                                            </div>
                                        ))
                                    )
                            }
                        </div>
                        {
                            err && (
                                <div>
                                    <p className=" text-center text-red-600 font-semibold">{err}</p>
                                </div>
                            )
                        }
                        <div onClick={() => setIsManage(false)} className="group-hover:flex hidden w-full justify-center  delay-1000">
                            <button className=" text-blue-500">Add Badwords</button>
                        </div>
                    </div>
                ) : (
                    <div className=" flex flex-col items-center w-full gap-2">
                        <div className=" flex-wrap-reverse flex items-center gap-2">
                            <p className="font-semibold">Add Badword</p>
                            <div>
                                <FaInfoCircle title="Add Offensive Words for Filtering" className=" text-blue-600" size={16} />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input className=" border-[1px] p-2 w-full" onChange={(e) => setWord(e.target.value)} type="text" name="word" id="word" />
                            <button onClick={handleWord} disabled={isUploading} className="hover:opacity-70 active:opacity-50 flex items-center justify-center p-2 bg-blue-600 w-fit h-full">
                                {
                                    isUploading ? <ImSpinner6 className=" animate-spin text-white" size={16} /> : <AiOutlinePlus className=" text-white" size={16} />
                                }
                            </button>
                        </div>
                        {
                            err && (
                                <div>
                                    <p className=" text-center text-red-600 font-semibold">{err}</p>
                                </div>
                            )
                        }
                        <div onClick={() => setIsManage(true)} className="group-hover:flex hidden w-full justify-center  delay-1000">
                            <button className=" text-blue-500">manage</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Badwords