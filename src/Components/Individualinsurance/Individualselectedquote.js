import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import { Button, InputGroup, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Filters from "./Individualmedicalfilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import admin from "../../config";
import { API_URL } from "../..";
import axios from "axios";
import { UpdatePolicy } from "../../functions";
import moment from "moment";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import Termsandcondition from "../Travel/Termsandcondition";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const Individualselectedquote = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
    individualtooltip
  } = UseMotorContext();

  const navigate = useNavigate();


  // const [startDate, setStartDate] = useState(new Date());
  const [showMore, setShowMore] = useState(true);
  const [TermsAndConditionsdata, setTermsAndConditionsdata] = useState("")
  const [quoteArr, setQuoteArr] = useState([]);
  const [Mortgage, setMortgage] = useState(false);
  const [startDate, setStartDate] = useState();
  const [TermsAndConditions, setTermsAndConditions] = useState(false);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const [additionalCover, setAdditionalCover] = useState([]);
  const [show, setShow] = useState(false);
  const [TotalAmount, setTotalAmount] = useState(IndividualInsurance.selectFilter?.finallBasePremium);
  const [emirates, setEmirates] = useState([]);
  const [visa, setVisa] = useState([]);
  const [salary, setSalary] = useState([]);
  const [country, setCountry] = useState([]);
  const [emiratesId, setEmiratesId] = useState("");
  const [visaId, setVisaId] = useState("");
  const [salaryId, setSalaryId] = useState("");
  const [plandetails, setPlandetails] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedids, setSelectedids] = useState([]);
  const [selectedadditionals, setSelectedadditionals] = useState([]);
  const [previousPrice, setPreviousPrice] = useState("");
  const [couponcode, setCouponcode] = useState("");
  const [discount, setDiscount] = useState(null);


  useEffect(() => {
    getalldata();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 6);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const fetchData = async () => {
    await fetch(`${admin}/getAllAdditionalCovered?lob=Medical`)
      .then((res) => res.json())
      .then((data) => setAdditionalCover(data.data))
      .catch((e) => { });
  };
  const getTermsAndConditionsdata = async () => {
    axios
      .get(API_URL + "/api/termsAndCondition?insuranceType=Medical")
      .then((response) =>
        setTermsAndConditionsdata(response.data.data?.terms_constions)
      )
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    fetchData();
    getTermsAndConditionsdata();
  }, []);
  const handleIndividualDate = (date) => {
    setIndividualInsurance((prevState) => ({
      ...prevState,
      policy_issued_date: date,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  };
  // const handleUpdatePolicy = async () => {
  //   const dataToSend = {
  //     plan_category_id: IndividualInsurance.company_id,
  //     plan_type_id: IndividualInsurance.plan_type_id,
  //     final_price: IndividualInsurance?.selectFilter?.finallBasePremium,
  //     paymentStatus: "pending",
  //     bank_name: Mortgage ? IndividualInsurance.bank_name : null,
  //     policy_issued_date: IndividualInsurance.policy_issued_date,
  //   };
  //   // //console.log(dataToSend);

  //   await fetch(`${admin}/updatePolicyDetails?id=${updatePolicyId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataToSend),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => { })
  //     .catch((err) => { });
  // };
  const isWeekday = (date) => {
    const curr = new Date(date);
    const day = curr.getDay();
    return day !== 0 && day !== 6;
  };

  useEffect(() => {
    setUpdatePolicyId(IndividualInsurance?.updatePolicy_id);
  }, []);


  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);



  // const handleCheckboxChange = (e) => {
  //   const checked = e.target.checked;
  //   const value = JSON.parse(e.target.value);

  //   try {
  //     if (checked) {

  //       setSelectedValues([...selectedValues, value]);
  //       setIndividualInsurance((prevState) => ({
  //         ...prevState,
  //         selectFilter: {
  //           ...prevState.selectFilter,
  //           selectedValues: [...selectedValues, value]
  //         }
  //       }));

  //     }
  //     else {
  //       setSelectedValues(selectedValues.filter((item) => item !== value));
  //       let arr = selectedValues.filter((item) => item !== value)
  //       setIndividualInsurance((prevState) => ({
  //         ...prevState,
  //         selectFilter: {
  //           ...prevState.selectFilter,
  //           selectedValues: [...arr]
  //         }
  //       }));

  //     }

  //   } catch (error) {
  //     console.log("errr", error)
  //   }

  // };
  // eslint-disable-next-line react-hooks/exhaustive-deps

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
      setSelectedadditionals([...selectedadditionals, value]);
      setSelectedValues(selectedValues.filter((item) => item !== value.additional_cover_label));
      setSelectedids(selectedids.filter((item) => item !== value.additional_cover_id));


    }
  };

  console.log(selectedValues);
  console.log(selectedids);


  const getTotalAmountDue = () => {
    let totalamount
    let datatype = plandetails.map((item) => item.finallBasePremium)
    if (datatype.includes('Referred')) {
      const totalAmount = 'Referred';

      return totalAmount;
    }
    else {

      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>datatype", datatype)
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", plandetails.map((item) => item.finallBasePremium))
      totalamount = plandetails.map((item) => item.finallBasePremium).reduce((prev, next) => prev + next, 0);
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
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", selectedCover)

            if (selectedCover) {
              const coverValue = parseFloat(selectedCover.additional_cover_value);
              // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", coverValue)
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
    }
  };



  console.log(getTotalAmountDue());


  useEffect(() => {
    setTotalAmount(getTotalAmountDue());

  }, [IndividualInsurance.selectFilter]);
  //console.log("selectedValues", selectedValues)
  useEffect(() => {
    UpdatePolicy(
      IndividualInsurance?.leadid,
      IndividualInsurance.selectFilter?.company_id,
      IndividualInsurance.selectFilter?._id,
      TotalAmount,
      "Pending"
    );
    setIndividualInsurance((prevState) => ({
      ...prevState,
      selectFilter: {
        ...prevState.selectFilter,
        totaldueamount: TotalAmount
      }
    }));

  }, [TotalAmount]);

  // const getallData = async () => {
  //   await fetch(`${admin}/getAllNattionlity`)
  //     .then((res) => res.json())
  //     .then((data) => setCountry(data.data))
  //     .catch((e) => { });

  //   await fetch(`${admin}/getEmirate`)
  //     .then((res) => res.json())
  //     .then((data) => setEmirates(data.data))
  //     .catch((e) => { });

  //   await fetch(`${admin}/getVisaTypes`)
  //     .then((res) => res.json())
  //     .then((data) => setVisa(data.data))
  //     .catch((e) => { });

  //   await fetch(`${admin}/getsalary`)
  //     .then((res) => res.json())
  //     .then((data) => setSalary(data.data))
  //     .catch((e) => { });
  // };

  useEffect(() => {
    // getallData();
    const location = localStorage.getItem("navlocation")
    getCountry();
    getEmirates();
    getVisa();
    getSalary();
  }, []);

  useEffect(() => {
    getCountry();
    getEmirates();
    getVisa();
    getSalary();
  }, [IndividualInsurance.emirates_id, IndividualInsurance.visa_id, IndividualInsurance.salary_id]);

  const getCountry = async () => {
    await fetch(`${API_URL}/api/getAllNattionlity?lob=Medical`)
      .then((res) => res.json())
      .then((data) => setCountry(data.data))
      .catch((e) => {
        console.log(e);
      });
  };

  const getEmirates = async () => {
    await fetch(`${API_URL}/api/getAreaOfRegistrations`)
      .then((res) => res.json())
      .then((data) => setEmirates(data.data))
      .catch((e) => {
        console.log(e);
      });
  };

  const getVisa = async () => {
    await fetch(`${API_URL}/api/getVisaTypes`)
      .then((res) => res.json())
      .then((data) => setVisa(data.data))
      .catch((e) => {
        console.log(e);
      });
  };

  const getSalary = async () => {
    await fetch(`${API_URL}/api/getsalary`)
      .then((res) => res.json())
      .then((data) => setSalary(data.data))
      .catch((e) => {
        console.log(e);
      });
  };


  console.log(country, emirates, visa, salary)



  useEffect(() => {
    idToName();
  }, []);

  useEffect(() => {
    idToName();
    // //console.log(emiratesId, salaryId, visaId, "value");
  }, [emirates, visa, salary]);
  useEffect(() => {
    idToName();
    // //console.log(emiratesId, salaryId, visaId, "value");
  }, [IndividualInsurance.emirates_id, IndividualInsurance.visa_id, IndividualInsurance.salary_id]);

  const idToName = () => {

    if (IndividualInsurance.emirates_id) {
      const findEle = emirates.find(
        (val) => val._id === IndividualInsurance.emirates_id
      );
      findEle && setEmiratesId(findEle.medical_visa_country);
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

  console.log(IndividualInsurance, "IndividualInsurance inside quotes")
  console.log(plandetails, "plandetails inside quotes")

  const totaldueamount = getTotalAmountDue();
  console.log(totaldueamount);

  const handleUpdatePolicy = async () => {  
    try{
    let additionalamount = []
    for (let i = 0; i < selectedadditionals.length; i++) {
      console.log("........................kkkkkkkkkkkkkkkkkkkkkkm xmc vmm c")
      let amount
      let topupVaule = selectedadditionals[i]?.additional_cover_value
      let finallBasePremium = plandetails.finallBasePremium

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


    let discountvalue = IndividualInsurance.coupon_code_data;
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



    const dataToSend = {
      insuranceType: "Medical",
      plan_id: IndividualInsurance.plan_type_id,
      plan_company_id: IndividualInsurance.company_id,
      additionalPrimium: +getTotalAmountDue(),
      discountAmount: +discountvalue,
      termsConditionStatus: TermsAndConditions,
      additionalCover: additionalamount,
      paymentStatus: "Pending",
      policy_issued_date: IndividualInsurance.policy_issued_date,
      BECommission: IndividualInsurance.BECommission,
      medical_price_id: IndividualInsurance?.selectFilter?.medicalRates?._id,
      
    };
    console.log("dataToSend", dataToSend)
    // return false;

    await fetch(`${admin}/updatePolicyDetails?id=${updatePolicyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) });

    localStorage.setItem("plandetails", JSON.stringify(plandetails,));
    localStorage.setItem("totaldueamount", JSON.stringify(totaldueamount));
    localStorage.setItem("selectedValues", JSON.stringify(selectedValues));
    localStorage.setItem("selectedids", JSON.stringify(selectedids));

    console.log("helooooooo mofooooooooooo");

    navigate("/Individualtnc");

  } catch (error) {
    console.log(error) 
  }

  }


  const handleback = () => {
    if (localStorage.getItem("navlocation2") === "Individualstandardconditions") {
      navigate("/Individualstandardconditions");
    } else if (localStorage.getItem("navlocation2") === "Individualcompare") {
      navigate("/Individualcompare");
    } else {
      navigate("/Individualinsurancequote");
    }
  }

  const getalldata = async () => {
    const dataToSend = {
      nationalityId: IndividualInsurance.nationality_id,
      salaryRangeId: IndividualInsurance.salary_id,
      visaTypeId: IndividualInsurance.visa_id,
      emiratesId: IndividualInsurance.emirates_id,
      company_id: IndividualInsurance.insurance_company_id,
      plan_category_id: IndividualInsurance.plan_category_id,
      // additionalCoverId: additionalfilter || [],
      nature_id: IndividualInsurance.nature_id,
      price: IndividualInsurance.price,
      gender: IndividualInsurance.gender,
      DOB: IndividualInsurance.date,
      general_condition: IndividualInsurance.general_condition,
      maternity_condition: IndividualInsurance.maternity_condition,
      underwritting_condition: IndividualInsurance.underwritting_condition,
      height: IndividualInsurance.height,
      weight: IndividualInsurance.weight,
      planId: IndividualInsurance?.selectFilter?.medicalPriceId,
      medical_additional_condition: IndividualInsurance.standard_condition,
    };

    await fetch(`${admin}/getMatchMedicalPlans`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((response) => {

        console.log("response", response)
        setPlandetails(response.data);
        const price = response.data[0]?.finallBasePremium;
        setPreviousPrice(price);

      })
      .catch((err) => {
        console.log(err)
      })
  }


  const handlecopayments = async (e) => {
    const value = e.target.value;
    const dataToSend = {
      nationalityId: IndividualInsurance.nationality_id,
      salaryRangeId: IndividualInsurance.salary_id,
      visaTypeId: IndividualInsurance.visa_id,
      emiratesId: IndividualInsurance.emirates_id,
      company_id: IndividualInsurance.insurance_company_id,
      plan_category_id: IndividualInsurance.plan_category_id,
      nature_id: IndividualInsurance.nature_id,
      price: IndividualInsurance.price,
      gender: IndividualInsurance.gender,
      DOB: IndividualInsurance.date,
      general_condition: IndividualInsurance.general_condition,
      maternity_condition: IndividualInsurance.maternity_condition,
      underwritting_condition: IndividualInsurance.underwritting_condition,
      height: IndividualInsurance.height,
      weight: IndividualInsurance.weight,
      coPayments: value,
      planId: IndividualInsurance?.selectFilter?.medicalPriceId,
      medical_additional_condition: IndividualInsurance.standard_condition,

    };

    await fetch(`${admin}/getMatchMedicalPlans`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((response) => {

        console.log("response", response)
        setPlandetails(response.data);

      })
      .catch((err) => {
        console.log(err)
      })

  }

  const handlecouponcode = async () => {
    // settravelsFormsData({ ...travelsFormsData, coupon_code: couponcode })
    // settravelsFormsData({ ...travelsFormsData, discountvalue: discount })

    // settravelsFormsData({ ...travelsFormsData, coupon_code: couponcode, discountvalue: discount })
    try{
    if (couponcode === '') {
        swal({
            text: "Please Enter Valid Coupon Code",
            icon: "warning",
        })
        return false;
    }
    else{
    await axios.post(`${API_URL}/api/getDiscountCoupon`, {
        code: couponcode,
        lob: 'Medical'
    }).then((response) => {
        console.log(response, "check the response")
        if (response?.data?.status === 200) {
            // dispatch(AddMotoformData({ name: "coupon_code_data", value: response?.data?.data }))
            setIndividualInsurance({
                ...IndividualInsurance,
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
    console.log(couponcode, "couponcode");
    const isChecked = e.target.checked;
    console.log(isChecked);
    setDiscount(isChecked);
    setIndividualInsurance({ ...IndividualInsurance, discountvalue: isChecked })
    if (isChecked == false) {
        setCouponcode('')
        setIndividualInsurance((prevData) => ({
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
    return ''; // Return an empty string if the input is null
  }

  console.log("individualtooltip", individualtooltip);


  return (
    <div>
      <Header />
      <Individualmedicalbanner />
      <div className="Selectedinfo">
        <div className="container Quotes_info1212 pt-4 pb-4">
          <div className="row quotes_all">


            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 filters">
              <h4 className='car details'>Medical Details</h4>
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
                    <h6>{emirates.map((val) => val._id == IndividualInsurance.emirates_id ? val.area_of_registration_name : "")}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Visa Type</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{visa.map((val) => val._id == IndividualInsurance.visa_id ? val.medical_plan_condition : "")}</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Salary</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>{salary.map((val) => val._id == IndividualInsurance.salary_id ? val.medical_salary_range : "")}</h6>
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

            {/* <Filters /> */}


            <div
              className="col-lg-8 col-md-12 col-sm-12 col-xs-12"
              style={{ marginTop: "40px" }}
            >
              <div>
                <p className="mb-3 paragra">Selected Medical insurance quotes for your Medical arrangements.</p>

                {IndividualInsurance.selectFilter &&
                  <div className="quotes_inner" key={IndividualInsurance.selectFilter._id}>
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
                        {
                          IndividualInsurance.selectFilter.companyDetails.company_logo.length > 0 ? IndividualInsurance.selectFilter.companyDetails.company_logo.map((val) => (
                            <img
                              key={val._id}
                              alt={val.fieldname}
                              src={`${API_URL}/uploads/${val.filename}`}
                            />
                          )) : (<img
                            alt="logo"
                          />)}

                      </div>
                      <div className="col-lg-6 quotemobile">
                        <h4>{IndividualInsurance?.selectFilter?.medicalRates?.name}</h4>
                        <ul className="benefits">
                          <li key={IndividualInsurance.selectFilter._id}>
                            {
                              IndividualInsurance.selectFilter.additional_cover_arr[1]
                                ?.additional_cover_label
                            }
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 action_abcd">
                        {/* <h2>AED {IndividualInsurance?.selectFilter?.finallBasePremium}</h2> */}
                        <h2>AED {previousPrice}</h2>
                      </div>
                    </div>
                    {showMore ? (
                      <div className="rowabcds">
                        <div className="row">
                          <div className="col-lg-6 abc">
                            <img
                              key={IndividualInsurance.selectFilter._id}
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
                              {IndividualInsurance.selectFilter &&
                                IndividualInsurance.selectFilter.standard_cover_arr.map((val) => (
                                  <li key={val._id}>
                                    {val.standard_cover_label}
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="col-lg-6 cde">
                            <img
                              key={IndividualInsurance.selectFilter._id}
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
                              {
                                IndividualInsurance.selectFilter &&
                                IndividualInsurance.selectFilter.notCoveredData.map((val) => (
                                  <li key={val._id}>
                                    {val.standard_cover_label}
                                  </li>
                                ))}
                            </ul>
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
                }
              </div>
              {plandetails?.map((item) => (
                <div className="colnopadding additional mb-3">
                  <div
                    className="row form_abcd"
                    style={{ justifyContent: "initial" }}
                    onChange={handlecopayments}
                  >
                    <p className="">Co-Payments</p>
                    <div className="col-lg-6 mb-3">
                      {/* <label >
                          Lab Compayment
                        </label> */}
                      <select
                        className="form-control"
                        name="lab_co_payment"
                        defaultValue={item?.planRateArray?.[item?.planRateArray?.length - 1]?.coPayments}
                      >
                        <option value="" hidden>Select Co-Payment Type</option>
                        {
                          item?.planRateArray?.map((val) => (
                            <option value={val.coPayments}>{val.coPayments}</option>
                          ))
                        }
                      </select>
                    </div>


                  </div>
                </div>
              ))}
              <div className="colnopadding additional mb-3">
                <div
                  className="row form_abcd"
                  style={{ justifyContent: "initial" }}
                >
                  <p className="">Additional Filter</p>
                  {/* {IndividualInsurance.selectFilter && IndividualInsurance.selectFilter.additional_cover_arr.length > 0 &&
                    IndividualInsurance.selectFilter.additional_cover_arr.map((val, index) => {

                      
                      //  <Form.Check
                      //   key={val.additional_cover_id}
                      //   onChange={handleCheckboxChange}
                      //   className="abcds_abcs"
                      //   type="checkbox"
                      //   label={val.additional_cover_label}
                      //   value={val.additional_cover_id}
                      //   checked={
                      //     IndividualInsurance.selectFilter.selectedValues ? IndividualInsurance.selectFilter.selectedValues.includes(val.additional_cover_id) : false
                      //   }

                      // />
                      return <Form.Check
                      className='abcds_abcs'
                      type="checkbox"
                      label={
                        val.additional_cover_val + " " + "(" + "AED" + " " +
                        (
                          val.additional_cover_value !== "" &&
                            val.additional_cover_value?.includes('%') ?
                            (
                              val.additional_cover_value?.includes('-') ?
                                -1 * (val.finallBasePremium * parseFloat(val.additional_cover_value.replace(/%/g, '').split('-')[1]) / 100) :
                                (val.finallBasePremium * parseFloat(val.additional_cover_value.replace(/%/g, '')) / 100)
                            ) :
                            val.additional_cover_value || 0
                        ) +
                        ")"
                      }
                      key={index}
                      // value={label.additional_cover_label}
                      value={JSON.stringify(val)}

                      onClick={handleCheckboxChange}
                    />
                    }) 

                  } */}

                  {plandetails.map((item) => (
                    <div className='col-lg-12 mb-4 mt-2' key={item.id}>
                      {item?.additional_cover_arr && item?.additional_cover_arr.length > 0 && (
                        <>
                          {item.additional_cover_arr.map((label, index) => (
                            <>
                              <Form.Check
                                className='abcds_abcs'
                                type="checkbox"


                                // label={
                                //   label.additional_cover_label + " " + "(" + "AED" + " " +
                                //   (
                                //     label.additional_cover_value !== "" &&
                                //       label.additional_cover_value?.includes('%') ?
                                //       (
                                //         label.additional_cover_value?.includes('-') ?
                                //           -1 * (item.finallBasePremium * parseFloat(label.additional_cover_value.replace(/%/g, '').split('-')[1]) / 100) :
                                //           (item.finallBasePremium * parseFloat(label.additional_cover_value.replace(/%/g, '')) / 100)
                                //       )
                                //        :
                                //       label.additional_cover_value != 0  ?  label.additional_cover_value : "free" || "free"
                                //   ) +
                                //   ")"
                                // }

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

                                value={JSON.stringify(label)}

                                onClick={handleCheckboxChange}
                              />

                            </>
                          ))}
                        </>
                      )}
                    </div>
                  ))}




                  <div className="col-lg-12 nopadding">
                    <div className="row form_abcd">
                      {/* <div className="col-lg-6">
                        <h4>Mortgage</h4>
                      </div> */}
                      {/* <div className="col-lg-6">
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
                      </div> */}
                      {/* {Mortgage && (
                        <div className="col-lg-12">
                          <InputGroup className="mb-4">
                            <Form.Control
                              required
                              name="bank_name"
                              onChange={handleIndividualInsurance}
                              value={IndividualInsurance.bank_name}
                              placeholder="Bank Name"
                              aria-label="Bank Name"
                            />
                          </InputGroup>
                        </div>
                      )} */}
                      <div className="col-lg-6">
                        <h4> Policy Start Date</h4>
                      </div>
                      <div className="col-lg-6">
                        <InputGroup className="mb-5">
                          <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-calendar" aria-hidden="true"></i>
                          </InputGroup.Text>
                          {/* <DatePicker
                            placeholder="Select a date"
                            className="form-control"
                            selected={
                              new Date(IndividualInsurance.policy_issued_date)
                            }
                            onChange={(date) => handleStartDate(date)}
                            minDate={today}
                            maxDate={sevenDaysLater}
                          /> */}
                          <DatePicker
                            placeholderText="Select a date"
                            className="form-control"
                            dropdownMode="select"
                            selected={
                              IndividualInsurance.policy_issued_date ? new Date(IndividualInsurance.policy_issued_date) : new Date()
                            }
                            onChange={(startDate) => {
                              handleIndividualDate(startDate);
                            }}
                            // filterDate={isWeekday}
                            minDate={today}
                            maxDate={sevenDaysLater}
                            dateFormat="dd/MM/yyyy"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            showTimeSelect={false}
                            onKeyDown={(e) => e.preventDefault()}
                          />

                        </InputGroup>
                      </div>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {individualtooltip?.PolicyStartDate}
                          </Tooltip>
                        }
                      >
                        <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                  </div>


                {IndividualInsurance?.selectFilter?.excess ?
                    
                        <div className="manageexcess" style={{ textAlign: "right", paddingTop: '20px' }}>
                          <h4 style={{ color: '#ED1C24', fontWeight: 'bold' }}>AED {IndividualInsurance?.selectFilter?.excess}</h4>
                          <h6>Excess Amount</h6>
                        </div>
                        :
                        ""
                }
                 

                 <div className="abcdsfloat" style={{ textAlign: "right", paddingTop: '10px' }}>
                    <h3>
                      {" "}
                      {isNaN(getTotalAmountDue()) ? "REFERED" : "AED " + formatAmount(getTotalAmountDue())}
                    </h3>
                    <h5>Total Amount Due</h5>
                  </div>


                  {IndividualInsurance.discountvalue == true && IndividualInsurance.coupon_code_data && IndividualInsurance.coupon_code_data !== null && (
                                        <div className="abcdsfloat" style={{ textAlign: "right", paddingTop: '10px' }}>
                                            <input
                                                type="text"
                                                className="couponcode"
                                                placeholder="Discount"
                                                value={

                                                    "Discount           " + "AED " +
                                                    (() => {
                                                        let discountvalue = IndividualInsurance.coupon_code_data;
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

                <div className="colnopadding additional mb-4">
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
                        defaultChecked={IndividualInsurance.discountvalue == true ? true : false}
                        onChange={(e) => {
                          handlediscountchange(e)
                        }}
                      />
                    </div>
                    {IndividualInsurance.discountvalue == true ?
                      <div className="col-lg-7">
                        <input className="coupons" placeholder="Discount Code" onChange={(e) => setCouponcode(e.target.value)} defaultValue={IndividualInsurance.coupon_code} /><button className="hjkbfhdb" onClick={handlecouponcode}>Apply</button>
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
                      {individualtooltip?.DiscountCoupon}
                    </Tooltip>
                  }
                  >
                  <i className="fa fa-question-circle" aria-hidden="true"></i>
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
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 payments"

                  >
                   
                    <button className='buttonactions' onClick={handleback} ><i className="fa fa-chevron-left" aria-hidden="true"></i>
                      Back</button>

                  </div>
                 
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 paymentsss"
                    style={{ textAlign: "right", paddingRight: "0px" }}
                  >
                    {!TermsAndConditions ?
                      <button className='disablebtn' disabled>Proceed To Payment</button>
                      :
                      <button className='buttonactions' onClick={handleUpdatePolicy}  >Proceed To Payment</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size="md" centered
        aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Medical T&C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="paragraph">{
            TermsAndConditionsdata
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

export default Individualselectedquote;
