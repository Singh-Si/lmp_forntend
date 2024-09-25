import "../../App.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Form, Button, InputGroup } from "react-bootstrap";
import admin from "../../config";
import { UseMotorContext } from "../../MultiStepContextApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import moment from "moment";
import axios from "axios";
import { API_URL } from "../..";
import swal from "sweetalert";
import Homeinsurance from "./Homeinsurance";
import { set } from "firebase/database";

const Homefilter = () => {
  const {
    HomeInsurance,
    setHomeInsurance,
    handleHomeInsurance,
    handleHomeDate,
    handleHomePhoneChange,
  } = UseMotorContext();
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [homeupdate, setHomeupdate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [serverData, setServerData] = useState([]);
  const [originalDate, setOriginalDate] = useState({});

  const [newplanvalue, setNewplanvalue] = useState('');
  const [newbuildingvalue, setNewbuildingvalue] = useState('');
  const [newcontentvalue, setNewcontentvalue] = useState('');
  const [newpersonalbelongingsvalue, setNewpersonalbelongingsvalue] = useState('');
  const [newflatvillano, setNewflatvillano] = useState('');
  const [newbuildingname, setNewbuildingname] = useState('');
  const [newstreetname, setNewstreetname] = useState('');
  const [newarea, setNewarea] = useState('');
  const [newemirate, setNewemirate] = useState('');
  const [newpobox, setNewpobox] = useState('');
  const [newmakani, setNewmakani] = useState('');


  const [newname, setNewname] = useState('');
  const [newemail, setNewemail] = useState('');
  const [newphone, setNewphone] = useState('');
  const [newdate, setNewdate] = useState(HomeInsurance?.date);
  const [newnationality, setNewnationality] = useState('');
  const [originalData, setOriginalData] = useState({});

  const [planlist, setPlanlist] = useState([]);
  const [areaofregistrationlist, setAreaofregistrationlist] = useState([]);


  const Navigate = useNavigate();


  const fetchplanData = async () => {
    try {
      const response1 = await fetch(
        API_URL + "/api/getAllHomePlanTypes"
      );
      if (!response1.ok) {
        throw new Error("Network response was not ok");
      }
      const data1 = await response1.json();
      setPlanlist(data1.data);
    } catch (error) {
      //console.log(error.message);
    }
  };



  useEffect(() => {
    fetchplanData();
    areaofregistration();

    const storedData = JSON.parse(localStorage.getItem("HomeInsurance"));
    setOriginalData(
      {
        plan_type: storedData?.plan_type
      }
    );

  }, []);

  console.log("originalData", originalData)

  const location = useLocation().pathname;
  const localStorageItem = localStorage.getItem("HomeInsurance");
  const homeInfo = JSON.parse(localStorageItem);

  const fetchData = async () => {
    const homeInsurance = localStorage.getItem("HomeInsurance");
    if (homeInsurance) {
      const parsedData = JSON.parse(homeInsurance);
      setData([parsedData]);
    }

    await fetch(`${admin}/getAllNattionlity?lob=Home`)
      .then((res) => res.json())
      .then((data) => setServerData(data.data))
      .catch((e) => { })
  }

  // onclick update

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handlehomeupdate = () => {
    setHomeupdate(!homeupdate);
    // setHomeupdate(true);

  };


  const handlePhoneChange = (phoneValue) => {
    setNewphone(phoneValue);
  };

  const handlehomedetailSubmit = async () => {
    console.log("I m Ready to submit");

    console.log(newplanvalue, newbuildingvalue, newcontentvalue, newpersonalbelongingsvalue, newflatvillano, newbuildingname, newstreetname, newarea, newemirate, newpobox, newmakani);

    let address = {
      flatvillano: newflatvillano != "" ? newflatvillano : HomeInsurance?.address.flatvillano,
      buildingname: newbuildingname != "" ? newbuildingname : HomeInsurance?.address.buildingname,
      streetname: newstreetname != "" ? newstreetname : HomeInsurance?.address.streetname,
      area: newarea != "" ? newarea : HomeInsurance?.address.area,
      emirate: newemirate != "" ? newemirate : HomeInsurance?.address.emirate,
      pobox: newpobox != "" ? newpobox : HomeInsurance?.address.pobox,
      makani: newmakani != "" ? newmakani : HomeInsurance?.address.makani,
    }


    const updatedhomeData = {
      planvalue: newplanvalue != "" ? newplanvalue : HomeInsurance?.plan_type,
      buildingvalue: newbuildingvalue != "" ? newbuildingvalue : HomeInsurance?.building_value,
      contentvalue: newcontentvalue != "" ? newcontentvalue : HomeInsurance?.content_value,
      personalbelongingsvalue: newpersonalbelongingsvalue != "" ? newpersonalbelongingsvalue : HomeInsurance?.personal_belongings_value,
      address: address
    };

    console.log(updatedhomeData)

    setHomeInsurance((prevState) => ({
      ...prevState,
      plan_type: updatedhomeData.planvalue,
      building_value: updatedhomeData.buildingvalue,
      content_value: updatedhomeData.contentvalue,
      personal_belongings_value: updatedhomeData.personalbelongingsvalue,
      address: updatedhomeData.address
    }));


    const obj = {
      plan_type: updatedhomeData.planvalue,
      building_value: parseFloat(updatedhomeData?.buildingvalue?.replace(/,/g, '')),
      content_value: parseFloat(updatedhomeData?.contentvalue?.replace(/,/g, '')),
      personal_belongings_value: parseFloat(updatedhomeData?.personalbelongingsvalue?.replace(/,/g, '')),
      homeAddress: updatedhomeData.address,
      insuranceType: "Home",
      location: window.location.pathname.replace("/", ""),
    }



    console.log(HomeInsurance)
    console.log(HomeInsurance.lead_id)

    // if (HomeInsurance.lead_id !== null && HomeInsurance.user === 'customer') {
    await axios
      .put(API_URL + '/api/updatePolicyDetails?id=' + HomeInsurance.leadid
        , {
          ...obj
        })
      .then((result) => {
        if (result.status == 200) {

          localStorage.setItem('leaddetails', JSON.stringify(result.data._id))
          setHomeupdate(false);

        } else {
          swal('Error', 'Error in Adding Family Details', 'error')
        }
      })
      .catch((error) => {
        if (error && error.response.status) {
          swal('Error', error.reponse.data.message, 'error')
          return error.response.status
        }
      })
    // } else if (HomeInsurance.user === 'BE') {
    //   fetch(API_URL + '/api/fillInsurancePlan?email=' + HomeInsurance.email, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       plan_type: updatedhomeData.planvalue,
    //       building_value: updatedhomeData.buildingvalue,
    //       content_value: updatedhomeData.contentvalue,
    //       personal_belongings_value: updatedhomeData.personalbelongingsvalue,
    //       //   address : { 
    //       //   flatvillano: updatedhomeData.flatvillano,
    //       //   buildingname: updatedhomeData.buildingname,
    //       //   streetname: updatedhomeData.streetname,
    //       //   area: updatedhomeData.area,
    //       //   emirate: updatedhomeData.emirate,
    //       //   pobox: updatedhomeData.pobox,
    //       //   makani: updatedhomeData.makani
    //       // },
    //       homeAddress: updatedhomeData.address,
    //       insuranceType: "Home",
    //       location: window.location.pathname.replace("/", ""),
    //       businessentitytoken: HomeInsurance?.businessentitytoken,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((responseData) => {
    //       // Handle the API response if needed
    //       localStorage.setItem('leaddetails', JSON.stringify(responseData.data._id))
    //       setHomeupdate(false);

    //     })
    //     .catch((error) => {
    //       if (error && error.reponse.data.message) {
    //         swal('Error', error.reponse.data.message, 'error')
    //       }

    //       // Handle any error that occurred during the API request
    //       //console.error('Error making POST API request:', error)
    //     })
    // } else {
    //   fetch(API_URL + '/api/fillInsurancePlan?email=' + HomeInsurance.email, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       plan_type: updatedhomeData.planvalue,
    //       building_value: updatedhomeData.buildingvalue,
    //       content_value: updatedhomeData.contentvalue,
    //       personal_belongings_value: updatedhomeData.personalbelongingsvalue,
    //       // address : { 
    //       // flatvillano: updatedhomeData.flatvillano,
    //       // buildingname: updatedhomeData.buildingname,
    //       // streetname: updatedhomeData.streetname,
    //       // area: updatedhomeData.area,
    //       // emirate: updatedhomeData.emirate,
    //       // pobox: updatedhomeData.pobox,
    //       // makani: updatedhomeData.makani},
    //       homeAddress: updatedhomeData.address,
    //       insuranceType: "Home",
    //       location: window.location.pathname.replace("/", ""),
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((result) => {
    //       //console.log('Success:', result)
    //       if (result.status == 200) {

    //         localStorage.setItem('leaddetails', JSON.stringify(result.data._id))
    //         setHomeupdate(false);
    //       } else {
    //         swal('Error', 'Error in Adding Family Details', 'error')
    //       }
    //     })
    //     .catch((error) => {
    //       //console.error('Error:', error)
    //     })
    // }


  };



  const handlehomecancelsubmit = (e) => {
    e.preventDefault();
    // setNewplanvalue(originalData);
    setNewbuildingvalue(HomeInsurance?.building_value);
    setNewcontentvalue(HomeInsurance?.content_value);
    setNewpersonalbelongingsvalue(HomeInsurance?.personal_belongings_value);
    setNewflatvillano(HomeInsurance?.address.flatvillano);
    setNewbuildingname(HomeInsurance?.address.buildingname);
    setNewstreetname(HomeInsurance?.address.streetname);
    setNewarea(HomeInsurance?.address.area);
    setNewemirate(HomeInsurance?.address.emirate);
    setNewpobox(HomeInsurance?.address.pobox);
    setNewmakani(HomeInsurance?.address.makani);
    setHomeInsurance({
      ...HomeInsurance,
      plan_type: originalData.plan_type,

    });

    setHomeupdate(false);

  }

  const handleview = localStorage.getItem("HomeInsurance");
  const view = JSON.parse(handleview)?.plan_type;
  const plantype = view?.plan_type;
  console.log("view", plantype)

  const handleSubmit = async () => {
    console.log("I m Ready to submit");
    console.log(newname, newemail, newphone, newdate, newnationality);

    console.log(newname != "" ? newname : HomeInsurance?.full_name);
    // console.log(newemail != "" ? newemail : HomeInsurance?.plan_type);
    console.log(newphone != "" ? newphone : HomeInsurance?.phone_number);
    console.log(newdate != "" ? newdate : HomeInsurance?.date);
    console.log(newnationality != "" ? newnationality : HomeInsurance?.newnationality)

    // const { full_name, email, phone_number, date, nationality } = homeInfo;

    // const dataToSend = {
    //   name: full_name,
    //   email: email,
    //   phoneno: phone_number,
    //   nationality: nationality,
    //   date_of_birth: date,
    //   insuranceType: "Home",
    //   location: window.location.pathname.replace("/", ""),
    // };
    // setHomeInsurance(prev => ({ ...prev, phone_number, nationality, full_name }))
    // localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));

    const updatedData = {
      ...HomeInsurance,
      full_name: newname != "" ? newname : HomeInsurance?.full_name,
      phone_number: newphone != "" ? newphone : HomeInsurance?.phone_number,
      date: newdate != "" ? newdate : HomeInsurance?.date,
      nationality: newnationality != "" ? newnationality : HomeInsurance.nationality,
    };
    console.log(updatedData)

    setHomeInsurance(updatedData);
    localStorage.setItem("HomeInsurance", JSON.stringify(updatedData));


    await axios
      .put(API_URL + '/api/updatePolicyDetails?id=' + HomeInsurance.leadid, {
        name: updatedData.full_name,
        phoneno: updatedData.phone_number,
        date_of_birth: updatedData.date,
        nationality: updatedData.nationality,
        insuranceType: "Home",
        location: window.location.pathname.replace("/", ""),
      })
      .then((result) => {
        if (result.status == 200) {

          localStorage.setItem('leaddetails', JSON.stringify(result.data._id))
          setUpdate(false);

        } else {
          swal('Error', 'Error in Adding Family Details', 'error')
        }
      })
      .catch((error) => {
        if (error && error.response.status) {
          swal('Error', error.reponse.data.message, 'error')
          return error.response.status
        }
      })



  };

  const handlecancelsubmit = (e) => {
    e.preventDefault();
    setNewname(HomeInsurance?.full_name);
    setNewemail(HomeInsurance?.email);
    setNewphone(HomeInsurance?.phone_number);
    setNewnationality(HomeInsurance?.nationality)
    setNewdate(HomeInsurance?.date);
    //  setHomeInsurance({
    //     ...HomeInsurance,
    //     date: originalDate,
    //  })
    setUpdate(false);
  }

  // event update

  const handleSelect = (name, e) => {
    const value = e.target.value;
    console.log("value", value);

    // setHomeInsurance((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));

    // localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    setHomeInsurance({ ...HomeInsurance, date: date });
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toDateString();
  };

  // useEffect

  useEffect(() => {
    fetchData();
  }, [HomeInsurance]);

  // useEffect(() => {
  //   const storedData = localStorage.getItem("HomeInsurance");
  //   const storedData1 = JSON.parse(localStorage.getItem("HomeInsurance"));
  //   if (storedData) {
  //     setHomeInsurance(JSON.parse(storedData));
  //   }
  //   setOriginalDate({
  //     date: storedData1.date,
  //   });
  // }, []);

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);


  const areaofregistration = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    await fetch(
      `${API_URL}/api/getAreaOfRegistrations`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setAreaofregistrationlist(data.data);
      });
  }

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

  const [rawBuildingValue, setRawBuildingValue] = useState('');
  const [rawcontentValue, setRawcontentValue] = useState('');
  const [rawpersonalbelongingsValue, setRawpersonalbelongingsValue] = useState('');

  useEffect(() => {
    if (rawBuildingValue !== '') {
      const formattedValue = formatAmount(rawBuildingValue);

      setNewbuildingvalue(formattedValue);
    }
  }, [rawBuildingValue]);

  useEffect(() => {
    if (rawcontentValue !== '') {
      const formattedValue = formatAmount(rawcontentValue);
      setNewcontentvalue(formattedValue);
    }
  }, [rawcontentValue]);

  useEffect(() => {
    if (rawpersonalbelongingsValue !== '') {
      const formattedValue = formatAmount(rawpersonalbelongingsValue);
      setNewpersonalbelongingsvalue(formattedValue);
    }
  }, [rawpersonalbelongingsValue]);


  const handleBuildingValue = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value;
    setRawBuildingValue(value);
  }

  const handleContentValue = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value;
    setRawcontentValue(value);
  }

  const handlePersonalBelongingsValue = (e) => {
    const value = e.target.value === '' ? '0' : e.target.value;
    setRawpersonalbelongingsValue(value);
  }


  const handleplanchange = (e) => {
    setNewplanvalue(e.target.value);
    setHomeInsurance((prevState) => ({
      ...prevState,
      plan_type: e.target.value,
    }));
  }





  return (
    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 filters">
      {/* {location === "/Homequotes" ? (
        <h4 className="car details">
          Personal Details
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
        <h4 className="car details">Personal Details
          <>
            <Link
              className="buttonactions"
              style={{ padding: "6px 19px", marginLeft: "10%" }}
              to={"/Homequotes"}
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
              Back
            </Link>
          </>
        </h4>

      )} */}


      {location === '/Homequotes' ?
        <h4 className='car details'>Home Details<i className="fa fa-edit" onClick={handlehomeupdate}></i>
          <>
            <Link
              className="buttonactions"
              style={{ padding: "6px 19px", marginLeft: "10%" }}
              to={"/Homecondition2"}
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
              Back
            </Link>
          </>
        </h4> :
        <h4 className='car details'>Home Details
          <>
            <Link
              className="buttonactions"
              style={{ padding: "6px 19px", marginLeft: "10%" }}
              to={"/Homequotes"}
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
              Back
            </Link>
          </>
        </h4>
      }

      {homeupdate ? (
        <div className="filterssas one">
          <div className="row">

            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Plan Type</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Select
                  className="input-height"
                  required
                  defaultValue={HomeInsurance.plan_type}
                  onChange={(e) => {
                    setNewplanvalue(e.target.value);
                    setHomeInsurance((prevState) => ({
                      ...prevState,
                      plan_type: e.target.value,
                    }));
                  }}
                >
                  <option value="" hidden>Select Plan Type</option>
                  {
                    planlist?.map((item) => (
                      <option value={item._id} key={item._id}>
                        {item.home_plan_type}
                      </option>
                    ))
                  }
                </Form.Select>
              </InputGroup>
            </div>


            {HomeInsurance.plan_type === "642279d4fb67d39380fef82d" || HomeInsurance.plan_type === "64227a65fb67d39380fef842" ?
              <>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Building Value (AED)</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <InputGroup className="">
                    <Form.Control
                      className="input-height"
                      required
                      // defaultValue={formatAmount(HomeInsurance.building_value)}
                      value={newbuildingvalue !== '' ? formatAmount(newbuildingvalue) : formatAmount(HomeInsurance.building_value)}
                      onChange={handleBuildingValue}
                    />
                  </InputGroup>
                </div>
              </>
              : null
            }
            {HomeInsurance.plan_type === "642279f2fb67d39380fef834" || HomeInsurance.plan_type === "64227a65fb67d39380fef842" ?
              <>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Content Value (AED)</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <InputGroup className="">
                    <Form.Control
                      className="input-height"
                      required
                      value={newcontentvalue !== '' ? formatAmount(newcontentvalue) : formatAmount(HomeInsurance.content_value)}
                      onChange={handleContentValue}
                    />
                  </InputGroup>
                </div>
              </>
              : null
            }
            {HomeInsurance.plan_type === "642279f2fb67d39380fef834" || HomeInsurance.plan_type === "64227a65fb67d39380fef842" ?
              <>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Personal belonging Value (AED)</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <InputGroup className="">
                    <Form.Control
                      className="input-height"
                      required
                      value={newpersonalbelongingsvalue !== '' ? formatAmount(newpersonalbelongingsvalue) : formatAmount(HomeInsurance.personal_belongings_value)}
                      onChange={handlePersonalBelongingsValue}
                    />
                  </InputGroup>
                </div>
              </>
              : null
            }
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Flat / Villa No.</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  className="input-height"
                  required
                  defaultValue={HomeInsurance.address.flatvillano}
                  onChange={(e) => setNewflatvillano(e.target.value)}
                />
              </InputGroup>
            </div>

            {HomeInsurance.property_type === "64216af4c0e5389c0007de2e" &&
              <>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Building Name</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <InputGroup>
                    <Form.Control
                      className="input-height"
                      required
                      defaultValue={HomeInsurance.address.buildingname}
                      onChange={(e) => setNewbuildingname(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </>
            }

            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Street# / Name</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup>
                <Form.Control
                  className="input-height"
                  required
                  defaultValue={HomeInsurance.address.streetname}
                  onChange={(e) => setNewstreetname(e.target.value)}
                />
              </InputGroup>
            </div>

            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Area</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup>
                <Form.Control
                  className="input-height"
                  required
                  defaultValue={HomeInsurance.address.area}
                  onChange={(e) => setNewarea(e.target.value)}
                />
              </InputGroup>
            </div>

            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Emirate</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup>
                {/* <Form.Control
                  className="input-height"
                  required
                  defaultValue={HomeInsurance.address.emirate}
                  onChange={(e) => setNewemirate(e.target.value)}
                /> */}

                <Form.Select
                  aria-label="Default select example"
                  name="emirate"
                  defaultValue={HomeInsurance.address.emirate}
                  onChange={(e) => setNewemirate(e.target.value)}
                >
                  <option value="" hidden>Select Emirate</option>
                  {areaofregistrationlist.map((item, index) => (
                    <option key={index} value={item.area_of_registration_name}>
                      {item.area_of_registration_name}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </div>

            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>P.O. Box</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup>
                <Form.Control
                  className="input-height"
                  required
                  defaultValue={HomeInsurance.address.pobox}
                  onChange={(e) => setNewpobox(e.target.value)}
                />
              </InputGroup>
            </div>

            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Makani #</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup>
                <Form.Control
                  className="input-height"
                  required
                  defaultValue={HomeInsurance.address.makani}
                  onChange={(e) => setNewmakani(e.target.value)}
                />
              </InputGroup>
            </div>


            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <button
                  className="profileupadtes"
                  id="personalupdate"
                  onClick={handlehomedetailSubmit}
                >
                  Update
                </button>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <button
                  className="profileupadtes"
                  id="personalupdate"
                  onClick={handlehomecancelsubmit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="filterssas one">

          <div className="row" >
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Plan Type</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{planlist.map((item) => item._id == HomeInsurance.plan_type ? item.home_plan_type : null)}</h6>
            </div>
            {HomeInsurance.plan_type === "642279d4fb67d39380fef82d" || HomeInsurance.plan_type === "64227a65fb67d39380fef842" ?
              <>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Building Value (AED)</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{formatAmount(HomeInsurance.building_value)}</h6>
                </div>
              </>
              : null
            }
            {HomeInsurance.plan_type === "642279f2fb67d39380fef834" || HomeInsurance.plan_type === "64227a65fb67d39380fef842" ?
              <>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Content Value (AED)</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{formatAmount(HomeInsurance.content_value)}</h6>
                </div>
              </>
              : null
            }
            {HomeInsurance.plan_type === "642279f2fb67d39380fef834" || HomeInsurance.plan_type === "64227a65fb67d39380fef842" ?
              <>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Personal belonging Value (AED)</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{formatAmount(HomeInsurance.personal_belongings_value)}</h6>
                </div>
              </>
              : null
            }
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Flat / Villa No.</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{HomeInsurance.address.flatvillano}</h6>
            </div>
            {HomeInsurance.property_type === "64216af4c0e5389c0007de2e" &&
              <>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Building Name</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{HomeInsurance.address.buildingname}</h6>
                </div>
              </>
            }
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
              <h6>Street# / Name</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{HomeInsurance.address.streetname}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
              <h6>Area</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{HomeInsurance.address.area}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
              <h6>Emirate</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{HomeInsurance.address.emirate}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
              <h6>P.O. Box</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{HomeInsurance.address.pobox}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
              <h6>Makani #</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{HomeInsurance.address.makani}</h6>
            </div>

          </div>

        </div>
      )}










      <h4 className='car details'>Personal Details<i className="fa fa-edit" onClick={handleUpdate}></i></h4>



      {update ? (
        <div className="filterssas one">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Full Name</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  className="input-height"
                  required
                  defaultValue={HomeInsurance.full_name}
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
                  className="input-height"
                  required
                  readOnly
                  disabled
                  defaultValue={HomeInsurance.email}
                  onChange={(e) => handleSelect("email", e)}
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
                  value={HomeInsurance.phone_number}
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
                  className="form-control"
                  selected={newdate && !isNaN(new Date(newdate))
                    ? new Date(newdate)
                    : null}
                  placeholderText="Date Of Birth"
                  showTimeSelect={false}
                  maxDate={new Date()}
                  peekNextMonth
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  onChange={(date) => setNewdate(date)}
                />
              </InputGroup>
            </div>
            {/* <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Gender</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Male</h6>
            </div> */}
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Nationality</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup>
                <select
                  className="form-control input-height"
                  placeholder="Select Country"
                  defaultValue={HomeInsurance.nationality}
                  onChange={(e) => setNewnationality(e.target.value)}
                >
                  {serverData.length === 0 ? (
                    <div>No options available</div>
                  ) : (
                    serverData &&
                    serverData.map((val, index) => (
                      <option value={val.nationality_name} key={index}>
                        {val.nationality_name}
                      </option>
                    ))
                  )}
                </select>
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
        </div>
      ) : (
        <div className="filterssas one">
          {data.length === 0 ? (
            <div>Something went wrong</div>
          ) : (
            data.map((val, index) => (
              <div className="row" key={index}>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Full Name</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{val.full_name}</h6>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Email</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{val.email}</h6>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Mobile Number</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{val.phone_number}</h6>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Date of Birth</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{moment(val.date).format("DD/MM/YYYY")}</h6>
                </div>
                {/* <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
                  <h6>Gender</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Male</h6>
                </div> */}
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
                  <h6>Nationality</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{val.nationality}</h6>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Homefilter;
