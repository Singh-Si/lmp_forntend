import React, { useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Yachtbanner from "../Banner/Yachtbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useSelector } from "react-redux";
import { yachtHullMaterials } from "../../functions";
import axios from "axios";
import { API_URL } from "../..";
import { useNavigate } from "react-router-dom/dist";
import { YachtDetailsValidation } from "../../Validators/yachtDetailsValidator";
import swal from "sweetalert";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import YachtInsurancedetails from "../Common/YachtInsurancedetails";
import { io } from "socket.io-client";

let countt = 0
const Yachtdetails = () => {
  const { handlYachteSelect, handlYachtEstimatedSelect,
    handlYachtestimatedSelectFormValue, handlYachteSelectFormValue, yachttooltip } = UseMotorContext();
  const YachtFormsData = useSelector((state) => state.YachtReducer)

  const Progress = 40;
  const [Obj, setObj] = useState({
    getPolicyType: [],
    get_Yacht_hull_materials: [],
    getAllCompanies: [],
    getPlanFor: [],
    activeboaBreadth: []
  })
  const [socket, setSocket] = useState(null)
  useEffect(() => {
    if (countt === 0) {
      const newSocket = io('http://localhost:8000', {
        query: {
          userType: 'lob',
          lob: "liveOnYacht"// or 'unregistered'
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
              lob: "liveOnYacht"// or 'unregistered'
            },
          })
          setSocket(newSocket)
          // ViewingTravelLOB()
        } else if (document.visibilityState === 'hidden' && countt == 2) {
          if (socket) {
            socket.disconnect()
          }
          setTimeout(() => {
            countt = 0
          }, 10000);
        }
        // ViewingYachtLOB()
      

    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener on component unmount
   
    (async () => {
      for (let value in Obj) {
        //console.log(">>", value)
        await axios.get(`${API_URL}/api/${value}`).then((res) => {
          if (res.config.url.includes("getPolicyType")) {
            console.log("response>>>>>", res.data.data)
            if (!YachtFormsData.current_policy_status && !YachtFormsData.policyTypeId){
              handlYachtestimatedSelectFormValue(
                "current_policy_status",
                res.data.data[0]["policy_type_name"]
              );
            handlYachteSelectFormValue(
              "current_policy_status",
              res.data.data[0]["policy_type_name"]
            );
            handlYachteSelectFormValue(
              "policyTypeId",
              res.data.data[0]["_id"]
            )
            handlYachtestimatedSelectFormValue(
              "policyTypeId",
              res.data.data[0]["_id"]
            )
            }
            
          }
          if (res.config.url.includes("getPlanFor")) {
            if (!YachtFormsData.yacht_type_of_use ){
              handlYachtestimatedSelectFormValue(
                "yacht_type_of_use",
                res.data.data[0]["plan_for_name"]
              );
            handlYachtestimatedSelectFormValue(
              "typeOfUseId",
              res.data.data[0]["_id"]
            );

            handlYachteSelectFormValue(
              "yacht_type_of_use",
              res.data.data[0]["plan_for_name"]
            );
            handlYachteSelectFormValue(
              "typeOfUseId",
              res.data.data[0]["_id"]
            );
            }
            
          }
          if (res.config.url.includes("activeboaBreadth")) {
            if (!YachtFormsData.boat_breath_in_meter && !YachtFormsData.boat_breath_in_meter_id){
              // handlYachtestimatedSelectFormValue(
              //   "boat_breath_in_meter_id",
              //   res.data.data[0]["_id"]
              // );
              // handlYachteSelectFormValue(
              //   "boat_breath_in_meter_id",
              //   res.data.data[0]["_id"]
              // );
              // handlYachteSelectFormValue(
              //   "boat_breath_in_meter",
              //   res.data.data[0]["name"]
              // );
              // handlYachtestimatedSelectFormValue(
              //   "boat_breath_in_meter",
              //   res.data.data[0]["name"]
              // );
            }
          }
          setObj((prev) => ({ ...prev, [value]: res.data.data }))

        })
      }
    })()
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [])
  // useEffect(() => {
  //   ViewingYachtLOB()
  // },[])
console.log("YachtFormsData",Obj.activeboaBreadth)

  const navigate = useNavigate()
  const handleNext = (routname) => {
    let errorCheck = YachtDetailsValidation(YachtFormsData)
    let message = ""
    if (errorCheck.error) {
      message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
      message = message.replace(/"/g, '')
    } else if (!YachtFormsData.buying_used_boat &&
      !YachtFormsData.bot_brand_new && YachtFormsData.bot_current_insurance_company_id == "") {
      message = "Please Select Current Isurer"
    }
    if (message !== "") {
      swal({
        text: `${message}`,
        icon: "warning",
        button: "Ok",
      });
    }
    else {
      navigate(routname)
    }
  }
  useEffect(() => {
    if (YachtFormsData.bot_brand_new) {

      handlYachteSelectFormValue("buying_used_boat", false);
      // handlYachteSelectFormValue("buying_used_boat",false);
      handlYachteSelectFormValue("bot_current_insurance_company_id", "");
      handlYachteSelectFormValue("bot_current_renewal", false);
   

    } else if (YachtFormsData.bot_brand_new == false) {
      handlYachteSelectFormValue("buying_used_boat", true);
      // handlYachteSelectFormValue("bot_current_insurance_company_id", "");

    }

  }, [YachtFormsData.bot_brand_new]);

  useEffect(() => {
    if (YachtFormsData.buying_used_boat) {
      handlYachteSelectFormValue("bot_brand_new", false);
      handlYachteSelectFormValue("bot_current_insurance_company_id", "");
      handlYachteSelectFormValue("bot_current_renewal", false);
    } else if (!YachtFormsData.buying_used_boat && !YachtFormsData.bot_brand_new) {
      handlYachteSelectFormValue("bot_brand_new", false);
      handlYachteSelectFormValue("buying_used_boat", false);
    }
  }, [YachtFormsData.buying_used_boat]);
  // const ViewingYachtLOB = async () => {
  //   try {
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         lob: 'Yacht'
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
      <Yachtbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12">
              <div className="row form_abcd">

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <ul className="mb-3">
                    <li>Please fill details of boat :</li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4" style={{position:'relative'}}>
                      <InputGroup >
                        <Form.Control
                          required
                          type="text"
                          name="boat_name"
                          value={YachtFormsData?.boat_name}
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          // placeholder="Name of the Boat"
                          placeholder="Yacht Name"
                          aria-label="Yacht Name"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.boatDetails?.yachtName}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{top:'15px'}} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4" style={{position:'relative'}}>
                      <InputGroup>
                        <Form.Control

                          name="boat_registration_no"
                          value={YachtFormsData?.boat_registration_no}
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          required
                          placeholder="Reg No. (Optional)"
                          aria-label="Reg No. (Optional)"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.boatDetails?.regNo}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{top:'15px'}} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4" style={{position:'relative'}}>
                      <InputGroup>
                        <Form.Control
                          name="boat_hull_serial_number"
                          value={YachtFormsData?.boat_hull_serial_number}
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          required
                          placeholder="Hull Serial Number"
                          aria-label="Hull Serial Number"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.boatDetails?.hullSerialNumber}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{top:'15px'}} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4" style={{position:'relative'}}>
                      <select
                        name="boat_hull_material"
                        value={YachtFormsData?.boat_hull_material }
                        onChange={(e) => {
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          const selectedId = selectedOption.getAttribute("id");

                          handlYachtestimatedSelectFormValue("hullId", selectedId)
                          handlYachteSelectFormValue("hullId", selectedId)
                          handlYachtEstimatedSelect(e)
                          handlYachteSelect(e)
                        }}

                        className="form-control">
                        <option value={""} hidden> Select Hull material</option>
                        {
                          Obj.get_Yacht_hull_materials.length > 0 ? Obj.get_Yacht_hull_materials.map((item) => {
                            return <option value={item.yacht_hull_material} id={item._id}>{item?.yacht_hull_material}</option>
                          }) : <option value={""}>Select Hull material</option>
                        }
                      </select>

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4" style={{position:'relative'}}>
                      <InputGroup>
                        <Form.Control
                          name="boat_length_in_meter"
                          value={YachtFormsData?.boat_length_in_meter}
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          required
                          placeholder="Length of the boat  (In Meter)"
                          aria-label="Length of the boat  (In Meter)"
                          type="number"
                          onWheel={(e) => e.target.blur()}
                          onKeyDown={(e) => {
                            // Disable keyboard arrows
                            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                              e.preventDefault();
                            }
                          }}
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.boatDetails?.lengthOfBoat}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{top:'15px'}} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4" style={{position:'relative'}}>
                      {/* <InputGroup>

                        <Form.Control

                          name="boat_breath_in_meter"
                          value={YachtFormsData?.boat_breath_in_meter}
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          required
                          placeholder="Breadth of the boat  (In Meter)"
                          aria-label="Breadth of the boat  (In Meter)"
                          type="number"
                          onWheel={(e) => e.target.blur()}
                          onKeyDown={(e) => {
                            // Disable keyboard arrows
                            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                              e.preventDefault();
                            }
                          }}
                        />
                      </InputGroup> */}
                      <select
                        name="boat_breath_in_meter"
                        value={YachtFormsData?.boat_breath_in_meter }
                        onChange={(e) => {
                                 const selectedOption =
                        e.target.options[e.target.selectedIndex];
                      const selectedId = selectedOption.getAttribute("id");
                      
                          handlYachtestimatedSelectFormValue("boat_breath_in_meter_id",selectedId)
                         handlYachteSelectFormValue("boat_breath_in_meter_id",selectedId)
                          handlYachtEstimatedSelect(e)
                          handlYachteSelect(e)  
                        }}
                       
                        className="form-control">
                        <option value={""} hidden> Trading Area/ Cruising Limit</option>
                        {
                          Obj.activeboaBreadth.length > 0 ? Obj.activeboaBreadth.map((item) => {
                            return <option value={item.name} id={item._id}>{item?.name}</option>
                          }) : <React.Fragment>Trading Area/ Cruising Limit</React.Fragment>
                        }
                      </select>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4" style={{position:'relative'}}>
                      <InputGroup>
                        <Form.Control
                          name="no_of_passengers"
                          value={YachtFormsData?.no_of_passengers}
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          required
                          placeholder="No. of Passengers"
                          aria-label="No. of Passengers"
                          type="number"
                          onWheel={(e) => e.target.blur()}
                          onKeyDown={(e) => {
                            // Disable keyboard arrows
                            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                              e.preventDefault();
                            }
                          }}
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.boatDetails?.numberOfPassengers}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{top:'15px'}} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4" style={{position:'relative'}}>
                      <InputGroup>
                        <Form.Control

                          name="place_of__mooring"
                          value={YachtFormsData?.place_of__mooring}
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          required
                          placeholder="Place of Mooring (Optional)"
                          aria-label="Place of Mooring (Optional)"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.boatDetails?.placeOfMooring}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" style={{top:'15px'}} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12 mb-4">
                      <ul>
                        <li>Type Of Use</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          {
                            Obj.getPlanFor.length > 0 && Obj.getPlanFor.map((v, i) => {
                              return (
                                <div key={v._id} className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide">
                                  <label
                                    className={
                                      YachtFormsData.yacht_type_of_use ==
                                        v?.plan_for_name
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                    onClick={() => {
                                      handlYachteSelectFormValue(
                                        "yacht_type_of_use",
                                        v?.plan_for_name
                                      )
                                      handlYachteSelectFormValue(
                                        "typeOfUseId",
                                        v?._id
                                      )

                                      handlYachtestimatedSelectFormValue(
                                        "yacht_type_of_use",
                                        v?.plan_for_name
                                      )
                                      handlYachtestimatedSelectFormValue(
                                        "typeOfUseId",
                                        v?._id
                                      )


                                    }}
                                  >
                                    <input
                                      type="radio"
                                      name="options"
                                      defaultChecked={
                                        YachtFormsData.yacht_type_of_use ==
                                          v?.plan_for_name
                                          ? "btn btn-default active"
                                          : "btn btn-default"
                                      }
                                    />
                                    {v?.plan_for_name}
                                  </label>
                                </div>
                              );
                            })
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <ul>
                        <li>Is your boat brand new?</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          <div className="col-lg-6 radiohide">
                            <label
                              className={
                                YachtFormsData.bot_brand_new
                                  ? "btn btn-default active"
                                  : "btn btn-default"
                              }
                              onClick={(e) => {
                                handlYachteSelectFormValue("bot_brand_new", true);
                              }}
                            >
                              Yes
                              <input
                                type="radio"
                                name="options"
                                defaultChecked={
                                  YachtFormsData.bot_brand_new
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                }
                              />
                            </label>
                          </div>
                          <div className="col-lg-6 radiohide">
                            <label
                              className={
                                !YachtFormsData.bot_brand_new
                                  ? "btn btn-default active"
                                  : "btn btn-default"
                              }
                              onClick={(e) => {
                                handlYachteSelectFormValue("bot_brand_new", false);
                              }}
                            >
                              No
                              <input
                                type="radio"
                                name="options"
                                defaultChecked={
                                  !YachtFormsData.bot_brand_new
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                }
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!YachtFormsData.bot_brand_new && (
                      <>
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                          <ul>
                            <li>Select last year insurance type</li>
                          </ul>
                          <div className="button-group-pills" data-toggle="buttons">
                            <div className="row">
                              {Obj.getPolicyType &&
                                Obj.getPolicyType.length > 0 && Obj.getPolicyType.map((v, i) => {
                                  return (
                                    <div key={v._id} className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide">
                                      <label
                                        className={
                                          YachtFormsData.current_policy_status ==
                                            v?.policy_type_name
                                            ? "btn btn-default active"
                                            : "btn btn-default"
                                        }
                                        onClick={() => {
                                          handlYachteSelectFormValue(
                                            "current_policy_status",
                                            v?.policy_type_name
                                          )
                                          handlYachtestimatedSelectFormValue(
                                            "current_policy_status",
                                            v?.policy_type_name
                                          )
                                          handlYachteSelectFormValue(
                                            "policyTypeId",
                                            v?._id
                                          )
                                          handlYachtestimatedSelectFormValue(
                                            "policyTypeId",
                                            v?._id
                                          )

                                        }}
                                      >
                                        <input
                                          type="radio"
                                          name="options"
                                          defaultChecked={
                                            YachtFormsData.current_policy_status ==
                                              v?.policy_type_name
                                              ? "btn btn-default active"
                                              : "btn btn-default"
                                          }
                                        />
                                        {v?.policy_type_name}
                                      </label>
                                    </div>
                                  );
                                })
                              }
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                          <ul>
                            <li style={{ whiteSpace: "nowrap" }}>Are you buying a used Yacht?</li>
                          </ul>
                          <div className="button-group-pills" data-toggle="buttons">
                            <div className="row">
                              <div className="col-lg-6 radiohide">
                                <label
                                  className={
                                    YachtFormsData.buying_used_boat
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                  onClick={(e) => {
                                    handlYachteSelectFormValue("buying_used_boat", true);
                                  }}
                                >
                                  Yes
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      YachtFormsData.buying_used_boat
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                  />
                                </label>
                              </div>
                              <div className="col-lg-6 radiohide">
                                <label
                                  className={
                                    !YachtFormsData.buying_used_boat
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                  onClick={(e) => {
                                    handlYachteSelectFormValue("buying_used_boat", false);
                                    // handlYachteSelectFormValue("bot_current_renewal", false);
                                  }}
                                >
                                  No
                                  <input
                                    type="radio"
                                    name="options"
                                    defaultChecked={
                                      !YachtFormsData.buying_used_boat
                                        ? "btn btn-default active"
                                        : "btn btn-default"
                                    }
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                      </>
                    )}
                    {!YachtFormsData.buying_used_boat &&
                      !YachtFormsData.bot_brand_new && (
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">

                          <>
                            <div style={{ padding: "8px" }}>
                              <br />

                            </div>

                            <select
                              onChange={(e) => {
                                handlYachteSelectFormValue(
                                  "bot_current_insurance_company_id",
                                  e.target.value
                                )
                                handlYachteSelectFormValue(
                                  "bot_current_renewal",
                                  true
                                )
                              }}
                              value={
                                YachtFormsData?.bot_current_insurance_company_id
                              }

                              className="quotes_select form-control"
                            >
                              <option value="" hidden>
                                Select Current Insurer
                              </option>
                              {Obj.getAllCompanies.length > 0 ? (
                                Obj.getAllCompanies.map((v, i) => {
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
                                <React.Fragment></React.Fragment>
                              )}
                            </select>

                          </>

                        </div>
                      )}




                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}>
                      <a onClick={() => handleNext("/YachtlYear")} className="buttonactions">
                        Next<i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Insurancedetails /> */}
      <YachtInsurancedetails />
      <Footer />
    </div >
  );
};

export default Yachtdetails;
