import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Innerbanner from '../Banner/Innerbanner'
import finance from '../../Image/finance.svg'
import { Button, InputGroup, Form, Modal } from 'react-bootstrap'
import { useState } from 'react'
import tick from '../../Image/ticks.svg'
import cross from '../../Image/cross.svg'
// import Filters from './Filters'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Comparelist from '../Quotes/Comparelist'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';
import { API_URL } from '../..';
import moment from 'moment';
import { UseMotorContext } from '../../MultiStepContextApi'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// import { set } from 'firebase/database';



const TravelSelectedquotes = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    // const [travelsFormsData1, settravelsFormsData1] = useState(
    //     JSON.parse(localStorage.getItem("travelsFormsData"))
    // );

    const { travelsFormsData, settravelsFormsData, traveltootip} = UseMotorContext();

    const { compareselect, setCompareselect } = UseMotorContext();
    const { comparematch, setComparematch } = UseMotorContext();



    const [travelinsuranceforname, settravelinsuranceforname] = useState("");
    const [tripperiodname, setTripperiodname] = useState("");
    const [triptype, setTriptype] = useState("");
    const [destination, setDestination] = useState("");
    const [locationdata, setLocationData] = useState("");
    const [couponcode, setCouponcode] = useState("");
    const [discount, setDiscount] = useState(null);
    const [selectedadditionals, setSelectedadditionals] = useState([]);



    useEffect(() => {
        gettravelinsurancefor(travelsFormsData.travel_insurance_for);
        gettripperiod(travelsFormsData.plan_type);
        gettriptype(travelsFormsData.type_of_trip);
        getdestination(travelsFormsData.nationality);
        setLocationData(localStorage.getItem('conditionlocation'));

    }, [])



    const gettravelinsurancefor = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch(API_URL + '/api/get_travel_insurance_for_detailsbyid', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.data);
                settravelinsuranceforname(data.data[0]?.travel_insurance_for);
            })
    }

    const gettripperiod = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch(API_URL + '/api/get_travel_type_by_id', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.data.travel_type);
                setTripperiodname(data.data[0]?.travel_type);
            })
    }

    const handleClose = () => {
        setShow(false)
    };

    const gettriptype = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch(API_URL + '/api/get_travel_plan_type_by_id', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.data.travel_plan_type);
                setTriptype(data.data[0].travel_plan_type);
            })
    }

    const getdestination = (ParamValue) => {
        setDestination(ParamValue)
    }


    const [plandetails, setPlandetails] = useState([]);

    const location = useLocation();
    const { selectedPlan } = location.state;

    useEffect(() => {
        // Do something with the selectedPlanIds data in the Comparison component
        setPlandetails([selectedPlan]);
    }, [selectedPlan]);

    console.log(plandetails);

    const [startDate, setStartDate] = useState(new Date());
    const [showMore, setShowMore] = useState(true);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleShow = () => setShow(true);
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedids, setSelectedids] = useState([]);

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
    console.log('traveltootip', traveltootip)


    const getTotalAmountDue = () => {
        let totalamount = plandetails.map((item) => item.travelBasePremium).reduce((prev, next) => prev + next, 0);
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


        const totalAmount = totalamount + newamount1 + newamount2 + newamount3;

        return totalAmount;
    };


    console.log(getTotalAmountDue());


    const [terms, setTerms] = useState(false);

    //console.log(terms)

    const totaldueamount = getTotalAmountDue();
    const company_id = plandetails.map((item) => item.companyData?.map((company) => company._id).toString());
    const plan_id = plandetails.map((item) => item._id).toString();
    const user = travelsFormsData.user;
    const queryParams = new URLSearchParams(window.location.search);
    const id =
        user === "customer" && travelsFormsData.oldleadid
            ? travelsFormsData.oldleadid
            : queryParams.get('leadid') ? queryParams.get("leadid") :
                travelsFormsData.leadid


    console.log("leadid>>>>>>.", id)


    // const [Mortgage, setMortgage] = useState(false);
    // const [mortgagevalue, setMortgagevalue] = useState('');

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 89);

    //send all the data to payments page
    const handlePayment = async () => {

        console.log(totaldueamount);
        console.log(company_id.toString());
        console.log(company_id);
        console.log(plan_id);
        console.log(plan_id);
        console.log(id)


        let additionalamount = []
   for(let i = 0; i < selectedadditionals.length; i++){
    console.log("........................kkkkkkkkkkkkkkkkkkkkkkm xmc vmm c")
    let amount 
    let topupVaule = selectedadditionals[i]?.additional_cover_value
    let finallBasePremium = travelsFormsData.travelBasePremium
    if(topupVaule?.includes('%')){
      let rate
    if(topupVaule.includes("-")){
      rate = topupVaule.split('-')[1]
      rate = +rate.split("%")[0]
      amount = -finallBasePremium * rate / 100
    }else{
      rate = +topupVaule.split('%')[0]
      amount = finallBasePremium * rate / 100
    }
     
   }else{
    amount = +topupVaule
   }
   additionalamount.push({...selectedadditionals[i],amount: amount})
   console.log("amounkkkkkkkkkkkkkkkkkkkkkkkkkkkkt", amount,additionalamount)
  }

      console.log("additionalamount")
    console.log("selectedadditionals", selectedadditionals);


    let discountvalue = travelsFormsData.coupon_code_data;
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

        let obj = {
            insuranceType: "Travel",
            // final_price: totaldueamount,
            plan_id: plan_id,
            plan_company_id: company_id.toString(),
            additionalPrimium: +getTotalAmountDue(),
            discountAmount: +discountvalue,
            termsConditionStatus: terms,
            additionalCover: additionalamount,
            paymentStatus: "Pending",
            policy_issued_date: startDate,
            travelDaysRange: travelsFormsData?.travelDaysRange
        }
        if (queryParams.get('leadid')) {
            obj["businessentitytoken"] = queryParams.get('agentid')
        } else if (travelsFormsData.businessentitytoken) {
            obj["businessentitytoken"] = travelsFormsData.businessentitytoken
        }
        await axios
            .put(API_URL + '/api/updatePolicyDetails?id=' + id, obj)
            .then((result) => {
                if (result.status == 200) {
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


        localStorage.setItem("plandetails", JSON.stringify(plandetails,));
        localStorage.setItem("totaldueamount", JSON.stringify(totaldueamount));
        localStorage.setItem("selectedValues", JSON.stringify(selectedValues));
        localStorage.setItem("selectedids", JSON.stringify(selectedids));
        navigate('/TravelPayments')
    }




    const handleback = () => {
        settravelsFormsData((prevData) => ({
            ...prevData,
            coupon_code: '',
            coupon_code_data: '',
            discountvalue: null
        }));


        console.log(locationdata);
        // navigate('/Travelcomparision')
        if (locationdata == 'Travelcomparision') {
            navigate('/Travelcomparision')
        } else if (locationdata == 'Travelquotes') {
            clearselectedplans();
            navigate('/Travelquotes')
        } else {
            navigate('/Travelquotes')
        }

    }

    const [termscondition, setTermscondition] = useState([]);
    useEffect(() => {
        gettermscondition();
    }, [])
    const gettermscondition = () => {
        var requestOptions = {
            method: 'GET',
        };
        fetch(`${API_URL}/api/termsAndCondition?insuranceType=Travel`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setTermscondition(result.data);
                //console.log(result.data);
            })
            .catch(error => console.log('error', error));
    };
    //console.log(termscondition.terms_constions)

    const clearselectedplans = () => {
        localStorage.removeItem('compareselect');
        localStorage.removeItem('comparematch');
        setCompareselect([]);
        setComparematch([]);
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
            lob: 'travel'
        }).then((response) => {
            console.log(response, "check the response")
            if (response?.data?.status === 200) {
                // dispatch(AddMotoformData({ name: "coupon_code_data", value: response?.data?.data }))
                settravelsFormsData({
                    ...travelsFormsData,
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
    }catch (error) {
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
        settravelsFormsData({ ...travelsFormsData, discountvalue: isChecked })
        if (isChecked == false) {
            setCouponcode('')
            settravelsFormsData((prevData) => ({
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



    return (
        <div>
            <Header />
            {/* <Innerbanner /> */}
            <div className='Selectedinfo'>
                <div className='container Quotes_info1212 pt-4 pb-4'>
                    <div className='row quotes_all'>
                        <div className='col-lg-4 col-md-12 col-sm-12 col-xs-12 filters'>
                            <h4 className='car details'>
                                Travel Details
                                <>
                                    {/* <Link
                                    className="buttonactions"
                                    style={{ padding: "6px 19px", marginLeft: "10%" }}
                                    to={"/Travelquotes"}
                                    onClick={() => clearselectedplans()}
                                    >
                                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                    Back
                                    </Link> */}
                                </>

                            </h4>
                            <div className='filterssas one'>
                                <div className='row travel_detailss_form'>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Travel Type</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{travelinsuranceforname}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Trip Period</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{tripperiodname}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Number of Days</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{travelsFormsData.no_of_travel} days</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Start date</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{moment(travelsFormsData.start_date).format("DD/MM/YYYY")}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>End Date</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{moment(travelsFormsData.end_date).format("DD/MM/YYYY")}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Trip Type</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{triptype}</h6>
                                    </div>

                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Destination</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{destination}</h6>
                                    </div>
                                </div>
                            </div>
                            <h4 className='personal details'>Personal Details</h4>
                            <div className='filterssas two mb-5'>
                                <div className='row travel_detailss_form'>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Name</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom '>
                                        <h6>{travelsFormsData.name}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Email Address</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{travelsFormsData.email}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Mobile Number</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{travelsFormsData.phone_no}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Date of Birth</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{moment(travelsFormsData.date_of_birth).format("DD/MM/YYYY")}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>Passport Number</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom'>
                                        <h6>{travelsFormsData.passport_no}</h6>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12' style={{ marginTop: '40px' }}>
                            <div>
                                <p className="mb-3 paragra">Selected travel insurance quotes for your travel arrangements.</p>

                                {plandetails.map((item, index) => (
                                    <div key={index} className='quotes_inner'>
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
                                                {item.companyData?.map((item1) => (
                                                    item1.company_logo.map((logo) => (

                                                        <img src={`${API_URL}/uploads/${logo.filename}`} alt='logo' />

                                                    ))
                                                ))}
                                            </div>
                                            <div className='col-lg-6'>
                                                <h4>{item?.travelPrices.price_name}</h4>
                                                {item?.additional_cover_arr?.map((item2) => (
                                                    <ul className='benefits'>
                                                        <li>{item2.additional_cover_label}</li>
                                                    </ul>
                                                ))}
                                            </div>
                                            <div className='col-lg-3 action_abcd'>
                                                {item.travelBasePremium == "REFERED" ?
                                                    <h2>{"REFERED"}</h2> :
                                                    <h2>AED {
                                                        formatAmount(item.travelBasePremium)

                                                    }</h2>
                                                }
                                                {/* <label htmlFor="compareCheckbox" onClick={() => handleCheckboxClick(item)}>
                                                            <Form.Check
                                                                id="compareCheckbox"
                                                                className='abcds_abcs1'
                                                                type="checkbox"
                                                                label="Compare"
                                                                defaultChecked={selectedPlanIds.includes(item.planData?.plan_id)} // Set the checked state here
                                                            />
                                                        </label> */}

                                                {/* <Link to="/Selectedquotes"><button className='submit_select'>Select</button></Link> */}
                                                <p>T&C Apply</p>
                                            </div>
                                        </div>
                                        {showMore ? (
                                            <div className='rowabcds'>
                                                <div className='row'>
                                                    <div className='col-lg-6 abc'>
                                                        <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                                                        {item?.standard_cover_arr?.map((item3) => (
                                                            <ul className='description'>
                                                                <li>{item3.standard_cover_label}</li>

                                                            </ul>
                                                        ))}
                                                    </div>
                                                    <div className='col-lg-6 cde'>
                                                        <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                                                        {item.notCoveredData?.map((item4) => (
                                                            <ul className='description'>
                                                                <li>{item4.standard_cover_label}</li>

                                                            </ul>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <button className='showadd_details' onClick={toggleShowMore}>Hide Details</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='rowabcds'>
                                                <div className='row'>
                                                    <button className='showadd_details' onClick={toggleShowMore}>See Details</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className='colnopadding additional mb-3'>
                                <div className='row form_abcd' style={{ justifyContent: 'initial' }}>
                                    {plandetails.map((item1) => (
                                        item1?.additional_cover_arr && item1?.additional_cover_arr.length > 0 &&
                                        <p className="">Additional Cover</p>
                                    ))}
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
                                                                            label.additional_cover_value.includes('%') ?
                                                                            "(" + "AED" + " " +
                                                                            formatAmount(
                                                                                label.additional_cover_value.includes('-') ?
                                                                                    -1 * (item.travelBasePremium * parseFloat(label.additional_cover_value.replace(/%/g, '').split('-')[1]) / 100) :
                                                                                    (item.travelBasePremium * parseFloat(label.additional_cover_value.replace(/%/g, '')) / 100)
                                                                            )

                                                                            + ")"
                                                                            :
                                                                            label.additional_cover_value != 0 ? "(" + "AED" + " " + formatAmount(label.additional_cover_value) + ")" : "(" + "free" + ")" || "free"

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
                                            {/* <div className="col-lg-6">
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
                                                    <Form.Check className="mortageee"
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
                                                            placeholder="Bank Name"
                                                            aria-label="Bank Name"
                                                            onChange={(e) => setMortgagevalue(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </div>
                                            )} */}
                                            <div className="col-lg-6">
                                                <h4> Policy Start Date</h4>
                                            </div>
                                            <div className="col-lg-6"  style={{position:'relative'}}>
                                                <InputGroup className="mb-5">
                                                    <InputGroup.Text id="basic-addon1">
                                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                                    </InputGroup.Text>
                                                    <DatePicker
                                                        placeholder="Select Date"
                                                        className='form-control'
                                                        // selected={new Date(startDate)}
                                                        selected={startDate ? new Date(startDate) : new Date()}
                                                        onChange={(date) => setStartDate(date)}
                                                        minDate={minDate}
                                                        maxDate={maxDate}
                                                        dateFormat="dd/MM/yyyy"
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
                                                            {traveltootip?.policyStartDate}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </div>
                                    {plandetails.map((base) => (
                                        <div className='abcdsfloat' style={{ textAlign: 'right' }}>
                                            {/* <h3>AED {getTotalAmountDue()}</h3> */}
                                            <h3>
                                                {" "}
                                                {isNaN(getTotalAmountDue()) ? "REFERED" : "AED " + formatAmount(getTotalAmountDue())}
                                            </h3>
                                            <h5>Total Amount Due</h5>
                                        </div>
                                    ))}

                                    {travelsFormsData.discountvalue == true && travelsFormsData.coupon_code_data && travelsFormsData.coupon_code_data !== null && (
                                        <div className="abcdsfloat" style={{ textAlign: "right", paddingTop: '10px' }}>
                                            <input
                                                type="text"
                                                className="couponcode"
                                                placeholder="Discount"
                                                value={

                                                    "Discount           " + "AED " +
                                                    (() => {
                                                        let discountvalue = travelsFormsData.coupon_code_data;
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


                                <h1 className='taxzesd'>Note : All prices are excluding taxes</h1>
                                <div className='colnopadding additional mb-4'>
                                    <div className='row form_abcd' style={{ textAlign: 'center', justifyContent: 'start', alignItems: 'center' }}>
                                        <div className='col-lg-3'>
                                            <Form.Check
                                                className='abcds_abcs'
                                                name='terms'
                                                type="checkbox"
                                                label="Discount Code"
                                                defaultChecked={travelsFormsData.discountvalue == true ? true : false}
                                                onChange={(e) => {
                                                    handlediscountchange(e)
                                                }}
                                            />
                                        </div>
                                        {travelsFormsData.discountvalue == true ?
                                            <div className="col-lg-7">
                                                <input className="coupons" placeholder="Discount Code" onChange={(e) => setCouponcode(e.target.value)} defaultValue={travelsFormsData.coupon_code} /><button className="hjkbfhdb" onClick={handlecouponcode}>Apply</button>
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
                                                {traveltootip?.discountCoupon}
                                            </Tooltip>
                                        }
                                    >
                                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                    </div>
                                </div>
                                <div className="d-flex labelssss">
                                    <Form.Check className='abcds_abcs' type="checkbox" onClick={(e) => setTerms(e.target.checked)} /><label>I have read and agree to <a className="termscond" onClick={handleShow}>Terms and Conditions</a></label>
                                </div>
                            </div>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3'>
                                <div className='row'>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ paddingLeft: '0px' }}>
                                        <button className='buttonactions' onClick={() => handleback()}><i className="fa fa-chevron-left" aria-hidden="true" ></i>Back</button>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right', paddingRight: '0px' }}>
                                        {!terms ?
                                            <button className='disablebtn' disabled>Proceed To Payment</button>
                                            :
                                            <button className='buttonactions' onClick={handlePayment} >Proceed To Payment</button>
                                        }
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
                    <Modal.Title>Travel T&C</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="paragraph">{termscondition.terms_constions}</p>
                </Modal.Body>
                <Modal.Footer style={{ padding: '5px 10px' }}>
                    <a className="savechanges" onClick={handleClose}>
                        Ok
                    </a>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    )
}
export default TravelSelectedquotes;