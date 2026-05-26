import Sidebar from "@/components/Sidebar"
import { selectAdmin } from "@/feature/Admin/adminSelector"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function DefaultLayout() {
    const admin = useSelector(selectAdmin)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    if(!admin) {
        return <Navigate to="/login" replace/>
    }

    return (
        <div className="h-screen bg-mist-100 flex flex-col">
            <div className="">
                <button
                    className="p-3 lg:hidden sti"
                    onClick={() => setSidebarOpen(true)}
                >
                    <i className="fa-solid fa-bars text-2xl"></i>
                </button>   
            </div>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex flex-col lg:ml-70 flex-1">
                <Outlet/>
            </div>
        </div>
    )
}

export default DefaultLayout