import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const FeedSkeleton = () => {
  return (
    <div className=" flex p-2 w-full justify-start bg-white border-[1px] border-gray-100 shadow-sm hover:shadow-lg ease-in-out duration-300 transition-all">
                  {/**Action */}
                  <div className="flex flex-col items-center justify-start px-4 ">
                    <Skeleton className=" w-8 h-8" />
                  </div>
                  {/**Body */}
                  <div className="pb-2 flex gap-2 flex-col w-full ">
                    <div>
                      <Skeleton className=" w-[50%]" />
                    </div>
                    {/*Body */}
                    <div>
                      <Skeleton count={2} />
                    </div>
                    {/**User */}
                    <div className="border-t-[1px] pt-4 ">
                      <div className="flex gap-2 items-center">
                        <Skeleton circle className=" w-8 h-8" />
                        <Skeleton className=" w-24 " />
                      </div>
                    </div>
                  </div>
                </div>
  )
}

export default FeedSkeleton