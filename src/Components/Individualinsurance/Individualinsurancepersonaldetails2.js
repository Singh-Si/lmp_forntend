import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Individualmedicalbanner from '../Banner/Individualmedicalbanner'
import { ProgressBar, Form } from 'react-bootstrap'
import { API_URL } from '../..'
import { UseMotorContext } from '../../MultiStepContextApi'
import { Link, useNavigate } from 'react-router-dom'
import admin from '../../config'
import swal from "sweetalert";


const Individualinsurancepersonaldetails2 = () => {
    const Progress = 30;
    const [startDate, setStartDate] = useState();
    // const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') );
    const Navigate = useNavigate();

    const { IndividualInsurance, setIndividualInsurance, HandleSubmitIndividualFormdata } = UseMotorContext()

    console.log(IndividualInsurance, "IndividualInsurance")


    const [questiondata, setQuestiondata] = useState([]);
    const [updatePolicyId, setUpdatePolicyId] = useState("");
    const [terms, setTerms] = useState(false);


    useEffect(() => {
        getallquestion()
    }, [])

    useEffect(() => {
        const stored = localStorage.getItem("IndividualInsurance");

        if (stored) {
            setIndividualInsurance(JSON.parse(stored));
            setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
        }

    }, []);



    const getallquestion = async () => {
        try {
            const res = await fetch(`${API_URL}/api/activeGeneralWrittingConditions`)
            const data = await res.json()
            setQuestiondata(data.data.slice(5))
            const initialHomeCondition = data && data.data.length > 0 ? data.data.map((item) => ({
                _id: item._id,
                value: false,
                name: item.condition
            })) : [];
            if (IndividualInsurance.medical_general_condition.length === 0 ) {
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

    const handlePush = (e, id, value) => {

        console.log(id, value, "id, value")
        // return false;

        if (IndividualInsurance?.medical_general_condition?.length > 0) {
            const updatedConditions = IndividualInsurance?.medical_general_condition?.map((item) => ({
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

    const conditionCheck = (id, value) => {
        const data = IndividualInsurance?.medical_general_condition?.find(
            (item) => item._id === id
        );
        return data ? data.value === value : false;

    };
    console.log(IndividualInsurance.medical_general_condition, "conditionCheck")

    const handleSubmitGeneralCondition = async () => {
        // localStorage.setItem('currentPage', currentPage.toString());
        await HandleSubmitIndividualFormdata({ medical_general_condition: IndividualInsurance.medical_general_condition })
    }

    const handleSubmitGeneralConditionnext = async () => {
        if (!terms) {
            swal({
                text: "Please Accept Terms & Conditions",
                icon: "warning",
            })
            return false;
        }
        else {
            let location
            if(IndividualInsurance.gender == 'Male'){
                location = "Individualinsuranceunderwriting"
            }else{
                location = "Individualinsurancematernity"
            }
            await HandleSubmitIndividualFormdata({ medical_general_condition: IndividualInsurance.medical_general_condition,location:location })
            {
                IndividualInsurance.gender == 'Male' ?
                Navigate("/Individualinsuranceunderwriting")
                :
                Navigate("/Individualinsurancematernity")
            }
        }
    }

   

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
                                        <li style={{ listStyle: 'none' }}><strong>Have you ever been diagnosed or received any treatment (including hospital or surgery) or felt any disorder or pain or had any symptoms indicating:</strong></li>
                                    </ul>
                                </div>

                                {questiondata.map((item, index) => {

                                    return (
                                        <div className='col-lg-11 mb-4'>
                                            <ul style={{ paddingLeft: '0px' }}>
                                                <li>{item.condition}</li>
                                            </ul>
                                            <div className="button-group-pills" data-toggle="buttons">
                                                <div className='row'>
                                                    <div className='col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3'>
                                                        <label
                                                            className={`btn btn-default ${conditionCheck(item._id, true)
                                                                ? "active"
                                                                : ""
                                                                }`}
                                                            onClick={(e) =>
                                                                handlePush(e, item._id, true)
                                                            }
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="options"
                                                                checked={conditionCheck(
                                                                    item._id,
                                                                    true
                                                                )}
                                                            />
                                                            <div>Yes</div>
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
                                                            <div>No</div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                               

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



                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                                    {
                                        <Link to="/Individualinsurancepersonaldetails3" onClick={handleSubmitGeneralCondition} className='buttonactions'><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</Link>

                                    }
                                </div>


                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'
                                    style={{ textAlign: 'right' }}
                                    onClick={handleSubmitGeneralConditionnext}
                                >

                                    <Link className='buttonactions'>Next<i className="fa fa-chevron-right" aria-hidden="true"></i></Link>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Individualinsurancepersonaldetails2