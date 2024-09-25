import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { UseUserContext } from '../../UserContextAppProvider'
import { API_URL } from '../..'
import axios from 'axios'
import swal from 'sweetalert'
import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { CSpinner } from '@coreui/react'
import Profilenav from './Profilenav'
import GroupSidebar from '../Groupinsurance/GroupSidebar'


const SpecialOffer = () => {
    const navigate = useNavigate()
    const [showMore, setShowMore] = useState(false);

    const { usertoken, Logout } = UseUserContext()
    const [policyData, setPolicyData] = useState([]);
    const [pendingPolicyData, setPendingPolicyData] = useState([]);
    const [renewalPolicyData, setRenewalPolicyData] = useState([]);
    const [claimsData, setClaimsData] = useState([])
    const [policyOffers, setPolicyOffers] = useState([])
    const [cancelledPolicies, setCancelledPolicies] = useState([])
    const [loader, setLoader] = useState(false)
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    useEffect(() => {

        axios.get(API_URL + "/api/getAllCompletePolicy")
            .then((result) => {
                setPolicyData(result.data.data)
                //console.log(result.data.data)
            }).catch((err) => {
                //console.log(err.message)
                if (err?.response?.status === 401) {
                    swal({
                        title: "Error!",
                        text: err?.response?.data?.message,
                        type: "error",
                        icon: "error",
                    }).then(function () {
                        navigate("/Login")
                    });
                }
            });

        axios.get(API_URL + "/api/getAllPendingPolicy")
            .then((result) => {
                setPendingPolicyData(result.data.data)
            }).catch((err) => {
                //console.log(err.message)
                if (err?.response?.status === 401) {
                    swal({
                        title: "Error!",
                        text: err?.response?.data?.message,
                        type: "error",
                        icon: "error",
                    }).then(function () {
                        navigate("/Login")
                    });
                }
            });
        axios.get(API_URL + "/api/getAllCancelledPolicies")
            .then((result) => {
                setCancelledPolicies(result.data.data)
            }).catch((err) => {
                //console.log(err.message)
                if (err?.response.status === 401) {
                    swal({
                        title: "Error!",
                        text: err?.response?.data?.message,
                        type: "error",
                        icon: "error",
                    }).then(function () {
                        navigate("/Login")
                    });
                }
            });
        axios.get(API_URL + "/api/getAllRenewalPolicy")
            .then((result) => {
                setRenewalPolicyData(result?.data?.data)
            }).catch((err) => {
                //console.log(err.message)
                if (err?.response?.status == 401) {
                    swal({
                        title: "Error!",
                        text: err?.response?.data?.message,
                        type: "error",
                        icon: "error",
                    }).then(function () {
                        navigate("/Login")
                    });
                }
            });

        axios.get(API_URL + "/api/getClaims")
            .then((result) => {
                //console.log(result.data.data, "Pending Policy")
                setClaimsData(result.data.data)
            }).catch((err) => {
                //console.log(err.message)
                if (err?.response.status === 401) {
                    swal({
                        title: "Error!",
                        text: err?.response?.data?.message,
                        type: "error",
                        icon: "error",
                    }).then(function () {
                        navigate("/Login")
                    });
                }
            });
        setLoader(true)
        axios.get(API_URL + "/api/get_all_special_offer")
            .then((result) => {
                //console.log(result.data.data, "Offer Data")
                setPolicyOffers(result?.data?.data)
                setLoader(false)
                //console.log(result.data.data)
            }).catch((err) => {
                //console.log(err.message)
                setLoader(false)
                if (err?.response.status === 401) {
                    swal({
                        title: "Error!",
                        text: err?.response?.data?.message,
                        type: "error",
                        icon: "error",
                    }).then(function () {
                        navigate("/Login")
                    });
                }
            });


    }, [usertoken])
    const handleCopyCode = (code) => {
        const dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = code;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        swal({
            text: `Code copied to clipboard`,
            type: "success",
            icon: "success",
            buttons: false,
        })
        setTimeout(() => {
            swal.close()
        }, 1000);
    };
    return (
        <div>
            <Header />
            <section className="page-header">
                <div className="page-header-bg"></div>
                <div className="container">
                    <div className="page-header__inner">
                        <div className="innerbanner">
                            <h4 className="text-custom-white no-margin">Special Offers</h4>
                        </div>
                        <h6 className='para_absdasa'>Best quotes for you !!!</h6>
                    </div>
                </div>
            </section>
            <div className='policyrenewals'>
                <div className='container myprofile1 pt-4 pb-4'>
                {loader && (
        <div className="loader-overlay" style={{background:"transparent"}}>
          <div className="loader">
            <CSpinner color="danger" />
          </div>
        </div>
      )}
       <div className={`content ${loader ? 'loading' : ''}`}>

                        <div className='row' style={{ justifyContent: 'center' }}>
                            <div className='col-lg-3 col-md-12 col-sm-12 col-xs-12'>
                                <div className="sidebar">
                                    {/* <Link to="/Mypolicies">
                                        My Policies <span>({policyData?.length ? policyData?.length:0})</span>
                                    </Link>
                                    <Link to="/Pendingpolicies">Pending Policies<span>({pendingPolicyData?.length ? pendingPolicyData?.length:0})</span></Link>
                                    <Link to="/CancelledPolicies">Cancelled Policies<span>({cancelledPolicies?.length ? cancelledPolicies?.length:0})</span></Link>
                                    <Link to="/Policiesrenewal">Renewal <span>({renewalPolicyData?.length ? renewalPolicyData?.length:0})</span></Link>
                                    <Link to="/Claimlist">My Claim <span>({claimsData?.length?claimsData?.lenght:0})</span></Link>
                                    <Link className="active" to="/Specialoffer">Special Offer <span>({policyOffers?.length ? policyOffers?.length:0})</span></Link>
                                    <Link to="/Myprofile">My Profile</Link>
                                    <Link onClick={Logout}>Logout</Link> */}
                                    {/* <Profilenav /> */}
                                    <GroupSidebar />
                                </div>
                            </div>

                            <div className='col-lg-9 col-md-12 col-sm-12 col-xs-12'>

                                <div className='row' id='offers'>
                                    {
                                        policyOffers?.map((item, index) => (

                                            item.status === true ? (
                                                <div key={index} className='col-lg-4 mb-3'>
                                                    <div className="card">
                                                        <div className="image">
                                                            <img src="https://i.imgur.com/DC94rZe.png" width={150} />
                                                        </div>
                                                        <div className="image2">
                                                            <img src="https://i.imgur.com/DC94rZe.png" width={150} />
                                                        </div>
                                                        <h1>{item.discount_amount}</h1>
                                                        <span className="d-block">{item.description}</span>
                                                        <div>
                                                            <div className="mt-4">
                                                                <h2>
                                                                    With Code : <b>{item.discount_code} </b>
                                                                    <i className="fa fa-copy" style={{ color: 'red' }} onClick={() => handleCopyCode(item.discount_code)}></i>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : ('')

                                        ))
                                    }
                                    {/* <div className='row quotes_details pb-3'>
                                            <div className='col-lg-3'>

                                            </div>
                                            <div className='col-lg-6'>
                                                <div className='d-flex justify-content-center'>
                                                    <h4 style={{ fontSize: "19px" }}>{item.description}</h4>
                                                    <h2>{item.discount_amount}</h2>
                                                </div>

                                            </div>

                                        </div> */}
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SpecialOffer
