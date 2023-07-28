import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";
import Feed from "../../components/Feed";
import { useParams } from "react-router-dom";

const MyQuestions = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const {userId} = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ["userQuestion"],
    queryFn: () =>
      newRequest.get(`/questions/${userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="flex w-full flex-col min-h-full h-auto">
      <h1 className=" text-3xl font-semibold text-center my-2">Your Questions</h1>
      <div className="mt-4 relative h-auto w-full flex flex-col gap-4 md:gap-8">
        {
          isLoading ? (<h2 className=" text-center">Loading Questions...</h2>) :
            error ? (<h2 className=" text-center">Something went wrong</h2>) :
              data.length === 0 ? (
                <div className="mt-12 flex w-full justify-center flex-col items-center">
                  <h1 className=" text-3xl font-semibold">No Questions Yet</h1>
                  {/* <p className=" text-blue-500">Ask Question</p> */}
                </div>
              ) :
                data.map((feed) => (
                  <Feed key={feed._id} {...feed} />
                ))
        }
      </div>
    </div>
  )
}

export default MyQuestions