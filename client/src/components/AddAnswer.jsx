import { useState } from "react"
import { IoClose } from "react-icons/io5"
import ReactQuill from "react-quill"
import { useNavigate } from "react-router-dom"
import { format, formatDistanceToNow } from 'date-fns'
import newRequest from '../../utils/newRequest';

const AddAnswer = ({ handleCloseAnswer, setIsAnswer ,data }) => {

    const user = JSON.parse(localStorage.getItem("currentUser"))
    const navigate = useNavigate()
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState(null)
    const [answer, setAnswer] = useState({
        desc: description,
    });

    const handleSubmit = async(e) => {
        e.preventDefault()
        setUploading(true)
        try {
            await newRequest.post('/answers', {
                questionId: data._id,
                desc: answer.desc,

            })
            setUploading(false)
            alert("Answer Uploaded")
            setIsAnswer(false)

        } catch (error) {
            setErr(error.response.data)
            setUploading(false)
            alert(error)

        }
    }
    return (
        <div className='z-[100] top-0 right-0 bg-black/50 absolute flex w-full h-screen items-center justify-center'>

            <div className='p-2 overflow-y-auto scrollbar-w-2 scrollbar-thumb-gray-400 scrollbar scrollbar-thumb-rounded-lg scrollbar-track-gray-200  flex flex-col gap-4 items-center w-[90%] max-w-[700px] max-h-[500px] h-fit bg-white'>
                <div className="flex w-full justify-end">
                    <div onClick={handleCloseAnswer} className='p-1 cursor-pointer bg-white rounded-md'>
                        <IoClose size={22} />
                    </div>
                </div>
                <h1 className=' text-xl font-semibold'>{data.title}</h1>
                <p className=" flex gap-1 items-baseline font-semibold"><span className=" font-normal text-sm text-gray-500">asked by</span>{data.userInfo.username}<span className="font-normal text-sm text-gray-500">on</span><span className=" text-sm">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</span><span className=" text-gray-500 text-sm">({formatDistanceToNow(new Date(data.createdAt))} ago)</span></p>
                <div className='mt-4 flex flex-col w-full min-h-32 max-w-[500px]'>

                    <ReactQuill placeholder="Type Answer" theme="snow" value={answer.desc} onChange={(value) => setAnswer((prev) => ({ ...prev, desc: value }))} />
                </div>
                <div className='mt-16 w-full flex justify-center'>
                    <button onClick={handleSubmit} className='bg-blue-700 hover:opacity-70 active:opacity-30 flex items-center justify-center gap-1 w-full max-w-[500px] p-2 rounded-md text-white ease-in-out transition-all duration-200'>Answer</button>
                </div>
                <div>
                    <p className=" text-center text-red-500 font-semibold">{err && err}</p>
                </div>
            </div>
        </div>
    )
}

export default AddAnswer