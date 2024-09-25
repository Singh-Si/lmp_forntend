import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { API_URL } from "../..";
import {
  AddToComapre,
  DeleteFromComapre,
} from "../../redux/reducers/MotoformDataReducerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import axios from "axios";
import { getCardetailsByEmail } from "../../functions";
const QuteComponent = ({ handleProductFilter, totalPlan, Loading, Data }) => {
  const motorFormsData = useSelector((state) => state?.MotoformDataReducer);
  const [NaturePlan, setNaturePlan] = useState([]);
  const [getrepairtypes, setgetrepairtypes] = useState([]);
  const [getallplanename, setgetallplanename] = useState([]);
  const [AdditionalidsData, setAdditionalidsData] = useState([]);
  useEffect(() => {
    getNaturePlan();
    getAllrepairtype();
    getAllCompanies();
    getAllAdditionalCovered();
  }, []);
  const getAllAdditionalCovered = async () => {
    await axios
      .get(API_URL + "/api/getAllAdditionalCovered?lob=Motor")
      .then((response) => {
        setAdditionalidsData(response.data.data);
      });
  };

  async function getNaturePlan() {
    await axios
      .get(API_URL + "/api/getNaturePlan")
      .then((response) => {
        setNaturePlan(response.data.data);
      })
      .catch((error) => {
        ;
      });
  }
  async function getAllrepairtype() {
    await axios
      .get(API_URL + "/api/getrepairtypes")
      .then((response) => {
        // // //console.log({ response });
        setgetrepairtypes(response.data.data);
        // // //console.log("getrepairtypes", getrepairtypes);
      })
      .catch((error) => {
        ;
      });
  }
  async function getAllCompanies() {
    await axios
      .get(API_URL + "/api/getAllCompanies")
      .then((response) => {
        setgetallplanename(response.data.data);
      })
      .catch((error) => {
        ;
      });
  }
  const dispatch = useDispatch();
  const [planDetailsVisibility, setPlanDetailsVisibility] = useState({});
  const toggleShowMore = (planId) => {
    setPlanDetailsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [planId]: !prevVisibility[planId], // Toggle the visibility for the specific plan
    }));
  };
  return (
    <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
      <div className="row quotes_selectoption">
        <div className="col">
          <span>Repair Type</span>
          <select
            onChange={handleProductFilter}
            name="repaire_type_name"
            className="quotes_select form-control"
          >
            <option value={null}>Any</option>
            {getrepairtypes && getrepairtypes.length > 0 ? (
              getrepairtypes.map((v, i) => {
                return (
                  <option
                    selected={motorFormsData.repaire_type_name}
                    value={v?.repair_type_name}
                  >
                    {v?.repair_type_name}
                  </option>
                );
              })
            ) : (
              <option>Any</option>
            )}
          </select>
        </div>
        <div className="col">
          <span>Ins Company</span>
          <select
            onChange={handleProductFilter}
            name="company_id"
            className="quotes_select form-control"
          >
            <option value={null}>Any</option>
            {getallplanename && getallplanename.length > 0 ? (
              getallplanename.map((v) => {
                return (
                  <>
                    <option
                      selected={
                        motorFormsData.company_id === v?._id
                          ? v?.company_name
                          : null
                      }
                      value={v?._id}
                    >
                      {v?.company_name}
                    </option>
                  </>
                );
              })
            ) : (
              <option>No Options Available</option>
            )}
          </select>
        </div>
        <div className="col">
          <span>Plan Nature</span>
          <select
            onChange={handleProductFilter}
            name="nature_of_plan_id"
            className="quotes_select form-control"
          >
            <option value={null}>Any</option>
            {NaturePlan && NaturePlan.length > 0 ? (
              NaturePlan.map((v) => {
                return <option value={v?._id}>{v?.nature_of_plan_name}</option>;
              })
            ) : (
              <option>Any</option>
            )}
          </select>
        </div>
        <div className="col">
          <span>Instant Policy</span>
          <select
            onChange={handleProductFilter}
            name="instanpolicy"
            className="quotes_select form-control"
          >
            <option>Any</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="col">
          <span>Price</span>
          <select
            onChange={handleProductFilter}
            name="price"
            className="quotes_select form-control"
          >
            <option value={"Lowest Price"}>Lowest Price</option>
            <option value={"Highest Price"}>Highest Price</option>
          </select>
        </div>
      </div>
      <>
        <div className="row quotes_selectoption filters">
          <div
            className="row"
            style={{ alignItems: "center", marginBottom: "10px" }}
          >
            <div className="col-lg-2">
              <span className="quotes_selectoption col-lg-2">More Filters</span>
            </div>
            {AdditionalidsData &&
              AdditionalidsData.length > 0 &&
              AdditionalidsData.map((v) => (
                <div className="col-lg-4">
                  <Form.Check
                    onChange={handleProductFilter}
                    className="abcds_abcs filtercheck"
                    value={v?._id}
                    type="checkbox"
                    name="additional_id"
                    label={v?.additional_cover_label}
                    // label={v?.additional_cover_label+"("+v?.additional_cover_description+")"}
                  />
                </div>
              ))}
          </div>
        </div>
      </>

      {totalPlan > 0 && (
        <>
          <p>
            We have found {totalPlan} vehicle insurance quotes for your{" "}
            {motorFormsData?.car_maker} {motorFormsData?.car_model},{" "}
            {motorFormsData?.model_year} valued at AED{" "}
            {motorFormsData.minCarValue}
          </p>
        </>
      )}
      <h4 className="notess">Note: All prices are excluding taxes.</h4>
      <div className="scroll_abcds">
        {Loading ? (
          <div id="loading"></div>
        ) : totalPlan > 0 ? (
          Data.map((v) => {
            let comparelistdata;
            let existComapreList;
            if (motorFormsData.comparelist.length > 0) {
              comparelistdata = motorFormsData.comparelist;
              existComapreList = comparelistdata.find(
                (item) => v._id === item._id
              );
            }
            return (
              <div key={v._id} className="quotes_inner">
                <div className="row quotes_details">
                  <div className="col-lg-3 quotesmobile">
                    {v?.companies?.company_logo &&
                    v?.companies?.company_logo.length > 0 ? (
                      v?.companies?.company_logo.map((company) => {
                        return (
                          <img
                            // key={company?._id}
                            src={`${API_URL}/${company?.destination}/${company?.filename}`}
                            alt="company_logo"
                            style={{ width: "100%" }}
                          />
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-lg-6 quotemobile">
                    <h4>{v?.plan_name} </h4>
                    <ul className="benefits">
                      {v?.additional_cover_arr &&
                      v?.additional_cover_arr.length > 0 ? (
                        v?.additional_cover_arr.map((cover) => {
                          return (
                            <li>
                              {cover?.additional_cover_label} (
                              {cover?.additional_cover_desc})
                            </li>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>
                  <div className="col-lg-3 action_abcd quotesmobile">
                    <h2>
                      {typeof v?.finallBasePremium == "number"
                        ? "AED " + v?.finallBasePremium
                        : v?.finallBasePremium}
                    </h2>
                    {existComapreList ? (
                      <Form.Check
                        className="abcds_abcs1"
                        type="checkbox"
                        label="Compare"
                        checked="checked"
                        onClick={() => {
                          dispatch(
                            DeleteFromComapre({
                              data: v,
                            })
                          );
                          // handleShow();
                        }}
                      />
                    ) : (
                      <Form.Check
                        className="abcds_abcs1"
                        type="checkbox"
                        label="Compare"
                        checked=""
                        onClick={() => {
                          dispatch(
                            AddToComapre({
                              data: v,
                            })
                          );
                          // handleShow();
                        }}
                      />
                    )}

                    {typeof v?.finallBasePremium === "number" ? (
                      <Link
                        to={`/Selectedquotes`}
                        state={{
                          ...v,
                          minCarValue: motorFormsData.minCarValue,
                          Data,
                        }}
                      >
                        <button className="submit_select">Select</button>
                      </Link>
                    ) : typeof v?.finallBasePremium === "string" ? (
                      <Link
                        to={
                          "/thankyou?id=" +
                          motorFormsData?.leadid +
                          "&plan_id=" +
                          v?._id +
                          "&plan_company_id=" +
                          v?.company_id +
                          "&final_price=" +
                          v?.finallBasePremium +
                          "&status=Completed"
                        }
                      >
                        <button className="submit_select">Select</button>
                      </Link>
                    ) : (
                      <Link
                        to={
                          "/thankyou?id=" +
                          motorFormsData?.leadid +
                          "&plan_id=" +
                          v?._id +
                          "&plan_company_id=" +
                          v?.company_id +
                          "&final_price=" +
                          v?.finallBasePremium +
                          "&status=Completed"
                        }
                      >
                        <button className="submit_select">Select</button>
                      </Link>
                    )}

                    <span className="terms_condition">
                      {v?.companies?.company_terms_conditions &&
                      v?.companies?.company_terms_conditions.length > 0 ? (
                        v?.companies?.company_terms_conditions.map(
                          (company) => {
                            return (
                              <a
                                target="_blank"
                                download
                                href={`${API_URL}/${company?.destination}/${company?.filename}`}
                              >
                                T&C Apply
                              </a>
                            );
                          }
                        )
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                </div>
                {planDetailsVisibility[v?._id] ? (
                  <div className="rowabcds">
                    <div className="row overalldetails">
                      <div className="col-lg-6 abc">
                        <img
                          style={{
                            width: "auto",
                            marginRight: "15px",
                          }}
                          src={tick}
                        />
                        <span className="abcds_aud">What is Covered.</span>
                        <ul className="description">
                          {v?.standard_cover_arr &&
                          v?.standard_cover_arr.length > 0 ? (
                            v?.standard_cover_arr.map((cover) => {
                              return (
                                <li>
                                  {cover?.standard_cover_label} (
                                  {cover?.standard_cover_desc})
                                </li>
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </ul>
                      </div>
                      <div className="col-lg-6 cde">
                        <img
                          style={{
                            width: "auto",
                            marginRight: "15px",
                          }}
                          src={cross}
                        />
                        <span className="abcds_aud">What is not Covered.</span>
                        <ul className="description">
                          {v?.notCoveredData && v?.notCoveredData.length > 0 ? (
                            v?.notCoveredData.map((cover) => {
                              return <li>{cover?.standard_cover_label}</li>;
                            })
                          ) : (
                            <></>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="row overalldetails">
                      <button
                        className="showadd_details"
                        onClick={() => toggleShowMore(v?._id)}
                      >
                        Hide Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rowabcds">
                    <div className="row overalldetails">
                      <button
                        className="showadd_details"
                        onClick={() => toggleShowMore(v?._id)}
                      >
                        See Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>
            We have found {0} vehicle insurance quotes for your{" "}
            {motorFormsData?.car_maker} {motorFormsData?.car_model},{" "}
            {motorFormsData?.model_year}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuteComponent;
