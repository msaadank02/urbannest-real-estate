import axios from "axios";
import { createContext, useState, useEffect } from "react";
import useFetch from "../src/useFetch";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/profile");
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    // Fetch user only when data changes
    if (!user) {
      fetchUser();
    }
  }, [user]); // Include user in the dependency array if necessary
  console.log(user);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
