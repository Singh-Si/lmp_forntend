import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Filters from "./Filters";
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
  AddMotoformData,
  AddToComapre,
  AddSelectedPlans,
  DeleteFromComapre,
} from "../../redux/reducers/MotoformDataReducerSlice";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
const Comparision = () => {
  const navigate = useNavigate();
  const counter = useSelector((state) => state.MotoformDataReducer);
  const [notCoveredData, setnotCoveredData] = useState([]);
  const [alldata, setalldata] = useState(counter?.alldata || []);
  const [excesscomparevalue, setexcesscomparevalue] = useState("");
  const dispatch = useDispatch();
  const handleAddFunction = (item) => {
    dispatch(AddToComapre({ data: item }));
  };
  const handlePlanRemove = (id) => {
    dispatch(DeleteFromComapre({ data: id }));
  };


  useEffect(() => {
    // const storagevalue = JSON.parse(localStorage.getItem("MotoformData"));
    const minvalue = counter.aslider_value
    setexcesscomparevalue(minvalue)
  }, []);

  console.log("counter", counter)

  useEffect(() => {
    setalldata(counter.allplans);
  }, [counter]);

  const [LeadId, setLeadId] = useState(counter?.leadid);

  console.log("leadid", LeadId)

  useEffect(() => {
    getPersonalDeatails();
    getAllStandardCovered();
  }, [counter]);
  const getPersonalDeatails = async () => {
    await getCardetailsByLeadid()
      .then(async (response) => {
        // setLeadId(response?._id);
      })
      .catch((error) => { })
    setLeadId(counter?.leadid);
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
    planRate
  ) => {
    try {
      await axios
        .put(`${API_URL}/api/updatePolicyDetails?id=${id}`, {
          plan_company_id,
          plan_id,
          planRate,
          insuranceType: "Motor",
          final_price,
          paymentStatus: ciphertext,
        })
        .then((res) => {
          //console.log({ res });
        })
        .catch((error) => {
          //console.log({ error });
        });
    } catch (error) {
      ;
      // Handle the error here, such as showing an error message or fallback behavior.
    }
  };
  const SelectPolicy = async (LeadId, company_id, id, totaldueamount, planRate) => {
    await UpdatePolicy(LeadId, company_id, id, totaldueamount, "Pending", planRate);
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


  console.log("counter?.comparelist",
    counter.comparelist)



  console.log("counter?.comparelist",
    counter.comparelist.map((p) => p.car_value.map((data) => data?.car_valueMin))
  )

  console.log("counter?.comparelist",
    counter.comparelist.map((p) => p.car_value.map((data) => data?.car_valueMax))
  )

  // console.log("Excess amount",
  // counter.comparelist.map((p) => p.car_value.map((data) => {excesscomparevalue > data?.car_valueMin && excesscomparevalue < data?.car_valueMax ? data?.excess : ""}))
  // )




  console.log( excesscomparevalue, "check sidd")

  console.log("Excess amount",
    counter.comparelist.map((p) =>
      console.log(p.car_value, "dfgjsbdgisgkhrjghsdfjkghsdfjkghjsdf")
      // p.car_value.map((data) => {

      //   data &&
      //     console.log("data", data.car_valueMin, excesscomparevalue, data.car_valueMax)
      //   if (+data.car_valueMin < +excesscomparevalue && +excesscomparevalue < +data.car_valueMax) {
      //     console.log("data.excess", data.excess)
      //     return data.excess
      //   }
      // })

      // .filter((data) => data &&
      //     data?.car_valueMin < excesscomparevalue && excesscomparevalue < data?.car_valueMax
      // )

    )
  );


  function formatAmount(amount) {
    if (amount !== null) {
      const numericValue = parseFloat(amount.toString().replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        // Use toLocaleString with custom options for grouping
        return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
      }
      return ''; // Return an empty string if the input is not a valid number
    }
    return ''; // Return an empty string if the input is null
  }



  return (
    <div>
      <Header />
      {/* <Innerbanner /> */}
      <div className="quotes_filters1 comparision">
        <div className="container quotes_filters hide pt-4 pb-4">
          <div className="row">
            <Filters />
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 table-container">
              <div
                className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 payments"
                style={{ paddingLeft: "0px" }}
              >
                {/* <Link
                  className="buttonactions"
                   to={"/Quotes"}
                >
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                  Back
                </Link> */}
              </div>
              {counter?.comparelist && counter?.comparelist.length > 0 ? (
                <div className="scroll_abcd">

                  <Table
                    // className="comparisions table table-lg table-striped"
                    // style={{ textAlign: "center" }}
                    style={{ textAlign: 'center' }} striped size="lg" className='comparisions'
                  >
                    <thead>
                      <tr>
                        <td style={{ whiteSpace: "nowrap", fontWeight: 'bold',fontSize:'medium' }}>
                          Policy Features List
                        </td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((companydata) => {
                            return (
                              <td>
                                {companydata?.companies?.company_logo &&
                                  companydata?.companies?.company_logo?.length >
                                  0 ? (
                                  companydata?.companies?.company_logo.map(
                                    (company) => {
                                      return (
                                        <img className="comp_logoas"
                                          // key={company?._id}
                                          src={`${API_URL}/${company?.destination}/${company?.filename}`}
                                          alt="company_logo"

                                        />
                                      );
                                    }
                                  )
                                ) : (
                                  <></>
                                )}
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
                            return <td> <span style={{ fontWeight: 'bold', color: '#ed1c24' }}>{typeof Pr?.finallBasePremium === "number" ? "AED" : ""} {Pr?.finallBasePremium != 'Referred' ? formatAmount(Pr?.finallBasePremium) : Pr?.finallBasePremium}</span> </td>;
                          })}
                      </tr>

                      <tr>
                        <td style={{ fontWeight: 'bold', color: '#003399' }}>Excess</td>
                        {/* {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((p, index) => (
                            <td key={index} style={{ fontWeight: 'bold', color: '#003399' }}>
                              {p?.car_value?.map((val, valIndex) => (
                                val && 
                                  val.car_valueMin < excesscomparevalue && excesscomparevalue < val.car_valueMax && val?.excess != undefined ? (
                                 
                                   "AED " + val?.excess.filter( (item) => item != undefined).map((dddd) => dddd?.excess)
                                 
                                ) : "N/A"
                              ))}
                            </td>
                          ))}
       */}
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((p, index) => (
                            <td key={index} style={{ fontWeight: 'bold', color: '#003399' }}>
                              {p?.excessAmount == "NA" ? "N/A" : "AED " + p?.excessAmount}
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
                                      console.log("i am the data ", p)
                                      dispatch(AddMotoformData({ name: "location", value: window.location.pathname }))
                                      dispatch(AddSelectedPlans(p))
                                      SelectPolicy(
                                        LeadId,
                                        p?.company_id,
                                        p?._id,
                                        p?.finallBasePremium,
                                        p?.planRate,
                                      )

                                      // dispatch(
                                      //   DeleteFromComapre({
                                      //     data: p,
                                      //   })
                                      // )

                                    }
                                    }
                                    to={`/Selectedquotes`}
                                    state={{ ...p }}
                                  >
                                    <button className="submit_select">Buy this</button>
                                  </Link>
                                ) : (
                                  <Link
                                    // onClick={() =>dispatch(
                                    //   DeleteFromComapre({
                                    //     data: p,
                                    //   })
                                    // )}
                                    to={
                                      "/thankyou?id=" +
                                      counter?.leadid +
                                      "&plan_id=" +
                                      p?._id +
                                      "&lob=" +
                                      "Motor" +
                                      "&plan_company_id=" +
                                      p?.company_id +
                                      "&final_price=" +
                                      p?.finallBasePremium +
                                        "&status=Completed" + "&planRate" + p?.planRate
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
                  </Table>
                </div>

              ) : (
                <>
                  <Navigate replace to="/Quotes" />
                </>
              )}
            </div>
          </div>

          {alldata && alldata.length > 0 &&
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
          }
          {/* <p className="similarviews">Show most viewed and similar products</p> */}
        </div>
        <h3 className="disclaimerss mt-4">
          Motor insurance comparision for your Motor requirements
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default Comparision;
