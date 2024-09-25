import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL, forntendurl } from '..'
import swal from 'sweetalert'
import moment from 'moment'
import { Modal } from "react-bootstrap";
import { UseMotorContext } from '../MultiStepContextApi';
import { OverlayTrigger, Tooltip } from "react-bootstrap";


const YachtThankYouFormPage = (props) => {
    const {yachttooltip} = UseMotorContext();

    const [id, setId] = useState(props.params.get("id") || props.params.get("leadid"))
    const [hoemdata, sethoemdata] = useState({})
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        props.setTravelagreementdata(true)
        setShow(false)
    };
    const [TermsAndConditionsdata, setTermsAndConditionsdata] = useState("")
    useEffect(() => {
        setId(props.params.get("id") || props.params.get("leadid"))
        getdetailbyid()
        getTermsANdConditions()
    }, [props.leadid])
    const getdetailbyid = async () => {
        try {
            await axios
                .get(API_URL + "/api/getYatchNewLeadDetails?leadId=" + id,
                )
                .then((response) => {
                    console.log("response>>>>>", response.data.data)
                    if (response.data.data.length > 0) {
                        let data = response.data.data[0]
                        data["yatchClaimsExperience1"] =
                            data.yatchClaimsExperience1?.max <= 13 ? data.yatchClaimsExperience1?.min + "-" + data.yatchClaimsExperience1?.max + "Months" : data.yatchClaimsExperience1?.min / 12 + "-" + data.yatchClaimsExperience1?.max / 12 + " years";
                        data["yatchClaimsExperience"] = +data.yatchClaimsExperience == 0 ? "Never" : data["yatchClaimsExperience"] + " Years ago"
                        // if(data.yatchClaimsExperience1)
                        // console.log("yatchClaimsExperience1", data.yatchClaimsExperience1.split(""))
                        // console.log("yatchClaimsExperience", data.yatchClaimsExperience.split(""))
                        sethoemdata(data)
                    }

                })
                .catch((error) => {
                    console.log(error.message);
                });
        } catch (error) {
            console.log(error.message);
        }
    }
    const getTermsANdConditions = async () => {
        await axios
            .get(API_URL + "/api/termsAndCondition?insuranceType=Yatch")
            .then((response) =>
                setTermsAndConditionsdata(response.data.data?.terms_constions)
            )
            .catch((error) => { })
    }
    const HandleHomeSubmitThankYou = async (e) => {
        try {
            e.preventDefault();
            let objData = {
                locationurl: forntendurl + "/" + window.location.pathname.replace("/", "") + window.location.search,
                insuranceType: "Home",
            }
            if (props.travelagreementdata === false) {
                swal({
                    title: "Warning!",
                    text: "Please check the agreement",
                    type: "warning",
                    icon: "warning",
                })
                return;
            }
            else {
                await axios
                    .put(API_URL + `/api/updatePolicyDetails?id=${id}`, objData, {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            // swal({
                            //   title: "Success!",
                            //   text: response.data.message,
                            //   type: "success",
                            //   icon: "success",
                            // })
                            props.handleLogin(e)
                        }
                        else {
                            swal({
                                title: "Error!",
                                text: response.data.message,
                                type: "error",
                                icon: "error",
                            })
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    console.log("yachttooltip", yachttooltip)

    return (
        <>
            {
                Object.keys(hoemdata).length > 0 && (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body thankyoupage">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            <strong>Name</strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="message"
                                                            value={hoemdata?.name}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            <strong>Phone No</strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="message"
                                                            value={hoemdata?.phoneno}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            <strong>Email</strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="message"
                                                            value={hoemdata?.email}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            <strong>Date Of Birth</strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="message"
                                                            value={moment(new Date(hoemdata?.date_of_birth)).format("DD/MM/YYYY")}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>

                                                <>
                                                    <div className="col-md-4">
                                                        <label className="form-label">
                                                            <strong>Yacht Name
                                                            </strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="message"
                                                            value={hoemdata?.boat_details?.boat_name}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Registration No</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="message"
                                                                value={hoemdata?.boat_details?.boat_registration_no}

                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Hull Seriel Number</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_details?.boat_hull_serial_number}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Hull material</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_details?.boat_hull_material}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Breadth of the boat  (In Meter)</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_details?.boat_breath_in_meter}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Length of the boat  (In Meter)</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_details?.boat_length_in_meter}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>No. of Passengers</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_details?.no_of_passengers}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Place of Mooring (Optional)</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_details?.place_of__mooring}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Type Of Use</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_details?.yacht_type_of_use}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Is your boat brand new</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata.bot_brand_new ? "Yes" : "No"}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    {!hoemdata.bot_brand_new && <>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="form-label">
                                                                    <strong>Current Policy Status</strong>
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="registration_year"
                                                                    value={hoemdata?.boat_details?.current_policy_status
                                                                    }
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="form-label">
                                                                    <strong>Are you buying a used vehicle</strong>
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="registration_year"
                                                                    value={hoemdata.buying_used_boat ? "Yes" : "No"}

                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="form-label">
                                                                    <strong>Are you buying a used vehicle</strong>
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="registration_year"
                                                                    value={hoemdata.buying_used_boat ? "Yes" : "No"}

                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        {
                                                            !hoemdata.buying_used_boat && (<div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>Current Insurer</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={hoemdata.insuranceompanyData.length > 0 ? hoemdata.insuranceompanyData.map((item) => (item.company_name)) : "No"}

                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>)
                                                        }
                                                    </>}


                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Model Year</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.model_year
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Yacht Maker</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata.YachtVarientData && hoemdata.YachtVarientData.length > 0 ? hoemdata.YachtVarientData[0]?.name : ""
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Yacht Model</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata.YachtMakerData && hoemdata.YachtMakerData.length > 0 ? hoemdata.YachtMakerData[0]?.name : ""}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                                <>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Engine Serial no</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_engine_details?.engine_seriel_number
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Engine Maker</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_engine_details?.engine_maker

                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Engine Model Year</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_engine_details?.engine_model_year
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Engine Horse power</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_engine_details?.engine_horsepower
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Engine Speed in (knots)</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_engine_details?.engine_speed
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Engine Type</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.boat_engine_details?.engine_type
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>

                                                </>
                                                <>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Sum Insured Dinghy / Tender</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.sumInsured?.sum_insured_dinghy_tender
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Sum Insured Hull & Equipment Value</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.sumInsured?.sum_insured_hull_equipment_value

                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Sum Insured Out Board</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.sumInsured?.sum_insured_out_board
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Sum Insured Personal Effect Including Cash</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.sumInsured?.sum_insured_personal_effect_including_cash
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Sum Insured Traler</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="registration_year"
                                                                value={hoemdata?.sumInsured?.sum_insured_trailer
                                                                }
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>


                                                </>
                                                <>
                                                    {
                                                        hoemdata.territoryCoverage && hoemdata.territoryCoverage.length > 0 ? hoemdata.territoryCoverage.map((item, value) => (
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>{item?.name}</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={item.vlaue ? "Yes" : "No"
                                                                        }
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))
                                                            : <></>
                                                    }
                                                </>
                                                <>

                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Claims Experience </strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="message"
                                                                value={hoemdata?.yatchClaimsExperience}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    {
                                                        hoemdata.yatchClaimsExperienceQuestions && hoemdata.yatchClaimsExperienceQuestions.length > 0 ? hoemdata.yatchClaimsExperienceQuestions.map((item, value) => (
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>{item?.name}</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={item.vlaue ? "Yes" : "No"
                                                                        }
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))
                                                            : <></>
                                                    }
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Operator’s Experience </strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="message"
                                                                value={hoemdata?.yatchClaimsExperience1}

                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    {
                                                        hoemdata.YachtOperaterExperienceQuestions && hoemdata.YachtOperaterExperienceQuestions.length > 0 ? hoemdata.YachtOperaterExperienceQuestions.map((item, value) => (
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>{item?.name}</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={item.vlaue ? "Yes" : "No"
                                                                        }
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))
                                                            : <></>
                                                    }
                                                    {/* <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Have you ever had insurance for any vessel cancelled, declined or renewed at an increased premium </strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="message"
                                                                value={hoemdata.yatchInsurancePremium ? "Yes" : "No"}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div> */}
                                                    {/* <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Sailing Qualification(s) ?  </strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="message"
                                                                value={hoemdata.yatchSailingQualification ? "Yes" : "No"}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">
                                                                <strong>Will professional crew be employed ? </strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="message"
                                                                value={hoemdata.yatchProfessinalEmplaoyed ? "Yes" : "No"}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div> */}
                                                </>

                                                <div>
                                                    <input
                                                        className="checkbox mx-2"
                                                        type="checkbox"
                                                        onChange={(e) => props.setTravelagreementdata(e.target.checked)}
                                                    />
                                                    <strong>Agree with <a className="termscond" onClick={handleShow}>Terms and Conditions</a></strong>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div
                                                        type="submit"
                                                        className="btn-first btn-submit-fill logins"
                                                        style={{ float: "right" }}
                                                        onClick={HandleHomeSubmitThankYou}
                                                    >
                                                        Submit
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <Modal size="md" centered
                aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Yacht T&C</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="paragraph">{
                        TermsAndConditionsdata
                    }</p>

                </Modal.Body>
                <Modal.Footer style={{ padding: '5px 10px' }}>
                    <a className="savechanges" onClick={handleClose}>
                        Ok
                    </a>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default YachtThankYouFormPage