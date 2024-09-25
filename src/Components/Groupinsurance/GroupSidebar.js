import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../..";
import swal from "sweetalert";
import { UseUserContext } from "../../UserContextAppProvider";
import { useDispatch } from "react-redux";
import { Accordion } from "react-bootstrap";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const GroupSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [moredetails, setMoreDetails] = useState();
  const [policyData, setPolicyData] = useState([]);
  const [pendingPolicyData, setPendingPolicyData] = useState([]);
  const [renewalPolicyData, setRenewalPolicyData] = useState([]);
  const [claimsData, setClaimsData] = useState([]);
  const [policyOffers, setPolicyOffers] = useState([]);
  const [cancelledPolicies, setCancelledPolicies] = useState([]);
  const [show, setShow] = useState(false);
  const [filedata, setFiledata] = useState("");
  const [loader, setLoader] = useState(false);
  const [usertoken, setToken] = useState(null);
  const [userData, setUserData] = useState([]);

  const token = localStorage.getItem("usertoken");
  useEffect(() => {
    if (token === null || token === undefined || token === "") {
      navigate("/login");
    } else {
      setToken(token);
      getAllCompletePolicy();
      getAllPendingPolicy();
      getAllRenewalPolicy();
      getAllClaims();
      getAllOffers();
      getAllCancelledPolicy();
      
    }
  }, []);

  useEffect(() => {
    getAllCompletePolicy();
    getAllPendingPolicy();
    getAllRenewalPolicy();
    getAllClaims();
    getAllOffers();
    getAllCancelledPolicy();
    getUserProfile();
  }, [usertoken]);


  const Logout = () => {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userdata");
    setToken(null);
    window.location.replace("/");
  };

  const getUserProfile = async () => {
    if (token) {
      try {
        await axios
          .get(API_URL + "/api/getCustomerProfile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            //console.log(response.data.data, "response"); 

            setUserData(response?.data?.data);
          });
      } catch (error) {
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

  const getAllCompletePolicy = () => {
    try {
      setLoader(true);
      axios
        .get(API_URL + "/api/getAllCompletePolicy")
        .then((result) => {
          setPolicyData(result.data?.data);
          //console.log(result.data.data, "complete policy");
          setLoader(false);
        })
        .catch((err) => {
          //console.log(err.message)
          setLoader(false);
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {
              console.log("error");
            });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllPendingPolicy = () => {
    try {
      axios
        .get(API_URL + "/api/getAllPendingPolicy")
        .then((result) => {
          setPendingPolicyData(result.data?.data);
        })
        .catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {
              console.log("error");
            });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllCancelledPolicy = () => {
    try {
      axios
        .get(API_URL + "/api/getAllCancelledPolicies")
        .then((result) => {
          setCancelledPolicies(result.data?.data);
        })
        .catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () { });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllRenewalPolicy = () => {
    try {
      axios
        .get(API_URL + "/api/getAllRenewalPolicy")
        .then((result) => {
          setRenewalPolicyData(result.data?.data);
        })
        .catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () { });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllClaims = () => {
    try {
      axios
        .get(API_URL + "/api/getClaims")
        .then((result) => {
          //console.log(result.data.data)
          setClaimsData(result.data.data);
        })
        .catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () { });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllOffers = () => {
    try {
      axios
        .get(API_URL + "/api/get_all_special_offer")
        .then((result) => {
          //console.log(result.data.data, "Offer Data")
          setPolicyOffers(result.data.data);
        })
        .catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () { });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

//console.log("userData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",userData?.userType?.usertype);

const [activeKey, setActiveKey] = useState("");
const location = useLocation();

useEffect(() => {
  // Update activeKey based on the current location
  updateActiveKey(location.pathname);
}, [location]);

// Function to update activeKey based on the current location
const updateActiveKey = (pathname) => {
  if (
    pathname.startsWith("/Mypolicies") ||
    pathname.startsWith("/Pendingpolicies") ||
    pathname.startsWith("/CancelledPolicies") ||
    pathname.startsWith("/Policiesrenewal") ||
    pathname.startsWith("/Claimlist") ||
    pathname.startsWith("/Specialoffer")
  ) {
    setActiveKey("individualPolicy");
    console.log("Active key set to 'individualPolicy'");
  } else if (
    pathname.startsWith("/AddMembers") ||
    pathname.startsWith("/ActiveMember") ||
    pathname.startsWith("/DeletedMembers") ||
    pathname.startsWith("/NewlyAddedMember") ||
    pathname.startsWith("/UpdateMissingDocuments") ||
    pathname.startsWith("/MemberApproval")
  ) {
    setActiveKey("memberManagement");
    console.log("Active key set to 'memberManagement'");
  } else if (
    pathname.startsWith("/GroupClaimsExperience") ||
    pathname.startsWith("/GroupClaimHandlingProcedure") ||
    pathname.startsWith("/GroupClaimRatio") ||
    pathname.startsWith("/GroupClaimsSubmission") ||
    pathname.startsWith("/GroupClaimsSummary") ||
    pathname.startsWith("/GroupClaimsStatus")
  ) {
    setActiveKey("claims");
    console.log("Active key set to 'claims'");
  } else if (
    pathname.startsWith("/MostCommonOversights") ||
    pathname.startsWith("/DetailedReportRequest") ||
    pathname.startsWith("/OtherMemberList") ||
    pathname.startsWith("/TatOnCard") ||
    pathname.startsWith("/TatOnSettlememt") ||
    pathname.startsWith("/UsefulLinks")
  ) {
    setActiveKey("OtherServices");
    console.log("Active key set to 'OtherServices'");
  } else {
    // If none of the above matches, no accordion item should be active
    setActiveKey("");
  }
};

  // Function to handle accordion item selection
  const handleAccordionSelect = (key) => {
    // console.log(key,"key name");
    // console.log(activeKey,"active key");
    setActiveKey(key === activeKey ? "" : key);
  };

  return (
    <div>
      <div className="sidebaarrr">
        <Accordion activeKey={activeKey} onSelect={handleAccordionSelect} >
          <Accordion.Item eventKey="individualPolicy">
            <Accordion.Header className={'shadowww' +  (activeKey === 'individualPolicy' ?'active-accordion' : '')}>Individual Policy</Accordion.Header>
            <Accordion.Body>
              <ul className="sidebaarr">
                <li className="accordili">
                  <Link
                    to="/Mypolicies"
                    className={
                      window.location.pathname == "/Mypolicies" ? "active" : ""
                    }
                  >
                    My Policies{" "}
                    <span>({policyData?.length ? policyData?.length : 0})</span>
                  </Link>
                </li>
                <li className="accordili">
                  <Link
                    to="/Pendingpolicies"
                    className={
                      window.location.pathname == "/Pendingpolicies"
                        ? "active"
                        : ""
                    }
                  >
                    Pending Policies{" "}
                    <span>
                      (
                      {pendingPolicyData?.length
                        ? pendingPolicyData?.length
                        : 0}
                      )
                    </span>
                  </Link>
                </li>
                <li className="accordili">
                  <Link
                    to="/CancelledPolicies"
                    className={
                      window.location.pathname == "/CancelledPolicies"
                        ? "active"
                        : ""
                    }
                  >
                    Cancelled Policies{" "}
                    <span>
                      (
                      {cancelledPolicies?.length
                        ? cancelledPolicies?.length
                        : 0}
                      )
                    </span>
                  </Link>
                </li>
                <li className="accordili">
                  <Link
                    to="/Policiesrenewal"
                    className={
                      window.location.pathname == "/Policiesrenewal"
                        ? "active"
                        : ""
                    }
                  >
                    Renewal{" "}
                    <span>
                      (
                      {renewalPolicyData?.length
                        ? renewalPolicyData?.length
                        : 0}
                      )
                    </span>
                  </Link>
                </li>
                <li className="accordili">
                  <Link
                    to="/Claimlist"
                    className={
                      window.location.pathname == "/Claimlist" ? "active" : ""
                    }
                  >
                    My Claim{" "}
                    <span>({claimsData?.length ? claimsData?.length : 0})</span>
                  </Link>
                </li>
                <li className="accordili">
                  <Link
                    to="/Specialoffer"
                    className={
                      window.location.pathname == "/Specialoffer"
                        ? "active"
                        : ""
                    }
                  >
                    Special Offer{" "}
                    <span>
                      ({policyOffers?.length ? policyOffers?.length : 0})
                    </span>
                  </Link>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          {userData?.userType?.usertype == "HR" || (userData?.userType?.usertype == "User" && userData?.hrId) ? (
            <>
              <Accordion.Item eventKey="memberManagement">
                <Accordion.Header className={'shadowww' +  (activeKey === 'memberManagement' ?'active-accordion' : '')}>Member Management</Accordion.Header>
                <Accordion.Body>
                  <ul className="sidebaarr">
                    <div>
                      <li className="accordili" >
                        <Link
                          to="/AddMembers"
                          className={
                            window.location.pathname == "/AddMembers"
                              ? "active"
                              : ""
                          }
                        >
                          Add Member
                        </Link>
                      </li>
                    </div>
                    <li className="accordili">
                      <Link
                        to="/ActiveMember"
                        className={
                          window.location.pathname == "/ActiveMember"
                            ? "active"
                            : ""
                        }
                      >
                        Active Member
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/DeletedMembers"
                        className={
                          window.location.pathname == "/DeletedMembers"
                            ? "active"
                            : ""
                        }
                      >
                        Deleted Member
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/NewlyAddedMember"
                        className={
                          window.location.pathname == "/NewlyAddedMember"
                            ? "active"
                            : ""
                        }
                      >
                        Newly Added Member
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/UpdateMissingDocuments"
                        className={
                          window.location.pathname == "/UpdateMissingDocuments"
                            ? "active"
                            : ""
                        }
                      >
                        Update Missing Documents
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/MemberApproval"
                        className={
                          window.location.pathname == "/MemberApproval"
                            ? "active"
                            : ""
                        }
                      >
                        Member Approval
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item >
              <ul className="sidebaarr" >
                <li className="accordili">
                  <Link
                    to="/GroupMedicalPolicy"
                    className={
                      window.location.pathname ==
                        "/GroupMedicalPolicy"
                        ? "active"
                        : ""
                      
                    }
                  >
                    Policy
                  </Link>
                </li>
              </ul>
              <Accordion.Item eventKey="claims">
                <Accordion.Header>Claims</Accordion.Header>
                <Accordion.Body>
                  <ul className="sidebaarr">
                    <li className="accordili">
                      <Link
                        to="/GroupClaimsExperience"
                        className={
                          window.location.pathname == "/GroupClaimsExperience"
                            ? "active"
                            : ""
                        }
                      >
                        Claims Experience
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/GroupClaimHandlingProcedure"
                        className={
                          window.location.pathname ==
                            "/GroupClaimHandlingProcedure"
                            ? "active"
                            : ""
                        }
                      >
                        Claim Handling Procedure
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/GroupClaimRatio"
                        className={
                          window.location.pathname == "/GroupClaimRatio"
                            ? "active"
                            : ""
                        }
                      >
                        Claims Ratio
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/GroupClaimsSubmission"
                        className={
                          window.location.pathname == "/GroupClaimsSubmission"
                            ? "active"
                            : ""
                        }
                      >
                        Claims Submission
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/GroupClaimsSummary"
                        className={
                          window.location.pathname == "/GroupClaimsSummary"
                            ? "active"
                            : ""
                        }
                      >
                        Claims Summary
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/GroupClaimsStatus"
                        className={
                          window.location.pathname == "/GroupClaimsStatus"
                            ? "active"
                            : ""
                        }
                      >
                        Claims Status - Detailed
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="OtherServices">
                <Accordion.Header>Other Services</Accordion.Header>
                <Accordion.Body>
                  <ul className="sidebaarr">
                    <li className="accordili">
                      <Link
                        to="/MostCommonOversights"
                        className={
                          window.location.pathname == "/MostCommonOversights"
                            ? "active"
                            : ""
                        }
                      >
                        Most Common Oversights
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/DetailedReportRequest"
                        className={
                          window.location.pathname == "/DetailedReportRequest"
                            ? "active"
                            : ""
                        }
                      >
                        Addition / Deletion Report
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/OtherMemberList"
                        className={
                          window.location.pathname == "/OtherMemberList"
                            ? "active"
                            : ""
                        }
                      >
                        Member List Report
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/TatOnCard"
                        className={
                          window.location.pathname == "/TatOnCard"
                            ? "active"
                            : ""
                        }
                      >
                        TAT on Card Insurance
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/TatOnSettlememt"
                        className={
                          window.location.pathname == "/TatOnSettlememt"
                            ? "active"
                            : ""
                        }
                      >
                        TAT on Settlement
                      </Link>
                    </li>
                    <li className="accordili">
                      <Link
                        to="/UsefulLinks"
                        className={
                          window.location.pathname == "/UsefulLinks"
                            ? "active"
                            : ""
                        }
                      >
                        Useful Links
                      </Link>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </>
          ) : "" 
        }
          <ul className="sidebaarr1">
            {userData.usertype == "65f29f6aaa6b0eb46f478907" && (
              <>
                <li className="accordili">
                  <Link
                    to="/GroupPolicyRenewal"
                    className={
                      window.location.pathname == "/GroupPolicyRenewal"
                        ? "active"
                        : ""
                    }
                  >
                    Renewal{" "}
                    {/*<span>
                      (
                      {renewalPolicyData?.length
                        ? renewalPolicyData?.length
                        : 0}
                      )
                    </span>*/}
                  </Link>
                </li>
                <li className="accordili">
                  <a href="#">Special Offer (4)</a>
                </li>
              </>
            )}
            <li className="accordili">
              <Link
                className={
                  window.location.pathname == "/Myprofile" ? "active" : ""
                }
                to="/Myprofile"
              >
                My Profile
              </Link>
            </li>
            <li className="accordili">
              <a onClick={()=>Logout()}>Logout</a>
            </li>
          </ul>
        </Accordion>
      </div>
    </div>
  );
};

export default GroupSidebar;
