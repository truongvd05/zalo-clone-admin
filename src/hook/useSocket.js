import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStats } from "@/feature/Stats/statsSlice";
import { adminApi } from "@/feature/Admin/adminApi";
import { getSocket } from "@/socket/socket";

export function useAdminSocket() {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        socket.emit("join-admin");

        socket.on("dashboard:stats", (data) => {
            dispatch(setStats(data));
        });

        socket.on("user:created", () => {
            dispatch(adminApi.util.invalidateTags(["Users"]));
        });

        socket.on("group:created", () => {
            dispatch(adminApi.util.invalidateTags(["Groups"]));
        });

        return () => {
            socket.off("dashboard:stats");
            socket.off("user:created");
            socket.off("group:created");
        };
    }, [dispatch]);
}
