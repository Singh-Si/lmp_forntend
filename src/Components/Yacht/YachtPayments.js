/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL, forntendurl } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import swal from "sweetalert";
import { UseMotorContext } from "../../MultiStepContextApi";


const Progress = 98;
// Encode the username and password in Base64 format
const YachtPayments = () => {
  const dispatch = useDispatch();

  const { handlYachteSelectFormValue, handlYachteSelectFormValuedata } =
    UseMotorContext();

  const counter = useSelector((state) => state.YachtReducer);
  var state = counter.selectedplans;


  const [totalamount, setTotalAmount] = useState(0);
  const [temporatyamt, settemporatyamt] = useState(state?.totaldueamount)
  const [quoteData, setQuoteData] = useState([]);
  const [final_price, setFinalPrice] = useState(0);
  const [vat_pricecount, setVatPricecount] = useState(0);
  const [discount, setDiscount] = useState(counter.coupon_code_data ? counter.coupon_code_data : '0');



  let selectedids = JSON.parse(localStorage.getItem('selectedids'));
  console.log(selectedids, "selectedids")

  const LeadId = counter?.leadid;
  console.log(LeadId, "LeadId")


  useEffect(() => {
    setTotalAmount(JSON.parse(localStorage.getItem('totaldueamount')));
    setQuoteData(JSON.parse(localStorage.getItem('plandetails')));
  }, [])

  let hostname =
    window.location.hostname === "localhost"
      ? window.location.hostname + ":3000"
      : window.location.hostname;
  let host = window.location.protocol + "//" + hostname;

  const UpdatePolicy = async () => {
    try {
      await axios
        .put(`${API_URL}/api/updatePolicyDetails?id=${LeadId}`, {
          insuranceType: "Yatch",
          additionalCoverArr: selectedids,
          final_price: JSON.parse(localStorage.getItem('totaldueamount')),
          paymentStatus: "Pending",
          // location: window.location.pathname.replace("/", "")
        })
        .then((res) => {
          //console.log({ res });
        })
        .catch((error) => {
          //console.log({ error });
        });
    } catch (error) {
      ;
    }
  };


  var url =
    forntendurl +
    "/thankyou?id=" +
    counter?.leadid +
    "&lob=" +
    "Yacht" +
    "&plan_id=" +
    state?._id +
    "&lob=Yatch&plan_company_id=" +
    state?.company_id +
    "&final_price=" +
    final_price +
    "&insurancetype=Yacht"


  async function Paymentinitiated() {

    const todayDate = new Date()
    const day = todayDate.getDay()
    const holiday = [6, 7]
    let hour = todayDate.getHours();
    console.log({ hour })
    // if (holiday.includes(day)) {

    //   swal({
    //     title: "Warning!",
    //     text: "today is holiday",
    //     type: "warning",
    //     icon: "warning",
    //   })
    // } else if (hour < 10 || hour >= 19) {
    //   swal({
    //     title: "Warning!",
    //     text: "please contact on 10 to 7pm(is working hours",
    //     type: "warning",
    //     icon: "warning",
    //   })
    // } else {

      let data = {
        apiOperation: "INITIATE_CHECKOUT",
        interaction: {
          merchant: {
            name: "Last Minute Policy",
            url: "http://localhost:3000",
            logo: "https://lmpfrontend.handsintechnology.in/static/media/logo.55d872f39191272d5983.png",
          },
          displayControl: {
            billingAddress: "MANDATORY",
            customerEmail: "MANDATORY",
          },
          timeout: 1800,
          timeoutUrl: url + "&status=Pending",
          cancelUrl: forntendurl + window.location.pathname,
          returnUrl: url + "&status=Completed",
          operation: "PURCHASE",
          style: {
            accentColor: "#30CBE3",
          },
        },

        order: {
          amount: final_price,
          currency: "AED",
          description: "Plan Name: " + state?.plan_name,
          id: counter?.leadid,
        },
        customer: {
          email: counter?.email,
        },
      };
      await axios.post(API_URL + "/api/payGateway", data).then((response) => {
        window.Checkout.configure({
          session: {
            id: response.data.data.session.id,
          },
        });
        window.Checkout.showPaymentPage();
      });
    // }
  }

  useEffect(() => {
    calculateTotal();
    UpdatePolicy()
  }, [quoteData])

  useEffect(() => {
    handlefinalsubmit()
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> i am useEEffect")
  }, [vat_pricecount, final_price, discount])

  const calculateTotal = () => {

    let totalAmount = 0;
    let totalAmount1 = 0;
    let totalAmount2 = 0;
    let totalAmount3 = 0;

    let vatcommission = quoteData?.map((data) => data?.vatComissionPercentage)[0];
    console.log(vatcommission, "vatcommission")
    let finaltopup = 0
    let notopup = 0


    quoteData?.forEach((item) => {
      item?.add_op_con_desc_or_topup?.forEach((item1) => {
        console.log(item1)
        let topup = 0
        let notop = 0


        // finalpriceamount 
        if (item1.vat.toLowerCase() === "yes") {
          console.log("add_op_con_desc_topup", item1.add_op_con_desc_topup)

          if (item1.add_op_con_desc_topup?.includes('%')) {
            console.log(totalamount)
            let percentage = item1.add_op_con_desc_topup.replace(/%/g, '');
            if (percentage?.includes('-')) {
              percentage = percentage.split('-')[1];
              percentage = +percentage;
              topup = +totalamount - (totalamount * percentage) / 100;
              console.log(totalAmount, "totalAmount")

            } else {
              percentage = +percentage;
              console.log(percentage, "percentage")
              topup = (totalamount * percentage) / 100;
              console.log(totalAmount, "totalAmount")
            }
          } else {
            // If fixed value, subtract or add fixed value from the total amount based on sign
            topup = (+item1.add_op_con_desc_topup)
            console.log(totalAmount, "totalAmount")
          }
        }
        finaltopup = finaltopup + topup;
        console.log("topup,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,", topup)

        if (item1.vat.toLowerCase() === "no") {
          // if (item1?.vat) {

          console.log(item1.add_op_con_desc_topup)

          if (item1.add_op_con_desc_topup.includes('%')) {
            console.log(totalamount)
            let percentage = item1.add_op_con_desc_topup?.replace(/%/g, '');
            if (percentage?.includes('-')) {
              percentage = percentage.split('-')[1];
              percentage = +percentage;
              notop = +totalamount - (totalamount * percentage) / 100;
              console.log(totalAmount, "totalAmount")

            } else {
              percentage = +percentage;
              console.log(percentage, "percentage")
              notop = (totalamount * percentage) / 100;
              console.log(totalAmount, "totalAmount")
            }
          } else {
            // If fixed value, subtract or add fixed value from the total amount based on sign
            notop = (+item1.add_op_con_desc_topup)
            console.log(totalAmount, "totalAmount")
          }
        }
        notopup = notopup + notop
      }
      );
    }
    );
    // const totalfee = totalAmount1 + totalAmount2 + totalAmount3;
    let discountvalue = discount;
    if (discountvalue?.includes('%')) {
      let percentage = discount.replace(/%/g, '');
      if (percentage?.includes('-')) {
        percentage = percentage.split('-')[1];
        percentage = +percentage;
        discountvalue = +totalamount - (totalamount * percentage) / 100;
        console.log(totalAmount, "totalAmount")
      } else {
        percentage = +percentage;
        console.log(percentage, "percentage")
        discountvalue = (totalamount * percentage) / 100;
        console.log(totalAmount, "totalAmount")
      }
    } else {
      // If fixed value, subtract or add fixed value from the total amount based on sign
      discountvalue = (+discountvalue)
      console.log(totalAmount, "totalAmount")
    }


    const vatprice = ((totalamount + finaltopup) * vatcommission) / 100;

    const finalpriceamount = totalamount + finaltopup + notopup + vatprice - discountvalue;

    console.log(totalamount, "totalamount")
    // console.log(totalfee,"totalfee")
    console.log(vatprice, "vatprice")
    console.log(finalpriceamount, "finalpriceamount")


    setVatPricecount(Number(vatprice).toFixed(2));
    setFinalPrice(Number(finalpriceamount).toFixed(2));
    handlYachteSelectFormValue("final_price", Number(finalpriceamount).toFixed(2))

  };


  const handleback = () => {
    // window.history.back();
    localStorage.removeItem('selectedids');
    localStorage.removeItem('selectedValues');
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


  const handlefinalsubmit = async () => {
    try {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> i am handlefinalsubmit")

      let add_desc_con = quoteData[0]?.add_op_con_desc_or_topup


      let add_desc_amt = [];

      for (let i = 0; i < add_desc_con.length; i++) {
        let amount;
        let topupValue = add_desc_con[i]?.add_op_con_desc_topup;
        let finalBasePremium = totalamount;
        console.log("finalBasePremium", finalBasePremium)

        if (topupValue.includes('%')) {
          let rate = parseFloat(topupValue);
          if (topupValue.includes("-")) {
            rate = -rate;
          }
          amount = finalBasePremium * rate / 100;
        } else {
          amount = parseFloat(topupValue);
        }

        add_desc_amt.push({ ...add_desc_con[i], amount: amount });
      }

      console.log("add_desc_amt", add_desc_amt)
      console.log("vat_pricecount", vat_pricecount)
      console.log("final_price", final_price)

      await axios.post(API_URL + `/api/updateLeadById?leadId=${counter?.leadid || counter.oldleadid}`, {
        // "id": v._id,
        // "company_id": v.company_id,
        "add_desc_data": add_desc_amt,
        "vat_pricecount": +vat_pricecount,
        "final_price": +final_price,


        // "lead_id": motorFormsData.leadid || motorFormsData.oldleadid,
      }).then((response) => {
        console.log("response>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response)
      }).catch((error) => {
        console.log("error", error)
      })
    } catch (error) {
      console.log("error", error)
    }

  }

  console.log(quoteData, "quoteData")

  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-4">
                  <div className="pay_Details1">
                    <div className="row" style={{ alignItems: "center" }}>
                      <div className="col-lg-5 col-sm-6 col-md-12 col-xs-12 mb-4">
                        {state?.companies &&
                          state?.companies?.map((item) => (
                            item?.company_logo.map((company) => {
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
                      <div className="col-lg-7 col-sm-6 col-md-12 col-xs-12 mb-4">
                        <p> {state?.plan_name} </p>
                      </div>
                      <hr />
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Total Premium</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: "right" }}>
                          AED {formatAmount(totalamount)}
                        </h6>
                      </div>

                      {quoteData?.map((item, index) => (
                        (item?.add_op_con_desc_or_topup?.map((item1, index) => (
                          item1?.vat && (
                            (
                              <>
                                <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                                  <h6>{item1.add_op_con_desc}</h6>
                                </div>
                                <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                                  <h6 style={{ textAlign: 'right' }}>AED {item1.add_op_con_desc_topup?.includes('%') ? formatAmount((totalamount * item1.add_op_con_desc_topup.replace(/%/g, '')) / 100) : formatAmount(item1.add_op_con_desc_topup)}</h6>

                                </div>
                              </>
                            ))
                        ))
                        )
                      ))}

                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>VAT</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: "right" }}>
                          AED  {formatAmount(vat_pricecount)}
                        </h6>
                      </div>

                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Discount</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: "right" }}>
                          {
                            discount &&
                              discount?.includes('%') && discount != null ?
                              "AED" + " " + "-" +
                              (
                                discount?.includes('-') ?
                                  -1 * (totalamount * parseFloat(discount.replace(/%/g, '').split('-')[1]) / 100) :
                                  (totalamount * parseFloat(discount.replace(/%/g, '')) / 100)
                              )
                              :

                              discount !== 0 && discount !== null ? "AED" + " " + "-" + discount : 0
                          }
                        </h6>
                      </div>
                      <hr />
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Total Amount</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6
                          style={{
                            textAlign: "right",
                            fontWeight: "600",
                            fontSize: "23px",
                            color: "#D91818",
                          }}
                        >
                          AED {formatAmount(final_price)}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="pay_Details">
                    <img
                      style={{ marginBottom: "20px", width: "110px" }}
                      alt="Visa"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Visa_Electron.svg/1200px-Visa_Electron.svg.png"
                    />
                    <p>
                      Please click the button below and follow the instructions
                      provided to complete your AED{" "}
                      <span style={{ color: "#ed1c25", marginRight: "5px" }}>
                        <b>{formatAmount(final_price)}</b>
                      </span>
                      payment.
                    </p>
                    <p>
                      <b style={{ color: "#ed2a30" }}>Or</b>
                    </p>
                    <p>You can pay in our bank account mentioned below.</p>
                    <p>
                      Abu Dhabi Commercial Bank, P.O. Box 118385, Dubai, UAE
                      JOIE de VIVRE INTL INSURANCE BROKERAGE LLC
                    </p>
                    <p>744598020002</p>
                    <p>Swift Code : ADCBAEAA</p>
                    <p>IBAN: AE880030000744598020002</p>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link
                        to={"/YachtSelectedquotes"}
                        // onClick={() => navigate(-1)}

                        className="buttonactions1"
                      >
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <a onClick={Paymentinitiated} className="buttonactions1">
                        Pay Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default YachtPayments;
