import React, { useState } from "react";
import "./Emailbox.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../..";
const EmailBox = ({ message }) => {
  const dispatch = useDispatch();
  const { socket, Userid, usertype } = useSelector(
    (state) => state.SocketReducer
  );
  // Validate Email Id
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [Email, setEmail] = useState(null);
  const OnSubmitEmail = async (e) => {
     e.preventDefault();
    if (!Email) {
      return swal({
        title: "Warning!",
        text: "Please enter  Email",
        type: "warning",
        icon: "warning",
      });
    } else if (!emailRegex.test(Email)) {
      swal({
        title: "Error!",
        text: "Please enter valid Email",
        type: "error",
        icon: "error",
      });
    } else if (emailRegex.test(Email)) {
      await axios
        .get(
          API_URL +
            "/api/verifychatemail?email=" +
            Email +
            "&userid=" +
            Userid +
            "&usertype=" +
            usertype
        )
        .then((response) => {
          //console.log(response.data);
          if (response.status === 200) {
            localStorage.setItem(
              "verifyemail",
              JSON.stringify({ verifyemail: true })
            );
             swal(
               "Success",
               response.data.message,
               "success"
             );
          }
        })
        .catch((error) => {
          localStorage.setItem(
            "verifyemail",
            JSON.stringify({ verifyemail: false })
          );
            swal({
              title: "Error!",
              text: error.response.data.message
                ? error.response.data.message
                : "Please enter valid Email",
              type: "error",
              icon: "error",
            });
          //console.log("errroror", error);
        });
     
    }
   
  };
  const handleEnter = (e) => (e.keyCode === 13 ? OnSubmitEmail() : "");
  return (
    <div className="message-body">
      <span className="chaport-email-request-label ">{message}</span>
      <div className="chaport-email-request-input-wrapper chaport-input-wrapper-not-focused not-empty">
        <input
          title=""
          placeholder="name@example.com"
          rows={1}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="chaport-email-request-input"
          onKeyDown={handleEnter}
        />
        <div className="chaport-email-send-button ">
          <div className="chaport-email-send-icon" />
          {/* <div className="chaport-email-success-icon" /> */}
          <button type="submit" onClick={OnSubmitEmail}>
            Send Email
          </button>
        </div>
        <div className="email-request-success" />
        <div className="email-request-edit-button">edit</div>
      </div>
    </div>
  );
};

export default EmailBox;
