import Review from "./Review"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import { useParams } from "react-router-dom"
import {ImSpinner9} from 'react-icons/im'

const Reviews = () => {
  const { id } = useParams();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['answers'],
    queryFn: () => newRequest.get(`answers/question/${id}`).then((res) => {
      return res.data
    })

  })

  return (
    <div className=" mt-8 w-full flex flex-col gap-2">
      {/* Render Reviews */}
      <div className=" relative h-auto w-full flex flex-col items-center gap-2 md:gap-4 ">
        {
          isLoading ? <ImSpinner9 className=" text-2xl animate-spin text-blue-700"/> :
            error ? (<h2 className=" text-center">Something went wrong</h2>) :
              data.length === 0 ? (
                <div className="mt-12 flex w-full justify-center flex-col items-center">
                  <h1 className=" text-3xl font-semibold">No Answers Yet</h1>
                  {/* <p className=" text-blue-500">Ask Question</p> */}
                </div>
              ) :
                data.map((ans) => (
                  <Review key={ans._id} refetch={refetch} {...ans} />
                ))
        }
      </div>
    </div>
  )
}

export default Reviews