import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Moment from "react-moment";
import { UseUserContext, socketio } from "../../UserContextAppProvider";
// import "./contact.css";
import "./notification.css";
import axios from "axios";
// import
import { API_URL } from "../..";
import { useDispatch, useSelector } from "react-redux";
import TypinIndicator from "./TypinIndicator";
import EmailBox from "./EmailBox";

const ChatRoom = () => {
  const { usertoken, UserData } = UseUserContext();
  const {
    socket: Socket,
    visitor,
    Userid,
    username,usertype
  } = useSelector((state) => state.SocketReducer);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const [unreadMessages, setunreadMessages] = useState([]);
  const [OnlineUsersList, setOnlineUsersList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [Typeing, setTypeing] = useState({});
  const [isTyping, seisTyping] = useState(false);
  const [Visitor, setVisitor] = useState(visitor);
  const [NotificationCount, setNotificationCount] = useState(
    localStorage.getItem("notificationcount")
  );
  const lastDivRef = useRef(null);
  useEffect(() => {
    GetAllmessages();
  }, [Userid]);
  useEffect(() => {
    Socket &&
      Socket.on("notifytouserfromagent", (data) => {
        localStorage.setItem("notificationcount", data.notificationcount);
        setNotificationCount(data?.notificationcount);
        console.log("notifytouserfromagent", data);
      });
    if (isOpen) {
      localStorage.removeItem("notificationcount");
      setNotificationCount(0);
         filterMessage();
         console.log({ unreadMessages });
         unreadMessages.length > 0 && UpdateMessages(unreadMessages);
    }
  
  }, [Socket, NotificationCount, isOpen, Userid]);

  useEffect(() => {
    const messageListener = (newMessage) => {
      console.log("new message>>>>>>>>>>>>>",newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    };
    const TypingListener = (data) => {
      setTypeing(data);
    };

    const OnlineUsersListener = (newMessage) => {
      const uniqueAuthors = newMessage.reduce((accumulator, current) => {
        if (!accumulator.find((item) => item.Userid === current.Userid)) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);
      setOnlineUsersList(uniqueAuthors);
    };

    Socket && Socket.on("message", messageListener);
    Socket && Socket.on("email", messageListener);
    Socket && Socket.on("usertyping", TypingListener);
    Socket && Socket.on("online_users", OnlineUsersListener);
    Socket && Socket.on("connect", () => {});
    Socket && Socket.on("disconnect", () => {});
    Socket && Socket.on("error", (error) => console.log("Client error", error));
    Socket &&
      Socket.emit("istyping", {
        isTyping,
        Roomid: Userid,
        usertype: usertype,
        userid: Userid,
        username: username,
      })

    return () => {
      Socket && Socket.off("message", messageListener);
      Socket && Socket.off("email", messageListener);
      Socket && Socket.off("usertyping", messageListener);
      Socket && Socket.off("online_users", OnlineUsersListener);
    };
  }, [Socket, Userid, isTyping, username, usertype]);

   const filterMessage=()=>{
     setunreadMessages(
       messages.filter((item) => {
         if (
           item.usertype !== "client" ||
           item.usertype !== "ws_login" &&
           item.read === false
         ) {
           return { usertype: item.usertype, read: true, time: item.time };
         }
       })
     );
   }
  const UpdateMessages = async (unreadMessages) => {
    if (unreadMessages.length > 0) {
      // Listen for changes to the chat messages
      await axios
        .post(API_URL + "/api/updateMessages", {
          readMessages: unreadMessages,
        })
        .then((response) => {
          console.log("updated messages>>>>>>", response.data.data);
          let updateMessages = response.data.data;
          Socket &&
            Socket.emit("message-read", { Roomid: Userid, updateMessages });
        })
        .catch((error) => {
          ;
        });
    }
  };
  const GetAllmessages = async () => {
    if (Userid) {
      // Listen for changes to the chat messages
      axios
        .get(API_URL + "/api/getallmessages?Roomid=" + Userid)
        .then((snapshot) => {
          const chatData = snapshot.data.data;
          if (chatData) {
            // Sort the messages by date
            chatData.sort((a, b) => {
              return a.time - b.time;
            });
            setMessages(chatData);
            setMessage("");
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  };

  const handleChange = (e) => {
    
    setMessage(e.target.value);
    seisTyping(true);
  };
  const handleEnter = (e) => (e.keyCode === 13 ? onSubmit() : "");

  const onSubmit = async () => {
    let usertypeadmin = OnlineUsersList.find(
      (item) => item.usertype !== "client" && item.usertype !== "ws_login"
    );
    if (
      (Userid && message.trim() !== "") ||
      (Visitor && message.trim() !== "")
    ) {
      const newMessage = {
        msg: message,
        usertype: usertype,
        username: username,
        Roomid: Userid,
        time: Date.now(),
        read: usertypeadmin ? true : false,
        userid: Userid,
      };
      setMessage("");
      if (Socket) {
        Socket.emit("message", newMessage);
      }
      await axios
        .post(`${API_URL}/api/savemessage`, newMessage)
        .then((r) => r)
        .catch((error) => error);
    }
  };
  const connectUser = async () => {
    if (usertoken) {
      setIsOpen(!isOpen);
      Socket &&
        Socket.emit("joinRoom", {
          userid: Userid,
          usertype: usertype,
          username: UserData?.full_name,
          Roomid: Userid,
          location: window.location.pathname.replace("/",""),
        });
    } else if (!usertoken && visitor) {
   
      setIsOpen(!isOpen);
      Socket &&
        Socket.emit("joinRoom", {
          userid: Userid,
          usertype: usertype,
          username: visitor,
          Roomid: Userid,
          location: window.location.pathname,
        });
    }
  };
  const handleScroll = () => {
    if (lastDivRef.current) {
      lastDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };
  const handleBlur = () => {
    seisTyping(false);
  };
  
  return (
    <>
      {isOpen ? (
        <div
          className="chat_room_abcds mobilechat_screen"
          ref={lastDivRef}
          style={{
            zIndex: "999",
            width: "24%",
            position: "fixed",
            right: "0",
            bottom: "0",
          }}
          // ref={msgBoxRef}
        >
          <div className="shadow mobile_screen bg-white text-dark border rounded">
            <div className="black1">
              <div class1Name="text-center px-3 mb-4 text-capitalize">
                <a onClick={() => setIsOpen(false)} className=" mb-4 ">
                  <i className="fa fa-times" aria-hidden="true"></i>
                </a>

                <hr></hr>
              </div>
            </div>
            <button onClick={handleScroll}>Bottom</button>
            <div>
              {OnlineUsersList.length > 0 && (
                <>
                  {OnlineUsersList.map((item, index, array) => (
                    <span key={item.Userid}>
                      {index !== array.length - 1
                        ? index
                          ? ", "
                          : ""
                        : array.length === 1
                        ? ""
                        : " and "}
                      {item.Userid === Userid ? "You" : item.username}
                    </span>
                  ))}
                </>
              )}
            </div>
            <div
              className="bg-light border rounded p-3 mb-4"
              // style={{ height: "450px", overflowY: "scroll" }}
              style={{ overflowY: "auto", height: "450px" }}
            >
              {" "}
              {messages.map((msg, index) => {
                return (
                  <>
                    <div className="key" key={msg._id}>
                      {msg.usertype !== "client" &&
                      msg.usertype !== "ws_login" &&
                      msg.usertype !== "email" ? (
                        <div className="row justify-content-end pl-5 ">
                          <div className="d-flex flex-column align-items-end m-2 shadow p-2 bg-info border rounded w-auto">
                            <div>
                              <span>
                                {msg.username}({msg.usertype})
                              </span>
                              <strong className="m-1">{msg.name}</strong>
                              <small className="text-muted m-1">
                                <Moment format="h:mm A">{msg.time}</Moment>
                              </small>
                            </div>
                            <h4 className="m-1">{msg.msg}</h4>
                          </div>
                        </div>
                      ) : msg.usertype === "email" && usertype !== "client" ? (
                        <EmailBox message={msg.msg} />
                      ) : (
                        <></>
                      )}

                      {msg.usertype === "ws_login" ||
                      msg.usertype === "client" ? (
                        <div className="row justify-content-start">
                          <div className="d-flex flex-column m-2 p-2 shadow bg-white border rounded w-auto">
                            <div>
                              <strong className="m-1">{msg.username}</strong>
                              <small className="text-muted m-1">
                                <Moment format="h:mm A">{msg.time}</Moment>
                              </small>
                            </div>
                            <h4 className="m-1">{msg.msg}</h4>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                );
              })}
              <TypinIndicator Typeing={Typeing} />
            </div>
            <div className="form-group d-flex">
              <input
                type="text"
                className="form-control bg-light"
                name="message"
                onKeyDown={handleEnter}
                placeholder="Type your message"
                value={message}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <button
                type="button"
                className="chat-btn btn-warning mx-2"
                onClick={onSubmit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="float_button_chat">
          <div>
            {NotificationCount > 0 && (
              <span className="notification-label notification-label-red">
                {NotificationCount}
              </span>
            )}
            <img
              src="https://img1.wsimg.com/dc-assets/live-engage/images/chat-baloon-dark.svg"
              alt=""
            />
            <a onClick={connectUser} className="sc-hKMtZM fkfNyW">
              Chat With Us
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoom;
