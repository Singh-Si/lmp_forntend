import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import finance from '../../Image/finance.svg'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UseUserContext } from '../../UserContextAppProvider'
import { API_URL } from '../..'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { set } from 'firebase/database'
import { CSpinner } from '@coreui/react'
import Profilenav from './Profilenav'
import GroupSidebar from '../Groupinsurance/GroupSidebar'
const Claimlist = () => {
  const navigate = useNavigate()
  const { usertoken, Logout } = UseUserContext()
  const [startDate, setStartDate] = useState();
  const [policyData, setPolicyData] = useState([]);
  const [pendingPolicyData, setPendingPolicyData] = useState([]);
  const [renewalPolicyData, setRenewalPolicyData] = useState([]);
  const [claimsData, setClaimsData] = useState([])
  const [cancelledPolicies, setCancelledPolicies] = useState([])
  const [policyOffers, setPolicyOffers] = useState([])
  const [loader,setLoader] = useState(false)
  useEffect(() => {
    getAllCompletePolicy()
    getAllPendingPolicy()
    getAllRenewalPolicy()
    getAllClaims()
    getAllOffers()
    getAllCancelledPolicy()
  }, [])
  useEffect(() => {
    getAllCompletePolicy()
    getAllPendingPolicy()
    getAllRenewalPolicy()
    getAllClaims()
    getAllOffers()
    getAllCancelledPolicy()
  }, [usertoken])
  const getAllCompletePolicy = () => {
    try {
      axios.get(API_URL + "/api/getAllCompletePolicy")
        .then((result) => {
          setPolicyData(result.data.data)
          
          //console.log(result.data.data, "complete policy")
        }).catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {
              console.log("error")
            });
          }
        });
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAllPendingPolicy = () => {
    try {
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
              console.log("error")
            });
          }
        });
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAllCancelledPolicy = () => {
    try {
      axios.get(API_URL + "/api/getAllCancelledPolicies")
        .then((result) => {
          setCancelledPolicies(result.data.data)
        }).catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {

            });
          }
        });
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAllRenewalPolicy = () => {
    try {
      axios.get(API_URL + "/api/getAllRenewalPolicy")
        .then((result) => {
          setRenewalPolicyData(result.data.data)
        }).catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {

            });
          }
        });
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAllClaims = () => {
    try {
      setLoader(true)
      axios.get(API_URL + "/api/getClaims")
        .then((result) => {
          //console.log(result.data.data)
          setClaimsData(result.data.data)
          setLoader(false)
        }).catch((err) => {
          setLoader(false)
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {

            });
          }
        });
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAllOffers = () => {
    try {
      axios.get(API_URL + "/api/get_all_special_offer")
        .then((result) => {
          //console.log(result.data.data, "Offer Data")
          setPolicyOffers(result.data.data)
        }).catch((err) => {
          //console.log(err.message)
          if (err?.response?.status === 401) {
            swal({
              title: "Error!",
              text: err?.response?.data?.message,
              type: "error",
              icon: "error",
            }).then(function () {

            });
          }
        });

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <Header />
      <section className="page-header">
        <div className="page-header-bg"></div>
        <div className="container">
          <div className="page-header__inner">
            <div className="innerbanner">
              <h4 className="text-custom-white no-margin">My Claims List</h4>
            </div>
            <h6 className='para_absdasa'>Best quotes for you !!!</h6>
          </div>
        </div>
      </section>
      <div className='myprofile'>
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
                {/* <Link to="/Mypolicies">My Policies <span>({policyData?.length ? policyData?.length:0})</span></Link>
                <Link to="/Pendingpolicies">Pending Policies<span>({pendingPolicyData?.length ? pendingPolicyData?.length:0})</span></Link>
                <Link to="/CancelledPolicies">Cancelled Policies<span>({cancelledPolicies?.length ? cancelledPolicies?.length:0})</span></Link>
                <Link to="/Policiesrenewal">Renewal <span>({renewalPolicyData?.length ? renewalPolicyData?.length:0})</span></Link>
                <Link className="active" to="/Claimlist">My Claim <span>({claimsData?.length ? claimsData?.length:0})</span></Link>
                <Link to="/Specialoffer">Special Offer <span>({policyOffers?.length ? policyOffers?.length:0})</span></Link>
                <Link to="/Myprofile">My Profile</Link>
                <Link onClick={Logout}>Logout</Link> */}
                {/* <Profilenav/> */}
                <GroupSidebar />
              </div>
            </div>
            <div className='col-lg-9 col-md-12 col-sm-12 col-xs-12'>
              {
                claimsData?.map((item, index) => (
                  <div key={index} className='row quotes_details pb-3 mb-4' style={{borderBottom:'solid #0D2F92 1px'}}>
                    <div className='col-lg-3 quotesmobile'>
                      <img src={`${API_URL}/uploads/${item.companyDetails.company_logo[0]?.filename}`} />
                      <h6 className="companyname">{item.companyDetails?.company_name}</h6>
                    </div>
                    <div className='col-lg-7 quotemobile'>
                      <h4 style={{ fontSize: "19px" }}>{item.planDetails?.plan_name}</h4>
                      <ul className='benefits'>
                        <li>Own Damage Cover :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.additional_cover_arr.map((val, indx) => (val.additional_cover_label))}</span></li>
                        <li>Excess :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.excess} AED </span></li>
                        <li>Third Party Limit :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.additional_cover_arr.map((val, indx) => (val.additional_cover_desc))}</span></li>
                        <li>Expiry Date :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.leadsDetails[0]?.policy_expiry_date?.slice(0, 10)}</span></li>
                      </ul>
                    </div>
                    <div className='col-lg-2 action_abcd quotesmobile'>
                      <h2>{item.leadsDetails[0].paymentStatus}</h2>
                      {/* <Link to="/"><button style={{ marginTop: '50px' }} className='submit_select'>View Details</button></Link> */}
                    </div>
                  </div>
                )
                )
              }
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Claimlist