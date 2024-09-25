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
import GroupmedicalAlert from "./GroupmedicalAlert";

const GroupClaimRatio = () => {

  const Navigate = useNavigate()
  const [data, setData] = useState([]);
  const [limit] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    getGroupClaimsExperience(page, limit);
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
      await fetch(`${API_URL}/api/getClaimFromHr?claimType=ratio&limit=${limit}&page=${page}`, requestOptions)
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
                        <th>Employee No.</th>
                        <th style={{ width: '200px' }}>Name</th>
                        <th>Email ID</th>
                        <th>Phone No.</th>
                        <th>Effective Date</th>
                        <th>Approval Date</th>
                        <th>Claim Amount (AED)</th>
                        <th>Settled Amount (AED)</th>
                        <th>Status</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr>
                          <td style={{ width: '10px' }}>{item?.memberData?.employeeNumber}</td>
                          <td>{`${item?.memberData?.firstName} ${item?.memberData?.middleName} ${item?.memberData?.lastnName}`}</td>
                          <td>{item?.memberData?.email}</td>
                          <td>{item?.memberData?.phoneno}</td>
                          <td>{item?.memberData?.AdditionEffectiveDate && item?.memberData?.AdditionEffectiveDate != '' ? formatedate(item?.memberData?.AdditionEffectiveDate) : "-"}</td>
                          <td>{item?.memberData?.createdAt && item?.memberData?.createdAt != '' ? formatedate(item?.memberData?.createdAt) : "-"}</td>
                          <td>{item?.claimAmountFromHr && item?.claimAmountFromHr != '' ? item?.claimAmountFromHr : '-'}</td>
                          <td>{item?.paidAmount && item?.paidAmount != '' ? item?.paidAmount : '-'}</td>
                          <td>{item?.claimStatus && item?.claimStatus != '' ? item?.claimStatus : '-'}</td>
                          {/* <td>
                          <button className='buttonblue1' onClick={() => Navigate(`/GroupClaimRatioView?id=${item._id}`)}><i className='fa fa-eye'></i></button>
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
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <GroupmedicalAlert/>
      </Row>
      <Footer />
    </div>
  );
};

export default GroupClaimRatio;
