import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import finance from '../../Image/finance.svg'
import Innerbanner from '../Banner/Innerbanner'
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import { API_URL } from '../..';
import Travelbanner from '../Banner/Travelbanner';
import { UseMotorContext } from '../../MultiStepContextApi';
const TravelPayments = () => {
  const { travelsFormsData, setravelsFormsData } = UseMotorContext();



  const [totalamount, setTotalAmount] = useState(0);
  const [final_price, setFinalPrice] = useState(0);
  const [vat_pricecount, setVatPricecount] = useState(0);
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(travelsFormsData.coupon_code_data);
  const [LeadId, setLeadId] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    setTotalAmount(JSON.parse(localStorage.getItem('totaldueamount')));
    setPlan(JSON.parse(localStorage.getItem('plandetails')));

  }, [])

  useEffect(() => {
    calculateTotal();
  }, [plan])

  useEffect(() => {
    handlefinalsubmit()
    }, [discount, final_price, vat_pricecount, totalamount, plan])
    

  console.log(discount, 'discount')






console.log(plan,"plan")



  const username = process.env.REACT_APP_PAYMENTAPIUSERNAME;
  const password = process.env.REACT_APP_PAYMENTAPIPASSWORD;
  // const LeadId = localStorage.getItem('leaddetails')?.replace(/['"]+/g, '');
  const plan_id = plan?.map((item) => item?._id);
  const plan_name = plan?.map((item) => item?.plan_name);
  const plan_company_id = plan?.map((item) => item?.company_id);
  const vat_price = plan?.map((item) => item.addOptionalCondition);
  // const final_price = totalamount + parseFloat(vat_price);
  const company_name = plan?.map((item) => item.companyData?.company_name);
  const travelsFormsData1 = JSON.parse(localStorage.getItem("travelsFormsData"));
  const email = travelsFormsData1?.email;
  const phone = travelsFormsData1?.phone_no;



  // console.log(LeadId, "id")
  console.log(plan_company_id, "plan_company_id")
  console.log(plan_id, "plan_id")
  console.log(final_price, "final_price")
  console.log(plan_name, "plan_name")
  let selectedids = JSON.parse(localStorage.getItem('selectedids'));
  console.log(selectedids, "selectedids")
  const user = travelsFormsData.user;
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
  const id =
        user === "customer" && travelsFormsData.oldleadid
            ? travelsFormsData.oldleadid
            : queryParams.get('leadid') ? queryParams.get("leadid") :
                travelsFormsData.leadid

                setLeadId(id);
                console.log("leadid>>>>>>.", LeadId)
              }, [])
              

  const UpdatePolicy = async () => {
    try {
      
      // if (travelsFormsData.oldleadid !== null && travelsFormsData.user === 'customer') {
      //   console.log("i am in if")

      //   await axios
      //     .put(API_URL + '/api/updatePolicyDetails?id=' + travelsFormsData.oldleadid, {
      //       insuranceType: "Travel",
      //       // final_price: totaldueamount,
      //       additionalCoverArr: selectedids,
      //       final_price: final_price,
      //       policy_issued_date: new Date(),


      //     })
      //     .then((result) => {
      //       if (result.status == 200) {

      //         localStorage.setItem('leaddetails', JSON.stringify(result.data._id))
      //       } else {
      //         swal('Error', 'Error in Adding Family Details', 'error')
      //       }
      //     })
      //     .catch((error) => {
      //       if (error && error.response.status) {
      //         swal('Error', error.reponse.data.message, 'error')
      //         return error.response.status
      //       }
      //     })
      // } else if (travelsFormsData.user === 'BE') {
      //   console.log("i am in else if")

      //   fetch(API_URL + '/api/fillInsurancePlan?email=' + travelsFormsData.email, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       insuranceType: "Travel",
      //       additionalCoverArr: selectedids,
      //       final_price: final_price,
      //       policy_issued_date: new Date(),
      //     }),
      //   })
      //     .then((response) => response.json())
      //     .then((responseData) => {
      //       // Handle the API response if needed

      //     })
      //     .catch((error) => {
      //       if (error && error.reponse.data.message) {
      //         swal('Error', error.reponse.data.message, 'error')
      //       }

      //       // Handle any error that occurred during the API request
      //       //console.error('Error making POST API request:', error)
      //     })
      // } else {
      //   console.log("i am in else")

      //   fetch(API_URL + '/api/fillInsurancePlan?email=' + travelsFormsData.email, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       insuranceType: "Travel",
      //       additionalCoverArr: selectedids,
      //       final_price: final_price,
      //       policy_issued_date: new Date(),
      //     }),
      //   })
      //     .then((response) => response.json())
      //     .then((result) => {
      //       //console.log('Success:', result)
      //       if (result.status == 200) {

      //         localStorage.setItem('leaddetails', JSON.stringify(result.data._id))
      //       } else {
      //         swal('Error', 'Error in Adding Family Details', 'error')
      //       }
      //     })
      //     .catch((error) => {
      //       console.error('Error:', error)
      //     })
      // }
      await axios
      .put(API_URL + '/api/updatePolicyDetails?id=' + LeadId, {
        insuranceType: "Travel",
        // final_price: totaldueamount,
        additionalCoverArr: selectedids,
        final_price: final_price,
        // policy_issued_date: new Date(),


      })
      .then((result) => {
        if (result.status == 200) {

          localStorage.setItem('leaddetails', JSON.stringify(result.data._id))
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
    } catch (error) {
      console.log(error)
    }
  }



  //console.log(username)
  //console.log(password)
  //console.log(LeadId)
  //console.log(plan_id)
  //console.log(plan_name)
  //console.log(plan_company_id)
  //console.log(final_price)
  //console.log(company_name)
  //console.log(email)
  //console.log(phone)
  //console.log(vat_price)
  let hostname =
    window.location.hostname === "localhost"
      ? window.location.hostname + ":3000"
      : window.location.hostname;
  let host = window.location.protocol + "//" + hostname;



  const handlepayment = async () => {

    console.log("i am in handlepayment",LeadId)

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
          "/ThankYou?id=" +
          LeadId +
          "&lob=" +
          "Travel" +
          "&plan_id=" +
          plan_id +
          "&plan_company_id=" +
          plan_company_id +
          "&final_price=" +
          final_price +
          "&status=Pending",
        cancelUrl:
          host +
          "/TravelPayments",
        returnUrl:
          host +
          "/TravelThankyou?id=" +
          LeadId +
          "&lob=" +
          "Travel" +
          "&plan_id=" +
          plan_id +
          "&plan_company_id=" +
          plan_company_id +
          "&final_price=" +
          final_price +
          "&status=Completed",
        operation: "PURCHASE",
        style: {
          accentColor: "#30CBE3",
        },
      },
      order: {
        amount: final_price,
        currency: "AED",
        description: "Plan Name : " + plan_name,
        id: orderid,

      },
      customer: {
        email: email,
        phone: phone,
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

    // let paymentdata = {
    //   "lead_id": LeadId,
    //   "final_price": final_price,
    //   "additionalCoverArr" :localStorage.getItem('selectedids'),
    // }
    // await axios
    // .post(API_URL+"/api/updatePolicyDetails", paymentdata)
    // .then((response) => {
    //   console.log(response)
    // });

  }



  const handleback = () => {
    window.history.back();
    localStorage.removeItem('selectedids');
    localStorage.removeItem('selectedValues');

  }

  console.log(plan)


  // const calculateTotal = () => {

  //   let totalAmount = 0;

  //   let vatcommission = plan.map((data)=> data.vatComissionPercentage)[0];
  //   console.log(vatcommission,"vatcommission")

  //   plan.forEach((item) => {
  //     item?.add_op_con_desc.forEach((item1) => {
  //       console.log(item1)
  //       if (item1.vat.toLowerCase() === "yes") {
  //         console.log(item1.add_op_con_desc_topup)

  //         if (item1.add_op_con_desc_topup.includes('%')) {
  //           console.log(totalamount)
  //           let percentage = item1.add_op_con_desc_topup.replace(/%/g, '');
  //           if(percentage?.includes('-')) {
  //             percentage = percentage.split('-')[1];
  //             percentage = +percentage;
  //             totalAmount = +totalAmount- (totalamount * percentage) / 100;
  //             const vatprice = (totalAmount * vatcommission) / 100;
  //             const finalpriceamount = totalAmount + vatprice;  
  //             setVatPricecount(Number(vatprice).toFixed(2));
  //             setFinalPrice(Number(finalpriceamount).toFixed(2));

  //       }else{
  //           percentage = +percentage;
  //           console.log(percentage,"percentage")
  //           totalAmount = +totalamount + (totalamount * percentage) / 100;
  //           console.log(totalAmount,"totalAmount")

  //           const vatprice = (totalAmount * vatcommission) / 100;
  //           const finalpriceamount = totalAmount + vatprice;  
  //           console.log(vatprice,"vatprice")
  //           console.log(finalpriceamount,"finalpriceamount")
  //             setVatPricecount(Number(vatprice).toFixed(2));
  //             setFinalPrice(Number(finalpriceamount).toFixed(2))
  //       }

  //       } else {
  //           // If fixed value, subtract or add fixed value from the total amount based on sign
  //           totalAmount = totalamount + (+item1.add_op_con_desc_topup)
  //           const vatprice = (totalAmount * vatcommission) / 100;
  //             console.log(vatprice,"vatprice")
  //             setVatPricecount(Number(vatprice).toFixed(2));
  //           setFinalPrice(Number(totalAmount).toFixed(2));
  //       }



  //       }
  //     }
  //     );
  //   }
  //   );
  //   console.log(final_price,"final_price>>>>>>>>>>>>>>");

  // };



  const calculateTotal = () => {

    let totalAmount = 0;
    let totalAmount1 = 0;
    let totalAmount2 = 0;
    let totalAmount3 = 0;

    let vatcommission = plan.map((data) => data.vatComissionPercentage)[0];
    console.log(vatcommission, "vatcommission")
    let finaltopup = 0
    let notopup = 0

    plan.forEach((item) => {
      item?.add_op_con_desc.forEach((item1) => {
        console.log(item1)
        let topup = 0
        let notop = 0

        if (item1.vat.toLowerCase() === "yes") {
        // if (item1?.vat) {

          console.log(item1.add_op_con_desc_topup)

          if (item1.add_op_con_desc_topup.includes('%')) {
            console.log(totalamount)
            let percentage = item1.add_op_con_desc_topup?.replace(/%/g, '');
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
        finaltopup = finaltopup + topup

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
      console.log(discountvalue, "discountvalue")
    }

    console.log(totalAmount1, "totalAmount1")
    console.log(totalAmount2, "totalAmount2")
    console.log(totalAmount3, "totalAmount3")
    // const totalfee = totalAmount1 + totalAmount2 + totalAmount3;
    // console.log(totalfee,"totalfee")

    const vatprice = ((totalamount + finaltopup) * vatcommission) / 100;
    console.log(vatprice, "vatprice")
    const finalpriceamount = totalamount + finaltopup + notopup + vatprice - discountvalue;
    console.log(finalpriceamount, "finalpriceamount")



    setVatPricecount(Number(vatprice).toFixed(2));
    setFinalPrice(Number(finalpriceamount).toFixed(2));

  };

  console.log(discount, "discount>>>>>>>>>>>>>>");


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

  const handlefinalsubmit = async() => {
    try{
    let add_desc_con = plan[0]?.add_op_con_desc
    
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
    


    await axios.post(API_URL + `/api/updateLeadById?leadId=${travelsFormsData?.leadid || travelsFormsData.oldleadid}`, {
      // "id": v._id,
      // "company_id": v.company_id,
      "travel_price_id": travelsFormsData?.travelPrices?._id,
      "travelDaysRange": travelsFormsData?.travelDaysRange,
      "add_desc_data": add_desc_amt,
      "vat_pricecount": +vat_pricecount,
      "final_price": +final_price,
     
     
      // "lead_id": motorFormsData.leadid || motorFormsData.oldleadid,
    }).then((response) => {
      console.log("response", response)
    }).catch((error) => {
      console.log("error", error)
    })
  }catch(error){
    console.log("error", error)
  }

  }




  return (
    <div>
      <Header />
      <Travelbanner />
      <div className='container-fluid car_info pt-4 pb-4'>
        <div className='container'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-12 nopadding'>
              <div className='row form_abcd'>
                {plan.map((item, index) => (
                  <div className='col-lg-4'>
                    <div className='pay_Details1'>
                      <div className='row' style={{ alignItems: 'center' }}>
                        <div className='col-lg-5 col-sm-6 col-md-12 col-xs-12 mb-4'>
                          {item.companyData?.map((item1) => (
                            item1.company_logo.map((logo) => (
                              <img src={`${API_URL}/uploads/${logo.filename}`} alt='logo' style={{ width: "100%" }} />
                            ))
                          ))}
                        </div>
                        <div className='col-lg-7 col-sm-6 col-md-12 col-xs-12 mb-4'>
                          <p>{item?.travelPrices.price_name}</p>
                        </div>
                        <hr />
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6>Total Premium</h6>
                        </div>
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6 style={{ textAlign: 'right' }}>AED {formatAmount(totalamount)}</h6>
                        </div>
                        {plan.map((item, index) => (
                          (item?.add_op_con_desc?.map((item1, index) => (
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

                        {/* <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6>Discount</h6>
                        </div>
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6 style={{ textAlign: 'right' }}>AED 0.00</h6>
                        </div> */}

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
                          {/* <h6 style={{ textAlign: "right" }}>AED {(discount * totalamount)/100 }</h6> */}
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
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6>Total Amount</h6>
                        </div>
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6 style={{ textAlign: 'right',
                           fontWeight: '400',
                            fontSize: '28px',
                             color: '#D91818'
                              }}>AED {formatAmount(final_price)}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='col-lg-7'>
                  <div className='pay_Details'>
                    <p>Please click the button below and follow the instructions provided to complete your AED
                    <span style={{ color: "#ed1c25", marginRight: "5px" }}>
                        <b>{formatAmount(final_price)}</b>
                      </span>
                       payment.</p>
                    <p><b style={{ color: '#ed2a30' }}>Or</b></p>
                    <p>You can pay in our bank account mentioned below.</p>
                    <p>Abu Dhabi Commercial Bank, P.O. Box 118385, Dubai, UAE JOIE de VIVRE INTL INSURANCE BROKERAGE LLC</p>
                    <p>744598020002</p>
                    <p>Swift Code : ADCBAEAA</p>
                    <p>IBAN: AE880030000744598020002</p>
                  </div>
                  <div className='row'>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                      <button className='buttonactions' onClick={handleback}><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</button>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right' }}>
                      <button className='buttonactions' onClick={handlepayment}>Pay Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className='disclaimerss'>
        Travel insurance comparision for your Travel requirements
      </h3>
      <Footer />
    </div>
  )
}
export default TravelPayments