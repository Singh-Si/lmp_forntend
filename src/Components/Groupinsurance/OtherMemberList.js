import React, { useState, useEffect } from 'react'
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { API_URL } from '../..'
import GroupSidebar from "./GroupSidebar";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import { CSpinner } from '@coreui/react';
import GroupmedicalAlert from './GroupmedicalAlert';

const OtherMemberList = () => {

    const [data, setData] = useState([]);
    const [limit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        getMemberlist(page, limit);
    }, []);

    const getMemberlist = async (page, limit) => {
        try {
            setLoader(true)
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('usertoken')}`
                },
            };

            await fetch(`${API_URL}/api/getOrtherServiceFromHr?limit=${limit}&page=${page}&ortherServiceType=listReport`, requestOptions)
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
        getMemberlist(selectedPage + 1, limit);
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
                                    <table className="groupmedi table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Employee No.</th>
                                                <th>Member</th>
                                                <th>Principal</th>
                                                <th>Relation</th>
                                                <th>Category</th>
                                                <th>JDV Pol No.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.length > 0 && data?.map((item, index) => (

                                                <tr key={index}>

                                                    <td>{item.employeeNumber}</td>
                                                    <td>{item?.email}</td>
                                                    <td>{item.principal && item.principal != '' ? item.principal : "-"}</td>
                                                    <td>{item.relation && item.relation != '' ? item.relation : "-"}</td>
                                                    <td>{item.category && item.category != '' ? item.category : "-"}</td>
                                                    <td>{item.jdvPolNo && item.jdvPolNo != '' ? item.jdvPolNo : "-"}</td>
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

export default OtherMemberList;
