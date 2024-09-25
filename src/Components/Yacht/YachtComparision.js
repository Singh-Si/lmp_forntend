import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";

import { Table } from "react-bootstrap";
import finance from "../../Image/finance.svg";
import cross from "../../Image/cross.svg";
import { PostData, getCardetailsByLeadid, getData } from "../../functions";
import { API_URL } from "../..";
import { useSelector, useDispatch } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import {
  AddYacht,
  AddToComapre,
  DeleteFromComapre,
  AddSelectedPlans,
} from "../../redux/reducers/YachtDataReducerSlice";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import Yachtfilter from "./Yachtfilter";
const YachtComparision = () => {
  const navigate = useNavigate();
  const counter = useSelector((state) => state.YachtReducer);
  const [notCoveredData, setnotCoveredData] = useState([]);
  const [alldata, setalldata] = useState(counter.alldata);
  const dispatch = useDispatch();
  const handleAddFunction = (item) => {
    dispatch(AddToComapre({ data: item }));
  };
  const handlePlanRemove = (id) => {
    dispatch(DeleteFromComapre({ data: id }));
  };

  const YachtFormsData = useSelector((state) => state.YachtReducer);

  useEffect(() => {
    console.log(">>>>> >>>>> Counter >>> ",counter)
    setalldata(counter.allplans);
  }, [counter]);

  const [LeadId, setLeadId] = useState(counter.leadid);
  useEffect(() => {
    getPersonalDeatails();
    getAllStandardCovered();
  }, [counter]);
  const getPersonalDeatails = async () => {
    await getCardetailsByLeadid()
      .then(async (response) => {
        setLeadId(response?._id);
      })
      .catch((error) => { })
  };
  const getAllStandardCovered = async () => {
    try {
      getData(API_URL + "/api/getAllStandardCovered?lob=Motor")
        .then((res) => {
          setnotCoveredData(res.data.data);
        })
        .catch((e) => { });
    } catch (error) {
      ;
    }
  };
  const UpdatePolicy = async (
    id,
    plan_company_id,
    plan_id,
    final_price,
    ciphertext,
    yatchRate
  ) => {
    try {
      await axios
        .put(`${API_URL}/api/updatePolicyDetails?id=${id}`, {
          plan_company_id,
          plan_id,
          insuranceType: "Yatch",
          final_price,
          yatchRate,
          paymentStatus: ciphertext,
        })
        .then((res) => {
          ////console.log({ res });
        })
        .catch((error) => {
          ////console.log({ error });
        });
    } catch (error) {
      ;
      // Handle the error here, such as showing an error message or fallback behavior.
    }
  };
  const SelectPolicy = async (LeadId, company_id, id, totaldueamount, yatchRate) => {
    await UpdatePolicy(LeadId, company_id, id, totaldueamount, "Pending", yatchRate);
  };
  const statecarousel = {
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 3,
      },
      1024: {
        items: 6,
      },
    },
  };
  return (
    <div>
      <Header />
      {/* <Innerbanner /> */}
      <div className="quotes_filters1 Yacht">
        <div className="container quotes_filters hide pt-4 pb-4">
          <div className="row">
            <Yachtfilter />
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 table-container">
             
              {counter?.comparelist && counter?.comparelist.length > 0 ? (
                <div className="scroll_abcd">
                  <table
                    className="comparisions table table-lg table-striped"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        <td style={{ whiteSpace: "nowrap" }}>
                          Policy Features List
                        </td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((companydata) => {
                            return (
                              <td>
                              {companydata?.companies &&
                        companydata?.companies.map((item) => (
                          item.company_logo.map((company) => {
                            return (
                              <img
                              className="comp_logoas"
                                src={`${API_URL}/${company?.destination}/${company?.filename}`}
                                alt="company_logo"
                              />
                            );
                          })
                        ))}
                              </td>
                            );
                          })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 'bold', color: '#003399' }}>Plan Name</td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((p) => {
                            return <td style={{ fontWeight: 'bold', color: '#003399' }}>{p?.plan_name}</td>;
                          })}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 'bold', color: '#ed1c24' }}>Premium Amount</td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((Pr) => {
                            return <td> <span style={{ fontWeight: 'bold', color: '#ed1c24' }}>{typeof Pr?.finallBasePremium === "number" ? "AED" : ""} {Pr?.finallBasePremium}</span> </td>;
                          })}
                      </tr>
                      <tr>
                      <td style={{ fontWeight: "bold", color: "#003399" }}>
                        Excess
                      </td>
                      {counter?.comparelist.map((data) => (
                        <td
                          style={{ fontWeight: "bold", color: "#003399" }}
                          key={data._id}
                        >
                          <p>{`AED ${data.excessAmount}`}</p>
                        </td>
                      ))}
                    </tr>
                      {notCoveredData && notCoveredData.length > 0
                        ? notCoveredData.map((nv) => {
                          return (
                            <tr key={nv?._id}>
                              <td>{nv?.standard_cover_label}</td>
                              {counter?.comparelist &&
                                counter?.comparelist.length > 0 &&
                                counter?.comparelist.map((data) => {
                                  const foundData = data?.standard_cover_arr.find(
                                    (item) => nv?._id === item?.standard_cover_id
                                  );
                                  return (
                                    <td key={data?._id}>
                                      {foundData ? (
                                        <div className="hover-effect">
                                          {/* <img
                                            style={{
                                              width: "25px"
                                            }}
                                            src="https://static.vecteezy.com/system/resources/previews/010/143/044/non_2x/tick-icon-sign-symbol-design-free-png.png"
                                            alt="Tick"
                                          /> */}
                                          {/* <span className="hover-text">
                                            {foundData?.standard_cover_desc}
                                          </span> */}
                                          <span >
                                            {foundData?.standard_cover_desc === "No" ? (<img src={cross} alt="Cross" />) : foundData?.standard_cover_desc === "Yes" ? (<img
                                              style={{
                                                width: "25px"
                                              }}
                                              src="https://static.vecteezy.com/system/resources/previews/010/143/044/non_2x/tick-icon-sign-symbol-design-free-png.png"
                                              alt="Tick"
                                            />) : (<>{foundData?.standard_cover_desc}</>)}
                                          </span>
                                        </div>
                                      ) : (
                                        <img src={cross} alt="Cross" />
                                      )}
                                    </td>
                                  );
                                })}
                            </tr>
                          );
                        })
                        : null}

                      <tr>
                        <td>{""}</td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((p) => {

                            return (
                              <td>
                                {typeof p?.finallBasePremium == "number" || p?.finallBasePremium !== "Referred" ? (
                                  <Link
                                    onClick={() => {

                                      SelectPolicy(
                                        LeadId,
                                        p?.company_id,
                                        p?._id,
                                        p?.finallBasePremium,
                                        p?.yatchRate
                                      )
                                      dispatch(AddSelectedPlans(p))
                                      dispatch(AddYacht({ name: "location", value: window.location.pathname }))
                                    
                                    }
                                    }
                                    to={`/YachtSelectedquotes`}

                                  >
                                    <button className="submit_select">Buy this</button>
                                  </Link>
                                ) : (
                                  <Link
                                    onClick={() => dispatch(
                                      // DeleteFromComapre({
                                      //   data: p,
                                      // })
                                    )}
                                    to={
                                      "/thankyou?id=" +
                                      YachtFormsData?.leadid +
                                      "&lob=Yacht"+
                                      "&plan_id=" +
                                      p?._id +
                                      "&plan_company_id=" +
                                      p?.company_id +
                                      "&final_price=" +
                                      p?.finallBasePremium +
                                      "&status=Completed" + "&yatchRate=" + p?.yatchRate
                                    }
                                  >
                                    <button className="submit_select">
                                      Buy this
                                    </button>
                                  </Link>
                                )}
                              </td>
                            );
                          })}
                      </tr>
                      <tr>
                        <td>{""}</td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((p) => {
                            return (
                              <td>
                                <Link>
                                  <button
                                    onClick={() => handlePlanRemove(p)}
                                    className="removecompare"
                                  >
                                    Remove
                                  </button>
                                </Link>
                              </td>
                            );
                          })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <Navigate replace to="/Yachtquotes" />
                </>
              )}
            </div>
          </div>
          {  alldata && alldata.length > 0 && (
          <div className="mt-4 compare_list">
            <h3 className="mb-4 mt-2">How about these ?</h3>
            <OwlCarousel
              margin={30}
              nav={false}
              dots={false}
              items={2}
              touchDrag={true}
              lazyLoad={true}
              responsive={statecarousel.responsive}
            >
              {alldata && alldata.length > 0 ? (
                <>
                  {alldata.map((c) => {
                    return (
                      <div className="item">
                        <div className="comparelistcarousel">
                          {c?.companies?.company_logo &&
                            c?.companies?.company_logo.length > 0 ? (
                            c?.companies?.company_logo.map((company) => {
                              return (
                                <img
                                  key={company?._id}
                                  src={`${API_URL}/${company?.destination}/${company?.filename}`}
                                  alt="company_logo"
                                />
                              );
                            })
                          ) : (
                            <></>
                          )}

                          <p> {c?.plan_name} </p>
                          <h4>{c?.finallBasePremium}</h4>
                          <strike>{c?.finallBasePremium}</strike>
                          <span>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            4.5
                          </span>
                          <button
                            className="addtocomparebutton"
                            onClick={() => handleAddFunction(c)}
                          >
                            Add to compare
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>No Data Found</>
              )}
            </OwlCarousel>
          
          </div>
          )}
        
        </div>
          
        <h3 className="disclaimerss mt-4">
          Yacht insurance comparision for your Yacht requirements
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default YachtComparision;
