import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import GroupMedical from '../Banner/GroupMedical'
import { Col, Container, Form, Row, Table, Modal, Button } from 'react-bootstrap'
import GroupSidebar from './GroupSidebar'
import { Link, useNavigate } from 'react-router-dom'
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
} from "@coreui/react";

const AddMembersdocument = () => {

    const Navigate = useNavigate()
    const [documentsdata, setDocumentsdata] = useState([]);
    const [documents, setDocuments] = useState([]);

    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [filedata, setFiledata] = useState("");
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [docData, setDocData] = useState({});
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const url = window.location.href;
    const url1 = url.split("/")[3];
    const url2 = url1.split("?")[1];
    const id = url2.split("=")[1];

    useEffect(() => {
        getDocumentsLob()
        GetAllDocuments()
    }, [id]);


    const getDocumentsLob = async () => {

        await axios
            .get(`${API_URL}/api/getGroupMedicalDocuments?category=new`)
            .then((result) => {
                setDocumentsdata(result.data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const GetAllDocuments = async () => {
        try {

            await axios
                .get(`${API_URL}/api/GetSingleMemberRequest?id=${id}`)
                .then(async (response) => {
                    console.log("response", response?.data?.data[0]?.documents)
                    setDocuments(response?.data?.data[0]?.documents)
                    console.log("response", documents)
                })
                .catch((error) => {
                    console.log("error", error.message)
                })


        } catch (error) {
            console.log(error.message);
        }
    };

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

    const uploadAllDocuments = async () => {
        try {
            setLoading(true);
            let docId = id;
            const formData = new FormData();
            const documentName = docData.fileName;
            const fileIndex = docData.index;
            const documentFile = uploadedDocuments[docData.index];


            console.log("documentFile", documentFile)
            console.log("documentFile.type", documentFile.type)
            formData.append("id", docId);
            formData.append("name", documentName);
            formData.append("status", "");
            formData.append("reason", "");
            formData.append("file", documentFile);
            formData.append("fileindex", fileIndex);
            // formData.append("totaldocs", docData.DocTotal);

            console.log(Array.from(formData), "formData");


            if (documentFile != null) {
                await axios
                    .post(API_URL + "/api/update_single_group_documents", formData, {
                        method: "post",
                        // headers: {
                        //   "Content-Type": "multipart/form-data",
                        // },
                    })
                    .then((data) => {
                        console.log("data", data.data.status);
                        if (data.data.status == 200) {
                            // swal("Success!", "Updated", "success");
                            console.log("data", data.data.data);
                            console.log("data", data.data.data.documents);
                            setDocuments(data.data.data.documents);
                            GetAllDocuments();
                            setVisible(false)

                        } else {
                            swal("Error!", "Something went wrong", "error");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(() => {
                        setLoading(false);
                        setProgress(0);
                    });
            } else {
                alert("Please select required document");
            }

        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div>
            <Header />
            <GroupMedical />
            <Row className='groupback'>

                <Container fluid className="group-medicalss">
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Col lg={12}>
                            <Row>
                                <Col lg="3">
                                    <GroupSidebar />
                                </Col>
                                <Col lg="9">
                                    <Row className='selectoption'>
                                        <Col lg={9}>
                                            <div>
                                                <p className="abcds123456 text-danger" style={{ display: 'flex', justifyContent: "center", alignItems: 'center', fontWeight: 'bold' }}>Upload documents</p>
                                                <div className="policyrenewals">
                                                    <div className="container myprofile1 pt-4 pb-4">
                                                        <div className="row" style={{ justifyContent: "center" }}>
                                                            <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                                                                <div className="rowabcds">
                                                                    {documentsdata?.length > 0 && documentsdata.map((doc, indeX) => (
                                                                        <>
                                                                            <div key={indeX} className="row policy_documents">
                                                                                <div className="col-lg-6">
                                                                                    <p>{doc.document_type}</p>
                                                                                </div>
                                                                                <div className="col-lg-6">

                                                                                    <button
                                                                                        type="file"
                                                                                        className="uploaddocus"
                                                                                        onClick={() =>
                                                                                            openModal(
                                                                                                doc._id,
                                                                                                indeX,
                                                                                                doc.document_type,

                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Upload
                                                                                    </button>


                                                                                    {documents &&
                                                                                        documents.map((docItem, i) => {

                                                                                            return docItem.name === doc.document_type ? (
                                                                                                <>
                                                                                                    {docItem.file ?
                                                                                                        <button
                                                                                                            type="file"
                                                                                                            className="text-primary uploaddocus mx-2"
                                                                                                            onClick={() =>
                                                                                                                handleModal(docItem.file)
                                                                                                            }
                                                                                                        >
                                                                                                            View
                                                                                                        </button> : ""}
                                                                                                    {docItem.message != "" ? (
                                                                                                        <p className="text-danger">
                                                                                                            {docItem.reason}
                                                                                                        </p>
                                                                                                    ) : (
                                                                                                        ""
                                                                                                    )}
                                                                                                </>
                                                                                            ) : (
                                                                                                ""
                                                                                            );
                                                                                        })}
                                                                                </div>
                                                                            </div>
                                                                        </>

                                                                    ))}

                                                                </div>

                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="gotodashboard mb-3 mt-3"
                                                                        onClick={() => Navigate("/AddMembers")}
                                                                    >
                                                                        Back
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>


                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Footer />

            <CModal
                alignment="center"
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
                                    {/* <ClipLoader color="green" loading={loading} size={100} /> */}
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
            </CModal>
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

export default AddMembersdocument
