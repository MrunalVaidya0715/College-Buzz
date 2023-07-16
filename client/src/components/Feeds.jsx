import Feed from "./Feed"

const Feeds = () => {
  return (
    <div className=" overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-200 h-full w-full flex flex-col gap-16 p-2 scroll-smooth">
        <Feed/>
        <Feed/>
        <Feed/>
        <Feed/>
    </div>
  )
}

export default Feeds