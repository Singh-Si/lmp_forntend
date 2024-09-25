/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../Image/logo.png";
import { getCardetailsByLeadid } from "../../functions";
import swal from "sweetalert";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useNavigate } from "react-router-dom";
import admin from "../../config";
import { API_URL } from "../..";
import Homebanner from "../Banner/Homebanner";
// Replace 'username' and 'password' with your actual credentials
// const username = "merchant.TEST120810000062";
// const password = "e9c1b8c7254e8be8c7a41d71d898f43a";
// Encode the username and password in Base64 format
const Payments = () => {
  const { HomeInsurance, setHomeInsurance } = UseMotorContext();

  const location = useLocation();
  // const { state } = location;
  const [Loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState([]);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const [totalamount, setTotalAmount] = useState(0);
  const [final_price, setFinalPrice] = useState(0);
  const [vat_pricecount, setVatPricecount] = useState(0);
  const [discount, setDiscount] = useState(HomeInsurance.coupon_code_data != null || HomeInsurance.coupon_code_data != "" ? HomeInsurance.coupon_code_data : '0');


  let selectedids = JSON.parse(localStorage.getItem('selectedids'));
  console.log(selectedids, "selectedids")

  const navigate = useNavigate();

  const LeadId = HomeInsurance?.leadid;
  console.log(LeadId, "LeadId")
  useEffect(() => {
    const storedData = localStorage.getItem("HomeInsurance");
    if (storedData) {
      setHomeInsurance(JSON.parse(storedData));
      setUpdatePolicyId(HomeInsurance.updatePolicy_id);
    }
  }, []);
  
  useEffect(() => {
    handlefinalsubmit()
  }
  , [quoteData, vat_pricecount, final_price, discount])


  useEffect(() => {
    const storedData = localStorage.getItem("HomeInsurance");
    if (storedData) {
      setHomeInsurance(JSON.parse(storedData));
      // setQuoteData([JSON.parse(storedData).selected]);
    }
    setTotalAmount(JSON.parse(localStorage.getItem('totaldueamount')));
    setQuoteData(JSON.parse(localStorage.getItem('plandetails')));
  }, []);


  useEffect(() => {
    calculateTotal();
  }, [quoteData])

  



  const UpdatePolicy = async () => {
    try {

      if (HomeInsurance.lead_id !== null && HomeInsurance.user === 'customer') {
        await axios
          .put(API_URL + '/api/updatePolicyDetails?id=' + HomeInsurance.leadid, {
            insuranceType: "Home",
            additionalCoverArr: selectedids,
            final_price: final_price,
            // location: window.location.pathname.replace("/", "")
          })
          .then((result) => {
            if (result.status == 200) {

              localStorage.setItem('leaddetails', JSON.stringify(result.data._id))
              // setUpdate(false);

            } else {
              swal('Error', 'Error in Adding Family Details', 'error')
            }
          })
          .catch((error) => {
            if (error && error.response.status) {
              swal('Error', error.reponse.data.message, 'error')
              return error.response.status
            }
          })
      } else if (HomeInsurance.user === 'BE') {
        fetch(API_URL + '/api/fillInsurancePlan?email=' + HomeInsurance.email, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            insuranceType: "Home",
            additionalCoverArr: selectedids,
            final_price: final_price,
            businessentitytoken: HomeInsurance?.businessentitytoken,
          }),
        })
          .then((response) => response.json())
          .then((responseData) => {
            // Handle the API response if needed
            localStorage.setItem('leaddetails', JSON.stringify(responseData.data._id))
            // setUpdate(false);

          })
          .catch((error) => {
            if (error && error.reponse.data.message) {
              swal('Error', error.reponse.data.message, 'error')
            }

            // Handle any error that occurred during the API request
            //console.error('Error making POST API request:', error)
          })
      } else {
        fetch(API_URL + '/api/fillInsurancePlan?email=' + HomeInsurance.email, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            insuranceType: "Home",
            additionalCoverArr: selectedids,
            final_price: final_price,
            location: window.location.pathname.replace("/", ""),
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            //console.log('Success:', result)
            if (result.status == 200) {

              localStorage.setItem('leaddetails', JSON.stringify(result.data._id))
              // setUpdate(false);
            } else {
              swal('Error', 'Error in Adding Family Details', 'error')
            }
          })
          .catch((error) => {
            //console.error('Error:', error)
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  let hostname =
    window.location.hostname === "localhost"
      ? window.location.hostname + ":3000"
      : window.location.hostname;
  let host = window.location.protocol + "//" + hostname;

  async function Paymentinitiated() {

    UpdatePolicy()


    let orderid = "OD" + Date.now();
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
        timeoutUrl:
          host +
          "/thankyou?id=" +
          HomeInsurance?.updatePolicy_id +
          "&plan_id=" +
          HomeInsurance?.selected._id +
          "&plan_company_id=" +
          HomeInsurance?.company_id +
          "&final_price=" +
          HomeInsurance?.final_price +
          "&status=Pending",
        cancelUrl:
          host +
          "/thankyou?id=" +
          HomeInsurance?.updatePolicy_id +
          "&plan_id=" +
          HomeInsurance?.selected._id +
          "&plan_company_id=" +
          HomeInsurance?.company_id +
          "&final_price=" +
          HomeInsurance?.final_price +
          "&status=Cancelled",
        returnUrl:
          host +
          "/thankyou?id=" +
          HomeInsurance?.updatePolicy_id +
          "&lob=" +
          "Home" +
          "&plan_id=" +
          HomeInsurance?.selected._id +
          "&plan_company_id=" +
          HomeInsurance?.company_id +
          "&final_price=" +
          final_price +
          "&status=Completed",

        operation: "PURCHASE",
        style: {
          accentColor: "#30CBE3",
        },
      },
      order: {
        amount: HomeInsurance.final_price,
        currency: "AED",
        description: "Plan Name: " + HomeInsurance.selected.plan_name,
        id: orderid,
      },
      customer: {
        email: HomeInsurance.email,
        phone: HomeInsurance.phone_number,
      },
    };
    await axios
      .post(API_URL + "/api/payGateway", data)
      .then((response) => {
        window.Checkout.configure({
          session: {
            id: response.data.data.session.id,
          },
        });
        window.Checkout.showPaymentPage();
      });
  }

  console.log(quoteData, "quoteDataquoteDataquoteDataquoteDataquoteData")

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
      discountvalue = (+discountvalue || 0)
      console.log(totalAmount, "totalAmount")
    }


    const vatprice = ((totalamount + finaltopup) * vatcommission) / 100;

    console.log(totalamount, "totalamount")
    console.log(vatprice, "vatprice")
    console.log(finaltopup, "finaltopup")
    console.log(notopup, "notopup")
    console.log(discountvalue, "discountvalue")


    const finalpriceamount = totalamount + finaltopup + notopup + vatprice - discountvalue;

    console.log(totalAmount1, "totalAmount1")
    console.log(totalAmount2, "totalAmount2")
    console.log(totalAmount3, "totalAmount3")
    console.log(totalamount, "totalamount")
    // console.log(totalfee,"totalfee")
    console.log(vatprice, "vatprice")
    console.log(finalpriceamount, "finalpriceamount")


    console.log(finalpriceamount, "finalpriceamount")
    setVatPricecount(Number(vatprice).toFixed(2));
    setFinalPrice(Number(finalpriceamount).toFixed(2));
    setHomeInsurance({ ...HomeInsurance, final_price: Number(finalpriceamount).toFixed(2) });

  };


  const handlefinalsubmit = async() => {
    try{
    let add_desc_con = quoteData[0]?.add_op_con_desc_or_topup

    let add_desc_amt = [];
    
    for (let i = 0; i < add_desc_con.length; i++) {
      let amount;
      let topupValue = add_desc_con[i]?.add_op_con_desc_topup;
      let finalBasePremium = totalamount;
      
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

    await axios.post(API_URL + `/api/updateLeadById?leadId=${HomeInsurance?.leadid || HomeInsurance.oldleadid}`, {
      "add_desc_data": add_desc_amt,
      "vat_pricecount": +vat_pricecount,
      "final_price": +final_price,
     
    }).then((response) => {
      console.log("response", response)
    }).catch((error) => {
      console.log("error", error)
    })
  }catch(error){
    console.log("error", error)
  }

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




  const handleback = () => {
    window.history.back();
    localStorage.removeItem('selectedids');
    localStorage.removeItem('selectedValues');

  }

  return (
    <div>
      <Header />
      <Homebanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-4">
                  <div className="pay_Details1">
                    <div className="row" style={{ alignItems: "center" }}>
                      <div className="col-lg-5 col-sm-6 col-md-12 col-xs-12 mb-4">
                        {quoteData &&
                          quoteData.map((quote) =>
                            quote.companyDetails &&
                              quote.companyDetails.company_logo
                              ? quote.companyDetails.company_logo.map((val) => (
                                <img
                                  key={val._id}
                                  alt={val.fieldname}
                                  src={`${API_URL}/uploads/${val.filename}`}
                                  style={{ width: "100%" }}
                                />
                              ))
                              : null
                          )}
                      </div>
                      <div className="col-lg-7 col-sm-6 col-md-12 col-xs-12 mb-4">
                        <p> {quoteData.map((data) => data.plan_name)} </p>
                      </div>
                      <hr />
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Total Premium</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: "right" }}>AED {formatAmount(totalamount)}</h6>
                      </div>
                      {quoteData?.map((item, index) => (
                        (item?.add_op_con_desc_or_topup?.map((item1, index) => (
                          item1.vat.toLowerCase() && (
                            (
                              <>
                                <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                                  <h6>{item1.add_op_con_desc}</h6>
                                </div>
                                <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                                  <h6 style={{ textAlign: 'right' }}>AED {item1.add_op_con_desc_topup.includes('%') ? formatAmount((totalamount * item1.add_op_con_desc_topup.replace(/%/g, '')) / 100) : formatAmount(item1.add_op_con_desc_topup)}</h6>

                                </div>
                              </>
                            ))
                        ))
                        )
                      ))}
                      <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                        <h6>VAT</h6>
                      </div>
                      <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                        <h6 style={{ textAlign: 'right' }}>AED {formatAmount(vat_pricecount)}</h6>
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

                              discount != 0 && discount != null  ? "AED" + " " + "-" + discount : 0
                          }
                        </h6>
                      </div>
                      <hr />
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Total Amount</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: 'right', fontWeight: '400', fontSize: '28px', color: '#D91818' }}>AED {formatAmount(final_price)}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="pay_Details">
                    <img
                      style={{ marginBottom: "20px", width: "110px" }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Visa_Electron.svg/1200px-Visa_Electron.svg.png"
                    />
                    <p>
                      Please click the button below and follow the instructions
                      provided to complete your AED {final_price} payment.
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
                    {/* <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link
                        onClick={() => navigate(-1)}
                        state={{ ...state }}
                        className="buttonactions1"
                      >
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div> */}
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                      <button className='buttonactions' onClick={handleback}><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</button>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right", cursor: "pointer" }}
                    >
                      <button onClick={Paymentinitiated} className="buttonactions">
                        Pay Now
                      <i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </button>
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

export default Payments;
