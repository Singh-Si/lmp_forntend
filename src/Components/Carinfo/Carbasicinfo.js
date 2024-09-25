import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import { API_URL } from "../..";
import axios from "axios";
import swal from "sweetalert";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Carbasicinfo = (props) => {
  const [getallplanename, setgetallplanename] = useState([]);
  const { motorFormsData, handleBeforeUnload, handleSubmitMotorform } =
    UseMotorContext();
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    getAllCompanies();
  }, []);

  // useEffect(() => {
  //   if (motorFormsData.car_brand_new) {
  //     handleSubmitMotorform("buying_used_car", false);
  //     // handleSubmitMotorform("buying_used_car",false);
  //     handleSubmitMotorform("current_insurance_company_id", "");
  //     handleSubmitMotorform("current_renewal", "");
  //   }else if(!motorFormsData.car_brand_new){
  //     handleSubmitMotorform("buying_used_car", true);
  //     // handleSubmitMotorform("current_insurance_company_id", "");
  //     // handleSubmitMotorform("current_renewal", "");
  //   }
   
  // }, [motorFormsData.car_brand_new,motorFormsData.buying_used_car]);

  useEffect(() => {
    if (motorFormsData.car_brand_new) {
      handleSubmitMotorform("buying_used_car", false);
      // handleSubmitMotorform("buying_used_car",false);
      handleSubmitMotorform("current_insurance_company_id", "");
      handleSubmitMotorform("current_renewal", "");
    }else if(motorFormsData.car_brand_new == false){
      handleSubmitMotorform("buying_used_car", true);
      handleSubmitMotorform("current_insurance_company_id", "");
      handleSubmitMotorform("current_renewal", "");
    }
   
  }, [motorFormsData.car_brand_new]);

