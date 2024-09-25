import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import GroupMedical from '../Banner/GroupMedical'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import GroupSidebar from './GroupSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../..'
import { CSpinner } from '@coreui/react'


const ActiveMemberView = () => {

    const Navigate = useNavigate()


    const [leaddetails, setLeadDetails] = useState({});
    const [leaddata, setLeadData] = useState([]);
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];

        getLeadDetails(id)
    }, [])


    const getLeadDetails = (id) => {
        try {
            setLoader(true)
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            fetch(`${API_URL}/api/getGroupMedicalLeadsById?leadId=${id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('data>>>>>', data);
                    setLeadDetails(data.data[0])
                    setLeadData(data.data)
                    setLoader(false)
                });
        } catch (error) {
            console.log(error);
            setLoader(false)

        }
    }

    console.log(leaddetails);
    console.log(leaddata);

    const formatedate = (date) => {
        const d = date?.split("T")[0];
        const finaldate = d?.split("-").reverse().join("/");
        return finaldate;
    }

    // Define state variable for managing hover state
    const [hovered, setHovered] = useState({ row: null, col: null });

    // Function to handle mouse enter event
    const handleMouseEnter = (row, col) => {
        setHovered({ row, col });
    };

    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setHovered({ row: null, col: null });
    };




    return (
        <div>
            <Header />
            <GroupMedical />
            <Row className='groupback'>
                <Container fluid className="group-medicalss mt-5">
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Col lg={12}>
                            <Row>
                                <Col lg="3">
                                    <GroupSidebar />
                                </Col>
                                {loader && (
                                            <div className="loader-overlay" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
                                                <div className="loader">
                                                    <CSpinner color="danger" size="lg" />
                                                </div>
                                            </div>
                                        )}
                                <Col lg="9">
                                    <div className='member'>
                                        <h4>Member Details</h4>
                                        <Row className='form-back'>
                                            <div>
                                                <button className='buttonred righttttt'
                                                    onClick={() => Navigate('/ActiveMember')}>
                                                    <i
                                                        className="fa fa-chevron-left"
                                                        aria-hidden="true"
                                                    ></i>Back</button>
                                            </div>
                                        </Row>
                                        <Row className='form-member'>
                                            <Col lg={4}>
                                                <label>Insurance Company Name</label>
                                                <input type="text" className="form-control" name="planCompanyId" placeholder="Insurance Company Name" autoComplete="off" required defaultValue={leaddetails?.companyData?.map((val) => val.company_name)} readOnly />
                                            </Col>
                                            <Col lg={4}>
                                                <label>Plan Name</label>
                                                <input type="text" className="form-control" name="planId" placeholder="Insurance Company Name" autoComplete="off" required defaultValue={leaddetails?.planData?.map((val) => val.plan_name)} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>TPA</label>
                                                <input type="text" className="form-control" name="TPAId" placeholder="Insurance Company Name" autoComplete="off" required defaultValue={leaddetails?.TPAData?.map((val) => val.name)} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Network</label>
                                                <input type="text" className="form-control" name="networkListId" placeholder="Insurance Company Name" autoComplete="off" required defaultValue={leaddetails?.networData?.map((val) => val.name)} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Policy Number</label>
                                                <input type="text" className="form-control" name="policy_number" placeholder="Policy Number" autoComplete="off" required defaultValue={leaddetails?.policy_number} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>SI Number</label>
                                                <input type="text" className="form-control" name="SINumber" placeholder="Serial No" autoComplete="off" required defaultValue={leaddetails?.SINumber} readOnly />

                                            </Col>
                                        </Row>
                                        <Row className='form-member'>
                                            <Col lg={4}>
                                                <label>First name</label>
                                                <input type="text" className="form-control" name="firstName" placeholder="First name" autoComplete="off" required defaultValue={leaddetails?.firstName} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Middle Name</label>
                                                <input type="text" className="form-control" name="middleName" placeholder="Middle Name" autoComplete="off" defaultValue={leaddetails?.middleName} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" name="lastnName" placeholder="Last Name" autoComplete="off" defaultValue={leaddetails?.lastnName} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Employee Number</label>
                                                <input type="text" className="form-control" name="employeeNumber" placeholder="Employee Number" autoComplete="off" required defaultValue={leaddetails?.employeeNumber} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Date Of Birth</label>
                                                <input type="text" className="form-control" name="dateOfBirth" placeholder="Date Of Birth" autoComplete="off" required defaultValue={formatedate(leaddetails?.dateOfBirth)} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Gender</label>
                                                <input type="text" className="form-control" name="gender" placeholder="Employee Number" autoComplete="off" required defaultValue={leaddetails?.gender} readOnly />


                                            </Col>
                                            <Col lg={4}>
                                                <label>Marital Status</label>
                                                <input type="text" className="form-control" name="maritalStatus" placeholder="Employee Number" autoComplete="off" required defaultValue={leaddetails?.maritalStatus} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Relation</label>
                                                <input type="text" className="form-control" name="relation" placeholder="Relation" autoComplete="off" required defaultValue={leaddetails?.relation} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Category</label>
                                                <input type="text" className="form-control" name="category" placeholder="Category" autoComplete="off" required defaultValue={leaddetails?.category} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Region</label>
                                                <input type="text" className="form-control" name="regino" placeholder="Region" autoComplete="off" required defaultValue={leaddetails?.regino} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>LSB</label>
                                                <input type="text" className="form-control" name="LSB" placeholder="LSB" autoComplete="off" required defaultValue={leaddetails?.LSB} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Nationality</label>
                                                <input type="text" className="form-control" name="nationality" placeholder="LSB" autoComplete="off" required defaultValue={leaddetails?.nationality} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Passport Number</label>
                                                <input type="text" className="form-control" name="passportNumber" placeholder="Passport Number" autoComplete="off" required defaultValue={leaddetails?.passportNumber} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Eid Number</label>
                                                <input type="text" className="form-control" name="EidNumber" placeholder="Eid Number" autoComplete="off" required defaultValue={leaddetails?.EidNumber} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Uid Number</label>
                                                <input type="text" className="form-control" name="UidNumber" placeholder="Uid Number" autoComplete="off" required defaultValue={leaddetails?.UidNumber} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Visa Issued Location</label>
                                                <input type="text" className="form-control" name="visaIssuedLocation" placeholder="Visa Issued Location" autoComplete="off" required defaultValue={leaddetails?.visaIssuedLocation} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Actual Salary band</label>
                                                <input type="text" className="form-control" name="actualSalryBand" placeholder="Actual Salary band" autoComplete="off" required defaultValue={leaddetails?.actualSalryBand} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Person Commission</label>
                                                <input type="text" className="form-control" name="personCommission" placeholder="Person Commission" autoComplete="off" required defaultValue={leaddetails?.personCommission} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Residential Location</label>
                                                <input type="text" className="form-control" name="residentialLocation" placeholder="Residential Location" autoComplete="off" required defaultValue={leaddetails?.residentialLocation} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Work location</label>
                                                <input type="text" className="form-control" name="workLocation" placeholder="Work location" autoComplete="off" required defaultValue={leaddetails?.workLocation} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Mobile Number</label>
                                                <input type="text" className="form-control" name="phoneno" placeholder="Mobile Number" autoComplete="off" required defaultValue={leaddetails?.phoneno} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Email</label>
                                                <input type="email" className="form-control" name="phoneno" placeholder="Email Id" autoComplete="off" required defaultValue={leaddetails?.email} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Photo File Name</label>
                                                <input type="text" className="form-control" name="photoFileName" placeholder="Photo File Name" autoComplete="off" required defaultValue={leaddetails?.photoFileName} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Sponsor Type</label>
                                                <input type="text" className="form-control" name="sponsorType" placeholder="Sponsor Type" autoComplete="off" required defaultValue={leaddetails?.sponsorType} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Sponsor Id</label>
                                                <input type="text" className="form-control" name="sponsorId" placeholder="Sponsor Id" autoComplete="off" required defaultValue={leaddetails?.sponsorId} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Sponsor Contact Number</label>
                                                <input type="text" className="form-control" name="sponsorContactNumber" placeholder="Sponsor Contact Number" autoComplete="off" required defaultValue={leaddetails?.sponsorContactNumber} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Sponsor Contact Email</label>
                                                <input type="email" className="form-control" name="sponsorContactEmail" placeholder="Sponsor Contact Email" autoComplete="off" required defaultValue={leaddetails?.sponsorContactEmail} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Occupation</label>
                                                <input type="text" className="form-control" name="occupation" placeholder="Occupation" autoComplete="off" required defaultValue={leaddetails?.occupation} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Addition Effective Date</label>
                                                <input type="text" className="form-control" name="AdditionEffectiveDate" placeholder="Addition Effective Date" autoComplete="off" required defaultValue={formatedate(leaddetails?.AdditionEffectiveDate)} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Visa File Number</label>
                                                <input type="text" className="form-control" name="visaFileNumber" placeholder="Visa File Number" autoComplete="off" required defaultValue={leaddetails?.visaFileNumber} readOnly />

                                            </Col>
                                            <Col lg={4}>
                                                <label>Birth Certificate Number</label>
                                                <input type="text" className="form-control" name="birthCertificateNumber" placeholder="Birth Certificate Number" autoComplete="off" required defaultValue={leaddetails?.birthCertificateNumber} readOnly />

                                            </Col>
                                            <Col lg={12}>
                                                <label>Documents </label>
                                                {leaddata.map((item, index) => (
                                                    <div className="row form-group md-4" key={index}>
                                                        {item?.documents.map((image, index1) => (
                                                            <div className='col-lg-4' key={index1}>
                                                                <div className="image-container" onMouseEnter={() => handleMouseEnter(index, index1)} onMouseLeave={handleMouseLeave}>
                                                                    <a
                                                                        href={`${API_URL}/documents/${image?.file ? image?.file : image?.file}`}
                                                                        download target='_blank' rel="noreferrer"
                                                                        style={{ display: 'block', textDecoration: 'none' }}>
                                                                        <img src={`${API_URL}/documents/${image?.file ? image?.file : image?.file}`} alt="" className='img_abcd1234' />
                                                                        <div className="overlay">
                                                                        <p className="download-icon"><i className='fa fa-cloud-download'></i></p>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <p className="form-label"><strong>{image?.name}</strong></p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </Col>



                                        </Row>

                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Footer />
        </div>
    )
}

export default ActiveMemberView
