import { BiCommentDetail,BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi'
const Feed = () => {
    return (
        <div className="flex p-2 w-full justify-start bg-white border-[1px] border-gray-100 shadow-lg">
            {/**Action */}
            <div className="flex flex-col items-center justify-start px-4 py-2 ">
                <BiUpArrowAlt size={20}/>
                <span className=' font-bold text-blue-500'>50</span>
                <BiDownArrowAlt size={20}/>
            </div>
            {/**Body */}
            <div className="pb-2 flex gap-2 flex-col w-full ">
                {/**Title */}
                <div>
                    <h1 className=" font-bold text-lg tracking-wide">What does the fox Says</h1>
                </div>
                {/*Body */}
                <div className=' max-h-[200px] pr-2 overflow-y-auto'>
                    <p className=" text-gray-800 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam officia libero laborum dicta laudantium debitis expedita ratione nobis ipsa natus impedit porro, nisi accusamus exercitationem alias odio fugiat dolorum delectus quaerat fugit numquam iusto, soluta tempora? Perferendis sit excepturi veritatis quae rerum, consequuntur quasi fugit, autem earum vitae cupiditate itaque!</p>
                </div>
                {/**User */}
                <div className="border-t-[1px] pt-4 flex flex-wrap gap-2 items-center w-full justify-between">
                    <div className="flex gap-2 items-center">
                        <img className=" w-8 h-8 object-cover object-center rounded-full" src="/assets/cbProfile.jpeg" alt="" />
                        <div className=' overflow-x-auto flex flex-wrap items-center gap-2'>
                            <p className=" text-gray-500 text-sm">posted by <span className=" whitespace-nowrap font-semibold text-blue-500">Mrunal Vaidya</span></p>
                            <p className=" whitespace-nowrap text-sm">12hr ago</p>
                        </div>
                    </div>
                    <div className='flex text-gray-500 items-center gap-1'>
                        <BiCommentDetail className='' size={20} />
                        <span>50+</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Feed