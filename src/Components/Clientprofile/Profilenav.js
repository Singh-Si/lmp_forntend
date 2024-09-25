// import React, { useEffect, useState } from 'react'
// import Header from '../Common/Header'
// import Footer from '../Common/Footer'
// import { Link, Navigate, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { API_URL } from '../..'
// import swal from 'sweetalert'
// import { UseUserContext } from '../../UserContextAppProvider'
// import { useDispatch } from 'react-redux'


// const Profilenav = () => {
//     const { Logout } = UseUserContext()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [moredetails, setMoreDetails] = useState();
//   const [policyData, setPolicyData] = useState([]);
//   const [pendingPolicyData, setPendingPolicyData] = useState([]);
//   const [renewalPolicyData, setRenewalPolicyData] = useState([]);
//   const [claimsData, setClaimsData] = useState([])
//   const [policyOffers, setPolicyOffers] = useState([])
//   const [cancelledPolicies, setCancelledPolicies] = useState([])
//   const [show, setShow] = useState(false)
//   const [filedata, setFiledata] = useState('')
//   const [loader, setLoader] = useState(false)
//   const [usertoken, setToken] = useState(null);


//   useEffect(() => {
//     // const userToken = localStorage.getItem("usertoken"); 
//     // if(!usertoken){
//     //   window.location.reload()
//     // }
//     // if (userToken) {
//     const token = localStorage.getItem('usertoken');
//     setToken(token)
//     if (token === null || token === undefined || token === '') {
//       navigate('/login')
//     }
//     else {

//       getAllCompletePolicy()
//       getAllPendingPolicy()
//       getAllRenewalPolicy()
//       getAllClaims()
//       getAllOffers()
//       getAllCancelledPolicy()

//     }
//     // }else{
//     //   navigate("/")
//     // }
//   }, [])

//   useEffect(() => {
//     getAllCompletePolicy()
//     getAllPendingPolicy()
//     getAllRenewalPolicy()
//     getAllClaims()
//     getAllOffers()
//     getAllCancelledPolicy()
//   }, [usertoken])



//   const getAllCompletePolicy = () => {
//     try {
//       setLoader(true)
//       axios.get(API_URL + "/api/getAllCompletePolicy")
//         .then((result) => {
//           setPolicyData(result.data?.data)
//           console.log(result.data.data, "complete policy")
//           setLoader(false)
//         }).catch((err) => {
//           //console.log(err.message)
//           setLoader(false)
//           if (err?.response?.status === 401) {
//             swal({
//               title: "Error!",
//               text: err?.response?.data?.message,
//               type: "error",
//               icon: "error",
//             }).then(function () {
//               console.log("error")
//             });
//           }
//         });
//     } catch (error) {
//       console.log(error.message)
//     }
//   }
//   const getAllPendingPolicy = () => {
//     try {
//       axios.get(API_URL + "/api/getAllPendingPolicy")
//         .then((result) => {
//           setPendingPolicyData(result.data?.data)
//         }).catch((err) => {
//           //console.log(err.message)
//           if (err?.response?.status === 401) {
//             swal({
//               title: "Error!",
//               text: err?.response?.data?.message,
//               type: "error",
//               icon: "error",
//             }).then(function () {
//               console.log("error")
//             });
//           }
//         });
//     } catch (error) {
//       console.log(error.message)
//     }
//   }
//   const getAllCancelledPolicy = () => {
//     try {
//       axios.get(API_URL + "/api/getAllCancelledPolicies")
//         .then((result) => {
//           setCancelledPolicies(result.data?.data)
//         }).catch((err) => {
//           //console.log(err.message)
//           if (err?.response?.status === 401) {
//             swal({
//               title: "Error!",
//               text: err?.response?.data?.message,
//               type: "error",
//               icon: "error",
//             }).then(function () {

//             });
//           }
//         });
//     } catch (error) {
//       console.log(error.message)
//     }
//   }
//   const getAllRenewalPolicy = () => {
//     try {
//       axios.get(API_URL + "/api/getAllRenewalPolicy")
//         .then((result) => {
//           setRenewalPolicyData(result.data?.data)
//         }).catch((err) => {
//           //console.log(err.message)
//           if (err?.response?.status === 401) {
//             swal({
//               title: "Error!",
//               text: err?.response?.data?.message,
//               type: "error",
//               icon: "error",
//             }).then(function () {

