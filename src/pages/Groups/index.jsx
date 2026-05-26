import Pagination from "@/components/Pagination/Pagination";
import RenameModal from "@/components/RenameGroupModal";
import {
    useGetGroupsQuery,
    useUpdateGroupMutation,
} from "@/feature/Admin/adminApi";
import { useDebounce } from "@/hook/useDebounce";
import { usePagination } from "@/hook/usePagination";
import logger from "@/utils/logger";
import { useState } from "react";
import { toast } from "sonner";


function Groups() {
    const { currentPage, goTo, reset } = usePagination();
    const [edittingGroup, setEdittingGroup] = useState(null);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const debouncedSearch = useDebounce(search, 400);

    const { data, isLoading } = useGetGroupsQuery({
        page: currentPage,
        search: debouncedSearch,
    });

    const handleSearch = (e) => {
        setSearch(e.target.value);
        reset();
    };

    const [updateGroup] = useUpdateGroupMutation();

    const handleLock = async (id) => {
        try {
            await updateGroup({ id, body: { status: "LOCKED" } }).unwrap();
            toast.success("Khóa nhóm thành công");
        } catch (err) {
            logger.log(err);
            toast.error("Có lỗi xảy ra");
        }
    };

    const handleUnlock = async (id) => {
        try {
            await updateGroup({ id, body: { status: "ACTIVE" } }).unwrap();
            toast.success("Mở khóa nhóm thành công");
        } catch (err) {
            logger.log(err);
            toast.error("Có lỗi xảy ra");
        }
    };

    const handleRename = async (id, title) => {
        try {
            await updateGroup({ id, body: { title } }).unwrap();
            toast.success("Đổi tên nhóm thành công");
            setEdittingGroup(null);
        } catch (err) {
            logger.log(err);
            toast.error("Có lỗi xảy ra");
        }
    };

    if (isLoading) return <span>Đang tải...</span>;

    const filteredGroups =
        data?.groups?.filter((group) => {
            if (filterStatus === "locked") return group.status === "LOCKED";
            if (filterStatus === "active") return group.status === "ACTIVE";
            return true;
        }) ?? [];

        console.log(filteredGroups);
        
    return (
        <div className="p-5 flex flex-col gap-5 min-h-screen">
            {edittingGroup && (
                <RenameModal
                    group={edittingGroup}
                    onClose={() => setEdittingGroup(null)}
                    onSave={handleRename}
                />
            )}

            <header>
                <h1 className="text-2xl">Quản lí nhóm</h1>
                <span className="text-sm opacity-80">Tất cả nhóm chat</span>
            </header>

            {/* Toolbar */}
            <div className="flex gap-3 items-center flex-wrap">
                <input
                    type="text"
                    placeholder="Tìm theo tên nhóm..."
                    value={search}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="all">Tất cả</option>
                    <option value="active">Hoạt động</option>
                    <option value="locked">Đã khóa</option>
                </select>
                <span className="text-sm text-gray-500 ml-auto">
                    {data?.pagination?.total ?? 0} nhóm
                </span>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Nhóm</th>
                            <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Ngày tạo</th>
                            <th className="text-left px-4 py-3 font-medium">Thành viên</th>
                            <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Trạng thái</th>
                            <th className="text-left px-4 py-3 font-medium">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {filteredGroups.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-gray-400">
                                    Không có nhóm nào
                                </td>
                            </tr>
                        ) : (
                            filteredGroups.map((group) => (
                                <tr
                                    key={group.id}
                                    className={`hover:bg-gray-50 ${group.status === "LOCKED" ? "bg-red-50" : ""}`}
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <p className="font-medium text-gray-900">{group.title}</p>
                                                <p className="text-gray-400 text-xs">{group.creator?.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                            {group.createdAt}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {group._count.participants} thành viên
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                group.status === "LOCKED"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            {group.status === "LOCKED" ? "Đã khóa" : "Hoạt động"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEdittingGroup(group)}
                                                disabled={group.type !== "GROUP"}
                                                className={`px-3 py-1 text-xs border rounded-md ${
                                                    group.type === "GROUP"
                                                        ? "border-gray-300 hover:bg-gray-50 text-gray-700"
                                                        : "border-gray-200 text-gray-400 cursor-not-allowed"
                                                }`}
                                            >
                                                Đổi tên
                                            </button>
                                            {group.status === "LOCKED" ? (
                                                <button
                                                    onClick={() => handleUnlock(group.id)}
                                                    className="px-3 py-1 text-xs border border-green-300 rounded-md hover:bg-green-50 text-green-700"
                                                >
                                                    Mở khóa
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleLock(group.id)}
                                                    className="px-3 py-1 text-xs border border-red-300 rounded-md hover:bg-red-50 text-red-600"
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

            {data && <Pagination
                currentPage={currentPage}
                totalPages={data?.pagination?.totalPages}
                totalItems={data?.groups?.length}
                limit={20}
                onPageChange={goTo}
            />}
        </div>
    );
}

export default Groups;