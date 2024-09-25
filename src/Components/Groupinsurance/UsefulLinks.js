import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table,Modal,Button } from "react-bootstrap";
import GroupSidebar from "./GroupSidebar";
import { API_URL } from "../..";
import image11 from "../../Image/image11.png"
import swal from 'sweetalert';
import { CSpinner } from "@coreui/react";
import GroupmedicalAlert from "./GroupmedicalAlert";

const UsefulLinks = () => {

    const [data, setData] = useState([]);
    const [address, setAddress] = useState('');
    const [hospital_name, setHospital_name] = useState('');
    const [showaddress, setShowaddress] = useState(false);
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getActiveusefullinks();
    }, []);


    const getActiveusefullinks = async () => {
        try {
            setLoader(true)
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('usertoken')}`
                },
            };

            await fetch(`${API_URL}/api/getActiveUseFullLink`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data, "dataksdefkselkfslkfk");
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
        }
    };

    const handleaddress = (address) => {
        console.log(JSON.parse(address), "address");
        const { hospital_name, address: address1 } = JSON.parse(address);
        setHospital_name(hospital_name);
        setAddress(address1);
        setShowaddress(true);
    }

   


    return (
        <div>
            <Header />
            <GroupMedical />
            <Row className="groupback">
            {loader && (
                  <div className="loader-overlay" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
                    <div className="loader">
                      <CSpinner color="danger" size="lg" />
                    </div>
                  </div>
                )}
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
                                    <div
                                        className="row"
                                        style={{
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        {data && data?.map((item,index) => (
                                            <div className="col-lg-6 mb-5">
                                                <div className="usefullinks">
                                                    <img src={`https://lmpapi.handsintechnology.in/UsefulLinks/${item.file}`} className="w-100" style={{height:'246px'}}/>
                                                    <h4>{item.hospital_name}</h4>
                                                    <div className="wbeskkkjds">
                                                        <a href={item.website} target="_blank" rel="noopener noreferrer">
                                                            Website
                                                        </a>
                                                        <a href={item.direction} target="_blank" rel="noopener noreferrer">
                                                            Direction
                                                        </a>

                                                        
                                                            <a  
                                                            onClick={() => handleaddress(JSON.stringify(item))}
                                                            style={{cursor:'pointer'}}
                                                            >
                                                                Address
                                                            </a>
                                                            
                                                            <a href={`tel:${item.call}`}>
                                                                Call
                                                            </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {/* <div className="col-lg-6 mb-5">
                                            <div className="usefullinks">
                                                <img src={image11} className="w-100" />
                                                <h4>Neuro Spinal Hospital</h4>
                                                <div className="wbeskkkjds">
                                                    <a href="#">
                                                        Website
                                                    </a>
                                                    <a href="#">
                                                        Direction
                                                    </a>
                                                    <a href="#">
                                                        Address
                                                    </a>
                                                    <a href="#">
                                                        Call
                                                    </a>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-5">
                                            <div className="usefullinks">
                                                <img src={image11} className="w-100" />
                                                <h4>Neuro Spinal Hospital</h4>
                                                <div className="wbeskkkjds">
                                                    <a href="#">
                                                        Website
                                                    </a>
                                                    <a href="#">
                                                        Direction
                                                    </a>
                                                    <a href="#">
                                                        Address
                                                    </a>
                                                    <a href="#">
                                                        Call
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-5">
                                            <div className="usefullinks">
                                                <img src={image11} className="w-100" />
                                                <h4>Neuro Spinal Hospital</h4>
                                                <div className="wbeskkkjds">
                                                    <a href="#">
                                                        Website
                                                    </a>
                                                    <a href="#">
                                                        Direction
                                                    </a>
                                                    <a href="#">
                                                        Address
                                                    </a>
                                                    <a href="#">
                                                        Call
                                                    </a>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <GroupmedicalAlert />
            </Row>
            <Footer />
            <Modal 
                size="md"
                aria-labelledby="contained-modal-title-vcenter" 
                centered
                show={showaddress} 
                onHide={() => setShowaddress(false)} 
                animation={true}
            >
                <Modal.Header closeButton style={{backgroundColor:'#0D2F92'}}>
                    <Modal.Title style={{color:'#ffff'}}>{hospital_name}</Modal.Title>
                </Modal.Header >
                <Modal.Body>
                    <p><strong style={{color:'#0D2F92'}}>Address : {" "}</strong>{address}</p>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={() => setShowaddress(false)}>Close</Button> */}
                    {/* <Button variant="primary">Save changes</Button> */}
                    <div className="wbeskkkjds" style={{cursor:'pointer'}}>
                    <a onClick={() => setShowaddress(false)}>Close</a>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UsefulLinks;
