import React, { useState, useEffect } from "react";
import "./App.css";
import "./Responsive.css";
import AOS from "aos";
import "aos/dist/aos.css";
import io  from "socket.io-client";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import ChatRoom from "./Components/ChatBox/ChatRoom";
import Chasisno from "./Components/Chasis/Chasisno";
import Carbasicinfo from "./Components/Carinfo/Carbasicinfo";
import Carpolicyinfo from "./Components/Carinfo/Carpolicyinfo";
import Carmodelyear from "./Components/Carinfo/Carmodelyear";
import Carmaker from "./Components/Carinfo/Carmaker";
import Carvariant from "./Components/Carinfo/Carvariant";
import Carmodel from "./Components/Carinfo/Carmodel";
import Carregisterlocation from "./Components/Carinfo/Carregisterlocation";
import Carspecification from "./Components/Carinfo/Carspecification";
import Personaldetails from "./Components/Userdetails/Personaldetails";
import Nationality from "./Components/Userdetails/Nationality";
import Uaedrivingexp from "./Components/Userdetails/Uaedrivingexp";
import Lastclaim from "./Components/Userdetails/Lastclaim";
import Getquote from "./Components/Userdetails/Getquote";
import Quotes from "./Components/Quotes/Quotes";
import Comparision from "./Components/Quotes/Comparision";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Vehicledetails from "./Components/Quotes/Vehicledetails";
import Cancelpolicy from "./Components/Payments/Cancelpolicy";
import Selectedquotes from "./Components/Quotes/Selectedquotes";
import Payments from "./Components/Payments/Payments";
import Familydetails from "./Components/Travel/Familydetails";
import Beneficarydetails from "./Components/Travel/Beneficarydetails";
import Termsandcondition from "./Components/Travel/Termsandcondition";
import Yachtdetails from "./Components/Yacht/Yachtdetails";
import Yachtpersonaldetails from "./Components/Yacht/Yachtpersonaldetails";
import Enginedetails from "./Components/Yacht/Enginedetails";
import Suminsured from "./Components/Yacht/Suminsured";
import Territorycoverage from "./Components/Yacht/Territorycoverage";
import Claimsexperience from "./Components/Yacht/Claimsexperience";
import Yachtquotes from "./Components/Yacht/Yachtquotes";
import Homeinsurance from "./Components/Home/Homeinsurance";
import Homevalue from "./Components/Home/Homevalue";
import Homehelper from "./Components/Home/Homehelper";

import Homepersonaldetails from "./Components/Home/Homepersonaldetails";
import Homecondition from "./Components/Home/Homecondition";
import Homecondition2 from "./Components/Home/Homecondition2";
import Homeplan from "./Components/Home/Homeplan";
import Homequotes from "./Components/Home/Homequotes";
import Homeadditionaldetails from "./Components/Home/Homeadditionaldetails";
import Homeselectedquotes from "./Components/Home/Homeselectedquotes";
import Homecompare from "./Components/Home/Homecompare";
import Homecomparelist from "./Components/Home/Homecomparelist";
import HomePayment from "./Components/Home/HomePayments";
import Homeaddress from "./Components/Home/Homeaddress";
import Otherinsurance from "./Components/Otherinsurance/Otherinsurance";
import Mypolicies from "./Components/Clientprofile/Mypolicies";
import Myprofile from "./Components/Clientprofile/Myprofile";
import Claimlist from "./Components/Clientprofile/Claimlist";
import Policiesrenewal from "./Components/Clientprofile/Policiesrenewal";
import Pendingpolicies from "./Components/Clientprofile/Pendingpolicies";
import Claimform from "./Components/Clientprofile/Claimform";
import Otherinsurancesubmit from "./Components/Otherinsurance/Otherinsurancesubmit";
import Individualcountry from "./Components/Individualinsurance/Individualcountry";
import Individualinsurancepersonaldetails from "./Components/Individualinsurance/Individualinsurancepersonaldetails";
import Individualinsuranceids from "./Components/Individualinsurance/Individualinsuranceids";
import Individualinsurancequotes from "./Components/Individualinsurance/Individualinsurancequotes";
import Individualinsurancequote from "./Components/Individualinsurance/Individualinsurancequote";
import Individualinsurancesymptoms from "./Components/Individualinsurance/Individualinsurancesymptoms";
import Individualinsurancepersonaldetails1 from "./Components/Individualinsurance/Individualinsurancepersonaldetails1";
import Individualinsurancepersonaldetails2 from "./Components/Individualinsurance/Individualinsurancepersonaldetails2";
import Individualinsurancepersonaldetails3 from "./Components/Individualinsurance/Individualinsurancepersonaldetails3";
// import Individualinsurancepersonaldetails4 from "./Components/Individualinsurance/Individualinsurancepersonaldetails4";
import Individualinsurancematernity from "./Components/Individualinsurance/Individualinsurancematernity";
import Individualinsuranceunderwriting from "./Components/Individualinsurance/Individualinsuranceunderwriting";
import Individualinsurancepersonaldetails6 from "./Components/Individualinsurance/Individualinsurancepersonaldetails6";
import Individualthankyou from "./Components/Individualinsurance/Individualthankyou";
import Individualcompare from "./Components/Individualinsurance/Individualcompare";
import Individualselectedquote from "./Components/Individualinsurance/Individualselectedquote";
import Individualpayment from "./Components/Individualinsurance/Individualpayment";
import Individualmetrics from "./Components/Individualinsurance/Individualmetrics";
import Individualstandardconditions from "./Components/Individualinsurance/Individualstandardconditions";
import Forgetpassword from "./Components/Login/Forgetpassword";
import ResetPassword from "./Components/Login/ResetPassword";
import VerifyEmail from "./Components/Login/VerifyEmail";
import { UseUserContext } from "./UserContextAppProvider";
import ThankYou from "./ThankYou/ThankYou";
import Traveldetails from "./Components/Travel/Traveldetails";
import Traveldetailsform from "./Components/Travel/Traveldetailsform";
import Travelpersonalform from "./Components/Travel/Travelpersonalform";
import Travelquotes from "./Components/Travel/Travelquotes";
import TravelSelectedquotes from "./Components/Travel/TravelSelectedquotes";
import TravelComparelist from "./Components/Travel/TravelComparelist";
import Travelcomparision from "./Components/Travel/Travelcomparision";
import TravelPayments from "./Components/Travel/TravelPayments";

