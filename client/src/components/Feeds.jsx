import Feed from "./Feed"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
const Feeds = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['question._id'],
    queryFn: () => newRequest.get(`/questions`).then((res) => {
      return res.data
    })

  })
  
  return (

    <div className=" h-full w-full flex flex-col gap-4 md:gap-8">
      {
        isLoading? (<h2 className=" text-center">Loading Questions...</h2>):
        error? (<h2 className=" text-center">Something went wrong</h2>):data.map((feed)=>(
          <Feed key={feed._id} refetch={refetch} {...feed}  />
        ))
      }
    </div>

  )
}

export default Feeds