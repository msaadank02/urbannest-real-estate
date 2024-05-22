import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/userContext";

import axios from "axios";
import toast from "react-hot-toast";
import ChatHeader from "./singleChatComponents/ChatHeader";
import ChatContainer from "./singleChatComponents/ChatContainer";
import EmptyChat from "./singleChatComponents/EmptyChat";
import ChatForm from "./singleChatComponents/ChatForm";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

const SingleChat = ({ filterLoggedInUser }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, setUser } =
    useContext(UserContext);

  const fetchChat = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const { data } = await axios.get(`/get-messages/${selectedChat._id}`);
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Error fetching the chat");
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (msg) {
      socket.emit("stop typing", selectedChat._id);
      setMsg("");
      try {
        const { data } = await axios.post("/send-message", {
          content: msg,
          chatId: selectedChat._id,
        });

        socket.emit("new message", data);

        setMessages([...messages, data]);
        console.log(data);
      } catch (error) {
        console.error(error);
        toast.error("Error sending the message");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchChat();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const handleMsgChange = (e) => {
    setMsg(e.target.value);

    //typing indicator logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div
      className={`relative top-0 text-white ${
        !selectedChat
          ? "md:flex items-center justify-center hidden"
          : "grid grid-rows-[60px,1fr,60px]"
      } bg-gray xl:w-3/4 lg:w-3/5 md:w-2/4 w-full`}
    >
      <ChatHeader
        className={`row-start-1 row-end-2`}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        filterLoggedInUser={filterLoggedInUser}
      />
      <ChatContainer
        className={`row-start-2 row-end-3 overflow-y-scroll max-h-[70vh]`}
        loading={loading}
        selectedChat={selectedChat}
        messages={messages}
      />
      <ChatForm
        className={`row-start-3 row-end-4`}
        selectedChat={selectedChat}
        msg={msg}
        handleMsgChange={handleMsgChange}
        sendMessage={sendMessage}
        isTyping={isTyping}
      />
      <div className={`${selectedChat ? "hidden" : ""}`}>
        <EmptyChat />
      </div>
    </div>
  );
};

export default SingleChat;
