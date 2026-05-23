import { createContext, useContext, useEffect, useRef, useState } from "react";
import { connectSocket, disconnectSocket } from "@/socket/socket";
import { useDispatch, useSelector } from "react-redux";
import logger from "@/utils/logger";
import { selectAdmin, selectTOken } from "@/feature/Admin/adminSelector";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const admin = useSelector(selectAdmin)
    const token = useSelector(selectTOken)
    const dispatch = useDispatch()
    const [socket, setSocket] = useState(null);
    const isConnectedRef = useRef(false)

    useEffect(() => {
        if (!admin || !token) return;

        if (isConnectedRef.current) return;

        const s = connectSocket(token);

        s.on("connect", () => {
            logger.log("Socket connected:", s.id);
            isConnectedRef.current = true
            setSocket(s);
        });

        s.on("disconnect", () => {
            logger.log("Socket disconnected");
            isConnectedRef.current = false
            setSocket(null);
        });

        if (s.connected) {
            isConnectedRef.current = true
            setSocket(s);
        }

        return () => {
            s.off("connect");
            s.off("disconnect");
        };
    }, [admin?.id, token]);

    useEffect(() => {
        if (!admin) {
            disconnectSocket()
            isConnectedRef.current = false
            setSocket(null)
        }
    }, [admin])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);