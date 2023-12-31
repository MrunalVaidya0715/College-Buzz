import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { RiFlagFill, RiFlagLine } from 'react-icons/ri'
import { BiEditAlt } from 'react-icons/bi'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { useEffect, useState } from "react"
import Reviews from "../../components/Reviews"
import { RxDotFilled } from "react-icons/rx"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";
import parser from 'html-react-parser';
import { formatDistanceToNow } from "date-fns"
import AddAnswer from "../../components/AddAnswer"
import PostSkeleton from "../../components/PostSkeleton"
import EditPost from "../../components/EditPost"
import Filter from 'bad-words'
import { toast } from 'react-hot-toast'
const Post = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const { isLoading: isBWLoading, error: BWError, data: badwords } = useQuery({
    queryKey: ["badwords"],
    queryFn: () =>
      newRequest.get(`badwords`).then((res) => {
        return res.data;
      }),
  });
  const newBadWords = [];
  if (!(isBWLoading || BWError)) {
    badwords.map((word) => newBadWords.push(word.word))
  }


  const filter = new Filter({ regex: /\*|\.|$/gi })
  filter.addWords(...newBadWords);
  const { id } = useParams()

  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: () =>
      newRequest.get(`/questions/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  
  useEffect(() => {
    console.log("Changed")
    refetch()
  }, [id, refetch])
  const deletePost = useMutation((id) => {
    return newRequest.delete(`questions/${id}`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("question");
      navigate("/");
    },
  });
  const upvoteMutation = useMutation((id) => newRequest.patch(`/questions/upvote/${id}`),
    {
      onMutate: () => { },
      onError: (error) => {
        console.error("Upvote error:", error);
      },
      onSettled: () => {
        queryClient.invalidateQueries("question");
      },
    }
  );
  const handleUp = async () => {
    if (!user) {
      navigate('/login')
    }

    try {
      const response = await upvoteMutation.mutateAsync(id);
      const newVote = response.data.upvote - response.data.downvote;
      setVote(newVote);
    } catch (error) {
      console.error(error);
    }
  };
  const downvoteMutation = useMutation((id) => newRequest.patch(`/questions/downvote/${id}`),
    {
      onMutate: () => { },
      onError: (error) => {
        console.error("Downvote error:", error);
      },
      onSettled: () => {
        queryClient.invalidateQueries("question");
      },
    }
  );

  const handleDown = async () => {
    if (!user) {
      navigate('/login')
    }

    try {
      const response = await downvoteMutation.mutateAsync(id);
      const newVote = response.data.upvote - response.data.downvote;
      setVote(newVote);
    } catch (error) {
      console.error(error);
    }
  };


  const [vote, setVote] = useState(0);

  // Updating the vote state once the data is available or changes
  useEffect(() => {
    if (data) {
      const newVote = data.upvote - data.downvote;
      setVote(newVote);
    }
  }, [data]);


  const reportMutation = useMutation((id) => newRequest.patch(`/questions/report/${id}`),
    {
      onMutate: () => { 
        if(data.reportedBy.includes(user?._id)){
          toast.success("Question Unreported")
        }else{
          toast.success("Question Reported")
        }
      },
      onError: (error) => {
        console.error("Report error:", error);
      },
      onSettled: () => {
        queryClient.invalidateQueries("question");
      },
    }
  );
  

  const handleReport = async () => {
    if (!user) {
      navigate('/login')
    }

    try {
      await reportMutation.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  };



  const [isOption, setisOption] = useState(false);
  const handleOption = () => {
    setisOption(prev => !prev)
  }
  const [isAnswer, setIsAnswer] = useState(false)
  const handleAnswer = () => {
    setIsAnswer(prev => !prev)
  }
  const handleCloseAnswer = () => {
    setIsAnswer(false)
  }

  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(prev => !prev)
  }

  return (
    <div className="flex flex-col w-full">
      {/**Post Details */}
      {
        isLoading ? <PostSkeleton /> :
          error ? (<h2 className=" text-center">Something went wrong</h2>) : (
            <div className={`relative px-4 py-2 ${data.reportedBy.includes(user?._id)? "border-red-400 bg-red-100":"bg-white"}  border-[1px]  shadow-sm flex flex-col w-full gap-2`}>
              {isOption && <div onClick={() => setisOption(false)} className=" absolute top-0 right-0 w-full h-full" />}
              {/**User, time */}
              <div className="flex w-full items-center justify-between">
                <div className=" flex  gap-1 items-center">
                  <Link to={`/profile/${data.userInfo._id}`}>
                    <div className=" group  flex gap-2 items-center">
                      <img className=" w-8 h-8 object-cover object-center rounded-full" src={data.userInfo.profileImg || "/assets/noProfile.png"} alt="" />
                      <div className=' overflow-x-auto flex gap-1 md:gap-0 flex-wrap items-center'>
                        <p className="group-hover:underline underline-offset-2  flex items-center gap-1 text-gray-500 text-sm"><span className="hidden sm:block">posted by </span>
                          <span className=" whitespace-nowrap font-semibold text-blue-500">
                            {
                              user?._id === data.userInfo._id ? "You" : data.userInfo.username
                            }
                          </span></p>

                      </div>
                    </div>
                  </Link>
                  <RxDotFilled className="hidden sm:block text-gray-500" size={16} />
                  <p className=" whitespace-nowrap text-sm">{formatDistanceToNow(new Date(data.createdAt))}</p>
                </div>


                <div className=" relative flex items-center">

                  <BsThreeDotsVertical onClick={handleOption} className=" cursor-pointer text-gray-700 hover:text-black duration-150 transition-colors ease-in-out" size={22} />
                  <div onClick={() => setisOption(false)} className={` ${isOption ? "flex " : "hidden"} absolute top-0 right-5 px-1 py-2 flex-col items-start bg-white  border-[1px] rounded-md  `}>

                    {
                      user?._id === data.userInfo._id ? (
                        <>
                          <div onClick={handleEdit} className="px-2 py-1 flex w-full cursor-pointer items-center gap-1 hover:bg-gray-100 active:bg-gray-50 transition-all ease-in-out duration-200">
                            <BiEditAlt size={20} />
                            <p>Edit</p>
                          </div>
                          <div onClick={() => {
                            deletePost.mutate(data._id)
                            toast.success("Question Deleted")
                            navigate('/')
                          }} className="px-2 py-1 flex w-full cursor-pointer items-center gap-1 hover:bg-gray-100 active:bg-gray-50 transition-all ease-in-out duration-200">
                            <MdOutlineDeleteOutline className=" text-red-600" size={20} />
                            <p>Delete</p>
                          </div>
                        </>
                      ) : (
                        <div onClick={handleReport} className="px-2 py-1 flex w-full cursor-pointer items-center gap-1 hover:bg-gray-100 active:bg-gray-50 transition-all ease-in-out duration-200">
                          {
                            data.reportedBy.includes(user?._id) ? <RiFlagFill className=' text-red-500' size={18} /> : <RiFlagLine className=' text-gray-500' size={18} />
                          }
                          {
                            data.reportedBy.includes(user?._id) ? "Unreport" : "Report"
                          }
                        </div>
                      )
                    }


                  </div>
                </div>
                {/* EditModal */}
                {isEdit && <EditPost setIsEdit={setIsEdit} data={data} />}
              </div>
              {/* Category */}
              <div className='rounded-full border-[1px] border-orange-600 w-fit px-4 py-1 bg-orange-400'>
                <p className=' text-white'>{data.category}</p>
              </div>
              {/* Title */}
              <div className="">
                <h1 className=" font-bold text-lg tracking-wide">{filter.clean(data.title)}</h1>
              </div>
              {/* Desc */}
              <div className='p-2 rounded-md border-[1px]'>
                <div className=" text-gray-800 text-justify">
                  {parser(filter.clean(data.desc))}
                </div>
              </div>
              {/*Actions */}
              <div className='mt-1 flex w-full  text-gray-500 items-center justify-between gap-1'>
                <div className=" flex items-center gap-3">
                  <FaArrowUp onClick={handleUp} className={`cursor-pointer ${data.upvotedBy.includes(user?._id) ? "text-blue-500" : " text-gray-400"}`} size={20} />
                  <span className={`${vote > 0 ? " text-blue-600" : vote < 0 ? " text-red-500" : " text-gray-400"} font-semibold text-lg`}>
                    {
                      vote > 0 ? (vote) :
                        vote < 0 ? (vote * -1) : 0
                    }
                  </span>
                  <FaArrowDown onClick={handleDown} className={`cursor-pointer ${data.downvotedBy.includes(user?._id) ? "text-red-500" : " text-gray-400"}`} size={20} />
                </div>

                {
                  user ? (
                    <div onClick={handleAnswer} className=' cursor-pointer border-[1px]   border-gray-300 hover:shadow-md py-1 px-2 rounded-md flex items-center gap-1 bg-gradient-to-br from-gray-100 to-gray-300 transition-all ease-in-out duration-200'>

                      <p className=" font-semibold">Answer</p>
                    </div>
                  ) : (
                    <Link to="/login">
                      <div className=' cursor-pointer border-[1px]   border-gray-300 hover:shadow-md py-1 px-2 rounded-md flex items-center gap-1 bg-gradient-to-br from-gray-100 to-gray-300 transition-all ease-in-out duration-200'>

                        <p className=" font-semibold">Answer</p>
                      </div>
                    </Link>
                  )
                }
              </div>

            </div>
          )
      }
      {
        isAnswer && <AddAnswer handleCloseAnswer={handleCloseAnswer} data={data} setIsAnswer={setIsAnswer} />
      }

      {/**Comments/replies */}
      <Reviews />

    </div>
  )
}

export default Post