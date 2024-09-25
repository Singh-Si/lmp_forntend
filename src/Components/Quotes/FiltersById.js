import React, { useEffect, useState, useMemo } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import Moment from "react-moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { ArrayofBusinesstypes, useFetch } from "../../functions";
import PhoneInput from "react-phone-number-input";
import { InputGroup } from "react-bootstrap";

const FiltersById = ({
  CarModel,
  setCarModel,
  setCarVarient,
  CarVarient,
  setCarMakers,
  CarMakers,
  handleProductFilter,
}) => {
  let url = new URLSearchParams(window.location.search);
  const motorFormsData = useSelector((state) => state.MotoformDataReducer);
  const { handleSubmitMotorform, saveMotodata } = UseMotorContext();
  const [renewal, setRenewal] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState("");
  const [lastyearpolicies, setlastyearpolicies] = useState([]);
  const [policies, setpolicies] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPersonalEditMode, setPersonalIsEditMode] = useState(false);
  const [DLexperience, setDLexperience] = useState([]);
  const [HomeDLexperience, setHomeDLexperience] = useState([]);
  const [drivingExpString, setDriveExp] = useState(null);
  const [Years, setYears] = useState([]);
  const [RegistrationYears, setRegistrationYears] = useState([]);
  const [AreOfRegistrationYears, setAreOfRegistrationYears] = useState([]);
  const [last_year_claimarray, setlast_year_claimarray] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [months, setMonths] = useState(null);
  const [newFormdata, setnewFormdata] = useState({
    name: motorFormsData.name,
    phoneno: motorFormsData.phoneno,
    nationality: motorFormsData.nationality,
    date_of_birth: motorFormsData.date_of_birth,
    last_year_claim: motorFormsData.last_year_claim_year,
    drivingexp: motorFormsData.drivingexp,
  });
  const [companynewFormdata, setcompanynewFormdata] = useState({
    name: motorFormsData.name,
    phoneno: motorFormsData.phoneno,
    nationality: motorFormsData.nationality,
    business_type: motorFormsData.business_type
      ? motorFormsData.business_type
      : null,
    last_year_claim: motorFormsData.last_year_claim,
  });
  const [apiData, setApiData] = useState({
    policy_type: motorFormsData?.policy_type,
    last_year_policy_type: motorFormsData?.last_year_policy_type,
    model_year: motorFormsData?.model_year,
    car_maker: motorFormsData?.car_maker,
    car_model: motorFormsData?.car_model,
    car_variant: motorFormsData?.car_variant,
    registration_year: motorFormsData?.registration_year,
    register_area: motorFormsData?.register_area,
    name: motorFormsData?.name,
    phoneno: motorFormsData?.phoneno,
    date_of_birth: motorFormsData?.date_of_birth,
    email: motorFormsData?.email,
    nationality: motorFormsData?.nationality,
    drivingexp: motorFormsData?.drivingexp,
    last_year_claim: motorFormsData?.last_year_claim_year,



  })
  const handleCompanyPersonalDetails = (e) => {
    //console.log({ [e.target.name]: e.target.value });
    setcompanynewFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };


  useEffect(() => {
    let d = url.get("renewal")
    const drivingExpMin = motorFormsData?.drivingexp?.min;
    const drivingExpMax = motorFormsData?.drivingexp?.max;
    const averageExp = (drivingExpMax + drivingExpMin) / 2
    if (d) {
      setRenewal(d)
      const d1 = new Date(motorFormsData?.policy_issued_date);
      const d2 = new Date(motorFormsData?.policy_expiry_date);
      const monthsDifference = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
      setMonths(monthsDifference)

      if (months) {
        //console.log(months, "months")
        //console.log(averageExp, "averageExp")
        const totalMonths = months + averageExp;
        const drivingExp = motorFormsData.drivingexp ? (totalMonths < 13 && totalMonths > 6 ? (6 + "-" + totalMonths + " Months")
          : totalMonths % 12 == 0 ? ((totalMonths / 12) + "-" + Math.ceil((totalMonths / 12) + 1) + " years")
            : totalMonths % 12 != 0 && totalMonths > 13 ? (Math.floor((totalMonths - (totalMonths % 12)) / 12) + "-" + Math.ceil((totalMonths / 12)) + " years")
              : totalMonths <= 6 ? (0 + "-" + totalMonths + " months") : totalMonths == 13 ? (12 + "-" + totalMonths + " Months") : null)
          : null
        setDriveExp(drivingExp);

        const minmonths = totalMonths > 12 && totalMonths < 24 ? 12 : totalMonths > 24 && totalMonths % 12 == 0 ? totalMonths - 12 : totalMonths - totalMonths % 12;

        const reqData = {
          business_type: "Renewal",
          insuranceType: "Motor",
          finall_submit: motorFormsData?.finall_submit,
          electric_car: motorFormsData?.electric_car,
          your_electric_car: motorFormsData?.your_electric_car,
          buying_used_car: motorFormsData?.buying_used_car,
          car_brand_new: motorFormsData?.car_brand_new,
          policy_type: motorFormsData?.polcy_type,
          last_year_policy_type: motorFormsData?.last_year_policy_type,
          model_year: motorFormsData?.model_year,
          car_maker: motorFormsData?.car_maker,
          car_model: motorFormsData?.car_model,
          car_variant: motorFormsData?.car_variant,
          registration_year: motorFormsData?.registration_year,
          register_area: motorFormsData?.register_area,
          name: motorFormsData?.name,
          phoneno: motorFormsData?.phoneno,
          date_of_birth: motorFormsData?.date_of_birth,
          email: motorFormsData?.email,
          nationality: motorFormsData?.nationality,
          drivingexp: {
            min: minmonths,
            max: totalMonths
          },
          last_year_claim: motorFormsData?.last_year_claim_year,
        }
        //console.log(reqData, "<<<<<<<<object")
        axios.post(API_URL + "/api/addRenewalLead", reqData)
          .then((res) => {
            //console.log(res, "res")
          })
          .catch((err) => {
            //console.log(err, "err")
          })
      } else {
        const drivingExp = motorFormsData.drivingexp ? drivingExpMax < 13 ? (drivingExpMin + "-" + drivingExpMax + " Months")
          : (drivingExpMin / 12 + "-" + drivingExpMax / 12 + " years") : null
        setDriveExp(drivingExp);

      }


    } else {

      const drivingExp = motorFormsData.drivingexp ? drivingExpMax < 13 ? (drivingExpMin + "-" + drivingExpMax + " Months")
        : (drivingExpMin / 12 + "-" + drivingExpMax / 12 + " years") : null
      setDriveExp(drivingExp);
      setRenewal(null)
    }
    const dle = [];
    for (let i = 0; i < 8; i++) {
      if (i === 0 || i === 1) {
        dle.push({ min: i * 6, max: (i + 1) * 6 });
      }
      if (i > 0) {
        dle.push({ min: i, max: i + 1 });
      }
    }
    const date = new Date();
    const currentdate = date.getFullYear();
    let ry = [];
    for (let i = currentdate; i >= 2000; i--) {
      ry.push({ year: i });
    }
    setRegistrationYears(ry);
    const y = [];
    for (let i = currentdate; i >= 1970; i--) {
      y.push({ year: i });
    }
    setYears(y);

    const last_year_claimarray = [];
    for (let i = 0; i <= 10; i++) {
      last_year_claimarray.push({ year: i });
    }
    setlast_year_claimarray(last_year_claimarray);
    setDLexperience(dle);
    setHomeDLexperience(dle);
    fetchdata();

  }, [renewal]);


  const [countryresponse, CountriesLoading, countrieserrorError] = useFetch(
    API_URL + "/api/getAllCountries"
  );
  const Countries = countryresponse?.data?.data
    ? countryresponse?.data?.data
    : [];
  const fetchdata = async () => {
    try {
      const get_all_policiy_type = axios.get(API_URL + "/api/getPolicyType");
      const all_getPlanFor = axios.get(API_URL + "/api/getPlanFor");
      const Area_Of_Registrations = axios.get(
        API_URL + "/api/getAreaOfRegistrations"
      );
      const [
        get_all_policiy_type_response,
        all_getPlanFor_response,
        Area_Of_Registrations_response,
      ] = await axios.all([
        get_all_policiy_type,
        all_getPlanFor,
        Area_Of_Registrations,
      ]);
      if (get_all_policiy_type_response?.data?.data?.length > 0) {
        setlastyearpolicies(get_all_policiy_type_response.data.data);
      }
      if (all_getPlanFor_response?.data?.data?.length > 0) {
        setpolicies(all_getPlanFor_response.data.data);
      }
      if (Area_Of_Registrations_response?.data?.data?.length > 0) {
        setAreOfRegistrationYears(Area_Of_Registrations_response?.data?.data);
      }
    } catch (error) {
      ;
    }
  };
  const handleCompanyPhoneChange = (value) => {
    setcompanynewFormdata((prev) => {
      return {
        ...prev,
        phoneno: value,
      };
    });
  };

  const handlePersonalEditModeToggle = () =>
    setPersonalIsEditMode((prevEditMode) => !prevEditMode);
  const handleEditModeToggle = async () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
    if (!isEditMode) {
      // set car makers
      await axios
        .post(API_URL + "/api/getMotorDetails", {
          years: motorFormsData.model_year,
        })
        .then((res) => {
          if (res && res.data.data?.length > 0) {
            let arrdata = res.data.data;
            const filtereddata = arrdata.filter(
              (item) => item._id !== motorFormsData.car_maker
            );
            setCarMakers([...filtereddata, { _id: motorFormsData.car_maker }]);
          } else {
            setCarMakers([...{ _id: motorFormsData.car_maker }]);
          }
        })
        .catch((error) => {
          setCarMakers([...{ _id: motorFormsData.car_maker }]);
          ;
        });
      //set car models
      await axios
        .post(API_URL + "/api/getMotorDetails", {
          years: motorFormsData?.model_year,
          carMaker: motorFormsData?.car_maker,
        })
        .then((res) => {
          if (res && res.data.data?.length > 0) {
            let arrdata = res.data.data;
            const filtereddata = arrdata.filter(
              (item) => item._id !== motorFormsData.car_model
            );
            setCarModel([...filtereddata, { _id: motorFormsData.car_model }]);
          } else {
            setCarModel([...{ _id: motorFormsData.car_model }]);
          }
        })
        .catch((error) => {
          setCarModel([...{ _id: motorFormsData.car_model }]);
          ;
        });
      // set car varient
      await axios
        .post(API_URL + "/api/getMotorDetails", {
          years: motorFormsData?.model_year,
          carMaker: motorFormsData?.car_maker,
          carModel: motorFormsData?.car_model,
        })
        .then((res) => {
          if (res && res.data.data?.length > 0) {
            let arrdata = res.data.data;
            const filtereddata = arrdata.filter(
              (item) => item._id !== motorFormsData.car_variant
            );
            setCarVarient([
              ...filtereddata,
              { _id: motorFormsData.car_variant },
            ]);
          } else {
            setCarVarient([...{ _id: motorFormsData.car_variant }]);
          }
        })
        .catch((error) => {
          setCarVarient([...{ _id: motorFormsData.car_variant }]);
          ;
        });

      return false; // This might need to be adjusted based on your specific logic
    }
  };
  const handlePersonalDetails = (e) => {
    setnewFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name == "drivingexp"
            ? JSON.parse(e.target.value)
            : e.target.value,
      };
    });
  };
  const handlePhoneChange = (value) => {
    setnewFormdata((prev) => {
      return {
        ...prev,
        phoneno: value,
      };
    });
  };

  const UpdatePersonalDetails = async () => {
    if (motorFormsData.policy_id === "645102bba95bd184969066b2") {
      const updatedData = {
        name:
          companynewFormdata.name !== ""
            ? companynewFormdata.name
            : motorFormsData.name,
        phoneno:
          companynewFormdata.phoneno !== ""
            ? companynewFormdata.phoneno
            : motorFormsData.phoneno,
        last_year_claim:
          companynewFormdata.last_year_claim !== ""
            ? companynewFormdata.last_year_claim
            : motorFormsData.last_year_claim,
        business_type:
          companynewFormdata.business_type !== ""
            ? companynewFormdata.business_type
            : motorFormsData.business_type,
        nationality:
          companynewFormdata.nationality !== ""
            ? companynewFormdata.nationality
            : motorFormsData.nationality,

        // passport_no: newpassport !== "" ? newpassport : motorFormsData.passport_no,
      };
      //console.log(updatedData);
      if (companynewFormdata.name === "" || motorFormsData?.name === "") {
        swal({
          title: "Error!",
          text: "Please enter Full Name",
          icon: "warning",
        });
      } else {
        for (let i = 0; i < Object.keys(updatedData).length; i++) {
          handleSubmitMotorform(
            Object.keys(updatedData)[i],
            Object.values(updatedData)[i]
          );
        }
        await axios
          .post(API_URL + "/api/fillInsurancePlan?" + motorFormsData.email, {
            ...saveMotodata,
            form_location: window.location.pathname,
          })
          .then((res) => {
            if (res.status === 200) {
              setPersonalIsEditMode(false);
              // swal(
              //   "Success",
              //   "Personal Details Updated Successfully",
              //   "success"
              // );
            } else {
              // swal("Error", "Error in Updating Personal Details", "error");
            }
            return res;
          })
          .catch((err) => {
            return err;
          });
      }
    } else {
      const updatedData = {
        name: newFormdata.name !== "" ? newFormdata.name : motorFormsData.name,
        phoneno:
          newFormdata.phoneno !== ""
            ? newFormdata.phoneno
            : motorFormsData.phoneno,
        last_year_claim:
          newFormdata.last_year_claim !== ""
            ? newFormdata.last_year_claim
            : motorFormsData.last_year_claim,
        date_of_birth:
          startDate !== "" ? startDate : motorFormsData.date_of_birth,
        drivingexp:
          newFormdata.drivingexp !== null
            ? newFormdata.drivingexp
            : motorFormsData.drivingexp,
        nationality:
          newFormdata.nationality !== null
            ? newFormdata.nationality
            : motorFormsData.nationality,
      };
      //console.log(updatedData);
      if (newFormdata.name === "" || motorFormsData?.name === "") {
        swal({
          title: "Error!",
          text: "Please enter Full Name",
          icon: "warning",
        });
      } else {
        for (let i = 0; i < Object.keys(updatedData).length; i++) {
          handleSubmitMotorform(
            Object.keys(updatedData)[i],
            Object.values(updatedData)[i]
          );
        }
        await axios
          .post(API_URL + "/api/fillInsurancePlan?" + motorFormsData.email, {
            ...saveMotodata,
            form_location: window.location.pathname,
          })
          .then((res) => {
            if (res.status === 200) {
              setPersonalIsEditMode(false);
              // swal(
              //   "Success",
              //   "Personal Details Updated Successfully",
              //   "success"
              // );
            } else {
              // swal("Error", "Error in Updating Personal Details", "error");
            }
            return res;
          })
          .catch((err) => {
            return err;
          });
      }
    }
  };

  // const getMotorInsoranceDetails = async () => {




  const [horizontal, setHorizontal] = useState(motorFormsData.minCarValue);

  const [changehorizontal, setchangeHorizontal] = useState(
    motorFormsData.aslider_value
  );
  const [minCarValue, setminCarValue] = useState(motorFormsData.minCarValue);
  const [maxCarValue, setmaxCarValue] = useState(motorFormsData.maxCarValue);
  const [asliderValue, setAsliderValue] = useState(motorFormsData.aslider_value)
  useEffect(() => {
    // This effect will run whenever minCarValue or maxCarValue changes
    // It's a good place to call your form submission function
    handleSubmitMotorform("minCarValue", minCarValue);
    handleSubmitMotorform("maxCarValue", maxCarValue);
    handleSubmitMotorform("aslider_value", asliderValue);

  }, [motorFormsData.minCarValue, motorFormsData.maxCarValue, motorFormsData.aslider_value, asliderValue, handleSubmitMotorform, minCarValue, maxCarValue]);
  const handleChangeHorizontal = (value) => {
    // //console.log(value, "cjahsfuafasf");
    setchangeHorizontal(value);
    setAsliderValue(value)
  };

  const sliderProps = useMemo(
    () => ({
      min: motorFormsData.minCarValue,
      max: motorFormsData.maxCarValue,
      value: changehorizontal,
      // format: formatkg,
      onChange: handleChangeHorizontal,
    }),

    [changehorizontal, motorFormsData.maxCarValue, motorFormsData.minCarValue]
  );

  const formatkg = (value) => value + "AED";
  const formatPc = (p) => p + "%";
  return (
    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 FiltersById">
      <h4 className="car details">
        Vehicle Details{" "}
        {renewal != null ? ("") : window.location.pathname === "/Quotes" ? (
          <i className="fa fa-edit" onClick={handleEditModeToggle}></i>
        ) : ("")}
      </h4>
      {Loading ? (
        <>Loading</>
      ) : Error ? (
        <>{Message}</>
      ) : (
        <>
          <div className="filterssas one">
            <div className="row">
              {
                renewal != null ? (
                  <>
                    <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                      <h6>Buisness Type</h6>
                    </div>
                    <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                      <h6>Renewal</h6>
                    </div>
                  </>
                ) : ("")
              }
              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6>Policy Type</h6>
              </div>

              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <select
                    name="polcy_type"
                    onChange={(e) => {
                      const selectedOption = e.target.options[e.target.selectedIndex];
                      const selectedId = selectedOption.getAttribute("id")
                      //console.log(selectedId, "selected option id")
                      handleSubmitMotorform("policy_id", selectedId)
                      handleProductFilter(e);
                    }}
                    className="form-control"
                  >
                    {policies.length > 0 &&
                      policies.map((item, i) => (
                        <option
                          selected={
                            motorFormsData?.polcy_type == item?.plan_for_name
                              ? item?.plan_for_name
                              : i === 0
                          }
                          value={item?.plan_for_name}
                          id={item?._id}
                        >
                          {item.plan_for_name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <h6>{motorFormsData?.polcy_type}</h6>
                )}
              </div>
              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6>Last Year Policy Type</h6>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <select
                    name="last_year_policy_type"
                    onChange={handleProductFilter}
                    className="form-control"
                  >
                    {lastyearpolicies.length > 0 &&
                      lastyearpolicies.map((item, i) => (
                        <option
                          selected={
                            motorFormsData?.last_year_policy_type ==
                              item?.policy_type_name
                              ? item?.policy_type_name
                              : i === 0
                          }
                          value={item?.policy_type_name}
                        >
                          {item?.policy_type_name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <h6>{motorFormsData?.last_year_policy_type}</h6>
                )}
              </div>

              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6>Model Year</h6>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <select
                    name="model_year"
                    onChange={handleProductFilter}
                    className="form-control"
                  >
                    {Years.length > 0 &&
                      Years.map((item, i) => (
                        <option
                          selected={
                            motorFormsData?.model_year == item?.year
                              ? item?.year
                              : i === 0
                          }
                          value={item?.year}
                        >
                          {item?.year}
                        </option>
                      ))}
                  </select>
                ) : (
                  <h6>{motorFormsData?.model_year}</h6>
                )}
              </div>
              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6>Maker</h6>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <div className="col-lg-12 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    {isEditMode ? (
                      <select
                        name="car_maker"
                        onChange={handleProductFilter}
                        className="form-control"
                      >
                        {CarMakers.length > 0 &&
                          CarMakers.map((item) => (
                            <option
                              selected={
                                motorFormsData.car_maker === item?._id
                                  ? item?._id
                                  : item?._id
                              }
                              value={item?._id}
                            >
                              {item?._id}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <h6>{motorFormsData?.car_maker}</h6>
                    )}
                  </div>
                ) : (
                  <h6>{motorFormsData?.car_maker}</h6>
                )}
              </div>
              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6>Model Detail</h6>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <select
                    name="car_model"
                    onChange={handleProductFilter}
                    className="form-control"
                  >
                    {CarModel.length > 0 &&
                      CarModel.map((item) => (
                        <option
                          selected={
                            motorFormsData.car_model == item?._id
                              ? item?._id
                              : item?._id
                          }
                          value={item?._id}
                        >
                          {item?._id}
                        </option>
                      ))}
                  </select>
                ) : (
                  <h6>{motorFormsData?.car_model}</h6>
                )}
              </div>
              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6>Vehicle Variant</h6>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <select
                    name="car_variant"
                    onChange={handleProductFilter}
                    className="form-control"
                  >
                    {CarVarient.length > 0 &&
                      CarVarient.map((item) => (
                        <option
                          selected={
                            item?._id === motorFormsData.car_variant
                              ? item?._id
                              : item?._id
                          }
                          value={item?._id}
                        >
                          {item?._id}
                        </option>
                      ))}
                  </select>
                ) : (
                  <h6>{motorFormsData?.car_variant}</h6>
                )}
              </div>
              {/* {minCarValue > 0 && ( */}
              {window.location.pathname === "/Quotes" ? (
                <>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    <h6>Vehicle Value ?</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                    {/* <h6>{"AED " + minCarValue}</h6> */}
                    <div className="slider custom-labels">
                      <Slider {...sliderProps} />
                      <div className="value">{formatkg(changehorizontal)}</div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6> First registration year</h6>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <select
                    name="registration_year"
                    onChange={handleProductFilter}
                    className="form-control"
                  >
                    {RegistrationYears.length > 0 &&
                      RegistrationYears.map((item, i) => (
                        <option
                          selected={
                            motorFormsData?.registration_year == item?.year
                              ? item?.year
                              : i === 0
                          }
                          value={item?.year}
                        >
                          {item?.year}
                        </option>
                      ))}
                  </select>
                ) : (
                  <h6>{motorFormsData?.registration_year}</h6>
                )}
              </div>
              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6>Area of Registration</h6>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <select
                    name="register_area"
                    onChange={handleProductFilter}
                    className="form-control"
                  >
                    {AreOfRegistrationYears.length > 0 &&
                      AreOfRegistrationYears.map((item, i) => (
                        <option
                          selected={
                            motorFormsData?.register_area ==
                              item?.area_of_registration_name
                              ? item?.area_of_registration_name
                              : i === 0
                          }
                          value={item?.area_of_registration_name}
                        >
                          {item?.area_of_registration_name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <h6>{motorFormsData?.register_area}</h6>
                )}
              </div>
            </div>
          </div>
          <h4 className="personal details">
            Personal Details
            {renewal != null ? ("") : window.location.pathname === "/Quotes" ? (
              <i
                onClick={handlePersonalEditModeToggle}
                className="fa fa-edit"
              ></i>
            ) : (
              <></>
            )}
          </h4>
          <div className="filterssas one two mb-5">
            {motorFormsData.policy_id === "645102bba95bd184969066b2" ? (
              <div className="row">
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>Name of Company</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={companynewFormdata?.name}
                      onChange={handleCompanyPersonalDetails}
                    />
                  ) : (
                    <h6>{motorFormsData?.name}</h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>Email of Contact person</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      disabled
                      value={motorFormsData?.email}
                    />
                  ) : (
                    <h6>{motorFormsData?.email}</h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>Phone Number</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <PhoneInput
                      style={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      }}
                      international
                      className="form-control"
                      defaultCountry="AE"
                      value={
                        companynewFormdata.phoneno || motorFormsData.phoneno
                      } // Use motorFormsData.phoneno instead of value
                      onChange={handleCompanyPhoneChange}
                    />
                  ) : (
                    <h6>{motorFormsData?.phoneno}</h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>Business Type</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 640 512"
                          >
                            {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                            <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 352h8.2c32.3-39.1 81.1-64 135.8-64c5.4 0 10.7 .2 16 .7V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM320 352H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H360.2C335.1 449.6 320 410.5 320 368c0-5.4 .2-10.7 .7-16l-.7 0zm320 16a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zM496 288c8.8 0 16 7.2 16 16v48h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H496c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16z" />
                          </svg>
                        </InputGroup.Text>
                        <select
                          className="form-control"
                          onChange={handleCompanyPersonalDetails}
                          id="businessType"
                          name="business_type"
                        >
                          {ArrayofBusinesstypes &&
                            ArrayofBusinesstypes.length > 0 ? (
                            <>
                              {ArrayofBusinesstypes.map((v, i) => {
                                return (
                                  <option
                                    selected={
                                      v === companynewFormdata.business_type
                                        ? v
                                        : i === 0 ||
                                          v === motorFormsData.business_type
                                          ? v
                                          : i === 0
                                    }
                                    value={v}
                                  >
                                    {v}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </select>
                      </InputGroup>
                    </>
                  ) : (
                    <h6>{motorFormsData?.business_type}</h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>Nationality</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <select
                      name="nationality"
                      onChange={handleCompanyPersonalDetails}
                      className="form-control"
                    >
                      {Countries.length > 0 &&
                        Countries.map((item, i) => (
                          <option
                            selected={
                              companynewFormdata?.nationality ===
                                item?.country_name
                                ? item?.country_name
                                : i === 0
                            }
                            value={item?.country_name}
                          >
                            {item?.country_name}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <h6>{motorFormsData?.nationality}</h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>How many years of claims do you have ?</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <select
                      name="last_year_claim"
                      onChange={handleCompanyPersonalDetails}
                      className="form-control"
                    >
                      {last_year_claimarray.length > 0 &&
                        last_year_claimarray.map((item, i) => (
                          <option
                            selected={
                              companynewFormdata?.last_year_claim == item?.year
                                ? item?.year
                                : i === 0
                            }
                            value={item?.year}
                          >
                            {item?.year}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <h6>{motorFormsData?.last_year_claim}</h6>
                  )}
                </div>
                {isPersonalEditMode && (
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <button
                      className="profileupadtes"
                      id="personalupdate"
                      onClick={UpdatePersonalDetails}
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>Name</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={newFormdata?.name}
                      onChange={handlePersonalDetails}
                    />
                  ) : (
                    <h6>{motorFormsData?.name}</h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>Email Address</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      disabled
                      value={motorFormsData?.email}
                      onChange={handlePersonalDetails}
                    />
                  ) : (
                    <h6>{motorFormsData?.email}</h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>Phone Number</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <PhoneInput
                      style={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      }}
                      international
                      className="form-control"
                      defaultCountry="AE"
                      value={newFormdata.phoneno || motorFormsData.phoneno} // Use motorFormsData.phoneno instead of value
                      onChange={handlePhoneChange}
                    />
                  ) : (
                    <h6>{motorFormsData?.phoneno}</h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>Date of Birth</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <DatePicker
                      placeholpderText={"Please Enter Date Of Birth"}
                      className="form-control"
                      selected={startDate || motorFormsData?.date_of_birth}
                      onChange={(date) => {
                        setStartDate(date);
                      }}
                    />
                  ) : (
                    <h6>
                      <Moment format="YYYY/MM/DD">
                        {motorFormsData?.date_of_birth}
                      </Moment>
                    </h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>Nationality</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <select
                      name="nationality"
                      onChange={handlePersonalDetails}
                      className="form-control"
                    >
                      {Countries.length > 0 &&
                        Countries.map((item, i) => (
                          <option
                            selected={
                              newFormdata?.nationality === item?.country_name
                                ? item?.country_name
                                : i === 0
                            }
                            value={item?.country_name}
                          >
                            {item?.country_name}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <h6>{motorFormsData?.nationality}</h6>
                  )}
                </div>
                {drivingExpString && (<>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                    <h6>UAE Driving Experience</h6>
                  </div>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                    {isPersonalEditMode ? (
                      <>
                        {DLexperience && DLexperience.length > 0 ? (
                          <select
                            className="form-control"
                            name="drivingexp"
                            onChange={handlePersonalDetails}
                          >
                            {DLexperience.map((v, i) => {
                              let drivingis =
                                i === 0 || i === 1
                                  ? { min: v?.min, max: v?.max }
                                  : { min: v?.min * 12, max: v?.max * 12 };
                              return (
                                <option
                                  key={i}
                                  selected={
                                    newFormdata.drivingexp?.min ==
                                      drivingis?.min &&
                                      newFormdata.drivingexp?.max == drivingis?.max
                                      ? drivingis?.max == 6 ||
                                        drivingis?.max == 12
                                        ? `${v?.min}-${v?.max} Months`
                                        : `${v?.min}-${v?.max} years`
                                      : i === 0
                                  }
                                  value={JSON.stringify(drivingis)}
                                >
                                  {i === 0 || i === 1
                                    ? `${v?.min}-${v?.max} Months`
                                    : `${v?.min}-${v?.max} years`}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <span>Data not found</span>
                        )}
                      </>
                    ) : (
                      <h6>{drivingExpString}</h6>
                    )}
                  </div>
                </>)}

                {/* {motorFormsData?.drivingexp < 13 && (
                <>
                  <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                    <h6>Driving Experience in UAE (Months)</h6>
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                    {motorFormsData?.drivingexpinuae && (
                      <h6>{drivingExpString} </h6>
                    )}
                  </div>
                </>
              )} */}

                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>How many years of claims do you have ?</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <select
                      name="last_year_claim"
                      onChange={handlePersonalDetails}
                      className="form-control"
                    >
                      {last_year_claimarray.length > 0 &&
                        last_year_claimarray.map((item, i) => (
                          <option
                            selected={
                              newFormdata?.last_year_claim == item?.year
                                ? item?.year
                                : i === 0
                            }
                            value={item?.year}
                          >
                            {item?.year}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <h6>{motorFormsData?.last_year_claim_year}</h6>
                  )}
                </div>
                {isPersonalEditMode && (
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <button
                      className="profileupadtes"
                      id="personalupdate"
                      onClick={UpdatePersonalDetails}
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FiltersById;