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
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const GroupPolicyClaims = () => {

  const Navigate = useNavigate()

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


const url = window.location.href;
const url1 = url.split('/')[3]
const url2 = url.split('?')[1]
const id = url.split('=')[1]

console.log(id)

    useEffect(() => {
        getMemberdetails()
    }, [])



const getMemberdetails = async () => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
            },
        };
        await fetch(`${API_URL}/api/getMemberDetailsById?policyId=${id}`, requestOptions)
            .then(response => response.json())
            .then(
                data => {
                    console.log(data.data)
                    setMember(data.data.map(val => `${val.firstName} ${val.middleName} ${val.lastnName}`).join(' '));
                    setMemberId(data.data.map(val => val._id));
                    setRelation(data.data.map(val => val.relation))
                    setEmployeeId(data.data.map(val => val.employeeNumber))
                    getPrinciple(data.data.map(val => val.employeeNumber))
                }
            );
    } catch (err) {
        console.error(err.message);
    }
}

const getPrinciple = async (employeeNumber) => {
    try {
        console.log(employeeNumber)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
            },
        };
        await fetch(`${API_URL}/api/getPrincipleByEmpolyeeNymber?employeeNumber=${employeeNumber}`, requestOptions)
            .then(response => response.json())
            .then(
                data => {
                    console.log(data.data)
                    setPrinciple(data.data.map(val => `${val.firstName} ${val.middleName} ${val.lastnName}`).join(' '))
                    setPrincipleId(data.data.map(val => val._id))
                }
            );
    } catch (err) {
        console.error(err.message);
    }
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


  const submit = (e) => {
    e.preventDefault()
    try {
      // if (!princepleId) {
      //   alert('Please Select Principle')
      //   return
      // }
      // if (!memberId) {
      //   alert('Please Select Member')
      //   return
      // }
      // if (!relation) {
      //   alert('Please Select Relation')
      //   return
      // }
      if (!dateOfTreatment || dateOfTreatment === 'undefined' || dateOfTreatment === null || dateOfTreatment === '' || dateOfTreatment == [] ) {
        swal({
          text:'Please Select Date Of Treatment',
          icon:'warning'
     })
       return false
      }
      else if (!description || description === 'undefined' || description === null || description === '' || !description.length) {
        swal({
          text:'Please Enter Description',
          icon:'warning'
     })
       return false
      }
      else if (!claimAmount || claimAmount === 'undefined' || claimAmount === null || claimAmount === '' || !claimAmount.length) {
        swal({
          text:'Please Enter Claim Amount',
          icon:'warning'
     })
       return false
      }
      else if (!file) {
        alert('Please Select File')
        return
      }

      const formData = new FormData();
      formData.append('principleId', princepleId);
      formData.append('memberId', memberId);
      formData.append('relation', relation);
      formData.append('dateOfTreatment', dateOfTreatment);
      formData.append('claimAmountFromHr', claimAmount);
      formData.append('claimDscription', description);
      formData.append('file', file);


      console.log(Object.fromEntries(formData))

      setLoader(true)
      const requestOptions = {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('usertoken'),
          // "Content-Type": "application/json",

        }
      };
      fetch(`${API_URL}/api/addGroupMedicalClaim`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            setLoader(false)
            swal({
              text: "Claim Submitted Successfully",
              icon: "success",
            })
            Navigate('/GroupMedicalPolicy')
          } else {
            setLoader(false)
            swal({
              text: "Something went wrong",
              icon: "error",
            })
          }
        })
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
                              <input
                                className="form-control"
                                value={principle}
                                readOnly
                              />
                            </div>
                            <div className="col-lg-12 mb-1">
                              <label>Member Name</label>
                              <input
                                className="form-control"
                                value={member}
                                readOnly
                              />
                            </div>
                            <div className="col-lg-12 mb-1">
                              <label>Relation</label>
                              <input
                                className="form-control"
                                value={relation}
                                readOnly
                              />
                            </div>
                            <div className="col-lg-12">
                              <label>Employee Id / SL No.</label>
                              <input 
                                className="form-control"
                                value={employeeId}
                                readOnly />
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
      </Row>
      <Footer />
    </div>
  );
};

export default GroupPolicyClaims;
