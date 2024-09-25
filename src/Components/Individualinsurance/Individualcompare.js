import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Filters from "./Individualmedicalfilter";
import { Table } from "react-bootstrap";
import cross from "../../Image/cross.svg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import admin from "../../config";
import { API_URL } from "../..";
import moment from "moment";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
const Individualcompare = () => {
  const state = {
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 3,
      },
      1024: {
        items: 6,
      },
    },
  };

  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
  } = UseMotorContext();
  const [notCoveredData, setNotCoveredData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [filteredCompareData, setFilteredCompareData] = useState([]);
  const [fullCompareData, setFullCompareData] = useState([]);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const [emirates, setEmirates] = useState([]);
  const [visa, setVisa] = useState([]);
  const [salary, setSalary] = useState([]);
  const [emiratesId, setEmiratesId] = useState("");
  const [visaId, setVisaId] = useState("");
  const [salaryId, setSalaryId] = useState("");
  const [country, setCountry] = useState([]);

  const Navigate = useNavigate();
 
  console.log(filteredCompareData,"i am the cdata you are expecting");

  const fetchData = async () => {
    await fetch(`${admin}/getAllStandardCovered?lob=Medical`)
      .then((data) => data.json())
      .then((data) => setNotCoveredData(data.data))
      .catch((e) => {});
  };

  // const filterData = () => {
  //   const filteredData = fullCompareData.filter((fullData) => {
  //     return !compareData.some(
  //       (compareItem) => compareItem._id === fullData._id
  //     );
  //   });
  //   setFilteredCompareData(filteredData);
  // };

  const handleAddFunction = (item) => {
    // Check if the item is already in compareData
    if (!compareData.some((compareItem) => compareItem.medicalPriceId === item.medicalPriceId)) {
      const updatedCompareData = [...compareData, item];

      // Remove the item from filteredCompareData
      setFilteredCompareData((prevFilteredData) =>
        prevFilteredData.filter((filteredItem) => filteredItem?.medicalPriceId !== item.medicalPriceId)
      );

      setIndividualInsurance((prevIndividualInsurance) => ({
        ...prevIndividualInsurance,
        compare_data: updatedCompareData,
      }));

      setCompareData(updatedCompareData); // Update the state directly with updatedCompareData

      return updatedCompareData;
    }
    return compareData; // No need to return the previous state here, just return compareData
  };

console.log(compareData,"i am the compare data");
console.log(filteredCompareData,"i am the filteredCompareData");

  const handlePlanRemove = (plan) => {
    setCompareData((prevCompareData) => {
      // Check if the plan is in compareData
      const planIndex = prevCompareData.findIndex(
        (compareItem) => compareItem._id === plan._id
      );

      if (planIndex !== -1) {
        // Remove the plan from compareData
        const updatedCompareData = [
          ...prevCompareData.slice(0, planIndex),
          ...prevCompareData.slice(planIndex + 1),
        ];

        // Update compareData and filteredCompareData simultaneously
        setCompareData(updatedCompareData);
        setFilteredCompareData((prevFilteredData) => {
          if (!prevFilteredData.some((item) => item.medicalPriceId === plan.medicalPriceId)) {
            return [...prevFilteredData, plan];
          }
          return prevFilteredData;
        });

        setIndividualInsurance((prevIndividualInsurance) => ({
          ...prevIndividualInsurance,
          compare_data: updatedCompareData,
        }));

        return updatedCompareData;
      }

      return prevCompareData;
    });
  };

  const handleStoreSelected = async (data) => {
    //console.log(data);
    // handlePlanRemove(data)
    // setIndividualInsurance((prevState) => ({
    //   ...prevState,
    //   selectFilter: data,
    //   company_id: data.company_id,
    //   final_price: 1200,
    //   plan_type_id: data._id,
    // }));
    // localStorage.setItem(
    //   "IndividualInsurance",
    //   JSON.stringify(IndividualInsurance)
    // );
    // const { company_id, plan_type_id } = data;
    // const dataToSend = {
    //   plan_category_id: company_id,
    //   plan_type_id,
    //   final_price: 1200,
    //   paymentStatus: "pending",
    // };
   

    // await fetch(`${admin}/updatePolicyDetails?id=${updatePolicyId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dataToSend),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {})
    //   .catch((err) => {});

      const updatedPlan = data;
      console.log(updatedPlan,"i am the updated plan");
      // if (updatedPlan) {
      //   Navigate("/Individualselectedquote", {
      //     state: { selectedPlan: updatedPlan },
      //   });

      //   localStorage.setItem("selectedPlan", JSON.stringify(updatedPlan));
      //   localStorage.setItem("navlocation", "Individualcompare")
      // } else {
      //   console.error("No plan selected.");
      //   // Handle the case where no plan is selected.
      // }
      
      // return updatedPlan;

      if (updatedPlan) {
        if(updatedPlan?.standard_conditions_arr && updatedPlan?.standard_conditions_arr.length > 0 ){
        Navigate("/Individualstandardconditions", {
          state: { selectedPlan: updatedPlan },
        });
        setIndividualInsurance((prevState) => ({
          ...prevState,
          selectFilter: updatedPlan,
          company_id: updatedPlan.companyDetails._id,
          plan_type_id: updatedPlan._id,
        }));
        localStorage.setItem("navlocation", "Individualcompare")
        localStorage.setItem("navlocation2", "Individualcompare")
        localStorage.setItem("selectedPlan", JSON.stringify(updatedPlan));

      }else{
        Navigate("/Individualselectedquote" , {
          state: { selectedPlan: updatedPlan },
        });
        localStorage.setItem("navlocation2", "Individualcompare")
        localStorage.setItem("selectedPlan", JSON.stringify(updatedPlan));
      }
      } else {
        console.error("No plan selected.");
        // Handle the case where no plan is selected.
      }

  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("IndividualInsurance");
    const parse = JSON.parse(data);
    if (parse) {
      setIndividualInsurance(parse);
      setCompareData(parse.compare_data);
      setFullCompareData(parse.full_compare_data);
      setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
    }
  }, []);

  const filterData = useCallback(() => {
    const filteredData = fullCompareData.filter((fullData) => {
      return !compareData.some(
        (compareItem) => compareItem.medicalPriceId === fullData.medicalPriceId
      );
    });
    setFilteredCompareData(filteredData);
  }, [fullCompareData, compareData]);

  useEffect(() => {
    filterData(); // Update filteredCompareData when fullCompareData changes
  }, [fullCompareData, compareData]);

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);

  const getallData = async () => {
    await fetch(`${admin}/getAllNattionlity`)
      .then((res) => res.json())
      .then((data) => setCountry(data.data))
      .catch((e) => { });

    await fetch(`${admin}/getAreaOfRegistrations`)
      .then((res) => res.json())
      .then((data) => setEmirates(data.data))
      .catch((e) => { });

    await fetch(`${admin}/getVisaTypes`)
      .then((res) => res.json())
      .then((data) => setVisa(data.data))
      .catch((e) => { });

    await fetch(`${admin}/getsalary`)
      .then((res) => res.json())
      .then((data) => setSalary(data.data))
      .catch((e) => { });
  };

  useEffect(() => {
    getallData();
    const location = localStorage.getItem("navlocation")
  }, []);

  useEffect(() => {
    idToName();
    // //console.log(emiratesId, salaryId, visaId, "value");
  }, [emirates, visa, salary]);
  useEffect(() => {
    idToName();
    // //console.log(emiratesId, salaryId, visaId, "value");
  }, [IndividualInsurance.emirates_id, IndividualInsurance.visa_id, IndividualInsurance.salary_id]);

  console.log(emirates, "IndividualInsurance");


  const idToName = () => {

    if (IndividualInsurance.emirates_id) {
      const findEle = emirates.find(
        (val) => val._id === IndividualInsurance.emirates_id
      );
      findEle && setEmiratesId(findEle.area_of_registration_name);
    }
    if (IndividualInsurance.visa_id) {
      const findEle = visa.find(
        (val) => val._id === IndividualInsurance.visa_id
      );
      findEle && setVisaId(findEle.medical_plan_condition);
    }
    if (IndividualInsurance.salary_id) {
      const findEle = salary.find(
        (val) => val._id === IndividualInsurance.salary_id
      );
      findEle && setSalaryId(findEle.medical_salary_range);
    }
  };

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
        insuranceType :"Medical",
        finalPriceRefferd: "REFFERED",
        company_id: company_id,
        plan_id: plan_id,
        paymentStatus: "Completed",
        medical_price_id: IndividualInsurance.medicalRates?._id,
        location: window.location.pathname.replace("/", "")
      }),
    };

    await fetch(
      `${API_URL}/api/updatePolicyDetails?id=${IndividualInsurance.leadid || IndividualInsurance.oldleadid}`,
      requestOptions
    )
      .then((response) => {
        //console.log(response);
        //console.log(response.data);
      })
      .catch((error) => {
        //console.log(error.response);
      });

      const newUrl = `/thankyou?id=${IndividualInsurance.leadid}&lob=Medical&plan_id=${plan_id}&plan_company_id=${company_id}&final_price=REFFERED&status=Completed`;
      Navigate(newUrl);
  }






  return (
    <div>
      <Header />
      <Individualmedicalbanner />
      <div className="quotes_filters1 comparision">
        <div className="container quotes_filters hide pt-4 pb-4">
          <div className="row">
            {/* <Filters /> */}


            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 filters">
            <h4 className='car details'>
              Medical Details
            <>
            <Link
              className="buttonactions"
              style={{ padding: "6px 19px", marginLeft: "10%" }}
              to={'/Individualinsurancequote'}
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
              Back
            </Link>
            </>
            </h4>
              <div className="filterssas one" style={{ backgroundColor: "white" }}>

                <div className="row border-0">
                  <div className="card border-0 ">
                  </div>

                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom mt-2">
                    <h6>Full Name</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{IndividualInsurance.full_name}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Email</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{IndividualInsurance.email}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Mobile Number</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{IndividualInsurance.phone_number}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Date of Birth</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>
                      {moment(IndividualInsurance.date).format("DD/MM/YYYY")}
                    </h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Gender</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{IndividualInsurance.gender}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Nationality</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{IndividualInsurance.nationality}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Emirate Issuing Visa</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{emiratesId}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Visa Type</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{visaId}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Salary</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{salaryId}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Height</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{IndividualInsurance.height}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Weight</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{IndividualInsurance.weight}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 table-container">
              {IndividualInsurance.compare_data.length === 0 ? (
                (window.location.href = "/Individualinsurancequote")
              ) : (
                // <></>
                <Table
                  style={{ textAlign: "center" }}
                  striped
                  size="lg"
                  className="comparisions table-responsive"
                >
                  <tbody>
                    <tr>
                      <td style={{ whiteSpace: "nowrap" }}>
                        Policy Features List
                      </td>
                      {compareData.map((data) =>
                        data.companyDetails.company_logo.map((val) => (
                          <td key={val._id}>
                            <img
                              className="comp_logoas"
                              alt={val.fieldname}
                              src={`${API_URL}/uploads/${val.filename}`}
                            />
                          </td>
                        ))
                      )}
                    </tr>

                    <tr>
                      <td style={{ fontWeight: "bold", color: "#003399" }}>
                        Plan Name
                      </td>
                      {compareData.map((data) => (
                        // <td style={{ fontWeight: "bold", color: "#003399" }}
                        //   key={data.medicalPriceId}
                        // >
                        //   { IndividualInsurance.compare_data.map((data) => (
                        //   <p key={data.medicalPriceId}>{data?.medicalRates?.name}</p>
                        //    )) }
                        // </td>
                        <td
                          style={{ fontWeight: "bold", color: "#003399" }}
                          key={data?.medicalPriceId}
                        >
                          <p>{data?.medicalRates?.name}</p>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={{ fontWeight: "bold", color: "#003399" }}>
                        Excess
                      </td>
                      {compareData.map((data) => (
                        <td
                          style={{ fontWeight: "bold", color: "#003399" }}
                          key={data._id}
                        >
                          <p>{data.excess}</p>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={{ fontWeight: "bold", color: "#003399" }}>
                        Premium Amount
                      </td>
                      {compareData.map((data) => (
                        <td
                          style={{ fontWeight: "bold", color: "#003399" }}
                          key={data._id}
                        >
                          <p>{data?.finallBasePremium}</p>
                        </td>
                      ))}
                    </tr>

                    {notCoveredData.map((nv) => (
                      <tr key={nv._id}>
                        <td>{nv.standard_cover_label}</td>
                        {compareData.map((data) => {
                          const foundData = data?.standard_cover_arr.find(
                            (item) => {
                              if (nv?._id === item?.standard_cover_id) {
                                return true;
                              } else {
                                return false;
                              }
                            }
                          );
                          return (
                            <td key={data._id}>
                              <>
                                {foundData ? (
                                  <td>
                                    {data?.standard_cover_arr &&
                                    data?.standard_cover_arr.length > 0 ? (
                                      data?.standard_cover_arr?.map((cover) => {
                                        return (
                                          <li style={{ listStyleType: "none" }}>
                                            {cover?.standard_cover_label} (
                                            {cover?.standard_cover_desc})
                                          </li>
                                        );
                                      })
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                ) : (
                                  <img src={cross} alt="Cross" />
                                )}
                              </>{" "}
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    <tr>
                      <td></td>
                      {compareData.map((data) => (
                        <td key={data.medicalPriceId}>
                           {data.finallBasePremium == 'Referred' ?  
                              <button
                                className="select"
                                onClick={() => handlereferredplan(data)}
                              >
                                Buy this
                              </button>
                              :
                            <button
                              className="select"
                              onClick={() => handleStoreSelected(data)} 
                            >
                              Buy This 
                            </button>
                          }
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td></td>
                      {compareData.map((data) => (
                        <td key={data._id}>
                          <button
                            className="removecompare"
                            onClick={() => handlePlanRemove(data)}
                          >
                            Remove
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              )}
            </div>
          </div>
          {filteredCompareData.length > 0 && (
          <div className="mt-4 compare_list">
            <h3 className="mb-4 mt-2">How about these ?</h3>

            {filteredCompareData.length > 0 ? (
              <OwlCarousel
                margin={30}
                autoplay={true}
                loop={false}
                nav={false}
                dots={false}
                items={1}
                touchDrag={true}
                lazyLoad={true}
                responsive={state.responsive}
              >
                {filterData &&
                  filteredCompareData.map((data) => (
                    <div className="item" key={data.medicalPriceId}>
                      <div className="comparelistcarousel">
                        {data.companyDetails.company_logo.map((val) => (
                          <img
                            key={val._id}
                            alt={val.fieldname}
                            src={`${API_URL}/uploads/${val.filename}`}
                          />
                        ))}
                        <p>{data.medicalRates?.name}</p>
                        <h4>AED {data.finallBasePremium}</h4>
                        <h5>
                          <strike>AED {data.finallBasePremium}</strike>
                        </h5>
                        <span>
                          <i className="fa fa-star" aria-="true"></i>4.5
                        </span>
                        <button
                          className="addtocomparebutton"
                          onClick={() => handleAddFunction(data)}
                        >
                          Add to compare
                        </button>
                      </div>
                    </div>
                  ))}
              </OwlCarousel>
            ) : (
              <div>No Plan to display</div>
            )}
          </div>
        ) }
        </div>
        <h3 className="disclaimerss">
          Individual medical insurance comparision for your medical requirements
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default Individualcompare;
