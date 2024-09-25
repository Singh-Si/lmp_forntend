import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Header from '../Common/Header'
import GroupMedical from '../Banner/GroupMedical'
import GroupSidebar from './GroupSidebar'
import Footer from '../Common/Footer'
import { CSpinner } from '@coreui/react'
import { API_URL } from '../..'
import GroupmedicalAlert from './GroupmedicalAlert'

const GroupPolicyRenewal  = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
    const [policydata, setPolicydata] = useState([]);
    const [usertoken, setToken] = useState(null);
    const [moredetails, setMoreDetails] = useState();



    useEffect(() => {
        const token = localStorage.getItem('usertoken');
        setToken(token)
        if (token === null || token === undefined || token === '') {
            navigate('/login')
        }
        else {
            getpolicydata();
        }
    }, []);

    useEffect(() => {
        getpolicydata();
    }, [usertoken]);

    const getpolicydata = async () => {
        try {
            setLoader(true);
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
                },
            };

            await fetch(`${API_URL}/api/getGroupMedicalPolicy`, requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res.data, 'policy data');
                    setPolicydata(res.data);
                    setLoader(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoader(false);
                });
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    }

    console.log(policydata, 'policydata');




    return (
        <div>
            <Header />

            {loader && (
                <div className="loader-overlay" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
                    <div className="loader">
                        <CSpinner color="danger" />
                    </div>
                </div>
            )}

            <GroupMedical />
            <Row className="groupback">
                <Container fluid className="group-medicalss mt-5">
                    <Row
                        style={{ justifyContent: "space-between", alignItems: "center" }}
                    >
                        <Col lg={12}>
                            <Row>
                                <Col lg="3">
                                <div className="sidebar">
                                        <GroupSidebar />
                                    </div>
                                </Col>
                                <Col lg="9">
                                    {policydata?.map((item, index) => (
                                        <div key={index} className='quotes_inner' >
                                            <div className='row quotes_details pb-3' style={{ marginLeft: '0px', marginRight: '0px' }}>
                                                <div className='col-lg-3'>
                                                    <img src={`${API_URL}/uploads/${item?.companyData?.map((data) => data?.company_logo.map((file) => file?.filename))}`} style={{ width: '50%' }} />
                                                    <h6 className="companyname">{item?.companyData?.map((data) => data?.company_name)}</h6>
                                                </div>
                                                <div className='col-lg-6 '>
                                                    <div className=''>
                                                        <h4 style={{ fontSize: "19px" }}>{item?.plan_name}</h4>

                                                    </div>

                                                    <ul className='benefits '>
                                                        <li>TPA :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item?.tpaData?.map((data) => data?.name)}</span></li>
                                                        <li>Network :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item?.networkData.map((data) => data?.name)}</span></li>
                                                        <li>Expiry Date :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>28/12/24</span></li>
                                                        <li>Policy Number :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item?.policyData?.policy_name}</span></li>
                                                        {/* <li>Line Of Business :<span className='mx-3' style={{ color: '#0D2F92', marginLeft: '5px' }}>Group Medical</span></li> */}
                                                    </ul>
                                                </div>

                                                <div className='col-lg-3 action_abcd'>
                                                    <button className='claims_abcd'>Get Quote</button>
                                                </div>
                                            </div>

                                            <div className='rowabcds' style={moredetails === index ? { display: "block", } : { display: "none" } } >
                                                <div className='row policy_documents1'>
                                                    <Row className='borderboderr ' style={{ alignItems: 'center' }}>
                                                        <Col lg={6} >
                                                            <h3>Claim Form</h3>
                                                        </Col>
                                                        <Col lg={6} className='borderleft'>
                                                            <button className='claims_abcd'>Download Claim Form <i className='fa fa-download'></i></button>
                                                        </Col>
                                                    </Row>
                                                    <Row className='borderboderr' style={{ alignItems: 'center' }}>
                                                        <Col lg={6}>
                                                            <h3>Pre Approval Form</h3>
                                                        </Col>
                                                        <Col lg={6} className='borderleft'>
                                                            <button className='claims_abcd'>Download Pre Approval Form <i className='fa fa-download'></i></button>
                                                        </Col>
                                                    </Row>
                                                    <Row className='borderboderr' style={{ alignItems: 'center' }}>
                                                        <Col lg={6}>
                                                            <h3>Network List</h3>
                                                        </Col>
                                                        <Col lg={6} className='borderleft'>
                                                            <button className='claims_abcd'>Download Category CAT A, Dubai <i className='fa fa-download'></i></button>
                                                        </Col>
                                                    </Row>
                                                    <Row className='borderboderr' style={{ alignItems: 'center' }}>
                                                        <Col lg={6}>
                                                            <h3>Policy Exclusion</h3>
                                                        </Col>
                                                        <Col lg={6} className='borderleft'>
                                                            <button className='claims_abcd'>Download Policy Exclusion <i className='fa fa-download'></i></button>
                                                        </Col>
                                                    </Row>
                                                    <Row className='borderboderr' style={{ alignItems: 'center' }}>
                                                        <Col lg={6}>
                                                            <h3>Policy Summary</h3>
                                                        </Col>
                                                        <Col lg={6} className='borderleft'>
                                                            <button className='claims_abcd'>Download Policy Summary <i className='fa fa-download'></i></button>
                                                        </Col>
                                                    </Row>
                                                    <Row className='borderboderr' style={{ alignItems: 'center' }}>
                                                        <Col lg={6}>
                                                            <h3>Schedule Of Benefits</h3>
                                                        </Col>
                                                        <Col lg={6} className='borderleft'>
                                                            <button className='claims_abcd'>Download Category CAT A, Dubai <i className='fa fa-download'></i></button>
                                                        </Col>
                                                    </Row>
                                                </div>


                                                <div className='row'>
                                                    <button className='showadd_details' onClick={() => setMoreDetails(null)} >Hide Details</button>

                                                </div>
                                            </div>

                                            {moredetails != index ?
                                                <div className='rowabcds' >
                                                    <div className='row' >
                                                        <button className='showadd_details' onClick={() => setMoreDetails(index)}>See Details</button>
                                                    </div>
                                                </div>
                                                : ""}



                                        </div>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <GroupmedicalAlert />
            </Row>
            <Footer />

        </div>
    )
}

export default GroupPolicyRenewal 