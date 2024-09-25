import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import GroupSidebar from "./GroupSidebar";
import GroupmedicalAlert from "./GroupmedicalAlert";

const TatOnCard = () => {
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
                                <Col lg="9">
                                    <div
                                        className="row"
                                        style={{
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div className="col-lg-5 mb-4">
                                            <div className="member">
                                                <h4>Within TAT</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 mb-4">
                                            <div className="member">
                                                <h4>Beyond TAT</h4>
                                            </div>
                                        </div>
                                    </div>
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

export default TatOnCard;
