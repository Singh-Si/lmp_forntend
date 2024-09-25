import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Doctor from '../../Image/Doctor.svg'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { API_URL } from '../..';

const Testimonials = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 2
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        getTestimonials();
    }, [])

    const [testimonialData, setTestimonialData] = useState([]);

    const getTestimonials = async () => {
        try {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            await fetch(API_URL+'/api/allTestimonials', requestOptions)
                .then(response => response.json())
                .then(result => {
                    setTestimonialData(result.data);
                    //console.log(result.data);
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            ;
        }
    }

    console.log(testimonialData)


    return (
        <>
            {testimonialData.length > 0 ? (
                <Container fluid className='testimonials_all'>
                    <Container className='testimonials'>
                        <div className="section-header">
                            <div className="section-heading">
                                <h3 className="text-custom-black fw-700 our_partners">Our Testimonials</h3>

                            </div>
                        </div>
                        <Carousel responsive={responsive}>
                            {testimonialData.map((item, index) => (
                                <div key={index} className="item">
                                    <div className="testimonial-block">
                                        <div className="inner-box">
                                            <div className="content-box">
                                                <span className="border-one-testimonail" />
                                                <div className="thumb" >
                                                    <img src={`${API_URL}/testimonials/${item.image[0]?.filename}`} alt="" />
                                                </div>
                                                <div className="info-box">
                                                    <span className="icon-quote" />
                                                    <h4 className="name">{item.name}</h4>
                                                    <span className="designation">{item.designation}</span>
                                                </div>
                                                <div className="text">{item.description}</div>
                                                <div className='rating'>
                                                    {[...Array(5)].map((_, i) => {
                                                        const starValue = i + 0.5;
                                                        return (
                                                            <i
                                                                key={i}
                                                                className={`fa ${item.rating >= starValue
                                                                    ? 'fa-star'
                                                                    : item.rating >= i
                                                                        ? 'fa-star-half'
                                                                        : 'fa-star-o'
                                                                    }`}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </Container>

                </Container>
            ) : ("")
            }
        </>
    )
}

export default Testimonials