import TravelThankyou from "./Components/Travel/ThankYou";

import SpecialOffer from "./Components/Clientprofile/SpecialOffer";
import Privacypolicy from "./Components/Common/Privacypolicy";
import Disclaimer from "./Components/Common/Disclaimer";
import Termsandcond from "./Components/Common/Termsandcond";
import Contactus from "./Components/Common/Contactus";
import Complain from "./Components/Common/Complain";
import Scrolltotop from "./Components/Common/Scrolltotop";
import Claimpolicy from "./Components/Payments/Claimpolicy";
import SelectCarvalue from "./Components/Carinfo/SelectCarvalue";
import SubmitDocument from "./ThankYou/SubmitDocument";
import CancelledPolicies from "./Components/Clientprofile/CancelledPolicies";
import Travelplantype from "./Components/Travel/Travelplantype";
import Individualpolicy from "./Components/Individualinsurance/Individualpolicy";
import Individualcondition from "./Components/Individualinsurance/Individualcondition";
import Individualtnc from "./Components/Individualinsurance/Individualtnc";
import axios from "axios";
import Helpsandtips from "./Components/Common/Helpsandtips";
import QuotesById from "./Components/Quotes/QuotesById";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from ".";
import swal from "sweetalert";
import { UseMotorContext } from "./MultiStepContextApi";
import Groupinsurance from "./Components/Groupinsurance/Groupinsurance";
import Groupinsurancesubmit from "./Components/Groupinsurance/Groupinsurancesubmit";
import YachtMaker from "./Components/Yacht/YachtMaker";
import YachtlYear from "./Components/Yacht/YachtlYear";
import YachtComparision from "./Components/Yacht/YachtComparision";
import YachtSelectedquotes from "./Components/Yacht/YachtSelectedquotes";
import YachtPayments from "./Components/Yacht/YachtPayments";
import YachtVarient from "./Components/Yacht/YachtVarient";
import Individualinsurancepersonaldetails4 from "./Components/Individualinsurance/Individualinsurancematernity";
import OpearatorExperience from "./Components/Yacht/Operaterexperience";

