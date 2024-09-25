import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Filters from "./Homefilter";
import { Table } from "react-bootstrap";
import finance from "../../Image/finance.svg";
import cross from "../../Image/cross.svg";
import right from '../../Image/right.svg'
import Comparelist from "./Homecomparelist";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import admin from "../../config";
import { API_URL } from "../..";
import Homebanner from "../Banner/Homebanner";
const Homecompare = () => {
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

  const { HomeInsurance, setHomeInsurance } = UseMotorContext();
  const [notCoveredData, setNotCoveredData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [filteredCompareData, setFilteredCompareData] = useState([]);
  const [fullCompareData, setFullCompareData] = useState([]);
  const [updatePolicyId, setUpdatePolicyId] = useState("");

  const fetchData = async () => {

    await fetch(`${admin}/getAllStandardCovered?lob=Home`)
      .then((data) => data.json())
      .then((data) => setNotCoveredData(data.data))
      .catch((e) => { });
  };

  useEffect(() => {
    getstandarcovers()
  }, []);

  const Navigate = useNavigate();

  const handleAddFunction = (item) => {
    // Check if the item is already in compareData
    if (!compareData.some((compareItem) => compareItem._id === item._id)) {
      const updatedCompareData = [...compareData, item];

      // Remove the item from filteredCompareData
      setFilteredCompareData((prevFilteredData) =>
        prevFilteredData.filter((filteredItem) => filteredItem._id !== item._id)
      );

      setHomeInsurance((prevHomeInsurance) => ({
        ...prevHomeInsurance,
        compare_data: updatedCompareData,
      }));

      setCompareData(updatedCompareData); // Update the state directly with updatedCompareData

      return updatedCompareData;
    }
    return compareData; // No need to return the previous state here, just return compareData
  };

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
          if (!prevFilteredData.some((item) => item._id === plan._id)) {
            return [...prevFilteredData, plan];
          }
          return prevFilteredData;
        });

        setHomeInsurance((prevHomeInsurance) => ({
          ...prevHomeInsurance,
          compare_data: updatedCompareData,
        }));

        return updatedCompareData;
      }

      return prevCompareData;
    });
  };

  const handleStoreSelected = async (data) => {
    console.log(data);
    setHomeInsurance((prevState) => ({
      ...prevState,
      selected: data,
      company_id: data.company_id,
      final_price: data.finallBasePremium,
      plan_type_id: data._id,
      homeRate: data.homeRate,
      navigatelocation : "/Homecompare"
    }));

    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
    const { company_id, plan_type_id } = data;
    const dataToSend = {
      plan_category_id: company_id,
      plan_type_id,
      final_price: data.finallBasePremium,
      homeRate: data.homeRate,
      paymentStatus: "pending",
    };
    // //console.log(dataToSend);

    await fetch(`${admin}/updatePolicyDetails?id=${updatePolicyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((res) => { })
      .catch((err) => { })


      const updatedPlan = data;

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("HomeInsurance");
    const parse = JSON.parse(data);
    if (parse) {
      setHomeInsurance(parse);
      setCompareData(parse.compare_data);
      setFullCompareData(parse.full_compare_data);
      setUpdatePolicyId(HomeInsurance.updatePolicy_id);
    }
  }, []);

  useEffect(() => {
    filterData(); // Update filteredCompareData when fullCompareData changes
  }, [fullCompareData, compareData]);

  const filterData = useCallback(() => {
    const filteredData = fullCompareData.filter((fullData) => {
      return !compareData.some(
        (compareItem) => compareItem._id === fullData._id
      );
    });
    setFilteredCompareData(filteredData);
  }, [fullCompareData, compareData]);

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);

  console.log(compareData);
  console.log(filteredCompareData);


  const [standard_cover_arr, setStandard_cover_arr] = useState([]);

  const getstandarcovers = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${API_URL}/api/getAllStandardCovered?lob=Home`, requestOptions)
      .then(response => response.text())
      .then(result => {
        // //console.log(result);
        setStandard_cover_arr(JSON.parse(result).data);
      })
      .catch(error => console.log('error', error));
  }

  console.log(standard_cover_arr);

  function formatAmount(amount) {
    if (amount !== null) {
      const numericValue = parseFloat(amount.toString().replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        // Use toLocaleString with custom options for grouping
        return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
      }
      return ''; // Return an empty string if the input is not a valid number
    }
  }

  console.log(compareData, "compareData");

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
  }



  return (
    <div>
      <Header />
      <Homebanner />
      <div className="quotes_filters1 comparision">
        <div className="container quotes_filters hide pt-4 pb-4">
          <div className="row">
            <Filters />
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 table-container">
              <div className="scroll_abcd">
                {HomeInsurance.compare_data.length === 0 ? (
                  (window.location.href = "/Homequotes")
                ) : (
                  // <></>
                  <Table
                    style={{ textAlign: "center" }}
                    striped
                    size="lg"
                    className="comparisions"
                  >
                    <tbody>
                      <tr>
                        <td style={{ whiteSpace: "nowrap" }}>
                          Policy Features List
                        </td>
                        {compareData.map((data) =>
                          data.companyDetails.company_logo.map((val) => (
                            <td key={val._id}>
                              <img className="comp_logoas"
                                alt={val.fieldname}
                                src={`${API_URL}/uploads/${val.filename}`}
                              />
                            </td>
                          ))
                        )}
                      </tr>

                      <tr>
                        <td style={{ fontWeight: 'bold', color: '#003399' }}>Plan Name</td>
                        {compareData.map((data) => (
                          <td style={{ fontWeight: 'bold', color: '#003399' }} key={data._id}>
                            <p style={{ fontWeight: 'bold', color: '#003399' }}>{data.plan_name}</p>
                          </td>
                        ))}
                      </tr>

                      <tr>
                        <td style={{ fontWeight: 'bold', color: '#003399' }}>Premium Amount</td>
                        {compareData.map((data) => (
                          <td style={{ fontWeight: 'bold', color: '#003399' }} key={data._id}>
                            <p style={{ fontWeight: 'bold', color: '#003399' }}>{data.finallBasePremium == 'Referred' ?  'REFFERED' :  `AED ${formatAmount(data.finallBasePremium)}`}</p>
                          </td>
                        ))}
                      </tr>

                      {/* {notCoveredData.map((nv) => (
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
                                        data.standard_cover_arr.map((cover) => {
                                          return (
                                            <li  style={{ listStyleType: "none" }}>
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
                      ))} */}

                      {standard_cover_arr?.map((item1) => (

                        <tr key={item1.standard_cover_label}>
                          <td>{item1.standard_cover_label}</td>
                          {compareData?.map((item) => {
                            // Find the corresponding standard cover for the current plan
                            const matchedStandardCover = item?.standard_cover_arr.find(
                              (item2) => item2.standard_cover_label === item1.standard_cover_label
                            );

                            // Display the standard_cover_amount if it exists for the current plan
                            // You can modify this part according to your data structure
                            const standardCoverAmount = matchedStandardCover
                              ? matchedStandardCover.standard_cover_desc

                              : <img src={cross} alt='cross' />;

                            return <td key={item?.plan_name}>{standardCoverAmount === "Covered" ? <img src={right} alt='Covered' /> : standardCoverAmount}</td>;
                          })}
                        </tr>
                      ))}

                      <tr>
                        <td></td>
                        {compareData.map((data) => (
                          <td key={data._id}>
                           {data.finallBasePremium == 'Referred' ?  
                              <button
                                className="submit_select"
                                onClick={() => handlereferredplan(data)}
                              >
                                Buy this
                              </button>
                              :
                              <button
                                className="submit_select"
                                onClick={() => handleStoreSelected(data)}
                              >
                                Buy this
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
          </div>
          { filteredCompareData.length > 0 &&
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
                    <div className="item" key={data._id}>
                      <div className="comparelistcarousel">
                        {data.companyDetails.company_logo.map((val) => (
                          <img
                            key={val._id}
                            alt={val.fieldname}
                            src={`${API_URL}/uploads/${val.filename}`}
                          />
                        ))}
                        <p>{data.plan_name}</p>
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
              <div>No data to display</div>
            )}
          </div>
          }
        </div>
        <h3 className="disclaimerss">
          Home insurance comparision for your Home requirements
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default Homecompare;
