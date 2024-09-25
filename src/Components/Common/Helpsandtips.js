import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Helpandtipsbanner from '../Banner/Helpandtipsbanner'
import { Col, Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { API_URL } from '../..';
const Helpsandtips = () => {

    const [data, setData] = useState([])
    const [faqdata, setFaqdata] = useState([])
    useEffect(() => {
        gethelptipCmsdata();
        getfaqCmsdata();
    }, [])

    const gethelptipCmsdata = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
            await fetch(`${API_URL}/api/gethelptipsContent`, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    //console.log("data", data)
                    if (data.status === 200) {
                        console.log("data", data.data)
                        setData(data.data)
                    }
                })

        } catch (error) {
            console.log("error", error)
        }
    }

    console.log(data)

    const getfaqCmsdata = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
            await fetch(`${API_URL}/api/getfaqContent`, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    //console.log("data", data)
                    if (data.status === 200) {
                        console.log("data", data.data)
                        setFaqdata(data.data)
                    }
                })
            } catch (error) {
                console.log("error", error)
            }
        }

    return (
        <div>
            <Header />
            <Helpandtipsbanner />
            <h1 className='text-center mt-5'>Helps and Tips</h1>
            <Container className='mt-5 mb-5 helpsandtips'>
                {/* <Row style={{ justifyContent: 'center' }}>
                    <Col xs={12} md={8}> */}
                <Accordion className='faqacc' defaultActiveKey="0" flush>
                    {data?.map((item, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>{`${index + 1}. ${item?.helptipQuestion}`}</Accordion.Header>
                            <Accordion.Body>
                                {item?.helptipContent}
                            </Accordion.Body>
                        </Accordion.Item>

                    ))}
                </Accordion>
            </Container >
            <h1 className='text-center mt-5'>FAQ</h1>
            <Container className='mt-5 mb-5 helpsandtips'>
                <Accordion className='faqacc' defaultActiveKey="0" flush>
                    {faqdata?.map((item, index) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>{`${index + 1}. ${item?.faqQuestion}`}</Accordion.Header>
                        <Accordion.Body>
                                {item?.faqContent}
                        </Accordion.Body>
                    </Accordion.Item>
                    ))}
                    {/* <Accordion.Item eventKey="1">
                        <Accordion.Header>2. Lorem ipsum dolor sit?</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>3. Lorem ipsum dolor sit?</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>4. Lorem ipsum dolor sit?</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>5. Lorem ipsum dolor sit?</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </Accordion.Body>
                    </Accordion.Item> */}
                </Accordion>
            </Container >
            <Footer />
        </div >
    )
}

export default Helpsandtips