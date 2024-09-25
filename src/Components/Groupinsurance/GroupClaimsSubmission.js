import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import GroupSidebar from "./GroupSidebar";
import { API_URL } from "../..";
import axios from "axios";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { CSpinner } from "@coreui/react";
import GroupmedicalAlert from "./GroupmedicalAlert";
import swal from "sweetalert";

const GroupClaimsSubmission = () => {

  const [principle, setPrinciple] = useState([]);
  const [member, setMember] = useState([]);
  const [relationlists, setRelationlists] = useState([]);
  const [claimAmount, setClaimAmount] = useState([]);
  const [description, setDescription] = useState([]);
  const [file, setFile] = useState([]);
  const [princepleId, setPrincipleId] = useState([]);
  const [memberId, setMemberId] = useState([]);
  const [relation, setRelation] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [dateOfTreatment, setDateOfTreatment] = useState(null);
  const [loader, setLoader] = useState(false)



  useEffect(() => {
    getprinciplelist();
  }, [])

  // useEffect(() => {
  //   getmemberlist();
  // }, [princepleId])

  useEffect(() => {
    relationlist();
  }, [memberId])



  const getprinciplelist = (e) => {
    try {
      let config = {
        method: 'get',
        url: `${API_URL}/api/getAllPrincepleOfHr`,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
        }
      };
      axios(config)
        .then((response) => {
          console.log(response.data)
          setPrinciple(response.data.data)
        })
    } catch (error) {
      console.log(error.message)
    }

  }

  const getmemberlist = (empid) => {
    try {

      let config = {
        method: 'get',
        url: `${API_URL}/api/getAllmemberOfHr?employeeId=${empid}`,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
        }
      };
      axios(config)
        .then((response) => {
          console.log(response.data)
          setMember(response.data.data)
        }
        )
    } catch (error) {
      console.log(error.message)
    }
  }

  const relationlist = (e) => {
    try {
      let config = {
        method: 'get',
        url: `${API_URL}/api/getRelationOfUser?id=${memberId}`,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
        }
      };
      axios(config)
        .then((response) => {
          console.log(response.data)
          setRelationlists(response.data.data)
          console.log(response.data.data)
        }
        )
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleprinciple = (e) => {
    setMember([])
    setMemberId([])
    setRelationlists([])
    setRelation([])
    const event = JSON.parse(e.target.value)
    setPrincipleId(event._id)
    setEmployeeId(event.employeeNumber)
    if (event.employeeNumber) {
      getmemberlist(event.employeeNumber)
    }
  }

  const handlemember = (e) => {
    setRelation([])
    const event = JSON.parse(e.target.value)
    console.log(event)
    setMemberId(event._id)
    setRelation(event.relation)

  }

  const allowOnlyNumbers = (e) => {
    e.preventDefault();
    const input = e.target;
    const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
    const filteredValue = value
    input.value = value; // Set the input value to the filtered value

  };

  function formatAmount(amount) {
    if (amount !== null) {
      const numericValue = parseFloat(amount.toString().replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        // Use toLocaleString with custom options for grouping
        return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
      }
      return ''; // Return an empty string if the input is not a valid number
    }
  }


  const submit = async(e) => {
    e.preventDefault()
    try {
      console.log(princepleId, memberId, relation, dateOfTreatment, claimAmount, description, file)
      if (!princepleId || princepleId === 'undefined' || princepleId == null || princepleId === '' || !princepleId.length ) {
        swal({
           text:'Please Select Principle',
           icon:'warning'
      })
        return false
      }
      else if (!memberId || memberId === 'undefined' || memberId == null || memberId === '' || !memberId.length ) {
        swal({
          text:'Please Select Member',
          icon:'warning'
     })
       return false
      }
      // else if (!relation || relation === 'undefined' || relation === null || relation === '' || relation == []) {
      //   alert('Please Select Relation')
      //   return
      // }
      else if (!dateOfTreatment || dateOfTreatment === 'undefined' || dateOfTreatment === null || dateOfTreatment === '' || dateOfTreatment == []) {
        swal({
          text:'Please Select Date Of Treatment',
          icon:'warning'
     })
       return false
      }
      else if (!description || description === 'undefined' || description === null || description === '' || !description.length ) {
        swal({
          text:'Please Enter Description',
          icon:'warning'
     })
       return false
      }
      else if (!claimAmount || claimAmount === 'undefined' || claimAmount === null || claimAmount === '' || !claimAmount.length ) {
        swal({
          text:'Please Enter Claim Amount',
          icon:'warning'
     })
       return false
      }
      
      // if (!file) {
      //   alert('Please Select File')
      //   return
      // }
      else{

      const formData = new FormData();
      formData.append('principleId', princepleId);
      formData.append('memberId', memberId);
      formData.append('relation', relation);
      formData.append('dateOfTreatment', dateOfTreatment);
      formData.append('claimAmountFromHr', claimAmount);
      formData.append('claimDscription', description);
      // formData.append('file', file);

      setLoader(true)
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          principleId: princepleId,
          memberId: memberId,
          relation: relation,
          dateOfTreatment: dateOfTreatment,
          claimAmountFromHr: claimAmount,
          claimDscription: description,
          // file: file
        }),
        // body: JSON.stringify(Object.entries(formData)) ,
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + localStorage.getItem('usertoken'),

        }
      };
      await fetch(`${API_URL}/api/addGroupMedicalClaim`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.data)
          setLoader(false)
          alert('Claim Submitted Successfully')
        }
        )
      }
    } catch (error) {
      console.log(error.message)
      setLoader(false)
    }
  }

  const sixmonths = new Date();
  sixmonths.setMonth(sixmonths.getMonth() - 6);



  return (
    <div>
      <Header />
      <GroupMedical />
      <Row className="groupback">
        <Container fluid className="group-medicalss mt-5">
          <Row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Col lg={12}>
              <Row>
                <Col lg="3">
                  <div className="sidebar">
                    <GroupSidebar />
                  </div>
                </Col>
                {loader && (
                  <div className="loader-overlay" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
                    <div className="loader">
                      <CSpinner color="danger" size="lg" />
                    </div>
                  </div>
                )}
                <Col lg="9">
                  <div className="procedureplan2">
                    <div className="row" style={{ alignItems: "center" }}>
                      <div className="col-lg-6">
                        <div className="member">
                          <h4>Member Details</h4>
                          <div className="form-member row">
                            <div className="col-lg-12 mb-1">
                              <label>Principal Name</label>
                              <select
                                className="form-control"
                                name="planId"
                                required=""
                                onChange={(e) => handleprinciple(e)}
                              >
                                <option value="" hidden>
                                  Select Principle
                                </option>
                                {
                                  principle && principle.map((item) => {
                                    return (
                                      <option value={JSON.stringify(item)} >{item.firstName}</option>
                                    )
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-lg-12 mb-1">
                              <label>Member Name</label>
                              <select
                                className="form-control"
                                name="planId"
                                required=""
                                onChange={(e) => handlemember(e)}
                              >
                                <option value="" hidden>
                                  Select Member
                                </option>
                                {
                                  member && member.map((item) => {
                                    return (
                                      <option value={JSON.stringify(item)} >{item.firstName}</option>
                                    )
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-lg-12 mb-1">
                              <label>Relation</label>
                              {/* <select
                                className="form-control"
                                name="planId"
                                required=""
                                onChange={(e) => setRelation(e.target.value)}
                              >
                                <option value="" hidden>
                                  Select Plan
                                </option>
                                {
                                  relationlists && relationlists.map((item) => {
                                    return (
                                      <option value={item.relation} >{item.relation}</option>
                                    )
                                  })
                                }
                              </select> */}

                              <input
                                className="form-control"
                                value={relation}
                                onChange={(e) => setRelation(e.target.value)}
                                readOnly
                              />
                            </div>
                            <div className="col-lg-12">
                              <label>Employee Id / SL No.</label>
                              <input className="form-control" defaultValue={employeeId} readOnly />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="member">
                          <h4>Claims Details</h4>
                          <div className="form-member row">
                            <div className="col-lg-12">
                              <label>Date Of Treatment</label>
                              <div className="row">
                                <div className="col-lg-12 mb-4" >
                                  <DatePicker
                                    style={{ boxShadow: "0px 4px 4px 0px #00000040 !important" }}
                                    placeholderText="Date Of Treatment"
                                    className="form-control"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    onKeyDown={(e) => e.preventDefault()}
                                    dateFormat="dd/MM/yyyy"
                                    showTimeSelect={false}
                                    selected={
                                      dateOfTreatment
                                        ? new Date(dateOfTreatment)
                                        : null
                                    }
                                    onChange={(date) => {
                                      setDateOfTreatment(date);
                                    }}
                                    minDate={sixmonths}
                                    maxDate={new Date()}
                                  />

                                </div>
                                <label>Brief Description Of Claims</label>
                                <textarea
                                  className="form-control mb-4 custom-textarea"
                                  placeholder="Type here ..."
                                  rows={5}
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                <label>Claim Amount (AED)</label>
                                <input
                                  placeholder="Enter Claim Amount"
                                  className="form-control"
                                  onInput={allowOnlyNumbers}
                                  value={formatAmount(claimAmount)}
                                  onChange={(e) => setClaimAmount(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 fofofo mt-5">
                        <label>Attach Claim Document</label>
                        <input
                          type="file"
                          placeholder="Enter Claim Amount"
                          className="form-control"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="submitformm" onClick={submit}>Submit</button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <GroupmedicalAlert />
      </Row>
      <Footer />
    </div>
  );
};

export default GroupClaimsSubmission;
