import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Yachtbanner from "../Banner/Yachtbanner";

import Insurancedetails from '../Common/Insurancedetails'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormControl, InputGroup, ProgressBar } from 'react-bootstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { UseMotorContext } from "../../MultiStepContextApi";
import { yachtHullMaterials } from '../../functions'
import EngineTypesMockData from "../../mockdata/YachtEngineTypeData.json"
import { EnginedetailsValidation } from '../../Validators/yachtDetailsValidator'
import swal from 'sweetalert'
import axios from 'axios'
import { API_URL } from '../..' 
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import YachtInsurancedetails from '../Common/YachtInsurancedetails';


const Enginedetails = () => {
  const Progress = 40;
  const { YachtFormsData, handlYachteSelect, handlYachtEstimatedSelect, handlYachtestimatedSelectFormValue, handlYachteSelectFormValue, handlYachteSelectFormValuedata, yachttooltip } = UseMotorContext();
  const [Years, setYears] = useState()
  useEffect(() => {
    const date = new Date();
    let month = date.getMonth();
    let currentdate = date.getFullYear();
    if (month >= 5) {
      currentdate = currentdate + 1;
    }
    const y = [];
    for (let i = currentdate; i >= 1950; i--) {
      y.push({ year: i });
    }
    setYears(y);
  }, [])

  const navigate = useNavigate()
  const [Obj, setObj] = useState({
    get_Yacht_engine_type_list: [],
    getActiveYachtEngine: []
  })
  useEffect(() => {
    for (let value in Obj) {
      //console.log(">>", value)
      axios.get(`${API_URL}/api/${value}`).then((res) => {
        setObj((prev) => ({ ...prev, [value]: res.data.data }))
      })
    }
  }, [])
  //console.log("EngineTypeList", EngineTypeList)
  console.log("yachttooltip", yachttooltip)


  return (
    <div>
      <Header />
      <Yachtbanner />
      <div className='container-fluid car_info pt-4 pb-4'>
        <div className='container'>
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-12 nopadding'>
              <div className='row form_abcd'>
                <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2'>
                  <ul style={{ paddingLeft: '0px' }}>
                    <li style={{ listStyle: 'none' }}>Please fill Engine Details :</li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className='col-lg-6 pb-2'>
                      <select
                        onChange={(e) => {
                          handlYachteSelect(e)
                          handlYachtEstimatedSelect(e)
                        }}
                        name='engine_maker'
                        value={YachtFormsData?.engine_maker}
                        className='form-control'>
                        <option hidden disabled selected value={""}> Select Engine Type</option>
                        {
                          Obj.getActiveYachtEngine.length > 0 ? Obj.getActiveYachtEngine.map((item) => {
                            return <option value={item.name}>{item?.name}</option>
                          }) : <React.Fragment></React.Fragment>
                        }
                      </select>
                    </div>
                    <div className='col-lg-6'>
                      <select
                        name='engine_model_year'
                        onChange={(e) => {
                          handlYachteSelect(e)
                          handlYachtEstimatedSelect(e)
                        }}
                        value={YachtFormsData?.engine_model_year}
                        className='form-control'
                      >
                        <option hidden disabled selected value={""}> Model Year</option>
                        {
                          Years && Years.length > 0 ? Years.map((item) => {
                            return <option value={item.year}>{item?.year}</option>
                          }) : <option>No options available</option>
                        }
                      </select>
                    </div>
                    <div className='col-lg-6'  style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <Form.Control required
                          name='engine_seriel_number'
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          value={YachtFormsData?.engine_seriel_number}
                          placeholder="Engine Serial no"
                          aria-label="Engine Serial no"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.engineDetails?.engineSerialNo}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>

                    <div className='col-lg-6' style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <Form.Control required
                          name='engine_horsepower'
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          value={YachtFormsData?.engine_horsepower}
                          placeholder="Horse power"
                          aria-label="Horse power"
                          type='number'
                          onWheel={(e) => e.target.blur()}
                          onKeyDown={(e) => {
                            // Disable keyboard arrows
                            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                              e.preventDefault();
                            }
                          }}
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.engineDetails?.horsePower}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className='col-lg-6' style={{position:'relative'}}>
                      <InputGroup className="mb-4">
                        <Form.Control required
                          onChange={(e) => {
                            handlYachteSelect(e)
                            handlYachtEstimatedSelect(e)
                          }}
                          name='engine_speed'
                          value={YachtFormsData?.engine_speed}
                          placeholder="Speed in (knots)"
                          aria-label="Speed in (knots)"
                        />
                      </InputGroup>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-right">
                            {yachttooltip?.engineDetails?.speedInKnots}
                          </Tooltip>
                        }
                      >
                        <i style={{top:'15px'}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                      </OverlayTrigger>
                    </div>
                    <div className='col-lg-6 mb-4'>
                      <select
                        onChange={(e) => {
                          const selectedOption =
                        e.target.options[e.target.selectedIndex];
                      const selectedId = selectedOption.getAttribute("id");
                      console.log(selectedId,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
                      handlYachtestimatedSelectFormValue("engineId",selectedId)
                      handlYachteSelectFormValue("engineId",selectedId)
                          handlYachteSelect(e)
                          handlYachtEstimatedSelect(e)
                        }}
                        name='engine_type'
                        value={YachtFormsData?.engine_type}
                        className='form-control'>
                        <option hidden disabled selected value={""}> Select Engine Type</option>
                        {
                          Obj.get_Yacht_engine_type_list.length > 0 ? Obj.get_Yacht_engine_type_list.map((item) => {
                            return <option value={item.yacht_engine_type} id={item._id}>{item?.yacht_engine_type}</option>
                          }) : <React.Fragment></React.Fragment>
                        }
                      </select>
                    </div>
                    <div className='col-lg-5 mb-4'>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                      <Link to="/YachtVarient" className='buttonactions'><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</Link>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right' }}>
                      <a onClick={() => {
                        let errorCheck = EnginedetailsValidation(YachtFormsData)
                        ////console.log(">>", errorCheck)
                        if (errorCheck.error) {
                          let message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
                          message = message.replace(/"/g, '')
                          swal({
                            text: `${message}`,
                            icon: "warning",
                            button: "Ok",
                          });

                        } else {

                          navigate("/Suminsured")
                        }
                      }} className='buttonactions'>Next<i className="fa fa-chevron-right" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <YachtInsurancedetails />
      <Footer />
    </div>
  )
}

export default Enginedetails