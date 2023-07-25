import { Outlet } from "react-router-dom"
import Section from "../../components/Section"
import Sidebar from "../../components/Sidebar"

const Home = () => {
    return (
        <div className="pt-16 w-full h-screen bg-slate-100 flex justify-center">
            <div className="w-full max-w-[1200px] flex lg:gap-4 justify-between">
                <Sidebar />

                {/* <div className=" overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-200 h-full w-full flex flex-col  p-2 scroll-smooth">
                    <Outlet />
                </div> */}
                <div className=" overflow-y-auto scrollbar-none h-full w-full flex flex-col  p-2 scroll-smooth">
                    <Outlet />
                </div>

                <Section />
            </div>
        </div>
    )
}

export default Home