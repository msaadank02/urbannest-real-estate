import React, { useContext, useEffect, useState } from "react";
import monster from "../../assets/Images/monster.png";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import Loader from "../Loader";

const AllChats = ({ filterLoggedInUser }) => {
  // const [sender, setSender] = useState(null);

  const {
    user,
    loading,
    setLoading,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  } = useContext(UserContext);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/fetch-chats");
      if (data.error) {
        setLoading(false);
        toast.error(data.error);
      }
      setLoading(false);
      setChats(data);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage))
    fetchChats();
  }, []);
  console.log(selectedChat);
  console.log(chats);

  console.log(chats.length);

  return (
    <div
      className={`text-white lg:w-2/5 xl:w-1/4 md:w-2/4 w-full py-5 sm:px-7 px-3 ${
        selectedChat ? "hidden md:block" : ""
      }`}
    >
      <h1 className="font-bold text-2xl">Inbox</h1>
      <div className="flex flex-col mt-5 ml-3">
        {loading && (
          <div className="flex justify-center items-center gap-5 mt-5">
            <Loader width={"w-[30px]"} />
            Loading chats
          </div>
        )}
        {chats &&
        chats.length > 0 &&
        chats?.[0]?.users.length > 1 &&
        !loading ? (
          chats.map((chat, index) => (
            <ChatCard
              className={`${selectedChat === chat ? "bg-gray-600" : ""}`}
              onClick={() => setSelectedChat(chat)}
              image={filterLoggedInUser(chat)[0].avatar}
              username={filterLoggedInUser(chat)[0].username}
              key={index}
            />
            // <p key={index}>{chat?.users?.[1]?.username}</p>
          ))
        ) : !loading && chats.length === 0 ? (
          <p>No chats</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AllChats;

const ChatCard = ({ image, username, onClick, className }) => {
  return (
    <div
      className={`flex gap-5 border-b-2 border-b-gray py-3 px-3 rounded cursor-pointer ${className}`}
      onClick={onClick}
    >
      <img src={image} alt="" className="rounded-full w-10 h-10" />
      <div>
        <h3 className="font-semibold text-lg">{username}</h3>
        <p className="text-light-gray text-xs">latest message</p>
      </div>
    </div>
  );
};
