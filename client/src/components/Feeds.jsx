import Feed from "./Feed"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import FilterSort from "./FilterSort"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
const Feeds = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['question._id'],
    queryFn: () => newRequest.get(`/questions?category=${cat}&sort=${sort}`).then((res) => {
      return res.data
    })

  })
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [cat, setCat] = useState(params.get("category") || ""); 
  const [sort, setSort] = useState(params.get("sort") || ""); 

  

  const handleCat = (e) => {
    const category = e.target.value;
    setCat(category);

    navigate(`?category=${category}&sort=${sort}`);
  };

  const handleSort = (e) => {
    const sorting = e.target.value;
    setSort(sorting);
    navigate(`?category=${cat}&sort=${sorting}`);
  };

  useEffect(() => {
    refetch();
  }, [cat, sort, refetch]);
  
  
  return (

    <>
    <FilterSort handleCat={handleCat} handleSort={handleSort} cat={cat} sort={sort}/>
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