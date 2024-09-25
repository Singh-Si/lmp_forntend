import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Carregisterlocation = () => {
  const { motorFormsData, handleBeforeUnload, handleSubmitMotorform } =
    UseMotorContext();
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState("");
  useEffect(() => {
    getMotordata(API_URL + "/api/getAreaOfRegistrations");
  }, []);
  const getMotordata = async (url) => {
    try {
      setLoading(true);
      await axios
        .get(url)
        .then((response) => {
          setLoading(false);
          if(response?.data?.data.length > 0) {
            let dataarr = response?.data?.data;
            let Duabai = dataarr.find(
              (item) => item.area_of_registration_name === "Dubai"
            );
            //console.log("Duabai", Duabai);
            if (!motorFormsData.register_area) {
              handleSubmitMotorform(
                "register_area",
                Duabai
                  ? Duabai?.area_of_registration_name
                  : response?.data?.data[0].area_of_registration_name
              );
            }
            setData(response?.data?.data);
          }
          
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          setMessage(error.message);
        });
    } catch (error) {
      ////console.log({ error });
    }
  };
  const [itemsToShow, setItemsToShow] = useState(false);
  const showmore = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
    setItemsToShow(!itemsToShow);
  };
  useEffect(() => {
    if (Data.length > 0) {
      const index = Data.findIndex(
        (val) => val.area_of_registration_name === motorFormsData.register_area
      );
      //console.log(index, "check");
      if (index > 8) {
        setItemsToShow(true);
      }
    }
  }, [Data]);
  const Progress = 50;
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
                    <li>Vehicle Registering Emirate</li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {Loading ? (
                        <div id="loading"></div>
                      ) : Error ? (
                        <div>{Message}</div>
                      ) : Data && Data.length > 0 ? (
                        itemsToShow? Data.map((v, i) => {
                          return (
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                              <label
                                className={
                                  motorFormsData.register_area ==
                                    v.area_of_registration_name
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                }
                                onClick={() => {
                                  handleSubmitMotorform(
                                    "register_area",
                                    v.area_of_registration_name
                                  )
                                  handleSubmitMotorform(
                                    "estimatedregister_area",
                                    v.area_of_registration_name
                                  )
                                }}
                              >
                                <input type="radio" />
                                {v.area_of_registration_name}
                              </label>
                            </div>
                          );
                        }):Data.slice(0, 9).map((v, i) => {
                          return (
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                              <label
                                className={
                                  motorFormsData.register_area ==
                                    v.area_of_registration_name
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                }
                                onClick={() => {
                                  handleSubmitMotorform(
                                    "register_area",
                                    v.area_of_registration_name
                                  );
                                  handleSubmitMotorform(
                                    "estimatedregister_area",
                                    v.area_of_registration_name
                                  ) 
                                }}
                              >
                                <input type="radio" />
                                {v.area_of_registration_name}
                              </label>
                            </div>
                          )
                        
                        }))
                       : (
                        <div></div>
                      )}
                    </div>
                    <>
                      {Data && Data.length > 9 && (
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
                      <Link to="/SelectCarvalue" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link to="/Carspecification" className="buttonactions">
                        Next
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </Link>
                    </div>
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
export default Carregisterlocation;