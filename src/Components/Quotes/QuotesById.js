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
  AddMotoformFilterData,
  AddAllMotoformData,
  AddAllPlans,

} from "../../redux/reducers/MotoformDataReducerSlice";
import Compare from '../../Image/comparelist.svg'
import { Link } from "react-router-dom";
import { PostData, getCardetailsByLeadid } from "../../functions";
import { UseMotorContext } from "../../MultiStepContextApi";
import termsconditon from "../../Image/terms-condition.pdf";
import swal from "sweetalert";
import FiltersById from "./FiltersById";
const QuotesById = () => {
  let url = new URLSearchParams(window.location.search);
  // //console.log(parameterNames,"paramsss")
  const motorFormsData = useSelector((state) => state.MotoformDataReducer);
  const [CarModel, setCarModel] = useState([]);
  const [CarMakers, setCarMakers] = useState([]);
  const [CarVarient, setCarVarient] = useState([]);
  const { handleSubmitMotorform, SaveDetails } = UseMotorContext();
  const [filterform, setfilterform] = useState({
    polcy_type: motorFormsData?.polcy_type,
    drivingexp: motorFormsData?.drivingexp,
    last_year_policy_type: motorFormsData?.last_year_policy_type,
    nationality: motorFormsData?.nationality,
    vehicle_specification: motorFormsData?.vehicle_specification,
    model_year: motorFormsData?.model_year,
    car_maker: motorFormsData?.car_maker,
    car_model: motorFormsData?.car_model,
    car_variant: motorFormsData?.car_variant,
    repaire_type_name: motorFormsData?.repaire_type_name,
    drivingexpinuae: motorFormsData?.drivingexpinuae,
    price: "Lowest Price",
    additional_id: [],
    nature_of_plan_id: null,
    company_id: null,
  });
  const [Loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [Error, setError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [Message, setMessage] = useState("");
  const [CarDetails, setCarDetails] = useState({});
  const [Data, setData] = useState([]);
  const [NaturePlan, setNaturePlan] = useState([]);
  const [getrepairtypes, setgetrepairtypes] = useState([]);
  const [getallplanename, setgetallplanename] = useState([]);
  const [totalPlan, settotalPlan] = useState(0);
  const [renewal, setRenewal] = useState(null);
  const [AdditionalidsData, setAdditionalidsData] = useState([]);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const compareList = useSelector(
    (state) => state?.MotoformDataReducer?.comparelist
  );



  useEffect(() => {
    const {
      drivingexp,
      drivingexpinuae,
      price,
      instanpolicy,
      polcy_type,
      last_year_policy_type,
      nationality,
      vehicle_specification, // "last_claim_year": "1",
      model_year,
      car_maker,
      car_model,
      car_variant,
      repaire_type_name,
      nature_of_plan_id,
      company_id,
      additional_id,
    } = filterform;
    const updatedFormData = {
      drivingexp,
      drivingexpinuae,
      price,
      instanpolicy,
      polcy_type,
      last_year_policy_type,
      nationality,
      vehicle_specification, // "last_claim_year": "1",
      model_year,
      car_maker,
      car_model,
      car_variant,
      repaire_type_name,
      nature_of_plan_id,
      company_id,
      additional_id,
    };
    // Dispatch the action using the updatedFormData
    // dispatch(AddMotoformFilterData({ updatedFormData }));
    getmatchMotorPlans();
  }, [
    filterform
  ]);
  useEffect(() => {
    let d = url.get("renewal")
    if (d) {
      setRenewal(d)
    } else {
      setRenewal(null)
    }
    //console.log(d, "check")
    CardetailsByEmail();
    getNaturePlan();
    getAllrepairtype();
    getAllCompanies();
    getAllAdditionalCovered();
  }, []);

  const getAllAdditionalCovered = async () => {
    await axios
      .get(API_URL + "/api/getAllAdditionalCovered?lob=Motor")
      .then((response) => {
        setAdditionalidsData(response.data.data);
      });
  };


  useEffect(() => {
    // SaveDetails();
    if (compareList.length === 0) {
      handleClose();
    }
  }, [compareList, motorFormsData]);

  async function CardetailsByEmail() {
    await getCardetailsByLeadid()
      .then((response) => setCarDetails(response))
      .catch((error) =>{})
  }
  async function getNaturePlan() {
    await axios
      .get(API_URL + "/api/getNaturePlan")
      .then((response) => {
        setNaturePlan(response.data.data);
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
        // //console.log(response, "check value")
        setgetrepairtypes(response.data.data);
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
        setgetallplanename(response.data.data);
      })
      .catch((error) => {
        ;
      });
  }
  const getmatchMotorPlans = async () => {
    try {
      dispatch(DeleteAllFromComapre());
      const {
        drivingexp,
        drivingexpinuae,
        price,
        instanpolicy,
        polcy_type,
        last_year_policy_type,
        nationality,
        vehicle_specification, // "last_claim_year": "1",
        model_year,
        car_maker,
        car_model,
        car_variant,
        repaire_type_name,
        nature_of_plan_id,
        company_id,
        additional_id,
      } = filterform;
      const response = await axios.post(API_URL+"/api/getMatchMotorPlan", {
        drivingexp,
        drivingexpinuae,
        price,
        // instanpolicy,
        // polcy_type,
        // last_year_policy_type,
        // nationality,
        // vehicle_specification, // "last_claim_year": "1",
        model_year,
        car_maker,
        car_model,
        car_variant,
        repaire_type_name,
        nature_of_plan_id,
        company_id,
        additional_id,
      });
      // //console.log(response, "check value");
      setLoading(false);
      setData(response.data.data);
      dispatch(AddAllPlans(response.data.data));
      settotalPlan(response.data.totalPlan);
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
  const handleProductFilter = async (event) => {
    dispatch(DeleteAllFromComapre());
    var { name, value } = event.target;
    value =
      value === "Any"
        ? null
        : value === "true"
          ? true
          : value === "false"
            ? false
            : value;
    value = name === "registration_year" ? value.toString() : value;
    if (name === "additional_id") {
      const newAdditionalId = event.target.value;
      if (event.target.checked) {
        setfilterform((prevFormData) => {
          const updatedAdditionalId = [
            ...prevFormData.additional_id,
            newAdditionalId,
          ];
          handleSubmitMotorform("additional_id", updatedAdditionalId);
          return {
            ...prevFormData,
            additional_id: updatedAdditionalId,
          };
        });
      } else {
        // Remove the unchecked additional ID from the state
        setfilterform((prevFormData) => {
          const updatedAdditionalId = prevFormData.additional_id.filter(
            (id) => id !== newAdditionalId
          );
          handleSubmitMotorform("additional_id", updatedAdditionalId);
          return {
            ...prevFormData,
            additional_id: updatedAdditionalId,
          };
        });
      }
    } else if (name === "model_year") {
      handleSubmitMotorform("model_year", value.toString());
      await axios
        .post(API_URL + "/api/getMotorDetails", {
          years: value.toString(),
        })
        .then((res) => {
          if (res && res.data.data?.length > 0) {
            let arrdata = res.data.data;
            const filtereddata = arrdata.filter(
              (item) => item._id !== motorFormsData.car_maker
            );
            setCarMakers([...filtereddata, { _id: motorFormsData.car_maker }]);
          } else {
            ////console.log("Data Not Found");
            swal({
              title: "",
              text: "No Data found for this Car Model and Year",
            }).then(() => { });
          }
        })
        .catch((error) => {
          ;
          swal({
            title: "",
            text: "No Data found for this Car Model and Year",
          }).then(() => { });
          ////console.log(error.response.data.message || "Data Not Found");
        });
      SaveDetails();
    } else if (name === "car_maker") {
      handleSubmitMotorform("car_maker", value.toString());
      await axios
        .post(API_URL + "/api/getMotorDetails", {
          carMaker: value.toString(),
          years: motorFormsData.model_year,
        })
        .then((res) => {
          if (res && res.data.data?.length > 0) {
            let arrdata = res.data.data;
            const filtereddata = arrdata.filter(
              (item) => item._id !== motorFormsData.car_model
            );
            setCarModel([...filtereddata, { _id: motorFormsData.car_model }]);
          } else {
            ////console.log("Data Not Found");
            swal({
              title: "",
              text: "No Data found for this Car Model and Year",
            }).then(() => { });
          }
        })
        .catch((error) => {
          ;
          swal({
            title: "",
            text: "No Data found for this Car Model and Year",
          }).then(() => { });
          ////console.log(error.response.data.message || "Data Not Found");
        });
      SaveDetails();
    } else if (name === "car_model") {
      handleSubmitMotorform("car_model", value);
      setfilterform((prevFormData) => {
        return {
          ...prevFormData,
          car_model: value,
        };
      });
      SaveDetails();
      await axios
        .post(API_URL + "/api/getMotorDetails", {
          years: motorFormsData.model_year,
          carMaker: motorFormsData.car_maker,
          carModel: value,
        })
        .then((res) => {
          if (res && res.data.data?.length > 0) {
            let arrdata = res.data.data;
            const filtereddata = arrdata.filter(
              (item) => item._id !== motorFormsData.car_variant
            );
            setCarVarient([
              ...filtereddata,
              { _id: motorFormsData.car_variant },
            ]);
          } else {
            ////console.log("Data Not Found");
            swal({
              title: "",
              text: "No Data found for this Car Model and Year",
            }).then(() => { });
          }
        })
        .catch((error) => {
          ;
          setCarVarient([{ _id: motorFormsData.car_variant }]);
          swal({
            title: "",
            text: "No Data found for this Car Model and Year",
          }).then(() => { });
          ////console.log(error.response.data.message || "Data Not Found");
        });
    } else if (name === "car_variant") {
      let car_variant = value;
      setfilterform((prevFormData) => {
        return {
          ...prevFormData,
          car_variant: car_variant,
        };
      });
      handleSubmitMotorform("car_variant", car_variant);
      SaveDetails();
    } else {
      setfilterform((prevFormData) => {
        return {
          ...prevFormData,
          [name]: value,
        };
      });
      handleSubmitMotorform(name, value);
      SaveDetails();
    }
  };

  return (
    <div>
      <Header />
      {/* <Innerbanner /> */}
      {motorFormsData.comparelist.length > 0 ? (

        <Link to={renewal != null ? (`/Comparision?renewal=${renewal}`) : (`/Comparision`)} className="compares123">
          <img className="compare_123" src={Compare} /><span style={{ position: 'absolute', top: '-10px', right: '5px' }}>(
            {motorFormsData.comparelist.length
              ? motorFormsData.comparelist.length
              : ""}
            )</span>
        </Link>
      ) : (
        ""
      )}
      <div className="Quotes_info1">
        <div className="container Quotes_info pt-4 pb-4">
          <div className="row " style={{ justifyContent: "center" }}>
            <FiltersById
              CarModel={CarModel}
              setCarModel={setCarModel}
              setCarVarient={setCarVarient}
              CarVarient={CarVarient}
              CarMakers={CarMakers}
              setCarMakers={setCarMakers}
              handleProductFilter={handleProductFilter} />
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
                    <option value={null}>Any</option>
                    {getrepairtypes && getrepairtypes.length > 0 ? (
                      getrepairtypes.map((v, i) => {
                        // //console.log(v, "check")
                        return (
                          <option

                            key={v._id}
                            value={v?._id}
                          >
                            {v?.repair_type_name}
                          </option>
                        );
                      })
                    ) : (
                      <option>Any</option>
                    )}
                  </select>
                </div>
                <div className="col">
                  <span>Ins Company</span>
                  <select
                    onChange={handleProductFilter}
                    name="company_id"
                    className="quotes_select form-control"
                    value={motorFormsData?.company_id}
                  >
                    <option value={null}>Any</option>
                    {getallplanename && getallplanename.length > 0 ? (
                      getallplanename.map((v) => {
                        return (
                          <>
                            <option value={v?._id}>{v?.company_name}</option>
                          </>
                        );
                      })
                    ) : (
                      <option>Any</option>
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
                    <option value={null}>Any</option>
                    {NaturePlan && NaturePlan.length > 0 ? (
                      NaturePlan.map((v) => {
                        return (
                          <option value={v?._id}>
                            {v?.nature_of_plan_name}
                          </option>
                        );
                      })
                    ) : (
                      <option>Any</option>
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
                    <option>Any</option>
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
                    <div className="col-lg-2">
                      {AdditionalidsData.length > 0 && (<span className="QuotesById_selectoption col-lg-2">
                        More Filters
                      </span>)}

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
                          // label={v?.additional_cover_label+"("+v?.additional_cover_description+")"}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </>

              {totalPlan > 0 && (
                <>
                  <p className="mb-3 paragra">
                    We have found {totalPlan} vehicle insurance QuotesById for your{" "}
                    {motorFormsData?.car_maker} {motorFormsData?.car_model},{" "}
                    {motorFormsData?.model_year} valued at <span style={{ color: '#003399', fontWeight: 'bold' }}>{motorFormsData.aslider_value} AED</span>
                  </p>
                </>
              )}
              <h4 className="notess">Note: All prices are excluding taxes.</h4>
              <div className="scroll_abcds">
                {Loading ? (
                  <>Loading</>
                ) : totalPlan > 0 ? (
                  Data.map((v) => {
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
                                ? "AED " + v?.finallBasePremium
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
                                  // handleShow();
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

                            {typeof v?.finallBasePremium === "number" ? (
                              <Link
                                to={`/Selectedquotes`}
                                state={{
                                  ...v,
                                  minCarValue: motorFormsData.minCarValue,
                                  Data,
                                }}
                              >
                                <button className="submit_select">
                                  Select
                                </button>
                              </Link>
                            ) : typeof v?.finallBasePremium === "string" ? (
                              <Link
                                to={
                                  "/thankyou?id=" +
                                  motorFormsData?.leadid +
                                  "&plan_id=" +
                                  v?._id +
                                  "&plan_company_id=" +
                                  v?.company_id +
                                  "&final_price=" +
                                  v?.finallBasePremium +
                                  "&status=Completed"
                                }
                              >
                                <button className="submit_select">
                                  Select
                                </button>
                              </Link>
                            ) : (
                              <Link
                                to={
                                  "/thankyou?id=" +
                                  motorFormsData?.leadid +
                                  "&plan_id=" +
                                  v?._id +
                                  "&plan_company_id=" +
                                  v?.company_id +
                                  "&final_price=" +
                                  v?.finallBasePremium +
                                  "&status=Completed"
                                }
                              >
                                <button className="submit_select">
                                  Select
                                </button>
                              </Link>
                            )}

                            <span className="terms_condition">
                              {v?.companies?.company_terms_conditions &&
                              v?.companies?.company_terms_conditions.length >
                                0 ? (
                                v?.companies?.company_terms_conditions.map(
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
                    We have found {0} vehicle insurance QuotesById for your{" "}
                    {motorFormsData?.car_maker} {motorFormsData?.car_model},{" "}
                    {motorFormsData?.model_year}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Insurancedetails />
      <Footer />
    </div>
  );
};
export default QuotesById;
