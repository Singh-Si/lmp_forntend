/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Form } from "react-bootstrap";
import { useState } from "react";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Filters from "./Filters";
import { API_URL } from "../..";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  AddToComapre,
  DeleteFromComapre,
  DeleteAllFromComapre,
  AddMotoformData,
  AddAllPlans,
  AddSelectedPlans,
  AddMotoformDataEstimatedValue,
} from "../../redux/reducers/MotoformDataReducerSlice";
import Compare from "../../Image/comparelist.svg";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import MotorInsurancedetails from "../Common/MotorInsurancedetails";

const Quotes = () => {
  const { HandleSubmitMotorFormdata } = UseMotorContext()
  const motorFormsData = useSelector((state) => state.MotoformDataReducer);
  const [runEffects, setRunEffects] = useState(false);
  const [CarModel, setCarModel] = useState([]);
  const [CarMakers, setCarMakers] = useState([]);
  const [CarVarient, setCarVarient] = useState([]);
  const dispatch = useDispatch();
  const handleSubmitMotorform = (name, value) => {
    dispatch(AddMotoformData({ name, value }));
  };

  const [Loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [Error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [Message, setMessage] = useState("");
  const [Data, setData] = useState([]);
  const [NaturePlan, setNaturePlan] = useState([]);
  const [getrepairtypes, setgetrepairtypes] = useState([]);
  const [getallplanename, setgetallplanename] = useState([]);
  const [totalPlan, settotalPlan] = useState(0);
  const [AdditionalidsData, setAdditionalidsData] = useState([]);
  const [filterform, setfilterform] = useState([]);

  useEffect(() => {
    getmatchMotorPlans();
  }, [
    motorFormsData.isupdated,
    motorFormsData.aslider_value,
    motorFormsData.drivingexp,
    motorFormsData.drivingexpinuae,
    motorFormsData.price,
    motorFormsData.instanpolicy,
    motorFormsData.polcy_type,
    motorFormsData.last_year_policy_type,
    motorFormsData.claims_certificate_from_issurer,
    motorFormsData.nationality,
    motorFormsData.vehicle_specification,
    motorFormsData.model_year,
    motorFormsData.car_maker,
    motorFormsData.car_model,
    motorFormsData.car_variant,
    motorFormsData.repaire_type_name,
    motorFormsData.nature_of_plan_id,
    motorFormsData.company_id,
    motorFormsData.additional_id,
    motorFormsData.maxDep,
    motorFormsData.minDep,
    motorFormsData.maxCarValue,
    motorFormsData.minCarValue,
    motorFormsData.aslider_value,
    motorFormsData.businessTypeId,
    motorFormsData.company_id,
    motorFormsData.register_area,
    motorFormsData.registration_year,
    motorFormsData.last_year_claim,
    motorFormsData.businessTypeId,
    motorFormsData.nationality,
    motorFormsData.date_of_birth,
    filterform,
  ]);
  useEffect(() => {
    getNaturePlan();
    getAllrepairtype();
    getAllCompanies();
    getAllAdditionalCovered();
    HandleSubmitMotorFormdata();
  }, []);
  useEffect(() => {
    dispatch(AddMotoformDataEstimatedValue({ name: "carMaker", value: motorFormsData.car_maker, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "carModel", value: motorFormsData.car_model, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "carVarient", value: motorFormsData.car_variant, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedCarvarientName", value: motorFormsData.CarvarientName, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "Years", value: motorFormsData.model_year, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedmpolcy_type", value: motorFormsData.polcy_type, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedlast_year_policy_type", value: motorFormsData.last_year_policy_type, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedmpolicy_id", value: motorFormsData.policy_id, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedregistration_year", value: motorFormsData.registration_year, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedmregister_area", value: motorFormsData.register_area, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedvehicle_specification", value: motorFormsData.vehicle_specification, }))
  }, [])




  const getAllAdditionalCovered = async () => {
    await axios
      .get(API_URL + "/api/getAllAdditionalCovered?lob=Motor")
      .then((response) => {

        setAdditionalidsData(response.data.data);
      });
  };

  async function getNaturePlan() {
    await axios
      .get(API_URL + "/api/getNaturePlan")
      .then((response) => {
        let data = [{
          "_id": null,
          "nature_of_plan_name": "Any"
        }, ...response.data.data];
        setNaturePlan(data);
      })
      .catch((error) => {
        ;
      });
  }
  async function getAllrepairtype() {
    await axios
      .get(API_URL + "/api/getrepairtypes")
      .then((response) => {
        // // //console.log({ response });
        let data = [{
          "_id": null,
          "repair_type_name": "Any"
        }, ...response.data.data];
        setgetrepairtypes(data);
        // // //console.log("getrepairtypes", getrepairtypes);
      })
      .catch((error) => {
        ;
      });
  }
  async function getAllCompanies() {
    await axios
      .get(API_URL + "/api/getAllCompanies")
      .then((response) => {
        let data = [{
          "_id": null,
          "company_name": "Any"
        }, ...response.data.data];
        setgetallplanename(data);
      })
      .catch((error) => {
        ;
      });
  }
  const getmatchMotorPlans = async () => {
    try {
      dispatch(DeleteAllFromComapre());

      const response = await axios.post(API_URL + "/api/getMatchMotorPlan", {
        "price": motorFormsData.price,
        date_of_birth: motorFormsData.date_of_birth,
        drivingexp: motorFormsData?.drivingexp,
        drivingexpinuae: motorFormsData?.drivingexpinuae,
        minCarValue: motorFormsData.aslider_value,
        maxCarValue: motorFormsData.maxCarValue,
        claims_certificate_from_issurer:
          motorFormsData.last_year_claim,
        // "registration_year":2017,.
        electric_vehicle: motorFormsData.your_electric_car ? 1 : !motorFormsData.your_electric_car ? 0 : 0,
        polcy_type: motorFormsData?.polcy_type,
        last_year_policy_type: motorFormsData?.last_year_policy_type,
        nationality: motorFormsData?.nationality,
        vehicle_specification: motorFormsData?.vehicle_specification,
        model_year: motorFormsData?.model_year,
        // car_maker: motorFormsData?.car_maker,
        // car_model: motorFormsData?.car_model,
        // car_variant: motorFormsData?.CarvarientName,
        // car_maker_id: motorFormsData?.car_maker,
        // car_model_id: motorFormsData?.car_model,
        car_variant_id: motorFormsData?.car_variant,
        minDep: motorFormsData.minDep,
        maxDep: motorFormsData.maxDep,
        repaire_type_name: motorFormsData?.repaire_type_name,
        nature_of_plan_id: motorFormsData.nature_of_plan_id,
        company_id: motorFormsData.company_id,
        businessTypeId: motorFormsData.businessTypeId,
        // "id":"64a294976e3da4ba74c4a6e4",
        additional_id: filterform,
        insurerdCompanyId: motorFormsData.current_insurance_company_id,
        newLeadId: motorFormsData.leadid || motorFormsData.oldleadid,
      });
      //console.log(response.data.data, "check value");
      setLoading(false);
      let mappdata = [];

      try {
        if (response.data.data && response.data.data.length > 0) {

          const quotesData = response.data.data
          console.log(quotesData," >>>>>>>>>>>>>> adfffdsafsadfsdf ")
           axios.post(API_URL + "/api/AddQuotesGenerated", {
            planid: quotesData?.map((item) => item._id),
             lob: quotesData[0]?.line_of_business_id

          })
          await response.data.data.filter(item => item.finallBasePremium !== "NaN" && item.finallBasePremium !== null && item.finallBasePremium !== undefined).map((a) => {
            a["_id"] = a._id || a.quoteNo;
            mappdata.push(a);
          });
          // await response.data.data.map((a) => {
          //   a["_id"] = a._id || a.quoteNo;
          //     a["_id"] = a._id || a.quoteNo;
          //     a["finallBasePremium"] = 1200
          //     mappdata.push(a);
          // });
          console.log("mappdata>>>>>>>><><><><> ", mappdata)
          setData(mappdata);
          dispatch(AddAllPlans(mappdata));
          settotalPlan(mappdata.length);
        }
      } catch (error) {
        //console.log("eror>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);
      }
      //console.log("map data>>", mappdata);


      // handleApiResponse(response);
    } catch (error) {
      setLoading(false);
      setError(true);
      setMessage(error?.response?.data?.message);
      if (error?.response?.status) {
        settotalPlan(0);
      }
    }
  };

  const [planDetailsVisibility, setPlanDetailsVisibility] = useState({});
  const toggleShowMore = (planId) => {
    setPlanDetailsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [planId]: !prevVisibility[planId], // Toggle the visibility for the specific plan
    }));
  };

  const getMotorDetailsbyYear = async () => {
    // set car makers
    await axios
      .post(API_URL + "/api/getMotorDetails", {
        years: motorFormsData.Years,
      })
      .then((res) => {
        if (res && res.data.data?.length > 0) {
          let arrdata = res.data.data;
          let isCarmakeAvailable = arrdata.find(item => item._id == motorFormsData.carMaker)
          if (isCarmakeAvailable) {
            handleSubmitMotorform("carMaker", isCarmakeAvailable["_id"]);
          } else {
            handleSubmitMotorform("carMaker", res?.data?.data[0]["_id"]);
          }
          setCarMakers([...arrdata]);
        } else {
          handleSubmitMotorform("carMaker", "");
          handleSubmitMotorform("estimatedCarvarientName", "");
          handleSubmitMotorform("carModel", "");
          setCarMakers([]);
          setCarModel([])
          setCarVarient([])
        }
      })
      .catch((error) => {
        handleSubmitMotorform("carMaker", "");
        handleSubmitMotorform("estimatedCarvarientName", "");
        handleSubmitMotorform("carModel", "");
        setCarMakers([]);
        setCarModel([])
        setCarVarient([])
          ;
      });
  }
  const getMotorDetailsbyYearAndCarMaker = async () => {
    //set car models

    await axios
      .post(API_URL + "/api/getMotorDetails", {
        years: motorFormsData?.Years,
        carMaker: motorFormsData?.carMaker,
      })
      .then((res) => {
        if (res && res.data.data?.length > 0) {
          let arrdata = res.data.data;
          let isCarmakeAvailable = arrdata.find(item => item._id == motorFormsData.carModel)
          if (isCarmakeAvailable) {
            handleSubmitMotorform("carModel", isCarmakeAvailable["_id"]);
          } else {
            handleSubmitMotorform("carModel", res?.data?.data[0]["_id"]);
          }
          setCarModel([...arrdata]);
        } else {
          handleSubmitMotorform("carModel", "");
          setCarModel([])
          setCarVarient([])
        }
      })
      .catch((error) => {
        handleSubmitMotorform("carModel", "");
        setCarModel([])
        setCarVarient([])
          ;
      });
  }
  const getMotorDetailsbyYearAnModelAndMaker = async () => {
    // set car varient
    await axios
      .post(API_URL + "/api/getMotorDetails", {
        years: motorFormsData?.Years,
        carMaker: motorFormsData?.carMaker,
        carModel: motorFormsData?.carModel,
      })
      .then(async (res) => {
        if (res && res.data.data?.length > 0) {
          let arrdata = res.data.data;
          let isCarmakeAvailable = arrdata.find(item => item._id == motorFormsData.carVarient)
          if (isCarmakeAvailable) {
            handleSubmitMotorform("carVarient", isCarmakeAvailable["_id"]);
            handleSubmitMotorform("estimatedCarvarientName", isCarmakeAvailable["motor_model_detail_name"]);
          } else {
            handleSubmitMotorform("carVarient", res?.data?.data[0]["_id"]);
            handleSubmitMotorform("estimatedCarvarientName", res?.data?.data[0]["motor_model_detail_name"]);
          }

          setCarVarient([...arrdata]);
        } else {
          handleSubmitMotorform("carVarient", "");
          handleSubmitMotorform("estimatedCarvarientName", "");
          setCarVarient([]);
        }
      })
      .catch((error) => {
        handleSubmitMotorform("carVarient", "");
        handleSubmitMotorform("estimatedCarvarientName", "");
        setCarVarient([]);
        ;
      });
  }

  const getcarEstimatedBavalue = async () => {
    await axios
      .post(API_URL + "/api/getCarEstimatedValue", {
        model_year: motorFormsData?.Years,
        car_maker: motorFormsData?.carMaker,
        car_model: motorFormsData.carModel,
        car_variant: motorFormsData.estimatedCarvarientName,
      })
      .then((response) => {
        if (response.data) {
          handleSubmitMotorform("estimatedminCarValue", response.data.minCarValue);
          handleSubmitMotorform("estimatedmaxCarValue", response.data.maxCarValue);
        }
        // if (response.data) {
        //   handleSubmitMotorform("minDep", response.data.minDep);
        //   handleSubmitMotorform("maxDep", response.data.maxDep);
        // }
        // if (response.data.minCarValue > response.data.maxCarValue) {
        //   handleSubmitMotorform("estimatedminCarValue", response.data.maxCarValue);
        //   handleSubmitMotorform("maxCarValue", response.data.minCarValue);
        // } else {
        //   handleSubmitMotorform("minCarValue", response.data.minCarValue);
        //   handleSubmitMotorform("maxCarValue", response.data.maxCarValue);
        // }
      })
      .catch((error) => {
        error.response && error.response.data && handleSubmitMotorform("estimatedminCarValue", error.response.data.minCarValue);
        error.response && error.response.data && handleSubmitMotorform("estimatedmaxCarValue", error.response.data.maxCarValue);
      });
  }
  // To add a new element to the array while preserving the previous data:
  const addElement = (newElement) => {
    setfilterform((prevArray) => [...prevArray, newElement]);
  };

  // To remove an element from the array while preserving the previous data:
  const removeElement = (elementToRemove) => {
    setfilterform((prevArray) =>
      prevArray.filter((item) => item !== elementToRemove)
    );
  };
  const handleProductFilter = async (event) => {
    try {

      // dispatch(DeleteAllFromComapre())
      var { name, value, id } = event.target;
      if (value === "Any") {
        value = null
      } else if (value === "true") {
        value = true
      } else if (value === "false") {
        value = false
      }
      value = name === "registration_year" ? value.toString() : value;
      if (name === "additional_id") {
        const newAdditionalId = event.target.value;

        if (event.target.checked) {
          addElement(newAdditionalId);
        } else {
          // Remove the unchecked additional ID from the state
          removeElement(newAdditionalId);
        }
      }
      else if (name === "model_year") {
        setRunEffects(true);
        dispatch(AddMotoformDataEstimatedValue({ name: "Years", value: value.toString() }));
      } else if (name === "car_maker") {
        setRunEffects(true);
        dispatch(AddMotoformDataEstimatedValue({ name: "carMaker", value: value.toString() }));
      } else if (name === "car_model") {
        setRunEffects(true);

        dispatch(AddMotoformDataEstimatedValue({ name: "carModel", value: value }));
      }
      else if (name === "car_variant") {
        setRunEffects(true);
        const selectedOption =
          event.target.options[event.target.selectedIndex];
        const selectedId = selectedOption.getAttribute("id");
        dispatch(AddMotoformDataEstimatedValue({ name: "carVarient", value: selectedId }));
        dispatch(AddMotoformDataEstimatedValue({ name: "estimatedCarvarientName", value: value }));
      }

      else if (name === "registration_year") {
        setRunEffects(true);
        dispatch(AddMotoformDataEstimatedValue({ name: "estimatedregistration_year", value: value }));
      }
      else if (name === "register_area") {
        setRunEffects(true);
        dispatch(AddMotoformDataEstimatedValue({ name: "estimatedregister_area", value: value }));
      }
      else if (name === "polcy_type") {
        setRunEffects(true);
        dispatch(AddMotoformDataEstimatedValue({ name: "estimatedpolcy_type", value: value }));
      }
      else if (name === "last_year_policy_type") {
        setRunEffects(true);
        dispatch(AddMotoformDataEstimatedValue({ name: "estimatedlast_year_policy_type", value: value }));
      }
      else if (name === "last_year_policy_type") {
        setRunEffects(true);
        dispatch(AddMotoformDataEstimatedValue({ name: "estimatedlast_year_policy_type", value: value }));
      }
      else if (name === "vehicle_specification") {
        setRunEffects(true);
        dispatch(AddMotoformDataEstimatedValue({ name: "estimatedvehicle_specification", value: value }));
      }
      else {
        setRunEffects(false);
        dispatch(AddMotoformData({ name: event.target.name, value: value }));
      }

    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    if (runEffects && motorFormsData.Years) {
      getMotorDetailsbyYear();
    }
  }, [motorFormsData.Years]);

  useEffect(() => {
    if (runEffects && motorFormsData.carMaker) {
      getMotorDetailsbyYearAndCarMaker();
    }
  }, [motorFormsData?.carMaker]);

  useEffect(() => {
    if (runEffects && motorFormsData.carModel) {
      getMotorDetailsbyYearAnModelAndMaker();
    }
  }, [motorFormsData?.carModel]);

  useEffect(() => {
    if (runEffects && motorFormsData.carVarient) {
      getcarEstimatedBavalue();
    }
  }, [motorFormsData.carVarient]);

  function formatAmount(amount) {
    if (amount !== null) {
      const numericValue = parseFloat(amount.toString().replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        // Use toLocaleString with custom options for grouping
        return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });
      }
      return ''; // Return an empty string if the input is not a valid number
    }
    return ''; // Return an empty string if the input is null
  }


  const handleplansubmit = async (v) => {
    try {
      console.log("v>>>>>>>>> >>>>>> >>>> >>> ", v)
      // return false;
      console.log(">>>>>>>>>>>>>>>>>>>>> id", v._id)
      console.log(">>>>>>>>>>>>>>>>>>>>> company_id", v.company_id)
      console.log(">>>>>>>>>>>>>>>>>>>>> selected premium", v.finallBasePremium)
      console.log(">>>>>>>>>>>>>>>>>>>>> standardcovers", v.standard_cover_arr)
      console.log(">>>>>>>>>>>>>>>>>>>>> notCoveredData", v.notCoveredData)
      console.log(">>>>>>>>>>>>>>>>>>>>> excess amount", v.excessAmount)

      await axios.post(API_URL + `/api/updateLeadById?leadId=${motorFormsData.leadid || motorFormsData.oldleadid}`, {

        "plan_id": v._id,
        "plan_company_id": v.company_id,
        "selectedPrimium": +v.finallBasePremium,
        "covereddata": v.standard_cover_arr,
        "notCovereddata": v.notCoveredData,
        "excessAmount": +v.excessAmount,
        "BECommission": +v.BECommission,
        "planRate": +v.planRate

        // "lead_id": motorFormsData.leadid || motorFormsData.oldleadid,
      }).then((response) => {
        console.log("response", response)
      }).catch((error) => {
        console.log("error", error)
      })
    } catch (error) {
      console.log("error", error)
    }


  }



  return (
    <div>
      <Header />
      {/* <Innerbanner /> */}
      {motorFormsData.comparelist.length > 0 ? (
        <Link to="/Comparision" className="compares123">
          <img className="compare_123" src={Compare} />
          <span style={{ position: "absolute", top: "-10px", right: "5px" }}>
            (
            {motorFormsData.comparelist.length
              ? motorFormsData.comparelist.length
              : ""}
            )
          </span>
        </Link>
      ) : (
        ""
      )}
      <div className="Quotes_info1">
        <div className="container Quotes_info pt-4 pb-4">
          <div className="row " style={{ justifyContent: "center" }}>
            <Filters
              CarModel={CarModel}
              setCarModel={setCarModel}
              setCarVarient={setCarVarient}
              CarVarient={CarVarient}
              CarMakers={CarMakers}
              setCarMakers={setCarMakers}
              handleProductFilter={handleProductFilter}
            />
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="row quotes_selectoption">

                <div className="col">
                  <span>Repair Type</span>
                  <select
                    onChange={handleProductFilter}
                    name="repaire_type_name"
                    value={motorFormsData?.repaire_type_name}
                    // selected={motorFormsData?.repair_type_name}
                    className="quotes_select form-control"
                  >

                    {getrepairtypes && getrepairtypes.length > 0 ? (
                      getrepairtypes.map((v, i) => {
                        return (
                          <option key={v._id} value={v._id}>
                            {v.repair_type_name}
                          </option>
                        );
                      })
                    ) : (
                      <option>No Options Available</option>
                    )}
                  </select>
                </div>
                <div className="col">
                  <span>Ins Company</span>
                  <select
                    onChange={handleProductFilter}
                    name="company_id"
                    className="quotes_select form-control"
                    value={motorFormsData.company_id}
                  >

                    {getallplanename && getallplanename.length > 0 ? (
                      getallplanename.map((v) => {
                        return (
                          <>
                            <option value={v._id}>{v.company_name}</option>
                          </>
                        );
                      })
                    ) : (
                      <option>No Options Available</option>
                    )}
                  </select>
                </div>
                <div className="col">
                  <span>Plan Nature</span>
                  <select
                    onChange={handleProductFilter}
                    name="nature_of_plan_id"
                    className="quotes_select form-control"
                    value={motorFormsData?.nature_of_plan_id}
                  >

                    {NaturePlan && NaturePlan.length > 0 ? (
                      NaturePlan.map((v) => {
                        return (
                          <option value={v._id}>
                            {v.nature_of_plan_name}
                          </option>
                        );
                      })
                    ) : (
                      <option>No Options Available</option>
                    )}
                  </select>
                </div>
                <div className="col">
                  <span>Instant Policy</span>
                  <select
                    onChange={handleProductFilter}
                    name="instanpolicy"
                    className="quotes_select form-control"
                    value={motorFormsData?.instanpolicy}
                  >

                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="col">
                  <span>Price</span>
                  <select
                    onChange={handleProductFilter}
                    name="price"
                    className="quotes_select form-control"
                    value={motorFormsData?.price}
                  >
                    <option value={"Lowest Price"}>Lowest Price</option>
                    <option value={"Highest Price"}>Highest Price</option>
                  </select>
                </div>
              </div>
              <>
                <div className="row quotes_selectoption filters">
                  <div
                    className="row"
                    style={{ alignItems: "center", marginBottom: "10px" }}
                  >
                    <div >
                      {AdditionalidsData.length > 0 && (
                        <span className="quotes_selectoption col-lg-2">
                          More Filters
                        </span>
                      )}
                    </div>
                    {AdditionalidsData &&
                      AdditionalidsData.length > 0 &&
                      AdditionalidsData.map((v) => (
                        <div className="col-lg-4">
                          <Form.Check
                            onChange={handleProductFilter}
                            className="abcds_abcs filtercheck"
                            value={v?._id}
                            type="checkbox"
                            name="additional_id"
                            label={v?.additional_cover_label}
                            checked={filterform.includes(v._id)} // Check if t
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </>

              {totalPlan > 0 && (
                <>
                  <p className="mb-3 paragra">
                    We have found {totalPlan} vehicle insurance quotes for your{" "}
                    {motorFormsData?.car_maker + " " + motorFormsData?.car_model + " " + motorFormsData?.CarvarientName + " "}
                    {motorFormsData?.model_year} valued at {" "}
                    <span style={{ color: "#003399", fontWeight: "bold" }}>
                      {formatAmount(motorFormsData.aslider_value)} AED
                    </span>
                  </p>
                </>
              )}
              <h4 className="notess">Note: All prices are excluding taxes.</h4>
              <div className="scroll_abcds">
                {Loading ? (
                  <>Loading</>
                ) : totalPlan > 0 ? (
                  Data.map((v) => {
                    console.log("dat>>>>>", v)
                    let comparelistdata;
                    let existComapreList;
                    if (motorFormsData.comparelist.length > 0) {
                      comparelistdata = motorFormsData.comparelist;
                      existComapreList = comparelistdata.find(
                        (item) => v._id === item._id
                      );
                    }
                    return (
                      <div key={v._id} className="quotes_inner">
                        <div className="row quotes_details">
                          <div className="col-lg-3 quotesmobile">
                            {v?.companies?.company_logo &&
                              v?.companies?.company_logo.length > 0 ? (
                              v?.companies?.company_logo.map((company) => {
                                return (
                                  <img
                                    // key={company?._id}
                                    src={`${API_URL}/${company?.destination}/${company?.filename}`}
                                    alt="company_logo"
                                  />
                                );
                              })
                            ) : (
                              <></>
                            )}
                            <h6 className="companyname">
                              {v?.companies?.company_name}
                            </h6>
                          </div>
                          <div className="col-lg-6 quotemobile">
                            <h4>{v?.plan_name} </h4>
                            <ul className="benefits">
                              {v?.additional_cover_arr &&
                                v?.additional_cover_arr.length > 0 ? (
                                v?.additional_cover_arr.map((cover) => {
                                  return (
                                    <li>
                                      {cover?.additional_cover_label} (
                                      {cover?.additional_cover_desc})
                                    </li>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </ul>
                          </div>
                          <div className="col-lg-3 action_abcd quotesmobile">
                            <h2>
                              {typeof v?.finallBasePremium == "number"
                                ? "AED " + formatAmount(v?.finallBasePremium)
                                : v?.finallBasePremium}
                            </h2>
                            {existComapreList ? (
                              <Form.Check
                                className="abcds_abcs1"
                                type="checkbox"
                                label="Compare"
                                checked="checked"
                                onClick={() => {
                                  dispatch(
                                    DeleteFromComapre({
                                      data: v,
                                    })
                                  );

                                }}
                              />
                            ) : (
                              <Form.Check
                                className="abcds_abcs1"
                                type="checkbox"
                                label="Compare"
                                checked=""
                                onClick={() => {
                                  dispatch(
                                    AddToComapre({
                                      data: v,
                                    })
                                  );
                                  // handleShow();
                                }}
                              />
                            )}

                            {typeof v?.finallBasePremium == "number" || v?.finallBasePremium !== "Referred" ? (
                              <Link
                                to={`/Selectedquotes`}
                                onClick={() => {
                                  dispatch(AddSelectedPlans(v))
                                  dispatch(AddMotoformData({ name: "location", value: window.location.pathname }))
                                  dispatch(
                                    DeleteFromComapre({
                                      data: v,
                                    })
                                  )
                                  handleplansubmit(v)
                                }}
                                state={{
                                  ...v,
                                  minCarValue: motorFormsData.minCarValue,
                                  Data,
                                }}

                              >
                                <button className="submit_select" >
                                  Select
                                </button>
                              </Link>
                            ) : (
                              <Link
                                onClick={() => dispatch(
                                  DeleteFromComapre({
                                    data: v,
                                  })
                                )}
                                to={
                                  "/thankyou?id=" +
                                  motorFormsData?.leadid +
                                  "&lob=" +
                                  "Motor" +
                                  "&plan_id=" +
                                  v?._id +
                                  "&plan_company_id=" +
                                  v?.company_id +
                                  "&final_price=" +
                                  v?.finallBasePremium +
                                  "&status=Completed" + "&planRate=" + v?.planRate
                                }
                              >
                                <button className="submit_select">
                                  Select
                                </button>
                              </Link>
                            )}

                            <span className="terms_condition">
                              {v.companies.company_terms_conditions &&
                                v.companies.company_terms_conditions.length >
                                0 ? (
                                v.companies.company_terms_conditions.map(
                                  (company) => {
                                    return (
                                      <a
                                        target="_blank"
                                        download
                                        href={`${API_URL}/${company?.destination}/${company?.filename}`}
                                      >
                                        T&C Apply
                                      </a>
                                    );
                                  }
                                )
                              ) : (
                                <></>
                              )}
                            </span>
                          </div>
                        </div>
                        {planDetailsVisibility[v?._id] ? (
                          <div className="rowabcds">
                            <div className="row overalldetails">
                              <div className="col-lg-6 abc">
                                <img
                                  style={{
                                    width: "auto",
                                    marginRight: "15px",
                                  }}
                                  src={tick}
                                />
                                <span className="abcds_aud">
                                  What is Covered.
                                </span>
                                <ul className="description">
                                  {v?.standard_cover_arr &&
                                    v?.standard_cover_arr.length > 0 ? (
                                    v?.standard_cover_arr.map((cover) => {
                                      return (
                                        <li>
                                          {cover?.standard_cover_label} (
                                          {cover?.standard_cover_desc})
                                        </li>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </ul>
                              </div>
                              <div className="col-lg-6 cde">
                                <img
                                  style={{
                                    width: "auto",
                                    marginRight: "15px",
                                  }}
                                  src={cross}
                                />
                                <span className="abcds_aud">
                                  What is not Covered.
                                </span>
                                <ul className="description">
                                  {v?.notCoveredData &&
                                    v?.notCoveredData.length > 0 ? (
                                    v?.notCoveredData.map((cover) => {
                                      return (
                                        <li>{cover?.standard_cover_label}</li>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="row overalldetails">
                              <button
                                className="showadd_details"
                                onClick={() => toggleShowMore(v?._id)}
                              >
                                Hide Details
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="rowabcds">
                            <div className="row overalldetails">
                              <button
                                className="showadd_details"
                                onClick={() => toggleShowMore(v?._id)}
                              >
                                See Details
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p>
                    We have found {0} vehicle insurance quotes for your{" "}
                    {motorFormsData?.car_maker + "  " + motorFormsData?.car_model + "  " + motorFormsData?.CarvarientName + "  "}
                    {motorFormsData?.model_year} valued at{" "}
                    <span style={{ color: "#003399", fontWeight: "bold" }}>
                      {formatAmount(motorFormsData.aslider_value)} AED
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <MotorInsurancedetails /> */}
      <Footer />
    </div>
  );
};
export default Quotes;
