import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";

const MyQuestions = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const { isLoading, error, data } = useQuery({
    queryKey: ["userQuestion"],
    queryFn: () =>
      newRequest.get(`/questions`).then((res) => {
        return res.data;
      }),
  });
  const filterPosts = data.filter((post)=> post.userInfo._id === user?._id)
  return (
    <div className="flex w-full flex-col h-full bg-white">
      <h1 className=" text-3xl font-semibold text-center my-2">Your Questions</h1>
      
    </div>
  )
}

export default MyQuestions