//             });
//           }
//         });
//     } catch (error) {
//       console.log(error.message)
//     }
//   }
//   const getAllClaims = () => {
//     try {
//       axios.get(API_URL + "/api/getClaims")
//         .then((result) => {
//           //console.log(result.data.data)
//           setClaimsData(result.data.data)
//         }).catch((err) => {
//           //console.log(err.message)
//           if (err?.response?.status === 401) {
//             swal({
//               title: "Error!",
//               text: err?.response?.data?.message,
//               type: "error",
//               icon: "error",
//             }).then(function () {

//             });
//           }
//         });
//     } catch (error) {
//       console.log(error.message)
//     }
//   }
//   const getAllOffers = () => {
//     try {
//       axios.get(API_URL + "/api/get_all_special_offer")
//         .then((result) => {
//           //console.log(result.data.data, "Offer Data")
//           setPolicyOffers(result.data.data)
//         }).catch((err) => {
//           //console.log(err.message)
//           if (err?.response?.status === 401) {
//             swal({
//               title: "Error!",
//               text: err?.response?.data?.message,
//               type: "error",
//               icon: "error",
//             }).then(function () {

//             });
//           }
//         });

//     } catch (error) {
//       console.log(error.message)
//     }
//   }

//   const handleModal = (file) => {
//     setFiledata(file)
//     setShow(true)
//   }
//   const handleDownload = async (filePath, FileName) => {
//     try {
//       const response = await axios.get(filePath, {
//         responseType: 'blob',
//       });
//       const blob = response.data;
//       //console.log(blob)
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', FileName);
//       document.body.appendChild(link);
//       link.click();
//       URL.revokeObjectURL(url);
//       document.body.removeChild(link);
//     } catch (error) {
//       //console.error('Error retrieving file data:', error);
//     }
//   };
//   const Claimform = (lead_id, email, name, number, newId, lob) => {
//     const claimData = {
//       lead_id: lead_id,
//       email: email,
//       name: name,
//       phoneno: number,
//       new_lead: newId,
//       lobId: lob
//     };
//     navigate("/Claimform", { state: { claimData } })
//   }
//   const policyRenewal = (lob, leadid) => {
//     try {
//       if (lob === "Motor") {
//         getCardetailsById(leadid, "Motor").then(async (res) => {
//           await axios
//             .post(API_URL + "/api/getCarEstimatedValue", {
//               model_year: res?.model_year,
//               car_maker: res?.car_maker,
//               car_model: res.car_model,
//               car_variant: res.car_variant,
//             })
//             .then((result) => {

//               let minCarValue, maxCarValue, maxDep = result.data.maxDep, minDep = result.data.minDep, aslider_value
//               let {
//                 finall_submit, ValidYear, your_electric_car, buying_used_car, car_brand_new, polcy_type, policy_id, last_year_policy_type, model_year, car_maker, car_model, car_variant,
//                 policy_issued_date,
//                 policy_expiry_date, BankName, register_area, registration_year, vehicle_specification, name, phoneno, date_of_birth, email, nationality, drivingexp,
//                 drivingexpinuae, last_year_claim, nature_of_plan_id, current_renewal, claims_certificate_from_issurer, repaire_type_name, your_existing_policy_expired, last_year_claim_certificate_year, business_type
//               } = res
//               if (result.data.minCarValue > result.data.maxCarValue) {
//                 minCarValue = result.data.maxCarValue
//                 maxCarValue = result.data.minCarValue
//                 aslider_value = minCarValue

//               } else {
//                 minCarValue = result.data.minCarValue
//                 maxCarValue = result.data.maxCarValue
//                 aslider_value = minCarValue
//               }
//               dispatch(AddMotoformRenewelData({
//                 leadid, maxDep, minDep, minCarValue, maxCarValue, finall_submit, ValidYear, your_electric_car, buying_used_car, car_brand_new, polcy_type, policy_id, last_year_policy_type, model_year, car_maker, car_model, car_variant,
//                 leadid, policy_issued_date, policy_expiry_date, BankName, register_area, registration_year, vehicle_specification, name, phoneno, date_of_birth, email, nationality, drivingexp,
//                 drivingexpinuae, last_year_claim, nature_of_plan_id, current_renewal, claims_certificate_from_issurer, repaire_type_name, your_existing_policy_expired, last_year_claim_certificate_year, business_type, aslider_value