import AddMembers from "./Components/Groupinsurance/AddMembers";
import AddMembersmanually from "./Components/Groupinsurance/AddMembersmanually";
import ViewMembers from "./Components/Groupinsurance/ViewMember";
import MemberApproval from "./Components/Groupinsurance/MemberApproval";
import UpdateMissingDocuments from "./Components/Groupinsurance/UpdateMissingDocuments";
import NewlyAddedMember from "./Components/Groupinsurance/NewlyAddedMember";
import DeletedMembers from "./Components/Groupinsurance/DeletedMembers";
import ActiveMemberView from "./Components/Groupinsurance/ActiveMemberView";
import AddMembersExcel from "./Components/Groupinsurance/AddMembersExcel";
import ActiveMember from "./Components/Groupinsurance/ActiveMember";
import DeletedMembersView from "./Components/Groupinsurance/DeletedMembersView";
import NewlyAddedMembersView from "./Components/Groupinsurance/NewlyAddedMembersView";
import MemberDocuments from "./Components/Groupinsurance/MemberDocuments";
import MemberApprovalView from "./Components/Groupinsurance/MemberApprovalView";
import AddMembersdocument from "./Components/Groupinsurance/AddMembersdocument";
import GroupClaimsExperience from "./Components/Groupinsurance/GroupClaimsExperience";
import GroupClaimHandlingProcedure from "./Components/Groupinsurance/GroupClaimHandlingProcedure";
import GroupClaimRatio from "./Components/Groupinsurance/GroupClaimRatio";
import GroupClaimsSubmission from "./Components/Groupinsurance/GroupClaimsSubmission";
import GroupClaimsSummary from "./Components/Groupinsurance/GroupClaimsSummary";
import GroupClaimsStatus from "./Components/Groupinsurance/GroupClaimsStatus";
import GroupClaimExperienceView from "./Components/Groupinsurance/GroupClaimExperienceView";
import GroupClaimRatioView from "./Components/Groupinsurance/GroupClaimRatioView";
import GroupClaimStatusview from "./Components/Groupinsurance/GroupClaimStatusview";
import DetailedReportRequest from "./Components/Groupinsurance/DetailedReportRequest";
import OtherMemberList from "./Components/Groupinsurance/OtherMemberList";
import TatOnCard from "./Components/Groupinsurance/TatOnCard";
import TatOnSettlememt from "./Components/Groupinsurance/TatOnSettlememt";
import UsefulLinks from "./Components/Groupinsurance/UsefulLinks";
import MostCommonOversights from "./Components/Groupinsurance/MostCommonOversights";
import GroupMedicalPolicy from "./Components/Groupinsurance/GroupMedicalPolicy";
import GroupPolicyClaims from "./Components/Groupinsurance/GroupPolicyClaims";
import GroupPolicyRenewal from "./Components/Groupinsurance/GroupPolicyRenewal";
import VerifyOtp from "./Components/Login/VerifyOtp";
import MotorInsurancedetails from "./Components/Common/MotorInsurancedetails";
import NotFound from "./NotFound";
// let socket = io('http://localhost:8000');
import Knowmorecontent from "./Components/Knowmore/Knowmorecontent";

