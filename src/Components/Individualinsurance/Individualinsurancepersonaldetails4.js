import React, { useState,useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Individualmedicalbanner from '../Banner/Individualmedicalbanner'
import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import { UseMotorContext } from '../../MultiStepContextApi'
import { API_URL } from '../..'

const Individualinsurancepersonaldetails4 = () => {
    const Progress = 30;
    const [startDate, setStartDate] = useState();

    const { IndividualInsurance, setIndividualInsurance, handleIndividualInsurance } = UseMotorContext()

    console.log(IndividualInsurance, "IndividualInsurance")


    const [questiondata , setQuestiondata] = useState([])

    useEffect(() => {
        getallquestion()
    }, [])


    const getallquestion = async () => {
        const res = await fetch(`${API_URL}/api/get_maternity`)
        const data = await res.json()
        setQuestiondata(data.data.slice(5))
    }


    console.log(questiondata,"questiondata")






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
                                <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12 mb-3'>
                                    <ul className='mb-3' style={{ paddingLeft: '5px' }}>
                                        <li style={{ listStyleType: 'none' }}>Maternity Questionnaire:</li>
                                    </ul>
                                    <div className='row'>
                                    <div className='col-lg-6'>
                                            <ul>
                                                <li>Are you currently pregnant?</li>
                                            </ul>
                                            <div className="button-group-pills" data-toggle="buttons">
                                                <div className='row'>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default active">
                                                            <input type="radio" name="options" checked="" />
                                                            <div>Yes</div>
                                                        </label>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default">
                                                            <input type="radio" name="options" />
                                                            <div>No</div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className='col-lg-6'>
                                            <ul>
                                                <li>Are you currently pregnant?</li>
                                            </ul>
                                            <div className="button-group-pills" data-toggle="buttons">
                                                <div className='row'>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default active">
                                                            <input type="radio" name="options" checked="" />
                                                            <div>Yes</div>
                                                        </label>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default">
                                                            <input type="radio" name="options" />
                                                            <div>No</div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <ul>
                                                <li>Are you currently trying to get pregnant?</li>
                                            </ul>
                                            <div className="button-group-pills" data-toggle="buttons">
                                                <div className='row'>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default active">
                                                            <input type="radio" name="options" checked="" />
                                                            <div>Yes</div>
                                                        </label>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default">
                                                            <input type="radio" name="options" />
                                                            <div>No</div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <ul>
                                                <li>Are you undergoing any form of fertility treatment?</li>
                                            </ul>
                                            <div className="button-group-pills" data-toggle="buttons">
                                                <div className='row'>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default active">
                                                            <input type="radio" name="options" checked="" />
                                                            <div>Yes</div>
                                                        </label>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default">
                                                            <input type="radio" name="options" />
                                                            <div>No</div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <ul>
                                                <li>Last menstrual period date?</li>
                                            </ul>
                                            <div className="button-group-pills" data-toggle="buttons">
                                                <div className='row'>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default active">
                                                            <input type="radio" name="options" checked="" />
                                                            <div>Yes</div>
                                                        </label>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default">
                                                            <input type="radio" name="options" />
                                                            <div>No</div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-8'>
                                            <ul>
                                                <li>Are you currently pregnant? If YES, have there been any complications to date?</li>
                                            </ul>
                                            <div className="button-group-pills" data-toggle="buttons">
                                                <div className='row'>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default active">
                                                            <input type="radio" name="options" checked="" />
                                                            <div>Yes</div>
                                                        </label>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4'>
                                                        <label className="btn btn-default">
                                                            <input type="radio" name="options" />
                                                            <div>No</div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                                    <Link to="/Individualinsurancepersonaldetails3" className='buttonactions'><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</Link>
                                </div>
                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right' }}>
                                    <Link to="/Individualinsurancepersonaldetails5" className='buttonactions'>Next<i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
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

export default Individualinsurancepersonaldetails4