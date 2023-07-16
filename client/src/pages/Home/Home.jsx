import Feeds from "../../components/Feeds"
import Section from "../../components/Section"
import Sidebar from "../../components/Sidebar"

const Home = () => {
    return (
        <div className="pt-16 p-2 w-full h-screen bg-slate-100 flex justify-center">
            <div className="w-full max-w-[1200px] flex lg:gap-4 justify-between">
                <Sidebar/>
                <Feeds />
                <Section/>
            </div>
        </div>
    )
}

export default Home