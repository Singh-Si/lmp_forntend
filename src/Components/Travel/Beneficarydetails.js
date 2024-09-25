import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Travelbanner from '../Banner/Travelbanner'
import Insurancedetails from '../Common/Insurancedetails'
import { Link } from 'react-router-dom'
import { Form, InputGroup, ProgressBar } from 'react-bootstrap'
import { UseMotorContext } from '../../MultiStepContextApi'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import swal from 'sweetalert'
import { API_URL } from '../..'
import axios from 'axios'
import { MotoformData } from '../../redux/reducers/MotoformDataReducerSlice'
import { emailRegex } from '../../functions'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import TravelInsurancedetails from '../Common/TravelInsurancedetails'

const Beneficarydetails = () => {
  const navigate = useNavigate()

  const { travelsFormsData, settravelsFormsData, HandleSubmitTravelFormdata, location, traveltootip } =
    UseMotorContext()
  // Accessing form values
  const { Beneficiary_name, Beneficiary_phoneno, Beneficiary_email, Beneficiary_passport_no } =
    travelsFormsData
  useEffect(() => {
    localStorage.setItem('travelsFormsDataLocation', window.location.pathname.replace("/", ""))
  }, [])

  const Progress = 90
  const email = travelsFormsData.email
  const insuranceType = travelsFormsData.line_of_business

  const HandleSubmitMotorFormdata = async (obj, to) => {
    HandleSubmitTravelFormdata(obj);
    navigate(to)
  };
  const handleNextClick = async () => {
    if (!emailRegex.test(Beneficiary_email)) {
      swal('Error!', 'Please enter valid email', 'error')
    } else {
      // Save the data in local storage
      localStorage.setItem('travelsFormsData', JSON.stringify(travelsFormsData))

      let obj = {
        travel_beneficiary_details: [
          {
            Name: Beneficiary_name,
            phoneNumber: Beneficiary_phoneno,
            email: Beneficiary_email,
            passportNumber: Beneficiary_passport_no,
          },
        ],
        insuranceType: insuranceType,
        email: email,
        location: window.location.pathname.replace("/", ""),
      }
      HandleSubmitMotorFormdata(obj, "/Travelquotes")
    }

  }

  console.log('traveltootip', traveltootip)


  return (
    <div>
      <Header />
      <Travelbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: 'center' }}>
            <div className="col-lg-12">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <ul className="mb-3">
                    <li>Please fill your Beneficiary details :</li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12"  style={{position:'relative'}}>
                        <InputGroup className="mb-2">
                          <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-user" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <Form.Control
                            required
                            onChange={(e) => {
                              settravelsFormsData((prevData) => ({
                                ...prevData,
                                Beneficiary_name: e.target.value,
                              }))
                            }}
                            placeholder="Traveller Name"
                            aria-label="Traveller Name"
                            value={Beneficiary_name}
                          />
                        </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.beneficiaryDetails?.name}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{position:'relative'}}>
                        <PhoneInput
                          international
                          name="Beneficiary_phoneno"
                          className="form-control mb-2"
                          defaultCountry="AE"
                          value={Beneficiary_phoneno}
                          onChange={(value) => {
                            settravelsFormsData((prevData) => ({
                              ...prevData,
                              Beneficiary_phoneno: value,
                            }))
                          }}
                        />
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.beneficiaryDetails?.phone}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mt-3" style={{position:'relative'}}>
                        <InputGroup className="mb-2">
                          <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <Form.Control
                            onChange={(e) => {
                              settravelsFormsData((prevData) => ({
                                ...prevData,
                                Beneficiary_email: e.target.value,
                              }))
                            }}
                            required
                            placeholder="Email ID"
                            aria-label="Email ID"
                            value={Beneficiary_email}
                          />
                        </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.beneficiaryDetails?.email}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mt-3" style={{position:'relative'}}>
                        <InputGroup className="mb-2">
                          <InputGroup.Text id="basic-addon1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 448 512"
                            >
                              {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                              <path d="M0 64C0 28.7 28.7 0 64 0H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM183 278.8c-27.9-13.2-48.4-39.4-53.7-70.8h39.1c1.6 30.4 7.7 53.8 14.6 70.8zm41.3 9.2l-.3 0-.3 0c-2.4-3.5-5.7-8.9-9.1-16.5c-6-13.6-12.4-34.3-14.2-63.5h47.1c-1.8 29.2-8.1 49.9-14.2 63.5c-3.4 7.6-6.7 13-9.1 16.5zm40.7-9.2c6.8-17.1 12.9-40.4 14.6-70.8h39.1c-5.3 31.4-25.8 57.6-53.7 70.8zM279.6 176c-1.6-30.4-7.7-53.8-14.6-70.8c27.9 13.2 48.4 39.4 53.7 70.8H279.6zM223.7 96l.3 0 .3 0c2.4 3.5 5.7 8.9 9.1 16.5c6 13.6 12.4 34.3 14.2 63.5H200.5c1.8-29.2 8.1-49.9 14.2-63.5c3.4-7.6 6.7-13 9.1-16.5zM183 105.2c-6.8 17.1-12.9 40.4-14.6 70.8H129.3c5.3-31.4 25.8-57.6 53.7-70.8zM352 192A128 128 0 1 0 96 192a128 128 0 1 0 256 0zM112 384c-8.8 0-16 7.2-16 16s7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H112z" />
                            </svg>
                          </InputGroup.Text>
                          <Form.Control
                            onChange={(e) => {
                              settravelsFormsData((prevData) => ({
                                ...prevData,
                                Beneficiary_passport_no: e.target.value,
                              }))
                            }}
                            type="text"
                            required
                            placeholder="Passport Number"
                            aria-label="Passport Number"
                            value={Beneficiary_passport_no}
                          />
                        </InputGroup>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.beneficiaryDetails?.passport}
                            </Tooltip>
                          }
                        >
                          <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      {travelsFormsData.type_of_trip === '641d6ffe2e8acf350eaab1fa' ? (
                        <Link to="/Travelpersonalform" className="buttonactions">
                          <i className="fa fa-chevron-left" aria-hidden="true"></i>
                          Back
                        </Link>
                      ) : (
                        <Link to="/Familydetails" className="buttonactions">
                          <i className="fa fa-chevron-left" aria-hidden="true"></i>
                          Back
                        </Link>
                      )}
                    </div>
                    {travelsFormsData.Beneficiary_name ? (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: 'right' }}
                        onClick={handleNextClick}
                      >
                        <Link className="buttonactions">
                          Next
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                      </div>
                    ) : (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: 'right' }}
                      >
                        <Link
                          className="buttonactions"
                          to={'/Travelquotes'}
                          style={{ background: 'black !important' }}
                        >
                          Skip
                          <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TravelInsurancedetails />
      <Footer />
    </div>
  )
}

export default Beneficarydetails
