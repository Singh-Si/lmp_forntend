import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useEffect } from "react";
import swal from "sweetalert";
import admin from "../../config";
import { API_URL } from "../..";
import { CSpinner } from "@coreui/react";
import Individualnsurancedetails from "../Common/Individualnsurancedetails";
const Individualcountry = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance, HandleSubmitIndividualFormdata
  } = UseMotorContext();
  const [country, setCountry] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const Progress = 30;

  const showmore = () => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    setItemsToShow(!itemsToShow);
  };

  const handleSubmit = async () => {
    // //console.log("chcek");
    const {
      full_name,
      email,
      phone_number,
      date,
      gender,
      nationality,
      insurance_type,
      nationality_id
    } = IndividualInsurance;

    const dataToSend = {
      // name: full_name,
      // email: email,
      // phoneno: phone_number,
      // date_of_birth: date,
      // insuranceType: insurance_type,
      // gender: gender,
      nationality: nationality,
      nationality_id: nationality_id,
      location: "Individualinsuranceids"
    };

    HandleSubmitIndividualFormdata(dataToSend);
  };

  const fetchData = async () => {
    setLoading(true)
    await fetch(`${API_URL}/api/getAllNattionlity?lob=Medical`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setCountry(data.data)
        if (data.data?.length > 0) {
          let dataarr = data?.data;
          //console.log("nationality array",dataarr)
          let countrytoifind = dataarr.find(
            (item) => item.nationality_name === "UNITED ARAB EMIRATES"
          );
          //console.log("nationality check",countrytoifind)
          if (!IndividualInsurance.nationality) {
            setIndividualInsurance((prevData) => ({
              ...prevData,
              nationality: countrytoifind?.nationality_name,
              nationality_id: countrytoifind?._id,
            }));
            localStorage.setItem(
              "IndividualInsurance",
              JSON.stringify(IndividualInsurance)
            );
          }
        }
      })
      .catch((e) => {
        setLoading(false)
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (country.length > 0) {
      const index = country.findIndex(
        (val) => val.nationality_name === IndividualInsurance.nationality
      );
      // //console.log(index, "check");
      if (index > 8) {
        setItemsToShow(true);
      }
    }
  }, [country]);



  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);
  const navigate = useNavigate()


  const handleSelectNationality = async (e,val) => {
    console.log("I was Clickeeeeeeeeeeeeeeeeeeeeeeeeeedddddddddddddddddddd");
    console.log(val);
    // Update nationality and nationality_id in state or context
    await  handleIndividualInsurance(e,val.nationality_name, "nationality");
    await handleIndividualInsurance(e,val._id, "nationality_id");

    // Submit the form data if needed
    HandleSubmitIndividualFormdata({ 
      nationality: val.nationality_name,
      nationality_id: val._id,
      location: "Individualinsuranceids"
    });

    // Navigate to the next page
    navigate('/Individualinsuranceids');
  };





  return (
    <div>
      <Header />
      <Individualmedicalbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <h5 className="gheading">Yeah ! Now only 3 Questions remaining</h5>
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <ul>
                    <li>Please select your nationality.</li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3">
                        <select
                          name="nationality"
                          className="form-control"
                          placeholder="Select Country"
                          value={IndividualInsurance.nationality}
                          onChange={handleIndividualInsurance}
                        >
                          <option hidden>Select your country</option>

                          {country.length === 0 ? (
                            <option>No options available</option>
                          ) : (
                            country &&
                            country.map((val) => (
                              <option value={val.nationality_name} key={val.nationality_name}>
                                {val.nationality_name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {loading ? <div className="d-flex justify-content-center">
                        <CSpinner color="danger" />
                      </div> : country && country.length > 0 && (
                        <>
                          {(itemsToShow
                            ? country?.slice(0, country.length)
                            : country?.slice(0, 9)
                          ).map((val) => {
                            return (
                              <div
                                className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                key={val.nationality_name}
                              >
                                <label
                                  className={`btn btn-default ${IndividualInsurance.nationality ===
                                    val.nationality_name
                                    ? "active"
                                    : ""
                                    }`}
                                  name="country"
                                  // onClick={() => {
                                  //   handleIndividualInsurance(
                                  //     val.nationality_name,
                                  //     "nationality"
                                  //   )
                                  //   handleIndividualInsurance(
                                  //     val._id,
                                  //     "nationality_id"
                                  //   )
                                  //   console.log("i am working")
                                  //   HandleSubmitIndividualFormdata({       
                                  //     nationality: val.nationality_name,
                                  //     nationality_id: val._id,
                                  //   })
                                  //   navigate('/Individualinsuranceids')
                                  // }
                                  // }
                                  onClick={(e) => handleSelectNationality(e,val)}
                                >
                                  <input
                                    type="radio"
                                    name="nationality"
                                    defaultChecked={
                                      IndividualInsurance.nationality ===
                                      val.nationality_name
                                    }
                                    value={val.nationality_name}
                                  />
                                  {val.nationality_name}
                                </label>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                    {itemsToShow ? (
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <p
                          className="showcom"
                          style={{ cursor: "pointer" }}
                          onClick={() => showmore()}
                        >
                          Show Less
                        </p>
                      </div>
                    ) : (
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <p
                          className="showcom"
                          style={{ cursor: "pointer" }}
                          onClick={() => showmore()}
                        >
                          Show More
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link
                        to="/Individualinsurancepersonaldetails"
                        className="buttonactions"
                      >
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    {IndividualInsurance.nationality ? (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          to="/Individualinsuranceids"
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
                    ) : (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          className="buttonactions"
                          onClick={() => {
                            let errorText = "";

                            if (!IndividualInsurance.nationality) {
                              errorText = "Please Select a country";
                            }
                            if (errorText) {
                              swal({
                                title: "Error!",
                                text: errorText,
                                icon: "error",
                              });
                            }
                          }}
                        >
                          Next
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
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
      <Individualnsurancedetails />
      <Footer />
    </div>
  );
};

export default Individualcountry;
