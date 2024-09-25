import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import GroupSidebar from "./GroupSidebar";
import image11 from "../../Image/image11.png"
import { API_URL } from "../..";
import swal from "sweetalert";
import { CSpinner } from "@coreui/react";
import GroupmedicalAlert from "./GroupmedicalAlert";
const MostCommonOversights = () => {

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getMostCommonOversights();
    }, []);

    const getMostCommonOversights = async () => {
        try {
            setLoader(true)
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('usertoken')}`
                },
            };

            await fetch(`${API_URL}/api/getmostCommonOversights`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    if (data.status === 200) {
                        setData(data.data);
                        setLoader(false)
                    } else {
                        swal({
                            text: data.message,
                            icon: "error",
                        });
                        setLoader(false)
                    }
                });
        }
        catch (error) {
            console.log(error);
            setLoader(false)
        }
    };



    return (
        <div>
            <Header />
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
                                {loader && (
                                    <div className="loader-overlay" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
                                        <div className="loader">
                                            <CSpinner color="danger" size="lg" />
                                        </div>
                                    </div>
                                )}
                                <Col lg="9">
                                    <p className="common">Most Common Oversights & Misconceptions</p>
                                    {data?.length > 0 && data?.map((item, index) => {
                                        console.log(item);
                                        return (
                                            <Col lg={12} className="mb-4" key={index}>
                                                <div class="member">
                                                    <h4 style={{ marginBottom: '0px' }}>{item?.claim_type_name}</h4>
                                                    <Row>
                                                        <Col lg={6} style={{ borderRight: 'solid 1px black' }}>
                                                            <p className="paradatass">{item?.descriptions?.claim_description}</p>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <ul className="ullliii">
                                                                <li>Implications</li>
                                                            </ul>
                                                            <p className="paradatass">{item?.descriptions?.claim_implication}</p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        )
                                    })}

                                    {/* <Col lg={12} className="mb-4">
                                        <div class="member">
                                        <h4 style={{ marginBottom: '0px' }}>Main Cause Of Delays</h4>
                                        <Row>
                                        <Col lg={6} style={{ borderRight: 'solid 1px black' }}>
                                        <p className="paradatass">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </Col>
                                                <Col lg={6}>
                                                    <ul className="ullliii">
                                                        <li>Implications</li>
                                                    </ul>
                                                    <p className="paradatass">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                </Col>
                                                </Row>
                                                </div>
                                                </Col>
                                    <Col lg={12} className="mb-4">
                                        <div class="member">
                                        <h4 style={{ marginBottom: '0px' }}>Misinterpretation of Benefits</h4>
                                        <Row>
                                        <Col lg={6} style={{ borderRight: 'solid 1px black' }}>
                                        <p className="paradatass">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                </Col>
                                                <Col lg={6}>
                                                    <ul className="ullliii">
                                                        <li>Implications</li>
                                                    </ul>
                                                    <p className="paradatass">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                </Col>
                                            </Row>
                                            </div>
                                            </Col>
                                            <Col lg={12} className="mb-4">
                                        <div class="member">
                                            <h4 style={{ marginBottom: '0px' }}>New Issues</h4>
                                            <Row>
                                            <Col lg={6} style={{ borderRight: 'solid 1px black' }}>
                                            <p className="paradatass">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            </Col>
                                            <Col lg={6}>
                                            <ul className="ullliii">
                                                        <li>Implications</li>
                                                    </ul>
                                                    <p className="paradatass">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                    </Col>
                                                    </Row>
                                        </div>
                                    </Col> */}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                 <GroupmedicalAlert />

            </Row>
            <Footer />
        </div>
    );
};

export default MostCommonOversights;
