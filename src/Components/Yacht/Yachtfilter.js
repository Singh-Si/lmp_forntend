import React, { useEffect, useState, useMemo } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import Moment from "react-moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import {
  fetchDrivingExperienceError,
  fetchDrivingExperienceSuccess,
  AddYachtRenewelData,
  DeleteAllFromComapre,
  AddYachtEstimatedValue,
} from "../../redux/reducers/YachtDataReducerSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetch, yachtHullMaterials,
} from "../../functions";
import PhoneInput from "react-phone-number-input";
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import MockData from "../../mockdata/YachtMakerData.json"
import { UpdateYachtDetailsValidation } from "../../Validators/yachtDetailsValidator";
const Yachtfilter = () => {
  const dispatch = useDispatch();
  const YachtFormsData = useSelector(
    (state) => state.YachtReducer);
  const { handlYachtestimatedSelectFormValue, handlYachteSelectFormValue, handlYachtEstimatedSelect, saveYachtdata, saveYachtdataByBE, handlYachteSelect } =
    UseMotorContext();
  const [yachtDetailsdata, setYachtDetails] = useState({
    sum_insured_hull_equipment_value: YachtFormsData?.sum_insured_hull_equipment_value?.toLocaleString()
  })
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPersonalEditMode, setPersonalIsEditMode] = useState(false);
  const [Years, setYears] = useState([]);
  const [runEffects, setRunEffects] = useState(false);
  const [YachtModels, setYachtModels] = useState([])
  const [YachtVarient, setYachtVarient] = useState([])
  const [get_Yacht_hull_materials, setget_Yacht_hull_materialsj] = useState([])
  const [Businesstypes, setBusinesstypes] = useState([])
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const fieldName = e.target.name;

    // Check if the input is a valid number
    if (!/^[0-9,]*$/.test(inputValue)) {
      // Display a warning message
      swal({
        text: "Please enter a valid number.",
        icon: "warning",
        button: "Ok",
      });
      return; // Don't proceed if it's not a valid number
    }

    // Remove commas from the input value to get a plain number
    const plainNumber = inputValue.replace(/,/g, '');

    // Format the plain number with commas
    const formattedNumber = Number(plainNumber).toLocaleString();

    // Update the formatted value state
    setYachtDetails((prevFormattedValues) => ({
      ...prevFormattedValues,
      [fieldName]: formattedNumber,
    }));
    console.log("plainnumber", formattedNumber)
    // Your other logic goes here, e.g., calling the handlers
    handlYachtestimatedSelectFormValue(fieldName, +plainNumber);
  };
  const handlePersonalEditModeToggle = () =>
    setPersonalIsEditMode((prevEditMode) => !prevEditMode);
  const handleEditModeToggle = async () => {
    setRunEffects((prevEditMode) => !prevEditMode);
    setIsEditMode((prevEditMode) => !prevEditMode);
  };
  const handlePersonalDetails = (e) => {
    handlYachtestimatedSelectFormValue(e.target.name, e.target.value)
  };
  const handlePhoneChange = (value) => {
    handlYachtestimatedSelectFormValue("phoneno", value)
  };

  const UpdatePersonalDetails = async () => {
    const updatedData = {
      name: YachtFormsData.estimatedname !== "" ? YachtFormsData.estimatedname : YachtFormsData.name,
      phoneno:
        YachtFormsData.estimatedphoneno !== ""
          ? YachtFormsData.estimatedphoneno
          : YachtFormsData.phoneno,
    }
    if (YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual")) {
      updatedData["date_of_birth"] = YachtFormsData.estimateddate_of_birth !== "" ? YachtFormsData.estimateddate_of_birth : YachtFormsData.date_of_birth
    } else {
      updatedData["businessTypeId"] = YachtFormsData.estimatedbusinessTypeId !== "" ? YachtFormsData.estimatedbusinessTypeId : YachtFormsData.businessTypeId
    }


    let checkdob = YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? YachtFormsData.estimateddate_of_birth : YachtFormsData.estimatedbusinessTypeId
    let errorMessage = "";
    if (!YachtFormsData.estimatedname) {
      errorMessage = "Please Enter Your Name";
    } else if (!YachtFormsData.estimatedphoneno) {
      errorMessage = "Please Enter a Valid Phone Number";
    }
    else if (!checkdob) {
      console.log("businessTypeId", YachtFormsData.businessTypeId)
      errorMessage = YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Please Enter Your Date of Birth" : "Please Select Business Type"
    }
    if (errorMessage) {
      swal({
        text: errorMessage,
        icon: "warning",
      });
    }
    else {
      for (let i = 0; i < Object.keys(updatedData).length; i++) {
        handlYachteSelectFormValue(
          Object.keys(updatedData)[i],
          Object.values(updatedData)[i]
        );
      }

      await updatePolicyDetails(updatedData, setPersonalIsEditMode)
    }

  };

  const handleCancelVehicleDetails = () => {
    dispatch(AddYachtEstimatedValue({ name: "estimatedYachtMaker", value: YachtFormsData.YachtMaker, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedsum_insured_hull_equipment_value", value: YachtFormsData.sum_insured_hull_equipment_value, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedmodel_year", value: YachtFormsData.model_year, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedyacht_type_of_use", value: YachtFormsData.yacht_type_of_use, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedno_of_passengers", value: YachtFormsData.no_of_passengers, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedboat_breath_in_meter", value: YachtFormsData.boat_breath_in_meter, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedboat_length_in_meter", value: YachtFormsData.boat_length_in_meter, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedyacht_hull_material", value: YachtFormsData.yacht_hull_material, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedboat_hull_serial_number", value: YachtFormsData.boat_hull_serial_number, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedYachtVarient", value: YachtFormsData.YachtVarient, }))
    setIsEditMode((prevEditMode) => !prevEditMode);
  }
  const handleCancelPersonelDetails = () => {
    handlYachtestimatedSelectFormValue("name", YachtFormsData.name)
    handlYachtestimatedSelectFormValue("phoneno", YachtFormsData.phoneno)
    handlYachtestimatedSelectFormValue("date_of_birth", YachtFormsData.date_of_birth)
    setPersonalIsEditMode((prevEditMode) => !prevEditMode);
  }
  const handleUpdateVehicleDetails = async () => {
    if (YachtModels.length == 0) {
      swal({
        title: "Error!",
        text: "Please Select Other Model Year",
        icon: "warning",
      });
    }
    else {
      const errorCheck = UpdateYachtDetailsValidation(YachtFormsData)
      if (errorCheck.error) {
        let message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
        message = message.replace(/"/g, '')
        swal({
          title: "Error!",
          text: message,
          icon: "warning",
        });

      } else {

        setIsEditMode((prevEditMode) => !prevEditMode);
        let obj = {
          hullId: YachtFormsData.estimatedhullId,
          YachtMaker: YachtFormsData.estimatedYachtMaker,
          yacht_type_of_use: YachtFormsData.estimatedyacht_type_of_use,
          YachtVarient: YachtFormsData.estimatedYachtVarient,
          model_year: YachtFormsData.estimatedmodel_year,
          boat_details: {
            boat_name: YachtFormsData.estimatedboat_name,
            boat_registration_no: YachtFormsData.estimatedboat_registration_no,
            boat_hull_serial_number: YachtFormsData.estimatedboat_hull_serial_number,
            boat_hull_material: YachtFormsData.estimatedboat_hull_material,
            boat_length_in_meter: YachtFormsData.estimatedboat_length_in_meter,
            boat_breath_in_meter: YachtFormsData.estimatedboat_breath_in_meter,
            no_of_passengers: YachtFormsData.estimatedno_of_passengers,
            place_of__mooring: YachtFormsData.estimatedplace_of__mooring,
            is_vessel_a_conversion: YachtFormsData.estimatedis_vessel_a_conversion,
            current_policy_status: YachtFormsData.estimatedcurrent_policy_status,
          },
          boat_engine_details: {
            engine_type: YachtFormsData.estimatedengine_type,
            engine_maker: YachtFormsData.estimatedengine_maker,
            engine_seriel_number: YachtFormsData.estimatedengine_seriel_number,
            engine_model_year: YachtFormsData.estimatedengine_model_year,
            engine_horsepower: YachtFormsData.estimatedengine_horsepower,
            engine_speed: YachtFormsData.estimatedengine_speed
          },
          sumInsured: {
            sum_insured_hull_equipment_value: YachtFormsData.estimatedsum_insured_hull_equipment_value,
            sum_insured_dinghy_tender: YachtFormsData.estimatedsum_insured_dinghy_tender,
            sum_insured_out_board: YachtFormsData.estimatedsum_insured_out_board,
            sum_insured_personal_effect_including_cash: YachtFormsData.estimatedsum_insured_personal_effect_including_cash,
            sum_insured_trailer: YachtFormsData.estimatedsum_insured_trailer,
          },

        }
        if (obj.boat_details && obj.boat_engine_details && obj.sumInsured) {
          for (let i = 0; i < Object.keys(obj.boat_details).length; i++) {
            handlYachteSelectFormValue(
              Object.keys(obj.boat_details)[i],
              Object.values(obj.boat_details)[i]
            );
          }
          for (let i = 0; i < Object.keys(obj.boat_engine_details).length; i++) {
            handlYachteSelectFormValue(
              Object.keys(obj.boat_engine_details)[i],
              Object.values(obj.boat_engine_details)[i]
            );
          }
          for (let i = 0; i < Object.keys(obj.sumInsured).length; i++) {
            handlYachteSelectFormValue(
              Object.keys(obj.sumInsured)[i],
              Object.values(obj.sumInsured)[i]
            );
          }
        }
        handlYachteSelectFormValue("YachtMaker", obj.YachtMaker)
        handlYachteSelectFormValue("YachtVarient", obj.YachtVarient)
        handlYachteSelectFormValue("model_year", obj.model_year)
        handlYachteSelectFormValue("yacht_type_of_use", obj.yacht_type_of_use) 
        handlYachteSelectFormValue("hullId", obj.hullId) 
        await updatePolicyDetails(obj)
      }

    }
  }
  const updatePolicyDetails = async (obj, setEdit) => {
    await axios
      .put(
        `${API_URL}/api/updatePolicyDetails?id=${YachtFormsData.leadid}`,
        {
          ...obj
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setEdit(false);
          handlYachteSelectFormValue("isupdated", Date.now())
        } else {
          return;
        }
      })
      .catch((error) => {
        handlYachteSelectFormValue("isupdated", Date.now())
        console.log(error)
      })
  }
  useEffect(() => {
    setYachtDetails(prev => ({ ...prev, sum_insured_hull_equipment_value: YachtFormsData?.sum_insured_hull_equipment_value?.toLocaleString() }))

    dispatch(AddYachtEstimatedValue({ name: "estimatedYachtMaker", value: YachtFormsData.YachtMaker, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedsum_insured_hull_equipment_value", value: YachtFormsData.sum_insured_hull_equipment_value, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedmodel_year", value: YachtFormsData.model_year, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedyacht_type_of_use", value: YachtFormsData.yacht_type_of_use, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedno_of_passengers", value: YachtFormsData.no_of_passengers, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedboat_breath_in_meter", value: YachtFormsData.boat_breath_in_meter, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedboat_length_in_meter", value: YachtFormsData.boat_length_in_meter, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedyacht_hull_material", value: YachtFormsData.yacht_hull_material, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedboat_hull_serial_number", value: YachtFormsData.boat_hull_serial_number, }))
    dispatch(AddYachtEstimatedValue({ name: "estimatedYachtVarient", value: YachtFormsData.YachtVarient, }))
    axios.get(`${API_URL}/api/get_Yacht_hull_materials`).then((res) => {
      setget_Yacht_hull_materialsj(res.data.data)
    }).catch((err) => {
      //console.log(err)
      setget_Yacht_hull_materialsj([])
    })
    axios.get(`${API_URL}/api/getActiveBusinessType`).then((response) => {
      response.data.data && setBusinesstypes(response.data.data);
    }).catch((err) => {
      //console.log(err)
      setget_Yacht_hull_materialsj([])
    })

    axios
      .post(API_URL + "/api/getYachtDetails")
      .then((res) => {
        setYears(res.data.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, [])

  useEffect(() => {
    if (YachtFormsData.estimatedmodel_year && isEditMode) {
      axios
        .post(API_URL + "/api/getYachtDetails", {
          year: YachtFormsData?.estimatedmodel_year,
        }).then(res => {
          let data = res.data.data
          setYachtModels(res.data.data)
          let isEstimatedYachtModel = data.find((item) => item._id == YachtFormsData.estimatedYachtMaker)

          if (isEstimatedYachtModel) {
            dispatch(AddYachtEstimatedValue({ name: "estimatedYachtMaker", value: isEstimatedYachtModel._id, }))
          } else {
            dispatch(AddYachtEstimatedValue({ name: "estimatedYachtMaker", value: res.data.data[0]["_id"] }))

          }

        }).catch(err => {
          //console.log("err", err)
          dispatch(AddYachtEstimatedValue({ name: "estimatedYachtMaker", value: "", }))
          dispatch(AddYachtEstimatedValue({ name: "estimatedYachtVarient", value: "", }))
          setYachtModels([])
          setYachtVarient([])
        })
    }
  }, [YachtFormsData.estimatedmodel_year, isEditMode]);
  useEffect(() => {
    if (isEditMode && YachtFormsData.estimatedYachtMaker) {
      axios
        .post(API_URL + "/api/getYachtDetails", {
          year: YachtFormsData?.estimatedmodel_year,
          yachtMakeId: YachtFormsData.estimatedYachtMaker
        }).then(res => {
          setYachtVarient(res.data.data)
          let isYachtVarient = res.data.data.find((item) => item._id == YachtFormsData?.estimatedYachtVarient)
          if (YachtFormsData.estimatedYachtMaker == "") {
            dispatch(AddYachtEstimatedValue({ name: "estimatedYachtVarient", value: "", }))
          }
          if (YachtFormsData.estimatedYachtMaker !== "") {
            if (isYachtVarient) {
              dispatch(AddYachtEstimatedValue({ name: "estimatedYachtVarient", value: isYachtVarient._id, }))
            } else {
              dispatch(AddYachtEstimatedValue({ name: "estimatedYachtVarient", value: res.data.data[0]["_id"], }))
            }
          }

        }).catch(err => {
          dispatch(AddYachtEstimatedValue({ name: "estimatedYachtVarient", value: "", }))
          setYachtVarient([])
        }
        )
    }


  }, [YachtFormsData.estimatedYachtMaker, isEditMode]);

  useEffect(() => {
    try {
      if (!isEditMode) {
        axios
          .post(API_URL + "/api/getYachtDetails", {
            year: YachtFormsData?.model_year,
          }).then(res => {
            let data = res.data.data
            let isEstimatedYachtModel = data.find((item) => item._id == YachtFormsData.YachtMaker)
            if (isEstimatedYachtModel) {
              setYachtDetails(prev => ({
                ...prev,
                model: isEstimatedYachtModel.name
              }))
            }
            axios
              .post(API_URL + "/api/getYachtDetails", {
                year: YachtFormsData?.model_year,
                yachtMakeId: isEstimatedYachtModel._id
              }).then(res => {

                let isYachtVarient = res.data.data.find((item) => item._id == YachtFormsData?.estimatedYachtVarient)
                if (isYachtVarient) {
                  setYachtDetails(prev => ({
                    ...prev,
                    varient: isYachtVarient.name
                  }))

                }
              }).catch(err => {
                console.log(err)
              }
              )

          }).catch(err => {
            //console.log("err", err)

          })
      }
    } catch (error) {
      console.log("errorrr", error)
    }
  }, [isEditMode]);



  return (
    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 filters">
      <h4 className="car details">
        Yacht Details{" "}
        {window.location.pathname === "/Yachtquotes" ? (
          <>
            <i className="fa fa-edit" onClick={handleEditModeToggle}></i>
            <Link
              className="buttonactions"
              style={{ padding: "6px 19px", marginLeft: "10%" }}
              to={"/OpearatorExperience"}
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
              Back
            </Link>
          </>
        ) : 
        window.location.pathname === "/YachtComparision" ?
        (
          <>
            <Link
              className="buttonactions"
              style={{ padding: "6px 19px", marginLeft: "10%" }}
              to={"/Yachtquotes"}
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
              Back
            </Link>
          </>
        ) : (
          <></>
       
        )
        }
      </h4>

      <>
        <div className="filterssas one">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Type Of Use</h6>
            </div>

            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <InputGroup >
                  <Form.Control
                    required
                    value={YachtFormsData?.yacht_type_of_use}
                    readOnly
                  />
                </InputGroup>
              ) : (
                <h6>{YachtFormsData?.yacht_type_of_use}</h6>
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Yacht Name</h6>
            </div>

            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <InputGroup >
                  <Form.Control
                    required
                    name="boat_name"
                    value={YachtFormsData?.estimatedboat_name}
                    onChange={handlYachtEstimatedSelect}
                    // placeholder="Name of the Boat"
                    placeholder="Yacht Name"
                    aria-label="Yacht Name"
                  />
                </InputGroup>

              ) : (
                <h6>{YachtFormsData?.boat_name}</h6>
              )}
            </div>
            {/* <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6>Place of Mooring</h6>
              </div>

              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <InputGroup >
                    <Form.Control
                      required
                      name="place_of__mooring"
                      value={YachtFormsData?.estimatedplace_of__mooring}
                      onChange={handlYachtEstimatedSelect}
                      // placeholder="Name of the Boat"
                      placeholder="Place of Mooring"
                      aria-label="Place of Mooring"
                    />
                  </InputGroup>
                ) : (
                  <h6>{YachtFormsData?.place_of__mooring}</h6>
                )}
              </div> */}
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Hull & Equipment Value</h6>
            </div>

            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <InputGroup >
                  <Form.Control
                    required
                    type="text"
                    name="sum_insured_hull_equipment_value"
                    value={yachtDetailsdata?.sum_insured_hull_equipment_value}
                    onChange={handleInputChange}
                    placeholder="Hull & Equipment Value"
                    aria-label="Hull & Equipment Value"
                  />
                </InputGroup>
              ) : (
                <h6>{YachtFormsData?.sum_insured_hull_equipment_value?.toLocaleString()}</h6>
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>No. of Passengers</h6>
            </div>

            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <InputGroup >
                  <Form.Control
                    type="number"
                    required
                    name="no_of_passengers"
                    value={YachtFormsData?.estimatedno_of_passengers}
                    onChange={handlYachtEstimatedSelect}
                    placeholder="No. of Passengers"
                    aria-label="No. of Passengers"
                  />
                </InputGroup>
              ) : (
                <h6>{YachtFormsData?.no_of_passengers}</h6>
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Length of the boat(in Meteres)</h6>
            </div>

            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <InputGroup >
                  <Form.Control
                    type="number"
                    required
                    name="boat_length_in_meter"
                    value={YachtFormsData?.estimatedboat_length_in_meter}
                    onChange={handlYachtEstimatedSelect}
                    placeholder="Length of the boat  (In Meter)"
                    aria-label="Length of the boat  (In Meter)"
                  />
                </InputGroup>
              ) : (
                <h6>{YachtFormsData?.boat_length_in_meter}</h6>
              )}
            </div>
            {/* <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Breadth of the boat(in Meteres)</h6>
            </div>

            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <InputGroup >
                  <Form.Control
                    type="number"
                    required
                    name="boat_breath_in_meter"
                    value={YachtFormsData?.estimatedboat_breath_in_meter}
                    onChange={handlYachtEstimatedSelect}
                    placeholder="Breadth of the boat  (In Meter)"
                    aria-label="Breadth of the boat  (In Meter)"
                  />
                </InputGroup>
              ) : (
                <h6>{YachtFormsData?.boat_breath_in_meter}</h6>
              )}
            </div> */}
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Hull material</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <select
                  name="boat_hull_material"
                  onChange={(e)=>{
                    const selectedOption =
                    e.target.options[e.target.selectedIndex];
                  const selectedId = selectedOption.getAttribute("id");
                  handlYachtestimatedSelectFormValue("hullId",selectedId)
                  handlYachtestimatedSelectFormValue("boat_hull_material",e.target.value)
                  }}
                  className="form-control"
                  value={YachtFormsData?.estimatedboat_hull_material}
                >
                  <option value={""}> Select Hull Material</option>
                  {
                    get_Yacht_hull_materials.length > 0 ? get_Yacht_hull_materials.map((item) => {
                      return <option id={item._id} value={item.yacht_hull_material}>{item?.yacht_hull_material}</option>
                    }) : <option>Select Hull Material </option>
                  }
                </select>
              ) : (
                <h6>{
                  YachtFormsData?.boat_hull_material
                }</h6>
              )}
            </div>

            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Model Year</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <select
                  name="model_year"
                  onChange={handlYachtEstimatedSelect}
                  className="form-control"
                  value={YachtFormsData?.estimatedmodel_year}
                >
                  {Years.length > 0 &&
                    Years.map((item, i) => (
                      <option value={item?.yearDesc}>{item?.yearDesc}</option>
                    ))}
                </select>
              ) : (
                <h6>{YachtFormsData?.model_year}</h6>
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Maker</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <select
                  name="YachtMaker"
                  onChange={handlYachtEstimatedSelect}
                  className="form-control"
                  value={YachtFormsData?.estimatedYachtMaker}
                >

                  {YachtModels.length > 0 &&
                    YachtModels.map((item) => (
                      <option value={item._id}>{item?.name}</option>
                    ))}
                </select>

              ) : (
                <h6 id="YachtMaker">{
                  yachtDetailsdata?.model
                }</h6>
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Model</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <select
                  name="YachtVarient"
                  onChange={handlYachtEstimatedSelect}
                  className="form-control"
                  value={YachtFormsData?.estimatedYachtVarient}
                >

                  {YachtVarient.length > 0 &&
                    YachtVarient.map((item) => (
                      <option value={item?._id}>{item?.name}</option>
                    ))}
                </select>

              ) : (
                <h6 id="YachtVarient">{
                  yachtDetailsdata?.varient
                }</h6>
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Hull Serial No</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              {isEditMode ? (
                <InputGroup >
                  <Form.Control
                    required
                    name="boat_hull_serial_number"
                    value={YachtFormsData.estimatedboat_hull_serial_number}
                    onChange={handlYachtEstimatedSelect}
                    placeholder="Hull Serial Number"
                    aria-label="Hull Serial Number"
                  />

                </InputGroup>
              ) : (
                <h6>{YachtFormsData?.boat_hull_serial_number}</h6>
              )}
            </div>

            {isEditMode && (
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <button
                    className="profileupadtes"
                    id="personalupdate"
                    onClick={handleUpdateVehicleDetails}
                  >
                    Update
                  </button>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <button
                    className="profileupadtes"
                    id="personalupdate"
                    onClick={handleCancelVehicleDetails}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <h4 className="personal details">
          Personal Details
          {window.location.pathname === "/Yachtquotes" ? (
            <i
              onClick={handlePersonalEditModeToggle}
              className="fa fa-edit"
            ></i>
          ) : (
            <></>
          )}
        </h4>
        <div className="filterssas one two mb-5">

          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
              <h6>{YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Full Name" : "Name of Company"}</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
              {isPersonalEditMode ? (
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={YachtFormsData.estimatedname}
                  onChange={handlePersonalDetails}
                  placeholder={
                    YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Full Name" : "Name of Company"
                  }
                />
              ) : (
                <h6>{YachtFormsData?.name}</h6>
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
              <h6>{YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Email Id" : "Email of Contact person"}</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
              {isPersonalEditMode ? (
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  disabled
                  value={YachtFormsData?.email}
                  onChange={handlePersonalDetails}
                />
              ) : (
                <h6>{YachtFormsData?.email}</h6>
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
              <h6>{YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Phone Number" : "Phone number of Contact Person"}</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
              {isPersonalEditMode ? (
                <PhoneInput
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  }}
                  international
                  className="form-control"
                  defaultCountry="AE"
                  value={YachtFormsData.estimatedphoneno} // Use YachtFormsData.phoneno instead of value
                  onChange={handlePhoneChange}
                  placeholder={
                    YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Phone Number" : "Phone number of Contact Person"
                  }
                />
              ) : (
                <h6>{YachtFormsData?.phoneno}</h6>
              )}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
              <h6>{YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? "Date Of Birth" : "Business Type"}</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
              {isPersonalEditMode ? (
                <>
                  {
                    YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? (<DatePicker
                      placeholpderText={"Please Enter Date Of Birth"}
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      selected={YachtFormsData?.estimateddate_of_birth ? new Date(YachtFormsData?.estimateddate_of_birth) : null}
                      onChange={(date) => {
                        handlYachtestimatedSelectFormValue("date_of_birth", date)
                      }}
                      onKeyDown={(e) => e.preventDefault()}
                    />) : (
                      <div className="col-lg-7 col-md-7  ">

                        <select
                          className="form-control"
                          onChange={handlePersonalDetails}
                          id="businessType"
                          name="businessTypeId"
                          value={YachtFormsData.estimatedbusinessTypeId}
                        >
                          {Businesstypes && Businesstypes.length > 0 ? (
                            <>
                              <option value={""}> Select Business Type</option>
                              {Businesstypes.map((v, i) => {
                                return (
                                  <option

                                    value={v?._id}
                                  >
                                    {v?.business_type_name}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </select>

                      </div>
                    )
                  }
                </>

              ) : (
                <h6>
                  {
                    YachtFormsData.yacht_type_of_use?.toLowerCase().includes("individual") ? <Moment format="DD/MM/YYYY">
                      {new Date(YachtFormsData?.date_of_birth)}
                    </Moment> : Businesstypes.find(
                      (item) => item._id === YachtFormsData?.businessTypeId
                    )?.business_type_name
                  }

                </h6>
              )}
            </div>

            {isPersonalEditMode && (
              <div className="row">

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <button
                    className="profileupadtes"
                    id="personalupdate"
                    onClick={UpdatePersonalDetails}
                  >
                    Update
                  </button>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <button
                    className="profileupadtes"
                    id="personalupdate"
                    onClick={handleCancelPersonelDetails}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </>

    </div>
  );
};

export default Yachtfilter;
