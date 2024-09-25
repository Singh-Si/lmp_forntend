import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Innerbanner from '../Banner/Innerbanner'
import finance from '../../Image/finance.svg'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import tick from '../../Image/ticks.svg'
import cross from '../../Image/cross.svg'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import microphone from '../../Image/microphone.svg';
import Chasisnoimg from '../../Image/chasis.png'
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Comparelist from './Comparelist'
const Vehicledetails = () => {
    const [showMore, setShowMore] = useState(true);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    return (
        <div>
            <Header />
            <Innerbanner />
            <div className='Quotes_info1'>
                <div className='container Quotes_info pt-5 pb-5'>
                    <div className='row' style={{ justifyContent: 'center' }}>
                        <div className='col-lg-12'>
                            <div className='row quotes_all'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <div className='vehicledetails'>
                                        <div className='quotes_inner'>
                                            <div className='row quotes_details'>
                                                <div className='col-lg-3'>
                                                    <img src={finance} style={{ width: '100%' }} />
                                                </div>
                                                <div className='col-lg-6'>
                                                    <h4>THIRD PARTY-SALOON/HATCHBACK-6 </h4>
                                                    <ul className='benefits'>
                                                        <li>Rent a Car (Free)</li>
                                                        <li>Oman Coverage (Free)</li>
                                                        <li>Passenger and Driver (Free)</li>
                                                        <li>Passenger and Driver (Free)</li>
                                                    </ul>
                                                </div>
                                                <div className='col-lg-3 action_abcd'>
                                                    <h2>AED 1200</h2>
                                                    <Form.Check className='abcds_abcs1' type="checkbox" label="Compare" />
                                                    <button className='submit_select'>Select</button>
                                                    <p>T&C Apply</p>
                                                </div>
                                            </div>
                                            {showMore ? (
                                                <div className='rowabcds'>
                                                    <div className='row'>
                                                        <div className='col-lg-6 abc'>
                                                            <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                                                            <ul className='description'>
                                                                <li>24 Hour Roadside Assistance (Covered)</li>
                                                                <li>Ambulance Cover (Covered up to AED 6770/-)</li>
                                                                <li>Emergency Medical Expenses (Covered up to AED 2000/-)</li>
                                                                <li>Fire & Theft & Natural Calamity (Covered)</li>
                                                                <li>Own Damage Cover (Covered - Non Agency Repair)</li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6 cde'>
                                                            <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                                                            <ul className='description'>
                                                                <li>What is not Covered.</li>
                                                                <li>Off Road cover for 4x4</li>
                                                                <li>Rent a Car for 10 days</li>
                                                                <li>Valet Parking Theft</li>
                                                                <li>Oman Extension (Optional)</li>
                                                                <li>Personal Injury</li>
                                                                <li>Replacement of Locks</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <button className='showadd_details' onClick={toggleShowMore}>Hide Details</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='rowabcds'>
                                                    <div className='row'>
                                                        <button className='showadd_details' onClick={toggleShowMore}>Show Details</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-fluid text_avbcds'>
                    <div className='container pt-5 pb-5'>
                        <div className='row voice_abcd'>
                            <h5>Voice recognition and drag & drop feature</h5>
                            <div style={{ position: 'relative', textAlign: 'center' }} className='col-lg-6 col-sm-12 col-md-12 col-xs-12'>
                                <Form>
                                    <Form.Group style={{ alignItems: 'center' }} as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={4}>
                                            Chassis Number
                                        </Form.Label>
                                        <Col sm={7}>
                                            <Form.Control style={{ background: 'FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }} value={transcript} type="text" />
                                        </Col>
                                    </Form.Group>
                                </Form>
                                {/* <button onClick={SpeechRecognition.startListening}><i className="fa fa-microphone" aria-hidden="true"></i>
                            </button> */}
                                <img style={{ cursor: 'pointer', position: 'absolute', right: '5px', top: '12px' }} onClick={SpeechRecognition.startListening} src={microphone} />
                                {/* <button onClick={SpeechRecognition.stopListening}>Stop</button>
                            <button onClick={resetTranscript}>Reset</button> */}
                                <button className='submiit' style={{ marginRight: '20px', marginTop: '20px' }}><Link to="/Carbasicinfo">Submit</Link></button>
                                <button onClick={resetTranscript} className='submiit'>Reset</button>
                                <p className='ors'>OR</p>
                                <button className='submiit' style={{ marginBottom: '20px' }}>Proceed manually</button>
                            </div>
                            <div className='col-lg-6 col-sm-12 col-md-12 col-xs-12'>
                                <img src={Chasisnoimg} style={{ width: '100%' }} />
                            </div>
                        </div>
                        <Comparelist />
                    </div>
                </div>
            </div>
            <h3 className='disclaimerss'>
                Medical insurance comparision for your medical requirements
            </h3>
            <Footer />
        </div>
    )
}

export default Vehicledetails