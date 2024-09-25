import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import GroupMedical from '../Banner/GroupMedical'
import { Col, Container, Form, Row, Table, Modal } from 'react-bootstrap'
import GroupSidebar from './GroupSidebar'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../..'
import ReactPaginate from "react-paginate";
import swal from 'sweetalert'
import sample from '../../Image/sample/sample.xlsx'
import { CSpinner } from '@coreui/react'
import GroupmedicalAlert from './GroupmedicalAlert'
const MemberApproval = () => {

        const Navigate = useNavigate()
        const [excelmodal, setExcelModal] = useState(false);
        const [exceldata, setExcelData] = useState([]);
        const [leads, setLeads] = useState([])
        const [limit] = useState(10);
        const [pageCount, setPageCount] = useState(0);
        const [page, setPage] = useState(1);
        const [approvalleads, setApprovalLeads] = useState([])
        const [loader, setLoader] = useState(false)

    
        useEffect(() => {
            getLeads(page, limit)
        }, [])
    
        const getLeads = async (page, limit) => {
            try {
            setLoader(true)

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
    
                    },
    
                };
               await fetch(`${API_URL}/api/getHrUserLeads?limit=${limit}&page=${page}&leadType=memberApproval`, requestOptions)
                    .then(response => response.json())
                    .then(
                        data => {
                            const total = data.total;
                            const slice = total / limit;
                            const pages = Math.ceil(slice);
                            setPageCount(pages);
                            const list = data.data;
                            setLeads(list)
                            setLoader(false)
    
                        }
                    );
            } catch (err) {
                console.log(err)
                setLoader(false)
            }
        }
    
        console.log('leads', leads)
        const handlePageClick = (e) => {
            const selectedPage = e.selected;
            setPage(selectedPage + 1);
            getLeads(selectedPage + 1, limit);
        };
    
        const formatedate = (date) => {
            const d = date?.split("T")[0];
            const finaldate = d?.split("-").reverse().join("/");
            return finaldate;
        }
    
        
        const handleCheckboxChange = (e, id) => {
            const stateValue = [...approvalleads]
    
            if (e.target.checked === true) {
                // id['checked'] = 'checked';
                stateValue.push(id)
            } else if (e.target.checked === false) {
    
                const indx = stateValue.indexOf(id)
                console.log(indx)
                stateValue.splice(indx, 1)
            }
            console.log(stateValue, "state value")
            setApprovalLeads(stateValue)
    
        };
    
        const handleApproval = async () => {
            try {
    
                console.log(approvalleads, 'approvalleads')
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('usertoken'),
    
                    },
    
                    body: JSON.stringify({
                        leadId: approvalleads
                    })
                };
                fetch(`${API_URL}/api/tranceferGroupMedicalLaed?tranceferTo=JDV`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status == 200) {
                            swal({
                                text: data.message,
                                icon: "success",
                                type: "success",
                            })
                            getLeads(page, limit)
                        } else {
                            swal({
                                text: data.message,
                                icon: "error",
                                type: "error",
                            })
                        }
                    });
            }
            catch (err) {
                console.log(err)
            }
        }

        return (

        <div>
            <Header />
            <GroupMedical />
            <Row className='groupback'>
                <Col lg={12} className='buttonss pt-4 pb-3' style={{ textAlign: 'right' }}>
                    <button className='buttonred' onClick={()=>handleApproval()}>
                        Sent To Insurer
                    </button>
                </Col>
                <Container fluid className="group-medicalss">
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Col lg={12}>
                            <Row>
                                <Col lg="3">
                                <div className="sidebar">
                                        <GroupSidebar />
                                    </div>
                                </Col>
                                <Col lg="9">
                                    {/* <Row className='selectoption'>
                                        <Col lg={2}>
                                            <Form.Select aria-label="Default select example">
                                                <option>Insurance Name</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                            <Form.Select aria-label="Default select example">
                                                <option>Customer Name</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                            <Form.Select aria-label="Default select example">
                                                <option>TPA</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                            <Form.Select aria-label="Default select example">
                                                <option>Network List</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                            <Form.Select aria-label="Default select example">
                                                <option>Policy Number</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Col>
                                    </Row> */}
                                    <div className="table-responsive">
                                    {loader && (
                                            <div className="loader-overlay" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
                                                <div className="loader">
                                                    <CSpinner color="danger" size="lg" />
                                                </div>
                                            </div>
                                        )}
                                    <Table striped bordered hover className='groupmedi'>
                                        <thead>
                                            <tr>
                                                <th>Employee No.</th>
                                                <th>Request Type</th>
                                                <th style={{width:'200px'}}>Name</th>
                                                <th>Email ID</th>
                                                <th>Phone No.</th>
                                                <th>Effective Date</th>
                                                <th>Request Date</th>
                                                <th>Approval Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leads.map((item, index) => (
                                                <tr>
                                                    <td style={{width:'90px'}}><input className='tbcheck' type="checkbox" onChange={(e) => handleCheckboxChange(e, item._id)} />{item.employeeNumber}</td>
                                                    <td>{item?.userleadStatus && item?.userleadStatus == "newJdv" || "newMemverApproval"  ? "New Request"  : item?.userleadStatus && item?.userleadStatus == "deleteJdv" || "deleteMemverApproval"  ? "Delete Request" :  "-"}</td>
                                                    <td>{`${item.firstName} ${item.middleName} ${item.lastnName}`}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phoneno}</td>
                                                    <td>{item.AdditionEffectiveDate && item.AdditionEffectiveDate != '' ? formatedate(item.AdditionEffectiveDate) : "-"}</td>
                                                    <td>{item.sentToMembarDate && item.sentToMembarDate != '' ? formatedate(item.sentToMembarDate) : "-"}</td>
                                                    <td>{item.sentToJdvDate && item.sentToJdvDate != '' ? formatedate(item.sentToJdvDate) : "-"}</td>
                                                    <td>
                                                        <button className='buttonblue1' onClick={() => Navigate(`/MemberApprovalView?id=${item._id}`)}> <i className='fa fa-eye'></i></button>
                                                        {/* <button className='buttonred' onClick={() => {
                                                            if (
                                                                window.confirm('Are you sure you wish to delete this entry?')
                                                            )
                                                                deletelead(item._id, false)
                                                        }}>Delete</button> */}
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                        </Table>
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
    )
}

export default MemberApproval