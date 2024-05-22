import React, { useContext, useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { UserContext } from "../../../../context/userContext";

const ScrollableMessages = ({ messages }) => {
  const { user } = useContext(UserContext);
  const { selectedChat } = useContext(UserContext);

  const scrollableRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when component mounts
    console.log("Scrollable Ref:", scrollableRef.current);
    console.log("Scroll Height:", scrollableRef.current.scrollHeight);
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, []);

  const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  const isSameSenderMargin = (messages, m, i, userId) => {
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
  };

  // const isSameUser = (messages, m, i) => {
  //   return i > 0 && messages[i - 1].sender._id === m.sender._id;
  // };

  const filterOtherUser = (chat) => {
    const sender = chat?.users?.filter((item) => item._id === user._id);
    return sender;
  };

  return (
    <div className="flex flex-col gap-1" ref={scrollableRef}>
      {messages &&
        messages.length > 0 &&
        messages.map((m, i) => (
          <div
            key={i}
            className={`${
              filterOtherUser(selectedChat)[0]._id === m.sender._id
                ? "flex justify-end"
                : "flex"
            } `}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <div className="flex items-center gap-2">
                <img
                  src={m.sender.avatar}
                  alt={"profile"}
                  className="w-8 h-8 object-contain rounded-full"
                />
              </div>
            )}
            <p
              className={`${
                m.sender._id === user._id
                  ? "bg-gray-600 px-2 py-1 rounded-md"
                  : "bg-orange px-2 py-1 rounded-md bg-opacity-30"
              } max-w-[75%] `}
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
              }}
            >
              {m.content}
            </p>
          </div>
        ))}
    </div>
  );
};

export default ScrollableMessages;
