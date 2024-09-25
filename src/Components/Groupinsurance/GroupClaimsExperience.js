import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import GroupSidebar from "./GroupSidebar";
import { API_URL } from "../..";
import ReactPaginate from "react-paginate";
import { CSpinner } from "@coreui/react";
import { CChartDoughnut } from "@coreui/react-chartjs";
import GroupmedicalAlert from "../Groupinsurance/GroupmedicalAlert";


const GroupClaimsExperience = () => {
  const Navigate = useNavigate()
  const [data, setData] = useState([]);
  const [limit] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false)
  const [tatwithin, setTatwithin] = useState([]);


  useEffect(() => {
    getGroupClaimsExperience(page, limit);
    getTatOnSettlememt();

  }, []);

  const getGroupClaimsExperience = async (page, limit) => {
    try {
      setLoader(true)
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
        },

      };
      await fetch(`${API_URL}/api/getClaimFromHr?claimType=experience&limit=${limit}&page=${page}`, requestOptions)
        .then(response => response.json())
        .then(
          data => {
            const total = data.total;
            const slice = total / limit;
            const pages = Math.ceil(slice);
            setPageCount(pages);
            const list = data.data;
            setData(list)
            console.log(list.map((val) => val.memberData));
            setLoader(false)
          }
        );
    } catch (err) {
      console.error(err.message);
      setLoader(false)
    }
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage + 1);
    getGroupClaimsExperience(selectedPage + 1, limit);
  };

  const formatedate = (date) => {
    const d = date?.split("T")[0];
    const finaldate = d?.split("-").reverse().join("/");
    return finaldate;
  }



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
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("tatwithin", tatwithin);

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
        backgroundColor: ["#0D2F92", "#fff"],
        hoverBackgroundColor: ["#0D2F92", "#fff"],
      },
    ],

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
                {loader && (
                  <div className="loader-overlay" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
                    <div className="loader">
                      <CSpinner color="danger" size="lg" />
                    </div>
                  </div>
                )}
                <Col lg="9">
                  <table className="groupmedi table table-striped table-bordered table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: '200px' }}>Beneficiary</th>
                        <th>Date</th>-
                        <th>Claim Type</th>
                        <th>Provider</th>
                        <th>FOB</th>
                        <th>Payershare</th>

                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr>
                          <td>{`${item?.memberData?.firstName} ${item?.memberData?.middleName} ${item?.memberData?.lastnName}`}</td>
                          <td>{item?.memberData?.AdditionEffectiveDate && item?.memberData?.AdditionEffectiveDate != '' ? formatedate(item?.memberData?.AdditionEffectiveDate) : "-"}</td>
                          <td>{'-'}</td>
                          <td>{'-'}</td>
                          <td>{'-'}</td>
                          <td>{'-'}</td>
                          {/* <td>
                            <button className='buttonblue1' onClick={() => Navigate(`/GroupClaimExperienceView?id=${item._id}`)}><i className='fa fa-eye'></i></button>
                          </td> */}

                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-end"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                  <div className="col-lg-4 mb-4">
                    <div className="member">
                      <h4>Within TAT</h4>
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

export default GroupClaimsExperience;