let userType = 'unregistered'
function App() {
  // const { usertoken } = UseUserContext()
  const usertoken = localStorage.getItem("usertoken"); // Get the user token
  const { isLoading } = UseMotorContext()
  useEffect(() => {
    
    if (usertoken) {
      userType = 'registered'
      // axios.defaults.headers.common["Authorization"]="Bearer "+"eyJhbGcuOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2EyZjIxNTk3NzgwZjdjNWM2ZTJhMCIsImlhdCI6MTY5MDk4MDY5OX0.ELyRLN8yvArfnAomj1tCu1gaCKJO-aDV7sPKAfdXUG0"
      axios.defaults.headers.common["Authorization"] = "Bearer " + usertoken
      axios.defaults.baseURL = API_URL + "/api/"
    }
  }, [usertoken])
  
  
  
  
  useEffect(() => {
    checkBlockedStatus()
    const socket = io('http://localhost:8000', {
      query: {
        userType: userType, // or 'unregistered'
      },
    })
    my_visit()
  //  alert(document.visibilityState)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Logic to capture when the user leaves the page
        fetch('http://localhost:8000/api/User_Left', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify({ userId: 'user123' })
        });
      }
      
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
 
  const checkBlockedStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/check-blocked-status');

      if (response.status === 403) {
        alert('Your IP is blocked from accessing this site.')
        let loc = window.location.href
        if (!loc.includes('access-denied')) {
        window.location.replace("/access-denied")
        }
        
      }
    } catch (error) {
      console.error('Error checking blocked status:', error);
    }
  };
  const my_visit = () => {
    try {
      
      const reqOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      fetch(`http://localhost:8000/api/clients_visit`, reqOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.message)
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="App">
      <div>
        {isLoading ? (
          <div className="body_loader">
            <div className="spinner"></div>
          </div>
        ) : (
          <BrowserRouter>
            <Routes>
                <Route path="/thankyou" element={<ThankYou />} />
                <Route path= "/access-denied" element={<NotFound/>}/>
              <Route path="/chasisno" element={<Chasisno />} />
              <Route path="/Carbasicinfo" element={<Carbasicinfo />} />
              <Route path="/Carpolicyinfo" element={<Carpolicyinfo />} />
              <Route path="/Carmodelyear" element={<Carmodelyear />} />
              <Route path="/Carmaker" element={<Carmaker />} />
              <Route path="/Carmodel" element={<Carmodel />} />
              <Route path="/Carvariant" element={<Carvariant />} />
              <Route
                path="/Carregisterlocation"
                element={<Carregisterlocation />}
              />
              <Route path="/Carspecification" element={<Carspecification />} />
              <Route path="/Personaldetails" element={<Personaldetails />} />
              <Route path="/Nationality" element={<Nationality />} />
              <Route path="/Uaedrivingexp" element={<Uaedrivingexp />} />
              <Route path="/Lastclaim" element={<Lastclaim />} />
              <Route path="/Getquote" element={<Getquote />} />
              <Route path="/Quotes" element={<Quotes />} />
              <Route path="/QuotesById" element={<QuotesById />} />
              <Route path="/Comparision" element={<Comparision />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Forgetpassword" element={<Forgetpassword />} />
              <Route path="/Vehicledetails" element={<Vehicledetails />} />
              <Route path="/Cancelpolicy" element={<Cancelpolicy />} />
              <Route path="/Selectedquotes" element={<Selectedquotes />} />
              <Route path="/Payments" element={<Payments />} />
              <Route path="/Familydetails" element={<Familydetails />} />
              <Route path="/Beneficarydetails" element={<Beneficarydetails />} />
              <Route path="/Termsandcondition" element={<Termsandcondition />} />
              <Route path="/TravelThankyou" element={<TravelThankyou />} />
              <Route path="/Yachtdetails" element={<Yachtdetails />} />
              <Route
                path="/Yachtpersonaldetails"
                element={<Yachtpersonaldetails />}
              />
              <Route path="/Enginedetails" element={<Enginedetails />} />
              <Route path="/YachtComparision" element={<YachtComparision />} />
              <Route path="/YachtSelectedquotes" element={<YachtSelectedquotes />} />
              <Route path="/Suminsured" element={<Suminsured />} />
              <Route path="/Territorycoverage" element={<Territorycoverage />} />
              <Route path="/CancelledPolicies" element={<CancelledPolicies />} />
              <Route path="/SubmitDocument" element={<SubmitDocument />} />
              <Route path="/Claimsexperience" element={<Claimsexperience />} />
              <Route path="/OpearatorExperience" element={<OpearatorExperience />} />
              <Route path="/Yachtquotes" element={<Yachtquotes />} />
              <Route path="/YachtPayments" element={<YachtPayments />} />
              <Route path="/YachtVarient" element={<YachtVarient />} />
              <Route path="/Homeinsurance" element={<Homeinsurance />} />
              <Route path="/Homeplan" element={<Homeplan />} />

              <Route path="/Homevalue" element={<Homevalue />} />
              <Route path="/Homehelper" element={<Homehelper />} />

              <Route
                path="/Homepersonaldetails"
                element={<Homepersonaldetails />}
              />
              <Route path="/Homeaddress" element={<Homeaddress />} />
              <Route path="/Homecondition" element={<Homecondition />} />
              <Route path="/Homecondition2" element={<Homecondition2 />} />

              <Route path="/Homequotes" element={<Homequotes />} />
              <Route
                exact
                path="/Homeselectedquotes"
                element={<Homeselectedquotes />}
              />
              <Route exact path="/Homecompare" element={<Homecompare />} />
              <Route
                exact
                path="/Homecomparelist"
                element={<Homecomparelist />}
              />
              <Route
                path="/Homeadditionaldetails"
                element={<Homeadditionaldetails />}
              />
              <Route path="/Homecompare" element={<Homecompare />} />
              <Route path="/HomePayment" element={<HomePayment />} />
              <Route path="/Otherinsurance" element={<Otherinsurance />} />
              <Route
                path="/Otherinsurancesubmit"
                element={<Otherinsurancesubmit />}
              />
              <Route
                path="/Individualinsurancepersonaldetails"
                element={<Individualinsurancepersonaldetails />}
              />
              <Route path="/Individualcountry" element={<Individualcountry />} />
              <Route
                path="/Individualinsuranceids"
                element={<Individualinsuranceids />}
              />
              <Route
                path="/Individualinsurancequotes"
                element={<Individualinsurancequotes />}
              />
              <Route
                path="/Individualinsurancesymptoms"
                element={<Individualinsurancesymptoms />}
              />
              <Route
                path="/Individualinsurancepersonaldetails1"
                element={<Individualinsurancepersonaldetails1 />}
              />
              <Route
                path="/Individualinsurancepersonaldetails2"
                element={<Individualinsurancepersonaldetails2 />}
              />
              <Route
                path="/Individualinsurancepersonaldetails3"
                element={<Individualinsurancepersonaldetails3 />}
              />
              <Route
                path="/Individualinsurancepersonaldetails4"
                element={<Individualinsurancepersonaldetails4 />}
              />
              <Route
                path="/Individualinsurancepersonaldetails6"
                element={<Individualinsurancepersonaldetails6 />}
              />
              <Route
                path="/Individualinsurancematernity"
                element={<Individualinsurancematernity />}
              />
              <Route
                path="/Individualinsuranceunderwriting"
                element={<Individualinsuranceunderwriting />}
              />
              <Route
                path="/Individualinsurancequote"
                element={<Individualinsurancequote />}
              />
              <Route path="/Individualpolicy" element={<Individualpolicy />} />
              {/* <Route
                path="/Individualadditionaldetails"
                element={<Individualadditionaldetails />}
              /> */}
              <Route
                path="/Individualselectedquote"
                element={<Individualselectedquote />}
              />

              <Route path="/Individualcompare" element={<Individualcompare />} />

              <Route
                path="/Individualcondition"
                element={<Individualcondition />}
              />

              <Route path="/Individualtnc" element={<Individualtnc />} />

              <Route path="/Individualmetrics" element={<Individualmetrics />} />

              <Route
                path="/Individualthankyou"
                element={<Individualthankyou />}
              />
              <Route path="/Individualstandardconditions" element={<Individualstandardconditions />} />

              <Route path="/Individualpayment" element={<Individualpayment />} />
              <Route path="/ResetPassword/:token" element={<ResetPassword />} />
              <Route path="/emailverify/:token" element={<VerifyEmail />} />
              <Route path="/Traveldetails" element={<Traveldetails />} />
              <Route path="/Traveldetailsform" element={<Traveldetailsform />} />
              <Route
                path="/Travelpersonalform"
                element={<Travelpersonalform />}
              />
              <Route path="/Familydetails" element={<Familydetails />} />
              <Route path="/Beneficarydetails" element={<Beneficarydetails />} />
              <Route path="/Travelquotes" element={<Travelquotes />} />
              <Route path="/Travelcomparision" element={<Travelcomparision />} />
              <Route
                path="/TravelSelectedquotes"
                element={<TravelSelectedquotes />}
              />
              <Route path="/TravelComparelist" element={<TravelComparelist />} />
              <Route path="/Termsandcondition" element={<Termsandcondition />} />
              <Route path="/Travelplantype" element={<Travelplantype />} />
              <Route path="/TravelPayments" element={<TravelPayments />} />
              <Route path="/ThankYou" element={<ThankYou />} />
              {/* Dashboard */}

              {/* <Route
              path="/Mypolicies"
              element={usertoken ? <Mypolicies /> : <Navigate replace to="/" />}
            />
            <Route
              path="/Myprofile"
              element={usertoken ? <Myprofile /> : <Navigate replace to="/" />}
            />
            <Route
              path="/Claimlist"
              element={usertoken ? <Claimlist /> : <Navigate replace to="/" />}
            />
            <Route
              path="/Policiesrenewal"
              element={
                usertoken ? <Policiesrenewal /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="/Pendingpolicies"
              element={
                usertoken ? <Pendingpolicies /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="/Claimform"
              element={usertoken ? <Claimform /> : <Navigate replace to="/" />}
            /> */}
              <Route
                path="/Mypolicies"
                element={<Mypolicies />}
              />
              <Route
                path="/Myprofile"
                element={<Myprofile />}
              />
              <Route
                path="/Claimlist"
                element={<Claimlist />}
              />
              <Route
                path="/Policiesrenewal"
                element={<Policiesrenewal />
                }
              />
              <Route path="/Pendingpolicies"
                element={<Pendingpolicies />} />
              <Route

                path="/Claimform" element={<Claimform />} />
              <Route path="/SelectCarvalue" element={<SelectCarvalue />} />
              <Route path="/Specialoffer" element={<SpecialOffer />} />
              <Route path="/Privacypolicy" element={<Privacypolicy />} />
              <Route path="/Disclaimer" element={<Disclaimer />} />
              <Route path="/Termsandcond" element={<Termsandcond />} />
              <Route path="/Contactus" element={<Contactus />} />
              <Route path="/Complain" element={<Complain />} />
              <Route path="/Scrolltotop" element={<Scrolltotop />} />
              <Route path="/Claimpolicy" element={<Claimpolicy />} />
              <Route path="/Helpsandtips" element={<Helpsandtips />} />
              <Route path="/" element={<Home />} />
              <Route path="/:token" element={<Home />} />
              <Route path="/Groupinsurance" element={<Groupinsurance />} />
              <Route path="/Groupinsurancesubmit" element={<Groupinsurancesubmit />} />
              <Route path="/YachtMaker" element={<YachtMaker />} />
              <Route path="/YachtlYear" element={<YachtlYear />} />

              <Route path="/AddMembers" element={<AddMembers />} />
              <Route path="/AddMembersmanually" element={<AddMembersmanually />} />
              <Route path="/ViewMembers" element={<ViewMembers />} />
              <Route path="/ActiveMember" element={<ActiveMember />} />
              <Route path="/ActiveMemberView" element={<ActiveMemberView />} />
              <Route path="/DeletedMembers" element={<DeletedMembers />} />
              <Route path="/DeletedMembersView" element={<DeletedMembersView />} />
              <Route path="/MemberApproval" element={<MemberApproval />} />
              <Route path="/MemberApprovalView" element={<MemberApprovalView />} />
              <Route path="/UpdateMissingDocuments" element={<UpdateMissingDocuments />} />
              <Route path="/NewlyAddedMember" element={<NewlyAddedMember />} />
              <Route path="/NewlyAddedMembersView" element={<NewlyAddedMembersView />} />
              <Route path="/AddMembersExcel" element={<AddMembersExcel />} />
              <Route path="/MemberDocuments" element={<MemberDocuments />} />
              <Route path="/AddMembersdocument" element={<AddMembersdocument />} />
              <Route
                path="/GroupClaimsExperience"
                element={<GroupClaimsExperience />}
              />
              <Route
                path="/GroupClaimHandlingProcedure"
                element={<GroupClaimHandlingProcedure />}
              />
              <Route path="/GroupClaimRatio" element={<GroupClaimRatio />} />
              <Route
                path="/GroupClaimsSubmission"
                element={<GroupClaimsSubmission />}
              />
              <Route
                path="/GroupClaimsSummary"
                element={<GroupClaimsSummary />}
              />
              <Route
                path="/GroupClaimsStatus"
                element={<GroupClaimsStatus />}
              />
              <Route
                path="/GroupClaimExperienceView"
                element={<GroupClaimExperienceView />}
              />
              <Route
                path="/GroupClaimRatioView"
                element={<GroupClaimRatioView />}
              />
              <Route
                path="/GroupClaimStatusview"
                element={<GroupClaimStatusview />}
              />
              <Route
                path="/DetailedReportRequest"
                element={<DetailedReportRequest />}
              />
              <Route
                path="/OtherMemberList"
                element={<OtherMemberList />}
              />
              <Route
                path="/TatOnCard"
                element={<TatOnCard />}
              />
              <Route
                path="/TatOnSettlememt"
                element={<TatOnSettlememt />}
              />
              <Route
                path="/UsefulLinks"
                element={<UsefulLinks />}
              />
              <Route
                path="/MostCommonOversights"
                element={<MostCommonOversights />}
              />
              <Route
                path="/GroupMedicalPolicy"
                element={<GroupMedicalPolicy />}
              />
              <Route
                path="/GroupPolicyClaims"
                element={<GroupPolicyClaims />}
              />
              <Route
                path="/GroupPolicyRenewal"
                element={<GroupPolicyRenewal />}
              />
              <Route
                path="/VerifyOtp"
                element={<VerifyOtp />}
              />
                <Route
                  path="/MotorInsurancedetails"
                  element={<MotorInsurancedetails />}
                />
                <Route
                  path="/Knowmorecontent"
                  element={<Knowmorecontent />}
                />
            </Routes>

            {/* <ChatRoom /> */}
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
