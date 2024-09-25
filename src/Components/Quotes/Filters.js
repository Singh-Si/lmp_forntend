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
import {
  AddMotoformDataEstimatedValue,
  fetchDrivingExperienceError,
  fetchDrivingExperienceSuccess,
  AddMotoformRenewelData,
  DeleteAllFromComapre,
} from "../../redux/reducers/MotoformDataReducerSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrayofBusinesstypes,
  getCardetailsById,
  getCarDetails,
  useFetch,
} from "../../functions";
import PhoneInput from "react-phone-number-input";
import { InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const CarsSpecificationArray = [{ label: "GCC Spec", value: "GCC" }, { label: "Non-GCC Spec/Modified", value: "NON-GCC" }]
const Filters = ({
  CarModel,
  setCarModel,
  setCarVarient,
  CarVarient,
  setCarMakers,
  CarMakers,
  handleProductFilter,
}) => {
  const dispatch = useDispatch();
  const motorFormsData = useSelector((state) => state.MotoformDataReducer);

  const { handleSubmitMotorform, } =
    UseMotorContext();
  const [Loading, setLoading] = useState(false);
  const [estimatedpolicyid, setestimatedpolicyid] = useState(motorFormsData.policy_id)

  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState("");
  const [lastyearpolicies, setlastyearpolicies] = useState([]);
  const [policies, setpolicies] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPersonalEditMode, setPersonalIsEditMode] = useState(false);
  const [DLexperience, setDLexperience] = useState([]);
  const [HomeDLexperience, setHomeDLexperience] = useState([]);
  const [Years, setYears] = useState([]);
  const [RegistrationYears, setRegistrationYears] = useState([]);
  const [AreOfRegistrationYears, setAreOfRegistrationYears] = useState([]);
  const [last_year_claimarray, setlast_year_claimarray] = useState([]);
  const [certificateexperince, setcertificateexperince] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [newFormdata, setnewFormdata] = useState({
    name: motorFormsData.name,
    phoneno: motorFormsData.phoneno,
    nationality: motorFormsData.nationality,
    date_of_birth: motorFormsData.date_of_birth,
    last_year_claim: motorFormsData.last_year_claim,
    drivingexp: motorFormsData.drivingexp,
    drivingexpinuae: motorFormsData.drivingexpinuae,
    claims_certificate_from_issurer: motorFormsData.claims_certificate_from_issurer,
  });
  const [companynewFormdata, setcompanynewFormdata] = useState({
    name: motorFormsData.name,
    phoneno: motorFormsData.phoneno,
    nationality: motorFormsData.nationality,
    businessTypeId: motorFormsData.businessTypeId
      ? motorFormsData.businessTypeId
      : null,
    last_year_claim: motorFormsData.last_year_claim,
  });

  const handleCompanyPersonalDetails = (e) => {
    ////console.log({ [e.target.name]: e.target.value });
    setcompanynewFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [countryresponse, CountriesLoading, countrieserrorError] = useFetch(
    API_URL + "/api/getAllNattionlity?lob=Motor"
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
  const [Businesstypes, setBusinesstypes] = useState([]);
  useEffect(() => {
    axios
      .get(API_URL + "/api/getActiveBusinessType")
      .then((response) => {
        ////console.log("response>>>>>>", response.data.data);
        response.data.data && setBusinesstypes(response.data.data);
      })
      .catch((error) => {
        ;
      });
  }, []);
  let last_year_claim_year = motorFormsData.last_year_claim_year
    ? motorFormsData.last_year_claim_year
    : 6;
  let last_year_claim_certificate_year =
    motorFormsData.last_year_claim_certificate_year
      ? motorFormsData.last_year_claim_certificate_year
      : 6;
  useEffect(() => {
    const date = new Date();
    const currentdate = date.getFullYear();

    const y = [];
    for (let i = currentdate; i >= 1970; i--) {
      y.push({ year: i });
    }
    setYears(y);
    const last_year_claimarray = [];
    for (let i = 0; i <= motorFormsData.last_year_claim_year; i++) {
      last_year_claimarray.push({ year: i });
    }
    const certificatey = [];
    for (let i = 0; i <= motorFormsData.last_year_claim_certificate_year + 1; i++) {
      certificatey.push({ year: i });
    }
    setcertificateexperince(certificatey);
    setlast_year_claimarray(last_year_claimarray);
    fetchdata();
  }, []);
  useEffect(() => {
    const rydate = parseInt(motorFormsData.Years)
    let ry = [{ year: rydate - 1 },
    { year: rydate },
    { year: rydate + 1 },];
    if (ry.length > 0) {
      console.log("ry", ry)
      // let isexistregistrationyear = ry.find(item => item.year == motorFormsData.estimatedregistration_year)
      // if (!isexistregistrationyear) {
      handleSubmitMotorform("estimatedregistration_year", ry[1]["year"])
      // }
      // console.log("Yeasrmodel", motorFormsData.registration_year, "isexistregistrationyear", isexistregistrationyear)
    } else {
      console.log("length is zero")
    }
    setRegistrationYears(ry);
  }, [motorFormsData.Years])
  useEffect(() => {
    if (motorFormsData.uaedrivingyear) {
      const experienceArray = [];
      for (let i = 0; i < motorFormsData.uaedrivingyear + 2; i++) {
        if (i === 0) {
          experienceArray.push({ min: 0, max: 6 });
        } else if (i === 1) {
          experienceArray.push({ min: 6, max: 12 });
        } else {
          experienceArray.push({ min: i - 1, max: i });
        }
      }
      setDLexperience(experienceArray);
    }
    if (motorFormsData.homedrivingyear) {
      const experienceArray = [];
      for (let i = 0; i < motorFormsData.homedrivingyear + 2; i++) {
        if (i === 0) {
          experienceArray.push({ min: 0, max: 6 });
        } else if (i === 1) {
          experienceArray.push({ min: 6, max: 12 });
        } else {
          experienceArray.push({ min: i - 1, max: i });
        }
      }
      setHomeDLexperience(experienceArray);
    }
  }, [motorFormsData.homedrivingyear, motorFormsData.uaedrivingyear]);
  useEffect(() => {
    (async () => {
      await axios
        .get(API_URL + "/api/motorClaimsYears")
        .then((res) => {
          dispatch(fetchDrivingExperienceSuccess(res.data.data)); // Update state on success
        })
        .catch((error) => {
          dispatch(fetchDrivingExperienceError()); // Update state on error
          ;
        });
    })();
  }, []);
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
            setCarMakers([{ _id: motorFormsData.car_maker }]);
          }
        })
        .catch((error) => {
          setCarMakers([{ _id: motorFormsData.car_maker }]);
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
            setCarModel([{ _id: motorFormsData.car_model }]);
          }
        })
        .catch((error) => {
          setCarModel([{ _id: motorFormsData.car_model }]);
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
              {
                _id: motorFormsData.car_variant,
                motor_model_detail_name: motorFormsData.CarvarientName
              },
            ]);

          } else {
            setCarVarient([{ _id: motorFormsData.car_variant, motor_model_detail_name: motorFormsData.CarvarientName }]);
          }
        })
        .catch((error) => {
          setCarVarient([{ _id: motorFormsData.car_variant, motor_model_detail_name: motorFormsData.CarvarientName }]);
          ;
        });
      await axios
        .post(API_URL + "/api/getCarEstimatedValue", {
          model_year: motorFormsData?.Years,
          car_maker: motorFormsData?.carMaker,
          car_model: motorFormsData.carModel,
          car_variant: motorFormsData.carVarient,
        })
        .then((response) => {
          if (response.data) {
            handleSubmitMotorform("estimatedminCarValue", response.data.minCarValue);
            handleSubmitMotorform("estimatedmaxCarValue", response.data.maxCarValue);
          }
        })
        .catch((error) => {
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
  const handleDateChange = (value) => {
    setnewFormdata((prev) => {
      return {
        ...prev,
        date_of_birth: value,
      };
    });
  };

  const UpdatePersonalDetails = async () => {
    let updatedData = {}
    if (motorFormsData.policy_id === "645102bba95bd184969066b2") {
      updatedData = {
        name:
          companynewFormdata.name !== ""
            ? companynewFormdata.name
            : motorFormsData.name,
        phoneno:
          companynewFormdata.phoneno !== ""
            ? companynewFormdata.phoneno
            : motorFormsData.phoneno,
        last_year_claim:
          newFormdata.last_year_claim !== ""
            ? newFormdata.last_year_claim
            : motorFormsData.last_year_claim,
        claims_certificate_from_issurer:
          newFormdata.claims_certificate_from_issurer !== ""
            ? newFormdata.claims_certificate_from_issurer
            : motorFormsData.claims_certificate_from_issurer,
        businessTypeId:
          companynewFormdata.businessTypeId !== ""
            ? companynewFormdata.businessTypeId
            : motorFormsData.businessTypeId,
        nationality:
          companynewFormdata.nationality !== ""
            ? companynewFormdata.nationality
            : motorFormsData.nationality,

        // passport_no: newpassport !== "" ? newpassport : motorFormsData.passport_no,
      };

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
        UpdatePolicy(updatedData)
      }
    } else {
      updatedData = {
        name: newFormdata.name !== "" ? newFormdata.name : motorFormsData.name,
        phoneno:
          newFormdata.phoneno !== ""
            ? newFormdata.phoneno
            : motorFormsData.phoneno,
        last_year_claim:
          newFormdata.last_year_claim !== ""
            ? newFormdata.last_year_claim
            : motorFormsData.last_year_claim,
        claims_certificate_from_issurer:
          newFormdata.claims_certificate_from_issurer !== ""
            ? newFormdata.claims_certificate_from_issurer
            : motorFormsData.claims_certificate_from_issurer,
        date_of_birth:
          newFormdata.date_of_birth !== null ? newFormdata.date_of_birth : motorFormsData.date_of_birth,
        drivingexp:
          newFormdata.drivingexp !== null
            ? newFormdata.drivingexp
            : motorFormsData.drivingexp,
        nationality:
          newFormdata.nationality !== null
            ? newFormdata.nationality
            : motorFormsData.nationality,
      };
      ////console.log(updatedData);
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
        UpdatePolicy(updatedData)
      }
    }
  };
  const UpdatePolicy = async (data) => {
    if (motorFormsData.businessentitytoken) {
      data["businessentitytoken"] = motorFormsData.businessentitytoken
    }
    await axios
      .put(
        `${API_URL}/api/updatePolicyDetails?id=${motorFormsData?.leadid}`,
        {
          ...data,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setPersonalIsEditMode(false);
        } else {
          return;
        }
      })
      .catch((error) => {
        if (error && error.response.status) {
          return error.response.status;
        }
      });
  }
  const [changehorizontal, setchangeHorizontal] = useState(
    motorFormsData.aslider_value
  );
  useEffect(() => {
    // This effect will run whenever minCarValu
    setchangeHorizontal(motorFormsData.aslider_value)
  }, [
    motorFormsData.minCarValue,
  ]);
  useEffect(() => {
    // This effect will run whenever minCarValu
    handleSubmitMotorform("aslider_value", changehorizontal);
  }, [
    changehorizontal,
  ]);
  useEffect(() => {
    if (motorFormsData.drivingexp && motorFormsData.drivingexp.max >= 24) {
      //console.log("maximum hai")
      handleSubmitMotorform("drivingexpinuae", null)
    }
  }, [
    motorFormsData.drivingexp,
  ]);
  const handleChangeHorizontal = (value) => {
    // ////console.log(value, "cjahsfuafasf");
    setchangeHorizontal(value);

  };
  //console.log("changehorizontal", changehorizontal)
  const sliderProps = useMemo(
    () => ({
      min: motorFormsData.minCarValue,
      max: motorFormsData.maxCarValue,
      value: changehorizontal,
      // format: formatkg,
      onChange: handleChangeHorizontal,
    }),

    [changehorizontal]
  );
  const handleCancelVehicleDetails = () => {
    dispatch(AddMotoformDataEstimatedValue({ name: "carMaker", value: motorFormsData.car_maker, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "carModel", value: motorFormsData.car_model, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "carVarient", value: motorFormsData.car_variant, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedCarvarientName", value: motorFormsData.CarvarientName, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "Years", value: motorFormsData.model_year, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedmpolcy_type", value: motorFormsData.polcy_type, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedlast_year_policy_type", value: motorFormsData.last_year_policy_type, }))
    estimatedpolicyid && handleSubmitMotorform("policy_id", motorFormsData.policy_id)
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedregistration_year", value: motorFormsData.registration_year, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedmregister_area", value: motorFormsData.register_area, }))
    dispatch(AddMotoformDataEstimatedValue({ name: "estimatedvehicle_specification", value: motorFormsData.vehicle_specification, }))

    setIsEditMode((prevEditMode) => !prevEditMode);
  }
  const handleCancelPersonelDetails = () => {
    setcompanynewFormdata({
      name: motorFormsData.name,
      phoneno: motorFormsData.phoneno,
      nationality: motorFormsData.nationality,
      businessTypeId: motorFormsData.businessTypeId
        ? motorFormsData.businessTypeId
        : null,
      last_year_claim: motorFormsData.last_year_claim,
      claims_certificate_from_issurer: motorFormsData.claims_certificate_from_issurer,
    })
    setnewFormdata({
      name: motorFormsData.name,
      phoneno: motorFormsData.phoneno,
      nationality: motorFormsData.nationality,
      date_of_birth: motorFormsData.date_of_birth,
      last_year_claim: motorFormsData.last_year_claim,
      drivingexp: motorFormsData.drivingexp,
      claims_certificate_from_issurer: motorFormsData.claims_certificate_from_issurer,
    })
    setPersonalIsEditMode((prevEditMode) => !prevEditMode);
  }
  const formatkg = (value) => formatAmount(value) + "AED";
  const formatPc = (p) => p + "%";
  const drivingExpMin = motorFormsData?.drivingexp?.min;
  const drivingExpMax = motorFormsData?.drivingexp?.max;
  const drivingExpString = motorFormsData.drivingexp
    ? drivingExpMax < 13
      ? drivingExpMin + "-" + drivingExpMax + " Months"
      : drivingExpMin / 12 + "-" + drivingExpMax / 12 + " year"
    : null;
  const drivingExpHomeMin = motorFormsData?.drivingexpinuae?.min;
  const drivingExpHomeMax = motorFormsData?.drivingexpinuae?.max;
  const drivingExpHomeString = motorFormsData.drivingexpinuae
    ? drivingExpHomeMax < 13
      ? drivingExpHomeMin + "-" + drivingExpHomeMax + " Months"
      : drivingExpHomeMin / 12 + "-" + drivingExpHomeMax / 12 + " year"
    : null;
  const handleUpdateVehicleDetails = async () => {
    try {

      if (motorFormsData.carMaker === "" || null) {
        if (CarMakers.length == 0) {
          swal({ text: "Please Enter Other Year", icon: "warning", })
        } else {
          swal({ text: "Please Enter Car Maker", icon: "warning", })
        }
      }
      else if (motorFormsData.carModel === "" || null) {
        if (CarModel.length == 0) {
          swal({ text: "Please Enter Other Car Maker", icon: "warning", })
        } else {
          swal({ text: "Please Enter Car Model", icon: "warning", })
        }
      }
      else if (motorFormsData.estimatedCarvarientName === "" || null) {
        if (CarVarient.length == 0) {
          swal({ text: "Please Enter Other Car Model", icon: "warning", })
        } else {
          swal({ text: "Please Enter Car Varient", icon: "warning", })
        }
      }
      else {

        setIsEditMode((prevEditMode) => !prevEditMode);
        console.log("estimatedmpolicy_id", motorFormsData.estimatedmpolicy_id)
        motorFormsData.carMaker && handleSubmitMotorform("car_maker", motorFormsData.carMaker)
        motorFormsData.carModel && handleSubmitMotorform("car_model", motorFormsData.carModel)
        motorFormsData.carVarient && handleSubmitMotorform("car_variant", motorFormsData.carVarient)
        motorFormsData.estimatedCarvarientName && handleSubmitMotorform("CarvarientName", motorFormsData.estimatedCarvarientName)
        motorFormsData.Years && handleSubmitMotorform("model_year", motorFormsData.Years)
        motorFormsData.estimatedminCarValue && handleSubmitMotorform("minCarValue", motorFormsData.estimatedminCarValue)
        motorFormsData.estimatedmaxCarValue && handleSubmitMotorform("maxCarValue", motorFormsData.estimatedmaxCarValue)
        motorFormsData.estimatedminCarValue && handleSubmitMotorform("aslider_value", motorFormsData.estimatedminCarValue)
        motorFormsData.estimatedpolcy_type && handleSubmitMotorform("polcy_type", motorFormsData.estimatedpolcy_type)
        motorFormsData.estimatedlast_year_policy_type && handleSubmitMotorform("last_year_policy_type", motorFormsData.estimatedlast_year_policy_type)
        estimatedpolicyid && handleSubmitMotorform("policy_id", estimatedpolicyid)
        motorFormsData.estimatedregistration_year && handleSubmitMotorform("registration_year", motorFormsData.estimatedregistration_year)
        motorFormsData.estimatedregister_area && handleSubmitMotorform("register_area", motorFormsData.estimatedregister_area)
        motorFormsData.estimatedvehicle_specification && handleSubmitMotorform("vehicle_specification", motorFormsData.estimatedvehicle_specification)
        handleSubmitMotorform("isupdated", true)
        const data = {
          car_maker: motorFormsData.carMaker,
          car_model: motorFormsData.carModel,
          car_variant: motorFormsData.carVarient,
          CarvarientName: motorFormsData.estimatedCarvarientName,
          model_year: motorFormsData.Years,
          minCarValue: motorFormsData.estimatedminCarValue,
          maxCarValue: motorFormsData.estimatedmaxCarValue,
          polcy_type: motorFormsData.estimatedpolcy_type,
          last_year_policy_type: motorFormsData.estimatedlast_year_policy_type,
          policy_id: motorFormsData.estimatedmpolicy_id,
          registration_year: motorFormsData.estimatedregistration_year,
          register_area: motorFormsData.estimatedregister_area,
        }
        console.log("data", data)
        UpdatePolicy(data)
      }
    } catch (error) {
      console.log(error)
    }

  }

  console.log("motorFormsData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", motorFormsData)


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
    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 filters">
      <h4 className="car details">
        Vehicle Details{" "}
        {window.location.pathname === "/Quotes" ? (
          <>
            <i className="fa fa-edit" onClick={handleEditModeToggle}></i>
            <Link
              className="buttonactions"
              style={{ padding: "6px 19px", marginLeft: "10%" }}
              to={"/Getquote"}
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
              Back
            </Link>
          </>
        )

          :

          window.location.pathname === "/Comparision" ? (
            <>
              <Link
                className="buttonactions"
                style={{ padding: "6px 19px", marginLeft: "10%" }}
                to={"/Quotes"}
              >
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
                Back
              </Link>
            </>
          )
            : (
              <></>
            )
        }
      </h4>
      {Loading ? (
        <>Loading</>
      ) : Error ? (
        <>{Message}</>
      ) : (
        <>
          <div className="filterssas one">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6>Policy Type</h6>
              </div>

              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  // <select
                  //   name="polcy_type"
                  //   onChange={(e) => {
                  //     const selectedOption =
                  //       e.target.options[e.target.selectedIndex];
                  //     const selectedId = selectedOption.getAttribute("id");
                  //     console.log(selectedId, "selected option id>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                  //     console.log(e.target.value, "e.target.value>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                  //    setestimatedpolicyid(selectedId)
                  //     dispatch(AddMotoformDataEstimatedValue("estimatedpolcy_type", e.target.value));
                  //     handleProductFilter(e);
                  //   }}
                  //   value={motorFormsData?.estimatedpolcy_type}
                  //   className="form-control"
                  // >
                  //   {policies.length > 0 &&
                  //     policies.map((item, i) => (
                  //       <option
                  //         value={item?.plan_for_name}
                  //         id={item?._id}
                  //       >
                  //         {item.plan_for_name}
                  //       </option>
                  //     ))}
                  // </select>
                  <input
                    className="form-control"
                    type="text"
                    name="polcy_type"
                    disabled
                    value={motorFormsData?.polcy_type}
                  />
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
                    value={motorFormsData?.estimatedlast_year_policy_type}
                  >
                    {lastyearpolicies.length > 0 &&
                      lastyearpolicies.map((item, i) => (
                        <option
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
                    value={motorFormsData.Years}
                  >
                    {Years.length > 0 &&
                      Years.map((item, i) => (
                        <option value={item?.year}>{item?.year}</option>
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
                        value={motorFormsData.carMaker}
                      >
                        {CarMakers.length > 0 &&
                          CarMakers.map((item) => (
                            <option value={item?._id}>{item?._id}</option>
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
                    value={motorFormsData.carModel}
                  >
                    {CarModel.length > 0 &&
                      CarModel.map((item) => (
                        <option value={item?._id}>{item?._id}</option>
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
                    id={motorFormsData?.carVarient}
                    value={motorFormsData?.estimatedCarvarientName}
                  >
                    {CarVarient.length > 0 &&
                      CarVarient.map((item) => (
                        <option
                          value={item?.motor_model_detail_name}
                          id={item?._id}
                        >
                          {item?.motor_model_detail_name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <h6>{motorFormsData?.CarvarientName}</h6>
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

              {/* )} */}

              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6> First registration year</h6>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <select
                    name="registration_year"
                    onChange={handleProductFilter}
                    value={motorFormsData?.estimatedregistration_year}
                    className="form-control"
                  >
                    {RegistrationYears.length > 0 &&
                      RegistrationYears.map((item, i) => (
                        <option
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
                            motorFormsData?.estimatedregister_area ==
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

              <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                <h6>Specification</h6>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                {isEditMode ? (
                  <select
                    name="vehicle_specification"
                    value={motorFormsData?.estimatedvehicle_specification}
                    onChange={handleProductFilter}
                    className="form-control"
                  >
                    {CarsSpecificationArray.length > 0 &&
                      CarsSpecificationArray.map((item, i) => (
                        <option
                          value={item?.value}
                        >
                          {item?.label}
                        </option>
                      ))}
                  </select>
                ) : (
                  <h6>{motorFormsData?.vehicle_specification}</h6>
                )}
              </div>
              {isEditMode && (
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <button
                      className="profileupadtes"
                      id="personalupdate"
                      onClick={handleUpdateVehicleDetails}
                    >
                      Update
                    </button>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <button
                      className="profileupadtes"
                      id="personalupdate"
                      onClick={handleCancelVehicleDetails}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <h4 className="personal details">
            Personal Details
            {window.location.pathname === "/Quotes" ? (
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
                          name="businessTypeId"
                        >
                          {Businesstypes && Businesstypes.length > 0 ? (
                            <>
                              {Businesstypes.map((v, i) => {
                                return (
                                  <option
                                    selected={
                                      v?._id ===
                                        companynewFormdata.businessTypeId
                                        ? v?.business_type_name
                                        : i === 0 ||
                                          v._id ===
                                          motorFormsData.businessTypeId
                                          ? v?.business_type_name
                                          : i === 0
                                    }
                                    value={v?._id}
                                  >
                                    {v?.business_type_name}
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
                    <h6>
                      {
                        Businesstypes.find(
                          (item) => item._id === motorFormsData?.businessTypeId
                        )?.business_type_name
                      }
                    </h6>
                    // <h6>{motorFormsData?.businessTypeId}</h6>
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
                                item?.nationality_name
                                ? item?.nationality_name
                                : i === 0
                            }
                            value={item?.nationality_name}
                          >
                            {item?.nationality_name}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <h6>{motorFormsData?.nationality}</h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>{motorFormsData.last_year_claim_question}</h6>
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
                    <h6>{motorFormsData?.last_year_claim}</h6>
                  )}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>{motorFormsData.last_year_claim_certificate_question}</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <select
                      name="claims_certificate_from_issurer"
                      onChange={handlePersonalDetails}
                      className="form-control"
                    >
                      {certificateexperince.length > 0 &&
                        certificateexperince.map((item, i) => (
                          <option
                            selected={
                              newFormdata?.claims_certificate_from_issurer == item?.year
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
                    <h6>{motorFormsData?.claims_certificate_from_issurer}</h6>
                  )}
                </div>
                {isPersonalEditMode && (
                  <div className="row">

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <button
                        className="profileupadtes"
                        id="personalupdate"
                        onClick={UpdatePersonalDetails}
                      >
                        Update
                      </button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <button
                        className="profileupadtes"
                        id="personalupdate"
                        onClick={handleCancelPersonelDetails}
                      >
                        Cancel
                      </button>
                    </div>
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
                      value={newFormdata.phoneno} // Use motorFormsData.phoneno instead of value
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
                      dateFormat="dd/MM/yyyy"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      selected={
                        newFormdata.date_of_birth
                          ? new Date(newFormdata?.date_of_birth)
                          : null
                      }
                      onChange={handleDateChange}
                    />
                  ) : (
                    <h6>
                      <Moment format="DD/MM/YYYY">
                        {new Date(motorFormsData?.date_of_birth)}
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
                              newFormdata?.nationality ===
                                item?.nationality_name
                                ? item?.nationality_name
                                : i === 0
                            }
                            value={item?.nationality_name}
                          >
                            {item?.nationality_name}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <h6>{motorFormsData?.nationality}</h6>
                  )}
                </div>
                {drivingExpString && (
                  <>
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
                                        newFormdata.drivingexp?.max ==
                                        drivingis?.max
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
                  </>
                )}
                {newFormdata.drivingexp?.max < 13 && drivingExpHomeString && (
                  <>
                    <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                      <h6>Home Driving Experience</h6>
                    </div>
                    <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                      {isPersonalEditMode ? (
                        <>
                          {HomeDLexperience && HomeDLexperience.length > 0 && newFormdata.drivingexp?.max < 13 ? (
                            <select
                              className="form-control"
                              name="drivingexpinuae"
                              onChange={handlePersonalDetails}
                            >
                              {HomeDLexperience.map((v, i) => {
                                let drivingis =
                                  i === 0 || i === 1
                                    ? { min: v?.min, max: v?.max }
                                    : { min: v?.min * 12, max: v?.max * 12 };
                                return (
                                  <option
                                    key={i}
                                    selected={
                                      newFormdata.drivingexpinuae?.min ==
                                        drivingis?.min &&
                                        newFormdata.drivingexpinuae?.max ==
                                        drivingis?.max
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
                        <h6>{drivingExpHomeString}</h6>
                      )}
                    </div>
                  </>
                )}


                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>{motorFormsData.last_year_claim_question}</h6>
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
                    <h6>{motorFormsData?.last_year_claim}</h6>
                  )}
                </div>
                {/* <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6">
                  <h6>{motorFormsData.last_year_claim_certificate_question}</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6">
                  {isPersonalEditMode ? (
                    <select
                      name="claims_certificate_from_issurer"
                      onChange={handlePersonalDetails}
                      className="form-control"
                    >
                      {certificateexperince.length > 0 &&
                        certificateexperince.map((item, i) => (
                          <option
                            selected={
                              newFormdata?.claims_certificate_from_issurer == item?.year
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
                    <h6>{motorFormsData?.claims_certificate_from_issurer}</h6>
                  )}
                </div> */}
                {isPersonalEditMode && (
                  <div className="row">

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <button
                        className="profileupadtes"
                        id="personalupdate"
                        onClick={UpdatePersonalDetails}
                      >
                        Update
                      </button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <button
                        className="profileupadtes"
                        id="personalupdate"
                        onClick={handleCancelPersonelDetails}
                      >
                        Cancel
                      </button>
                    </div>
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

export default Filters;
