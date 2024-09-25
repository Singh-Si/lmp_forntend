import React, { useState, useEffect } from 'react'
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { API_URL } from '../..'
import GroupSidebar from "./GroupSidebar";
import ReactPaginate from "react-paginate";
import { CSpinner } from "@coreui/react";
import swal from 'sweetalert';
import GroupmedicalAlert from './GroupmedicalAlert';


const DetailedReportRequest = () => {

    const [data, setData] = useState([]);
    const [limit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getDetailedrequest(page, limit);
    }, []);

    const getDetailedrequest = async (page, limit) => {
        try {
            setLoader(true)
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('usertoken')}`
                },
            };

            await fetch(`${API_URL}/api/getOrtherServiceFromHr?limit=${limit}&page=${page}&ortherServiceType=report`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data, "dataksdefkselkfslkfk");
                    if (data.status === 200) {
                        console.log(data.data);
                        const total = data.total;
                        const slice = total / limit;
                        const pages = Math.ceil(slice);
                        setPageCount(pages);
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
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1);
        getDetailedrequest(selectedPage + 1, limit);
    };

    const formatedate = (date) => {
        const d = date?.split("T")[0];
        const finaldate = d?.split("-").reverse().join("/");
        return finaldate;
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
                                    <Row style={{ justifyContent: 'space-between' }}>
                                        <Col lg={5}>
                                            <div class="selectoption new row">
                                                <div class="col-lg-4">
                                                    <label>From Date</label>
                                                    <input type="date" className="form-control-date" />
                                                </div>
                                                <div class="col-lg-4">
                                                    <label>To Date</label>
                                                    <input type="date" className="form-control-date" />
                                                </div>
                                                <div class="col-lg-4">
                                                    {/* <label style={{ visibility: 'hidden', display: 'block' }}>fdfdff</label>
                                                    <button className="searchclaimss">Search</button> */}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div class="selectoption new row">
                                                <div class="col-lg-6">
                                                    <label style={{ visibility: 'hidden' }}>sasasa</label>
                                                    <select aria-label="Default select example" class="form-select">
                                                        <option>All</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </div>
                                                <div class="col-lg-6">
                                                    <label style={{ visibility: 'hidden', display: 'block' }}>fdfdff</label>
                                                    <button className="searchclaimss" style={{ width: '100%', background: '#0F6901' }}>Export</button>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <p className="statusofclaim">Status Of Reimbursement Claims Through JDV ( Detailed Report )</p>
                                    <table className="groupmedi table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Request Type</th>
                                                <th>User ID</th>
                                                <th>Name</th>
                                                <th>Requested On</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.length > 0 && data?.map((item, index) => (

                                                <tr key={index}>

                                                    <td>{"-"}</td>
                                                    <td>{item?.email}</td>
                                                    <td>{`${item.firstName} ${item.middleName} ${item.lastnName}`}</td>
                                                    <td>{item.createdAt && item.createdAt != '' ? formatedate(item.createdAt) : "-"}</td>

                                                </tr>

                                            ))}

                                        </tbody>
                                    </table>
                                    <ReactPaginate
                                        previousLabel={"Previous"}
                                        nextLabel={"Next"}
                                        breakLabel={"..."}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination justify-content-end"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        previousClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextClassName={"page-item"}
                                        nextLinkClassName={"page-link"}
                                        breakClassName={"page-item"}
                                        breakLinkClassName={"page-link"}
                                        activeClassName={"active"}
                                    />
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

export default DetailedReportRequest;
