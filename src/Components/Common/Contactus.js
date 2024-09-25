import React, { useState } from 'react'
import axios from 'axios';
import Header from './Header'
import Footer from './Footer'
import { API_URL } from '../..';
import swal from 'sweetalert';
import Contactbanner from '../Banner/Contactbanner'
import Reachusimg from '../../Image/reachus.svg'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Contactus = () => {
    const [formData, setformData] = useState({
        name: "",
        email: "",
        phone_number: "",
        query: "",
    });
    const handleChange = (e) => {
        setformData(() => {
            return { ...formData, [e.target.name]: e.target.value }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(emailRegex.test(formData.email), "email check");
        if (formData.email === "") {
            swal("Warning", "Please enter your Email", "warning");
        }
        else if (!emailRegex.test(formData.email)) {

            swal("Warning", "Please enter a valid Email", "warning");
        }
        else if (formData.query === "") {

            swal("Warning", "Please enter Query", "warning");
        } else {
            await axios
                .post(API_URL + "/api/complaint", formData)
                .then((res) => {
                    {};
                    if (res.status === 200 || 201) {
                        swal("Success", res.data.message, "success");
                    } else {
                        swal("Error", res.data.message, "error");
                    }
                })
                .catch((error) => {
                    if (error.response.status > 399) {
                        swal("Error", error.response.data.message, "error");
                    }
                    ;
                });
        }

    }
    //console.log(":formData", formData);
    return (
        <div>
            <Header />
            <Contactbanner />
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7221.000145597894!2d55.26042!3d25.186353!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433ad156a6d9%3A0xe36847b4ae25dd04!2sJoie%20de%20Vivre%20International%20Insurance%20Brokerage%20LLC!5e0!3m2!1sen!2sus!4v1692541163817!5m2!1sen!2sus"
                width={'100%'}
                height={450}
                style={{ border: 0, marginTop: '20px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
            <section className="contact-page-sec mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="contact-info">
                                <div className="contact-info-item">
                                    <div className="contact-info-icon">
                                        <i className="fa fa-map-marker" />
                                    </div>
                                    <div className="contact-info-text">
                                        <h2>Address</h2>
                                        <span>Office 506,507, The Exchange Tower,<br />
                                            Al Saada St. Business Bay <br />(Opp. to JW Marriott marquis)<br />
                                            P.O. Box 48795
                                            Dubai, UNITED ARAB EMIRATES
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contact-info">
                                <div className="contact-info-item">
                                    <div className="contact-info-icon">
                                        <i className="fa fa-envelope" />
                                    </div>
                                    <div className="contact-info-text">
                                        <h2>E-mail</h2>
                                        <span>info@lastminutepolicy.com</span>
                                        <span>contact@lastminutepolicy.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="contact-info">
                                <div className="contact-info-item">
                                    <div className="contact-info-icon">
                                        <i className="fa fa-clock-o" />
                                    </div>
                                    <div className="contact-info-text">
                                        <h2>Office Time</h2>
                                        <span>Mon - Thu 9:00 am - 4.00 pm</span>
                                        <span>Thu - Mon 10.00 pm - 5.00 pm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="reachus">
                <h3 className='text-center' data-aos="zoom-in">Get In Touch</h3>
                <div className="container">
                    <div className="row" style={{ alignItems: 'center' }}>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="row" style={{ alignItems: "center" }}>
                                <div
                                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12"
                                    data-aos="fade-right"
                                    data-aos-duration="1000"
                                >
                                    <p>
                                        Call us today, leave a message, email or find your nearest
                                        office below and We are here for you 24 hours , 7 days a
                                        week.
                                    </p>
                                    <h2>We are here for you 24 hours a day, 7 days a week</h2>
                                    <img className="Reachusimg" src={Reachusimg} alt="" />
                                </div>
                                <div
                                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12"
                                    data-aos="fade-left"
                                    data-aos-duration="2000"
                                >
                                    <div className="reachus_contact">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                        <input
                                            placeholder="Enter Name"
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="reachus_contact">
                                        <i className="fa fa-phone" aria-hidden="true"></i>
                                        <input
                                            placeholder="Enter Phone"
                                            name="phone_number"
                                            type="text"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="reachus_contact">
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                        <input
                                            placeholder="Enter Email"
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="reachus_contact">
                                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                                        <textarea style={{ background: 'transparent', border: 'none' }}
                                            placeholder="Enter Query"
                                            name="query"
                                            type="text"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button className="submit_query">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Contactus
