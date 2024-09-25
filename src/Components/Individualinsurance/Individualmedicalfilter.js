import React, { useCallback, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { Form, Button, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import { Link, useLocation } from "react-router-dom";
import admin from "../../config";
import moment from "moment";
import { API_URL } from "../..";


const Individualmedicalfilter = () => {
  const { IndividualInsurance, setIndividualInsurance, handleIndividualInsurance, handleIndividualDate, handleIndividualPhoneChange, HandleSubmitIndividualFormdata, individualtooltip } = UseMotorContext();

  const [update, setUpdate] = useState(false);
  const [country, setCountry] = useState([]);
  const [emirates, setEmirates] = useState([]);
  const [visa, setVisa] = useState([]);
  const [salary, setSalary] = useState([]);
  const [emiratesId, setEmiratesId] = useState("");
  const [visaId, setVisaId] = useState("");
  const [salaryId, setSalaryId] = useState("");

  const [newname, setNewname] = useState(IndividualInsurance.full_name);
  const [newemail, setNewemail] = useState(IndividualInsurance.email);
  const [newphone, setNewphone] = useState(IndividualInsurance.phone_number);
  const [newdate, setNewdate] = useState(IndividualInsurance.date);
  const [newgender, setNewgender] = useState(IndividualInsurance.gender);
  const [newnationality, setNewnationality] = useState(IndividualInsurance.nationality);
  const [newnationality_id, setNewnationality_id] = useState(IndividualInsurance.nationality_id);
  const [newemirates, setNewemirates] = useState(IndividualInsurance.emirates_id);
  const [newvisa, setNewvisa] = useState(IndividualInsurance.visa_id);
  const [newsalary, setNewsalary] = useState(IndividualInsurance.salary_id);
  const [newheight, setNewheight] = useState(IndividualInsurance.height);
  const [newweight, setNewweight] = useState(IndividualInsurance.weight);

  const location = useLocation().pathname;
  console.log(location, "location");
  const handlePhoneChange = (phoneValue) => {
    setNewphone(phoneValue);
  };

  useEffect(() => {
    // fetchData();
    getCountry();
    getEmirates();
    getVisa();
    getSalary();
  }, []);

  useEffect(() => {
    getCountry();
    getEmirates();
    getVisa();
    getSalary();
  }, [IndividualInsurance.emirates_id, IndividualInsurance.visa_id, IndividualInsurance.salary_id]);

  // const fetchData = async () => {
  //   await fetch(`${admin}/getAllNattionlity`)
  //     .then((res) => res.json())
  //     .then((data) => setCountry(data.data))
  //     .catch((e) => {
  //       console.log(e);
  //      });

  //   await fetch(`${admin}/getEmirate`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //     setEmirates(data.data)
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //      });

  //   await fetch(`${admin}/getVisaTypes`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setVisa(data.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //      });

  //   await fetch(`${admin}/getsalary`)
  //     .then((res) => res.json())
  //     .then((data) => setSalary(data.data))
  //     .catch((e) => {
  //       console.log(e);
  //      });
  // };

  const getCountry = async () => {
    console.log("i am country i am working ")
    await fetch(`${API_URL}/api/getAllNattionlity?lob=Medical`)
      .then((res) => res.json())
      .then((data) => setCountry(data.data))
      .catch((e) => {
        console.log(e);
      });
  };

  const getEmirates = async () => {
    console.log("i am emirate i am working ")
    await fetch(`${API_URL}/api/getAreaOfRegistrations`)
      .then((res) => res.json())
      .then((data) => setEmirates(data.data))
      .catch((e) => {
        console.log(e);
      });
  };

  const getVisa = async () => {
    console.log("i am visa i am working ")
    await fetch(`${API_URL}/api/getVisaTypes`)
      .then((res) => res.json())
      .then((data) => setVisa(data.data))
      .catch((e) => {
        console.log(e);
      });
  };

  const getSalary = async () => {
    console.log("i am salary i am working ")
    await fetch(`${API_URL}/api/getsalary`)
      .then((res) => res.json())
      .then((data) => setSalary(data.data))
      .catch((e) => {
        console.log(e);
      });
  };


  console.log(country, emirates, visa, salary)


  const idToName = () => {

    if (IndividualInsurance.emirates_id) {
      const findEle = emirates.find(
        (val) => val._id === IndividualInsurance.emirates_id
      );
      findEle && setEmiratesId(findEle.area_of_registration_name);
    }
    if (IndividualInsurance.visa_id) {
      const findEle = visa.find(
        (val) => val._id === IndividualInsurance.visa_id
      );
      findEle && setVisaId(findEle.medical_plan_condition);
    }
    if (IndividualInsurance.salary_id) {
      const findEle = salary.find(
        (val) => val._id === IndividualInsurance.salary_id
      );
      findEle && setSalaryId(findEle.medical_salary_range);
    }
  };


  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    // Save the original data when the component mounts
    const storedData = JSON.parse(localStorage.getItem("HomeInsurance"));
    setOriginalData({
      date: storedData?.date,

    });
  }, []);


  useEffect(() => {
    idToName();
    // //console.log(emiratesId, salaryId, visaId, "value");
  }, [emirates, visa, salary]);
  useEffect(() => {
    idToName();
    // //console.log(emiratesId, salaryId, visaId, "value");
  }, [IndividualInsurance.emirates_id, IndividualInsurance.visa_id, IndividualInsurance.salary_id]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleSubmit = async () => {

    console.log("I am ready to be submitted");
    console.log(newname !== "" ? newname : IndividualInsurance.full_name);
    console.log(newemail !== "" ? newemail : IndividualInsurance.email);
    console.log(newphone !== "" ? newphone : IndividualInsurance.phone_number);
    console.log(newdate !== "" ? newdate : IndividualInsurance.date);
    console.log(newgender != "" ? newgender : IndividualInsurance.gender);
    console.log(newnationality != "" ? newnationality : IndividualInsurance.nationality);
    console.log(newemirates != "" ? newemirates : IndividualInsurance.emirates_id);
    console.log(newvisa != "" ? newvisa : IndividualInsurance.visa_id);
    console.log(newsalary != "" ? newsalary : IndividualInsurance.salary_id);
    console.log(newheight != "" ? newheight : IndividualInsurance.height);
    console.log(newweight != "" ? newweight : IndividualInsurance.weight);
    console.log(newnationality_id != "" ? newnationality_id : IndividualInsurance.nationality_id)

    const updatedData = {
      ...IndividualInsurance,
      full_name: newname !== "" ? newname : IndividualInsurance.full_name,
      email: newemail !== "" ? newemail : IndividualInsurance.email,
      phone_number: newphone !== "" ? newphone : IndividualInsurance.phone_number,
      date: newdate !== "" ? newdate : IndividualInsurance.date,
      gender: newgender != "" ? newgender : IndividualInsurance.gender,
      nationality: newnationality != "" ? newnationality : IndividualInsurance.nationality,
      nationality_id: newnationality_id != "" ? newnationality_id : IndividualInsurance.nationality_id,
      emirates_id: newemirates != "" ? newemirates : IndividualInsurance.emirates_id,
      visa_id: newvisa != "" ? newvisa : IndividualInsurance.visa_id,
      salary_id: newsalary != "" ? newsalary : IndividualInsurance.salary_id,
      height: newheight != "" ? newheight : IndividualInsurance.height,
      weight: newweight != "" ? newweight : IndividualInsurance.weight,
    };

    console.log(updatedData, "updatedData");
    setIndividualInsurance(updatedData);
    localStorage.setItem("IndividualInsurance", JSON.stringify(updatedData));
    HandleSubmitIndividualFormdata(updatedData)
    handleUpdate();
  }

  const handlecancelsubmit = () => {
    setNewname(IndividualInsurance.full_name);
    setNewemail(IndividualInsurance.email);
    setNewphone(IndividualInsurance.phone_number);
    setNewdate(IndividualInsurance.date);
    setNewgender(IndividualInsurance.gender)
    setNewnationality(IndividualInsurance.nationality)
    setNewemirates(IndividualInsurance.emirates_id)
    setNewvisa(IndividualInsurance.visa_id)
    setNewsalary(IndividualInsurance.salary_id)
    setNewheight(IndividualInsurance.height)
    setNewweight(IndividualInsurance.weight)
    setNewnationality_id(IndividualInsurance.nationality_id)
    handleUpdate(false);
  }
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
    }
  }, []);

  const handleSelect = (name, e) => {
    const value = e.target.value;

    setIndividualInsurance((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  console.log("emirates", emirates)
  console.log("visa", visa)
  console.log("salary", salary)

  console.log(IndividualInsurance, "IndividualInsurance inside filter")

  const nationality = (value) => {

    const foundCountry = country?.find((element) => element?.nationality_name === value);

    setNewnationality(value)
    setNewnationality_id(foundCountry?._id)

    console.log(value, "value>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(foundCountry?._id, "foundCountry>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  }

  console.log("individualtooltip",individualtooltip )

  return (
    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 filters">
      {/* {pathname === "/Individualinsurancequote" ||
      pathname === "/Individualinsurancequotes" ? (
        <h4 className="car details">
          Medical Details
          {update ? (
            <i
              className="fa fa-check"
              style={{ cursor: "pointer" }}
              onClick={handleSubmit}
            ></i>
          ) : (
            <i
              className="fa fa-edit"
              style={{ cursor: "pointer" }}
              onClick={handleUpdate}
            ></i>
          )}
        </h4>
      ) : (
        <h4 className="car details " style={{color:"black"}}>Medical Details</h4>
      )} */}

      {/* <h4 className='car details'>Medical Details<i className="fa fa-edit" onClick={handleUpdate}></i>
                <>
                    <Link
                        className="buttonactions"
                        style={{ padding: "6px 19px", marginLeft: "10%" }}
                        to={"/Individualmetrics"}
                    >
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                    </Link>
                </>
            </h4> */}
      {location === '/Individualinsurancequotes' || 'Individualinsurancequote' ?
        <h4 className='car details'>Medical Details<i className="fa fa-edit" onClick={handleUpdate}></i>
          <>
            <Link
              className="buttonactions"
              style={{ padding: "6px 19px", marginLeft: "10%" }}
              to={location === '/Individualinsurancequotes' ? "/Individualmetrics" : "/Individualinsuranceunderwriting"}
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
              Back
            </Link>
          </>
        </h4> :
        <h4 className='car details'>Medical Details
          <>
            <Link
              className="buttonactions"
              style={{ padding: "6px 19px", marginLeft: "10%" }}
              to={location === "/Individualinsurancequote" ? "/Individualinsuranceunderwriting" : "/Individualmetrics"}

            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
              Back
            </Link>
          </>
        </h4>
      }


      <div className="filterssas one" style={{ backgroundColor: "white" }}>
        {update ? (
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Full Name</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  required
                  className="input-height"
                  name="full_name"
                  type="text"
                  defaultValue={newname}
                  onChange={(e) => setNewname(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Email</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  required
                  disabled
                  className="input-height"
                  name="email"
                  type="text"
                  value={newemail}
                  onChange={(e) => setNewemail(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Mobile Number</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <PhoneInput
                  international
                  className="form-control"
                  defaultCountry="AE"
                  value={newphone}
                  onChange={handlePhoneChange}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Date of Birth</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <DatePicker
                  placeholderText="Date Of Birth"
                  className="form-control"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  selected={newdate && !isNaN(new Date(newdate))
                    ? new Date(newdate)
                    : null}
                  onChange={(date) => setNewdate(date)}
                  onKeyDown={(e) => e.preventDefault()}
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  showTimeSelect={false}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Gender</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                {/* <select
                  className="form-control"
                  name="gender"
                  disabled
                  value={IndividualInsurance.gender}
                  onChange={(e) => setNewgender(e.target.value)}
                >

                          <option hidden>Gender</option>
                          <option value={"Male"}>Male</option>
                          <option value={"Female (Single)"}>
                            Female (Single)
                          </option>
                          <option value={"Female (Married)"}>
                            Female (Married)
                          </option>
                </select> */}
                <input
                  type="text"
                  className="form-control"
                  value={newgender}
                  disabled
                />

              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Nationality</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <select
                  name="nationality"
                  className="form-control"
                  placeholder="Select Country"
                  defaultValue={newnationality}
                  onChange={(e) => nationality(e.target.value)}
                >
                  {country.length === 0 ? (
                    <option>No options available</option>
                  ) : (
                    country &&
                    country.map((val, index) => (
                      <option value={val.nationality_name} key={index}>
                        {val.nationality_name}
                      </option>
                    ))
                  )}
                </select>
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Emirate Issuing Visa</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <select
                  className="form-control"
                  name="emirates_id"
                  defaultValue={newemirates}
                  onChange={(e) => setNewemirates(e.target.value)}

                >

                  {emirates.length === 0 ? (
                    <option>No options available</option>
                  ) : (
                    emirates &&
                    emirates.map((val) => (
                      <option value={val._id} key={val._id}>
                        {val.area_of_registration_name}
                      </option>
                    ))
                  )}
                </select>
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Visa Type</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <select
                  className="form-control"
                  name="visa_id"
                  defaultValue={newvisa}
                  onChange={(e) => setNewvisa(e.target.value)}

                >
                  <option hidden>Visa Type</option>
                  {visa.length === 0 ? (
                    <option>No options available</option>
                  ) : (
                    visa &&
                    visa.map((val) => (
                      <option value={val._id} key={val._id}>
                        {val.medical_plan_condition}
                      </option>
                    ))
                  )}
                </select>
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Salary</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup>
                <select
                  className="form-control"
                  name="salary_id"
                  defaultValue={newsalary}
                  onChange={(e) => setNewsalary(e.target.value)}
                >
                  <option hidden>Salary</option>
                  {salary.length === 0 ? (
                    <option>No options available</option>
                  ) : (
                    salary &&
                    salary.map((val) => (
                      <option value={val._id} key={val._id}>
                        {val.medical_salary_range}
                      </option>
                    ))
                  )}
                </select>
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Height</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  required
                  type="number"
                  name="height"
                  min={0}
                  onKeyDown={blockInvalidChar}
                  onInput={(e) => Math.abs(e.target.value)}
                  defaultValue={newheight}
                  onChange={(e) => setNewheight(e.target.value)}

                  placeholder="Height (cm)"
                  aria-label="Height (cm)"
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Weight</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  required
                  type="number"
                  name="weight"
                  min={0}
                  onKeyDown={blockInvalidChar}
                  onInput={(e) => Math.abs(e.target.value)}
                  defaultValue={newweight}
                  onChange={(e) => setNewweight(e.target.value)}
                  placeholder="Weight (kg)"
                  aria-label="Weight (kg)"
                />
              </InputGroup>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <button
                  className="profileupadtes"
                  id="personalupdate"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <button
                  className="profileupadtes"
                  id="personalupdate"
                  onClick={handlecancelsubmit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="row border-0">
            <div className="card border-0 ">
            </div>

            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom mt-2">
              <h6>Full Name</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.full_name}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Email</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.email}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Mobile Number</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.phone_number}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Date of Birth</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>
                {moment(IndividualInsurance.date).format("DD/MM/YYYY")}
              </h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Gender</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.gender}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Nationality</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.nationality}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Emirate Issuing Visa</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{emirates.map((val) => val._id == IndividualInsurance.emirates_id ? val.area_of_registration_name : "")}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Visa Type</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{visa.map((val) => val._id == IndividualInsurance.visa_id ? val.medical_plan_condition : "")}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Salary</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{salary.map((val) => val._id == IndividualInsurance.salary_id ? val.medical_salary_range : "")}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Height</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.height}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Weight</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.weight}</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Individualmedicalfilter;
