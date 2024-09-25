import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
// import Innerbanner from "../Banner/Innerbanner";
import finance from "../../Image/finance.svg";
import { Button, InputGroup, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Filters from "./Homefilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Comparelist from "./Homecompare";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import termsconditon from "../../Image/terms-condition.pdf";
import admin from "../../config";
import { API_URL } from "../..";
import { set } from "firebase/database";
import axios from "axios";
import Homebanner from "../Banner/Homebanner";
import moment from "moment";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Homeselectedquotes = () => {
  // const [startDate, setStartDate] = useState(new Date());
  const { HomeInsurance, setHomeInsurance } = UseMotorContext();
  const [showMore, setShowMore] = useState(true);
  const [quoteData, setQuoteData] = useState([]);
  const [quoteArr, setQuoteArr] = useState([]);
  const [Mortgage, setMortgage] = useState(false);
  const [startDate, setStartDate] = useState();
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [couponcode, setCouponcode] = useState("");
  const [discount, setDiscount] = useState(null);
  const [selectedadditionals, setSelectedadditionals] = useState([]);
  const [planlist, setPlanlist] = useState([]);
  const [areaofregistrationlist, setAreaofregistrationlist] = useState([]);
  const [termsconditiondata, setTermsconditiondata] = useState([]);

  const { hometooltip } = UseMotorContext();


  useEffect(() => {
    gettermscondition();
  }, [])
  const gettermscondition = () => {
    var requestOptions = {
      method: 'GET',
    };
    fetch(`${API_URL}/api/termsAndCondition?insuranceType=Home`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTermsconditiondata(result.data.terms_constions);
        console.log(result.data, ">>>>>>>>>>>>>>>>>>>>>>>>>");
      })
      .catch(error => console.log('error', error));
  };


  useEffect(() => {
    fetchData();
  }, [HomeInsurance]);

  useEffect(() => {
    const storedData = localStorage.getItem("HomeInsurance");
    if (storedData) {
      setHomeInsurance(JSON.parse(storedData));
    }
    fetchplanData()
    areaofregistration()
  }, []);

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);


  const fetchData = async () => {
    const homeInsurance = localStorage.getItem("HomeInsurance");
    if (homeInsurance) {
      const parsedData = JSON.parse(homeInsurance);
      setData([parsedData]);
    }

    await fetch(`${admin}/getAllNattionlity`)
      .then((res) => res.json())
      .then((data) => setServerData(data.data))
      .catch((e) => { })
  }


  const fetchplanData = async () => {
    try {
      const response1 = await fetch(
        API_URL + "/api/getAllHomePlanTypes"
      );
      if (!response1.ok) {
        throw new Error("Network response was not ok");
      }
      const data1 = await response1.json();
      setPlanlist(data1.data);
    } catch (error) {
      //console.log(error.message);
    }
  };

  const areaofregistration = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    await fetch(
      `${API_URL}/api/getAreaOfRegistrations`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setAreaofregistrationlist(data.data);
      });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [TermsAndConditions, setTermsAndConditions] = useState(false);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedids, setSelectedids] = useState([]);
  const navigate = useNavigate();
  // const API_URL = API_URL+"";
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 6);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    setHomeInsurance({
      ...HomeInsurance,
      policy_issued_date: date.toISOString(),
    });
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };
  const isWeekday = (date) => {
    const curr = new Date(date);
    const day = curr.getDay();
    return day !== 0 && day !== 6;
  };

  const [bankname, setBankname] = useState("");

  const handleSelect = (e) => {
    const value = e.target.value;
    setBankname(value);

    setHomeInsurance((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));

    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  useEffect(() => {
    setUpdatePolicyId(HomeInsurance.updatePolicy_id);
  }, []);


  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);

  // const [plandetails, setPlandetails] = useState([]);


  // const selectedPlan = HomeInsurance.selected;


  // useEffect(() => {
  //   setPlandetails([selectedPlan]);
  // }, [selectedPlan]);

  const [plandetails, setPlandetails] = useState([]);

  const location = useLocation();
  const { selectedPlan } = location.state;

  useEffect(() => {
    // Do something with the selectedPlanIds data in the Comparison component
    setPlandetails([selectedPlan]);
  }, [selectedPlan]);

  console.log(plandetails);


  console.log("plandetails", plandetails);



  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    const value = JSON.parse(e.target.value);
    if (checked) {
      setSelectedadditionals([...selectedadditionals, value]);
      setSelectedValues([...selectedValues, value.additional_cover_label]);
      setSelectedids([...selectedids, value.additional_cover_id]);

    } else {
      setSelectedadditionals([...selectedadditionals, value]);
      setSelectedValues(selectedValues.filter((item) => item !== value.additional_cover_label));
      setSelectedids(selectedids.filter((item) => item !== value.additional_cover_id));


    }
  };

  console.log(selectedValues);
  console.log(selectedids);


  console.log("selectedValues", HomeInsurance.selected);

  const getTotalAmountDue = () => {
    let totalamount = plandetails.map((item) => item.finallBasePremium).reduce((prev, next) => prev + next, 0);
    let newamount1 = 0;
    let newamount2 = 0;
    let newamount3 = 0;

    // Loop through selectedValues and add or subtract corresponding additional_cover_value
    selectedValues.forEach((selectedValue) => {
      plandetails.forEach((item) => {
        if (item?.additional_cover_arr) {
          const selectedCover = item.additional_cover_arr.find(
            (label) => label.additional_cover_label === selectedValue
          );

          if (selectedCover) {
            const coverValue = parseFloat(selectedCover.additional_cover_value);

            if (!isNaN(coverValue)) {
              if (selectedCover.additional_cover_value.includes('%')) {
                // If percentage value, subtract or add percentage from the total amount based on sign
                const percentageValue = Math.abs(coverValue);
                newamount1 += selectedCover.additional_cover_value.includes('-')
                  ? -(totalamount * percentageValue) / 100
                  : (totalamount * percentageValue) / 100;
              } else {
                // If fixed value, subtract or add fixed value from the total amount based on sign
                newamount2 += selectedCover.additional_cover_value.includes('-')
                  ? -coverValue
                  : coverValue;
              }
            }
          }
        }
      });
    });

    console.log("totalamount", +totalamount);
    console.log("newamount1", newamount1);
    console.log("newamount2", newamount2);
    console.log("newamount3", newamount3);


    const totalAmount = +totalamount + newamount1 + newamount2 + newamount3;

    return totalAmount;
  };

  const [terms, setTerms] = useState(false);

  console.log(getTotalAmountDue());
  const totaldueamount = +getTotalAmountDue();
  console.log(totaldueamount);



  const handleUpdatePolicy = async () => {
    console.log("i am working ");
    if (Mortgage && bankname == "" && HomeInsurance.bank_name == "") {
      swal("Please enter bank name", "", "warning");
      return;
    }

    else if (HomeInsurance.discountvalue == true && HomeInsurance.coupon_code == "") {
      swal("Please enter valid coupon code", "", "warning");
      return;

    }

    else {

      console.log(HomeInsurance.coupon_code_data, "HomeInsurance");
      let additionalamount = []
      for (let i = 0; i < selectedadditionals.length; i++) {
        console.log("........................kkkkkkkkkkkkkkkkkkkkkkm xmc vmm c")
        let amount
        let topupVaule = selectedadditionals[i]?.additional_cover_value
        let finallBasePremium = HomeInsurance.finallBasePremium
        if (topupVaule?.includes('%')) {
          let rate
          if (topupVaule.includes("-")) {
            rate = topupVaule.split('-')[1]
            rate = +rate.split("%")[0]
            amount = -finallBasePremium * rate / 100
          } else {
            rate = +topupVaule.split('%')[0]
            amount = finallBasePremium * rate / 100
          }

        } else {
          amount = +topupVaule
        }
        additionalamount.push({ ...selectedadditionals[i], amount: amount })
        console.log("amounkkkkkkkkkkkkkkkkkkkkkkkkkkkkt", amount, additionalamount)
      }

      let discountvalue = HomeInsurance?.coupon_code_data
      if (discountvalue?.includes('%')) {
        let percentage = discountvalue.replace(/%/g, '');
        if (percentage?.includes('-')) {
          percentage = percentage.split('-')[1];
          percentage = +percentage;
          discountvalue = getTotalAmountDue() - (getTotalAmountDue() * percentage) / 100;
          console.log(getTotalAmountDue(), "totalAmount");
        } else {
          percentage = +percentage;
          console.log(percentage, "percentage");
          discountvalue = (getTotalAmountDue() * percentage) / 100;
          console.log(getTotalAmountDue(), "totalAmount");
        }
      } else {
        // If fixed value, subtract or add fixed value from the total amount based on sign
        discountvalue = (+discountvalue);
        console.log(getTotalAmountDue(), "totalAmount");
      }

      await axios
        .put(API_URL + `/api/updatePolicyDetails?id=${HomeInsurance.leadid}`, {
          insuranceType: "Home",
          plan_id: HomeInsurance?.plan_type_id,
          plan_company_id: HomeInsurance?.company_id,
          additionalPrimium: +getTotalAmountDue(),
          discountAmount: +discountvalue,
          termsConditionStatus: terms,
          additionalCover: additionalamount,
          paymentStatus: "pending",
          bank_name: Mortgage ? HomeInsurance.bank_name : "",
          policy_issued_date: HomeInsurance.policy_issued_date,
        })
        .then((result) => {
          if (result.status == 200) {

            localStorage.setItem('leaddetails', JSON.stringify(result.data._id))
            // setUpdate(false);
            navigate("/Homepayment");
            localStorage.setItem("plandetails", JSON.stringify(plandetails,));
            localStorage.setItem("totaldueamount", JSON.stringify(totaldueamount));
            localStorage.setItem("selectedValues", JSON.stringify(selectedValues));
            localStorage.setItem("selectedids", JSON.stringify(selectedids));

          } else {
            swal('Error', 'Error in Adding Family Details', 'error')
          }
        })
        .catch((error) => {

          console.log(error)
        })




    }
  }

  console.log(plandetails, "plandetails");




  const handleback = () => {
    setHomeInsurance({
      ...HomeInsurance,
      coupon_code: '',
      discountvalue: null,
      coupon_code_data: null
    });
    navigate(HomeInsurance.navigatelocation)
  }

  console.log("Navigatelocation", HomeInsurance.navigatelocation);

  const handlecouponcode = async () => {
    try {
      if (couponcode === "") {
        swal({
          text: "Please enter coupon code",
          icon: "warning"
        });
        return;
      }
      else {
        await axios.post(`${API_URL}/api/getDiscountCoupon`, {
          code: couponcode,
          lob: 'Home'
        }).then((response) => {
          console.log(response, "check the response")
          if (response?.data?.status === 200) {
            // dispatch(AddMotoformData({ name: "coupon_code_data", value: response?.data?.data }))
            setHomeInsurance({
              ...HomeInsurance,
              coupon_code: couponcode,
              discountvalue: discount,
              coupon_code_data: response?.data?.data
            })

            swal({
              text: response?.data?.message,
              icon: "success",
              button: false
            })
            setTimeout(() => {
              swal.close()
            }, 1000);
          } else {
            swal(
              response?.data?.message ||
              response?.message ||
              "Internal Server Error",
              "",
              "error"
            )
          }
        }).catch((error) => {
          swal(
            error?.response?.data?.message ||
            error?.message ||
            "Internal Server Error",
            "",
            "error"
          )
        })
      }
    } catch (error) {
      swal(
        error?.response?.data?.message ||
        error?.message ||
        "Internal Server Error",
        "",
        "error"
      )
    }
  }

  console.log(couponcode)



  const handlediscountchange = (e) => {
    const isChecked = e.target.checked;
    console.log(isChecked);
    setDiscount(isChecked);
    setHomeInsurance({ ...HomeInsurance, discountvalue: isChecked })
    if (isChecked == false) {
      setCouponcode('')
      setHomeInsurance((prevData) => ({
        ...prevData,
        coupon_code: '',
        coupon_code_data: ''
      }));
    }
  };



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

  console.log(data);
  console.log('hometooltip:', hometooltip)




  return (
    <div>
      <Header />
      <Homebanner />
      <div className="Selectedinfo">
        <div className="container Quotes_info1212 pt-4 pb-4">
          <div className="row quotes_all">
            {/* <Filters /> */}

            <div className='col-lg-4 col-md-12 col-sm-12 col-xs-12 filters'>
              <h4 className="car details">Home Details</h4>
              <div className="filterssas one">
                {data.length === 0 ? (
                  <div>Something went wrong</div>
                ) : (
                  data.map((val, index) => (
                    <div className="row" key={index}>
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>Plan Type</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{planlist.map((item) => item._id == val.plan_type ? item.home_plan_type : null)}</h6>
                      </div>
                      {val.plan_type === "642279d4fb67d39380fef82d" || val.plan_type === "64227a65fb67d39380fef842" ?
                        <>
                          <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                            <h6>Building Value (AED)</h6>
                          </div>
                          <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                            <h6>AED {val.building_value}</h6>
                          </div>
                        </>
                        : null}
                      {val.plan_type === "642279f2fb67d39380fef834" || val.plan_type === "64227a65fb67d39380fef842" ?
                        <>
                          <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                            <h6>Content Value</h6>
                          </div>
                          <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                            <h6>AED {val.content_value}</h6>
                          </div>
                        </>
                        : null}
                      {val.plan_type === "642279f2fb67d39380fef834" || val.plan_type === "64227a65fb67d39380fef842" ?
                        <>
                          <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                            <h6>Personal belonging Value (AED)</h6>
                          </div>
                          <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                            <h6>{val.personal_belongings_value}</h6>
                          </div>
                        </>
                        : null}

                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>Flat / Villa No.</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{val.address.flatvillano}</h6>
                      </div>
                      {val.property_type === "64216af4c0e5389c0007de2e" &&
                        <>
                          <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                            <h6>Building Name</h6>
                          </div>
                          <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                            <h6>{val.address.buildingname}</h6>
                          </div>
                        </>
                      }
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>Street# / Name</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{val.address.streetname}</h6>
                      </div>
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>Area</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{val.address.area}</h6>
                      </div>
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>Emirate</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{val.address.emirate}</h6>
                      </div>
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>P.O. Box</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{val.address.pobox}</h6>
                      </div>
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>Makani #</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{val.address.makani}</h6>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <h4 className='car details'>
                Personal Details
              </h4>
              <div className="filterssas one">
                {data.length === 0 ? (
                  <div>Something went wrong</div>
                ) : (
                  data.map((val, index) => (
                    <div className="row" key={index}>
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>Full Name</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{val.full_name}</h6>
                      </div>
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>Email</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{val.email}</h6>
                      </div>
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>Mobile Number</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{val.phone_number}</h6>
                      </div>
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>Date of Birth</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{moment(val.date).format("DD/MM/YYYY")}</h6>
                      </div>
                      {/* <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
                  <h6>Gender</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Male</h6>
                </div> */}
                      <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
                        <h6>Nationality</h6>
                      </div>
                      <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                        <h6>{val.nationality}</h6>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div
              className="col-lg-8 col-md-12 col-sm-12 col-xs-12"
              style={{ marginTop: "40px" }}
            >
              <div className="">

                {plandetails?.map((item, index) => (
                  <div className="quotes_inner" key={plandetails?._id}>
                    <div
                      className="row quotes_details"
                      style={{
                        marginLeft: "0px",
                        marginRight: "0px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    >
                      <div className="col-lg-3 action_abcd">

                        {item.companyDetails?.company_logo?.map((logo) => (
                          <img src={`${API_URL}/uploads/${logo.filename}`} alt='logo' />
                        ))}


                      </div>
                      <div className="col-lg-6 quotemobile">
                        <h4>{item.plan_name}</h4>
                        <ul className="benefits">
                          {item?.additional_cover_arr &&
                            item?.additional_cover_arr.map((val) => (
                              <li key={item._id}>
                                {
                                  val?.additional_cover_label
                                }
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                      <div className="col-lg-3 action_abcd">
                        <h2>AED {
                          formatAmount(item?.finallBasePremium)

                        }</h2>

                        <p>T&C Apply</p>
                      </div>
                    </div>
                    {showMore ? (
                      <div className="rowabcds">
                        <div className="row">
                          <div className='col-lg-6 abc'>
                            <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                            {item?.standard_cover_arr?.map((item3) => (
                              <ul className='description'>
                                <li>{item3.standard_cover_label}</li>

                              </ul>
                            ))}
                          </div>

                          {/* <div className="col-lg-6 cde">
                            <img
                              key={HomeInsurance.selected?._id}
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
                              {HomeInsurance.selected &&
                                HomeInsurance.selected?.notCoveredData.map((val) => (
                                  <li key={val._id}>
                                    {val.standard_cover_label}
                                  </li>
                                ))}
                            </ul>
                          </div> */}
                          <div className='col-lg-6 cde'>
                            <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                            {item.notCoveredData?.map((item4) => (
                              <ul className='description'>
                                <li>{item4.standard_cover_label}</li>

                              </ul>
                            ))}
                          </div>
                        </div>
                        <div className="row">
                          <button
                            className="showadd_details"
                            onClick={() => toggleShowMore()}
                          >
                            Hide Details
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="rowabcds">
                        <div className="row">
                          <button
                            className="showadd_details"
                            onClick={() => toggleShowMore()}
                          >
                            See Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

              </div>
              <div className="colnopadding additional mb-3">
                <div className="row form_abcd" style={{ justifyContent: "initial" }}>
                  <p className="">Additional Filter</p>

                  {/* <div className='col-lg-12 mb-4 mt-2' key={HomeInsurance.selected.id}>
                  {HomeInsurance.selected?.additional_cover_arr &&
                    HomeInsurance.selected?.additional_cover_arr.map((val, index) => (
                      <Form.Check
                        key={val._id}
                        className='abcds_abcs'
                        type="checkbox"
                        label={
                          val.additional_cover_label + " " + "(" + "AED" + " " +
                          (
                            val.additional_cover_value !== "" &&
                              val.additional_cover_value.includes('%') ?
                              (
                                val.additional_cover_value.includes('-') ? 
                                -1 * (HomeInsurance.selected?.finallBasePremium * parseFloat(val.additional_cover_value.replace(/%/g, '').split('-')[1]) / 100) 
                                :
                                  (HomeInsurance.selected?.finallBasePremium * parseFloat(val.additional_cover_value.replace(/%/g, '')) / 100)
                              ) :
                              val.additional_cover_value || 0
                          ) +
                          ")"
                        }
                        // value={val}
                        value={JSON.stringify(val)}
                        onChange={handleCheckboxChange}
                      />
                      ))}
                      </div> */}

                  {plandetails.map((item) => (
                    <div className='col-lg-12 mb-4 mt-2' key={item.id}>
                      {item?.additional_cover_arr && item?.additional_cover_arr.length > 0 && (
                        <>
                          {item.additional_cover_arr.map((label, index) => (
                            <>
                              <Form.Check
                                className='abcds_abcs'
                                type="checkbox"
                                label={
                                  label.additional_cover_label + " " +
                                  (
                                    label.additional_cover_value !== "" &&
                                      label.additional_cover_value?.includes('%') ?
                                      "(" + "AED" + " " +
                                      (
                                        label.additional_cover_value?.includes('-') ?
                                          -1 * (item.finallBasePremium * parseFloat(label.additional_cover_value.replace(/%/g, '').split('-')[1]) / 100) :
                                          (item.finallBasePremium * parseFloat(label.additional_cover_value.replace(/%/g, '')) / 100)
                                      )
                                      + ")"
                                      :
                                      label.additional_cover_value != 0 ? "(" + "AED" + " " + label.additional_cover_value + ")" : "(" + "free" + ")" || "free"
                                  )

                                }
                                key={index}
                                // value={label.additional_cover_label}
                                value={JSON.stringify(label)}

                                onClick={handleCheckboxChange}
                              />
                              {/* <span className='side-by-side-item'>AED { label.additional_cover_value}</span> */}
                            </>
                          ))}
                        </>
                      )}
                    </div>
                  ))}


                  <div className="col-lg-12 nopadding">
                    <div className="row form_abcd">
                      <div className="col-lg-6">
                        <h4>Mortgage</h4>
                      </div>
                      <div className="col-lg-6">
                        <div className="d-flex justify-space-between">
                          <Form.Check
                            className="mortageee"
                            type="radio"
                            name="Mortgage"
                            label="Yes"
                            checked={Mortgage === true}
                            onChange={() => setMortgage(true)}
                          />
                          <Form.Check
                            className="mortageee"
                            type="radio"
                            name="Mortgage"
                            label="No"
                            checked={Mortgage === false}
                            onChange={() => {
                              setMortgage(false);
                            }}
                          />
                        </div>
                      </div>
                      {Mortgage && (
                        <div className="col-lg-12">
                          <InputGroup className="mb-4">
                            <Form.Control
                              required
                              name="bank_name"
                              onChange={(e) => handleSelect(e)}
                              value={HomeInsurance.bank_name}
                              placeholder="Bank Name"
                              aria-label="Bank Name"
                            />
                          </InputGroup>
                        </div>
                      )}
                      <div className="col-lg-6">
                        <h4> Policy Start Date</h4>
                      </div>
                      <div className="col-lg-6" style={{ position: 'relative' }}>
                        <InputGroup className="mb-5">
                          <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <DatePicker
                            placeholder="Select a date"
                            className="form-control"
                            selected={
                              HomeInsurance.policy_issued_date ? new Date(HomeInsurance.policy_issued_date) : today
                            }
                            onChange={(date) => handleStartDate(date)}
                            onKeyDown={(e) => e.preventDefault()}
                            // filterDate={isWeekday}
                            minDate={today}
                            maxDate={sevenDaysLater}
                            dateFormat="dd/MM/yyyy"
                            // peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            showTimeSelect={false}
                          />
                        </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {hometooltip?.policyStartDate}
                            </Tooltip>
                          }
                        >
                          <i style={{ top: "15px" }} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>


                  {/* <div className="manageexcess" style={{ textAlign: "right", paddingTop: '20px' }}>
                          <h4 style={{ color: '#ED1C24', fontWeight: 'bold' }}>AED {plandetails[0]?.excess}</h4>
                          <h6>Excess Amount</h6>
                        </div> */}


                  <div className="abcdsfloat" style={{ textAlign: "right", paddingTop: '10px' }}>
                    <h3>
                      {" "}
                      {isNaN(getTotalAmountDue()) ? "REFERED" : "AED " + formatAmount(getTotalAmountDue())}
                    </h3>
                    <h5>Total Amount Due</h5>
                  </div>

                  {HomeInsurance.discountvalue == true && HomeInsurance.coupon_code_data && HomeInsurance.coupon_code_data !== null && (
                    <div className="abcdsfloat" style={{ textAlign: "right", paddingTop: '10px' }}>
                      <input
                        type="text"
                        className="couponcode"
                        placeholder="Discount"
                        value={

                          "Discount           " + "AED " +
                          (() => {
                            let discountvalue = HomeInsurance.coupon_code_data;
                            if (discountvalue?.includes('%')) {
                              let percentage = discountvalue.replace(/%/g, '');
                              if (percentage?.includes('-')) {
                                percentage = percentage.split('-')[1];
                                percentage = +percentage;
                                discountvalue = getTotalAmountDue() - (getTotalAmountDue() * percentage) / 100;
                                console.log(getTotalAmountDue(), "totalAmount");
                              } else {
                                percentage = +percentage;
                                console.log(percentage, "percentage");
                                discountvalue = (getTotalAmountDue() * percentage) / 100;
                                console.log(getTotalAmountDue(), "totalAmount");
                              }
                            } else {
                              // If fixed value, subtract or add fixed value from the total amount based on sign
                              discountvalue = (+discountvalue);
                              console.log(getTotalAmountDue(), "totalAmount");
                            }
                            return formatAmount(discountvalue);
                          })()
                        }
                        disabled
                      />
                    </div>
                  )}


                </div>
                <h1 className="taxzesd">
                  Note : All prices are excluding taxes
                </h1>

                <div className="colnopadding additional mb-3">
                  <div
                    className="row form_abcd"
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignstates: "center",
                      position:'relative'
                    }}
                  >
                    <div className="col-lg-3">
                      <Form.Check
                        className="abcds_abcs"
                        type="checkbox"
                        label="Discount Code"
                        defaultChecked={HomeInsurance.discountvalue == true ? true : false}
                        onChange={(e) => {
                          handlediscountchange(e)
                        }}
                      />
                    </div>
                    {HomeInsurance.discountvalue == true ?
                      <div className="col-lg-7">
                        <input className="coupons" placeholder="Discount Code" onChange={(e) => setCouponcode(e.target.value)} defaultValue={HomeInsurance.coupon_code} /><button className="hjkbfhdb" onClick={handlecouponcode}>Apply</button>
                      </div>
                      :
                      <div className="col-lg-7">
                        <input className="coupons" placeholder="Discount Code" value={''} disabled /><button className="hjkbfhdb" disabled>Apply</button>
                      </div>
                    }
                    <OverlayTrigger
                      key="right"
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-right">
                          {hometooltip?.discountCoupon}
                        </Tooltip>
                      }
                    >
                      <i style={{top:"25px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                    </OverlayTrigger>
                  </div>

                </div>
                <div className="d-flex labelssss">
                  <Form.Check
                    className="abcds_abcs"
                    type="checkbox"
                    onChange={(e) => {
                      setTermsAndConditions(e.target.checked);
                    }}
                    checked={TermsAndConditions ? true : false}
                  />
                  <label>
                    I have read and agree to{" "}
                    <a className="termscond" onClick={handleShow}>
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3">
                <div className="row">
                  {/* <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 payments"
                    style={{ paddingLeft: "0px" }}
                  >
                    <Link
                      className="buttonactions"
                      onClick={() => navigate(-1)}
                    >
                      <i className="fa fa-chevron-left" aria-hidden="true"></i>
                      Back
                    </Link>
                  </div> */}
                  <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ paddingLeft: '0px' }}>
                    <button className='buttonactions' onClick={handleback}><i className="fa fa-chevron-left" aria-hidden="true" ></i>Back</button>
                  </div>
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 paymentsss"
                    style={{ textAlign: "right" }}
                  >
                    {/* {TermsAndConditions ? (
                      <Link
                        to={"/Homepayment"}
                        className="buttonactions"
                        onClick={handleUpdatePolicy}
                      >
                        Proceed To Payment
                      </Link>
                    ) : (
                      <a
                        style={{ cursor: "not-allowed" }}
                        className="buttonactions disabled"
                      >
                        Proceed To Payment
                      </a>
                    )} */}

                    {!TermsAndConditions ?
                      <button className='disablebtn' disabled>Proceed To Payment</button>
                      :
                      <button className='buttonactions' onClick={handleUpdatePolicy} >Proceed To Payment</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        size="md"
        centered
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Home Insurance T&C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="paragraph">
            The Participant hereby declares having provided a description of the
            risk to the best of his/her knowledge and belief that answers given
            here are true and all material information have been disclosed.
          </p>
          <p className="paragraph">
            In the event that any untrue, inaccurate, mismatching, incomplete or
            un-updated information has formed the basis of underwriting,
            issuance of this Quotation and subsequently the insurance policy,
            then insurer, at its sole discretion shall retain the full right to
            reject any claim(s) submitted under such issued policy and/or
            downgrade it to Third Party Liability (TPL) or treat the policy
            and/or any section of it as voidable.
          </p>
          <p className="paragraph">
            Your insurance coverage will not commence until the Insurers has
            indicated their acceptance of the Proposal/online order and a
            Certificate of Motor Insurance has been issued, subject to your
            payment of full premium.
          </p>
          <p className="paragraph">
            Should any issue arises out of the above, please refer to the Terms
            & Conditions of the insurer that form an integral part of this
            insurance policy and shall prevail in case of dispute.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ padding: "5px 10px" }}>
          <a className="savechanges" onClick={handleClose}>
            Ok
          </a>
        </Modal.Footer>
      </Modal> */}
      <Modal size="md" centered
        aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Home T&C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="paragraph">{
            termsconditiondata
          }</p>

        </Modal.Body>
        <Modal.Footer style={{ padding: '5px 10px' }}>
          <a className="savechanges" onClick={handleClose}>
            Ok
          </a>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default Homeselectedquotes;
