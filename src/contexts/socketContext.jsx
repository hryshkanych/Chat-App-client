import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useUserContext } from "./userContext";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:3000/", {
        query: {
          userId: user.id,
        },
      });

      setSocket(socket);

      socket.on("updateUserList", (users) => {
        console.log(users);
        setOnlineUsers(users);
        console.log(onlineUsers);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
