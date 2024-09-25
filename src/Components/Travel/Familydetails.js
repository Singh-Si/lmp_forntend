import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Travelbanner from '../Banner/Travelbanner'
import Insurancedetails from '../Common/Insurancedetails'
import { Link } from 'react-router-dom'
import { Form, InputGroup, ProgressBar } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { UseMotorContext } from '../../MultiStepContextApi'
import swal from 'sweetalert'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { id } from 'date-fns/locale'
import { API_URL } from '../..'
import axios from 'axios'
import { MotoformData } from '../../redux/reducers/MotoformDataReducerSlice';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import TravelInsurancedetails from '../Common/TravelInsurancedetails'

function Familydetails() {
  const navigate = useNavigate()
  const { travelsFormsData, settravelsFormsData, location, HandleSubmitTravelFormdata, traveltootip } = UseMotorContext()
  const [todos, setTodos] = useState([{ name: '', passport: '', date: '', relation: '' }])
  const Progress = 70


  const handleTodoChange = (e, i) => {
    console.log(e.target.name, i);
    const field = e.target.name
    const newTodos = [...todos]
    newTodos[i][field] = e.target.value
    setTodos(newTodos)
  }

  const handleTododateChange = (date, i) => {
    console.log(date, i)
    const isoString = date.toISOString();
    const formattedDate = isoString.split('T')[0];
    const field = 'date'
    const newTodos = [...todos]
    newTodos[i][field] = formattedDate

    setTodos(newTodos)
  }
  useEffect(() => {
    localStorage.setItem('travelsFormsDataLocation', window.location.pathname.replace("/", ""))
  }, [])

  const handleAddTodo = () => {
    setTodos([...todos, { name: '', passport: '', date: '', relation: '' }])
  }

  const handleDeleteTodo = (i) => {
    const newTodos = [...todos]
    newTodos.splice(i, 1)
    setTodos(newTodos)
  }


  const HandleSubmitMotorFormdata = async (obj, to) => {
    HandleSubmitTravelFormdata(obj);
    navigate(to)
  };
  const handleNextButtonClick = (event) => {
    console.log(todos)
    // return false 
    const invalidEntries = todos.filter(
      (element) => element.name === '' || element.passport === '' || element.date === '' || element.relation === '',
    )

    if (invalidEntries.length > 0) {
      swal('Please fill all fields correctly.', '', 'warning')
      return
    } else {
      const familyDetails = todos.map((element) => ({
        name: element.name,
        passport: element.passport,
        date: element.date,
        relation: element.relation,

      }))
      event.preventDefault()
      settravelsFormsData((prevData) => ({
        ...prevData,
        family_details: todos,
      }))

      localStorage.setItem(
        'travelsFormsData',
        JSON.stringify({ ...travelsFormsData, family_details: todos }),
      )
      //console.log(todos)
      let obj = {
        insuranceType: "Travel",
        passport: passport,
        location: "Beneficarydetails",
        travel_family_details: familyDetails,

      }
      HandleSubmitMotorFormdata(obj, "/Beneficarydetails")

      getRelationCounts()
    }
  }

  const passport = travelsFormsData.passport
  const insuranceType = travelsFormsData.line_of_business


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('travelsFormsData'))
    if (data?.family_details.length > 0) {
      setTodos(data.family_details)
    }
  }, [travelsFormsData])


  const getRelationCounts = () => {
    const relationCounts = todos.reduce((acc, todo) => {
      const relation = todo.relation;
      if (relation) {
        acc[relation] = (acc[relation] || 0) + 1;
      }
      return acc;
    }, {});
    settravelsFormsData((prevData) => ({
      ...prevData,
      noOfChild: relationCounts.Child,
      noOfSpouse: relationCounts.Spouse,
    }))
    localStorage.setItem(
      'travelsFormsData',
      JSON.stringify({ ...travelsFormsData, noOfChild: relationCounts.Child, noOfSpouse: relationCounts.Spouse }),
    )
    return relationCounts;
  };


console.log("traveltootip",traveltootip)

  return (
    <div>
      <Header />
      <Travelbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: 'center' }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <ul style={{ paddingLeft: '0px' }}>
                    <li style={{ listStyle: 'none' }}>Please fill your family details :</li>
                  </ul>
                  <form onSubmit={handleNextButtonClick}>
                    {todos.map((todo, index) => (
                      <div className='row custom_formss' key={index}>
                        <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={todo.name}
                            className="form-control"
                            onChange={(e) => handleTodoChange(e, index)}
                            required
                            />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {traveltootip?.family_details?.name}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                        <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="passport"
                            name="passport"
                            value={todo.passport}
                            onChange={(e) => handleTodoChange(e, index)}
                            required
                          />
                        </div>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.family_details?.passport}
                            </Tooltip>
                          }
                        >
                          <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                        {/* <input
                            type="date"
                            placeholder="date"
                            name="date"
                            value={todo.date}
                            className="textancd col-lg-2 col-md-12 col-sm-12 col-xs-12"
                            onChange={(e) => handleTodoChange(e, index)}
                            required
                          /> */}


                        <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                          <DatePicker
                            name="date"
                            className="form-control"
                            selected={todo && todo.date ? new Date(todo.date) : null}
                            onChange={(date) => handleTododateChange(date, index)}

                            placeholderText="Date Of Birth"
                            maxDate={new Date()}
                            peekNextMonth
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            showTimeSelect={false}
                          />
                        </div>
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id="tooltip-right">
                              {traveltootip?.family_details?.DOB}
                            </Tooltip>
                          }
                        >
                          <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                        </OverlayTrigger>
                        <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                          <select
                            className="form-control"
                            name="relation"
                            value={todo.relation}
                            onChange={(e) => handleTodoChange(e, index)}
                            required
                          >
                            <option value="" hidden>Relationship</option>
                            <option value="Child">Child</option>
                            {/* <option value="Daughter">Daughter</option>
                              <option value="Mother">Mother</option>
                              <option value="Father">Father</option> */}
                            <option value="Spouse">Spouse</option>


                          </select>
                        </div>
                        {todos.length > 1 && (
                          <div className="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                            <button
                              type="button"
                              onClick={() => handleDeleteTodo(index)}
                              className=" fa fa-trash"
                              style={{ width: '40px', height: '40px', position: 'relative', padding: '5px', top: '11px', left: '15px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}
                            ></button>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="text-center">
                      <button
                        onClick={handleAddTodo}
                        type="submit"
                        className="btn-first btn-submit-fill text-center"
                        style={{ position: 'relative', zIndex: '0', textAlign: 'center' }}
                      >
                        Add member
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Travelpersonalform" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: 'right' }}
                      onClick={handleNextButtonClick}
                    >
                      <Link
                        // className="button_next"
                        className="buttonactions"
                      >
                        Next<i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </Link>
                    </div>
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

export default Familydetails
