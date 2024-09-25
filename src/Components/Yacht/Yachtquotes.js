import React, { useCallback, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Insurancedetails from "../Common/Insurancedetails";
import { Form } from "react-bootstrap";
import { useState } from "react";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import { API_URL } from "../..";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  AddToComapre,
  DeleteFromComapre,
  DeleteAllFromComapre,
  AddYacht,
  AddAllPlans,
  AddSelectedPlans,
  AddYachtEstimatedValue,
} from "../../redux/reducers/YachtDataReducerSlice";
import Compare from "../../Image/comparelist.svg";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import Yachtfilter from "./Yachtfilter";
import { UpdatePolicy, randomBasePremium } from "../../functions";
import YachtInsurancedetails from "../Common/YachtInsurancedetails";

const Quotes = () => {
  const { handlYachteSelectFormValuedata } = UseMotorContext()
  const YachtFormsData = useSelector((state) => state.YachtReducer);
  const [runEffects, setRunEffects] = useState(false);
  const [CarModel, setCarModel] = useState([]);
  const [CarMakers, setCarMakers] = useState([]);
  const [CarVarient, setCarVarient] = useState([]);
  const dispatch = useDispatch();
  const handlYachteSelectFormValue = (name, value) => {
    dispatch(AddYacht({ name, value }));
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

  const Navigate = useNavigate();

  useEffect(() => {
    getmatchMotorPlans();
  }, [
    YachtFormsData.isupdated,
    YachtFormsData.price,
    YachtFormsData.repaire_type_name,
    YachtFormsData.nature_of_plan_id,
    YachtFormsData.company_id,
    filterform,
  ]);
  useEffect(() => {
    getNaturePlan();
    getAllrepairtype();
    getAllCompanies();
    getAllAdditionalCovered();
    handlYachteSelectFormValuedata({
      email: YachtFormsData.email,
      location: window.location.pathname.replace('/', ""),
    });
  }, []);

  const getAllAdditionalCovered = async () => {
    await axios
      .get(API_URL + "/api/getAllAdditionalCovered?lob=Yacht")
      .then((response) => {
        setAdditionalidsData(response.data.data);
      });
  };

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
        // // ////console.log({ response });

        setgetrepairtypes(response.data.data);
        // // ////console.log("getrepairtypes", getrepairtypes);
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
      let obj = {
        price: YachtFormsData.price,
        hullId:YachtFormsData.hullId,
        engineId:YachtFormsData.engineId,
        policyTypeId:YachtFormsData.policyTypeId,
        boatLength: YachtFormsData.boat_length_in_meter, 
        boatBreadth: YachtFormsData.boat_breath_in_meter_id,
        modelId: YachtFormsData.YachtVarient, 
        knotsSpeed: YachtFormsData.engine_speed, 
        horsPower: YachtFormsData.engine_horsepower, 
        hullValue: YachtFormsData.sum_insured_hull_equipment_value, 
        DOB: YachtFormsData.date_of_birth, 
        company_id: YachtFormsData.company_id, 
        territoryCoverage: YachtFormsData.territoryCoverage, 
        claimsExperience: YachtFormsData.yatchClaimsExperience, 
        operatorExperience: YachtFormsData.yatchClaimsExperience1, 
        noOfpersion: YachtFormsData.no_of_passengers, 
        repairTypeId: YachtFormsData.repaire_type_name, 
        planNatureId: YachtFormsData.nature_of_plan_id, 
        additionalCoverId: filterform, 
        dinghyValue: YachtFormsData.sum_insured_dinghy_tender, 
        personalBelogingValue: YachtFormsData.sum_insured_personal_effect_including_cash, 
        trailerValue: YachtFormsData.sum_insured_trailer, 
        outBordValue: YachtFormsData.sum_insured_out_board,
        typeOfUseId: YachtFormsData.typeOfUseId,
        newLeadId:YachtFormsData.leadid
      }
      const response = await axios.post(API_URL + "/api/getMatchYatchPlans", obj);
      ////console.log(response.data.data, "check value");
      setLoading(false);
      let mappdata = [];

      try {
        if (response.data.data && response.data.data.length > 0) {
          const quotesData = response.data.data
          axios.post(API_URL + "/api/AddQuotesGenerated", {
            planid: quotesData?.map((item) => item._id),
            lob: quotesData[0]?.line_of_business_id
          })
          await response.data.data.filter(item => item.finallBasePremium !== "NaN" && item.finallBasePremium !== null && item.finallBasePremium !== undefined).map((a) => {
            a["_id"] = a._id || a.quoteNo;
            mappdata.push(a);
          });

          ////console.log("mappdata", mappdata)
          setData(mappdata);
          dispatch(AddAllPlans(mappdata));
          settotalPlan(mappdata.length);
        }
      } catch (error) {
        ////console.log("eror>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);
      }
      console.log("map data>>", mappdata);


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
      //console.log("event", event.target.name, event.target.value)
      // dispatch(DeleteAllFromComapre())
      var { name, value } = event.target;
      value =
        value === "Any"
          ? null
          : value === "true"
            ? true
            : value === "false"
              ? false
              : value;
      if (name === "additional_id") {
        const newAdditionalId = event.target.value;

        if (event.target.checked) {
          addElement(newAdditionalId);
        } else {
          // Remove the unchecked additional ID from the state
          removeElement(newAdditionalId);
        }
      }
      else {
        handlYachteSelectFormValue(name, value);
      }
    } catch (error) {
      //console.log(error)
    }
  };

  console.log("data", Data)


  const handleplansubmit = async (v) => {
    try {
      console.log("v", v)
      console.log(">>>>>>>>>>>>>>>>>>>>> id", v._id)
      console.log(">>>>>>>>>>>>>>>>>>>>> company_id", v.company_id)
      console.log(">>>>>>>>>>>>>>>>>>>>> selected premium", v.finallBasePremium)
      console.log(">>>>>>>>>>>>>>>>>>>>> standardcovers", v.standard_cover_arr)
      console.log(">>>>>>>>>>>>>>>>>>>>> notCoveredData", v.notCoveredData)
      console.log(">>>>>>>>>>>>>>>>>>>>> excess amount", v.excessAmount)

      await axios.post(API_URL + `/api/updateLeadById?leadId=${YachtFormsData.leadid || YachtFormsData.oldleadid}`, {

        "plan_id": v._id,
        "plan_company_id": v.company_id,
        "selectedPrimium": +v.finallBasePremium,
        "covereddata": v.standard_cover_arr,
        "notCovereddata": v.notCoveredData,
        "excessAmount": +v.excessAmount,
        'yatchRate': v.yatchRate
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

  const handlereferredplan = async (plan) => {
    // console.log(plan, "plan");
    const company_id = plan?.companies?.map((val)=> val._id);
    const plan_id = plan?._id;
    const id = JSON.parse(localStorage.getItem("leaddetails"));
    
    

    console.log(company_id, plan_id,">>>>>>>>>>>ddwdddfweadeade");
    const requestOptions = {
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        insuranceType :"Yatch",
        finalPriceRefferd: "REFFERED",
        company_id: company_id.toString(),
        plan_id: plan_id,
        paymentStatus: "Completed",
        BECommission: plan.BECommission,
        yatchRate: plan.yatchRate,
        location: window.location.pathname.replace("/", "")
      }),
    };



    await fetch(
      `${API_URL}/api/updatePolicyDetails?id=${YachtFormsData.leadid || YachtFormsData.oldleadid}`,
      requestOptions
    )
      .then((response) => {
        //console.log(response);
        //console.log(response.data);
      })
      .catch((error) => {
        //console.log(error.response);
      });

      const newUrl = `/thankyou?id=${YachtFormsData.leadid}&lob=Yacht&plan_id=${plan_id}&plan_company_id=${company_id}&final_price=REFFERED&status=Completed`;
      Navigate(newUrl);
  }



  return (
    <div>
      <Header />
      {/* <Innerbanner /> */}
      {YachtFormsData.comparelist.length > 0 ? (
        <Link to="/YachtComparision" className="compares123">
          <img className="compare_123" src={Compare} />
          <span style={{ position: "absolute", top: "-10px", right: "5px" }}>
            (
            {YachtFormsData.comparelist.length
              ? YachtFormsData.comparelist.length
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
            <Yachtfilter
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
                    value={YachtFormsData?.repaire_type_name}
                    // selected={YachtFormsData?.repair_type_name}
                    className="quotes_select form-control"
                  >
                    <option value={null}>Any</option>
                    {getrepairtypes && getrepairtypes.length > 0 ? (
                      getrepairtypes.map((v, i) => {
                        return (
                          <option key={v._id} value={v?._id}>
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
                    value={YachtFormsData?.company_id}
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
                    value={YachtFormsData?.nature_of_plan_id}
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
                    value={YachtFormsData?.instanpolicy}
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
                    value={YachtFormsData?.price}
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
                    We have found {Data.length} Yacht insurance quotes for your
                    Yacht arrangements.
                    {/* quotes for your{" "}
                    {YachtFormsData?.car_maker + " " + YachtFormsData?.car_model + " " + YachtFormsData?.car_variant + " "}
                    {YachtFormsData?.model_year} valued at{" "}
                    <span style={{ color: "#003399", fontWeight: "bold" }}>
                      {YachtFormsData.aslider_value} AED
                    </span> */}
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
                    if (YachtFormsData.comparelist.length > 0) {
                      comparelistdata = YachtFormsData.comparelist;
                      existComapreList = comparelistdata.find(
                        (item) => v._id === item._id
                      );
                    }
                    return (
                      <div key={v._id} className="quotes_inner">
                        <div className="row quotes_details">
                          <div className="col-lg-3 quotesmobile">
                            {v &&
                              v?.companies?.map((item) => (
                                item.company_logo.map((val, index) => (
                                  <img
                                    key={index}
                                    alt={val.fieldname}
                                    src={`${API_URL}/uploads/${val.filename}`}
                                  />
                                )
                                ))
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
                                to={`/YachtSelectedquotes`}
                                onClick={() => {
                                  dispatch(AddSelectedPlans(v))
                                  dispatch(AddYacht({ name: "location", value: window.location.pathname }))
                                  dispatch(
                                    DeleteFromComapre({
                                      data: v,
                                    })
                                    )
                                  handleplansubmit(v)
                                }}
                              >
                                <button className="submit_select">
                                  Select
                                </button>
                              </Link>
                            ) : (
                              <Link
                                onClick={() => {
                                  dispatch(
                                  DeleteFromComapre({
                                    data: v,
                                  })
                                  )
                                  handlereferredplan(v)
                                }
                              }
                                to={
                                  "/thankyou?id=" +
                                  YachtFormsData?.leadid +
                                  "&lob=Yacht"+
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
                    We have found {0} vehicle insurance quotes
                    {/* for your{" "}
                    {YachtFormsData?.car_maker + " " + YachtFormsData?.car_model + " " + YachtFormsData?.car_variant + " "}
                    {YachtFormsData?.model_year} */}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <YachtInsurancedetails /> */}
      <Footer />
    </div>
  );
};
export default Quotes;
