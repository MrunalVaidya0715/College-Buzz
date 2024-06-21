import { useQuery } from "@tanstack/react-query"
import newRequest from "../../../../utils/newRequest"
import FeedAdmin from "../../../components/admin/FeedAdmin"
import FeedSkeleton from "../../../components/FeedSkeleton"

const ReportedPosts = () => {

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['reportedPosts'],
    queryFn: () => newRequest.get(`/admin/reports`).then((res) => {
      return res.data
    })

  })
  console.log(data)
  return (
    <div className="mt-16 md:mt-0 p-2 flex h-full w-full">
      {/* Feeds */}

      <div className=" relative  h-auto w-full flex flex-1 flex-col items-center ">
        {/* <div className="xl:hidden z-[20] sticky top-0">
          <FilterSortAdmin handleCat={handleCat} handleSort={handleSort} cat={cat} sort={sort} />
        </div> */}
        <div className=" relative h-auto w-full max-w-[600px] flex flex-col gap-4 md:gap-8">
          {
            isLoading ? Array(3).fill().map((_, index) => <FeedSkeleton key={index} />) :
              error ? (<h2 className=" text-center">Something went wrong</h2>) :
                data.length === 0 ? (
                  <div className="mt-12 flex w-full justify-center flex-col items-center">
                    <h1 className=" text-3xl font-semibold">No Questions Yet</h1>
                    {/* <p className=" text-blue-500">Ask Question</p> */}
                  </div>
                ) :
                  data.map((feed) => (
                    <FeedAdmin key={feed._id} refetch={refetch} {...feed} title={feed.title} desc={feed.desc} />
                  ))
          }
        </div>
      </div>
      {/* Filters */}
      {/* <div className=" hidden xl:flex items-start w-full max-w-[300px]">
        <FilterSortAdmin handleCat={handleCat} handleSort={handleSort} cat={cat} sort={sort} />
      </div> */}
    </div>
  )
}

export default ReportedPosts