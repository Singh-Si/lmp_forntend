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



const ActiveMember = () => {
    const Navigate = useNavigate()
    const [excelmodal, setExcelModal] = useState(false);
    const [exceldata, setExcelData] = useState([]);
    const [leads, setLeads] = useState([])
    const [limit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [approvalleads, setApprovalLeads] = useState([])
    const [loader, setLoader] = useState(false)
    const [customername, setCustomername] = useState([])
    const [customerid, setCustomerid] = useState('')
    const [companyid, setCompanyid] = useState('')
    const [insurancecompanyname, setInsurancecompanyname] = useState([])
    const [insutancecompanyid, setInsurancecompanyid] = useState('')
    const [tpalist, setTpalist] = useState([])
    const [tpaid, setTpaid] = useState('')
    const [networklist, setNetworklist] = useState([])
    const [networkid, setNetworkid] = useState('')
    const [policylist, setPolicylist] = useState([])
    const [policyname, setPolicyname] = useState('')


    useEffect(() => {
        getLeads(page, limit)
        getCustomerlist()

    }, [])

    useEffect(() => {
        getLeads(page, limit)
    }, [customerid, insutancecompanyid, tpaid, networkid, policyname])

    //bulk upload excel
    const uploadexcel = async () => {
        try {
            console.log('Excel Uploaded')
            const data = new FormData()
            data.append('file', exceldata)
            const res = await fetch(`${API_URL}/api/addBulkGroupMedicalLeadsByHr`, {
                method: 'POST',
                body: data
            })
            const resdata = await res.json()
            console.log(resdata)
            if (resdata.success) {
                setExcelModal(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

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
            fetch(`${API_URL}/api/getHrUserLeads?limit=${limit}&page=${page}&leadType=Active&planId=${customerid}&companyId=${insutancecompanyid}&tpaId=${tpaid}&networkId=${networkid}&policyNumber=${policyname}`, requestOptions)
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
        }
    }

    console.log('leads', leads)
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1);
        getLeads(selectedPage + 1, limit);
    };

    const deletelead = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usertoken'),
            }
        };
        fetch(`${API_URL}/api/deleteSingleLeadBYId?id=${id}`, requestOptions)
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

    const createuser = async () => {
        try {

            console.log(approvalleads, 'approvalleads')
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken'),

                },

                body: JSON.stringify({
                    userDetails:
                        approvalleads.map((item, index) => ({
                            "name": `${item.firstName} ${item.middleName} ${item.lastnName}`,
                            "email": item.email,
                            "mobile": item.phoneno,
                            "employeeNumber" : item.employeeNumber
                        }))

                })
            };
            fetch(`${API_URL}/api/createUsersBYHr`, requestOptions)
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

    const deleteuser = async () => {
        try {

            console.log(approvalleads, 'approvalleads')
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken'),

                },

                body: JSON.stringify({
                    leadId: approvalleads.map((item, index) => item._id)

                })
            };
            fetch(`${API_URL}/api/tranceferGroupMedicalLaed?tranceferTo=Delete`, requestOptions)
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

    const getCustomerlist = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
                },
            };
            await fetch(`${API_URL}/api/getGroupMedicalPlanName`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setCustomername(data.data)
                });
        }
        catch (err) {
            console.log(err)
        }
    }

    const handlecustomername = (e) => {
        setInsurancecompanyname([]) 
        setTpalist([])
        setNetworklist([])
        setPolicylist([])

        const customer = JSON.parse(e.target.value)
        console.log(customer)
        setCustomerid(customer._id)
        setCompanyid(customer.company_id)
        getInsuranceName(customer.company_id)
        getTpaList(customer._id)
    }

   const getInsuranceName = async (company_id) => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
                },
            };
            await fetch(`${API_URL}/api/getInsuranceCompany?company_id=${company_id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setInsurancecompanyname(data.data)
                });
        }
        catch (err) {
            console.log(err)
        }
    }

    const getTpaList = async (planid) => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
                },
            };
            await fetch(`${API_URL}/api/getTpalist?plan_id=${planid}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log(data.data?.map((val)=> val.TPA))
                    setTpalist(data.data?.map((val)=> val.TPA))
                });
            }
            catch (err) {
                console.log(err);
            }
        }
        
        
        const handletpa = (e) => {
            setNetworklist([])
            setPolicylist([])
            const tpa = JSON.parse(e.target.value)
            console.log(tpa, 'tpa')
            setTpaid(tpa._id)
            getNetworllist(tpa._id)

        }
        
        const getNetworllist = async (tpa_id) => {
            console.log(tpa_id)
            console.log(customerid)

            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
                    },
                };
                await fetch(`${API_URL}/api/getNetworkList?planid=${customerid}&tpa_id=${tpa_id}`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data?.data)
                        setNetworklist(data?.data?.map((val)=> val.network))
                        setPolicylist(data?.data?.map((val)=> val.policy_name))
                    });
            }
            catch (err) {
                console.log(err)
            }
        }

        console.log(policylist.map((item)=>item), 'policylist')

        const handlenetwork = (e) => {
            const network = JSON.parse(e.target.value)
            console.log(network, 'network')
            setNetworkid(network._id)
        }


        console.log({'customerid':customerid,
        'companyid':companyid,
        'insutancecompanyid':insutancecompanyid,
        'tpaid': tpaid,
        'networkid': networkid,
        'policyname': policyname})






    return (
        <div>
            <Header />
            <GroupMedical />
            <Row className='groupback'>
                <Col lg={12} className='buttonss pt-4 pb-3' style={{ textAlign: 'right' }}>
                    <button className='buttonred' style={{ background: '#1C8701' }} onClick={() => createuser()}>
                        Create User
                    </button>
                    <button className='buttonred' onClick={() => deleteuser()}>
                        Delete Member
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
                                    <Row className='selectoption'>
                                        <Col lg={2}>
                                        <Form.Select aria-label="Default select example" onChange={handlecustomername}>
                                                <option hidden>Plan Name</option>
                                                {customername?.map((item, index) => (
                                                    <option value={JSON.stringify(item)}>{item?.plan_name}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                        <Form.Select aria-label="Default select example" onChange={(e)=> setInsurancecompanyid(e.target.value)}>
                                                <option hidden>Insurance Name</option>
                                                {insurancecompanyname?.map((item, index) => (
                                                    <option value={item?._id}>{item?.company_name}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                        <Form.Select aria-label="Default select example" onChange={handletpa}>
                                                <option hidden>TPA</option>
                                                {tpalist?.flatMap((item, index) => (
                                                    item?.map((val, index) => (
                                                    <option value={JSON.stringify(val)}>{val?.name}</option>
                                                    ))
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                        <Form.Select aria-label="Default select example" onChange={handlenetwork}>
                                                <option hidden>Network List</option>
                                                {networklist?.flatMap((item, index) => (
                                                    item.map((val, index) => (
                                                    <option value={JSON.stringify(val)}>{val?.name}</option>
                                                    ))
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                        <Form.Select aria-label="Default select example" onChange={(e)=>setPolicyname(e.target.value)}>
                                                <option hidden>Policy Number</option>
                                                {policylist?.map((item, index) => (
                                                    <option value={item}>{item}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Row>
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
                                                <th style={{width:'200px'}}>Name</th>
                                                <th>Email ID</th>
                                                <th>Phone No.</th>
                                                <th>Effective Date</th>
                                                <th>Approval Date</th>
                                                <th style={{width:'80px'}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leads?.map((item, index) => (
                                                <tr>
                                                    <td style={{width:'90px'}}><input className='tbcheck' type="checkbox" onChange={(e) => handleCheckboxChange(e, item)} />{item.employeeNumber}</td>
                                                    <td>{`${item?.firstName} ${item?.middleName} ${item?.lastnName}`}</td>
                                                    <td>{item?.email}</td>
                                                    <td>{item?.phoneno}</td>
                                                    <td>{item?.AdditionEffectiveDate && item?.AdditionEffectiveDate != '' ? formatedate(item?.AdditionEffectiveDate) : "-"}</td>
                                                    <td>{item?.sentToJdvDate && item?.sentToJdvDate != '' ? formatedate(item?.sentToJdvDate) : "-"}</td>

                                                    <td>
                                                        <button className='buttonblue1' onClick={() => Navigate(`/ActiveMemberView?id=${item?._id}`)}>
                                                            <i className='fa fa-eye'></i>
                                                        </button>

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
            <Modal show={excelmodal} onHide={() => setExcelModal(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type='file'
                        accept=".xls,.xlsx"
                        className='form-control'
                        onChange={(e) => setExcelData(e.target.files[0])}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className='buttonred' onClick={() => uploadexcel()} >Upload</button>
                    <button className='buttonred' onClick={() => setExcelModal(false)}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ActiveMember
