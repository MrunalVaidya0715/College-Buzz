import Feed from "./Feed"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import FilterSort from "./FilterSort"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FeedSkeleton from "./FeedSkeleton"
import Filter from 'bad-words'
const Feeds = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['question._id'],
    queryFn: () => newRequest.get(`/questions?category=${cat}&sort=${sort}`).then((res) => {
      return res.data
    })

  })
  const { isLoading: isBWLoading, error: BWError, data: badwords } = useQuery({
    queryKey: ["badwords"],
    queryFn: () =>
      newRequest.get(`badwords`).then((res) => {
        return res.data;
      }),
  });
  const newBadWords = [];
  if (!(isBWLoading || BWError)) {
    badwords.map((word) => newBadWords.push(word.word))
  }

  const filter = new Filter({ regex: /\*|\.|$/gi })
  filter.addWords(...newBadWords);
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
          isLoading ? Array(3).fill().map((_, index) => <FeedSkeleton key={index} />) :
            error ? (<h2 className=" text-center">Something went wrong</h2>) :
              data.length === 0 ? (
                <div className="mt-12 flex w-full justify-center flex-col items-center">
                  <h1 className=" text-3xl font-semibold">No Questions Yet</h1>
                  {/* <p className=" text-blue-500">Ask Question</p> */}
                </div>
              ) :
                data.map((feed) => (
                  <Feed key={feed._id} refetch={refetch} {...feed} title={filter.clean(feed.title)} desc={filter.clean(feed.desc)} />
                ))
        }
      </div>
    </>

  )
}

export default Feeds