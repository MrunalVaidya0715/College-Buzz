import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PostSkeleton = () => {
    return (
        <div className="px-4 py-2 bg-white border-[1px] flex flex-col w-full gap-2">

            {/**User, time */}
            <div className=" flex gap-2 items-center">
                <Skeleton circle className='w-8 h-8' />
                <Skeleton className='w-24' />
            </div>
            {/* Category , Title*/}
            <Skeleton className='h-full w-[50%]' />

            {/* Desc */}
            <div className='mt-2'>
                <Skeleton count={3} />
            </div>
            {/*Actions */}
            <div >
                <Skeleton className='w-20 h-8' />
            </div>

        </div>
    )
}

export default PostSkeleton