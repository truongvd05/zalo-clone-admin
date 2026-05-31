import StatCard from "@/components/StatCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetTodayStatsQuery } from "@/feature/Admin/adminApi";
import { setStats } from "@/feature/Stats/statsSlice";
import { selectStats } from "@/feature/Stats/statsSelector";
import { useAdminSocket } from "@/hook/useAdminSocket";

function DashBoard() {
    const dispatch = useDispatch();
    useAdminSocket();

    // Gọi API 1 lần lúc load — seed data ban đầu
    const { data, isLoading } = useGetTodayStatsQuery();

    // Khi API trả về thì đẩy vào redux — sau đó socket tự cập nhật
    useEffect(() => {
        if (data) {
            dispatch(setStats(data));
        }
    }, [data, dispatch]);

    const { newUsersToday, messagesToday, groupsToday, totalUsers} = useSelector(selectStats);

    if (isLoading) return <div>Đang tải...</div>;

    return (
        <div className="p-5 flex flex-col gap-5">
            <header>
                <h1 className="text-2xl"> Dashboard</h1>
                <span className="text-sm opacity-80"> Thống kê ngày hôm nay </span>
            </header>
            <div className="flex gap-5 flex-col sm:flex-row">
                <StatCard label="Tổng người dùng" value={totalUsers} />
                <StatCard label="Người dùng hôm nay" value={newUsersToday} />
                <StatCard label="Tin nhắn hôm nay"   value={messagesToday} />
                <StatCard label="Nhóm tạo mới"        value={groupsToday} />
            </div>
        </div>
    );
}

export default DashBoard;