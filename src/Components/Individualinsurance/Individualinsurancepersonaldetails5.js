import React, { useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Individualmedicalbanner from '../Banner/Individualmedicalbanner'
import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'

const Individualinsurancepersonaldetails5 = () => {
    const Progress = 30;
    const [startDate, setStartDate] = useState();
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
                                                <li>Are you a doctor, nurse or a teacher by profession?</li>
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
                                                <li>Do you smoke?</li>
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
                                                <li>Do you drink alcohol?</li>
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
                                                <li>Have you ever taken any drugs?</li>
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
                                                <li>Do you practice any kind of routine exercise?</li>
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
                                                <li>Do you undergo routine medical check-ups?</li>
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
                                    </div>
                                </div>
                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                                    <Link to="/Individualinsurancepersonaldetails4" className='buttonactions'><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</Link>
                                </div>
                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right' }}>
                                    <Link to="/Individualinsurancepersonaldetails6" className='buttonactions'>Next<i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
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

export default Individualinsurancepersonaldetails5