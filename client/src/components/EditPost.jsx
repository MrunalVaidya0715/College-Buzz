import { useEffect, useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { IoClose } from "react-icons/io5"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const EditPost = ({ setIsEdit, data }) => {
    const [description, setDescription] = useState('');
    const [question, setQuestion] = useState({
        title: "",
        desc: description,
        category: "",

    });
    console.log(question)
    useEffect(() => {
        
        setQuestion({
          title: data.title,
          desc: data.desc,
          category: data.category,
        });
      }, [data]);
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState(null)

    const handleChange = (e) => {
        setQuestion((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const handleDescChange = (value) => {
        setQuestion((prev) => ({ ...prev, desc: value }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault()
        alert("Hello")
    }

    return (
        <div className='z-[1000] fixed top-0 right-0 bg-black/50 flex w-full h-screen items-center justify-center'>

            <div className='py-4 overflow-y-auto scrollbar-w-2 scrollbar-thumb-gray-400 scrollbar scrollbar-thumb-rounded-lg scrollbar-track-gray-200  flex flex-col gap-4 items-center w-[90%] max-w-[700px] h-[600px] p-4 bg-white'>
                <div className='flex w-full justify-end'>
                    <div onClick={() => setIsEdit(false)} className=' cursor-pointer  p-1 bg-white rounded-md'>
                        <IoClose size={22} />
                    </div>
                </div>
                <h1 className=' whitespace-nowrap text-xl font-semibold'>Update Question</h1>
                <div className='flex flex-col w-full max-w-[500px]'>
                    <p className=' font-semibold'>Title</p>
                    <input onChange={handleChange} value={question.title} className=' border-[1px] p-2' type="text" placeholder='Enter Title' name='title' />
                </div>
                <div className='flex flex-col w-full max-w-[500px]'>
                    <p className=' font-semibold'>Select Category</p>
                    <select onChange={handleChange} value={question.category} className='cursor-pointer border-[1px] p-2' name="category">
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
                    <ReactQuill theme="snow" value={question.desc} onChange={handleDescChange} />
                </div>
                <div className='mt-16 w-full flex justify-center'>
                    <button disabled={uploading} onClick={handleSubmit} className='bg-blue-700 hover:opacity-70 active:opacity-30 flex items-center justify-center gap-1 w-full max-w-[500px] p-2 rounded-md text-white ease-in-out transition-all duration-200'>
                        {uploading && <ImSpinner6 size={20} className="animate-spin" /> }Update Question</button>
                </div>
                <div>
                    <p className=" text-center text-red-500 font-semibold">{err && err}</p>
                </div>
            </div>
        </div>
    )
}

export default EditPost