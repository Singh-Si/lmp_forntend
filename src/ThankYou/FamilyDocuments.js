import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '..';
import swal from 'sweetalert';
import { getCardetailsByLeadid } from '../functions';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CProgress, } from "@coreui/react";
import moment from 'moment';
const FamilyDocuments = (props) => {
    const [documents, setDocuments] = useState([]);
    const [visible, setVisible] = useState(false);
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [show, setShow] = useState(false);
    const [filedata, setFiledata] = useState("");
    const [docData, setDocData] = useState({});
    const [loading, setLoading] = useState(false);
    const handleFileUpload = (e, index) => {
        const file = e.target.files[0];
        const updatedDocuments = [...uploadedDocuments];
        updatedDocuments[index] = file;
        setUploadedDocuments(updatedDocuments);
    };
    const handleModal = (index, file) => {
        setFiledata(file);
        setShow(true);
    };
    const openModal = (id, index, name, familyindex) => {
        setDocData({
            id: id,
            index: index,
            familyindex: familyindex,
            fileName: name,
        });



        setVisible(!visible);
    };
    const uploadAllDocuments = async () => {
        setLoading(true);
        let docId = docData.id
        const formData = new FormData();
        const documentName = docData.fileName;
        const fileIndex = docData.index;
        const index = docData.familyindex
        const documentFile = uploadedDocuments[docData.index];
        formData.append("id", docId);
        formData.append("newLeadId", props.leadid);
        formData.append("index", index);
        formData.append("name", documentName);
        formData.append("file", documentFile);
        formData.append("fileindex", fileIndex);
        if (documentFile != null) {
            await axios
                .post(API_URL + "/api/updateTravelFamilydocuments", formData, {
                    method: "post",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((data) => {
                    console.log("data???????", data)
                    if (data.data.status == 200) {
                        console.log(">>>>>travel_family_details", data.data.data.travel_family_details)

                        props.settravelfamilyeffect(data.data.data.travel_family_details)
                        console.log("?gfdggsgs", data.data.data.travel_family_details[docsvisible.index]["document"])
                        setDocsvisible({
                            documents: data.data.data.travel_family_details[docsvisible.index]["document"],
                            index: docsvisible.index,
                            status: true
                        })
                        swal("Success!", "Updated", "success");

                        setShow(false);
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
                });
        } else {
            alert("Please select required document");
        }
    };
    const [docsvisible, setDocsvisible] = useState({
        index: null,
        status: false,
        documents: []
    })
    console.log("docsvisible", docsvisible)
    // useEffect(()=>{

    // },[docsvisible])
    console.log("travelfamilyeffect", props.travelfamilyeffect)
    return (
        <>

            {props.traveldata && props.traveldata.length > 0 && props.traveldata?.filter(item => item.travel_plan_type == "641d418b19807a3c58191f7f" ? true : false).map((item, index) => (
                <>
                    <p className='abcds123456 text-danger mt-5'>Upload Your Family Documents</p>
                    {props.travelfamilyeffect && props.travelfamilyeffect.length > 0 && props.travelfamilyeffect.map((todo, index) => (
                        <div className='row custom_formss1234' key={index}>
                            <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    className='form-control'
                                    defaultValue={todo.name}
                                    readOnly
                                    required
                                />
                            </div>
                            <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder="passport"
                                    name="passport"
                                    defaultValue={todo.passport}
                                    readOnly
                                    required

                                />
                            </div>
                            <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>

                                <input
                                    type="text"
                                    defaultValue={todo && todo.date ? moment(new Date(todo.date)).format("DD/MM/YYYY") : null}
                                    className='form-control'
                                    placeholder="passport"
                                    name="passport"
                                    readOnly

                                />

                            </div>
                            <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                                <input
                                    type="text"
                                    defaultValue={todo.relation}
                                    className='form-control'
                                    placeholder="passport"
                                    name="passport"
                                    readOnly
                                />
                            </div>
                            <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                                <button
                                    type="file"
                                    className="uploaddocus"
                                    onClick={() => docsvisible.index == index && docsvisible.status ? setDocsvisible({
                                        index: index,
                                        status: false
                                    }) :
                                        !docsvisible.index ?
                                            setDocsvisible({
                                                index: index,
                                                status: true,
                                                documents: todo.document ? todo.document : []
                                            }) :
                                            setDocsvisible({
                                                index: index,
                                                status: true,
                                                documents: todo.document ? todo.document : []
                                            })
                                    }
                                >
                                    {docsvisible.index == index && docsvisible.status ? "Close" : !docsvisible.index ? "Upload" : "Upload"}
                                </button>
                            </div>
                            {docsvisible.index == index && docsvisible.status === true && (<div className="policyrenewals">
                                <div className="container myprofile1 pt-4 pb-4">
                                    <div className="row" style={{ justifyContent: "center" }}>
                                        <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                                            {/* { lob === "Motor" && */}
                                            <div className="rowabcds">
                                                {props.policyData?.length > 0 && props.policyData.map((doc, indeX) => (
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
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    Upload
                                                                </button>

                                                                {docsvisible.documents && docsvisible.documents.length > 0 &&
                                                                    docsvisible.documents.map((docItem, i) => {

                                                                        return docItem.name === doc.document_type ? (
                                                                            <>

                                                                                <button
                                                                                    type="file"
                                                                                    className="text-primary uploaddocus mx-2"
                                                                                    onClick={() =>
                                                                                        props.handleModal(docItem.file)
                                                                                    }
                                                                                >
                                                                                    View
                                                                                </button>
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

                                        </div>
                                    </div>
                                </div>

                            </div>)}
                        </div>

                    ))}

                </>

            ))}
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => { setVisible(false); }}

            >
                <CModalHeader onClose={() => { setVisible(false); }}>
                    <CModalTitle>Upload {docData.fileName}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        {loading ?
                            <div className="overlay">
                                <div className="loader-container">
                                    <CProgress color="primary" variant="striped" animated value={100} />
                                    <div>Uploading, please wait...</div>
                                    <div className="loader-text">Do Not Refresh The Page</div>
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
                <CModalFooter>

                    <CButton color="gotodashboard" onClick={uploadAllDocuments}>
                        Upload
                    </CButton>
                    <CButton color="gotodashboard12" onClick={() => { setVisible(false); }}>
                        Close
                    </CButton>

                </CModalFooter>
            </CModal>
        </>


    )
}

export default FamilyDocuments