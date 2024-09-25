import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import GroupSidebar from "./GroupSidebar";
import { API_URL } from "../..";
import axios from "axios";
import { CSpinner } from "@coreui/react";
import GroupmedicalAlert from "./GroupmedicalAlert";

const GroupClaimHandlingProcedure = () => {

  const [proceduredata, setProceduredata] = useState([]);
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    getproceduredata();
  }, []);


  const getproceduredata = async () => {
    try {
      setLoader(true)
      let config = {
        method: "GET",
        url: `${API_URL}/api/getActiveClaimProcedure`,
      };
      axios(config)
        .then((res) => {
          console.log(res.data.data);
          setProceduredata(res.data.data);
          setLoader(false)
        })
        .catch((error) => {
          console.log(error);
          setLoader(false)
        });
    } catch (error) {
      console.log(error);
      setLoader(false)
    }
  }

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
                  <div className="procedureplan mb-4">
                    <div className="row" style={{ alignItems: "center" }}>
                      <div className="col-lg-6">
                        <h4>Claim Handling Procedure</h4>
                      </div>
                      <div className="col-lg-6">

                        <button>
                          <a
                            href="#"
                            // href={`${API_URL}/uploads/${data?.file}`}
                            // download={`${API_URL}/uploads/${data?.file}`} target='_blank' rel="noreferrer"
                            style={{ textDecoration: 'none', color: 'white' }}>
                            Download Handling Procedure{" "}
                            <i className="fa fa-download" aria-hidden="true"></i>
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="procedureplan1">
                    {proceduredata?.map((data, index) => (
                      <React.Fragment key={index}>
                        <h4>{data.heading}</h4>

                        <p>
                          {data.procedure_description} {""}
                          <a href={data.link} target="_blank" rel="noopener noreferrer"><strong>Website</strong></a>
                        </p>
                        <br />
                      </React.Fragment>
                    ))}
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

export default GroupClaimHandlingProcedure;
