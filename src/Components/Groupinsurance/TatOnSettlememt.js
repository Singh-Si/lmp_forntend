import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import GroupSidebar from "./GroupSidebar";
import { API_URL } from "../..";
import { CChartDoughnut } from "@coreui/react-chartjs";
import { Chart } from 'chart.js';
import GroupmedicalAlert from "./GroupmedicalAlert";


const TatOnSettlememt = () => {


    const [tatwithin, setTatwithin] = useState([]);
    const [tatbeyond, setTatbeyond] = useState([]);

    useEffect(() => {
        getTatOnSettlememt();
    }, []);


    const getTatOnSettlememt = async () => {
        try {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
                },
            };
            await fetch(`${API_URL}/api/tatOnSettlement`, requestOptions)
                .then((response) => response.json())
                .then((response) => {
                    setTatwithin(response.tatPercentage);
                    setTatbeyond(response.beyounTatPercentage);
                });
        } catch (error) {
            console.log(error);
        }
    };

    console.log("tatwithin", tatwithin);
    console.log("tatbeyond", tatbeyond);

    let tatwithinData = {
        labels: [],
        datasets: [],
    };

    tatwithinData = {
        labels: ["Within TAT", ""],
        datasets: [
            {
                label: "Settled Within TAT",
                data: [tatwithin, 100 - tatwithin],
                backgroundColor: ["#0D2F92", "#ffff"],
                hoverBackgroundColor: ["#0D2F92", "#ffff"],
            },
        ],
       
    };

    let tatbeyondData = {
        labels: [],
        datasets: [],
    };

    tatbeyondData = {
        labels: ["Beyond TAT", ""],
        datasets: [
            {
                label: "Settled Beyond TAT",
                data: [tatbeyond, 100 - tatbeyond],
                backgroundColor: ["#0D2F92", "#fff"],
                hoverBackgroundColor: ["#0D2F92", "#fff"],
            },
        ],
    };

    const widths = ['400px', '100px'];

    console.log("tatwithinData", tatwithin);
    console.log("tatbeyondData", tatbeyond);

    // useEffect(() => {
    //     // Register custom plugin to draw text inside the gap
    //     Chart.register({
    //         id: 'custom-plugin',
    //         afterDraw: chart => {
    //             const { ctx, width, height } = chart;
    //             let text = '';
    //             if (chart.config.data.labels.includes('Within TAT')) {
    //                 text = 'Completed: ' + +tatwithin + '%'; // Display data for Settled Within TAT
    //             } else if (chart.config.data.labels.includes('Beyond TAT')) {
    //                 text = 'Completed: ' + tatbeyond + '%'; // Display data for Settled Beyond TAT
    //             }
    
    //             // Draw text in the center of the canvas
    //             ctx.save();
    //             ctx.fillStyle = '#000'; // Adjust color as needed
    //             ctx.textAlign = 'center';
    //             ctx.textBaseline = 'middle';
    //             ctx.font = '16px Arial'; // Adjust font size and style as needed
    //             ctx.fillText(text, width / 2, height / 2);
    //             ctx.restore();
    //         }
    //     });
    // }, [tatwithin, tatbeyond]);
    
    

    return (
        <div>
            <Header />
            <GroupMedical />
            <Row className="groupback">
                <Container fluid className="group-medicalss mt-5">
                    <Row
                        style={{ justifyContent: "space-between", alignItems: "center" }}
                    >
                        <Col lg={12}>
                            <Row>
                                <Col lg="3">
                                    <div className="sidebar">
                                        <GroupSidebar />
                                    </div>
                                </Col>
                                <Col lg="9">
                                    <div
                                        className="row"
                                        style={{
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div className="col-lg-5 mb-4">
                                            <div className="member">
                                                <h4>Settled Within TAT</h4>
                                              
                                                    <CChartDoughnut
                                                        data={tatwithinData}
                                                        options={{
                                                            // cutout: '60%',
                                                            // radius: '90%',
                                                            plugins: {
                                                                legend: {
                                                                    display: true,
                                                                    labels: {
                                                                        generateLabels: function (chart) {
                                                                            const data = chart.data;
                                                                            if (data.labels.length && data.datasets.length) {
                                                                                return data?.labels?.map(function (label, index) {
                                                                                    const value = data.datasets[0].data[index];
                                                                                    const percentage = (value !== undefined && value !== null && value !== '') ? (+value)?.toFixed(2) + '%' : '0%';
                                                                                    return {
                                                                                        text: `${label}: ${percentage}`,
                                                                                        fillStyle: data.datasets[0].backgroundColor[index]
                                                                                    };
                                                                                });
                                                                            }
                                                                            return [];
                                                                        }
                                                                    }
                                                                },
                                                                tooltip: {
                                                                    callbacks: {
                                                                        label: function (context) {
                                                                            const value = context?.formattedValue;
                                                                            const returnvalue = (value !== undefined && value !== null && value !== '') ? (+value)?.toFixed(2) + '%' : '0%'; // Adding percentage sign
                                                                            return returnvalue;
                                                                        }
                                                                    }

                                                                },
                                                                elements: {
                                                                    arc: {
                                                                        borderWidth: 0 // Remove border to show data in the gap
                                                                    }

                                                                }
                                                            }

                                                        }}
                                                        style={{ width: widths }}
                                                    />
                                                
                                            </div>
                                        </div>
                                        <div className="col-lg-5 mb-4">
                                            <div className="member">
                                                <h4>Settled Beyond TAT</h4>
                                                <CChartDoughnut
                                                        data={tatbeyondData}
                                                        options={{
                                                            // cutout: '60%',
                                                            plugins: {
                                                                legend: {
                                                                    display: true,
                                                                    labels: {
                                                                        generateLabels: function (chart) {
                                                                            const data = chart.data;
                                                                            if (data.labels.length && data.datasets.length) {
                                                                                return data?.labels?.map(function (label, index) {
                                                                                    const value = data.datasets[0].data[index];
                                                                                    const percentage = (value !== undefined && value !== null && value !== '') ? (+value)?.toFixed(2) + '%' : '0%';
                                                                                    return {
                                                                                        text: `${label}: ${percentage}`,
                                                                                        fillStyle: data.datasets[0].backgroundColor[index]
                                                                                    };
                                                                                });
                                                                            }
                                                                            return [];
                                                                        }
                                                                    }
                                                                },
                                                                tooltip: {
                                                                    callbacks: {
                                                                        label: function (context) {
                                                                            const value = context?.formattedValue;
                                                                            const returnvalue = (value !== undefined && value !== null && value !== '') ? (+value)?.toFixed(2) + '%' : '0%'; // Adding percentage sign
                                                                            return returnvalue;
                                                                        }
                                                                    }

                                                                },
                                                                elements: {
                                                                    arc: {
                                                                        borderWidth: 0 // Remove border to show data in the gap
                                                                    }

                                                                }
                                                            }

                                                        }}
                                                        style={{ width: widths,borderColor: 'black'}}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <GroupmedicalAlert />
            </Row>
            <Footer />
        </div>
    );
};

export default TatOnSettlememt;
