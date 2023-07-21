import Feed from "./Feed"
import { posts } from "../data/posts"
import { Link } from "react-router-dom"
const Feeds = () => {
  return (
    <Link to="/posts/111">
      <div className=" h-full w-full flex flex-col gap-16">
        {
          posts.map((post) => (
            <Feed key={post.id} title={post.title} desc={post.desc} date={post.date} pstby={post.postedBy} up={post.upvote} dwn={post.downvote} cmt={post.comments} cat={post.category} />
          ))
        }

      </div>
    </Link>
  )
}

export default Feeds