import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import GroupSidebar from "./GroupSidebar";
import { API_URL } from "../..";
import { CChart, CChartDoughnut } from "@coreui/react-chartjs";
import GroupmedicalAlert from "./GroupmedicalAlert";

const GroupClaimsSummary = () => {

  const [pendingdata, setPendingData] = useState([]);
  const [partiallydata, setPartiallyData] = useState([]);
  const [totaldata, setTotalData] = useState([]);
  const [declineddata, setDeclinedData] = useState([]);
  const [fullysettleddata, setFullySettledData] = useState([]);


  useEffect(() => {
    getPending();
    getPartially();
    getTotals();
    getDeclined();
    getFullysettled();
  }, []);

  const getPending = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
        },
      };
      await fetch(`${API_URL}/api/getClaimStatusSummary?type=Pending`, requestOptions)
        .then(response => response.json())
        .then(
          data => {
            setPendingData(data.data)
          }
        );
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const getPartially = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
        },
      };
      await fetch(`${API_URL}/api/getClaimStatusSummary?type=Partially`, requestOptions)
        .then(response => response.json())
        .then(
          data => {
            setPartiallyData(data.data)

          }
        );
    }
    catch (err) {
      console.error(err.message);
    }
  }



  const getTotals = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
        },
      };
      await fetch(`${API_URL}/api/getClaimStatusSummary?type=Total`, requestOptions)
        .then(response => response.json())
        .then(
          data => {
            const list = data.data;
            setTotalData(data.data)
          }
        );
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const getDeclined = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
        },
      };
      await fetch(`${API_URL}/api/getClaimStatusSummary?type=Declined`, requestOptions)
        .then(response => response.json())
        .then(
          data => {
            const list = data.data;
            setDeclinedData(data.data)
          }
        );
    }
    catch (err) {
      console.error(err.message);
    }
  }

  const getFullysettled = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
        },
      };
      await fetch(`${API_URL}/api/getClaimStatusSummary?type=fullySettled`, requestOptions)
        .then(response => response.json())
        .then(
          data => {
            const list = data.data;
            setFullySettledData(data.data)
          }
        );
    }
    catch (err) {
      console.error(err.message);
    }
  }


  let pendingData = {
    labels: [],
    datasets: [],
  };

  pendingData = {
    labels: ['Pending', ''],
    datasets: [
      {
        backgroundColor: ['#5397DF', '#002D67'],
        hoverBackgroundColor: ['#5397DF', '#002D67'],
        data: [pendingdata.percentage, 100 - pendingdata.percentage],
        hoverOffset: 4
      }
    ]
  };

  let partiallyData = {
    labels: [],
    datasets: [],
  };

  partiallyData = {
    labels: ['Partially Settled', ''],
    datasets: [
      {
        backgroundColor: ['#5397DF', '#002D67'],
        hoverBackgroundColor: ['#5397DF', '#002D67'],
        data: [partiallydata.percentage, 100 - partiallydata.percentage],
        hoverOffset: 4
      }
    ]
  };

  let totalData = {
    labels: [],
    datasets: [],
  };

  totalData = {
    labels: ['Total', ''],
    datasets: [
      {
        backgroundColor: ['#5397DF', '#002D67'],
        hoverBackgroundColor: ['#5397DF', '#002D67'],
        data: [totaldata.percentage, 100 - totaldata.percentage],
        hoverOffset: 6
      }
    ]
  };

  let declinedData = {
    labels: [],
    datasets: [],
  };

  declinedData = {
    labels: ['Declined', ''],
    datasets: [
      {
        backgroundColor: ['#5397DF', '#002D67'],
        hoverBackgroundColor: ['#5397DF', '#002D67'],
        data: [declineddata.percentage, 100 - declineddata.percentage],
        hoverOffset: 6
      }
    ]
  };

  let fullySettledData = {
    labels: [],
    datasets: [],
  };

  fullySettledData = {
    labels: ['Fully Settled', ''],
    datasets: [
      {
        backgroundColor: ['#5397DF', '#002D67'],
        hoverBackgroundColor: ['#5397DF', '#002D67'],
        data: [fullysettleddata.percentage, 100 - fullysettleddata.percentage],
        hoverOffset: 6
      }
    ]
  };



  const widths = ['400px', '100px'];





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
                        <h4>Pending</h4>
                        <div
                          className="row mt-4"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Total</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={pendingdata.totalCount}
                              readOnly
                            />
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Amount Claimed</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={pendingdata.cliamAmount}
                              readOnly
                            />
                          </div>
                          {/* <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Paid Amount</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={pendingdata.paidAmount}
                              readOnly
                            />
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 mb-4">
                      <div className="member">
                        <h4>Summary Pending</h4>
                        <div className="col-lg-7" style={{ marginLeft: '120px' }}>
                          {/* <CChartDoughnut
                            data={pendingData}
                            options={{
                              plugins: {
                                tooltip: {
                                  callbacks: {
                                    label: function (context) {
                                      let label = context.label || '';
                                      if (label) {
                                        label += ': ';
                                      }
                                      const value = context.formattedValue || '';
                                      label += value + '%'; // Adding percentage sign
                                      return label;
                                    }
                                  }
                                }
                              }
                            }}
                            style={{ width: widths }}
                          /> */}

                          <CChartDoughnut
                            data={pendingData}
                            options={{
                              plugins: {
                                legend: {
                                  display: true,
                                  labels: {
                                    generateLabels: function (chart) {
                                      const data = chart.data;
                                      if (data.labels.length && data.datasets.length) {
                                        return data?.labels?.map(function (label, index) {
                                          const value = data.datasets[0].data[index];
                                          const percentage = (value !== undefined && value !== null && value !== '')  ? (value)?.toFixed(2) + '%' : '0%';
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
                                      // let label = context.label || '';
                                      // if (label) {
                                      //   label += ': ';
                                      // }
                                      const value = context?.formattedValue;
                                      const returnvalue = (value !== undefined && value !== null && value !== '') ? (+value)?.toFixed(2) + '%' : '0%'; // Adding percentage sign
                                      return returnvalue;
                                    }
                                  }

                                }
                              }

                            }}
                            style={{ width: widths }}
                          />

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 mb-4">
                      <div className="member">
                        <h4>Partially Settled</h4>
                        <div
                          className="row mt-4"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Total</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={partiallydata.totalCount}
                              readOnly
                            />
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Amount Claimed</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={partiallydata.cliamAmount}
                              readOnly
                            />
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Paid Amount</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={partiallydata.paidAmount}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 mb-4">
                      <div className="member">
                        <h4>Summary Partially Settled</h4>
                        <div className="col-lg-7" style={{ marginLeft: '120px' }}>
                          {/* <CChartDoughnut
                            data={partiallyData}
                          /> */}
                          <CChartDoughnut
                            data={partiallyData}
                            options={{
                              plugins: {
                                legend: {
                                  display: true,
                                  labels: {
                                    generateLabels: function (chart) {
                                      const data = chart.data;
                                      if (data.labels.length && data.datasets.length) {
                                        return data?.labels?.map(function (label, index) {
                                          const value = data.datasets[0].data[index];
                                          const percentage = (value !== undefined && value !== null && value !== '') ? (value)?.toFixed(2) + '%' : '0%';
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
                                      // let label = context.label || '';
                                      // if (label) {
                                      //   label += ': ';
                                      // }
                                      const value = context?.formattedValue;
                                      const returnvalue = (value !== undefined && value !== null && value !== '') ? (+value)?.toFixed(2) + '%' : '0%'; // Adding percentage sign
                                      return returnvalue;
                                    }
                                  }

                                }
                              }

                            }}
                            style={{ width: widths }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 mb-4">
                      <div className="member">
                        <h4>Fully Settled</h4>
                        <div
                          className="row mt-4"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Total</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={fullysettleddata.totalCount}
                              readOnly
                            />
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Amount Claimed</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={fullysettleddata.cliamAmount}
                              readOnly
                            />
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Paid Amount</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={fullysettleddata.paidAmount}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 mb-4">
                      <div className="member">
                        <h4>Summary Fully Settled</h4>
                        <div className="col-lg-7" style={{ marginLeft: '120px' }}>
                          {/* <CChartDoughnut
                            data={totalData}
                          /> */}
                          <CChartDoughnut
                            data={fullySettledData}
                            options={{
                              plugins: {
                                legend: {
                                  display: true,
                                  labels: {
                                    generateLabels: function (chart) {
                                      const data = chart.data;
                                      if (data.labels.length && data.datasets.length) {
                                        return data?.labels?.map(function (label, index) {
                                          const value = data.datasets[0].data[index];
                                          const percentage = (value !== undefined && value !== null && value !== '') ? (value)?.toFixed(2) + '%' : '0%';
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
                                      // let label = context.label || '';
                                      // if (label) {
                                      //   label += ': ';
                                      // }
                                      const value = context?.formattedValue;
                                      const returnvalue = (value !== undefined && value !== null && value !== '') ? (+value)?.toFixed(2) + '%' : '0%'; // Adding percentage sign
                                      return returnvalue;
                                    }
                                  }

                                }
                              }

                            }}
                            style={{ width: widths }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 mb-4">
                      <div className="member">
                        <h4>Declined</h4>
                        <div
                          className="row mt-4"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Declined</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={declineddata.totalCount}
                              readOnly
                            />
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Amount Claimed</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={declineddata.cliamAmount}
                              readOnly
                            />
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Paid Amount</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={declineddata.paidAmount}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 mb-4">
                      <div className="member">
                        <h4>Summary Declined</h4>
                        <div className="col-lg-7" style={{ marginLeft: '120px' }}>
                          {/* <CChartDoughnut
                            data={totalData}
                          /> */}
                          <CChartDoughnut
                            data={declinedData}
                            options={{
                              plugins: {
                                legend: {
                                  display: true,
                                  labels: {
                                    generateLabels: function (chart) {
                                      const data = chart.data;
                                      if (data.labels.length && data.datasets.length) {
                                        return data?.labels?.map(function (label, index) {
                                          const value = data.datasets[0].data[index];
                                          const percentage = (value !== undefined && value !== null && value !== '') ? (value)?.toFixed(2) + '%' : '0%';
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
                                      // let label = context.label || '';
                                      // if (label) {
                                      //   label += ': ';
                                      // }
                                      const value = context?.formattedValue;
                                      const returnvalue = (value !== undefined && value !== null && value !== '') ? (+value)?.toFixed(2) + '%' : '0%'; // Adding percentage sign
                                      return returnvalue;
                                    }
                                  }

                                }
                              }

                            }}
                            style={{ width: widths }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 mb-4">
                      <div className="member">
                        <h4>Total</h4>
                        <div
                          className="row mt-4"
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Total</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={totaldata.totalCount}
                              readOnly
                            />
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Amount Claimed</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={totaldata.cliamAmount}
                              readOnly
                            />
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <label>Paid Amount</label>
                          </div>
                          <div
                            className="col-lg-5"
                            style={{ marginBottom: "15px" }}
                          >
                            <input
                              className="form-control"
                              placeholder="Total Count"
                              style={{ height: "45px" }}
                              value={totaldata.paidAmount}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 mb-4">
                      <div className="member">
                        <h4>Summary Total</h4>
                        <div className="col-lg-7" style={{ marginLeft: '120px' }}>
                          {/* <CChartDoughnut
                            data={totalData}
                          /> */}
                          <CChartDoughnut
                            data={totalData}
                            options={{
                              plugins: {
                                legend: {
                                  display: true,
                                  labels: {
                                    generateLabels: function (chart) {
                                      const data = chart.data;
                                      if (data.labels.length && data.datasets.length) {
                                        return data?.labels?.map(function (label, index) {
                                          const value = data.datasets[0].data[index];
                                          const percentage = (value !== undefined && value !== null && value !== '') ? (value)?.toFixed(2) + '%' : '0%';
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
                                      // let label = context.label || '';
                                      // if (label) {
                                      //   label += ': ';
                                      // }
                                      const value = context?.formattedValue;
                                      const returnvalue = (value !== undefined && value !== null && value !== '') ? (+value)?.toFixed(2) + '%' : '0%'; // Adding percentage sign
                                      return returnvalue;
                                    }
                                  }

                                }
                              }

                            }}
                            style={{ width: widths }}
                          />
                        </div>
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

export default GroupClaimsSummary;
