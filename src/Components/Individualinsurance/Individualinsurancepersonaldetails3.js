import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Individualmedicalbanner from '../Banner/Individualmedicalbanner'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../..'
import { UseMotorContext } from '../../MultiStepContextApi'
import { set } from 'firebase/database'
import admin from '../../config'
import swal from "sweetalert";
import {
    Button,
    Container,
    Form,
    FormControl,
    InputGroup,
    Modal,
    ProgressBar,
    Row,
} from "react-bootstrap";
import { assert } from 'joi'
import Individualnsurancedetails from '../Common/Individualnsurancedetails'

const Individualinsurancepersonaldetails3 = () => {
    const Progress = 30;
    const Navigate = useNavigate();
    const {
        IndividualInsurance,
        setIndividualInsurance,
        HandleSubmitIndividualFormdata,

    } = UseMotorContext();
    const [startDate, setStartDate] = useState();
    const [questiondata, setQuestiondata] = useState([])
    const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') || 1);
    const [datalength, setDatalength] = useState(0);
    const [updatePolicyId, setUpdatePolicyId] = useState("");
    const [terms, setTerms] = useState(false);
    const [detailmodal, setdetailmodal] = useState(false);
    const [medical_label, setMedical_Label] = useState({})
    const [locationstatus, setLocationstatus] = useState(true);

    useEffect(() => {
        // Retrieve the current page from local storage
        const storedPage = localStorage.getItem('currentPage');
        if (storedPage) {
            // Set the current page to the stored page
            console.log(storedPage, "storedPage")
            setCurrentPage(parseInt(storedPage));
        } else {
            // Set the current page to 1 if it's not found in local storage
            setCurrentPage(1);
        }
        
        getallquestion();
        getLabel();
        quotespagestatus();
    }, []);
    
    useEffect(() => {
        HandleSubmitIndividualFormdata({ medicalQuestionrrPage:currentPage })
    }, [currentPage]);




    useEffect(() => {
        // Store the current page in local storage whenever it changes
        localStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);



    // useEffect(() => {
    //     getallquestion()
    //     getLabel()
    // }, [])


    const getLabel = async () => {
        try {
            const res = await fetch(`${API_URL}/api/activemedicalLevel`)
            const data = await res.json()
            setMedical_Label(data?.data[0])
        }
        catch (err) {
            console.log(err)
        }
    }

    const quotespagestatus = async () => {
        try {
            const res = await fetch(`${API_URL}/api/getMedicalQoutesPageStatus`)
            const data = await res.json()
            setLocationstatus(data.data.map((item) => item.status).toString())
        }
        catch (err) {
            console.log(err)
        }
    }
console.log(locationstatus, "locationstatus")


    const getallquestion = async () => {
        try {
            console.log("getallquestion was called in the useEffect")
            const res = await fetch(`${API_URL}/api/activeGeneralWrittingConditions`)
            const data = await res.json()
            setQuestiondata(data.data)
            setDatalength(data.data?.length)
            const initialHomeCondition = data && data.data?.length > 0 ? data.data.map((item) => ({
                _id: item._id,
                value: false,
                name: item.condition
            })) : [];
            if (IndividualInsurance?.medical_general_condition?.length === 0 || IndividualInsurance?.medical_general_condition.length !== data.data?.length) {

                setIndividualInsurance((prevState) => ({
                    ...prevState,
                    ["medical_general_condition"]: initialHomeCondition,
                }))
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    console.log(questiondata, "questiondata")

    // const handleGeneralCondition = (e, index) => {
    //     const { name, checked } = e.target;
    //     const newHomeCondition = IndividualInsurance.medical_general_condition.map((item, i) => {
    //         if (i === index) {
    //             return {
    //                 ...item,
    //                 value: checked,
    //             };
    //         } else {
    //             return item;
    //         }
    //     });
    //     setIndividualInsurance((prevState) => ({
    //         ...prevState,
    //         ["general_condition"]: newHomeCondition,
    //     }));
    // };
    // console.log(IndividualInsurance.medical_general_condition, "IndividualInsurance.medical_general_condition")

    // const handlePush = (e, id, value) => {
    //     console.log(id, value, "id, value")

    // if (IndividualInsurance.medical_general_condition.length > 0) {
    //     let arr = IndividualInsurance.medical_general_condition
    //     let index = arr.findIndex((item) => item._id === id)

    //     if (index !== -1) {
    //         arr[index].value = value
    //     }
    //     setIndividualInsurance((prevState) => ({
    //         ...prevState,
    //         ["general_condition"]: arr,
    //     }));
    //     localStorage.setItem(
    //         "general_condition",
    //         JSON.stringify(IndividualInsurance)
    //     );
    // };

    // };

    const handlePush = (e, id, value) => {

        console.log(id, value, "id, value")
        // return false;

        if (IndividualInsurance.medical_general_condition?.length > 0) {
            const updatedConditions = IndividualInsurance.medical_general_condition.map((item) => ({
                ...item,
                value: item._id === id ? value : item.value,
            }));

            setIndividualInsurance((prevState) => ({
                ...prevState,
                medical_general_condition: updatedConditions,
            }));

            localStorage.setItem(
                "IndividualInsurance",
                JSON.stringify(IndividualInsurance)
            );
        }
    };


    console.log(IndividualInsurance.medical_general_condition, "IndividualInsurance.medical_general_condition")



    const conditionCheck = (id, value) => {
        const data = IndividualInsurance.medical_general_condition?.find(
            (item) => item._id === id
        );
        return data ? data.value === value : false;

    };
    console.log(IndividualInsurance.medical_general_condition, "conditionCheck")


    const handleSubmitGeneralCondition = async () => {
        await HandleSubmitIndividualFormdata({ medical_general_condition: IndividualInsurance.medical_general_condition })
        // Navigate("/Individualinsurancepersonaldetails2");
    }

    const handleSubmitGeneralConditionnext = async () => {
        // if (!terms) {
        //     swal({
        //         text: "Please Accept Terms & Conditions",
        //         icon: "warning",
        //     })
        //     return false;
        // }
        // else {
        await HandleSubmitIndividualFormdata(
            {
                medical_general_condition: IndividualInsurance.medical_general_condition,
                location: 'Individualinsurancepersonaldetails2'
            }
        )
        Navigate("/Individualinsurancepersonaldetails2");
        // }
    }

    const handleClose = () => {
        setdetailmodal(false);
    };


    // general_condition

    const [questionsPerPage] = useState(5);

    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;



    const handleNextPage = async() => {
        let location
        
        if (endIndex >= datalength) {
            if (!terms) {
                swal({
                    text: "Please Accept Terms & Conditions",
                    icon: "warning",
                });
                return;
            }

         if (IndividualInsurance.gender == 'Male' || IndividualInsurance.gender == 'Female (Single)') {
            location = "Individualinsuranceunderwriting"
                Navigate("/Individualinsuranceunderwriting");
                await HandleSubmitIndividualFormdata({ medical_general_condition: IndividualInsurance.medical_general_condition, location:location })
                
            } else {
                location = "Individualinsurancematernity"
                Navigate("/Individualinsurancematernity");
                await HandleSubmitIndividualFormdata({ medical_general_condition: IndividualInsurance.medical_general_condition, location:location })
            }
        } else {
            location = "Individualinsurancepersonaldetails3"
            setCurrentPage((prevPage) => prevPage + 1);
            await HandleSubmitIndividualFormdata({ medical_general_condition: IndividualInsurance.medical_general_condition, location:location })
            window.scrollTo(0, 0);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
            window.scrollTo(0, 0);
        } else {
            if(locationstatus == 'true'){
                Navigate("/Individualinsurancequotes");
              }else{
                Navigate("/Individualmetrics");
              }
        }
    };

    return (
        <div>
            <Header />
            <Individualmedicalbanner />
            <div className='container-fluid car_info pt-4 pb-4'>
                <div className='container'>
                    <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
                    <div className='row' style={{ justifyContent: 'center' }}>
                        <div className='col-lg-12 nopadding'>
                            <div className='row form_abcd'>
                                <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12 mb-2'>
                                    <ul style={{ paddingLeft: '0px' }}>
                                        <li style={{ listStyle: 'none', color: "#ed1c24" }}><strong>Health Questionnaire:</strong></li>
                                    </ul>
                                </div>
                                <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12 mb-2'>
                                    <ul style={{ paddingLeft: '0px' }}>
                                        <li style={{ listStyle: 'none' }}><strong>{medical_label?.name}</strong></li>
                                    </ul>
                                </div>
                                {questiondata.slice(startIndex, endIndex).map((item, index) => {

                                    return (
                                        <div className='col-lg-11 mb-4' key={item._id}>
                                            <ul style={{ paddingLeft: '0px' }}>
                                                <li>{item.condition}</li>
                                            </ul>
                                            <div className="button-group-pills" data-toggle="buttons">
                                                <div className='row'>
                                                    <div className='col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3'>
                                                        <label
                                                            className={`btn btn-default ${conditionCheck(item._id, true) ? "active" : ""}`}
                                                            onClick={(e) => {
                                                                handlePush(e, item._id, true);
                                                                // setdetailmodal(true);
                                                            }}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="options"
                                                                checked={conditionCheck(
                                                                    item._id,
                                                                    true
                                                                )}
                                                            />
                                                            <div>
                                                                Yes
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className='col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3'>
                                                        <label
                                                            className={`btn btn-default ${conditionCheck(item._id, false)
                                                                ? "active"
                                                                : ""
                                                                }`}
                                                            onClick={(e) =>
                                                                handlePush(e, item._id, false)
                                                            }
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="options"
                                                                checked={conditionCheck(
                                                                    item._id,
                                                                    false
                                                                )}
                                                            />
                                                            <div

                                                            >
                                                                No
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    )
                                })}
                                {endIndex >= datalength &&
                                <div className="col-lg-11 col-md-12 col-sm-12 col-xs-12">
                                    <div className="d-flex labelssss mb-3">
                                        <Form.Check
                                            className="abcds_abcs"
                                            type="checkbox"
                                            name="isselecctcontactterms"
                                            onChange={(e) => setTerms(e.target.checked)}
                                        />
                                        <label>
                                            Any non-disclosure, misrepresentation, or concealment of material fact will make this policy void with immediate effect without any entitlement for refund.
                                        </label>
                                    </div>
                                </div>
                                    }

                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                                    <button
                                        className='buttonactions'
                                        onClick={handlePrevPage}>
                                        <i className="fa fa-chevron-left" aria-hidden="true"></i>Back
                                    </button>
                                </div>
                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right' }}>
                                    <button
                                        className='buttonactions'
                                        onClick={handleNextPage}>
                                        Next<i className="fa fa-chevron-right" aria-hidden="true"></i>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal size="md" centered
                aria-labelledby="contained-modal-title-vcenter" show={detailmodal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Motor T&C</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="paragraph">{
                        "Any non-disclosure, misrepresentation, or concealment of material fact will make this policy void with immediate effect without any entitlement for refund."
                    }</p>

                </Modal.Body>
                <Modal.Footer style={{ padding: '5px 10px' }}>
                    <a className="savechanges" onClick={handleClose}>
                        Ok
                    </a>
                </Modal.Footer>
            </Modal>
            <Individualnsurancedetails />

            <Footer />

        </div>
    )
}

export default Individualinsurancepersonaldetails3