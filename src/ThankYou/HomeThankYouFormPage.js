import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL, forntendurl } from '..'
import swal from 'sweetalert'
import moment from 'moment'
import { Modal } from "react-bootstrap";
const HomeThankYouFormPage = (props) => {
   
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
    const getTermsANdConditions = async () => {
        await axios
            .get(API_URL + "/api/termsAndCondition?insuranceType=Home")
            .then((response) =>
                setTermsAndConditionsdata(response.data.data?.terms_constions)
            )
            .catch((error) => { })
    }
    const getdetailbyid = async () => {
        try {
            await axios
                .get(API_URL + "/api/getHomeNewLeadDetails?leadId=" + id,
                )
                .then((response) => {
                    sethoemdata(response.data.data ? response.data.data[0] : {})
                    console.log("response", response)
                })
                .catch((error) => {
                    console.log(error.message);
                });
        } catch (error) {
            console.log(error.message);
        }
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

                            props?.handleLogin(e)
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
    console.log("hoemdata>>>>", hoemdata)
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
                                                            name="registration_year"
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
                                                            value={hoemdata.phoneno}
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
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            <strong>Nationality</strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="message"
                                                            value={hoemdata?.nationality}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label">
                                                        <strong>Property Type</strong>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        name="Name"
                                                        type="text"
                                                        value={hoemdata?.homePropertyDetails[0]?.home_property_type}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label">
                                                        <strong>Ownership Status</strong>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        name="number"
                                                        type="text"
                                                        value={hoemdata?.home_ownershipDetails[0]?.home_owner_type}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label">
                                                        <strong>Plan Type</strong>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="email"
                                                        value={hoemdata?.PlanTypeDetails[0]?.home_plan_type}
                                                        readOnly
                                                    />
                                                </div>
                                                {hoemdata.home_plan_type === "642279d4fb67d39380fef82d" || hoemdata.home_plan_type === "64227a65fb67d39380fef842" ?
                                                    <>
                                                        <div className="col-md-4">
                                                            <label className="form-label">
                                                                <strong>Building Value</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="email"
                                                                value={hoemdata?.building_value}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </>
                                                    : null
                                                }

                                                {hoemdata.home_plan_type === "642279f2fb67d39380fef834" || hoemdata.home_plan_type === "64227a65fb67d39380fef842" ?
                                                    <>
                                                        <div className="col-md-4">
                                                            <label className="form-label">
                                                                <strong>Content Value</strong>
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                name="email"
                                                                value={hoemdata?.content_value}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </>
                                                    : null
                                                }
                                                {hoemdata.home_plan_type === "642279f2fb67d39380fef834" || hoemdata.home_plan_type === "64227a65fb67d39380fef842" ?

                                                    <div className="col-md-4">
                                                        <label className="form-label">
                                                            <strong>Personal belonging Value</strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="email"
                                                            value={hoemdata?.personal_belongings_value}
                                                            readOnly
                                                        />
                                                    </div>
                                                    : null
                                                }

                                                <div className="col-md-4">
                                                    <label className="form-label">
                                                        <strong>Do you have any Claims in last 5 years ?
                                                        </strong>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="message"
                                                        value={hoemdata?.last_year_claim}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">
                                                            <strong>Domestic Helper</strong>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="message"
                                                            value={hoemdata?.domestic_value}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>




                                                <>

                                                    {
                                                        Object.keys(hoemdata.homeAddress).length > 0 &&
                                                        <>


                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>Flat / Villa No.</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={hoemdata.homeAddress?.flatvillano}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>Building Name</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={hoemdata.homeAddress?.buildingname}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>Street# / Name</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={hoemdata.homeAddress?.streetname}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>Area</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={hoemdata.homeAddress?.area}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>Emirate</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={hoemdata.homeAddress?.emirate}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>P.O. Box</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={hoemdata.homeAddress?.pobox}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        <strong>Makani #</strong>
                                                                    </label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="registration_year"
                                                                        value={hoemdata.homeAddress?.makani}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>

                                                        </>
                                                    }
                                                </>
                                                <>
                                                    {
                                                        hoemdata.home_condition && hoemdata.home_condition.length > 0 ? hoemdata.home_condition.map((item, value) => (
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
                                                        )) : <></>
                                                    }
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
                    <Modal.Title>Home T&C</Modal.Title>
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
export default HomeThankYouFormPage