//               }))

             
//             }).catch((err) => {
//               console.log(err.message)
//             }
//             )


//         }).catch((error) => {
//           console.log("error", error)
//         })

//         // navigate(`/QuotesById?renewal=Motor&leadid=${leadid}`)
//       } else if (lob === "Travel") {
//         getCardetailsById(leadid, "Travel").then(async (res) => {
//           let { finall_submit, policy_id, policy_issued_date, policy_expiry_date, name, phoneno, email
//           } = res
//           dispatch(AddMotoformRenewelData({
//             leadid, finall_submit, policy_id, policy_issued_date, policy_expiry_date, name, phoneno, email
//           }))
//         }).catch((error) => {
//           console.log("error", error)
//         })
//         navigate("/Travelquotes?renewal=Travel")
//       } else if (lob === "Home") {
//         getCardetailsById(leadid, "Home").then(async (res) => {
//           let { finall_submit, policy_id, policy_issued_date, policy_expiry_date, name, phoneno, email
//           } = res
//           dispatch(AddMotoformRenewelData({
//             leadid, finall_submit, policy_id, policy_issued_date, policy_expiry_date, name, phoneno, email
//           }))
//         }).catch((error) => {
//           console.log("error", error)
//         })
//         navigate("/Homequotes?renewal=Home")
//       } else if (lob === "Medical") {
//         getCardetailsById(leadid, "Medical").then(async (res) => {
//           let { finall_submit, policy_id, policy_issued_date, policy_expiry_date, name, phoneno, email
//           } = res
//           dispatch(AddMotoformRenewelData({
//             leadid, finall_submit, policy_id, policy_issued_date, policy_expiry_date, name, phoneno, email
//           }))
//         }).catch((error) => {
//           console.log("error", error)
//         })
//         navigate("/Marinerenewal?renewal=Medical")
//       } else if (lob === "Yacht") {
//         getCardetailsById(leadid, "Yacht").then(async (res) => {
//           let { finall_submit, policy_id, policy_issued_date, policy_expiry_date, name, phoneno, email
//           } = res
//           dispatch(AddMotoformRenewelData({
//             leadid, finall_submit, policy_id, policy_issued_date, policy_expiry_date, name, phoneno, email
//           }))
//         }).catch((error) => {
//           console.log("error", error)
//         })
//         navigate("/Yachtquotes?renewal=Yacht")
//       }
//       //console.log(lob)
//     } catch (error) {
//       console.log(error.message)
//     }

//   }

//   return (
//     <div>
//          {/* <div className='col-lg-3 col-md-12 col-sm-12 col-xs-12'>
//                 <div className="sidebar"> */}
//                  <Link className={location.pathname == "/Mypolicies" ? "active" : ""} to="/Mypolicies">
//                     My Policies <span>({policyData?.length ? policyData?.length : 0})</span>
//                   </Link>
//                   <Link className={location.pathname == "/Pendingpolicies" ? "active" : ""} to="/Pendingpolicies">
//                     Pending Policies<span>({pendingPolicyData?.length ? pendingPolicyData?.length : 0})</span>
//                     </Link>
//                   <Link className={location.pathname == "/CancelledPolicies" ? "active" : ""} to="/CancelledPolicies">
//                     Cancelled Policies<span>({cancelledPolicies?.length ? cancelledPolicies?.length : 0})</span>
//                     </Link>
//                   <Link className={location.pathname == "/Policiesrenewal" ? "active" : ""} to="/Policiesrenewal">
//                     Renewal <span>({renewalPolicyData?.length ? renewalPolicyData?.length : 0})</span>
//                     </Link>
//                   <Link className={location.pathname == "/Claimlist" ? "active" : ""} to="/Claimlist">
//                     My Claim <span>({claimsData?.length ? claimsData?.length : 0})</span>
//                     </Link>
//                   <Link className={location.pathname == "/Specialoffer" ? "active" : ""} to="/Specialoffer">
//                     Special Offer <span>({policyOffers?.length ? policyOffers?.length : 0})</span>
//                     </Link>
//                   <Link className={location.pathname == "/Myprofile" ? "active" : ""} to="/Myprofile">
//                     My Profile
//                     </Link>
//                   <Link onClick={Logout}>Logout</Link>
//                 {/* </div>
//               </div> */}
//     </div>
//   )
// }

// export default Profilenav