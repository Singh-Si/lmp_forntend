import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Otherbanner from "../Banner/Otherbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import { API_URL } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { AddGroupMedical } from "../../redux/reducers/GroupMedicalDataReducerSlice";
import { emailRegex } from "../../functions";
import swal from "sweetalert";
import PhoneInput from "react-phone-number-input";


const Groupinsurance = () => {
  

  const Navigate = useNavigate()

  const handlephoneinput = (value) =>{
    console.log("value",value)
    dispatch(AddGroupMedical({name:['phoneno'],value:value}))
  }


  const dispatch=useDispatch()
   const { insuranceType,name, phoneno, age,email,call_time,call_date,brief_information,other_insurance_name}=useSelector((state) => state.GroupMedicalReducer)
  
  const [GroupInsuranceOption, setGroupInsuranceOption] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const dayOption = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    " Saturday",
    "Sunday",
  ];
 
  const handleGroupInsuranceOption = async () => {
    await fetch(`${ API_URL}/api/otherInsurance`)
      .then((res) => res.json())
      .then((res) => setGroupInsuranceOption(res.data))
      .catch((err) => {});
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    // setGroupInsurance({ ...GroupInsurance, prefer_day_to_call: date });
    // localStorage.setItem("GroupInsurance", JSON.stringify(GroupInsurance));
  };

  const handleSubmit = async () => {
  
 try {
  console.log("test email",emailRegex.test(email))
  const dataToSend = {
    insuranceType: insuranceType,
    name: name,
    email: email,
    phoneno: phoneno,
    age: age,
    call_time: call_time,
    call_date: call_date,
    brief_information: brief_information,
    other_insurance_name: other_insurance_name,
  };

  if(name === '' || name === null){
    swal("Please Enter Name", "","warning")
  }
  else if(email == '' || email === null){
    swal("Please Enter Email", "","warning")
  }
  else if(!emailRegex.test(email)){
    swal("Please Enter Valid Email", "","warning")
  }
  else if(!age){
    swal("Please Enter Age", "","warning")
  }
  else if(!phoneno){
    swal("Please Enter Phoneno", "","warning")
  }
  else if(!insuranceType){
    swal("Please Select InsuranceType", "","warning")
  }
  else if(!brief_information){
    swal("Please Enter Brief Information", "","warning")
  }
  else if(!call_date){
    swal("Please Select Day To call", "","warning")
  }
  else if(!call_time){
    swal("Please Select Time To call", "","warning")
  }
 else
 {   await fetch(`${ API_URL}/api/fillInsurancePlan?email=${email}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => {
        if(res.status == 200){
          swal("Data Submitted Successfully","","success")
          Navigate("/")
        }

      })
      .catch((err) => {
        console.log(err)
      });
    }

 } catch (error) {
  console.log("error",error)
 }
  
  };

  useEffect(() => {
    handleGroupInsuranceOption();
  }, []);


  return (
    <div>
      <Header />
      <Otherbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 nopadding">
              <h3 className="mb-4">
                Please select the Insurance Type From below Drop down Menu
              </h3>
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <ul>
                        <li>Full Name</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="name"
                          name="name"
                          onChange={(e)=>{
                            dispatch(AddGroupMedical({name:e.target.name,value:e.target.value}))
                          }}
                          value={name}
                          placeholder="Full Name"
                          aria-label="Full Name"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Email</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="fa fa-envelope-o"
                            aria-hidden="true"
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e)=>dispatch(AddGroupMedical({name:[e.target.name],value:e.target.value}))}
                          placeholder="Email ID"
                          aria-label="Email ID"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li >Age</li>
                      </ul>
                      <InputGroup className="mb-4">
                        {/* <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </InputGroup.Text> */}
                        <Form.Control
                          name="age"
                          type="number"
                          onChange={(e)=>dispatch(AddGroupMedical({name:[e.target.name],value:e.target.value}))}
                          value={age}
                          required
                          placeholder="Age"
                          aria-label="Age"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Phone Number</li>
                      </ul>
                      <InputGroup className="mb-4">
                        {/* <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          name="phoneno"
                          type="number"
                          onChange={(e)=>dispatch(AddGroupMedical({name:[e.target.name],value:e.target.value}))}
                          value={phoneno}
                          required
                          placeholder="Phone Number"
                          aria-label="Phone Number"
                        /> */}
                         <PhoneInput
                          // name="phoneno"
                          international
                          className="form-control"
                          defaultCountry="AE"
                          // onChange={(e)=>dispatch(AddGroupMedical({name:[phoneno],value:e}))}
                          onChange={handlephoneinput}
                          value={phoneno}
                          placeholder="Phone Number"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Group insurance Types</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <select
                          id="ohter"
                          name="other_insurance_name"
                          onChange={(e)=>dispatch(AddGroupMedical({name:[e.target.name],value:e.target.value}))}
                          value={other_insurance_name}
                          className="form-control"
                          placeholder="Group insurance Option"
                        >
                          <option hidden>Group insurance Option</option>
                          {GroupInsuranceOption &&
                            GroupInsuranceOption.map((val) => (
                              <option value={val._id}>
                                {val.insurance_name}
                              </option>
                            ))}
                        </select>
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Brief Information</li>
                      </ul>
                      <textarea
                        name="brief_information"
                        onChange={(e)=>dispatch(AddGroupMedical({name:[e.target.name],value:e.target.value}))}
                        value={brief_information}
                        className="form-control mb-4"
                        placeholder="Brief Information"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Select a day</li>
                      </ul>
                      <InputGroup className="">
                        <select
                          name="call_date"
                          onChange={(e)=>dispatch(AddGroupMedical({name:[e.target.name],value:e.target.value}))}
                          value={call_date}
                          className="form-control"
                          placeholder="Prefer Day to Call"
                        >
                          <option hidden>Prefer Day to Call</option>
                          {dayOption &&
                            dayOption.map((val) => (
                              <option key={val.id} value={val}>
                                {val}
                              </option>
                            ))}
                        </select>
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Select a Time</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <Form.Control
                          id="form11"
                          name="call_time"
                          type="time"
                          onFocus={(e) => {
                            const inputDateElement =
                              document.querySelector('input[type="time"]');
                            inputDateElement.showPicker();
                          }}
                          onChange={(e)=>dispatch(AddGroupMedical({name:[e.target.name],value:e.target.value}))}
                          value={call_time}
                          required
                          placeholderText="Prefer Time to Call"
                          aria-label="Prefer Time to Call"
                        />
                      </InputGroup>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/" className="buttonactions">
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        // to="/GroupInsurancesubmit"
                        className="buttonactions"
                        onClick={handleSubmit}
                      >
                        Next
                        <i
                          className="fa fa-chevron-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Insurancedetails />
      <Footer />
    </div>
  );
};

export default Groupinsurance;
