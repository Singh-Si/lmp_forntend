//main file for Homequotes
import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Form, Offcanvas } from "react-bootstrap";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Homefilter from "./Homefilter";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
import compare from "../../Image/comparelist.svg";
import { API_URL } from "../..";
import { set } from "firebase/database";
import axios from "axios";

const Homequotes = () => {
  const { HomeInsurance, setHomeInsurance, HandleSubmitHomeFormdata } = UseMotorContext();
  const [showMore, setShowMore] = useState(null);
  const [serverData, setServerData] = useState([]);
  const [naturePlan, setNaturePlan] = useState([]);
  const [planCategory, setPlanCategory] = useState([]);
  const [dataToSend, setDataToSend] = useState([]);
  const [quoteData, setQuoteData] = useState([]);
  const [filterCount, setFilterCount] = useState(null);
  const [show, setShow] = useState(false);
  const [quoteArr, setQuoteArr] = useState([]);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const [localCompare, setLocalCompare] = useState("");

  const [additionalCoverdetails, setAdditionalCoverdetails] = useState([]);
  const [additionalfilter, setAdditionalfilter] = useState([]);

  const Navigate = useNavigate();

  useEffect(() => {
    getadditionalcover();
    handleDrop();
  }, []);

  useEffect(() => {
    handleDrop();
  }, [
    HomeInsurance.plan_category_id,
    HomeInsurance.nature_id,
    HomeInsurance.insurance_company_id,
    HomeInsurance.price,
    HomeInsurance.building_value,
    HomeInsurance.content_value,
    HomeInsurance.personal_belongings_value,
    HomeInsurance.domestic_value,
    additionalfilter,
  ]);


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

  console.log(additionalfilter, "additionalfilter");
  console.log(HomeInsurance, "HomeInsurancedfgfgfgdfg");


  const getadditionalcover = () => {
    var requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      API_URL + "/api/getAllAdditionalCovered?lob=Home",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.data);
        setAdditionalCoverdetails(data.data);
      });
  };


  const fetchData = async () => {
    await fetch(`${admin}/getAllCompanies`)
      .then((res) => res.json())
      .then((data) => setServerData(data.data))
      .catch((e) => { });

    await fetch(`${admin}/getNaturePlan`)
      .then((res) => res.json())
      .then((data) => setNaturePlan(data.data))
      .catch((e) => { });

    await fetch(`${admin}/getAllPlanCategories`)
      .then((res) => res.json())
      .then((data) => setPlanCategory(data.data))
      .catch((e) => { });
  };




  const handleDrop = async () => {
    console.log(HomeInsurance, "HomeInsurance");
    const dataToSend = {
      company_id: HomeInsurance.insurance_company_id,
      nature_id: HomeInsurance.nature_id,
      plan_category_id: HomeInsurance.plan_category_id,
      price: HomeInsurance.price,
      additionalCoverId: additionalfilter || [],
      home_property_type: HomeInsurance.property_type,
      home_ownership_status: HomeInsurance.ownership_status,
      home_plan_type: HomeInsurance.plan_type,
      building_value: HomeInsurance?.building_value != null ? parseFloat(HomeInsurance?.building_value?.replace(/,/g, '')) : 0,
      content_value: HomeInsurance?.content_value != null ? parseFloat(HomeInsurance?.content_value?.replace(/,/g, '')) : 0,
      personal_belongings_value: HomeInsurance?.personal_belongings_value != null ? parseFloat(HomeInsurance?.personal_belongings_value?.replace(/,/g, '')) : 0,
      domestic_value: HomeInsurance.domestic_value,
      noOfClaimYear: HomeInsurance.noOfClaimYear,
      home_condition: HomeInsurance.home_condition,
      newLeadId:HomeInsurance.leadid
    };

    await fetch(`${admin}/getMatchHomePlan`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // //console.log(dataToSend, "ye hai after called");
        const quotesData = responseData.data
        axios.post(API_URL + "/api/AddQuotesGenerated", {
          planid: quotesData?.map((item) => item._id),
          lob: quotesData[0]?.line_of_business_id
        })
        setQuoteData(responseData.data);
        setHomeInsurance((prevState) => ({
          ...prevState,
          full_compare_data: responseData.data,
        }));
        setFilterCount(responseData.totalCount);
        const filterValue = responseData.data.filter((val) => {
          return quoteArr.some((quote) => quote._id === val._id);
        });
        // //console.log(quoteArr, responseData.data, filterValue);

        setQuoteArr(filterValue);
      })
      .catch((error) => {
        //console.error("Error:", error);
      });
  };

  const handleOption = (e) => {
    const name = e.target.name;
    const value = e.target.value === "Any" ? null : e.target.value;

    if (name === "plan_category_id" && value === null) {
      // If "Any" is selected for plan_category_id, set it to null
      setHomeInsurance((prevState) => ({
        ...prevState,
        plan_category_id: null,
      }));
    } else if (name === "insurance_company_id" && value === null) {
      setHomeInsurance((prevState) => ({
        ...prevState,
        insurance_company_id: null,
      }));
    } else if (name === "nature_id" && value === null) {
      setHomeInsurance((prevState) => ({
        ...prevState,
        nature_id: null,
      }));
    } else if (name === "price" && value === 'Any') {
      setHomeInsurance((prevState) => ({
        ...prevState,
        price: 'Any',
      }));
    } else {
      setHomeInsurance((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };



  const isQuoteSelected = (quote) => {
    return quoteArr.some((item) => item._id === quote._id);
  };

  const handleStoreSelected = async (data) => {
    console.log(data);
    setHomeInsurance((prevState) => ({
      ...prevState,
      selected: data,
      company_id: data.company_id,
      // final_price: 1200,
      plan_type_id: data._id,
      navigatelocation: "/Homequotes"
    }));

    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
    const { company_id, plan_type_id } = data;
    const dataToSend = {
      plan_category_id: company_id,
      plan_type_id,
      homeRate:data.homeRate,
      // final_price: 1200,
      paymentStatus: "pending",
    };
    // //console.log(dataToSend);

    await HandleSubmitHomeFormdata(dataToSend)

    await axios.post(API_URL + `/api/updateLeadById?leadId=${HomeInsurance.leadid || HomeInsurance.oldleadid}`, {

      "plan_id": data._id,
      "plan_company_id": data.company_id,
      "selectedPrimium": +data.travelBasePremium,
      "covereddata": data.standard_cover_arr,
      "notCovereddata": data.notCoveredData,
      "BECommission": data.BECommission,
      "homeRate":data.homeRate
    }).then((response) => {
      console.log("response", response)
    }).catch((error) => {
      console.log("error", error)
    })


    const updatedPlan = data;

    // Navigate to TravelSelectedquotes if a plan is selected
    // if (updatedPlan) {
    //   Navigate("/Homeselectedquotes", {
    //     state: { selectedPlan: updatedPlan },
    //   });
    // }
    // localStorage.setItem("selectedPlan", JSON.stringify(updatedPlan));

    if (updatedPlan) {

      Navigate("/Homeselectedquotes", {
        state: { selectedPlan: updatedPlan },
      });
      localStorage.setItem("selectedPlan", JSON.stringify(updatedPlan));
    } else {
      console.error("No plan selected.");
      // Handle the case where no plan is selected.
    }

    return updatedPlan;


  }

  const handlereferredplan = async (plan) => {
    console.log(plan, "plan");
    const company_id = plan?.companyDetails?._id;
    const plan_id = plan?._id;
    const id = JSON.parse(localStorage.getItem("leaddetails"));

    //console.log(company_id, plan_id, id);
    const requestOptions = {
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        insuranceType :"Home",
        finalPriceRefferd: "REFFERED",
        company_id: company_id,
        plan_id: plan_id,
        paymentStatus: "Completed",
        homeRate:plan.homeRate,
        location: window.location.pathname.replace("/", "")
      }),
    };

    await fetch(
      `${API_URL}/api/updatePolicyDetails?id=${HomeInsurance.leadid || HomeInsurance.oldleadid}`,
      requestOptions
    )
      .then((response) => {
        //console.log(response);
        //console.log(response.data);
      })
      .catch((error) => {
        //console.log(error.response);
      });

      const newUrl = `/thankyou?id=${HomeInsurance.leadid}&lob=Home&plan_id=${plan_id}&plan_company_id=${company_id}&final_price=REFFERED&status=Completed`;
      Navigate(newUrl);
  };

  const handleFormCheck = (quote, e) => {
    const name = e.target.name;
    // //console.log("this is the quote", quote, e.target.name);z

    if (e.target.checked) {
      if (!quoteArr.find((item) => item._id === quote._id)) {
        setQuoteArr((prevArr) => [...prevArr, quote]);
        handleCanvas();
      }
    } else {
      // If the checkbox is unchecked, remove the quote object from the arrays
      setQuoteArr((prevArr) =>
        prevArr.filter((item) => item._id !== quote._id)
      );
    }
  };

  const handleCanvas = () => {
    setShow(!show);
  };

  // //console.log(filterValue, "check");

  useEffect(() => {
    setHomeInsurance((prevState) => ({
      ...prevState,
      compare_data: quoteArr,
    }));
    // Save the updated HomeInsurance to localStorage
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [quoteArr]);

  const toggleShowMore = (index) => {
    setShowMore((prevState) => (prevState === index ? null : index));
  };

  useEffect(() => {
    const filterQuote = [];
    quoteData.forEach((val) => {
      let label = val.additional_cover_arr[1]?.additional_cover_label;
      if (label !== undefined && !filterQuote.includes(label)) {
        filterQuote.push(label);
      }
    });

    setHomeInsurance((prevState) => ({
      ...prevState,
      additional_filter: filterQuote,
    }));
  }, [quoteData, setHomeInsurance]);



  useEffect(() => {
    setUpdatePolicyId(HomeInsurance.updatePolicy_id);
    setQuoteArr(HomeInsurance.compare_data || []);
    // }
    fetchData();
    handleDrop();
  }, []);

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));

  }, [HomeInsurance]);


  console.log(quoteData, "HomeInsurance");

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
  }


  return (
    quoteData && (
      <div>
        <Header />

        {HomeInsurance.compare_data && HomeInsurance.compare_data.length > 0 ? (
          <Link to="/Homecompare" className="compares123">
            <img className="compare_123" src={compare} />
            <span style={{ position: "absolute", top: "-10px", right: "5px" }}>
              {HomeInsurance.compare_data.length
                ? `(${HomeInsurance.compare_data.length})`
                : 0}
            </span>
          </Link>
        ) : (
          <></>
        )}
        <div className="Quotes_info1">
          <div className="container Quotes_info pt-4 pb-4">
            <div className="row " style={{ justifyContent: "center" }}>
              <Homefilter />
              <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div className="row quotes_selectoption">
                  <div className="col">
                    <span>Plan Categories</span>

                    <select
                      name="plan_category_id"
                      className="quotes_select form-control"
                      onChange={handleOption}
                    >
                      <option value={null}>Any</option>

                      {planCategory.length === 0 ? (
                        <option>No options available</option>
                      ) : (
                        planCategory &&
                        planCategory.map((val) => (
                          <option value={val._id} key={val._id}>
                            {val.plan_category_name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="col">
                    <span>Ins Company</span>

                    <select
                      name="insurance_company_id"
                      className="quotes_select form-control"
                      onChange={handleOption}
                    >
                      <option value={null}>Any</option>

                      {serverData.length === 0 ? (
                        <option>No options available</option>
                      ) : (
                        serverData &&
                        serverData.map((val) => (
                          <option value={val._id} key={val._id}>
                            {val.company_name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="col">
                    <span>Plan Nature</span>

                    <select
                      name="nature_id"
                      className="quotes_select form-control"
                      onChange={handleOption}
                    >
                      <option value={null}>Any</option>

                      {naturePlan.length === 0 ? (
                        <option>No options available</option>
                      ) : (
                        naturePlan &&
                        naturePlan.map((val) => (
                          <option value={val._id} key={val._id}>
                            {val.nature_of_plan_name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div className="col">
                    <span>Instant Policy</span>

                    <select className="quotes_select form-control"

                    >
                      <option value={null}>Any</option>

                      <option>Sort By</option>
                      <option>Sort By</option>
                    </select>
                  </div>
                  <div className="col">
                    <span>Price</span>
                    <select
                      className="quotes_select form-control"
                      name="price"
                      onChange={handleOption}
                    >
                      <option value={null}>Any</option>

                      <option value={"Highest Price"}>Highest Price</option>
                      <option value={"Lowest Price"}>Lowest Price</option>
                    </select>
                  </div>
                </div>
                <div className="row quotes_selectoption filters">
                  {/* <div className="row">
                    <div className="col-lg-2">
                      <span className="quotes_selectoption col-lg-2">
                        More Filters
                      </span>
                    </div>
                    {HomeInsurance.additional_filter === null ||
                    !Array.isArray(HomeInsurance.additional_filter) ||
                    HomeInsurance.additional_filter.length === 0 ? (
                      <div>No additional_filter available, try reloading </div>
                    ) : (
                      HomeInsurance.additional_filter.map((val, index) => (
                        <div className="col-lg-4" key={index}>
                          <Form.Check
                            key={index}
                            className="abcds_abcs filtercheck"
                            type="checkbox"
                            label={val}
                            value={val._id}
                          />
                        </div>
                      ))
                    )}
                  </div> */}
                  <div className="row quotes_selectoption filters">
                    <div className="row" style={{ alignItems: "center" }}>
                      <span >More Filters</span>
                      {additionalCoverdetails.map((item) => (
                        <div className="col-lg-5">
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
                </div>
                <p className="mb-3 paragra">
                  We have found {quoteData.length} Home insurance quotes for your
                  Home arrangements.
                </p>
                <div className="scroll_abcds">
                  {

                    quoteData &&
                    quoteData.map((quote, index) => {
                      const isSelected = isQuoteSelected(quote);
                      // //console.log(isSelected, "value");
                      return (
                        <div className="quotes_inner" key={index}>
                          <div className="row quotes_details">
                            <div className="col-lg-3 quotesmobile">
                              {quoteData &&
                                quote.companyDetails.company_logo.map((val) => (
                                  <img
                                    key={index}
                                    alt={val.fieldname}
                                    src={`${API_URL}/uploads/${val.filename}`}
                                  />
                                ))}
                            </div>
                            <div className="col-lg-6 quotemobile">
                              <h4>{quote.plan_name}</h4>

                              {
                                quote.additional_cover_arr.map(
                                  (val, index) => (
                                    <ul className="benefits">
                                      <li>{val.additional_cover_label}</li>
                                    </ul>
                                  )
                                )
                              }

                            </div>
                            <div className="col-lg-3 action_abcd quotesmobile">
                              <h2> {quote.finallBasePremium == "Referred" ? "Referred" : "AED " + formatAmount(quote.finallBasePremium)}</h2>

                              {/* <h2>
                              {quoteData.map((val) => ( 
                                val.finallBasePremium == "Referred"
                                ? "Referred"
                                : "AED " +
                                val.travelBasePremium
                              ))}
                            </h2> */}

                              {quoteArr.some((val) => val._id === quote._id) ? (
                                <Form.Check
                                  className="abcds_abcs1"
                                  type="checkbox"
                                  label="Compare"
                                  name="compare_data"
                                  checked="checked"
                                  onChange={(e) => {
                                    handleFormCheck(quote, e);
                                  }}
                                />
                              ) : (
                                <Form.Check
                                  className="abcds_abcs1"
                                  type="checkbox"
                                  label="Compare"
                                  name="compare_data"
                                  checked=""
                                  onChange={(e) => {
                                    handleFormCheck(quote, e);
                                  }}
                                />
                              )}
                              {quote.finallBasePremium == "Referred" ? (
                                <button
                                  className="submit_select"
                                  onClick={() => handlereferredplan(quote)}
                                >
                                  Select
                                </button>
                              ) : (
                                <button
                                  className="submit_select"
                                  onClick={() => handleStoreSelected(quote)}
                                >
                                  Select
                                </button>
                              )}


                              <span className="terms_condition">

                                {quote?.policywordings_file && (
                                  <a href={`${API_URL}/uploads/${quote?.policywordings_file}`} target="_blank" onclick={(event) => openPDF(event)}>T&C Apply</a>
                                )}
                              </span>
                            </div>
                          </div>
                          {showMore === index ? (
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
                                    {quoteData &&
                                      quote &&
                                      quote.standard_cover_arr.map((val) => (
                                        <li key={index}>
                                          {val.standard_cover_label}
                                        </li>
                                      ))}
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
                                    {quoteData &&
                                      quote &&
                                      quote.notCoveredData.map((val) => (
                                        <li key={index}>
                                          {val.standard_cover_label}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="row overalldetails">
                                <button
                                  className="showadd_details"
                                  onClick={() => toggleShowMore(index)}
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
                                  onClick={() => toggleShowMore(index)}
                                >
                                  See Details
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  }
                </div>

                {/* <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3'>
                                <div className='row'>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ paddingLeft: '0px' }}>
                                        <button  className='buttonactions'><i className="fa fa-chevron-left" aria-hidden="true" ></i>Back</button>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right', paddingRight: '0px' }}>
                                    
                                            <button className='buttonactions' >Next<i className="fa fa-chevron-right" aria-hidden="true" ></i></button>
                                    </div>
                                </div>
                            </div> */}



              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  );
};

export default Homequotes;
