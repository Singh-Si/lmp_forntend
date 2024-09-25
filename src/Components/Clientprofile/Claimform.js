import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { Form, FormControl, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../..'
import swal from 'sweetalert'
import { UseUserContext } from '../../UserContextAppProvider'
import { useLocation } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import image4 from '../../Image/icon4.svg'
import image3 from '../../Image/icon3.svg'
import image2 from '../../Image/icon2.svg'
import image1 from '../../Image/icon1.svg'
import 'react-phone-input-2/lib/style.css'
import { Form, InputGroup, FormControl } from 'react-bootstrap'
const Claimform = () => {
  const location = useLocation();
  const claimData = location.state?.claimData;
  const { usertoken, Logout } = UseUserContext()
  const [inputclaimData, setClaimData] = useState({
    policy_number: claimData?.lead_id,
    full_name: claimData?.name,
    email: claimData?.email,
    phone_number: claimData?.phoneno,
    comments: '',
    new_lead_id: claimData?.new_lead,
  });
  const [file, setFile] = useState([]);
  const [emergencyDepartment, setEmergency] = useState([]);
  const [stepsList, setStepsList] = useState([]);

  useEffect(() => {
    getEmergency();
    getFormSteps();
  }, [])



  const getEmergency = async () => {
    try {
      var requestOptions = {
        method: 'GET',
        // body: JSON.stringify({ insuranceType: claimData?.lobId.line_of_business_name }),
        headers: {
          'Content-Type': 'application/json'
        },
      };
      fetch(API_URL + `/api/emergencyDepartments?id=${claimData?.lobId?._id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setEmergency(result.data)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      //console.log(error.message)
    }
  }

  const getFormSteps = async () => {
    try {
      const queryParams = {
        lob: claimData?.lobId._id,
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


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const Data = new FormData();
      for (let i = 0; i < file?.length; i++) {
        Data.append(`file`, file[i]);
      }

      Data.append('policy_number', inputclaimData.policy_number);
      Data.append('full_name', inputclaimData.full_name);
      Data.append('email', inputclaimData.email);
      Data.append('phone_number', inputclaimData.phone_number);
      Data.append('comments', inputclaimData.comments);
      Data.append('new_lead_id', inputclaimData.new_lead_id);
      Data.append('file', Array.from(file).forEach((item) => item.file));

      //console.log(Array.from(Data), "Data")

      var requestOption = {
        method: 'POST',
        body: Data,
        redirect: 'follow',
        headers: {
          'Authorization': `Bearer ${usertoken}`,
        },
      };


      await fetch(`${API_URL}/api/addClaim`, requestOption)
        .then(response => response.json())
        .then(result => {
          return result
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      //console.error('Error submitting claim:', error);
    }
  };

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setClaimData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handlePhoneInputChange = (value) => {
    setClaimData((prevData) => ({
      ...prevData,
      phone_number: value,
    }));
  };
  return (
    <div>
      <Header />
      <section className="page-header">
        <div className="page-header-bg1"></div>
        <div className="container">
          <div className="page-header__inner">
            <div className="innerbanner">
              <h4 className="text-custom-white no-margin">Claim Policy</h4>
            </div>
            <h6 className='para_absdasa'>Log Your Insurance Claim Policy</h6>
          </div>
        </div>
      </section>
      <div className='container pt-5 pb-5'>
        <div className='row form_textsa'>
          <div className='col-lg-4'>
            <div className="page-header__inner">
              <div className="innerbanner">
                <h4 className="form_textsa cancel_policy">Steps for Claim Policy</h4>

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
                <h4 className="form_textsa cancel_policy">Claim Policy Form</h4>
              </div>
            </div>
            <div className='my_profile'>
              <div className='col-lg-12'>
                <InputGroup className="mb-4">
                  <Form.Control required
                    name="policy_number"
                    placeholder="Policy Number"
                    aria-label="Policy Number"
                    defaultValue={claimData?.lead_id}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </div>
              <div className='col-lg-12'>
                <InputGroup className="mb-4">
                  <Form.Control required
                    name="full_name"
                    placeholder="Full Name"
                    aria-label="Full Name"
                    defaultValue={claimData?.name}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </div>
              <div className='col-lg-12'>
                <InputGroup className="mb-4">
                  <Form.Control required
                    name="email"
                    placeholder="Email ID"
                    aria-label="Email ID"
                    defaultValue={claimData?.email}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </div>
              <div className='col-lg-12'>
                <InputGroup className="mb-4">

                  <InputGroup.Text id="basic-addon1">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <PhoneInput
                      className="mx-2"
                      value={inputclaimData.phone_number}
                      name="phone_number"
                      placeholder="Phone Number"
                      aria-label="Phone Number"
                      onChange={handlePhoneInputChange}
                    />
                  </InputGroup.Text>

                </InputGroup>
              </div>
              <div className='col-lg-12'>
                <InputGroup className="mb-4">
                  <FormControl placeholderText={'Please select a file'} type='file' onChange={(e) => setFile(e.target.files)} multiple />
                </InputGroup>
              </div>
              <div className='col-lg-12'>
                <InputGroup className="mb-4">
                  <textarea name='comments' onChange={handleInputChange} placeholder='Type Your Information Here...... (Optional)' className='form-control' rows="5"></textarea>
                </InputGroup>
              </div>
              <div className='col-lg-3'>
                <button onClick={handleSubmit} className='claims_abcd'>Submit</button>
              </div>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className="page-header__inner">
              <div className="innerbanner">
                <h4 className="form_textsa cancel_policy">Emergency Number</h4>
              </div>
            </div>
            {emergencyDepartment?.length > 0 ? (
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

export default Claimform