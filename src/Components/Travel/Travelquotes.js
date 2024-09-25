import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import finance from "../../Image/finance.svg";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Travelfilter from "./Travelfilter";
import { Link, useNavigate } from "react-router-dom";
import Travelbanner from "../Banner/Travelbanner";
import { useEffect } from "react";
import { get, set } from "firebase/database";
import Offcanvas from "react-bootstrap/Offcanvas";
import { UseMotorContext } from "../../MultiStepContextApi";
import compare from "../../Image/comparelist.svg";
import { API_URL } from "../..";
import axios from "axios";


const Travelquotes = () => {

  useEffect(() => {
    getadditionalcover();
  }, []);

  const [additionalCoverdetails, setAdditionalCoverdetails] = useState([]);
  const [additionalfilter, setAdditionalfilter] = useState([]);

  const additionalfilterdata = (id) => {
    //console.log(id);
    if (additionalfilter.includes(id)) {
      // If the id is already in the array, remove it
      setAdditionalfilter(
        additionalfilter.filter((filterId) => filterId !== id)
      );
    } else {
      // If the id is not in the array, add it
      setAdditionalfilter([...additionalfilter, id]);
    }
    // getMatchTravelPlan();
  };

  //console.log(additionalfilter);

  const getadditionalcover = () => {
    var requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      API_URL + "/api/getAllAdditionalCovered?lob=Travel",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.data);
        setAdditionalCoverdetails(data.data);
      });
  };

  //console.log(additionalCoverdetails);

  const { compareselect, setCompareselect } = UseMotorContext();
  const { comparematch, setComparematch } = UseMotorContext();

  const navigate = useNavigate();

  const [planDetailsVisibility, setPlanDetailsVisibility] = useState({});

  const toggleShowMore = (planId) => {
    setPlanDetailsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [planId]: !prevVisibility[planId], // Toggle the visibility for the specific plan
    }));
  };

  const { travelsFormsData, settravelsFormsData } = UseMotorContext();

  // //console.log(travelsFormsData)

  const [CoverTypeid, setCoverTypeid] = useState([]);
  const [company, setCompany] = useState([]);
  const [planNature, setPlanNature] = useState([]);
  const [matchTravelPlan, setMatchTravelPlan] = useState([]);
  const [show, setShow] = useState(false);

  const [selectedCovertypeid, setSelectedCovertypeid] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPlanNature, setSelectedPlanNature] = useState("");
  const [selectedprice, setSelectedprice] = useState("Lowest");

  const data = travelsFormsData;
  console.log(">>>>>>>>>> lead data", data)

  const handleClose = () => setShow(false);

  const insuranceType = data.line_of_business;
  const email = data.email;
  const travel_insurance_for = data.travel_insurance_for;
  const travel_trip_type = data.type_of_trip;
  const travel_plan_type = data.plan_type;
  const no_of_travel = data.no_of_travel;
  const travel_start_date = data.start_date;
  const travel_end_date = data.end_date;
  const date_of_birth = data?.date_of_birth;
  const travel_region_country = data.nationality;
  const nationalityId = data.nationality_id;
  const noOfChild = data.noOfChild;
  const noOfSpouse = data.noOfSpouse;
  const leadid = data.leadid
  const travelDaysRange = data.travelDaysRange

  console.log(noOfChild, "noOfChild")
  console.log(noOfSpouse, "noOfSpouse")

  useEffect(() => {
    getplancategorydetails();
    getCompanydetails();
    getplannaaturedetails();
    getMatchTravelPlan();

  }, []);

  useEffect(() => {
    getMatchTravelPlan();
  }, [
    selectedCovertypeid,
    selectedCompany,
    selectedPlanNature,
    selectedprice,
    travel_insurance_for,
    travel_trip_type,
    travel_plan_type,
    travel_start_date,
    travel_end_date,
    date_of_birth,
    travel_region_country,
    compareselect,
    additionalfilter,
    noOfChild,
    noOfSpouse,
    travelsFormsData,
  ]);

  const getplancategorydetails = async () => {
    try {
      const response = await fetch(
        API_URL + "/api/getTravelCoverTpe"
      );
      const data = await response.json();
      setCoverTypeid(data.data);
    } catch (error) {
      //console.log("Error getting plan category details:", error);
    }
  };

  const getCompanydetails = async () => {
    try {
      const response = await fetch(
        API_URL + "/api/getAllCompanies"
      );
      const data = await response.json();
      setCompany(data.data);
    } catch (error) {
      //console.log("Error getting company details:", error);
    }
  };

  const getplannaaturedetails = async () => {
    try {
      const response = await fetch(
        API_URL + "/api/getNaturePlan"
      );
      const data = await response.json();
      setPlanNature(data.data);
    } catch (error) {
      //console.log("Error getting plan nature details:", error);
    }
  };


  const getMatchTravelPlan = async () => {
    try {
      console.log(">>>>>>>", nationalityId)
      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          travelCoverTypeId: selectedCovertypeid,
          companyId: selectedCompany,
          planNaturId: selectedPlanNature,
          price: selectedprice,
          travel_insurance_for: travel_insurance_for,
          travel_trip_type: travel_trip_type,
          travel_plan_type: travel_plan_type,
          travel_start_date: travel_start_date,
          travel_end_date: travel_end_date,
          date_of_birth: date_of_birth,
          noOfDays: no_of_travel,
          // travel_region_country: travel_region_country,
          additionalCoverId: additionalfilter || [],
          nationalityId: nationalityId,
          noOfChild: noOfChild,
          noOfSpouse: noOfSpouse,
          newLeadId: leadid
        }),
      };

      // API_URL+"/api/getMatchTravelPlan"
      await fetch(API_URL + '/api/getMatchTravelPlan', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result.status, "status"); // Updated value of insureyourtravel
          if (result.status === 200) {
            //  console.log(result); // Updated value of insureyourtravel
            // result.data && result.data.length > 0 &&  
            setMatchTravelPlan(result.data);
            const quotesData = result.data
            axios.post(API_URL + "/api/AddQuotesGenerated", {
              planid: quotesData?.map((item) => item._id),
              lob: quotesData[0]?.line_of_business_id

            })
          }
          else {
            setMatchTravelPlan([]);
          }
        })
    } catch (error) {
      console.log(error);
    }
  };

  // const fillInsurancePlan = async (obj) => {
  //   try {
  //     const res = await axios.post(
  //       API_URL + "/api/fillInsurancePlan?email=" + travelsFormsData.email,
  //       {
  //         ...obj,
  //       }
  //     );
  //     settravelsFormsData((prevData) => ({
  //       ...prevData,
  //       leadid: res?.data?.data?._id
  //     }))
  //     localStorage.setItem('travelsFormsData', JSON.stringify(travelsFormsData))

  //     return res.status;
  //   } catch (error) {
  //     if (error && error.response.status) {
  //       return error.response.status;
  //     }
  //   }
  // };
  const UpdatePolicy = async (id, obj) => {
    await axios
      .put(
        `${API_URL}/api/updatePolicyDetails?id=${id}`,
        {
          ...obj,
        }
      )
      .then((res) => {
        return res.status;
      })
      .catch((error) => {
        if (error && error.response.status) {
          return error.response.status;
        }
      });
  }
  const HandleSubmitMotorFormdata = async (obj) => {
    let id = travelsFormsData?.leadid
    console.log("business", id)
    if (
      travelsFormsData.oldleadid !== null &&
      travelsFormsData.user === "customer"
    ) {
      await UpdatePolicy(travelsFormsData.oldleadid, obj)

    }
    // Business Entity User
    else if (travelsFormsData.user === "BE" && id !== null) {
      obj["businessentitytoken"] = travelsFormsData?.businessentitytoken
      await UpdatePolicy(id, obj)


    }
    else if (id !== null) {
      await UpdatePolicy(id, obj)

    }
    else {
      await UpdatePolicy(id, obj)

    }
  };

  useEffect(() => {
    submitupdateddata();
  }, [
    travel_insurance_for,
    travel_trip_type,
    no_of_travel,
    travel_plan_type,
    travel_start_date,
    travel_end_date,
    date_of_birth,
    travel_region_country,
  ]);

  const submitupdateddata = async () => {
    var requestOptions = {
      insuranceType: insuranceType,
      email: email,
      travel_insurance_for: travel_insurance_for,
      travel_trip_type: travel_trip_type,
      travel_plan_type: travel_plan_type,
      no_of_travel: no_of_travel,
      travel_start_date: travel_start_date,
      travel_end_date: travel_end_date,
      travel_region_country: travel_region_country,
      travelDaysRange: travelDaysRange,
      location: window.location.pathname.replace("/", "")
    };
    await HandleSubmitMotorFormdata(requestOptions)
    // //console.log(result); // Updated value of insureyourtravel
    getMatchTravelPlan();

  };

  // //console.log(matchTravelPlan)

  // const handleCheckboxClick = (planId) => {
  //     if (selectedPlanIds.includes(planId)) {
  //         // If the planId is already selected, remove it from the state
  //         setSelectedPlanIds(selectedPlanIds.filter(id => id !== planId));
  //         localStorage.removeItem("compareselect", JSON.stringify(planId));

  //     } else {
  //         // If the planId is not selected, add it to the state
  //         setSelectedPlanIds([...selectedPlanIds, planId]);
  //         localStorage.setItem("compareselect", JSON.stringify(planId));

  //     }
  //     setShow(true)
  // };

  //  const handleCheckboxClick = (planId) => {
  //     if (compareselect.includes(planId)) {
  //         // If the planId is already selected, remove it from the state
  //         setCompareselect(compareselect.filter(id => id !== planId));
  //         localStorage.removeItem("compareselect", JSON.stringify(planId));

  //     } else {
  //         // If the planId is not selected, add it to the state
  //         setCompareselect([...compareselect, planId]);
  //         localStorage.setItem("compareselect", JSON.stringify(planId));

  //     }
  //     setShow(true)
  // };

  const handleCheckboxClick = (planId) => {
    console.log(planId)

    if (
      compareselect.some((plan) => plan?.travelPriceId === planId?.travelPriceId)
    ) {
      // If the planId is already selected, remove it from the state
      setCompareselect(
        compareselect.filter(
          (plan) => plan?.travelPriceId !== planId?.travelPriceId
        )
      );
      localStorage.removeItem(
        "compareselect",
        JSON.stringify(planId?.travelPriceId)
      );
    } else {
      // If the planId is not selected, add it to the state
      setCompareselect([...compareselect, planId]);
      localStorage.setItem(
        "compareselect",
        JSON.stringify(planId?.travelPriceId)
      );
    }
    setShow(true);
    // const data=compareselect.find((plan) => plan.planData && plan.planData._id === planId.planData._id);
    // //console.log({data})
  };

  // const handleCheckboxClick = (planId) => {
  //   console.log(planId);

  //   const planIdentifier = { _id: planId._id, price_name: planId.travelPrices.price_name };

  //   if (
  //     compareselect.some((plan) => plan._id === planIdentifier._id && plan.price_name === planIdentifier.price_name)
  //   ) {
  //     // If the plan is already selected, remove it from the state
  //     setCompareselect(
  //       compareselect.filter((plan) => plan._id !== planIdentifier._id || plan.price_name !== planIdentifier.price_name)
  //     );
  //   } else {
  //     // If the plan is not selected, add it to the state
  //     setCompareselect([...compareselect, planIdentifier]);
  //   }

  //   // Update localStorage with the latest compareselect
  //   localStorage.setItem("compareselect", JSON.stringify([...compareselect, planIdentifier]));

  //   setShow(true);
  // };


  const handleremoveplan = (planId) => {
    setCompareselect((prevIds) => prevIds.filter((id) => id !== planId)); // Remove planId from selectedPlanIds
    localStorage.removeItem("compareselect", JSON.stringify(planId));
    const planItem = compareselect.find((item) => item === planId);
    if (planItem) {
      handleCheckboxClick(planItem);
    }
    getMatchTravelPlan();
  };

  const handleCompareClick = () => {
    setComparematch(matchTravelPlan);
    localStorage.setItem("comparematch", JSON.stringify(matchTravelPlan));
    navigate("/Travelcomparision", {
      state: { matchTravelPlan },
      replace: true, // Add this to replace the current history entry
    });
  };

  const handlePlanSelect = async (plan) => {
    console.log(plan);
    await axios.post(API_URL + `/api/updateLeadById?leadId=${travelsFormsData.leadid || travelsFormsData.oldleadid}`, {

      "plan_id": plan._id,
      "travel_price_id": plan.travelPrices?._id,
      "plan_company_id": plan.company_id,
      "selectedPrimium": +plan.travelBasePremium,
      "covereddata": plan.standard_cover_arr,
      "notCovereddata": plan.notCoveredData,
      "BECommission": +plan.BECommission,
      'travelDaysRange': plan.travelDaysRange,
      // "excessAmount": +plan.excessAmount,
      // "lead_id": motorFormsData.leadid || motorFormsData.oldleadid,
    }).then((response) => {
      console.log("response", response)
    }).catch((error) => {
      console.log("error", error)
    })


    const updatedPlan = plan;

    // Navigate to TravelSelectedquotes if a plan is selected
    if (updatedPlan) {
      navigate("/TravelSelectedquotes", {
        state: { selectedPlan: updatedPlan, matchTravelPlan: matchTravelPlan },
      });
    }
    localStorage.setItem("selectedPlan", JSON.stringify(updatedPlan));
    localStorage.setItem("conditionlocation", "Travelquotes")

    return updatedPlan;




  };

  const handlereferredplan = async (plan) => {
    const company_id = plan?.companyData.map((item) => item._id)
    const plan_id = plan?._id;
    const id = travelsFormsData.leadid || travelsFormsData.oldleadid;

    const requestOptions = {
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        insuranceType :"Travel",
        finalPriceRefferd: "REFFERED",
        company_id: company_id,
        plan_id: plan_id,
        "travel_price_id": plan.travelPrices?._id,
        travelDaysRange: plan.travelDaysRange,
        paymentStatus: "Completed",
        location: window.location.pathname.replace("/", "")
      }),
    };

    await fetch(
      `${API_URL}/api/updatePolicyDetails?id=${id}`,
      requestOptions
    )
      .then((response) => {
        //console.log(response);
        //console.log(response.data);
      })
      .catch((error) => {
        //console.log(error.response);
      });
    const newUrl = `/thankyou?id=${id}&lob=Travel&plan_id=${plan_id}&plan_company_id=${company_id}&final_price=REFFERED&status=Completed`;
    navigate(newUrl);
  };
  function openPDF(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag (navigating to a new page)
    const pdfURL = event.target.getAttribute("href");
    window.open(pdfURL, "_blank"); // Open the PDF in a new tab or window
    return false; // Ensure that the link doesn't navigate to the PDF URL
  }

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


  return (
    <div>
      <Header />
      {/* {compareselect.length > 0 && (
                <Offcanvas style={{ height: 'auto' }} show={show} onHide={handleClose} placement="bottom" backdrop={false} scroll={true}>
                    <Offcanvas.Body>
                        <div className="spc_field">
                            <div className="spcWrapper">
                                <div className="spc row" style={{ justifyContent: 'center' }}>
                                    {compareselect.map((plan) => (
                                        <div key={plan} className="selectedSpecification col-lg-3">

                                            <h6>{plan.planData?.plan_name}</h6>
                                            <p>AED {plan.travelBasePremium} </p><span onClick={() => handleremoveplan(plan)}>x</span>

                                        </div>
                                    ))}

                                    <div className="buttonadjust">
                                        <button className="cancelabcd" onClick={() => setShow(false)}>Cancel</button>
                                        {compareselect.length > 1 &&
                                            <button className="compareabcd" onClick={handleCompareClick}>Compare</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            )} */}

      {compareselect.length > 0 ? (
        <a onClick={() => handleCompareClick()} className="compares123">
          <img className="compare_123" src={compare} />
          <span style={{ position: "absolute", top: "-10px", right: "5px" }}>
            ({compareselect.length ? compareselect.length : 0})
          </span>
        </a>
      ) : (
        <></>
      )}

      <div className="Quotes_info1">
        <div className="container Quotes_info pt-4 pb-4">
          <div className="row" style={{ justifyContent: "center" }}>
            <Travelfilter matchTravelPlan={matchTravelPlan} />
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="row quotes_selectoption">
                <div className="col">
                  <span className="quotes_selectoption">Plan Categories</span>
                  <select
                    className="quotes_select form-control"
                    onChange={(e) => setSelectedCovertypeid(e.target.value)}
                  >
                    {/* Render the options from the plancategory array */}
                    <option value="">Any</option>
                    {CoverTypeid.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.travel_cover_type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <span className="quotes_selectoption">Ins Company</span>

                  <select
                    className="quotes_select form-control"
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="">Any</option>
                    {company.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.company_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <span className="quotes_selectoption">Plan Nature</span>

                  <select
                    className="quotes_select form-control"
                    onChange={(e) => setSelectedPlanNature(e.target.value)}
                  >
                    <option value="">Any</option>
                    {planNature.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nature_of_plan_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <span className="quotes_selectoption">Instant Policy</span>
                  <select className="quotes_select form-control">
                    <option value="">Any</option>
                    <option>Sort By</option>
                    <option>Sort By</option>
                  </select>
                </div>
                <div className="col">
                  <span className="quotes_selectoption">Price</span>
                  <select
                    className="quotes_select form-control"
                    onChange={(e) => setSelectedprice(e.target.value)}
                  >
                    <option hidden>Select</option>
                    <option value="Highest Price">Highest Price</option>
                    <option value="Lowest Price" selected>
                      Lowest Price
                    </option>
                  </select>
                </div>
              </div>
              <div className="row quotes_selectoption filters">
                <div className="row" >
                  <span className=" col-lg-12">More Filters</span>
                  {/* <br/> */}
                  {additionalCoverdetails.map((item) => (
                    <div className="col-lg-6">
                      <Form.Check
                        key={item.additional_cover_label} // Using label + index as a unique key
                        className="abcds_abcs filtercheck quotes_selectoption"
                        type="checkbox"
                        name="filter"
                        label={item.additional_cover_label}
                        value={item._id}
                        onChange={() => additionalfilterdata(item._id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="mb-3 paragra">
                We have found {matchTravelPlan.length} travel insurance quotes
                for your travel arrangements.
              </p>
              <div className="scroll_abcds">
                {matchTravelPlan && matchTravelPlan.map((item) => (
                  <div className="quotes_inner">
                    <div className="row quotes_details">
                      <div className="col-lg-3 quotesmobile">
                        {item.companyData?.map((item1) =>
                          item1.company_logo.map((logo) => (
                            <img
                              src={`${API_URL}/uploads/${logo.filename}`}
                              alt="logo"
                            />
                          ))
                        )}
                        {item.companyData?.map((item1) => (
                          <h6 className="companyname">{item1.company_name}  </h6>
                        ))}
                      </div>
                      <div className="col-lg-6 quotemobile">
                        <h4>{item.travelPrices.price_name}</h4>
                        {item.additional_cover_arr?.map((item2) => (
                          <ul className="benefits">
                            <li>{item2.additional_cover_label}</li>
                          </ul>
                        ))}
                      </div>
                      <div className="col-lg-3 action_abcd quotesmobile">
                        <h2>
                          {item.travelBasePremium == "Referred"
                            ? "Referred"
                            : "AED " +
                            formatAmount(item.travelBasePremium)

                          }
                        </h2>

                      
                          <div className="action_abcd quotesmobile">
                            <label htmlFor={`compareCheckbox-${item}`}>
                              <Form.Check
                                id={`compareCheckbox-${item.travelPriceId}`}
                                className="abcds_abcs1"
                                type="checkbox"
                                label="Compare"
                                checked={compareselect.some((plan) =>
                                  plan?.travelPriceId === item.travelPriceId
                                )}
                                onClick={() => handleCheckboxClick(item)}
                              />
                            </label>
                            {item.travelBasePremium == "Referred" ? (
                          <button
                            className="submit_select"
                            onClick={() => handlereferredplan(item)}
                          >
                            Select
                          </button>
                        ) : (
                            <button
                              className="submit_select"
                              onClick={() => handlePlanSelect(item)}
                            >
                              Select
                            </button>
                        )}
                          </div>

                        {item.policywordings_file && (
                          // <a href={`${API_URL}/uploads/${item?.policywordings_file}`} target="_blank" onclick={(event)=>openPDF(event)}>T&C Apply</a>
                          <span className="terms_condition">
                            <a href={`${API_URL}/uploads/${item?.policywordings_file}`} target="_blank" onclick={(event) => openPDF(event)}>T&C Apply</a>
                          </span>
                        )}

                      </div>
                    </div>
                    {planDetailsVisibility[item?.travelPriceId] ? (
                      <div className="rowabcds">
                        <div className="row overalldetails">
                          <div className="col-lg-6 abc">
                            <img
                              style={{ width: "auto", marginRight: "15px" }}
                              src={tick}
                            />
                            <span className="abcds_aud">What is Covered.</span>
                            {item.standard_cover_arr?.map((item3) => (
                              <ul className="description">
                                <li>{item3.standard_cover_label}</li>
                              </ul>
                            ))}
                          </div>
                          <div className="col-lg-6 cde">
                            <img
                              style={{ width: "auto", marginRight: "15px" }}
                              src={cross}
                            />
                            <span className="abcds_aud">
                              What is not Covered.
                            </span>
                            {item.notCoveredData?.map((item4) => (
                              <ul className="description">
                                <li>{item4.standard_cover_label}</li>
                              </ul>
                            ))}
                          </div>
                        </div>
                        <div className="row overalldetails">
                          <button
                            className="showadd_details"
                            onClick={() => toggleShowMore(item?.travelPriceId)}
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
                            onClick={() => toggleShowMore(item?.travelPriceId)}
                          >
                            See Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Travelquotes;
