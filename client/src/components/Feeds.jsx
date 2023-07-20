import Feed from "./Feed"
import { posts } from "../data/posts"
const Feeds = () => {
  return (
    <div className=" overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-200 h-full w-full flex flex-col gap-16 p-2 scroll-smooth">
        {
          posts.map((post)=>(
            <Feed key={post.id} title={post.title} desc={post.desc} date={post.date}  pstby={post.postedBy} up={post.upvote} dwn={post.downvote} cmt = {post.comments} cat = {post.category} />
          ))
        }
        
    </div>
  )
}

export default Feeds