import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import GroupMedical from '../Banner/GroupMedical'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import GroupSidebar from './GroupSidebar'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../..'
import * as XLSX from 'xlsx'
import swal from 'sweetalert'
import { CSpinner } from '@coreui/react'
import DatePicker from 'react-date-picker'

const AddMembersmanually = () => {
    const Navigate = useNavigate();

    const [companyList, setCompanyList] = useState([]);
    const [TPAData, setTPAData] = useState([]);
    const [networkData, setNetworkData] = useState([]);
    const [planList, setPlanList] = useState([]);
    const [nationalityData, setNationalityData] = useState([]);
    const [pollicynumberlist, setPollicynumberlist] = useState([]);
    const [policyNumber, SetpolicyNumber] = useState('');
    const [loader, setLoader] = useState(false)
    const [visaIssuedLocationlist, setVisaIssuedLocationlist] = useState([])
    const [todate, setTodate] = useState('')
    const [fromdate, setFromdate] = useState('')
    const [genderlist, setGenderList] = useState([])
    const [maritalstatuslist, setMaritalStatusList] = useState([])
    const [relationList, setRelationList] = useState([])
    const [sponsortypelist, setSponsorTypeList] = useState([])
    const [workLocationlist, setWorkLocationList] = useState([])
    const [lsblist, setLSBlist] = useState([])
    const [categoryList,setCategoryList] = useState([])
    const [salaryBandList, setsalaryBandList] = useState([])
    const [regionList,setRegionList] = useState([])


    useEffect(() => {
        // company_list();
        // getTPAData();
        // getNetworkData();
        GetGroupMedicalPlans();
        getNationality();
        getvisaissuedlocation();
        getGenderlist();
        getmaritalstatuslist();
        getRelationList();
        getSponsorTypeList();
        getWorkLocationlist();
        getLSB();
        getGroupMedicalCategory()
        getActualSalaryBand()
        getRegion()
    }, []);


    const GetGroupMedicalPlans = () => {
        const reqOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
            },
        };
        fetch(`${API_URL}/api/getGroupMedicalPlanName`, reqOptions)
            .then(response => response.json())
            .then(data => {
                console.log("planList>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                setPlanList(data.data);
                setTodate(data.data?.map((val) => val?.to_date))
                setFromdate(data.data?.map((val) => val?.from_date))
            });
    }

    const getGenderlist = async() => {
        try{
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
       await fetch(`${API_URL}/api/getGender`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log("gender>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                setGenderList(data.data)
            })
            .catch(error => console.log('error', error));
        }
        catch(error){
            console.log(error.message)
        }
    }

    const getmaritalstatuslist = async() => {
        try{
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
         await fetch(`${API_URL}/api/getMaritalStatus`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log("maritalstatus>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                setMaritalStatusList(data.data)
            })
            .catch(error => console.log('error', error));
        }
        catch(error){
            console.log(error.message)
        }
    }

    const getRelationList = async() => {
        try{
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        await fetch(`${API_URL}/api/getRelation`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log("relation>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                setRelationList(data.data)
            })
            .catch(error => console.log('error', error));
        }
        catch(error){
            console.log(error.message)
        }
    }

    const getSponsorTypeList = async() => {
        try{
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        await fetch(`${API_URL}/api/getsponsortype`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log("sponsortype>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                setSponsorTypeList(data.data)
            })
            .catch(error => console.log('error', error));
        }
        catch(error){
            console.log(error.message)
        }
    }


    const getWorkLocationlist = async() => {
        try{
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        await fetch(`${API_URL}/api/getWorkLocation`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log("workLocation>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                setWorkLocationList(data.data)
            })
            .catch(error => console.log('error', error));
        }
        catch(error){
            console.log(error.message)
        }
    }

    const getLSB = async (e) => {
        try {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
            },
        }
        fetch(`${API_URL}/api/get_medical_salary_range`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log("LSB>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
                setLSBlist(data.data)
            })
            .catch(error => console.log('error', error));
        }
        catch(error){
            console.log(error.message)
        }
    }

    const getGroupMedicalCategory = () => {
        const reqOptions = {
            method: 'GET',
            headers: {
            'Content-Type':'application/json'
            }
        }
        fetch(`${API_URL}/api/getGroupMedicalCategory`, reqOptions)
            .then((response) => response.json())
            .then((data) => {
            setCategoryList(data.data)
            })
    }
    const getActualSalaryBand = async () => {
        const reqOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
            }
        }
     await   fetch(`${API_URL}/api/get_actualSalaryBand`, reqOptions)
            .then((response) => response.json())
            .then((data) => {
                setsalaryBandList(data.data)
            })

    }
    const getRegion = async () => {
        const reqOption = {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('usertoken'),
            }
        }
      await  fetch(`${API_URL}/api/get_area_of_registration`, reqOption)
            .then((response) => response.json())
            .then((data) => {
                setRegionList(data.data)
            })

    }




    const handlePlanChange = async (evnt) => {
        console.log("handlePlanChange>>>>>>>>>>>>>>>>>>>>>>>>", evnt)
        setTPAData([])
        setPollicynumberlist([])
        // setCompanyData('')
        setNetworkData([])
        SetpolicyNumber('')
        setPlanId(evnt)
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        await  fetch(`${API_URL}/api/getRatesOfPlan?planId=${evnt}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                const ratesData = data.data
                const TPAdataARr = []
                for (let i = 0; i < ratesData.length; i++) {
                    TPAdataARr.push(ratesData[i]?.TPAs[0])
                }

                setTPAData(TPAdataARr)
                // setCompanyData(data.company)
                console.log("company>>>>>>>>>>>>>>>>>>>>>>>>", data?.company[0]?.company_id[0])
                setCompanyList(data?.company[0]?.company_id[0])
                setPlanCompanyId(data?.company[0]?.company_id[0]?._id)

            })
            .catch(error => console.log('error', error));
    }

    const handleChange = (evnt) => {
        const value = evnt.target.value
        setTPAId(value)
        getLinkListByTPAid(value)

    }

    const getLinkListByTPAid = (tpaId) => {
        setNetworkData([])
        setNetworkListId('')
        SetpolicyNumber('')
        setPollicynumberlist([])
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(`${API_URL}/api/getNetworksOfPlanratebyTPA?tpaid=${tpaId}&planid=${planId}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                let networklist = data.data
                let networkArr = networklist.map((item) => ({
                    '_id': item?.networks?.map((item) => item._id).toString(),
                    'name': item?.networks?.map((item) => item.name).toString(),
                    'policy_name': item?.policy_name,
                }))

                setNetworkData(networkArr)
                setNetworkListId(networkArr?.map((val) => val._id))
                setPollicynumberlist(networkArr.map((val) => val.policy_name))
            })
            .catch(error => console.log('error', error));
    }

    console.log("NetworkData>>>>>>>>>>>>>>>>>>>>>>>>", networkData)

    const gotTosetPolicyNumber = (event) => {
        console.log("gotTosetPolicyNumber>>>>>>>>>>>>>>>>>>>>>>>>", event.target.value)
        let Arr = JSON.parse(event.target.value)
        console.log("gotTosetPolicyNumber>>>>>>>>>>>>>>>>>>>>>>>>", Arr)
        setNetworkListId(Arr.id)
        // SetpolicyNumber(Arr.policy_name)

    }

    console.log("policyNumber>>>>>>>>>>>>>>>>>>>>>>>>", pollicynumberlist)

    const getNationality = () => {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("usertoken") || ""
            },
        }
        fetch(`${API_URL}/api/get_nationality_list`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                setNationalityData(data.data)
                console.log("nationalityData>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
            })
    }

    const currentDate = new Date().toISOString().split('T')[0];


    const [planCompanyId, setPlanCompanyId] = useState('');
    const [planId, setPlanId] = useState('');
    const [TPAId, setTPAId] = useState('');
    const [networkListId, setNetworkListId] = useState('');
    const [SINumber, setSINumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastnName, setLastnName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [relation, setRelation] = useState('');
    const [category, setCategory] = useState('');
    const [regino, setRegino] = useState('');
    const [LSB, setLSB] = useState('');
    const [nationality, setNationality] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [EidNumber, setEidNumber] = useState('');
    const [UidNumber, setUidNumber] = useState('');
    const [visaIssuedLocation, setVisaIssuedLocation] = useState('');
    const [actualSalryBand, setActualSalryBand] = useState('');
    const [personCommission, setPersonCommission] = useState('');
    const [residentialLocation, setResidentialLocation] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [email, setEmail] = useState('');
    const [photoFileName, setPhotoFileName] = useState('');
    const [sponsorType, setSponsorType] = useState('');
    const [sponsorId, setSponsorId] = useState('');
    const [sponsorContactNumber, setSponsorContactNumber] = useState('');
    const [sponsorContactEmail, setSponsorContactEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [AdditionEffectiveDate, setAdditionEffectiveDate] = useState('');
    const [visaFileNumber, setVisaFileNumber] = useState('');
    const [birthCertificateNumber, setBirthCertificateNumber] = useState('');
    const [attachDocument, setAttachDocument] = useState([]);




    const fileType = 'xlsx'

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (planCompanyId == "") {
                swal({
                    text: "Please select Insurance Company Name",
                    type: "warning",
                    icon: "warning",
                })
                //highlight the corresponding field
                return;
            }
            if (planId == "") {
                swal({
                    text: "Please select Plan Name",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (TPAId == "") {
                swal({
                    text: "Please select TPA",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (networkListId == "") {
                swal({
                    text: "Please select Network",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (policyNumber == "") {
                swal({
                    text: "Please Enter Policy Number",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            // if (SINumber == "") {
            //     swal({
            //         text: "Please enter SI Number",
            //         type: "warning",
            //         icon: "warning",
            //     })
            //     return;
            // }
            if (firstName == "") {
                swal({
                    text: "Please enter First Name",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (middleName == "") {
                swal({
                    text: "Please enter Middle Name",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (lastnName == "") {
                swal({
                    text: "Please enter Last Name",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (employeeNumber == "") {
                swal({
                    text: "Please enter Employee Number",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (dateOfBirth == "") {
                swal({
                    text: "Please enter Date Of Birth",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (gender == "") {
                swal({
                    text: "Please select gender",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (maritalStatus == "") {
                swal({
                    text: "Please select Marital Status",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (relation == "") {
                swal({
                    text: "Please enter Relation",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (category == "") {
                swal({
                    text: "Please enter Category",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (regino == "") {
                swal({
                    text: "Please enter Region",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (LSB == "") {
                swal({
                    text: "Please enter LSB",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (nationality == "") {
                swal({
                    text: "Please select Nationality",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (passportNumber == "") {
                swal({
                    text: "Please enter Passport Number",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (EidNumber == "") {
                swal({
                    text: "Please enter Eid Number",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (UidNumber == "") {
                swal({
                    text: "Please enter Uid Number",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (visaIssuedLocation == "") {
                swal({
                    text: "Please enter Visa Issued Location",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (actualSalryBand == "") {
                swal({
                    text: "Please enter Actual Salary band",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (personCommission == "") {
                swal({
                    text: "Please enter Person Commission",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (residentialLocation == "") {
                swal({
                    text: "Please enter Residential Location",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (workLocation == "") {
                swal({
                    text: "Please enter Work location",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (phoneno == "") {
                swal({
                    text: "Please enter Mobile Number",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (email == "") {
                swal({
                    text: "Please enter Email",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (photoFileName == "") {
                swal({
                    text: "Please enter Photo File Name",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (sponsorType == "") {
                swal({
                    text: "Please enter Sponsor Type",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (sponsorId == "") {
                swal({
                    text: "Please enter Sponsor Id",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (sponsorContactNumber == "") {
                swal({
                    text: "Please enter Sponsor Contact Number",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (sponsorContactEmail == "") {
                swal({
                    text: "Please enter Sponsor Contact Email",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (occupation == "") {
                swal({
                    text: "Please enter Occupation",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (AdditionEffectiveDate == "") {
                swal({
                    text: "Please enter Addition Effective Date",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (visaFileNumber == "") {
                swal({
                    text: "Please enter Visa File Number",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            if (birthCertificateNumber == "") {
                swal({
                    text: "Please enter Birth Certificate Number",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            // if(attachDocument == "") {
            //     swal({
            //         text: "Please select Document",
            //         type: "warning",
            //         icon: "warning",
            //     })
            //     return;
            // }

            const formData = new FormData();
            formData.append('planCompanyId', planCompanyId);
            formData.append('planId', planId);
            formData.append('TPAId', TPAId);
            formData.append('networkListId', networkListId);
            formData.append('policy_number', policyNumber);
            formData.append('SINumber', SINumber);
            formData.append('firstName', firstName);
            formData.append('middleName', middleName);
            formData.append('lastnName', lastnName);
            formData.append('employeeNumber', employeeNumber);
            formData.append('dateOfBirth', dateOfBirth);
            formData.append('gender', gender);
            formData.append('maritalStatus', maritalStatus);
            formData.append('relation', relation);
            formData.append('category', category);
            formData.append('regino', regino);
            formData.append('LSB', LSB);
            formData.append('nationality', nationality)
            formData.append('passportNumber', passportNumber);
            formData.append('EidNumber', EidNumber);
            formData.append('UidNumber', UidNumber);
            formData.append('visaIssuedLocation', visaIssuedLocation);
            formData.append('actualSalryBand', actualSalryBand);
            formData.append('personCommission', personCommission);
            formData.append('residentialLocation', residentialLocation);
            formData.append('workLocation', workLocation);
            formData.append('phoneno', phoneno);
            formData.append('email', email);
            formData.append('photoFileName', photoFileName);
            formData.append('sponsorType', sponsorType);
            formData.append('sponsorId', sponsorId);
            formData.append('sponsorContactNumber', sponsorContactNumber);
            formData.append('sponsorContactEmail', sponsorContactEmail);
            formData.append('occupation', occupation);
            formData.append('AdditionEffectiveDate', AdditionEffectiveDate);
            formData.append('visaFileNumber', visaFileNumber);
            formData.append('birthCertificateNumber', birthCertificateNumber);
            formData.append('attachDocument', attachDocument);

            console.log("formData", Array.from(formData))


            setLoader(true)
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken') || ''
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            };
            await fetch(`${API_URL}/api/addManuallyGroupMedicalMember`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>>>>>>>>>>>>>>>>>>>>>>>>", data)
                    if (data.status == 201) {
                        // alert(data.message); 
                        swal({
                            text: data.message,
                            icon: "success",
                        })
                        setLoader(false)
                        Navigate("/AddMembers");
                    } else {
                        alert(data.message);
                    }
                });
        } catch (error) {
            console.log(error.message)
            setLoader(false)

        }
    }

    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
        input.value = value; // Set the input value to the filtered value
    };

    const getvisaissuedlocation = async(e) => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
                },
            };
            await fetch(`${API_URL}/api/getAreaOfRegistrations`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("data>>>>>>>>>>>>>>>>>>>>>>>>", data)
                    setVisaIssuedLocationlist(data.data)
                });
        } catch (error) {
            console.log(error.message)
        }
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const sixMonthsAgoFormatted = sixMonthsAgo.toISOString().split('T')[0];
    const currentmatching = (new Date()).toISOString();





    const handleDateChange = (selectedDate) => {
        // Check if the selected date is between fromdate and todate
        console.log("selectedDate>>>>>>>>>>>>>>>>>>>>>>>>", selectedDate)
        if (fromdate && todate && selectedDate >= new Date(fromdate[0])?.toISOString()?.split('T')[0] && selectedDate <= new Date(todate[0])?.toISOString()?.split('T')[0]) {
            setAdditionEffectiveDate(selectedDate);
        } else {
            // Reset the selected date
            setAdditionEffectiveDate('');
        }
    };

    // console.log("fromdate>>>>>>>>>>>>>>>>>>>>>>>>", new Date(fromdate[0])?.toISOString()?.split('T')[0])
    // console.log("todate>>>>>>>>>>>>>>>>>>>>>>>>", new Date(todate[0])?.toISOString()?.split('T')[0])
    // console.log("sixMonthsFromNowFormatted>>>>>>>>>>>>>>>>>>>>>>>>", sixMonthsAgoFormatted)

    // const minDate = fromdate ? (fromdate <= currentDate && currentDate <= todate ? sixMonthsAgoFormatted : currentDate) : sixMonthsAgoFormatted
    // const minDate = fromdate ? (fromdate >= sixMonthsAgoFormatted ? fromdate : sixMonthsAgoFormatted) : sixMonthsAgoFormatted;
    const minDate = fromdate && new Date(fromdate[0]).toISOString().split('T')[0] ? (new Date(fromdate[0]).toISOString().split('T')[0] >= sixMonthsAgoFormatted ? new Date(fromdate[0]).toISOString().split('T')[0] : sixMonthsAgoFormatted) : currentDate;



    return (
        <div>
            <Header />
            <GroupMedical />
            <Row className='groupback'>
                {loader && (
                    <div className="loader-overlay" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
                        <div className="loader">
                            <CSpinner color="danger" size="lg" />
                        </div>
                    </div>
                )}

                <Container fluid className="group-medicalss mt-5">
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Col lg={12}>
                            <Row>
                                <Col lg="3">
                                    <GroupSidebar />
                                </Col>
                                <Col lg="9">

                                    <div className='member'>
                                        <h4>Add Member Details</h4>
                                        <Row className='form-back'>
                                            <div>
                                                <button className='buttonred righttttt'
                                                    onClick={() => Navigate('/AddMembers')}>
                                                    <i
                                                        className="fa fa-chevron-left"
                                                        aria-hidden="true"
                                                    ></i>Back</button>
                                            </div>
                                        </Row>
                                        <Row className='form-member'>

                                            <Col lg={4}>
                                                <label>Customer Name</label>
                                                <select
                                                    className="form-control"
                                                    name="planId"
                                                    required
                                                    onChange={(e) => handlePlanChange(e.target.value)}
                                                >
                                                    <option value="" hidden>Customer Name</option>
                                                    {planList?.map((item, index) => (
                                                        <option key={index} value={item._id}>{item.plan_name}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Insurance Company Name</label>
                                                {/* <select
                                            className="form-control"
                                            name="planCompanyId"
                                            required
                                            onChange={(e) => setPlanCompanyId(e)}
                                            value={companyList._id}
                                        >
                                            <option value="" hidden>Select Company</option>
                                            <option value={companyList._id} >{companyList.company_name}</option>
                                        </select> */}
                                                <input className='form-control' placeholder='Insurance Company Name' type="text" name="planCompanyId" value={companyList.company_name} style={{ fontWeight: 'bold' }} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>TPA</label>
                                                <select
                                                    className="form-control"
                                                    name="TPAId"
                                                    required
                                                    onChange={(e) => handleChange(e)}
                                                >
                                                    <option value="" hidden>Select TPA</option>
                                                    {TPAData?.map((item, index) => (
                                                        <option key={index} value={item._id}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Network</label>
                                                <select
                                                    className="form-control"
                                                    name="networkListId"
                                                    required
                                                    defaultValue={networkListId}
                                                    onChange={(e) => gotTosetPolicyNumber(e)}
                                                >
                                                    <option value="" hidden>Select Network</option>
                                                    {networkData?.map((item, index) => (
                                                        <option key={index} value={JSON.stringify({ "id": item._id, "policy_name": item.policy_name })}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Policy Number</label>
                                                {/* <input type="text" className="form-control" value={policyNumber} onChange={(e) => SetpolicyNumber(e.target.value)} placeholder='Policy Number' readOnly/> */}
                                                <select
                                                    className="form-control"
                                                    name="policyNumber"
                                                    placeholder='Select Policy Number'
                                                    required
                                                    onChange={(e) => SetpolicyNumber(e.target.value)}
                                                >
                                                    <option value="" hidden>Select Policy Number</option>
                                                    {pollicynumberlist?.map((item, index) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            {/* <Col lg={4}>
                                                <label>SI Number</label>
                                                <input type="text" className="form-control" name="SINumber" placeholder="Enter Serial No" autoComplete="off" required onChange={(e) => setSINumber(e.target.value)} />

                                            </Col> */}
                                        </Row>
                                        <Row className='form-member'>
                                            <Col lg={4}>
                                                <label>First name</label>
                                                <input type="text" className="form-control" name="firstName" placeholder="First name" autoComplete="off" required onChange={(e) => setFirstName(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Middle Name</label>
                                                <input type="text" className="form-control" name="middleName" placeholder="Enter Middle Name" autoComplete="off" required onChange={(e) => setMiddleName(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" name="lastnName" placeholder="Enter Last Name" autoComplete="off" required onChange={(e) => setLastnName(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Employee Number</label>
                                                <input type="text" className="form-control" name="employeeNumber" placeholder="Enter Employee Number" autoComplete="off" required onChange={(e) => setEmployeeNumber(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Date Of Birth</label>
                                                <input type="date" max={currentDate} className="form-control" name="dateOfBirth" placeholder="Enter Date Of Birth" autoComplete="off" required onChange={(e) => setDateOfBirth(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Gender</label>
                                                <select
                                                    className="form-control"
                                                    name="gender"
                                                    required
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <option value={""} hidden>Select Gender</option>
                                                   {genderlist?.map((item, index) => (
                                                        <option key={index} value={item.name}>{item.name}</option> 
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Marital Status</label>
                                                <select
                                                    className="form-control"
                                                    name="maritalStatus"
                                                    required
                                                    onChange={(e) => setMaritalStatus(e.target.value)}
                                                >
                                                    <option value={""} hidden>Select Marital Status</option>
                                                    {maritalstatuslist?.map((item, index) => (
                                                        <option key={index} value={item.name}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Relation</label>
                                                {/* <input type="text" className="form-control" name="relation" placeholder="Enter Relation" autoComplete="off" required onChange={(e) => setRelation(e.target.value)} /> */}
                                                <select className="form-control" name="relation" required onChange={(e) => setRelation(e.target.value)}>
                                                    <option value="" hidden>Select Relation</option>
                                                    {relationList?.map((item, index) => (
                                                        <option key={index} value={item.name}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Category</label>
                                                <select className='form-control' name='category' required onChange={(e) => setCategory(e.target.value)}>
                                                    <option value='' hidden>Select Category</option>
                                                    {categoryList?.map((item, index) => (<option key={index} value={item.category_name} >{item.category_name}</option>))
                                                    }
                                                </select>
                                                {/* <input type="text" className="form-control" name="category" placeholder="Enter Category" autoComplete="off" required onChange={(e) => setCategory(e.target.value)} /> */}

                                            </Col>
                                            <Col lg={4}>
                                                <label>Region</label>
                                                {/* <input type="text" className="form-control" name="regino" placeholder="Enter Region" autoComplete="off" required onChange={(e) => setRegino(e.target.value)} /> */}
                                                <select className="form-control" name="regino" required onChange={(e) => setRegino(e.target.value)}>
                                                    <option value={""} hidden>Select Region</option>
                                                    {regionList?.map((item, index) => (
                                                        <option key={index} value={item.area_of_registration_name}>{item.area_of_registration_name}</option>))
                                                    }
                                                    {/* <option value={"Dubai"} >Dubai</option>
                                                    <option value={"Abu Dhabi"} >Abu Dhabi</option>
                                                    <option value={"Northern Emirates"} >Northern Emirates</option> */}
                                                </select>

                                            </Col>
                                            <Col lg={4}>
                                                <label>LSB</label>
                                                {/* <input type="text" className="form-control" name="LSB" placeholder="Enter LSB" autoComplete="off" required onChange={(e) => setLSB(e.target.value)} /> */}
                                                    <select
                                                    className="form-control"
                                                    name="LSB"
                                                    required
                                                    onChange={(e) => setLSB(e.target.value)}
                                                >
                                                    <option value="" hidden>Select LSB</option>
                                                    {lsblist?.map((item, index) => (
                                                        <option key={index} value={item.medical_salary_range}>{item.medical_salary_range}</option>
                                                    ))}
                                                    </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Nationality</label>
                                                <select
                                                    className="form-control"
                                                    name='nationality'
                                                    required
                                                    onChange={(e) => setNationality(e.target.value)}
                                                >
                                                    <option value={""} hidden>Select Country</option>
                                                    {nationalityData.map((item, index) => (
                                                        <option key={index} value={item.nationality_name}>{item.nationality_name}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Passport Number</label>
                                                <input type="text" className="form-control" name="passportNumber" placeholder="Enter Passport Number" autoComplete="off" required onChange={(e) => setPassportNumber(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Eid Number</label>
                                                <input type="text" className="form-control" name="EidNumber" placeholder="Enter Eid Number" autoComplete="off" required onChange={(e) => setEidNumber(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Uid Number</label>
                                                <input type="text" className="form-control" name="UidNumber" placeholder="Enter Uid Number" autoComplete="off" required onChange={(e) => setUidNumber(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Visa Issued Location</label>
                                                {/* <input type="text" className="form-control" name="visaIssuedLocation" placeholder="Enter Visa Issued Location" autoComplete="off" required onChange={(e) => setVisaIssuedLocation(e.target.value)} /> */}
                                                <select className="form-control" name="visaIssuedLocation" required onChange={(e) => setVisaIssuedLocation(e.target.value)}>
                                                    <option value="" hidden>Select Visa Issued Location</option>
                                                    {visaIssuedLocationlist?.map((item, index) => (
                                                        <option key={index} value={item.area_of_registration_name}>{item.area_of_registration_name}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Actual Salary band</label>
                                                <select className='form-control' name='actualSalryBand' onChange={(e) => setActualSalryBand(e.target.value)}>
                                                    <option value='' hidden>Select Actual Salary Band</option>
                                                    {salaryBandList?.map((item, index) => (<option key={index} value={item.actual_salary_band}>{item.actual_salary_band}</option>))
                                                    }
                                                </select>
                                                {/* <input type="text" className="form-control" name="actualSalryBand" placeholder="Enter Actual Salary band" autoComplete="off" required onChange={(e) => setActualSalryBand(e.target.value)} /> */}

                                            </Col>
                                            <Col lg={4}>
                                                <label>Person Commission</label>
                                                <input type="text" className="form-control" name="personCommission" placeholder="Enter Person Commission" autoComplete="off" required onChange={(e) => setPersonCommission(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Residential Location</label>
                                                {/* <input type="text" className="form-control" name="residentialLocation" placeholder="Enter Residential Location" autoComplete="off" required onChange={(e) => setResidentialLocation(e.target.value)} /> */}
                                                <select className="form-control" name="residentialLocation" required onChange={(e) => setResidentialLocation(e.target.value)}>
                                                    <option value="" hidden>Select Residential Location</option>
                                                    {workLocationlist?.map((item, index) => (
                                                        <option key={index} value={item.worklocation}>{item.worklocation}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Work location</label>
                                                {/* <input type="text" className="form-control" name="workLocation" placeholder="Enter Work location" autoComplete="off" required onChange={(e) => setWorkLocation(e.target.value)} /> */}
                                                <select
                                                    className="form-control"
                                                    name="workLocation"
                                                    required
                                                    onChange={(e) => setWorkLocation(e.target.value)}
                                                >
                                                    <option value="" hidden>Select Work Location</option>
                                                    {workLocationlist?.map((item, index) => (
                                                        <option key={index} value={item.worklocation}>{item.worklocation}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Mobile Number</label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="phoneno"
                                                    placeholder="Enter Mobile Number"
                                                    autoComplete="off"
                                                    required
                                                    onChange={(e) => setPhoneno(e.target.value)}
                                                    min={0}
                                                    onInput={allowOnlyNumbers}
                                                />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Email</label>
                                                <input type="email" className="form-control" name="phoneno" placeholder="Enter Email Id" autoComplete="off" required onChange={(e) => setEmail(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Photo File Name</label>
                                                <input type="text" className="form-control" name="photoFileName" placeholder="Enter Photo File Name" autoComplete="off" required onChange={(e) => setPhotoFileName(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Sponsor Type</label>
                                                {/* <input type="text" className="form-control" name="sponsorType" placeholder="Enter Sponsor Type" autoComplete="off" required onChange={(e) => setSponsorType(e.target.value)} /> */}
                                                <select className="form-control" name="sponsorType" required onChange={(e) => setSponsorType(e.target.value)}>
                                                    <option value="" hidden>Select Sponsor Type</option>
                                                    {sponsortypelist?.map((item, index) => (
                                                        <option key={index} value={item.sponsortype}>{item.sponsortype}</option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col lg={4}>
                                                <label>Sponsor Id</label>
                                                <input type="text" className="form-control" name="sponsorId" placeholder="Enter Sponsor Id" autoComplete="off" required onChange={(e) => setSponsorId(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Sponsor Contact Number</label>
                                                <input type="text"
                                                    className="form-control"
                                                    name="sponsorContactNumber"
                                                    placeholder="Enter Sponsor Contact Number"
                                                    autoComplete="off"
                                                    required
                                                    onChange={(e) => setSponsorContactNumber(e.target.value)}
                                                    min={0}
                                                    onInput={allowOnlyNumbers}
                                                />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Sponsor Contact Email</label>
                                                <input type="email" className="form-control" name="sponsorContactEmail" placeholder="Enter Sponsor Contact Email" autoComplete="off" required onChange={(e) => setSponsorContactEmail(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Occupation</label>
                                                <input type="text" className="form-control" name="occupation" placeholder="Enter Occupation" autoComplete="off" required onChange={(e) => setOccupation(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Addition Effective Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="AdditionEffectiveDate"
                                                    placeholder="Enter Addition Effective Date"
                                                    autoComplete="off"
                                                    required
                                                    value={AdditionEffectiveDate} // Assuming you have additionEffectiveDate state to keep track of the selected date
                                                    onChange={(e) => handleDateChange(e.target.value)}
                                                    format="dd-MM-yyyy"
                                                    // min={minDate}
                                                    // max={currentDate}    
                                                />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Visa File Number</label>
                                                <input type="text" className="form-control" name="visaFileNumber" placeholder="Enter Visa File Number" autoComplete="off" required onChange={(e) => setVisaFileNumber(e.target.value)} />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Birth Certificate Number</label>
                                                <input type="text" className="form-control" name="birthCertificateNumber" placeholder="Enter Birth Certificate Number" autoComplete="off" required onChange={(e) => setBirthCertificateNumber(e.target.value)} />

                                            </Col>
                                            {/* <Col lg={4}>
                                                <label>Attach Document </label>
                                                <input type="file" className='form-control' onChange={(e)=>setAttachDocument(e.target.files[0])}/>
                                            </Col> */}

                                        </Row>

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Row className='form-member' style={{ justifyContent: 'flex-end' }}>
                    <Col lg={4}>
                        <div onClick={handleSubmit}>
                            <Link className='docuview btn' >Submit</Link>
                        </div>
                    </Col>
                </Row>
            </Row>
            <Footer />
        </div>
    )
}

export default AddMembersmanually
