import EditUserModal from "@/components/EditUserModal";
import Pagination from "@/components/Pagination/Pagination";
import { useBanUserMutation, useGetUsersQuery, useUnbanUserMutation } from "@/feature/Admin/adminApi";
import { selectAdmin } from "@/feature/Admin/adminSelector";
import { useDebounce } from "@/hook/useDebounce";
import { usePagination } from "@/hook/usePagination";
import logger from "@/utils/logger";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function Users() {
    const { currentPage, goTo, reset  } = usePagination();
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [editingUser, setEditingUser] = useState(null);

    const debouncedSearch = useDebounce(search, 400);
    const {data, isLoading, isError} = useGetUsersQuery({ page: currentPage, search: debouncedSearch })
    const [banUser] = useBanUserMutation();
    const [unbanUser] = useUnbanUserMutation();

    const handleSearch = (e) => {
        setSearch(e.target.value);
        reset();
    };

    if(isLoading) return <span>đang tải</span>

    const handleBan = async (id) => {
        try {
            await banUser(id).unwrap()
            toast.success("Ban thành công")
        } catch (err) {
            toast.error(err?.data?.error || "lỗi không xác định")
            logger.log(err)
        }
    }

    const handleUnBan = async (id) => {
        try {
            await unbanUser(id).unwrap()
            toast.success("unban thành công")
        } catch (err) {
            toast.error(err?.data?.error || "lỗi không xác định")
            logger.log(err)
        }
    }

    const filteredUsers = data?.users?.filter(user => {
        if (filterStatus === "banned") return user.status === "BAN";
        if (filterStatus === "active") return user.status === "ACTIVE";
        return true;
    }) ?? [];


    return (
        <div className="p-3 flex flex-col gap-5 h-full">
            <header>
                <h1 className="text-2xl">Quản lí người dùng</h1>
                <span className="text-sm opacity-80">Tất cả người dùng</span>
            </header>
            {/* Toolbar */}
            <div className="flex gap-3 items-center flex-wrap">
                <input
                    type="text"
                    placeholder="Tìm theo tên, email, số điện thoại..."
                    value={search}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-40 md:w-70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="all">Tất cả</option>
                    <option value="active">Đang hoạt động</option>
                    <option value="banned">Đã bị khóa</option>
                </select>
                <span className="text-sm text-gray-500 ml-auto">
                    {data?.pagination?.total ?? 0} người dùng
                </span>
            </div>

            <div className="border  border-gray-200">
                <table className="text-sm w-full ">
                    <thead className="bg-gray-50 text-gray-600 ">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Người dùng</th>
                            <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Số điện thoại</th>
                            <th className="text-left px-4 py-3 font-medium">Vai trò</th>
                            <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Trạng thái</th>
                            <th className="text-left px-4 py-3 font-medium">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-400">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-400">
                                    Không có người dùng nào
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map(user => (
                                <tr key={user.id} className={`hover:bg-gray-50 ${user.status === "BAN" ? "bg-red-50" : ""}`}>
                                    <td className="px-4 py-3 max-w-0">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="min-w-0">
                                                <p className="font-medium text-gray-900 hidden md:table-cell">{user.name}</p>
                                                <p className="text-gray-400 text-xs truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{user.phonenumber}</td>
                                    <td className="px-4 py-3 ">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                            user.role === "ADMIN"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-gray-100 text-gray-600"
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                            user.status === "BAN"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-700"
                                        }`}>
                                            {user.status === "BAN" ? "Đã khóa" : "Hoạt động"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button  onClick={() => setEditingUser(user)} className="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700">
                                                Sửa
                                            </button>
                                            {user.status === "BAN" ? (
                                                <button
                                                    onClick={() => handleUnBan(user.id) }
                                                    className="px-3 py-1 text-xs border border-green-300 rounded-md hover:bg-green-50 text-green-700"
                                                >
                                                    Mở khóa
                                                </button>   
                                            ) : (
                                                <button
                                                    onClick={() => handleBan(user.id)}
                                                    disabled={user.role === "ADMIN"}
                                                    className={`px-3 py-1 text-xs border rounded-md transition
                                                        ${
                                                            user.role === "ADMIN"
                                                                ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-400 bg-gray-100"
                                                                : "border-red-300 text-red-600 hover:bg-red-50"}`}
                                                    >
                                                    Khóa
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {editingUser && (
                <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} />
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={data?.pagination.totalPages}
                totalItems={data?.users.length}
                limit={20}
                onPageChange={goTo}
            />
        </div>
    );
}

export default Users