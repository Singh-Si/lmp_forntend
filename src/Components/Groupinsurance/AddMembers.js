import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import GroupMedical from '../Banner/GroupMedical'
import { Col, Container, Form, Row, Table, Modal, Button } from 'react-bootstrap'
import GroupSidebar from './GroupSidebar'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../..'
import ReactPaginate from "react-paginate";
import swal from 'sweetalert'
import sample from '../../Image/sample/sample.xlsx'
import axios from 'axios'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CProgress,
    CSpinner,
} from "@coreui/react";
import { validateYupSchema } from 'formik'
import GroupmedicalAlert from './GroupmedicalAlert'

const AddMembers = () => {
    const Navigate = useNavigate()
    const [leads, setLeads] = useState([])
    const [limit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [approvalleads, setApprovalLeads] = useState([])
    const [id, setId] = useState('')
    const [showmodal, setShowModal] = useState(false)
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
            await fetch(`${API_URL}/api/getHrUserLeads?limit=${limit}&page=${page}&leadType=newlyAdded&planId=${customerid}&companyId=${insutancecompanyid}&tpaId=${tpaid}&networkId=${networkid}&policyNumber=${policyname}`, requestOptions)
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

    const handleApproval = async () => {
        try {
            if (approvalleads.length == 0) {
                swal({
                    text: 'Please select atleast one lead',
                    icon: "warning",
                    type: "warning",
                })
                return
            }

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
            fetch(`${API_URL}/api/tranceferGroupMedicalLaed?tranceferTo=memberApproval`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status == 200) {
                        swal({
                            text: data.message,
                            icon: "success",
                            type: "success",
                        })

                        setApprovalLeads([])
                        getLeads(page,limit)
                        Navigate('/AddMembers')

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

    const handleverification = async (id) => {
        setId(id)
        setShowModal(true)

    }

    const [documentsdata, setDocumentsdata] = useState([]);
    const [documents, setDocuments] = useState([]);

    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [filedata, setFiledata] = useState("");
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [docData, setDocData] = useState({});
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
  



    useEffect(() => {
        getDocumentsLob()
        // GetAllDocuments()
    }, [id]);


    const getDocumentsLob = async () => {

        await axios
            .get(`${API_URL}/api/getDocumentsLob?lob=groupMedical`)
            .then((result) => {
                setDocumentsdata(result.data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    // const GetAllDocuments = async () => {
    //     try {

    //         await axios
    //             .get(`${API_URL}/api/getGroupMedicalLeadsById?leadId=${id}`)
    //             .then(async (response) => {
    //                 console.log("response", response?.data[0]?.documents)
    //                 setDocuments(response?.data[0]?.documents)
    //                 console.log("response", documents)
    //             })
    //             .catch((error) => {
    //                 console.log("error", error.message)
    //             })


    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    console.log("documents", documents)

    const handleFileUpload = (e, index) => {
        const file = e.target.files[0];
        const updatedDocuments = [...uploadedDocuments];
        updatedDocuments[index] = file;
        setUploadedDocuments(updatedDocuments);
        console.log("updatedDocuments", updatedDocuments);
    };

    const handleModal = (file) => {
        setFiledata(file);
        //console.log(filedata, "filedata");
        setShow(true);
    };

    const openModal = (id, index, name) => {
        setDocData({
            id: id,
            index: index,
            fileName: name,
        });

        console.log("docData", docData);

        try {
            axios
                .post(API_URL + "/api/get_Documents_listbyid", {
                    method: "post",
                    ParamValue: id,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((result) => {
                    console.log(result.data.data);
                    setDocuments(result.data.data);
                });
        } catch (error) {
            //console.log(error.message);
        }

        setVisible(!visible);
    };

    // const uploadAllDocuments = async () => {
    //     try {
    //         console.log("id", id);
    //         setLoading(true);
    //         let docId = id;
    //         const formData = new FormData();
    //         const documentName = docData.fileName;
    //         const fileIndex = docData.index;
    //         const documentFile = uploadedDocuments[docData.index];


    //         console.log("documentFile", documentFile)
    //         console.log("documentFile.type", documentFile.type)
    //         formData.append("id", docId);
    //         formData.append("name", documentName);
    //         formData.append("status", "");
    //         formData.append("reason", "");
    //         formData.append("file", documentFile);
    //         formData.append("fileindex", fileIndex);
    //         // formData.append("totaldocs", docData.DocTotal);

    //         console.log(Array.from(formData), "formData");


    //         if (documentFile != null) {
    //             await axios
    //                 .post(API_URL + "/api/update_single_group_documents", formData, {
    //                     method: "post",
    //                     // headers: {
    //                     //   "Content-Type": "multipart/form-data",
    //                     // },
    //                 })
    //                 .then((data) => {
    //                     console.log("data", data.data.status);
    //                     if (data.data.status == 200) {
    //                         // swal("Success!", "Updated", "success");
    //                         console.log("data", data.data.data);
    //                         console.log("data", data.data.data.documents);
    //                         setDocuments(data.data.data.documents);
    //                         GetAllDocuments();
    //                         setVisible(false)

    //                     } else {
    //                         swal("Error!", "Something went wrong", "error");
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.error(error);
    //                 })
    //                 .finally(() => {
    //                     setLoading(false);
    //                     setProgress(0);
    //                 });
    //         } else {
    //             alert("Please select required document");
    //         }

    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

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
                    <button className='buttonred' onClick={()=> handleApproval()}>
                        Sent to Approval
                    </button>
                    <button className='buttonred' style={{ background: '#1C8701' }} onClick={() => Navigate('/AddMembersmanually')}>
                        Add Manual
                    </button>
                    <button className='buttonblue'>
                        <a href={sample} download style={{ color: 'white', textDecoration: 'none' }}>
                            Download Form
                        </a>
                    </button>
                    <button className='buttonblue' onClick={() => Navigate('/AddMembersExcel')}>
                        Upload Form
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
                                                <option hidden>Customer Name</option>
                                                {customername?.map((item, index) => (
                                                    <option value={JSON.stringify(item)}>{item.plan_name}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                            <Form.Select aria-label="Default select example" onChange={(e)=> setInsurancecompanyid(e.target.value)}>
                                                <option hidden>Insurance Name</option>
                                                {insurancecompanyname?.map((item, index) => (
                                                    <option value={item._id}>{item.company_name}</option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                            <Form.Select aria-label="Default select example" onChange={handletpa}>
                                                <option hidden>TPA</option>
                                                {tpalist?.flatMap((item, index) => (
                                                    item.map((val, index) => (
                                                    <option value={JSON.stringify(val)}>{val.name}</option>
                                                    ))
                                                ))}
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2}>
                                            <Form.Select aria-label="Default select example" onChange={handlenetwork}>
                                                <option hidden>Network List</option>
                                                {networklist?.flatMap((item, index) => (
                                                    item.map((val, index) => (
                                                    <option value={JSON.stringify(val)}>{val.name}</option>
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
                                                    <th >Employee No.</th>
                                                    <th style={{ width: '200px' }}>Name</th>
                                                    <th>Relation</th>
                                                    <th>Email ID</th>
                                                    <th>Phone No.</th>
                                                    <th>Effective Date</th>
                                                    <th>Request Date</th>
                                                    {/* <th>Approval Date</th> */}
                                                    <th style={{ width: '130px' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {leads?.map((item, index) => (
                                                    <tr>
                                                        <td style={{ width: '10px' }} key={item?._id}><input className='tbcheck' type="checkbox" defaultChecked={approvalleads?.includes(item?._id)} onChange={(e) => handleCheckboxChange(e, item?._id)} />{item?.employeeNumber}</td>
                                                        <td>{`${item?.firstName} ${item?.middleName} ${item?.lastnName}`}</td>
                                                        <td>{item?.relation && item?.relation != '' ? item?.relation : '-'}</td>
                                                        <td>{item?.email}</td>
                                                        <td>{item?.phoneno}</td>
                                                        <td>{item?.AdditionEffectiveDate && item?.AdditionEffectiveDate != '' ? formatedate(item?.AdditionEffectiveDate) : "-"}</td>
                                                        <td>{item?.createdAt && item?.createdAt != '' ? formatedate(item?.createdAt) : "-"}</td>
                                                        {/* <td>{item.sentToMembarDate && item.sentToMembarDate != '' ? formatedate(item.sentToMembarDate) : "-"}</td> */}
                                                        {/* <td>{item.sentToJdvDate && item.sentToJdvDate != '' ? formatedate(item.sentToJdvDate) : "-"}</td> */}
                                                        <td>
                                                            <button className='buttonblue1' onClick={() => Navigate(`/ViewMembers?id=${item?._id}`)}><i className='fa fa-eye'></i></button>
                                                            <button className='buttongreen1' onClick={() => Navigate(`/AddMembersdocument?id=${item?._id}`)}><i className='fa fa-file'></i></button>
                                                            <button className='buttonred1' onClick={() => {
                                                                if (
                                                                    window.confirm('Are you sure you wish to delete this entry?')
                                                                )
                                                                    deletelead(item?._id, false)
                                                            }}><i className='fa fa-trash'></i></button>
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
            <Modal size='lg' show={showmodal} onHide={() => setShowModal(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Documents</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col lg="12">
                        <Row className='selectoption'>
                            <Col lg={9}>
                                <div>
                                    <div className="policyrenewals">
                                        <div className="container myprofile1 pt-4 pb-4">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Document Type</th>
                                                        <th>Upload</th>
                                                        <th>View</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {documentsdata?.length > 0 && documentsdata?.map((doc, indeX) => (
                                                        <tr key={indeX}>
                                                            <td>{doc?.document_type}</td>
                                                            <td>
                                                                <button
                                                                    type="file"
                                                                    className="uploaddocus"
                                                                    onClick={() =>
                                                                        openModal(
                                                                            doc._id,
                                                                            indeX,
                                                                            doc?.document_type,
                                                                        )
                                                                    }
                                                                >
                                                                    Upload
                                                                </button>
                                                            </td>
                                                            <td>
                                                                {documents &&
                                                                    documents?.map((docItem, i) => {
                                                                        return docItem?.name === doc?.document_type ? (
                                                                            <React.Fragment key={i}>
                                                                                {docItem?.file &&
                                                                                    <button
                                                                                        type="file"
                                                                                        className="text-primary uploaddocus mx-2"
                                                                                        onClick={() =>
                                                                                            handleModal(docItem?.file)
                                                                                        }
                                                                                    >
                                                                                        View
                                                                                    </button>}
                                                                                {docItem?.message !== "" &&
                                                                                    <p className="text-danger">
                                                                                        {docItem?.reason}
                                                                                    </p>}
                                                                            </React.Fragment>
                                                                        ) : null;
                                                                    })}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>



                    </Col>
                </Modal.Body>
            </Modal>
            {/* <CModal
                alignment="top"
                size='lg'
                visible={visible}
                onClose={() => { setVisible(false); GetAllDocuments(); setLoading(false) }}

            >
                <CModalHeader onClose={() => { setVisible(false); GetAllDocuments(); setLoading(false) }}>
                    <CModalTitle>Upload {docData.fileName}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        {loading ?
                            <div className="overlay">
                                <div className="loader-container">
                                    <CProgress color="primary" variant="striped" animated value={100} />

                                    <div><strong>Uploading, please wait...</strong></div>
                                    <div className="loader-text"><strong>Do Not Refresh The Page</strong></div>
                                </div>
                            </div>
                            :
                            <label for="images" class="drop-container" id="dropcontainer">
                                <span class="drop-title">Drag and Drop file here</span>
                                or
                                <input
                                    type="file"
                                    className="form-control"
                                    id="DHA"
                                    defaultValue=""
                                    required
                                    onChange={(e) => handleFileUpload(e, docData.index)}
                                />
                            </label>
                        }
                    </div>
                </CModalBody>
                {
                    loading ? "" :
                        <>
                            <CModalFooter>
                                <CButton color="gotodashboard" onClick={uploadAllDocuments}>
                                    Upload
                                </CButton>
                                <CButton color="gotodashboard12" onClick={() => { setVisible(false); GetAllDocuments(); }}>
                                    Close
                                </CButton>
                            </CModalFooter>
                        </>
                }
            </CModal> */}

            <Modal size="lg" show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton ></Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <div className="col-md-12">
                                <div className="form-group col-md-12">
                                    {filedata?.includes(".pdf") ? (
                                        <div>
                                            <iframe
                                                title="PDF Viewer"
                                                style={{
                                                    width: "100%",
                                                    height: "450px",
                                                    border: "none",
                                                }}
                                                src={`${API_URL}/documents/${filedata}`}
                                            />
                                            <p>
                                                If Your browser does not support PDFs. You can {" "}
                                                <a href={`${API_URL}/documents/${filedata}`} target="_blank" rel="noopener noreferrer">Download</a>
                                                {" "}the PDF.
                                            </p>
                                            {/* <embed src={`${API_URL}/documents/${filedata}`} type="application/pdf" width="400px" height="400px" />  */}



                                        </div>
                                    ) : (
                                        <img
                                            style={{ width: "100%", height: "auto" }}
                                            src={`${API_URL}/documents/${filedata}`}
                                        />
                                    )}
                                </div>
                            </div>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default AddMembers
