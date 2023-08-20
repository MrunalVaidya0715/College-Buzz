import { Outlet } from "react-router-dom"

const Admin = () => {
  return (
    <div className="pt-16 w-full h-screen bg-blue-50 flex justify-center">
            <div className=" w-full max-w-[1200px] flex lg:gap-4 justify-between">

                <div className=" overflow-y-auto scrollbar-none h-full w-full flex flex-col  p-2 scroll-smooth">
                    <Outlet />
                </div>

            </div>
        </div>
  )
}

export default Admin