import { Outlet } from "react-router-dom"
import Section from "../../components/Section"
import Sidebar from "../../components/Sidebar"
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../../utils/newRequest"

const Home = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['topquestions'],
        queryFn: () => newRequest.get(`questions/top-questions`).then((res) => {
          return res.data
        })
      })

    return (
        <div className="pt-16 w-full h-screen bg-slate-100 flex justify-center">
            <div className=" w-full max-w-[1200px] flex lg:gap-4 justify-between">
                <Sidebar />

                <div className=" overflow-y-auto scrollbar-none h-full w-full flex flex-col  p-2 scroll-smooth">
                    <Outlet />
                </div>

                <Section isLoading={isLoading} error={error} data={data} />
            </div>
        </div>
    )
}


export default Home