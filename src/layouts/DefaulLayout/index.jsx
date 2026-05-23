import Sidebar from "@/components/Sidebar"
import { selectAdmin } from "@/feature/Admin/adminSelector"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function DefaultLayout() {
    const admin = useSelector(selectAdmin)
    if(!admin) {
        return <Navigate to="/login" replace/>
    }
    return (
        <div className="flex h-screen overflow-hidden bg-mist-100 w-screen">
            <div className="w-70 h-full bg-white p-5">
                <Sidebar/>
            </div>
            <div className="flex-1">
                <Outlet/>
            </div>
        </div>
       
    )
}

export default DefaultLayout