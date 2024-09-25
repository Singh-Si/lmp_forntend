import React, { useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Individualmedicalbanner from '../Banner/Individualmedicalbanner'
import { Link } from 'react-router-dom'
import { Form, FormControl, InputGroup, ProgressBar } from 'react-bootstrap'

const Individualinsurancepersonaldetails1 = () => {
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
                                <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12 mb-2'>
                                    <ul style={{ paddingLeft: '0px' }}>
                                        <li style={{ listStyle: 'none' }}>Please fill your details :</li>
                                    </ul>
                                </div>
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i className="fa fa-user" aria-hidden="true"></i></InputGroup.Text>
                                        <select className='form-control'>
                                            <option>Emirate Issuing Visa</option>
                                            <option>India</option>
                                        </select>
                                    </InputGroup>
                                </div>
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i className="fa fa-globe" aria-hidden="true"></i></InputGroup.Text>
                                        <select className='form-control'>
                                            <option>Visa Type</option>
                                            <option>India</option>
                                        </select>
                                    </InputGroup>
                                </div>
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i className="fa fa-globe" aria-hidden="true"></i></InputGroup.Text>
                                        <select className='form-control'>
                                            <option>Salary</option>
                                            <option>India</option>
                                        </select>
                                    </InputGroup>
                                </div>
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i className="fa fa-envelope-o" aria-hidden="true"></i></InputGroup.Text>
                                        <Form.Control required
                                            placeholder="Height (cm)"
                                            aria-label="Height (cm)"
                                        />
                                    </InputGroup>
                                </div>
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i className="fa fa-phone" aria-hidden="true"></i>
                                        </InputGroup.Text>
                                        <Form.Control required
                                            placeholder="Weight (kg)"
                                            aria-label="Weight (kg)"
                                        />
                                    </InputGroup>
                                </div>
                                <div className='col-lg-5'>
                                </div>
                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                                    <Link to="/Individualinsurancepersonaldetails" className='buttonactions'><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</Link>
                                </div>
                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right' }}>
                                    <Link to="/Individualinsurancequotes" className='buttonactions'>Next<i className="fa fa-chevron-right" aria-hidden="true"></i></Link>
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

export default Individualinsurancepersonaldetails1