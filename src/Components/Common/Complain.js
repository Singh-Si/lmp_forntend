import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Complainbanner from "../Banner/Complainbanner";
import swal from "sweetalert";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import admin from "../../config";
import { useNavigate } from "react-router-dom";
const Complain = () => {
    const navigate = useNavigate();
  const [lobOption, setLobOption] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedLob, setSelectedLob] = useState("");
  const [category, setCategory] = useState([]);
  const [name, setName] = useState([]);
  const [phone, setPhone] = useState([]);
  const [email, setEmail] = useState([]);
  const [message, setMessage] = useState([]);
  const animatedComponents = makeAnimated();
  const fetchData = async () => {
    await fetch(`${admin}/get_line_of_business_list`)
      .then((res) => res.json())
      .then((res) => {
        setLobOption(res.data);
        let data = res.data.map((val) => ({
          value: val._id,
          label: val.line_of_business_name,
        }));
        setOptions(data);
      })
      .catch((err) => {})
  }
  //console.log(selectedLob);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${admin}/customerComplaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          category: category,
          lob: [selectedLob],
          phone_number: phone,
          email: email,
          message: message,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === 201) {
        swal(
          "Success",
          "Your complaint has been submitted successfully.",
          "success"
          );
          navigate("/");
        // Optionally, you can reset the form fields here
      } else {
        swal(
          "Error",
          "Failed to submit your complaint. Please try again later.",
          "error"
        );
      }
    } catch (error) {
      ;
      swal(
        "Error",
        "An error occurred while submitting your complaint. Please try again later.",
        "error"
      );
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Header />
      <Complainbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <h3 className="mb-4">Please fill in the form below</h3>
        <div className="container">
          <div className="col-lg-12">
            <div className="row form_abcd">
              <div className="col-lg-8 col-md-12 col-sm-12 col-xs-11">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="col-lg-6">
                    <ul>
                      <li>Line of Business </li>
                    </ul>
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                          {/* <Select
                            className="form-control"
                            options={options}
                            onChange={(e) => setSelectedLob(e)}
                          /> */}

                          <select
                            name="plan_type"
                            className="form-control"
                            onChange={(e) => setSelectedLob(e.target.value)}
                          >
                            <option hidden>Select LOB</option>
                           
                            {lobOption.length > 0 && lobOption.map((val) => (
                              <option value={val._id}>{val.line_of_business_name}</option>
                            )) }
                          </select>

                        </div>
                      </div>
                    </div>
                
                   <div className="col-lg-12">
                    <ul>
                      <li>Category</li>
                    </ul>
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                          <select
                            name="plan_type"
                            className="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="Select">Select</option>
                            <option value="Third Party Liability only">
                              Third Party Liability only
                            </option>
                            <option value="Building Only">Building Only</option>
                          </select>
                        </div>
                      </div>
                    </div>
                   </div>
                  
                   <div className="col-lg-12">
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                          <div className="input-group">
                            <input
                              required
                              placeholder="Enter Name"
                              aria-label="Enter Name"
                              className="form-control"
                              type="name"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                   <div className="col-lg-12">
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                          <div className="input-group">
                            <input
                              required
                              placeholder="Enter Mobile Number"
                              aria-label="Enter Mobile Number"
                              className="form-control"
                              type="phone"
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                   <div className="col-lg-12">
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                          <div className="input-group">
                            <input
                              required
                              placeholder="Enter Email Address"
                              aria-label="Enter Email Address"
                              className="form-control"
                              type="email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                  </div>
                  <div className="col-lg-6 px-2">
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4 mt-3">
                          <div className="input-group">
                            <textarea
                              rows="18"
                              name="brief_info"
                              placeholder="Enter Message"
                              aria-label="Enter Message"
                              className="form-control"
                              onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                        <button
                          className="buttonactions"
                          // onClick={handleSubmit}
                        >
                          Submit
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <p>
            We aim to meet, and even exceed our client’s expectations and
            provide them with solutions to their complaints. In case you are not
            satisfied with our response, you may escalate the matter to our
            Compliance & Internal Control Officer at{" "}
            <span style={{ color: "#EE1D24" }}>complaints@jdvinsurance.ae</span>{" "}
            who will acknowledge your complaint within two working days, and
            will proceed to investigate your case further before responding to
            you within 15 working days.
          </p>
          <p>
            In the unfortunate event where we are unable to reach a satisfactory
            agreement with you, you have the right to refer your complaint to
            the appropriate insurance regulator as indicated below.
          </p>
          <p>
            If you are working and/or residing in Abu Dhabi, please refer to:
            The Department of Health (DOH) P.O. Box 5674, Airport Road, Abu
            Dhabi, UNITED ARAB EMIRATES Tel:{" "}
            <span style={{ color: "#EE1D24" }}>00971 2 449 3333</span> | Fax:{" "}
            <span style={{ color: "#EE1D24" }}>00971 2 444 9822</span> | Email:{" "}
            <span style={{ color: "#EE1D24" }}>contact@abudhabi.ae</span>
          </p>
          <p>If you hold a Dubai residence visa, please refer to:</p>
          <p style={{ color: "#008000" }}>
            iPROMeS – Insurance Partner Relation Management e System
          </p>
          <p>
            For any feedback, complaints, suggestions or complements to service
            providers and Dubai Health Authority; Click Here or log onto{" "}
            <span style={{ color: "#EE1D24" }}>
              http://ipromes.eclaimlink.ae
            </span>
          </p>
          <p>
            If you are working or residing in any other Emirate other than Abu
            Dhabi or Dubai, please contact:
          </p>
          <p>The Insurance Authority</p>
          <p>
            P.O. Box 113332, Aldar HQ, Al Raha Beach, Abu Dhabi, United Arab
            Emirates
          </p>
          <p>
            Tel: <span style={{ color: "#EE1D24" }}>00971 2 499 0111</span> |
            Fax: <span style={{ color: "#EE1D24" }}>00971 2 557 2111</span> |
            Email: <span style={{ color: "#EE1D24" }}>contactus@ia.go.ae</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Complain