useEffect(() => {
  if(motorFormsData.buying_used_car){
    handleSubmitMotorform("car_brand_new", false);
    handleSubmitMotorform("current_insurance_company_id", "");
    handleSubmitMotorform("current_renewal", "");
  }else if(!motorFormsData.buying_used_car && !motorFormsData.car_brand_new){
    handleSubmitMotorform("car_brand_new", false);
    handleSubmitMotorform("buying_used_car", false);
   
  }
}, [motorFormsData.buying_used_car]);





  console.log("motorFormsData", motorFormsData);
  async function getAllCompanies() {
    await axios
      .get(API_URL + "/api/getAllCompanies")
      .then((response) => {
        setgetallplanename(response.data.data);
        
      })
      .catch((error) => {
        ;
      });
  }
  console.log("car_brand_new",motorFormsData.car_brand_new,"buying_used_car",motorFormsData.buying_used_car)
  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <h3>Upto 70%* Off on Comprehensive Vehicle Insurance</h3>
        <h5>Insure your vehicle in 2 minutes</h5>
        <div className="container">
          <div className="row form_abcd">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                  <ul>
                    <li>Is your vehicle electric?</li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6 radiohide">
                        <label
                          className={
                            motorFormsData.your_electric_car
                              ? "btn btn-default active"
                              : "btn btn-default"
                          }
                          onClick={(e) => {
                            handleSubmitMotorform("your_electric_car", true);
                          }}
                        >
                          Yes
                          <input
                            type="radio"
                            name="options"
                            defaultChecked={
                              motorFormsData.your_electric_car
                                ? "btn btn-default active"
                                : "btn btn-default"
                            }
                          />
                        </label>
                      </div>
                      <div className="col-lg-6 radiohide">
                        <label
                          className={
                            !motorFormsData.your_electric_car
                              ? "btn btn-default active"
                              : "btn btn-default"
                          }
                          onClick={(e) => {
                            handleSubmitMotorform("your_electric_car", false);
                          }}
                        >
                          No
                          <input
                            type="radio"
                            name="options"
                            defaultChecked={
                              !motorFormsData.your_electric_car
                                ? "btn btn-default active"
                                : "btn btn-default"
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                  <ul>
                    <li>Is your vehicle brand new?</li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6 radiohide">
                        <label
                          className={
                            motorFormsData.car_brand_new
                              ? "btn btn-default active"
                              : "btn btn-default"
                          }
                          onClick={(e) => {
                            handleSubmitMotorform("car_brand_new", true);
                          }}
                        >
                          Yes
                          <input
                            type="radio"
                            name="options"
                            defaultChecked={
                              motorFormsData.car_brand_new
                                ? "btn btn-default active"
                                : "btn btn-default"
                            }
                          />
                        </label>
                      </div>
                      <div className="col-lg-6 radiohide">
                        <label
                          className={
                            !motorFormsData.car_brand_new
                              ? "btn btn-default active"
                              : "btn btn-default"
                          }
                          onClick={(e) => {
                            handleSubmitMotorform("car_brand_new", false);
                          }}
                        >
                          No
                          <input
                            type="radio"
                            name="options"
                            defaultChecked={
                              !motorFormsData.car_brand_new
                                ? "btn btn-default active"
                                : "btn btn-default"
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {!motorFormsData.car_brand_new && (
                  <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                    <ul>
                      <li style={{ whiteSpace: "nowrap" }}>Are you buying a used vehicle?</li>
                    </ul>
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        <div className="col-lg-6 radiohide">
                          <label
                            className={
                              motorFormsData.buying_used_car
                                ? "btn btn-default active"
                                : "btn btn-default"
                            }
                            onClick={(e) => {
                              handleSubmitMotorform("buying_used_car", true);
                            }}
                          >
                            Yes
                            <input
                              type="radio"
                              name="options"
                              defaultChecked={
                                motorFormsData.buying_used_car
                                  ? "btn btn-default active"
                                  : "btn btn-default"
                              }
                            />
                          </label>
                        </div>
                        <div className="col-lg-6 radiohide">
                          <label
                            className={
                              !motorFormsData.buying_used_car
                                ? "btn btn-default active"
                                : "btn btn-default"
                            }
                            onClick={(e) => {
                              handleSubmitMotorform("buying_used_car", false);
                              handleSubmitMotorform("current_renewal", false);
                            }}
                          >
                            No
                            <input
                              type="radio"
                              name="options"
                              defaultChecked={
                                !motorFormsData.buying_used_car
                                  ? "btn btn-default active"
                                  : "btn btn-default"
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!motorFormsData.buying_used_car &&
                  !motorFormsData.car_brand_new && (
                    <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
                     
                          <>
                          <div style={{padding:"8px"}}>
                            <br/>
                            
                          </div>
                        
                              <select
                                onChange={(e) =>
                                  e.target.value && e.target.value !== ""
                                    ? handleSubmitMotorform(
                                      "current_insurance_company_id",
                                      e.target.value
                                    )
                                    : ""
                                }
                                value={
                                  motorFormsData?.current_insurance_company_id
                                }

                                className="quotes_select form-control"
                              >
                                <option value="" hidden>
                                  Select Current Insurer
                                </option>
                                {getallplanename && getallplanename.length > 0 ? (
                                  getallplanename.map((v, i) => {
                                    return (
                                      <>
                                        <option
                                          key={v._id}
                                          value={v._id}

                                        >
                                          {v?.company_name}
                                        </option>
                                      </>
                                    );
                                  })
                                ) : (
                                  <option>Any</option>
                                )}
                              </select>
                            
                          </>
                        
                    </div>
                  )}
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                  <Link to="/Chasisno" className="buttonactions">
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    Back
                  </Link>
                </div>
                <div
                  className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mb-3 mt-3"
                  style={{ textAlign: "right" }}
                >
                  {!motorFormsData.buying_used_car &&
                        !motorFormsData.car_brand_new && motorFormsData.current_insurance_company_id==""? (
                          <>
                            <Link onClick={()=>{
                              swal({
                                title: "Please Select Current Insurer",
                                icon: "warning",
                                dangerMode: true,
                              });
                            }} className="buttonactions">
                          Next
                           <i className="fa fa-chevron-right" aria-hidden="true"></i>
                         </Link>
                          </>
                        ):(
                        
                          <Link  to="/Carpolicyinfo" className="buttonactions disablled">
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                        ) }
                 
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
export default Carbasicinfo;