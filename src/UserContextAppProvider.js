import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./redux/reducers/socketReducer";
import { API_URL } from ".";
export const socketio = io
// const Socketurl="wss://lmpapi.handsintechnology.in"

// eslint-disable-next-line
const UserContext = React.createContext();
const UserContextAppProvider = ({ children }) => {
  const { socket: Socket, visitor } = useSelector(
    (state) => state.SocketReducer
  );
  const dispatch = useDispatch();
  const [UserData, setUserData] = useState({});
  const [Visitor, setVisitor] = useState(visitor);
  const [usertoken, setToken] = useState(null);
  const [ws_login, setWslogin] = useState(null);
  const Logout = () => {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userdata");
    setToken(null);
    window.location.replace("/");
  };
  useEffect(() => {
    const usertoken = localStorage.getItem("usertoken"); // Get the user token
    setToken(usertoken); // Set the user token in state
    if (usertoken) {
      console.log("kuchh  chal raha hai")
      getUserProfile(usertoken); // Pass the token to the function
    } else {
      console.log("kuchh nahi chal raha hai")
      //  getUserByIp()

    }
  }, []); // Keep [usertoken] in the dependency array
  useEffect(() => {
    Socket && Socket.on("message", (data) => {
      //console.log("message comes",data)
    });
  }, [])
  const getUserProfile = async (usertoken) => {
    if (usertoken) {
      try {
        await axios.get(API_URL + "/api/getCustomerProfile",{
          headers: {
            Authorization: `Bearer ${usertoken}`,
          },
        }).then((response) => {
          console.log({ response });

          setUserData(response?.data?.data);
          //  const newSocket = io(Socketurl, {
          //    query: {
          //      Userid: response?.data?.data?._id,
          //      usertype: "client",
          //      token: usertoken,
          //      username: response?.data?.data?.full_name,
          //    },
          //  });
          //  localStorage.removeItem("visitor")
          //  dispatch(
          //    setUserDetails({
          //      Userid: response?.data?.data?._id,
          //      usertype: "client",
          //      socket: newSocket,
          //      visitor: null,
          //      username: response?.data?.data?.full_name,
          //    })
          //  );
          // No need to setToken here, you've already done it in the useEffect
        }).catch((error) => {
          if (error?.response?.status === 401) {
            swal({
              title: "Error!",
              text: "Session Expired",
              type: "error",
              icon: "error",
            }).then(function () {
              Logout();
            });
          }
        })

      } catch (error) {
        //console.log({ error });
        if (error?.response?.status === 401) {
          swal({
            title: "Error!",
            text: "Session Expired",
            type: "error",
            icon: "error",
          }).then(function () {
            Logout();
          });
        }
      }
    } else {
      setToken(null);
    }
  };
  const state = {
    UserData,
    usertoken,
    Logout,
    setToken,
    setUserData,
  };
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
const UseUserContext = () => {
  return useContext(UserContext);
};
export { UserContext, UserContextAppProvider, UseUserContext };
