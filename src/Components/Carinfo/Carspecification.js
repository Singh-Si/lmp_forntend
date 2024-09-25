import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";
const Carspecification = () => {
  const [Years, setYears] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(9);

  const {
    setMotorFormsData,
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
  const Progress = 55;
  useEffect(() => {
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", motorFormsData);
    const currentdate = parseInt(motorFormsData.model_year);

    const y = [
      { year: currentdate - 1 },
      { year: currentdate },
      { year: currentdate + 1 },
    ];
    setYears(y);
    const shouldShowMore =
      Number(motorFormsData.registration_year) < 2014;
    if (shouldShowMore) {
      setItemsToShow(y.length);
    }
  }, []);
  const showmore = () => {
    setItemsToShow(Years.length);
  };

  const showless = () => {
    setItemsToShow(9);
  };
  const onClickDivclick = (e) => {
    
  };
  const CarsSpecificationArray= [{label:"GCC Spec",value:"GCC"},{label:"Non-GCC Spec/Modified",value:"NON-GCC"}]
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
                    <li>First registration year ?</li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {Years.length>0 ? (
                        Years.map((v, i) => {
                          return (
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                              <label
                                className={
                                  motorFormsData &&
                                    motorFormsData?.registration_year == v.year
                                    ? "btn btn-default active"
                                    : !motorFormsData?.registration_year &&
                                      i === 0
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                }
                              >
                                <input type="radio" name="options" />
                                <div
                                  className="register_year"
                                  onClick={(e)=>handleSubmitMotorform("registration_year", v.year)}
                                >
                                  {v.year}
                                </div>
                              </label>
                            </div>
                          );
                        })
                      ) : (
                        <>Not Found</>
                      )}
                    </div>
               
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <ul>
                    <li>What is Your Vehicle’s Specification ? </li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {
                        CarsSpecificationArray.length>0 &&(<>
                        {
                          CarsSpecificationArray.map((item)=>{
                            return (
                              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 radiohide mb-3">
                            <label className={`btn btn-default ${motorFormsData.vehicle_specification===item.value?'active':''} `}>
                              <input type="radio" name="options" />
                              <div
                                className="vehicle_specification"
                                onClick={(e)=>handleSubmitMotorform("vehicle_specification", item.value)}
                              >
                              { item.label}
                              </div>
                            </label>
                          </div>
                            )
                          })
                        }
                        </>)
                      }
                  
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Carregisterlocation" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link to="/Personaldetails" className="buttonactions">
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

export default Carspecification;
