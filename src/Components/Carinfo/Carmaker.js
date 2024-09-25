import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Carmaker = () => {
  const [disableLink, setDisableLink] = useState(true);
  const [searchkeyword, setSearchkeyword] = useState("");
  const {
    motorFormsData,
    handleBeforeUnload,
    handleSubmitMotorform,
  } = UseMotorContext();
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const [Cars, setCars] = useState([]);
  const [whichihavetochangearr, setwhichihavetochangearr] = useState([]);
  const [SampleCars, setSampleCars] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState("");
  const navigate = useNavigate()
  const onClickDivclick = (data) => {
    handleSubmitMotorform("car_maker", data);
    navigate("/Carmodel")
  };

  useEffect(() => {
    getMotordata();
  }, [searchkeyword]);
  function array_move(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  const getMotordata = async () => {
    setLoading(true);
    if (searchkeyword && searchkeyword !== "") {
      await axios
        .post(API_URL + "/api/getMotorDetails?name=" + searchkeyword.toLowerCase(), {
          years: motorFormsData?.model_year,
        })
        .then((response) => {
          setLoading(false);
          console.log(response, "this is if 1")

          if (response?.data?.status === 200) {
            setError(false);
            let data = response.data.data.filter((val) => val !== undefined && val !== null && val !== "");
            console.log("datapapa", data)
            setDisableLink(false)
            setCars(data)
            setwhichihavetochangearr(response.data.mostPurchaseData)


          }
          else {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>77", response.data.data)
            setSampleCars([])
            setDisableLink(true)
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          setDisableLink(true)
          setMessage(error?.response?.data?.message);
          setSampleCars([])
        });
    } else {
      await axios
        .post(API_URL + "/api/getMotorDetails", {
          years: motorFormsData?.model_year,
        })
        .then((response) => {
          console.log(response, "this is if 2")

          setLoading(false);

          if (response?.data?.status === 200) {
            console.log("datapapa", response)
            console.log("datapapa", response.data.data.filter((val) => val !== undefined && val !== null && val !== ""))

            // let data = response.data.data.filter((val) => val !== undefined && val !== null && val !== "")
            setError(false);
            setCars(response.data.data)
            // setCars(data)
            setDisableLink(false)
            setSampleCars(response.data.data);
            setwhichihavetochangearr(response.data.mostPurchaseData)

          } else {
            setSampleCars([])
            setDisableLink(true)
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          setDisableLink(true)
          setMessage(error?.response?.data?.message);
          setSampleCars([])
        });
    }

  };
  const [itemsToShow, setItemsToShow] = useState(false);
  const showmore = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    setItemsToShow(!itemsToShow);
  };
  useEffect(() => {
    if (Cars && Cars.length > 0) {
      const index = Cars?.findIndex(
        (val) => val?._id === motorFormsData?.car_maker
      );
      if (index > 8) {
        setItemsToShow(true);
      }
    }
    // setCars(Cars)
    if (Cars.length > 0) {
      if (motorFormsData?.car_maker) {

        let exist = SampleCars?.find(
          (val => val?._id === motorFormsData.car_maker))
        if (!exist) {
          if (SampleCars.length > 0) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>138", SampleCars[0]?._id)
            handleSubmitMotorform("car_maker", SampleCars[0]?._id);
          }
        }

      }
      else if (!motorFormsData.car_maker)
        if (SampleCars.length > 0) {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>146", SampleCars[0]?._id)
          handleSubmitMotorform("car_maker", SampleCars[0]?._id);
        }
    }

  }, [Cars]);

  useEffect(() => {
    try {
      if (SampleCars && SampleCars.length > 0 && whichihavetochangearr && whichihavetochangearr.length > 0 && searchkeyword.length == 0) {
        for (let i = 0; i < whichihavetochangearr.length; i++) {
          if (whichihavetochangearr[i] && whichihavetochangearr[i]?._id) {
            const valueToChange = whichihavetochangearr[i]["_id"];

            const oldIndex = SampleCars.findIndex(item => item?._id === valueToChange);
            if (oldIndex !== -1) {
              const newIndex = i;
              array_move(SampleCars, oldIndex, newIndex);
            }
          }

        }
        setCars(SampleCars)
      }
    } catch (error) {
      console.log(error)
    }
  }, [SampleCars, searchkeyword, array_move, whichihavetochangearr])
  console.log(searchkeyword.length)
  console.log(Error)
  const Progress = 25;


  console.log(Cars, "Cars")


  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <ul>
                    <li>Select Vehicle Maker</li>
                  </ul>
                  <div>

                    <input
                      className="attractive-input" // Add a custom class for styling
                      type="text"
                      name="name"
                      placeholder="Search"
                      value={searchkeyword}
                      onChange={(e) => setSearchkeyword(e.target.value)}
                      // Add some inline styles to enhance its appearance
                      style={{
                        width: '100%', // Make it full width
                        padding: '10px',
                        borderRadius: '5px',
                        border: '2px solid #3498db',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                        fontSize: '16px', // Adjust the font size as needed
                        backgroundColor: '#f2f2f2', // Change the background color to your preference
                        color: '#333', // Set the text color
                        transition: 'border 0.3s ease',
                      }}
                    />


                  </div>
                </div>

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {Loading ? (
                        <div id="loading"></div>
                      ) : Error ? (
                        <div>{Message}</div>
                      ) : Cars && Cars.length > 0 ? (
                        itemsToShow
                          ? Cars.map((v, i) => {
                            return (
                              <div
                                key={v?._id}
                                className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                              >
                                <label
                                  className={
                                    motorFormsData?.car_maker == v?._id
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                  onClick={() => onClickDivclick(v?._id)}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      motorFormsData &&
                                        motorFormsData?.car_maker == v?._id
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                  />
                                  {v?._id}
                                  {v?.make_motor_logo ? (<img style={{ width: '30px', marginLeft: '10px', }} src={API_URL + "/MakeMotorLogos/" + v?.make_motor_logo} alt="car" />) : (<></>)}

                                </label>
                              </div>
                            );
                          })
                          : Cars.slice(0, 9).map((v, i) => {
                            return (
                              <div
                                key={v?._id}
                                className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                              >
                                <label
                                  className={
                                    motorFormsData?.car_maker == v?._id
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                  onClick={() => onClickDivclick(v?._id)}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      motorFormsData &&
                                        motorFormsData?.car_maker == v?._id
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                  />
                                  {v?._id}
                                  {v?.make_motor_logo ? (<img style={{ width: '30px', marginLeft: '10px', }} src={API_URL + "/MakeMotorLogos/" + v?.make_motor_logo} alt="car" />) : (<></>)}
                                </label>
                              </div>
                            );
                          })
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <>
                      {Cars && Cars.length > 9 && (
                        <>
                          {itemsToShow ? (
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                              <p
                                className="showcom"
                                style={{ cursor: "pointer" }}
                                onClick={showmore}
                              >
                                Show Less
                              </p>
                            </div>
                          ) : (
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                              <p
                                className="showcom"
                                style={{ cursor: "pointer" }}
                                onClick={showmore}
                              >
                                Show More
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link

                        to="/Carmodelyear"
                        className="buttonactions"
                      >
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    {
                      !disableLink ? (<div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >

                        <Link
                          to="/Carmodel"
                          className="buttonactions "
                        >
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>

                      </div>) : (<div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >

                        <Link
                          // to="/Carmodel"
                          className="buttonactions disabled"
                          style={{ cursor: 'not-allowed' }}
                        >
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>

                      </div>)
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MotorInsurancedetails />
      <Footer />
    </div>
  );
};

export default Carmaker;
