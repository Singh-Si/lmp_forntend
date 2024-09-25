import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import Innerbanner from '../Banner/Innerbanner';
import Insurancedetails from '../Common/Insurancedetails';
import microphone from '../../Image/microphone.svg';
import Chasisnoimg from '../../Image/chasis.png'
import Chasisnoimg1 from '../../Image/chasisno2.png'
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CProgress } from '@coreui/react';
import { API_URL } from '../..';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { UseMotorContext } from "../../MultiStepContextApi";
import MotorInsurancedetails from '../Common/MotorInsurancedetails';
const Tesseract = require('tesseract.js');

const Chasisno = () => {

    const {motortooltip, setMotortooltip} = UseMotorContext();
    console.log('motortooltip:', motortooltip);

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
        listening,
    } = useSpeechRecognition();

    console.log('transcript:', transcript);
    console.log('listening:', listening);
    console.log('browserSupportsSpeechRecognition:', browserSupportsSpeechRecognition);


    const [chasisno, setChasisno] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleInputChange(transcript);
    }, [transcript]);

    // useEffect(() => {
    //     handleInputChange(inputValue)
    // }, []);

 


    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }


    const performOCR = async (imageFile) => {
        return new Promise((resolve, reject) => {
            Tesseract.recognize(
                imageFile,
                'eng', // Specify language (e.g., 'eng' for English)
                {
                    logger: (info) => {
                        console.log(info);
                    },
                }
            )
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


    const handleFileChange = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        if (file) {
            try {
                // Perform OCR and get the result
                const ocrResult = await performOCR(file);

                // Extract chassis number from the OCR result
                const chassisNo = extractChassisNoFromFile(ocrResult.text);
                console.log('length', chassisNo.length);

                if (chassisNo) {
                    console.log('Extracted ChassisNo:', chassisNo);
                    setInputValue(chassisNo);
                    // setChasisno(chassisNo);
                } else {
                    console.log('ChassisNo not found in OCR result.');
                }
            } catch (error) {
                console.error('Error during OCR:', error);
            }
            finally {
                setLoading(false);
            }
        }
    };

    function extractChassisNoFromFile(ocrText) {
        const chassisNoRegex = /ChassisNo\] ~~ (.+?) \[/;
        const match = ocrText.match(chassisNoRegex);

        if (match && match[1]) {
            const chassisNo = match[1].trim();
            return chassisNo;
        }

        return null;
    }

    const resetFileInput = () => {
        // Reset the file input by clearing its value
        const fileInput = document.getElementById('DHA');
        if (fileInput) {
            fileInput.value = '';
        }
        setChasisno('')
    };



    console.log('chasisno:', chasisno);
    console.log('inputValue:', inputValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('chasisno>>>>>>>>>>:', chasisno);
    };

    const handleInputChange = (value) => {
        console.log('handleInputChange:', value);
        setInputValue(value);
    };


    // const gettooltip = () => {
    //     try {
    //         const requestoptions = {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         };

    //         fetch(`${API_URL}/api/getMotorToooltip`, requestoptions)
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 console.log('data:', data);
    //             })
    //             .catch((error) => {
    //                 console.log('error:', error);
    //             });
    //     } catch (error) {
    //         console.log('error:', error);
    //     }
    // }


    return (
        <>
            <Header />
            <Innerbanner />
            <div className='container-fluid text_avbcds'>
                <div className='container pt-3 pb-3'>
                    <div className='row voice_abcd'>
                        <h5 className='mb-3'>Do you know your chassis number ?</h5>
                        <div style={{ position: 'relative', textAlign: 'center' }} className='col-lg-6 col-sm-12 col-md-12 col-xs-12'>
                            <Form>
                                <label for="images" class="drop-container mb-2" id="dropcontainer">
                                    {loading ?
                                        <div>
                                            <CProgress color="primary" variant="striped" animated value={100} />
                                            <div><strong>Reading, please wait...</strong></div>
                                        </div>
                                        :
                                        <>
                                            <span class="drop-title">Drag and Drop file here</span>
                                            or
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="DHA"
                                                defaultValue=""
                                                required
                                                onChange={handleFileChange}
                                            />
                                            {/* <button type="button" className="reset-button" onClick={resetFileInput} style={{border: "2px solid red", borderRadius:"8px", fontSize: "medium" }}>
                                            &#10006;
                                        </button> */}
                                        </>
                                    }
                                </label>
                                <Form.Group style={{ alignItems: 'center', position: 'relative' }} as={Row} className="mb-3" controlId="formHorizontalEmail">

                                    <Form.Label column sm={4}>
                                        Chassis Number
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Control style={{ background: 'FFFFFF', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }} onChange={(e) => handleInputChange(e.target.value)} value={inputValue} type="text" />
                                    </Col>
                                    <img style={{ cursor: 'pointer', position: 'absolute', right: '-5px', top: '18px', width: '75px' }} onClick={SpeechRecognition.startListening} src={microphone} />

                                    <OverlayTrigger
                                        key="right"
                                        placement="right"
                                        overlay={
                                            <Tooltip id="tooltip-right">
                                                {motortooltip.chassisNumber}
                                            </Tooltip>
                                        }
                                    >
                                        <i className="fa fa-question-circle mx-1" aria-hidden="true"></i>
                                    </OverlayTrigger>

                                    <h6 className='my-1 mx-5' style={{ color: 'red', fontSize: '12px' }}>*Kindly verify Chassis Number and proceed</h6>
                                </Form.Group>
                            </Form>
                            {/* <button onClick={SpeechRecognition.startListening}><i className="fa fa-microphone" aria-hidden="true"></i>
                            </button> */}
                            {/* <button onClick={SpeechRecognition.stopListening}>Stop</button>
                            <button onClick={resetTranscript}>Reset</button> */}
                            <button className='submiit' style={{ marginRight: '20px', marginTop: '20px' }} onClick={handleSubmit}>
                                <Link >Submit</Link></button>
                            <button onClick={resetTranscript} className='submiit'>Reset</button>
                            <p className='ors'>OR</p>
                            <button className='submiit' style={{ marginBottom: '20px' }}><Link to="/Carbasicinfo">Proceed manually</Link></button>
                        </div>
                        <div className='col-lg-6 col-sm-12 col-md-12 col-xs-12'>
                            <div className="flip-box">
                                <div className="flip-box-inner">
                                    <div className="flip-box-front">
                                        <img src={Chasisnoimg1} style={{ width: '72%' }} />
                                    </div>
                                    <div className="flip-box-back">
                                        <img src={Chasisnoimg} style={{ width: '72%' }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* <Insurancedetails /> */}
            <MotorInsurancedetails />
            <Footer />
        </>
    )
}

export default Chasisno