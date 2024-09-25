import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Innerbanner from '../Banner/Innerbanner'
import { Nav, Table } from 'react-bootstrap'
import finance from '../../Image/finance.svg'
import right from '../../Image/right.svg'
import cross from '../../Image/cross.svg'
import { UseMotorContext } from '../../MultiStepContextApi'
import Travelfilter from '../Travel/Travelfilter'
import Travelbanner from '../Banner/Travelbanner';
import TravelComparelist from './TravelComparelist';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import { set } from 'firebase/database';
import { API_URL } from '../..';
import moment from 'moment';


const Travelcomparision = () => {
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
    const navigate = useNavigate();

    const location = useLocation();
    // const {matchTravelPlan} = location.state;

    const { travelsFormsData, settravelsFormsData } = UseMotorContext();
    const [travelsFormsData1, setTravelsFormsData1] = useState(
        JSON.parse(localStorage.getItem("travelsFormsData"))
    );

    const [travelinsuranceforname, settravelinsuranceforname] = useState("");
    const [tripperiodname, setTripperiodname] = useState("");
    const [triptype, setTriptype] = useState("");
    const [destination, setDestination] = useState("");


    useEffect(() => {
        gettravelinsurancefor(travelsFormsData1.travel_insurance_for);
        gettripperiod(travelsFormsData1.plan_type);
        gettriptype(travelsFormsData1.type_of_trip);
        // getdestination(travelsFormsData1.nationality);
        getstandarcovers(travelsFormsData1.line_of_business)
    }, [])

    const [standard_cover_arr, setStandard_cover_arr] = useState([]);

    const getstandarcovers = (ParamValue) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API_URL}/api/getAllStandardCovered?lob=${ParamValue}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                // //console.log(result);
                setStandard_cover_arr(JSON.parse(result).data);
            })
            .catch(error => console.log('error', error));
    }

    // //console.log(standard_cover_arr);



    const gettravelinsurancefor = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch(API_URL+'/api/get_travel_insurance_for_detailsbyid', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.data);
                settravelinsuranceforname(data.data[0].travel_insurance_for);
            })
    }

    const gettripperiod = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch(API_URL+'/api/get_travel_type_by_id', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.data.travel_type);
                setTripperiodname(data.data[0].travel_type);
            })
    }

    const gettriptype = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch(API_URL+'/api/get_travel_plan_type_by_id', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.data.travel_plan_type);
                setTriptype(data.data[0].travel_plan_type);
            })
    }

    // const getdestination = (ParamValue) => {
    //     var requestOptions = {
    //         method: 'post',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ ParamValue: ParamValue })
    //     };
    //     fetch(API_URL+'/api/getCountrybyid', requestOptions)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data.data);
    //             setDestination(data.data.country_name);
    //         }
    //         )
    // }


    const [selectedPlans, setSelectedPlans] = useState([]);


    const handlePlanSelect = (plan) => {
        setSelectedPlans((prevSelectedPlan) => {
            // Toggle plan selection
            const updatedPlan = prevSelectedPlan === plan ? [] : plan;

            // Navigate to TravelSelectedquotes if a plan is selected
            if (updatedPlan) {
                navigate('/TravelSelectedquotes', { state: { selectedPlan: updatedPlan } });
            }

            localStorage.setItem("conditionlocation", "Travelcomparision");
;
            return updatedPlan;
        });
    };

    const handlePlanRemove = (plan) => {
        setCompareselect((prevSelectedPlans) => {
            const updatedPlans = prevSelectedPlans.filter((selectedPlan) => selectedPlan !== plan);

            // Find the removed plan in matchTravelPlan and add it to nonMatchingPlans
            const removedPlan = comparematch.find((matchPlan) => matchPlan.travelPriceId === plan.travelPriceId);

            if (removedPlan && !nonmatchingcompare.some(existingPlan => existingPlan.travelPriceId === removedPlan.travelPriceId)) {
                setNonmatchingcompare((prevNonMatchingPlans) => [...prevNonMatchingPlans, removedPlan]);
            }

            localStorage.setItem("compareselect", JSON.stringify(updatedPlans));

            if (updatedPlans.length > 0) {
                return updatedPlans;
            } else {
                navigate('/Travelquotes');
                return []; // Clear selected plans when navigating away
            }
        });
    };
    
    // localStorage.setItem('comparematch', JSON.stringify(matchTravelPlan))
    // const storedData = JSON.parse(localStorage.getItem('comparematch'));
    // setComparematch(storedData);
    
    const { compareselect, setCompareselect } = UseMotorContext();
    const { comparematch, setComparematch } = UseMotorContext();
    const [nonmatchingcompare, setNonmatchingcompare] = useState();
    
    //console.log('comparematch:', comparematch);
    
    useEffect(() => {
        localStorage.setItem('compareselect', JSON.stringify(compareselect));
        localStorage.setItem('comparematch', JSON.stringify(comparematch));
    }, [compareselect, comparematch]);
    
    console.log(nonmatchingcompare)


    useEffect(() => {
        let selecteddata = localStorage.getItem('compareselect');
        let mactheddata = localStorage.getItem('comparematch');

        if (selecteddata) {
            setCompareselect(JSON.parse(selecteddata));
        }

        if (mactheddata) {
            setComparematch(JSON.parse(mactheddata));
        }
    }, []);







    useEffect(() => {
        setNonmatchingcompare(
            comparematch.filter(selectedPlan =>
                !compareselect.some(matchPlan =>
                    matchPlan && selectedPlan && matchPlan.travelPriceId === selectedPlan.travelPriceId
                )
            )
        )
        //console.log('nonmatchingcompare:', nonmatchingcompare);
    }
        , [compareselect, comparematch]);

    const handleAddToCompare = (item) => {
        setCompareselect((prevSelectedPlans) => {
            // Check if the item is already in compareselect
            if (!prevSelectedPlans.some((plan) => plan.travelPriceId === item.travelPriceId)) {
                const updatedSelectedPlans = [...prevSelectedPlans, item];
                setNonmatchingcompare((prevNonMatchingPlans) =>
                    prevNonMatchingPlans.filter((plan) => plan.travelPriceId !== item.travelPriceId)
                );
                return updatedSelectedPlans;
            }
            return prevSelectedPlans;
        });
    };

    const clearselectedplans = () => {
        localStorage.removeItem('compareselect');
        localStorage.removeItem('comparematch');
        setCompareselect([]);
        setComparematch([]);
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

      const handlereferredplan = async (plan) => {
        console.log(plan, "plan");
        const company_id = plan?.companyDetails?._id;
        const plan_id = plan?._id;
        const id = travelsFormsData.leadid || travelsFormsData.oldleadid;
    
        //console.log(company_id, plan_id, id);
        const requestOptions = {
          method: "Put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            insuranceType :"Travel",
            finalPriceRefferd: "REFFERED",
            company_id: company_id,
            plan_id: plan_id,
              paymentStatus: "Completed",
              travel_price_id: plan?.travelPrices?._id,
              travelDaysRange: plan?.travelDaysRange,
            location: window.location.pathname.replace("/", "")
          }),
        };
    
        await fetch(
          `${API_URL}/api/updatePolicyDetails?id=${id}`,
          requestOptions
        )
          .then((response) => {
            //console.log(response);
            //console.log(response.data);
          })
          .catch((error) => {
            //console.log(error.response);
          });
    
          const newUrl = `/thankyou?id=${id}&lob=Travel&plan_id=${plan_id}&plan_company_id=${company_id}&final_price=REFFERED&status=Completed`;
          navigate(newUrl);
      }



    return (
        <div>
            <Header />
            <Travelbanner />
            <div className='quotes_filters1 comparision'>
                <div className='container quotes_filters hide pt-4 pb-4'>
                    <div className='row'>
                        {/* <Travelfilter matchTravelPlan={matchTravelPlan} /> */}

                        <div className='col-lg-4 col-md-12 col-sm-12 col-xs-12 filters'>
                            <h4 className='car details'>Travel Details
                            <>
                            <Link
                            className="buttonactions"
                            style={{ padding: "6px 19px", marginLeft: "10%" }}
                            to={"/Travelquotes"}
                            onClick={() => clearselectedplans()}
                            >
                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                            Back
                            </Link>
                        </>
                        </h4>
                            <div className='filterssas one'>
                                <div className='row travel_detailss_form'>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Travel Type</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelinsuranceforname}</h6>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Trip Period</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{tripperiodname}</h6>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Number of Days</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelsFormsData1.no_of_travel} days</h6>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Start date</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{moment(travelsFormsData1.start_date).format("DD/MM/YYYY")}</h6>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>End Date</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{moment(travelsFormsData1.end_date).format("DD/MM/YYYY")}</h6>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Trip Type</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{triptype}</h6>
                                    </div>

                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Destination</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelsFormsData1.nationality}</h6>
                                    </div>
                                </div>
                            </div>
                            <h4 className='personal details'>Personal Details</h4>
                            <div className='filterssas two mb-5'>
                                <div className='row travel_detailss_form'>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Name</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6 '>
                                        <h6>{travelsFormsData1.name}</h6>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Email Address</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelsFormsData1.email}</h6>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Mobile Number</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelsFormsData1.phone_no}</h6>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Date of Birth</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{new Date(travelsFormsData1.date_of_birth).toLocaleDateString("en-US")}</h6>
                                    </div>
                                    <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Passport Number</h6>
                                    </div>
                                    <div className='col-lg-8 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelsFormsData1.passport_no}</h6>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 table-container'>

                            <Table 
                            style={{ textAlign: 'center' }} 
                            striped size="lg"
                            className='comparisions'>

                                <tbody>
                                    <tr>
                                        <td>Policy Features List</td>
                                        {compareselect?.map((item) => (
                                            <td key={item?.travelPriceId}>
                                                {item.companyData?.map((item1) => (
                                                    item1.company_logo.map((logo) => (
                                                        <img className="comp_logoas" key={logo.filename} src={`${API_URL}/uploads/${logo.filename}`} alt='logo' />
                                                    ))
                                                ))}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', color: '#003399' }}>Plan Name</td>
                                        {compareselect?.map((item) => (
                                            <td key={item.travelPriceId} style={{ fontWeight: 'bold', color: '#003399' }}>{item.travelPrices.price_name}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold', color: '#003399' }}>Premium Amount</td>
                                        {compareselect?.map((item) => (
                                            <td key={item.travelPriceId} style={{ fontWeight: 'bold', color: '#003399' }}>{item.travelBasePremium == 'Referred' ? 'REFFERED' : 'AED ' +formatAmount(item.travelBasePremium)}</td>
                                        ))}
                                    </tr>
                                    {standard_cover_arr?.map((item1) => (

                                        <tr key={item1.standard_cover_label}>
                                            <td>{item1.standard_cover_label}</td>
                                            {compareselect?.map((item) => {
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
                                        {/* ... (Other table headers) ... */}
                                        <td></td> {/* New column for the "Select" button */}

                                        {/* ... (Other table rows) ... */}
                                        {compareselect?.map((item) => (
                                            <td key={item?.travelPriceId}>
                                                {item.travelBasePremium == 'Referred' ? 
                                                <button className='select' onClick={() => handlereferredplan(item)}>Buy this</button>
                                                : 
                                                <button className='select' onClick={() => handlePlanSelect(item)}>Buy this</button>
                                                }
                                                </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        {/* ... (Other table headers) ... */}
                                        <td></td> {/* New column for the "Select" button */}

                                        {/* ... (Other table rows) ... */}
                                        {compareselect?.map((item) => (
                                            <td key={item?.travelPriceId}>
                                                {/* <button className='select' onClick={() => handlePlanSelect(item)}>Buy this</button> */}
                                                <button className='removecompare' onClick={() => handlePlanRemove(item)}>Remove</button>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </Table>


                        </div>
                    </div>
                    {/* <TravelComparelist
                       nonMatchingPlans={nonMatchingPlans}
                       selectedPlans={selectedPlanIds}
                       onAddToCompare={(plan) => {
                        // Add the plan back to selected plans
                        setSelectedPlanlist((prevSelectedPlans) => [...prevSelectedPlans, plan])
                    }}
                     /> */}




                    <div className='mt-4 compare_list'>
                        <h3 className='mb-4 mt-2'>How about these ?</h3>
                        <OwlCarousel
                            // Added a unique key to each OwlCarousel instance
                            margin={30}
                            autoplay={false}
                            loop={false}
                            nav={false}
                            dots={false}
                            items={2}
                            touchDrag={true}
                            lazyLoad={true}
                            responsive={state.responsive}
                        >
                            {nonmatchingcompare?.map((item, index) => (
                                <div className='item' key={item.travelPriceId}>
                                    <div className='comparelistcarousel'>
                                        {item.companyData?.map((item1) =>
                                            item1.company_logo.map((logo) => (
                                                <img
                                                className="comp_logoas"
                                                    key={logo.filename}
                                                    src={`${API_URL}/uploads/${logo.filename}`}
                                                    alt='logo'
                                                />
                                            ))
                                        )}
                                        <p>{item?.travelPrices.price_name}</p>
                                        <h4>{item.travelBasePremium == 'REFERED' ? 'REFERED' : 'AED ' +formatAmount(item.travelBasePremium)}</h4>
                                        <h5>
                                            <strike>{item.travelBasePremium == 'REFERED' ? 'REFERED' : 'AED ' +formatAmount(item.travelBasePremium)}</strike>
                                        </h5>
                                        <span>
                                            <i className='fa fa-star' aria-hidden='true'></i>4.5
                                        </span>
                                        <button className='addtocomparebutton' onClick={() => handleAddToCompare(item)}>Add to compare</button>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>
                    </div>
                    {/* <p className='similarviews'>Show most viewed and similar products</p> */}
                </div>
                <h3 className='disclaimerss'>
                    Travel insurance comparision for your Travel requirements
                </h3>
            </div>

            <Footer />
        </div>
    )
}

export default Travelcomparision;