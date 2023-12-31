import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
const UserCard = ({_id, username, profileImg, createdAt }) => {
    return (
        <Link className=' rounded-lg bg-white border-[1px] border-gray-300 p-4 flex flex-col items-center justify-center' to={`${_id}`}>
            <div className=" flex flex-col items-center justify-center gap-2">
                <img className=" aspect-square rounded-full w-16 h-16 md:w-20 md:h-20" src={profileImg} alt="" />
                <div className="flex w-full flex-col items-center">
                    <h1 className="text-center font-semibold text-xl">{username}</h1>
                    <p className="text-center text-sm text-gray-700">Member since <span className=' text-black'>{formatDistanceToNow(new Date(createdAt))}</span></p>
                </div>
            </div>
        </Link>
    )
}

export default UserCard