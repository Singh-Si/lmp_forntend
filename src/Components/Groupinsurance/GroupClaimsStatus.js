import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import GroupMedical from "../Banner/GroupMedical";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import GroupSidebar from "./GroupSidebar";
import { API_URL } from "../..";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import swal from 'sweetalert'
import { CSpinner } from "@coreui/react";
import GroupmedicalAlert from "./GroupmedicalAlert";

const GroupClaimsStatus = () => {
    const Navigate = useNavigate()

    const [principlelist, setPrinciplelist] = useState([]);
    const [memberlist, setMemberlist] = useState([]);
    const [statuslist, setStatuslist] = useState([]);
    const [princepleId, setPrincipleId] = useState("");
    const [data, setData] = useState([]);
    const [limit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [employeeId, setEmployeeId] = useState([]);
    const [memberId, setMemberId] = useState([]);
    const [claimStatus, setClaimStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [legenddata, setLegenddata] = useState([])
    const [loader, setLoader] = useState(false)


    useEffect(() => {
        getClaimsstatusdata(page, limit);
        getprinciplelist();
        getClaimStatus();

    }, []);

    useEffect(() => {
        getClaimsstatusdata(page, limit);
    }, [employeeId, memberId, claimStatus, fromDate, toDate]);

    useEffect(() => {
        getmemberlist();
    }, [princepleId])




    const getClaimsstatusdata = async (page, limit) => {
        try {
            setLoader(true)
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
                },
            };

            await fetch(`${API_URL}/api/getClaimStatusFromHr?limit=${limit}&page=${page}&employeeId=${employeeId}&memberId=${memberId}&claimStatus=${claimStatus}&fromDate=${fromDate}&toDate=${toDate}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    const total = data.total;
                    const slice = total / limit;
                    const pages = Math.ceil(slice);
                    setPageCount(pages);
                    console.log(data.data, 'data');
                    setLegenddata(data)
                    const list = data.data;
                    setData(list)
                    setLoader(false)
                });
        } catch (err) {
            console.log(err);
            setLoader(false)
        }
    };

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1);
        getClaimsstatusdata(selectedPage + 1, limit);
    };

    console.log(data, 'data');

    const getprinciplelist = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
                }
            };

            await fetch(`${API_URL}/api/getAllPrincepleOfHr`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    setPrinciplelist(response.data);
                });
        }
        catch (err) {
            console.log(err);
        }
    }

    const getmemberlist = async(e) => {
        try {

            let requestOptions = {
                method: 'get',
                url: `${API_URL}/api/getAllmemberOfHr?employeeId=${employeeId}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken')
                }
            };
           
            await fetch(`${API_URL}/api/getAllmemberOfHr?employeeId=${employeeId}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    setMemberlist(response.data);
                });


        } catch (error) {
            console.log(error.message)
        }
    }

    const getClaimStatus = () => {
        const reqOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usertoken')

            },
        };
        fetch(`${API_URL}/api/getActiveClaimStatus`,reqOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data.data, "claim status data")
                setStatuslist(data.data)
            })
    }

    const handleprinciple = (e) => {
        setMemberlist([])
        setMemberId([])
        if(e.target.value == "") {
            setPrincipleId("")
            setEmployeeId("")
        }
        else {
        const event = JSON.parse(e.target.value)
        setPrincipleId(event?._id)
        setEmployeeId(event.employeeNumber)
        }
      }

      const handlemember = (e) => {
        if(e.target.value == "") {
            setMemberId("")
        }else {
        const event = JSON.parse(e.target.value)
        console.log(event)
        setMemberId(event._id)
        }
      }

      const formatedate = (date) => {
        const d = date?.split("T")[0];
        const finaldate = d?.split("-").reverse().join("/");
        return finaldate;
      }

const formatAmount = (amount) => {
    return new Intl.NumberFormat().format(amount)
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
                                    <Row style={{ justifyContent: 'center' }}>
                                        <Col lg={2}>
                                            <div className="amountsss">
                                                <h4>{legenddata.total}</h4>
                                                <p>Total Amount</p>
                                            </div>
                                        </Col>
                                        <Col lg={2}>
                                            <div className="amountsss">
                                                <h4>{formatAmount(legenddata?.cliamAmount)}</h4>
                                                <p>Claim Amount</p>
                                            </div>
                                        </Col>
                                        <Col lg={2}>
                                            <div className="amountsss">
                                                <h4>{formatAmount(legenddata?.paidAmount)}</h4>
                                                <p>Paid Amount</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={{ justifyContent: 'space-between' }}>
                                        <Col lg={5}>
                                            <div class="selectoption new row">
                                                <div class="col-lg-4">
                                                    <label>From Date</label>
                                                    <input type="date" 
                                                    className="form-control-date"
                                                    onChange={(e) => setFromDate(e.target.value)}
                                                    onKeyDown={(e) => e.preventDefault()}

                                                     />
                                                </div>

                                                <div class="col-lg-4">
                                                    <label>To Date</label>
                                                    <input type="date"
                                                     className="form-control-date"
                                                        onChange={(e) => setToDate(e.target.value)}
                                                      />
                                                </div>
                                                <div class="col-lg-4">
                                                    {/* <label style={{ visibility: 'hidden', display: 'block' }}>fdfdff</label>
                                                    <button className="searchclaimss">Search</button> */}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={5}>
                                            <div class="selectoption new row">
                                                <div class="col-lg-4">
                                                    <label style={{ visibility: 'hidden' }}></label>
                                                    <select aria-label="Default select example" class="form-select" onChange={(e)=> handleprinciple(e)}>
                                                        <option value={""}>Principal</option>
                                                        {
                                                            principlelist && principlelist?.map((item) => {
                                                                return (
                                                                    <option value={JSON.stringify(item)} >{item.firstName}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div class="col-lg-4">
                                                    <label style={{ visibility: 'hidden' }}></label>
                                                    <select aria-label="Default select example" class="form-select" onChange={(e) => handlemember(e)}>
                                                        <option value={""}>Member</option>
                                                        {
                                                            memberlist && memberlist?.map((item) => {
                                                                return (
                                                                    <option value={JSON.stringify(item)} >{item.firstName}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div class="col-lg-4">
                                                    <label style={{ visibility: 'hidden' }}></label>
                                                    <select aria-label="Default select example" class="form-select" onChange={(e)=>setClaimStatus(e.target.value)}>
                                                        <option value={""}>Status</option>
                                                        {
                                                            statuslist && statuslist?.map((item) => {
                                                                return (
                                                                    <option value={item.status_name} >{item.status_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <p className="statusofclaim">Status Of Reimbursement Claims Through JDV ( Detailed Report )</p>
                                    <table className="groupmedi table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Employee No.</th>
                                                <th>Principal</th>
                                                <th>Ref</th>
                                                <th>Claim Date</th>
                                                <th>Amount</th>
                                                <th>Paid Amount</th>
                                                <th>Remark</th>
                                                <th>Claim Status</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {data?.map((item, index) => (
                                            <tr>
                                            <td style={{ width: '10px' }}>{item?.memberData?.employeeNumber}</td>
                                            <td>{`${item?.memberData?.firstName} ${item?.memberData?.middleName} ${item?.memberData?.lastnName}`}</td>
                                            <td>{"-"}</td>
                                            <td>{item?.memberData?.createdAt && item?.memberData?.createdAt != '' ? formatedate(item?.memberData?.createdAt) : "-"}</td>
                                            <td>{item?.claimAmountFromHr ? item?.claimAmountFromHr : "-"}</td>
                                            <td>{item?.paidAmount ? item?.paidAmount : "-"}</td>
                                            <td>{item?.remark ? item?.remark : "-"}</td>
                                            <td>{item?.claimStatus != '' ? formatedate(item?.claimStatus) : "-"}</td>
                                            {/* <td>
                                            <button className='buttonblue1' onClick={() => Navigate(`/GroupClaimStatusview?id=${item?._id}`)}><i className='fa fa-eye'></i></button>
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

export default GroupClaimsStatus;
