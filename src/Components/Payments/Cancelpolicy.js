import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import image4 from '../../Image/icon4.svg'
import image3 from '../../Image/icon3.svg'
import image2 from '../../Image/icon2.svg'
import image1 from '../../Image/icon1.svg'
import { Form, InputGroup } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { UseUserContext } from '../../UserContextAppProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../..'
import swal from 'sweetalert'
const Cancelpolicy = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const CancelPolicy = location.state?.CancelPolicyData
    const [CancelPolicyData, setCancelPolicyData] = useState({
        lobId: CancelPolicy?.lobId,
        policy_number: CancelPolicy?.policy_number,
        full_name: CancelPolicy?.full_name,
        email: CancelPolicy?.email,
        comments: ''
    })

    const [lobName, setLobName] = useState('')
    const { usertoken } = UseUserContext()
    const [file, setFile] = useState(null);
    const [emergencyDepartment, setEmergency] = useState([]);
    const [stepsList, setStepsList] = useState([]);

    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${API_URL}/api/get_line_of_business_by_id/${CancelPolicy?.lobId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(">>>>>>>>>>>> ", data.data)
                setLobName(data.data[0]?.line_of_business_name)
                getEmergency(data.data[0]?._id);
            });

        getFormSteps();


    }, [])

    const getEmergency = async (id) => {
        try {
            var requestOptions = {
                method: 'GET',
                // body: JSON.stringify({ insuranceType: id }),
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            fetch(API_URL + `/api/emergencyDepartments?id=${id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setEmergency(result.data)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            //console.log(error.message)
        }
    }
    const handleInputChange = (event) => {

        const { name, value } = event.target;
        setCancelPolicyData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const getFormSteps = async () => {
        try {
            const queryParams = {
                lob: CancelPolicy?.lobId,
                form_type: "Steps for Cancel Policy",
            }
            axios.get(`${API_URL}/api/getFormStepsList?` + new URLSearchParams(queryParams))
                // .then(response => response.json())
                .then(result => {
                    setStepsList(result.data.data)
                })
                .catch(error => console.log('error', error));
        } catch (error) {

        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const Data = new FormData();
        Data.append('policy_number', CancelPolicy?.policy_number);
        Data.append('full_name', CancelPolicyData.full_name);
        Data.append('email', CancelPolicyData.email);
        Data.append('comments', CancelPolicyData.comments);
        Data.append('new_lead_id', CancelPolicy.leadId);
        Data.append('file', file);

        var requestOption = {
            method: 'POST',
            body: Data,
            redirect: 'follow',
            headers: {
                'Authorization': `Bearer ${usertoken}`,
            },
        };
        fetch(`${API_URL}/api/cancelPolicy`, requestOption)
            .then(response => response.json())
            .then(data => {
                navigate('/Pendingpolicies')
            });
    }
    return (
        <div>
            <Header />
            <section className="page-header">
                <div className="page-header-bg1"></div>
                <div className="container">
                    <div className="page-header__inner">
                        <div className="innerbanner">
                            <h4 className="text-custom-white no-margin">Cancel Policy</h4>
                        </div>
                        <h6 className='para_absdasa'>Log Your Insurance Cancel Policy</h6>
                    </div>
                </div>
            </section>
            <div className='container pt-5 pb-5'>
                <div className='row form_textsa'>
                    <div className='col-lg-4'>
                        <div className="page-header__inner">
                            <div className="innerbanner">
                                <h4 className="form_textsa cancel_policy">Steps for Cancel Policy</h4>
                                {
                                    stepsList?.map((item, index) => (
                                        <div key={index} className='row abcdsrows'>
                                            <div className='col-lg-3'>
                                                <img src={`${API_URL}/StepLogos/${item.logo[0]?.filename}`} alt='image1' />
                                            </div>
                                            <div className='col-lg-9 textabcd'>
                                                <h3>{item.step_no}</h3>
                                                <p>{item.description}</p>
                                                <h2>{item.message}</h2>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <div className="page-header__inner">
                            <div className="innerbanner">
                                <h4 className="form_textsa cancel_policy">Cancel Policy Form</h4>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-shield" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    name="line_of_business_name"
                                    defaultValue={lobName}
                                    placeholder="Line of Business"
                                    aria-label="Line of Business"
                                    readOnly={true}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    name="policy_number"
                                    defaultValue={CancelPolicy?.policy_number}
                                    placeholder="Policy Number"
                                    aria-label="Policy Number"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    name="full_name"
                                    onChange={handleInputChange}
                                    defaultValue={CancelPolicy?.full_name}
                                    placeholder="Full Name"
                                    aria-label="Full Name"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    name="email"
                                    onChange={handleInputChange}
                                    defaultValue={CancelPolicy?.email}
                                    placeholder="Email Address"
                                    aria-label="Email Address"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-upload" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    style={{ paddingTop: '20px' }}
                                    required
                                    type='file'
                                    name="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control as="textarea" rows={3}
                                    required
                                    name="comments"
                                    onChange={handleInputChange}

                                />
                            </InputGroup>
                            <div className='buttonsubmit'>
                                <a className="buttonactions mtr5" onClick={handleSubmit}>Submit</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className="page-header__inner">
                            <div className="innerbanner">
                                <h4 className="form_textsa cancel_policy">Emergency Number</h4>
                            </div>
                        </div>
                        {emergencyDepartment.length > 0 ? (
                            <div>
                                {emergencyDepartment.map((emergency, index) => (
                                    <div key={index} className='emergency'>
                                        <i className='fa fa-phone'></i><span>{emergency.number}</span>
                                    </div>
                                ))}
                            </div>
                        ) : ('')}

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cancelpolicy