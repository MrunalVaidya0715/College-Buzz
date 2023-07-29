import Feed from "../../components/Feed"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../../utils/newRequest.js"
import FilterSort from "../../components/FilterSort"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
const Contribute = () => {
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['question._id'],
        queryFn: () => newRequest.get(`/questions?category=${cat}&sort=${sort}`).then((res) => {
          return res.data
        })
    
      })

      const filterPosts = data?.filter((post)=>post.answers.length === 0)

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
      <FilterSort handleCat={handleCat} handleSort={handleSort} cat={cat} sort={sort} />
      <div className=" relative h-auto w-full flex flex-col gap-4 md:gap-8">
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
                  <Feed key={feed._id} refetch={refetch} {...feed} />
                ))
        }
      </div>
    </>
  )
}

export default Contribute