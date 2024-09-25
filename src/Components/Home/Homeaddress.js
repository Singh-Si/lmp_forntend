import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import swal from "sweetalert";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
import PhoneInput from "react-phone-number-input";
import Homebanner from "../Banner/Homebanner";
import { set } from "firebase/database";
import { API_URL } from "../..";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HomeInsurancedetails from "../Common/HomeInsurancedetails";

const Homeaddress = () => {
    const Progress = 60;
    const {
        HomeInsurance,
        setHomeInsurance,
        handleHomeInsurance,
        HandleSubmitHomeFormdata,
        hometooltip
    } = UseMotorContext();

    const Navigate = useNavigate();

    const [startDate, setStartDate] = useState();
    const [serverData, setServerData] = useState([]);
    const [areaofregistrationlist, setAreaofregistrationlist] = useState([]);

    useEffect(() => {
        areaofregistration();
    }, []);

    // Validate Email Id
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [formValues, setFormValues] = useState({
        flatvillano: "",
        buildingname: "",
        streetname: "",
        area: "",
        emirate: "",
        pobox: "",
        makani: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) =>
        ({
            ...prev,
            [name]: value
        })
        );
        setHomeInsurance((prev) =>
        ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        })
        );
    }



    const handleSubmit = async () => {

        console.log(HomeInsurance.address, "address")
        console.log(formValues)

        if (HomeInsurance.address.flatvillano === "") {
            swal({

                text: "Please Enter Flat / Villa No.",
                icon: "warning",
            });
        }
        else if (HomeInsurance.property_type === "64216af4c0e5389c0007de2e" && HomeInsurance.address.buildingname === "") {
            swal({

                text: "Please Enter Building Name",
                icon: "warning",
            });

        } else if (HomeInsurance.address.streetname === "") {
            swal({

                text: "Please Enter Street# / Name",
                icon: "warning",
            });
        } else if (HomeInsurance.address.area === "") {
            swal({

                text: "Please Enter Area",
                icon: "warning",
            });
        } else if (HomeInsurance.address.emirate === "") {
            swal({

                text: "Please Enter Emirate",
                icon: "warning",
            });
        }
        // else if (HomeInsurance.address.pobox === "") {
        //     swal({

        //         text: "Please Enter P.O. Box",
        //         icon: "warning",
        //     });
        // } else if (HomeInsurance.address.makani === "") {
        //     swal({

        //         text: "Please Enter Makani",
        //         icon: "warning",
        //     });
        // } 
        else {
            const dataToSend = {
                homeAddress: HomeInsurance.address,
                location: "Homecondition"
            };
            await HandleSubmitHomeFormdata(dataToSend);
            Navigate('/Homecondition')
        }

    };

    console.log(HomeInsurance);



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

    console.log(areaofregistrationlist.map((val) => val.area_of_registration_name), "areaofregistrationlist")
    console.log('hometooltip:', hometooltip)


    return (
        <div>
            <Header />
            <Homebanner />
            <div className="container-fluid car_info pt-4 pb-4">
                <div className="container">
                    <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
                    <div className="row" style={{ justifyContent: "center" }}>
                        <div className="col-lg-12 nopadding">
                            <div className="row form_abcd">
                                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                                    <div className="row">
                                        <ul style={{ paddingLeft: "0px" }}>
                                            <li style={{ listStyle: "none", marginLeft: "15px" }}>
                                                Please fill your address details :
                                            </li>
                                        </ul>
                                        {/* <div className="col-lg-6" style={{position:'relative'}}>
                          <ul>
                            <li>Flat No.</li>
                          </ul>
                          <InputGroup className="mb-4">
                            <InputGroup.Text id="basic-addon1">
                            <i
                                className="fa fa-map-marker"
                                aria-hidden="true"
                              ></i>
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              required
                              name="flatno"
                              placeholder="Full Name"
                              aria-label="Full Name"
                            />
                          </InputGroup>
                        </div> */}
                                        <div className="col-lg-6" style={{position:'relative'}}>
                                            <ul>
                                                <li>Flat / Villa No.</li>
                                            </ul>
                                            <InputGroup className="mb-4">
                                                <InputGroup.Text id="basic-addon1">
                                                    <i
                                                        className="fa fa-map-marker"
                                                        aria-hidden="true"
                                                    ></i>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    name="flatvillano"
                                                    type="text"
                                                    placeholder="Flat / Villa No"
                                                    aria-label="Flat / Villa No"
                                                    value={HomeInsurance?.address?.flatvillano}
                                                    onChange={handleInputChange}
                                                />
                                            </InputGroup>
                                            <OverlayTrigger
                                                key="right"
                                                placement="right"
                                                overlay={
                                                    <Tooltip id="tooltip-right">
                                                        {hometooltip?.addressDetails?.flatVillaNo}
                                                    </Tooltip>
                                                }
                                            >
                                               <i style={{top:"52px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                            </OverlayTrigger>
                                        </div>
                                        {HomeInsurance.property_type === "64216af4c0e5389c0007de2e" &&
                                            <div className="col-lg-6" style={{position:'relative'}}>

                                                <ul>
                                                    <li>Building Name</li>
                                                </ul>
                                                <InputGroup className="mb-4">
                                                    <InputGroup.Text id="basic-addon1">
                                                        <i
                                                            className="fa fa-map-marker"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        name="buildingname"
                                                        type="text"
                                                        placeholder="Building Name"
                                                        aria-label="Building Name"
                                                        value={HomeInsurance.address.buildingname}
                                                        onChange={handleInputChange}
                                                    />
                                                </InputGroup>
                                                <OverlayTrigger
                                                    key="right"
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip id="tooltip-right">
                                                            {hometooltip?.addressDetails?.buildingName}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <i style={{top:"52px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                                </OverlayTrigger>
                                            </div>
                                        }
                                        <div className="col-lg-6" style={{position:'relative'}}>
                                            <ul>
                                                <li>Street# / Name</li>
                                            </ul>
                                            <InputGroup className="mb-4">
                                                <InputGroup.Text id="basic-addon1">
                                                    <i
                                                        className="fa fa-map-marker"
                                                        aria-hidden="true"
                                                    ></i>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    name="streetname"
                                                    type="text"
                                                    placeholder="Street# / Name"
                                                    aria-label="Street# / Name"
                                                    value={HomeInsurance.address.streetname}
                                                    onChange={handleInputChange}
                                                />
                                            </InputGroup>
                                            <OverlayTrigger
                                                key="right"
                                                placement="right"
                                                overlay={
                                                    <Tooltip id="tooltip-right">
                                                        {hometooltip?.addressDetails?.streetName}
                                                    </Tooltip>
                                                }
                                            >
                                                <i style={{top:"52px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                            </OverlayTrigger>
                                        </div>
                                        <div className="col-lg-6" style={{position:'relative'}}>
                                            <ul>
                                                <li>Area</li>
                                            </ul>
                                            <InputGroup className="mb-4">
                                                <InputGroup.Text id="basic-addon1">
                                                    <i
                                                        className="fa fa-map-marker"
                                                        aria-hidden="true"
                                                    ></i>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    name="area"
                                                    type="text"
                                                    placeholder="Area"
                                                    aria-label="Area"
                                                    value={HomeInsurance.address.area}
                                                    onChange={handleInputChange}
                                                />
                                            </InputGroup>
                                            <OverlayTrigger
                                                key="right"
                                                placement="right"
                                                overlay={
                                                    <Tooltip id="tooltip-right">
                                                        {hometooltip?.addressDetails?.area}
                                                    </Tooltip>
                                                }
                                            >
                                                <i style={{top:"52px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                            </OverlayTrigger>
                                        </div>
                                        <div className="col-lg-6" style={{position:'relative'}}>
                                            <ul>
                                                <li>Emirate</li>
                                            </ul>
                                            <InputGroup className="mb-4">
                                                <InputGroup.Text id="basic-addon1">
                                                    <i
                                                        className="fa fa-map-marker"
                                                        aria-hidden="true"
                                                    ></i>
                                                </InputGroup.Text>
                                                {/* <Form.Control
                                                    required
                                                    name="emirate"
                                                    type="text"
                                                    placeholder="Emirate"
                                                    aria-label="Emirate"
                                                    value={HomeInsurance.address.emirate}
                                                    onChange={handleInputChange}
                                                /> */}
                                                <select
                                                    className="form-control"
                                                    name="emirate"
                                                    value={HomeInsurance.address.emirate}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="" hidden>Select Emirate</option>
                                                    {areaofregistrationlist.map((item, index) => (
                                                        <option key={index} value={item.area_of_registration_name}>
                                                            {item.area_of_registration_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </InputGroup>
                                        </div>
                                        <div className="col-lg-6" style={{position:'relative'}}>
                                            <ul>
                                                <li>P.O. Box</li>
                                            </ul>
                                            <InputGroup className="mb-4">
                                                <InputGroup.Text id="basic-addon1">
                                                    <i
                                                        className="fa fa-map-marker"
                                                        aria-hidden="true"
                                                    ></i>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    name="pobox"
                                                    type="text"
                                                    placeholder="P.O. Box "
                                                    aria-label="P.O. Box "
                                                    value={HomeInsurance.address.pobox}
                                                    onChange={handleInputChange}
                                                />
                                            </InputGroup>
                                            <OverlayTrigger
                                                key="right"
                                                placement="right"
                                                overlay={
                                                    <Tooltip id="tooltip-right">
                                                        {hometooltip?.addressDetails?.pOBox}
                                                    </Tooltip>
                                                }
                                            >
                                                <i style={{top:"52px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                            </OverlayTrigger>
                                        </div>
                                        <div className="col-lg-6" style={{position:'relative'}}>
                                            <ul>
                                                <li>Makani #</li>
                                            </ul>
                                            <InputGroup className="mb-4">
                                                <InputGroup.Text id="basic-addon1">
                                                    <i
                                                        className="fa fa-map-marker"
                                                        aria-hidden="true"
                                                    ></i>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    name="makani"
                                                    type="text"
                                                    placeholder="Makani "
                                                    aria-label="Makani "
                                                    value={HomeInsurance.address.makani}
                                                    onChange={handleInputChange}
                                                />
                                            </InputGroup>
                                            <OverlayTrigger
                                                key="right"
                                                placement="right"
                                                overlay={
                                                    <Tooltip id="tooltip-right">
                                                        {hometooltip?.addressDetails?.makani}
                                                    </Tooltip>
                                                }
                                            >
                                                <i style={{top:"52px"}} className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                            </OverlayTrigger>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                                            <Link to="/Homepersonaldetails" className="buttonactions">
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
                                            onClick={handleSubmit}
                                        >
                                            <Link
                                                className="buttonactions"
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
            <HomeInsurancedetails />
            <Footer />
        </div>
    );
}

export default Homeaddress