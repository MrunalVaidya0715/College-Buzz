import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";
import Feed from "../../components/Feed";

const MyQuestions = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const { isLoading, error, data } = useQuery({
    queryKey: ["userQuestion"],
    queryFn: () =>
      newRequest.get(`/questions`).then((res) => {
        return res.data;
      }),
  });
  const filterPosts = data?.filter((post) => post.userInfo._id === user?._id)
  return (
    <div className="flex w-full flex-col h-auto bg-white">
      <h1 className=" text-3xl font-semibold text-center my-2">Your Questions</h1>
      <div className="p-2 relative h-auto w-full flex flex-col gap-4 md:gap-8">
        {
          isLoading ? (<h2 className=" text-center">Loading Questions...</h2>) :
            error ? (<h2 className=" text-center">Something went wrong</h2>) :
              filterPosts.length === 0 ? (
                <div className="mt-12 flex w-full justify-center flex-col items-center">
                  <h1 className=" text-3xl font-semibold">No Questions Yet</h1>
                  {/* <p className=" text-blue-500">Ask Question</p> */}
                </div>
              ) :
                filterPosts.map((feed) => (
                  <Feed key={feed._id} {...feed} />
                ))
        }
      </div>
    </div>
  )
}

export default MyQuestions