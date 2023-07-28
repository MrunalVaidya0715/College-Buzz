import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiUpArrowAlt } from 'react-icons/bi'
import { IoAddOutline, IoClose } from 'react-icons/io5'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import newRequest from '../../utils/newRequest';

const Section = ({ isLoading, error, data }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState(null)
    const [question, setQuestion] = useState({
        title: "",
        desc: description,
        category: "",

    });
    const handleChange = (e) => {
        setQuestion((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true)
        try {
            await newRequest.post('/questions', {
                ...question,

            })
            setUploading(false)
            alert("Question Uploaded")
            setModal(false)
            navigate('/')

        } catch (error) {
            setErr(error.response.data)
            setUploading(false)
            console.log(error)

        }

    }
    return (
        <div className=" w-[20%] hidden md:flex flex-col gap-8 p-2">
            {/** */}
            <div className='w-full flex justify-center'>
                {
                    user ? (
                        <button onClick={() => setModal(prev => !prev)} className='bg-blue-700 hover:opacity-70 active:opacity-30 flex items-center justify-center gap-1 w-full p-2 rounded-md text-white ease-in-out transition-all duration-200'><IoAddOutline size={20} />Ask Question</button>
                    ) : (
                        <Link className='w-full' to="/login">
                            <button onClick={() => setModal(prev => !prev)} className='bg-blue-700 hover:opacity-70 active:opacity-30 flex items-center justify-center gap-1 w-full p-2 rounded-md text-white ease-in-out transition-all duration-200'><IoAddOutline size={20} />Ask Question</button>
                        </Link>
                    )
                }
            </div>
            {
                modal && (
                    <div className='z-[100] top-0 right-0 bg-black/50 absolute flex w-full h-screen items-center justify-center'>
                        <div onClick={() => setModal(false)} className=' cursor-pointer absolute top-4 right-4 p-2 bg-white rounded-full'>
                            <IoClose size={16} />
                        </div>
                        <div className='py-4 overflow-y-auto scrollbar-w-2 scrollbar-thumb-gray-400 scrollbar scrollbar-thumb-rounded-lg scrollbar-track-gray-200  flex flex-col gap-4 items-center w-[90%] max-w-[700px] h-[600px] p-4 bg-white'>
                            <h1 className=' text-xl font-semibold'>Ask Question</h1>
                            <div className='flex flex-col w-full max-w-[500px]'>
                                <p className=' font-semibold'>Title</p>
                                <input onChange={handleChange} className=' border-[1px] p-2' type="text" placeholder='Enter Title' name='title' />
                            </div>
                            <div className='flex flex-col w-full max-w-[500px]'>
                                <p className=' font-semibold'>Select Category</p>
                                <select onChange={handleChange} className='cursor-pointer border-[1px] p-2' name="category" defaultValue="--select category--">
                                    <option disabled>--select category--</option>
                                    <option value="general">General</option>
                                    <option value="technology">Technology</option>
                                    <option value="sports">Sports</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="exams">Examinations</option>
                                    <option value="canteen">Canteen</option>
                                </select>
                            </div>
                            <div className=' flex flex-col w-full max-w-[500px]'>
                                <p className=' font-semibold'>Enter Description</p>
                                <ReactQuill theme="snow" value={question.desc} onChange={(value) => setQuestion((prev) => ({ ...prev, desc: value }))} />
                            </div>
                            <div className='mt-16 w-full flex justify-center'>
                                <button onClick={handleSubmit} className='bg-blue-700 hover:opacity-70 active:opacity-30 flex items-center justify-center gap-1 w-full max-w-[500px] p-2 rounded-md text-white ease-in-out transition-all duration-200'><IoAddOutline size={20} />Ask Question</button>
                            </div>
                            <div>
                                <p className=" text-center text-red-500 font-semibold">{err && err}</p>
                            </div>
                        </div>
                    </div>
                )
            }
            {/**Top Questions */}
            <div className="border-[1px] bg-white shadow-md px-2 py-4 w-full flex flex-col gap-2">
                <h1 className=" font-bold">Top Questions</h1>
                <div className="mt-4 w-full overflow-x-auto flex flex-col gap-2">
                    {
                        isLoading ? "Loading Top Ques..." :
                            error ? "Something went wrong" :
                                data.map((que, i) => (
                                    <div key={que.id} className="w-full flex gap-1 items-baseline justify-between">
                                        <div className='flex overflow-x-auto scrollbar-none items-center gap-1'>
                                            <p className=' font-semibold'>{i + 1}.</p>
                                            <Link to={`posts/${que._id}`}>
                                                <div className='group flex overflow-x-auto scrollbar-none flex-nowrap items-centers'>
                                                    <p className='group-hover:text-blue-500 group-hover:underline-offset-2 group-hover:underline whitespace-nowrap text-sm '>{que.title}</p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className='ml-1 flex items-center'>
                                            <p className=' text-sm font-bold text-blue-600'>{que.upvote}</p>
                                            <BiUpArrowAlt />
                                        </div>
                                    </div>
                                ))
                    }


                </div>
            </div>
        </div>
    )
}

export default Section