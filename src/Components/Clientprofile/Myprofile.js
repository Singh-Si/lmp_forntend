import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup,Col,Row, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseUserContext } from "../../UserContextAppProvider";
import axios from "axios";
import { useFetch } from "../../functions";
import { API_URL } from "../..";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';
import { set } from "firebase/database";
import { CSpinner } from "@coreui/react";
import Profilenav from "./Profilenav";
import GroupSidebar from "../Groupinsurance/GroupSidebar";
import GroupMedical from "../Banner/GroupMedical";
import GroupmedicalAlert from "../Groupinsurance/GroupmedicalAlert";

const Myprofile = () => {
  const navigate = useNavigate()
  const [policyData, setPolicyData] = useState([]);
  const [pendingPolicyData, setPendingPolicyData] = useState([]);
  const [renewalPolicyData, setRenewalPolicyData] = useState([]);
  const [claimsData, setClaimsData] = useState([])
  const [policyOffers, setPolicyOffers] = useState([])
  const [cancelledPolicies, setCancelledPolicies] = useState([])
  const [Message, setMessage] = useState("Update")
  const [loader,setLoader] = useState(false)
  // Validate Phone Number
  const PhoneNoValidate = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  // const { UserData } = UseUserContext();

  const [startDate, setStartDate] = useState(null);
  const [profile_image, setProfile_image] = useState(null);

  const [ProfileUpdateData, setProfileUpdateData] = useState({
    name:  "",
    email:  "",
    mobile:  "",
    description: "",
    date_of_brith: startDate,
    profile_image: null,
  });


  
  const [UserData, setUserData] = useState({});
  const [usertoken, setToken] = useState(null);

  useEffect(() => {
    const usertoken = localStorage.getItem("usertoken"); // Get the user token
    setToken(usertoken); // Set the user token in state
    if (usertoken) {
      getUserProfile(usertoken); // Pass the token to the function
    } else {
      navigate('/')
    }
  }, []);
  
 



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
          setProfileUpdateData({
            name: response?.data?.data?.name ? response?.data?.data?.name : "",
            email: response?.data?.data?.email ? response?.data?.data?.email : "",
            mobile: response?.data?.data?.mobile ? response?.data?.data?.mobile : "",
            description: response?.data?.data?.description ? response?.data?.data?.description : "",
            date_of_brith: response?.data?.data?.date_of_brith ? response?.data?.data?.date_of_brith : null,
            profile_image: response?.data?.data?.profile_image ? response?.data?.data?.profile_image : null,
          });
          setStartDate(response?.data?.data?.date_of_brith ? new Date(response?.data?.data?.date_of_brith) : new Date());
         
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

console.log({ProfileUpdateData});





  const [response, Loading, Error] = useFetch(API_URL + "/api/getAllCountries");
  const Countries = response?.data?.data ? response?.data?.data : null;
  const { Logout } = UseUserContext()
  useEffect(() => {
    getAllCompletePolicy()
    getAllPendingPolicy()
    getAllRenewalPolicy()
    getAllClaims()
    getAllOffers()
    getAllCancelledPolicy()
  }, [])
  useEffect(() => {
    getAllCompletePolicy()
    getAllPendingPolicy()
    getAllRenewalPolicy()
    getAllClaims()
    getAllOffers()
    getAllCancelledPolicy()
  }, [usertoken])
  const getAllCompletePolicy = () => {
    try {
      axios.get(API_URL + "/api/getAllCompletePolicy")
        .then((result) => {
          setPolicyData(result.data.data)
          //console.log(result.data.data, "complete policy")
        }).catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {
              console.log("error")
            });
          }
        });
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAllPendingPolicy = () => {
    try {
      axios.get(API_URL + "/api/getAllPendingPolicy")
        .then((result) => {
          setPendingPolicyData(result.data.data)
        }).catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {
              console.log("error")
            });
          }
        });
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAllCancelledPolicy = () => {
    try {
      setLoader(true)
      axios.get(API_URL + "/api/getAllCancelledPolicies")
        .then((result) => {
          setCancelledPolicies(result.data.data)
          setLoader(false)
        }).catch((err) => {
          setLoader(false)
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {

            });
          }
        });
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAllRenewalPolicy = () => {
    try {
      axios.get(API_URL + "/api/getAllRenewalPolicy")
        .then((result) => {
          setRenewalPolicyData(result.data.data)
        }).catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {

            });
          }
        });
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAllClaims = () => {
    try {
      axios.get(API_URL + "/api/getClaims")
        .then((result) => {
          //console.log(result.data.data)
          setClaimsData(result.data.data)
        }).catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {

            });
          }
        });
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAllOffers = () => {
    try {
      axios.get(API_URL + "/api/get_all_special_offer")
        .then((result) => {
          //console.log(result.data.data, "Offer Data")
          setPolicyOffers(result.data.data)
        }).catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {

            });
          }
        });

    } catch (error) {
      console.log(error.message)
    }
  }
  const handlePersonalDetails = (e) => {
    setProfileUpdateData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    //console.log({ ProfileUpdateData });
  };
  const UpdateProfile = async (e) => {
   
    console.log("i am clicked");

    // let data = { ...ProfileUpdateData };
    // console.log( data );
    console.log( startDate );

    let data = {
      ...ProfileUpdateData,
      date_of_brith: startDate,
      profile_image: profile_image,

    }
    console.log(data);
    const formData = new FormData();
    formData.append("name", ProfileUpdateData?.name);
    formData.append("email", ProfileUpdateData?.email);
    formData.append("mobile", ProfileUpdateData?.mobile);
    formData.append("description", ProfileUpdateData?.description);
    formData.append("date_of_brith", startDate);
    formData.append("profile_image", profile_image);
    

      setMessage("Please Wait")
      await axios
        .put(API_URL + "/api/updateCustomerProfile?id=" + UserData?._id, formData )
        .then((res) => {
          {};
          if (res.status === 200) {
            swal({
              title: "success!",
              text: res?.data?.message,
              type: "success",
              icon: "success",
            }).then(function () {
                getUserProfile(usertoken);
            })
          }

        })
        .catch((error) => {
          if (error?.response?.status === 400) {
            swal({
              title: "warning!",
              text: error?.response?.data?.message ? error?.response?.data?.message : "Something Went wrong",
              type: "warning",
              icon: "warning",
            }).then(function () {
              getUserProfile(usertoken);
            })
          }
          ;
        });
    

  };
  return (
    <div>
      <Header />
      <GroupMedical />
      <Row className="groupback">
        <Container fluid className="group-medicalss mt-5">
          <Row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Col lg={12}>
              <Row>
                <Col lg="3">
                  <div className="sidebar">
                    <GroupSidebar />
                  </div>
                </Col>
                {loader && (
                  <div className="loader-overlay" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
                    <div className="loader">
                      <CSpinner color="danger" size="lg" />
                    </div>
                  </div>
                )}
  
            <Col lg="9">
              <div className="my_profile">
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      name="name"
                      onChange={handlePersonalDetails}
                      required
                      placeholder="Full Name"
                      aria-label="Full Name"
                      defaultValue={ProfileUpdateData?.name}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      name="email"
                      required
                      placeholder="Email ID"
                      aria-label="Email ID"
                      defaultValue={ProfileUpdateData?.email}
                      readOnly
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      onChange={handlePersonalDetails}
                      name="mobile"
                      required
                      placeholder="Phone Number"
                      aria-label="Phone Number"
                      defaultValue={ProfileUpdateData?.mobile}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-upload" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="file"
                      onChange={(e)=> setProfile_image(e.target.files[0])}
                      name="profile_image"
                      required
                      placeholder="Profile Image"
                      aria-label="Profile Image"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <DatePicker
                      placeholderText={"Please select a date"}
                      className="form-control"
                      dateFormat={"dd/MM/yyyy"}
                      selected={ startDate }
                      onChange={(date) => setStartDate(date)}
                    />
                  </InputGroup>
                </div>
                {/* <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i className="fa fa-language" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <select
                      name="nationality"
                      onChange={handlePersonalDetails}
                      className="form-control"
                    >
                     
                      {Countries && Countries.length > 0 ? (
                        Countries.map((val, i) => {
                          return (
                            <option
                              selected={
                                ProfileUpdateData?.nationality ==
                                  val?.
                                  nationality_name
                                  ? val?.
                                  nationality_name
                                  : i === 0
                              }
                              value={val?.country_name}
                            >
                              {val?.country_name}
                            </option>
                          );
                        })
                      ) : (
                        <option>No Options Available</option>
                      )}
                    </select>
                  </InputGroup>
                </div> */}
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <textarea
                      onChange={handlePersonalDetails}
                      name="description"
                      defaultValue={ProfileUpdateData?.description}
                      placeholder="Type Your Information Here...... (Optional)"
                      className="form-control"
                      rows="5"
                    ></textarea>
                  </InputGroup>
                </div>
                <button className="profileupadtes" id="personalupdate" onClick={UpdateProfile}>
                  Update
                </button>

              </div>
            </Col>
            </Row>
            </Col>
          </Row>
        </Container>
        <GroupmedicalAlert />
      </Row>
      <Footer />
    </div>
  );
};

export default Myprofile;
