import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Yachtbanner from "../Banner/Yachtbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import YachtInsurancedetails from "../Common/YachtInsurancedetails";
const YachtVarient = () => {
  const [disableLink, setDisableLink] = useState(false);
  const [searchkeyword, setSearchkeyword] = useState("");
  const {
    YachtFormsData,
    handleBeforeUnload,
    handlYachteSelectFormValue, handlYachtEstimatedSelect,
    handlYachtestimatedSelectFormValue
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
    handlYachteSelectFormValue("YachtVarient", data);
    handlYachtestimatedSelectFormValue("YachtVarient", data);
    navigate("/YachtVarient")
  };

  useEffect(() => {
    getMotordata();
  }, []);


  const getMotordata = async () => {
    setLoading(true);

    await axios
      .post(API_URL + "/api/getYachtDetails", {
        year: YachtFormsData?.model_year,
        yachtMakeId: YachtFormsData?.YachtMaker
      })
      .then((response) => {
        setLoading(false);
        if (response?.data?.status === 200) {
          setDisableLink(false)
          setError(false);
          setCars(response.data.data);
          if (response.data.data.length > 0) {
            if (YachtFormsData.YachtVarient) {
              let exist = response.data.data.find((val => val._id === YachtFormsData.YachtVarient))
              if (!exist) {
                handlYachteSelectFormValue("YachtVarient", response.data.data[0]["_id"]);
                handlYachtestimatedSelectFormValue("YachtVarient", response.data.data[0]["_id"]);
              } else {
                handlYachteSelectFormValue("YachtVarient", exist["_id"]);
                handlYachtestimatedSelectFormValue("YachtVarient", exist["_id"]);
              }
            }
            else if (!YachtFormsData.YachtVarient)
              handlYachteSelectFormValue("YachtVarient", response.data.data[0]["_id"]);
            handlYachtestimatedSelectFormValue("YachtVarient", response.data.data[0]["_id"]);
          }
        } else {
          setError(true);
          setCars([])
          setDisableLink(true)
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setDisableLink(true)
        setMessage(error?.response?.data?.message);
        setCars([])
      });


  };
  const [itemsToShow, setItemsToShow] = useState(false);
  const showmore = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    setItemsToShow(!itemsToShow);
  };
  useEffect(() => {
    if (Cars && Cars.length > 0) {
      const index = Cars.findIndex(
        (val) => val._id === YachtFormsData.YachtVarient
      );
      if (index > 8) {
        setItemsToShow(true);
      }
    }

  }, [Cars]);

  const Progress = 25;
  return (
    <div>
      <Header />
      <Yachtbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <ul>
                    <li>Select Yacht Model</li>
                  </ul>
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
                                key={v._id}
                                className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                              >
                                <label
                                  className={
                                    YachtFormsData.YachtVarient && YachtFormsData.YachtVarient == v._id
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                  onClick={() => onClickDivclick(v._id)}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      YachtFormsData &&
                                        YachtFormsData?.YachtMaker == v._id
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                  />
                                  {v?.name}
                                  {v?.logo ? (<img style={{ width: '30px', marginLeft: '10px', }} src={API_URL + "/YachtMakeLogos/" + v?.logo} alt="yacht" />) : (<></>)}

                                </label>
                              </div>
                            );
                          })
                          : Cars.slice(0, 9).map((v, i) => {
                            return (
                              <div
                                key={v._id}
                                className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                              >
                                <label
                                  className={
                                    YachtFormsData.YachtVarient && YachtFormsData.YachtVarient == v._id
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                  onClick={() => onClickDivclick(v._id)}
                                >
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      YachtFormsData.YachtVarient && YachtFormsData.YachtVarient == v._id
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                  />
                                  {v?.name}
                                  {v?.logo ? (<img style={{ width: '30px', marginLeft: '10px', }} src={API_URL + "/YachtMakeLogos/" + v?.logo} alt="yacht" />) : (<></>)}
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
                        to="/YachtMaker"
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
                          to="/Enginedetails"
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
      <YachtInsurancedetails />
      <Footer />
    </div>
  );
};

export default YachtVarient;