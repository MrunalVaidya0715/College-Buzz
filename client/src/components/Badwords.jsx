import { useState } from "react"
import { AiOutlinePlus } from 'react-icons/ai'
import { ImSpinner6 } from 'react-icons/im'
import newRequest from "../../utils/newRequest";
const Badwords = () => {
    const [word, setWord] = useState("")
    const [err, setErr] = useState(null);
    const [isUploading, setisUploading] = useState(false)
    const handleWord = async (e) => {
        setErr(null)
        e.preventDefault()
        if(word.trim()=== ""){
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
    return (
        <div className="flex flex-col items-center w-full gap-2">
            <p className="font-semibold">Add Badword</p>
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
        </div>
    )
}

export default Badwords