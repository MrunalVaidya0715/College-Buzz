import Feed from "./Feed"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import FilterSort from "./FilterSort"
import { useEffect, useState } from "react"
const Feeds = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['question._id'],
    queryFn: () => newRequest.get(`/questions?category=${cat}&sort=${sort}`).then((res) => {
      return res.data
    })

  })
  const [cat, setCat] = useState("")
  const [sort, setSort] = useState("")
  const handleCat = (e) =>{
    setCat(e.target.value)
  }
  const handleSort = (e) =>{
    setSort(e.target.value)
  }

  useEffect(() => {
    refetch();
  }, [cat, sort, refetch]);
  
  
  return (

    <>
    <FilterSort handleCat={handleCat} handleSort={handleSort}/>
    <div className=" relative h-auto w-full flex flex-col gap-4 md:gap-8">
      {
        isLoading? (<h2 className=" text-center">Loading Questions...</h2>):
        error? (<h2 className=" text-center">Something went wrong</h2>):data.map((feed)=>(
          <Feed key={feed._id} refetch={refetch} {...feed}  />
        ))
      }
    </div>
    </>

  )
}

export default Feeds