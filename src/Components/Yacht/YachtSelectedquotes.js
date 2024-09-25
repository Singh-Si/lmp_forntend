
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import finance from "../../Image/finance.svg";
import { Button, InputGroup, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Yachtfilter from "./Yachtfilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { UseMotorContext } from "../../MultiStepContextApi";
import { API_URL } from "../..";
import { UpdatePolicy } from "../../functions";
import axios from "axios";
import { AddYacht, AddSelectedPlans } from "../../redux/reducers/YachtDataReducerSlice";
import Homeinsurance from "../Home/Homeinsurance";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const YachtSelectedquotes = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [plandetails, setplandetails] = useState([]);


  ////console.log(returnTo, "check the prev route")
  const { handlYachteSelectFormValue, handlYachteSelectFormValuedata, yachttooltip } = UseMotorContext();
  const counter = useSelector((state) => state.YachtReducer);
  var state = counter.selectedplans

  useEffect(() => {
    if (counter) {
      setplandetails([counter.selectedplans])
    }
  }, [counter.selectedplans])


  console.log("plandetails", plandetails)


  // eslint-disable-next-line no-unused-vars
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 6);
  const [TermsAndConditions, setTermsAndConditions] = useState(false);
  const [Mortgage, setMortgage] = useState(false);
  const [TotalAmount, setTotalAmount] = useState(state?.finallBasePremium);
  const [showMore, setShowMore] = useState(true);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedids, setSelectedids] = useState([]);
  const [couponcode, setCouponcode] = useState("");
  const [discount, setDiscount] = useState(null);
  const [selectedadditionals, setSelectedadditionals] = useState([]);

  const [termscondition, setTermscondition] = useState([]);
  useEffect(() => {
    gettermscondition();
  }, [])
  const gettermscondition = () => {
    var requestOptions = {
      method: 'GET',
    };
    fetch(`${API_URL}/api/termsAndCondition?insuranceType=Yatch`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTermscondition(result.data.terms_constions);
        //console.log(result.data);
      })
      .catch(error => console.log('error', error));
  };


  console.log(termscondition, "termscondition")

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const handleClose = () => {
    setTermsAndConditions(true)
    setShow(false)
  };

  const handleShow = () => setShow(true);
  const handleDateChange = (date) => {
    handlYachteSelectFormValue("policy_issued_date", date)
  }
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    const value = JSON.parse(e.target.value);

    console.log("value", value)
    console.log("checked", checked)

    if (checked) {
      setSelectedadditionals([...selectedadditionals, value]);
      setSelectedValues([...selectedValues, value.additional_cover_label]);
      setSelectedids([...selectedids, value.additional_cover_id]);

    } else {
      setSelectedadditionals(selectedadditionals.filter((item) => item !== value));
      setSelectedValues(selectedValues.filter((item) => item !== value.additional_cover_label));
      setSelectedids(selectedids.filter((item) => item !== value.additional_cover_id));

    }
  };

  const getTotalAmountDue = () => {
    let totalamount
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", plandetails.map((item) => item?.finallBasePremium))
    totalamount = plandetails.map((item) => item?.finallBasePremium).reduce((prev, next) => prev + next, 0);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", totalamount)
    let newamount1 = 0;
    let newamount2 = 0;
    let newamount3 = 0;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", plandetails)


    // Loop through selectedValues and add or subtract corresponding additional_cover_value
    selectedValues.forEach((selectedValue) => {
      plandetails.forEach((item) => {
        if (item?.additional_cover_arr) {
          const selectedCover = item.additional_cover_arr.find(
            (label) => label.additional_cover_label === selectedValue
          );
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", selectedCover)

          if (selectedCover) {
            const coverValue = parseFloat(selectedCover.additional_cover_value);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", coverValue)
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

    const totalAmount = totalamount + newamount1 + newamount2 + newamount3;

    return totalAmount;
  };




  useEffect(() => {
    setTotalAmount(getTotalAmountDue());
    handlYachteSelectFormValue("selectedValues", selectedValues)
  }, [selectedValues]);
  ////console.log("selectedValues", selectedValues)

  const totaldueamount = getTotalAmountDue();
  const company_id = plandetails.map((item) => item.companyData?.map((company) => company._id).toString());
  const plan_id = plandetails.map((item) => item._id).toString();

  useEffect(() => {

    // handlYachteSelectFormValuedata()
    // dispatch(AddSelectedPlans({ ...state, totaldueamount: TotalAmount }))
    UpdatePolicy(
      counter?.leadid,
      state?.company_id,
      state?._id,
      TotalAmount,
      "Pending"
    );

    localStorage.setItem("totaldueamount", JSON.stringify(+totaldueamount));
    localStorage.setItem("plandetails", JSON.stringify(plandetails,));
    localStorage.setItem("selectedValues", JSON.stringify(selectedValues));
    localStorage.setItem("selectedids", JSON.stringify(selectedids));
  }, [TotalAmount]);


  const isWeekday = (date) => {
    const curr = new Date(date);
    const day = curr.getDay();
    return day !== 0 && day !== 6;
  };

  const handlePayment = async () => {
    try {


      let additionalamount = []
      for (let i = 0; i < selectedadditionals.length; i++) {
        console.log("........................kkkkkkkkkkkkkkkkkkkkkkm xmc vmm c")
        let amount
        let topupVaule = selectedadditionals[i]?.additional_cover_value
        let finallBasePremium = state.finallBasePremium
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

      console.log("additionalamount")
      console.log("selectedadditionals", selectedadditionals);

      let discountvalue = counter?.coupon_code_data
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



      await axios.post(API_URL + `/api/updateLeadById?leadId=${counter.leadid || counter.oldleadid}`, {
        "plan_id": state._id,
        "plan_company_id": state.company_id,
        "additionalPrimium": +getTotalAmountDue(),
        "discountAmount": +discountvalue,
        "termsConditionStatus": TermsAndConditions,
        "additionalCover": additionalamount,
        'yatchRate': state?.yatchRate,
        "policy_issued_date": counter?.policy_issued_date || new Date(),

        // "lead_id": motorFormsData.leadid || motorFormsData.oldleadid,
      }).then((response) => {
        console.log("response", response)
      }).catch((error) => {
        console.log("error", error)
      })
    } catch (error) {
      console.log("error", error)
    }
  };

  console.log("state", state)

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

  const handlecouponcode = async () => {
    try {
      if (couponcode === '') {
        swal({
          text: "Please Enter Valid Coupon Code",
          icon: "warning",
        })
        return false;
      }
      else {
        handlYachteSelectFormValue("coupon_code", couponcode)
        handlYachteSelectFormValue("discountvalue", discount)
        await axios.post(`${API_URL}/api/getDiscountCoupon`, {
          code: couponcode,
          lob: 'Yatch'
        }).then((response) => {
          console.log(response, "check the response")
          if (response?.data?.status === 200) {
            handlYachteSelectFormValue("coupon_code_data", response?.data?.data)
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

  const handleback = () => {
    handlYachteSelectFormValue("discountvalue", null)
    handlYachteSelectFormValue("coupon_code", "")
    handlYachteSelectFormValue("coupon_code_data", null)
  }

  console.log("yachttooltip", yachttooltip)


  return (
    <div>
      <Header />
      {/* <Homebanner /> */}
      <div className="Selectedinfo">
        <div className="container Quotes_info1212 pt-4 pb-4">
          <div className="row quotes_all">
            <Yachtfilter />
            <div
              className="col-lg-8 col-md-12 col-sm-12 col-xs-12"
            >
              <p className="mb-3 paragra">
                Selected Yacht insurance quotes for your {counter.model_year}  valued at <span style={{ color: '#003399', fontWeight: 'bold' }}>{!state?.finallBasePremium
                  ? "REFERED"
                  : "AED " + state?.finallBasePremium}</span>
              </p>
              <div className="scroll_abcds123">
                <div className="quotes_inner">
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
                      {state?.companies &&
                        state?.companies.map((item) => (
                          item.company_logo.map((company) => {
                            return (
                              <img
                                // key={company?._id}
                                src={`${API_URL}/${company?.destination}/${company?.filename}`}
                                alt="company_logo"
                              />
                            );
                          })
                        ))}
                    </div>
                    <div className="col-lg-6 quotemobile">
                      <h4>{state?.plan_name} </h4>
                      <ul className="benefits">
                        {state?.additional_cover_arr &&
                          state?.additional_cover_arr.length > 0 ? (
                          state?.additional_cover_arr.map((cover) => {
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
                    <div className="col-lg-3 action_abcd">
                      <h2>
                        {!state?.finallBasePremium
                          ? "REFERED"
                          : "AED " + state?.finallBasePremium}
                      </h2>
                    </div>
                  </div>
                  {showMore ? (
                    <div className="rowabcds">
                      <div className="row">
                        <div className="col-lg-6 abc">
                          <img
                            style={{ width: "auto", marginRight: "15px" }}
                            src={tick}
                          />
                          <span className="abcds_aud">What is Covered.</span>
                          <ul className="description">
                            {state?.standard_cover_arr &&
                              state?.standard_cover_arr.length > 0 ? (
                              state.standard_cover_arr.map((cover) => {
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
                            style={{ width: "auto", marginRight: "15px" }}
                            src={cross}
                          />
                          <span className="abcds_aud">
                            What is not Covered.
                          </span>
                          <ul className="description">
                            {state?.notCoveredData &&
                              state?.notCoveredData.length > 0 ? (
                              state?.notCoveredData.map((cover) => {
                                return <li>{cover?.standard_cover_label}</li>;
                              })
                            ) : (
                              <></>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="row">
                        <button
                          className="showadd_details"
                          onClick={toggleShowMore}
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
                          onClick={toggleShowMore}
                        >
                          See Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="colnopadding additional mb-3">
                <div
                  className="row form_abcd"
                  style={{ justifyContent: "initial" }}
                >
                  {state?.additional_cover_arr &&
                    state?.additional_cover_arr.length > 0 && (
                      <p className="mb-2">Additional Cover</p>
                    )}

                  {state?.additional_cover_arr &&
                    state?.additional_cover_arr.length > 0 ? (
                    state.additional_cover_arr.map((cover) => {
                      return (
                        <>
                          <div className="col-lg-12">
                            <Form.Check
                              // style={{
                              //   display: "inline-flex",
                              //   alignItems: "center",
                              // }}
                              onClick={handleCheckboxChange}
                              className="abcds_abcs "
                              value={JSON.stringify(cover)}
                              type="checkbox"
                              name="additional_id"
                              label={
                                cover.additional_cover_label + " " +
                                (
                                  cover.additional_cover_value !== "" &&
                                    cover.additional_cover_value?.includes('%') ?
                                    "(" + "AED" + " " +
                                    (
                                      cover.additional_cover_value?.includes('-') ?
                                        -1 * (state.finallBasePremium * parseFloat(cover.additional_cover_value.replace(/%/g, '').split('-')[1]) / 100) :
                                        (state.finallBasePremium * parseFloat(cover.additional_cover_value.replace(/%/g, '')) / 100)
                                    )
                                    + ")"
                                    :
                                    cover.additional_cover_value != 0 ? "(" + "AED" + " " + cover.additional_cover_value + ")" : "(" + "free" + ")" || "free"
                                )

                              }
                            // checked={state && state.selectedValues && state.selectedValues.includes(
                            //   cover?.additional_cover_id
                            // )}
                            />
                            {/* <span
                              className="add_valuess"
                              style={{ color: "#003399", fontWeight: "bold" }}
                            >
                              <React.Fragment>
                                AED {cover?.additional_cover_value.includes('%')
                                  ? (parseInt(state?.finallBasePremium, 10) * parseFloat(cover.additional_cover_value.replace('%', '')) / 100).toFixed(2)
                                  : cover?.additional_cover_value == "0" ? "0" : cover?.additional_cover_value}
                              </React.Fragment>                            </span> */}
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <></>
                  )}
                  <div className="col-lg-12 nopadding">
                    <div className="row form_abcd">
                      <div className="col-lg-6">
                        <h4>Mortgage</h4>
                      </div>
                      <div className="col-lg-6">
                        <div className="d-flex justify-space-between">
                          <Form.Check className="mortageee"
                            type="radio"
                            name="Mortgage"
                            label="Yes"
                            checked={Mortgage === true}
                            onChange={() => setMortgage(true)}
                          />
                          <Form.Check
                            type="radio" className="mortageee"
                            name="Mortgage"
                            label="No"
                            checked={Mortgage === false}
                            onChange={() => {
                              setMortgage(false);
                              handlYachteSelectFormValue("BankName", null);
                            }}
                          />
                        </div>
                      </div>
                      {Mortgage && (
                        <div className="col-lg-12">
                          <InputGroup className="mb-4">
                            <Form.Control
                              value={counter?.BankName}
                              className="bankbank"
                              onChange={(e) =>
                                handlYachteSelectFormValue(
                                  "BankName",
                                  e.target.value
                                )
                              }
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
                            selected={new Date(counter?.policy_issued_date ? counter.policy_issued_date : today)}
                            onChange={(date) => handleDateChange(date)}
                            // filterDate={isWeekday}
                            dateFormat="dd/MM/yyyy"
                            minDate={today}
                            maxDate={sevenDaysLater}
                            onKeyDown={(e) => e.preventDefault()}
                          />
                        </InputGroup>

                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {yachttooltip?.policyStartDate}
                            </Tooltip>
                          }
                        >
                          <i style={{ top: '15px' }} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>

                  {state?.excessAmount ?

                    <div className="manageexcess" style={{ textAlign: "right", paddingTop: '20px' }}>
                      <h4 style={{ color: '#ED1C24', fontWeight: 'bold' }}>AED {state?.excessAmount}</h4>
                      <h6>Excess Amount</h6>
                    </div>
                    :
                    ""
                  }


                  <div className="abcdsfloat" style={{ textAlign: "right", paddingTop: '20px' }}>
                    <h3>
                      {" "}
                      {isNaN(getTotalAmountDue()) ? "REFERED" : "AED " + formatAmount(getTotalAmountDue())}

                    </h3>
                    <h5>Total Amount Due</h5>
                  </div>

                  {counter.discountvalue == true && counter.coupon_code_data && counter.coupon_code_data !== null && (
                    <div className="abcdsfloat" style={{ textAlign: "right", paddingTop: '10px' }}>
                      <input
                        type="text"
                        className="couponcode"
                        placeholder="Discount"
                        value={

                          "Discount           " + "AED " +
                          (() => {
                            let discountvalue = counter.coupon_code_data;
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
                      alignItems: "center",
                    }}
                  >
                    <div className="col-lg-3">
                      <Form.Check
                        className="abcds_abcs"
                        type="checkbox"
                        label="Discount Code"
                        defaultChecked={counter.discountvalue == true ? true : false}
                        onChange={(e) => {
                          setDiscount(e.target.checked);
                          handlYachteSelectFormValue("discountvalue", e.target.checked)
                          if (e.target.checked == false) {
                            setCouponcode("")
                            handlYachteSelectFormValue("coupon_code", "")
                            handlYachteSelectFormValue("coupon_code_data", null)
                          }
                        }}
                      />
                    </div>
                    {counter.discountvalue == true ?
                      <div className="col-lg-7">
                        <input className="coupons" placeholder="Discount Code" onChange={(e) => setCouponcode(e.target.value)} defaultValue={counter.coupon_code} /><button className="hjkbfhdb" onClick={handlecouponcode}>Apply</button>
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
                        {yachttooltip?.discountCoupon}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                  </OverlayTrigger>
                  </div>
                </div>
                <div className="d-flex labelssss">
                  {/* <Form.Check
                    className="abcds_abcs"
                    type="checkbox"
                    onChange={(e) => {
                      setTermsAndConditions(e.target.checked);
                    }}
                    checked={TermsAndConditions ? true : false}
                  />

                  <label>I have read and agree to <a className="termscond" onClick={handleShow}>Terms and Conditions</a></label> */}
                  <Form.Check className='abcds_abcs' type="checkbox" onClick={(e) => setTermsAndConditions(e.target.checked)} /><label>I have read and agree to <a className="termscond" onClick={handleShow}>Terms and Conditions</a></label>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3">
                <div className="row">
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 payments"
                    style={{ paddingLeft: "0px" }}
                    onClick={handleback}
                  >
                    <Link to={counter.location || "/Quotes"} className="buttonactions">
                      <i className="fa fa-chevron-left" aria-hidden="true"></i>Back
                    </Link>
                  </div>
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 paymentsss"
                    style={{ textAlign: "right", paddingRight: "0px" }}
                  >
                    {TermsAndConditions ? (
                      <Link

                        to={"/YachtPayments"}
                        state={{ ...state, totaldueamount: TotalAmount }}
                        className="buttonactions"
                        onClick={handlePayment}
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Comparelist /> */}
        </div>
      </div>
      <Modal size="md" centered
        aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yacht T&C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="paragraph">{
            termscondition
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

export default YachtSelectedquotes;