import { BsFilterLeft } from 'react-icons/bs'
import { BiSort } from 'react-icons/bi'
const FilterSort = () => {
    return (
        <div className="z-[50] sticky -top-2 p-1 flex gap-2 sm:gap-4 mb-2 items-center justify-between w-full bg-white/50 backdrop-blur-sm">
            <div className="flex gap-1 w-full">
                <div className="bg-white px-2 border-[1px] flex gap-1 items-center rounded-md">
                    <BsFilterLeft size={20} />
                    <p className="hidden sm:block text-sm">Filter</p>
                </div>
                <select className='w-full cursor-pointer border-[1px] p-2 rounded-md' name="cat" defaultValue="All">
                    <option value="">All</option>
                    <option value="general">General</option>
                    <option value="technology">Technology</option>
                    <option value="sports">Sports</option>
                    <option value="faculty">Faculty</option>
                    <option value="exams">Examinations</option>
                    <option value="canteen">Canteen</option>
                </select>
            </div>
            <div className="flex gap-1 w-full">
                <div className="bg-white px-2 border-[1px] flex gap-1 items-center rounded-md">
                    <BiSort size={16} />
                    <p className="hidden sm:block text-sm whitespace-nowrap">Sort by</p>
                </div>
                <select className='w-full cursor-pointer border-[1px] p-2 rounded-md' name="sort" defaultValue="Newest">

                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>

                </select>
            </div>
        </div>
    )
}

export default FilterSort