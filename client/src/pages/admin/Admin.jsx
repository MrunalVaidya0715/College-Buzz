import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const Admin = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="w-full min-h-screen bg-blue-50 flex justify-center">
      <div className={`flex flex-1 ${isMobile ? "flex-col" : "flex-row"}`}>
        {
          isMobile ? <AdminNavbar /> : <AdminSidebar />
        }
        <div className="flex-1 border-2 overflow-y-auto scrollbar-none h-full w-full flex flex-col  p-2 scroll-smooth">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Admin