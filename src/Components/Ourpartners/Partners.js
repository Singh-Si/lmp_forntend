import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import OwlCarousel from "react-owl-carousel";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import admin from "../../config";
import axios from 'axios';
import swal from 'sweetalert';
import { API_URL } from "../..";
const state = {
    responsive: {
        0: {
            items: 2,
        },
        450: {
            items: 2,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 6,
        },
    },
};
const Partners = () => {
    const [show, setShow] = useState(false);
    const [key, setKey] = useState("home");
    const [bannerImage, setBannerImage] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [amratingData, setAMRatings] = useState([])
    const [spratings, setSPRatings] = useState([])

    useEffect(() => {
        getAll_AM_Ratings();
        getAll_SP_Ratings();
    }, [])

    const getAll_AM_Ratings = () => {

        try {
            axios.get(`${API_URL}/api/getAllamRatings`)

                .then((data) => {
                    if (data.status == 200) {
                        setAMRatings(data.data.data)

                    } else {
                        swal({
                            title: 'Error!',
                            text: data.message,
                            type: 'error',
                            icon: 'error',
                        }).then(function () {
                        })
                    }
                })

        } catch (error) {
            //console.log(error.message)
        }
    }
    const getAll_SP_Ratings = () => {

        try {
            axios.get(`${API_URL}/api/getAllspRatings`)
                // .then((res) => res.json())
                .then((data) => {
                    if (data.status == 200) {

                        setSPRatings(data.data.data)
                    } else {
                        swal({
                            title: 'Error!',
                            text: data.message,
                            type: 'error',
                            icon: 'error',
                        }).then(function () {
                        })
                    }
                })

        } catch (error) {
            //console.log(error.message)
        }
    }
    const IMAGE_URL = API_URL+"/uploads";

    const fetchData = async () => {
        await fetch(`${admin}/banerImages?limit=20&page=1`)
            .then((res) => res.json())
            .then((res) => setBannerImage(res.data))
            .catch((err) => {});
    };

    useEffect(() => {
        fetchData();
    }, []);

    const rating = (val) => {
        let decimal = val % 1;

        for (let i = 0; i < val; i++) {
            <i className="fa fa-star" />;
        }
        if (decimal > 0 && decimal < 1) {
            //console.log("adha star");
        }
    };

    //console.log(rating(4.5));

    return (
        <React.Fragment>
            <Container fluid className="partners_all">
                <Container className="partners">
                    <div className="section-header">
                        <div className="section-heading">
                            <h3 className="text-custom-black fw-700 our_partners">
                                Our Partners
                            </h3>
                        </div>
                    </div>
                    <OwlCarousel
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        className="mt-5 partners_img"
                        margin={30}
                        autoplay
                        nav={true}
                        dots={false}
                        items={2}
                        touchDrag={true}
                        lazyLoad={true}
                        responsive={state.responsive}
                    >
                        {bannerImage &&
                            bannerImage.map((val) => (
                                <div className="item" key={val._id}>
                                    <img
                                        src={`${IMAGE_URL}/${val.image[0]}`}
                                        className="partners_abcd"
                                        alt="review"
                                    />
                                    <a onClick={handleShow}>
                                        <div className="rating">
                                            {val.rating > 0 ? (
                                                <>
                                                    {[...Array(Math.floor(val.rating))].map((_, ind) => (
                                                        <i key={ind} className="fa fa-star" />
                                                    ))}
                                                    {val.rating % 1 !== 0 ? (
                                                        <i className="fa fa-star-half" />
                                                    ) : null}
                                                    {[...Array(5 - Math.ceil(val.rating))].map(
                                                        (_, ind) => (
                                                            <i key={ind} className="fa fa-star-o" />
                                                        )
                                                    )}
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </a>
                                </div>
                            ))}
                    </OwlCarousel>
                </Container>
                <Modal size="xl" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Insurance Company's Financial Rating</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="AM Best Rating">
                                <div className="rating-table">
                                    <p className="subHeadTxt">
                                        AM Best is a global rating agency that rank insurance companies based on
                                        their financial strength and stability. Before you buy, check out the
                                        insurance company’s financial rating
                                    </p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Rating Category</th>
                                                <th>Rating Symbol</th>
                                                <th>Definition</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {amratingData.length > 0 ? amratingData.map((v, i) => {
                                                return (
                                                    <tr key={v._id}>
                                                        <td>{v.ratingCategory}</td>
                                                        <td>{v.ratingSymbol}</td>
                                                        <td>{v.ratingDefinition}</td>
                                                    </tr>
                                                )

                                            }) : <tr></tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </Tab>
                            <Tab eventKey="profile" title="S&P Rating">
                                <div className="rating-table">
                                    <p className="subHeadTxt">
                                        AM Best is a global rating agency that rank insurance companies based on
                                        their financial strength and stability. Before you buy, check out the
                                        insurance company’s financial rating
                                    </p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Rating Symbol</th>
                                                <th>Definition</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {spratings.length > 0 ? spratings.map((v, i) => {
                                                return (
                                                    <tr key={v._id}>
                                                        <td>{v.ratingSymbol}</td>
                                                        <td>{v.ratingDefinition}</td>
                                                    </tr>
                                                )

                                            }) : <tr></tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </Tab>
                        </Tabs>
                    </Modal.Body>
                </Modal>
            </Container>
        </React.Fragment>
    );
};

export default Partners;