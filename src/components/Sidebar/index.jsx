import { logOut } from "@/feature/Admin/adminSlice";
import { useLogoutMutation } from "@/feature/Auth/authApi";
import logger from "@/utils/logger";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"

const items = [
    {title: "DashBoard", icon: "fa-solid fa-table-list", to: "dash-board"},
    {title: "Người dùng", icon: "fa-solid fa-user-group" , to: "users"},
    {title: "Nhóm chat", icon: "fa-solid fa-users" , to: "groups"},
]

export default function Sidebar({ open, onClose }) {
    const [settingOpen, setSettingOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logout] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            await logout().unwrap()
            dispatch(logOut())
            navigate("/login")
        } catch (err) {
            logger.error(err)
            dispatch(logOut())
            navigate("/login")
        }
    }

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={`
                fixed top-0 left-0 h-full z-30 flex flex-col w-70 bg-white
                transition-transform duration-300
                lg:translate-x-0
                ${open ? "translate-x-0" : "-translate-x-full"}
            `}>
                <header className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-2">
                        <i className="fa-regular fa-comment text-2xl"></i>
                        <div>
                            <h1 className="text-lg">ZaloAdmin</h1>
                            <span className="text-xs text-gray-500">CMS v1.0</span>
                        </div>
                    </div>
                    {/* Icon X - chỉ hiện dưới md */}
                    <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 transition-all lg:hidden">
                        <i className="fa-solid fa-xmark text-xl text-gray-500"></i>
                    </button>
                </header>

                <nav className="flex flex-col gap-1 p-2">
                    {items.map((item) => (
                        <NavLink
                            key={item.title}
                            to={item.to}
                            onClick={onClose}
                            className={({ isActive }) => `
                                flex items-center gap-3 rounded-md px-4 py-3 transition-all
                                hover:bg-gray-100
                                ${isActive
                                    ? "border-l-4 border-blue-500 bg-gray-100 text-blue-600 font-medium"
                                    : "border-l-4 border-transparent"
                                }`}
                        >
                            <i className={item.icon}></i>
                            <span>{item.title}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-2 border-t relative mt-auto">
                    {settingOpen && (
                        <div className="absolute bottom-full left-2 right-2 mb-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
                            >
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => setSettingOpen(prev => !prev)}
                        className={`w-full flex items-center gap-3 rounded-md px-4 py-3 transition-all hover:bg-gray-100 border-l-4
                            ${settingOpen ? "border-blue-500 bg-gray-100 text-blue-600" : "border-transparent"}`}
                    >
                        <i className="fa-solid fa-gear"></i>
                        <span>Cài đặt</span>
                        <i className={`fa-solid fa-chevron-up ml-auto text-xs transition-transform ${settingOpen ? "" : "rotate-180"}`}></i>
                    </button>
                </div>
            </aside>
        </>
    )
}