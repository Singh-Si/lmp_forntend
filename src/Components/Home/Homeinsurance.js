import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import { API_URL } from "../..";
import HomeInsurancedetails from "../Common/HomeInsurancedetails";
import { io } from "socket.io-client";
let countt = 0
const Homeinsurance = () => {
  // fetch the data from backend
  const { HomeInsurance, setHomeInsurance, handleHomeInsurance } =
    UseMotorContext();
  const [serverData, setServerData] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [ownerShipStatus, setOwnerShipStatus] = useState([]);
  const [socket, setSocket] = useState(null)

  const fetchData = async () => {
    try {
      // Fetch all data sequentially using await
      const response1 = await fetch(
        API_URL + "/api/getAllHomePlanTypes"
      );
      const response2 = await fetch(
        API_URL + "/api/getAllHomePropertyTypes"
      );
      const response3 = await fetch(
        API_URL + "/api/getAllHomeOwnershipStatus"
      );

      // Check if all responses are ok
      if (!response1.ok || !response2.ok || !response3.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse all responses
      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();

      // Update state variables accordingly
      setServerData(data1.data);
      setPropertyType(data2.data);
      setOwnerShipStatus(data3.data);
    } catch (error) {
      //console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    if (countt === 0) {
      const newSocket = io('http://localhost:8000', {
        query: {
          userType: 'lob',
          lob: "liveOnHome"// or 'unregistered'
        },
      })
      setSocket(newSocket)
    }
    const handleVisibilityChange = () => {
   
      if (document.visibilityState === 'visible') {
        // Logic to capture when the user leaves the page
        if (countt >= 3) {
          alert("warning !! Too many requests")
        } else {
          countt++
        }
        const newSocket = io('http://localhost:8000', {
          query: {
            userType: 'lob',
            lob: "liveOnHome"// or 'unregistered'
          },
        })
        setSocket(newSocket)

      } else if (document.visibilityState === 'hidden' && countt == 2) {
        if (socket) {
          socket.disconnect()
        }
        setTimeout(() => {
          countt = 0
        }, 10000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  // useEffect(() => {
  //   ViewingHomeLOB()
  // },[])

  useEffect(() => {
    // Set default values for property_type and ownership_status
    if (!HomeInsurance.ownership_status && !HomeInsurance.property_type) {

      setHomeInsurance((prevState) => ({
        ...prevState,
        property_type: propertyType.length > 0 ? propertyType[0]._id : null,
        ownership_status:
          ownerShipStatus.length > 0 ? ownerShipStatus[0]._id : null,

      }));
    }
  }, [propertyType, ownerShipStatus]);

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);
  // const ViewingHomeLOB = async () => {
  //   try {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         lob: 'Home'
  //       })
  //     }
  //     await fetch(`${API_URL}/api/updateViewingLob`, requestOptions)
  //       .then(response => response.json())
  //       .then((data) => {

  //       })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <div>
      <Header />
      <Homebanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <h5
            className="gheading"
            style={{ color: "#F43130", lineHeight: "15px" }}
          >
            Discount % should be reduced
          </h5>
          <h5 className="gheading mb-4">Insurance your home instantly</h5>
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row" style={{ justifyContent: "space-between" }}>

                    <div className="col-lg-5">
                      <ul>
                        <li>Property Type</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          {propertyType.length === 0 ? (
                            <div>No property type available</div>
                          ) : (
                            propertyType.map((property) => (
                              <div
                                className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4"
                                key={property._id}
                              >
                                <label
                                  name="property_type"
                                  className={`btn btn-default ${HomeInsurance.property_type === property._id
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={(e) =>
                                    handleHomeInsurance(
                                      e,
                                      property._id,
                                      "property_type"
                                    )
                                  }
                                >
                                  <input
                                    type="radio"
                                    name="property_type"
                                    defaultChecked={
                                      HomeInsurance.property_type ===
                                      property._id
                                    }
                                    value={property._id}
                                  />
                                  {property.home_property_type}
                                </label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <ul>
                        <li>Ownership Status</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          {ownerShipStatus.length === 0 ? (
                            <div>No ownership Status available</div>
                          ) : (
                            ownerShipStatus.map((owner) => (
                              <div
                                className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4"
                                key={owner._id}
                              >
                                <label
                                  name="ownership_status"
                                  className={`btn btn-default ${HomeInsurance.ownership_status === owner._id
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={(e) =>
                                    handleHomeInsurance(
                                      e,
                                      owner._id,
                                      "ownership_status"
                                    )
                                  }
                                >
                                  <input
                                    type="radio"
                                    name="ownership_status"
                                    defaultChecked={
                                      HomeInsurance.ownership_status ===
                                      owner._id
                                    }
                                    value={owner._id}
                                  />
                                  {owner.home_owner_type}
                                </label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/" className="buttonactions">
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        to="/Homeplan"
                        className="buttonactions"
                      // onClick={handleSubmit}
                      >
                        Next
                        <i
                          className="fa fa-chevron-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeInsurancedetails />
      <Footer />
    </div>
  );
};

export default Homeinsurance;
