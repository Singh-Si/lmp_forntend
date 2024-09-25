import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from ".";
import { PostData, UpdatePolicyByBE, getCardetailsByLeadid } from "./functions";
import swal from "sweetalert";
import {
  AddDataFromLeadid,
  AddMotoformData,
  initialState,
  AddMotorforminitialState,
} from "./redux/reducers/MotoformDataReducerSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddYacht, AddYachtEstimatedValue, yachtinitialState } from "./redux/reducers/YachtDataReducerSlice";
import { Form } from "react-router-dom";
import { set } from "firebase/database";

// eslint-disable-next-line
const MotorContext = React.createContext();
const MotorContextAppProvider = ({ children }) => {
  const insuranseTypids = {
    Motor: "6418643bf42eaf5ba1c9e0ef",
    Travel: "6418645df42eaf5ba1c9e0f6",
    Home: "641bf0a2cbfce023c8c76724",
    Yacht: "641bf0bbcbfce023c8c76739",
    Medical: "641bf214cbfce023c8c76762",
    Other_Insurance: "64defed43635b4f7b55fcd4b",
    Group_medical: "658bf04ed4c9b13ffb6ddb8a"
  }
  const [isLoading, setisLoading] = useState(false)
  const motorFormsData = useSelector((state) => state.MotoformDataReducer);
  const YachtFormsData = useSelector((state) => state.YachtReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    getYachttooltip()
    getmotortooltip()
    getTraveltooltip()
    getHometooltip()
    getIndividualtooltip()
    getOhterInsurancestooltip()
  }, [])
  // motorFormsData
  //  Add Motoformdata name and value
  const handleSubmitMotorform = (name, value) => {
    if (name == "polcy_type") {
      value == "Individual Name" && dispatch(AddMotoformData({ name: "businessTypeId", value: "" }));
    }
    dispatch(AddMotoformData({ name, value }));
  };

  function formatAmount(amount) {
    if (amount !== null) {
      const numericValue = parseFloat(amount.toString().replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        // Use toLocaleString with custom options for grouping
        return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });
      }
      return ''; // Return an empty string if the input is not a valid number
    }
    return ''; // Return an empty string if the input is null
  }

  // Submit MotorForm Data On Next
  const saveMotodata = {
    leadid: motorFormsData?.leadid,
    insuranceType: "Motor",
    name: motorFormsData?.name,
    email: motorFormsData?.email,
    phoneno: motorFormsData?.phoneno,
    instant_policy: motorFormsData?.instant_policy,
    policy_issued_date: motorFormsData?.policy_issued_date,
    paymentStatus: motorFormsData?.paymentStatus,
    finall_submit: motorFormsData?.finall_submit,
    your_electric_car: motorFormsData?.your_electric_car,

    buying_used_car: motorFormsData?.buying_used_car,

    car_brand_new: motorFormsData?.car_brand_new,
    polcy_type: motorFormsData?.polcy_type,
    last_year_policy_type: motorFormsData?.last_year_policy_type,
    model_year: motorFormsData?.model_year,
    car_maker: motorFormsData?.car_maker,
    car_model: motorFormsData?.car_model,
    car_variant: motorFormsData?.car_variant,
    register_area: motorFormsData?.register_area,
    registration_year: motorFormsData?.registration_year,
    vehicle_specification: motorFormsData?.vehicle_specification,
    date_of_birth: motorFormsData?.date_of_birth,
    nationality: motorFormsData?.nationality,
    drivingexp: motorFormsData?.drivingexp,
    drivingexpinuae: motorFormsData?.drivingexpinuae,
    repaire_type_name: motorFormsData?.repaire_type_name,
    your_existing_policy_expired: motorFormsData?.your_existing_policy_expired,
    last_year_claim: motorFormsData?.last_year_claim,
    bank_name: motorFormsData?.bank_name,
    current_insurance_company_id: motorFormsData?.current_insurance_company_id,
    location: window.location.pathname.replace("/", ""),
    minCarValue: motorFormsData?.minCarValue,
    maxCarValue: motorFormsData?.maxCarValue,
    claims_certificate_from_issurer: motorFormsData?.claims_certificate_from_issurer,
    businessTypeId: motorFormsData?.businessTypeId

  };
  // Submit MotorForm Data On Next
  const saveMotodataByBE = {
    leadid: motorFormsData?.oldleadid,
    insuranceType: "Motor",
    name: motorFormsData?.name,
    email: motorFormsData?.email,
    phoneno: motorFormsData?.phoneno,
    instant_policy: motorFormsData?.instant_policy,
    policy_issued_date: motorFormsData?.policy_issued_date,
    paymentStatus: motorFormsData?.paymentStatus,
    finall_submit: motorFormsData?.finall_submit,
    your_electric_car: motorFormsData?.your_electric_car,
    buying_used_car: motorFormsData?.buying_used_car,
    car_brand_new: motorFormsData?.car_brand_new,
    polcy_type: motorFormsData?.polcy_type,
    last_year_policy_type: motorFormsData?.last_year_policy_type,
    model_year: motorFormsData?.model_year,
    car_maker: motorFormsData?.car_maker,
    car_model: motorFormsData?.car_model,
    car_variant: motorFormsData?.car_variant,
    register_area: motorFormsData?.register_area,
    registration_year: motorFormsData?.registration_year,
    vehicle_specification: motorFormsData?.vehicle_specification,
    date_of_birth: motorFormsData?.date_of_birth,
    nationality: motorFormsData?.nationality,
    drivingexp: motorFormsData?.drivingexp,
    drivingexpinuae: motorFormsData?.drivingexpinuae,
    repaire_type_name: motorFormsData?.repaire_type_name,
    your_existing_policy_expired: motorFormsData?.your_existing_policy_expired,
    last_year_claim: motorFormsData?.last_year_claim,
    bank_name: motorFormsData?.bank_name,
    current_insurance_company_id: motorFormsData?.current_insurance_company_id,
    location: window.location.pathname.replace("/", ""),
    user: motorFormsData?.user,
    minCarValue: motorFormsData?.minCarValue,
    maxCarValue: motorFormsData?.maxCarValue,
    businessTypeId: motorFormsData?.businessTypeId
  };
  // Submit MotorForm Data On Next
  const saveYachtdata = {
    leadid: YachtFormsData?.leadid,
    insuranceType: "Yacht",
    instant_policy: YachtFormsData?.instant_policy,
    policy_issued_date: YachtFormsData?.policy_issued_date,
    repaire_type_name: YachtFormsData?.repaire_type_name,
    bank_name: YachtFormsData?.bank_name,
    location: window.location.pathname.replace("/", ""),
  };
  // Submit MotorForm Data On Next
  const saveYachtdataByBE = {
    leadid: YachtFormsData?.oldleadid,
    insuranceType: "Yacht",
    instant_policy: YachtFormsData?.instant_policy,
    policy_issued_date: YachtFormsData?.policy_issued_date,
    repaire_type_name: YachtFormsData?.repaire_type_name,
    bank_name: YachtFormsData?.bank_name,
    location: window.location.pathname.replace("/", ""),
    user: YachtFormsData?.user,
  };
  // Submit MotorForm Data On Next
  const fillInsurancePlan = async (obj) => {
    try {
      if (obj.businessTypeId && obj.businessTypeId === "") {
        delete obj.businessTypeId
      }
      const res = await axios.post(
        API_URL + "/api/fillInsurancePlan?email=" + motorFormsData?.email,
        {
          ...obj,
          location: window.location.pathname.replace("/", "")
        }
      );
      handleSubmitMotorform("leadid", res?.data?.data?._id);
      return res?.status;
    } catch (error) {
      if (error && error.response.status) {
        return error.response.status;
      }
    }
  };
  const UpdatePolicy = async (id, obj) => {
    if (obj.businessTypeId && obj.businessTypeId === "") {
      delete obj.businessTypeId
    }
    delete obj.businessentitytoken

    await axios
      .put(
        `${API_URL}/api/updatePolicyDetails?id=${id}`,
        {
          location: window.location.pathname.replace("/", ""),
          ...obj,
        }
      )
      .then((res) => {
        return res?.status;
      })
      .catch((error) => {
        if (error && error.response.status) {
          return error.response.status;
        }
      });
  }
  const HandleSubmitMotorFormdata = async (data) => {

    // let finall_submit = window.location.pathname === "/Getquote" ? true : false
    // let obj;
    // if (
    //   motorFormsData.oldleadid !== null &&
    //   motorFormsData.user === "customer"
    // ) {
    //   obj = {
    //     ...saveMotodata,

    //     businessentitytoken: motorFormsData?.businessentitytoken
    //   }
    //   await UpdatePolicy(motorFormsData.oldleadid, obj)
    // }
    // // Business Entity User
    // else if (motorFormsData.user === "BE" && motorFormsData.leadid !== null) {
    //   obj = {
    //     ...saveMotodata,
    //     businessentitytoken: motorFormsData?.businessentitytoken,
    //     finall_submit
    //   };
    //   await UpdatePolicy(motorFormsData.leadid, obj)

    // }
    // else if (motorFormsData.user === "customer" && motorFormsData.leadid !== null) {
    //   obj = {
    //     ...saveMotodata,
    //     businessentitytoken: motorFormsData?.businessentitytoken,
    //     finall_submit
    //   };
    //   await UpdatePolicy(motorFormsData.leadid, obj)

    // }
    // else {

    //   obj = {
    //     ...saveMotodata,
    //   };
    //   await fillInsurancePlan(obj);

    // }

    let finall_submit = window.location.pathname === "/Getquote" ? true : false
    let obj = {
      leadid: motorFormsData?.leadid,
      insuranceType: "Motor",
      name: motorFormsData?.name,
      email: motorFormsData?.email,
      phoneno: motorFormsData?.phoneno,
      instant_policy: motorFormsData?.instant_policy,
      policy_issued_date: motorFormsData?.policy_issued_date,
      paymentStatus: motorFormsData?.paymentStatus,
      finall_submit: motorFormsData?.finall_submit,
      your_electric_car: motorFormsData?.your_electric_car,
      buying_used_car: motorFormsData?.buying_used_car,
      car_brand_new: motorFormsData?.car_brand_new,
      polcy_type: motorFormsData?.polcy_type,
      last_year_policy_type: motorFormsData?.last_year_policy_type,
      model_year: motorFormsData?.model_year,
      car_maker: motorFormsData?.car_maker,
      car_model: motorFormsData?.car_model,
      car_variant: motorFormsData?.car_variant,
      CarvarientName: motorFormsData?.CarvarientName,
      register_area: motorFormsData?.register_area,
      registration_year: motorFormsData?.registration_year,
      vehicle_specification: motorFormsData?.vehicle_specification,
      date_of_birth: motorFormsData?.date_of_birth,
      nationality: motorFormsData?.nationality,
      drivingexp: motorFormsData?.drivingexp,
      drivingexpinuae: motorFormsData?.drivingexpinuae,
      repaire_type_name: motorFormsData?.repaire_type_name,
      your_existing_policy_expired: motorFormsData?.your_existing_policy_expired,
      last_year_claim: motorFormsData?.last_year_claim,
      bank_name: motorFormsData?.bank_name,
      current_insurance_company_id: motorFormsData?.current_insurance_company_id,
      location: window.location.pathname.replace("/", ""),
      user: motorFormsData?.user,
      minCarValue: motorFormsData?.minCarValue,
      maxCarValue: motorFormsData?.maxCarValue,
      businessTypeId: motorFormsData?.businessTypeId,
      finall_submit: finall_submit,
      claims_certificate_from_issurer: motorFormsData?.claims_certificate_from_issurer
    };
    if (motorFormsData?.businessentitytoken) {
      obj["businessentitytoken"] = motorFormsData?.businessentitytoken
    }

    if (motorFormsData?.businessLeadid) {
      await UpdatePolicy(motorFormsData?.businessLeadid, obj)
    } else if (data && data?.personeldetailppage) {
      await fillInsurancePlan(obj)
    } else if (motorFormsData?.leadid) {
      await UpdatePolicy(motorFormsData?.leadid, obj)
    }


  };
  // Submit MotorForm Data On When User Leaves Page

  const handleBeforeUnload = async (event) => {
    event.preventDefault();
    event.returnValue = "";
    //  For normal Customers
    HandleSubmitMotorFormdata();
  };
  // Save MotorForm Data On Changing details of Motoformdata field
  const SaveDetails = async () => {
    HandleSubmitMotorFormdata()
  };

  // end motorformdata
  // yacht Functions Declared
  const handlYachteSelect = (e) => {
    dispatch(AddYacht({ name: e.target.name, value: e.target.value }))

  };
  const handlYachteSelectFormValue = (name, val) => {
    dispatch(AddYacht({ name: [name], value: val }))
  };
  const handlYachtEstimatedSelect = (e) => {
    dispatch(AddYachtEstimatedValue({ name: "estimated" + e.target.name, value: e.target.value }))


  };
  const handlYachtestimatedSelectFormValue = (name, val) => {
    dispatch(AddYachtEstimatedValue({ name: ["estimated" + name], value: val }))
  };
  const handlePushYacht = (id, value, obj) => {
    if (YachtFormsData[obj].length > 0) {
      handlYachteSelectFormValue(obj, { id, bool: value })
    };
  }
  function convertToCamelCase(str) {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  const isYachtConditionChecked = (id, obj) => {
    const entry = YachtFormsData[obj].find((item) => item._id === id);

    // If entry exists and the value matches, return true (checked), else return false (unchecked)
    return entry ? entry.value : false;
  };
  // end Yacht Functions declatred
  // home insurance
  const getInitialHomeFormData = () => {
    // Check if data already exists in localStorage
    const storedFormData = localStorage.getItem("HomeInsurance");
    if (storedFormData) {
      return JSON.parse(storedFormData);
    } else {
      // Set your default values here
      return {
        line_of_business: 'Home',
        property_type: null,
        nationality: null,
        ownership_status: null,
        plan_type: null,
        content_value: '0',
        building_value: '0',
        personal_belongings_value: '0',
        noOfClaimYear: 0,
        domestic_value: 0,
        updatePolicy_id: null,
        plan_type_id: null,
        leadid: null,
        company_id: null,
        price: "Any",
        full_name: null,
        email: null,
        insurance_type: "Home",
        phone_number: '',
        date: null,
        address: {
          flatvillano: "",
          buildingname: "",
          streetname: "",
          area: "",
          emirate: "",
          pobox: "",
          makani: "",
        },
        home_condition: [],
        plan_category_id: null,
        insurance_company_id: null,
        nature_id: null,
        additional_filter: [],
        compare_date: [],
        full_compare_data: [],
        selected: [],
        bank_name: "",
        policy_issued_date: new Date(),
        user: 'customer',
        personalterms: false,
        navigatelocation: "",
      };
    }
  };

  const [HomeInsurance, setHomeInsurance] = useState(getInitialHomeFormData);

  const handleHomeInsurance = (e, val, nam) => {
    const value = e.target.value === "Any" ? null : e.target.value;
    const name = e.target.name;


    if (nam) {
      setHomeInsurance((prevState) => ({
        ...prevState,
        [nam]: val,
      }));
      localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
    } else {
      setHomeInsurance((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
    }
  };

  const handleHomeDate = (date) => {
    setHomeInsurance((prevState) => ({
      ...prevState,
      date: date,
    }));
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  const handleHomePhoneChange = (value) => {
    setHomeInsurance((prevState) => ({
      ...prevState,
      phone_number: value,
    }));
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  useEffect(() => {
    if (localStorage.getItem("HomeInsurance")) {
      setHomeInsurance(JSON.parse(localStorage.getItem("HomeInsurance")));
    }
  }, []);



  //Travell//
  const getInitialFormData = () => {
    // Check if data already exists in localStorage
    const formdata = localStorage.getItem('travelsFormsData')
    // const storedFormData = localStorage.getItem("travelsFormsData");
    if (formdata && formdata !== 'undefined') {
      return JSON.parse(formdata)
    } else {
      // Set your default values here
      return {
        line_of_business: 'Travel',

        finall_submit: false,
        name: '',
        phoneno: '',
        email: '',
        date_of_birth: null,
        family_details: [],
        passport_no: '',
        Beneficiary_name: '',
        Beneficiary_phoneno: '',
        Beneficiary_email: '',
        Beneficiary_date_of_birth: '',
        Beneficiary_passport_no: '',
        type_of_trip: '641d700e2e8acf350eaab204',
        nationality: "",
        start_date: new Date(),
        end_date: new Date(),
        no_of_travel: '365',
        plan_type: '641d41e519807a3c58191f8a',
        travel_insurance_for: '641c25df29b5921dc20ff9eb',
        oldleadid: null,
        leadid: null,
        user: 'customer',
        businessentitytoken: null,
        travel_beneficiary_details: [],
        personalterms: false,
        nationality_id: '',
        noOfChild: '',
        noOfSpouse: '',
        coupon_code: '',
        discountvalue: null,
        coupon_code_data: null,
      }
    }
  }

  const [travelsFormsData, settravelsFormsData] = useState(getInitialFormData)
  const [travelsFormsData1, setTravelsFormsData1] = useState(getInitialFormData)
  const UpdateTravelFormdata = () => {
    const UpdateTravelFormdata = { ...travelsFormsData }
    UpdateTravelFormdata?.getInitialFormData()
    settravelsFormsData(UpdateTravelFormdata)
  }
  const saveTraveldatabyBE = {
    insuranceType: 'Travel',
    leadid: motorFormsData?.oldleadid,
    name: travelsFormsData?.name,
    phoneno: travelsFormsData?.phoneno,
    email: travelsFormsData?.email,
    date_of_birth: travelsFormsData?.date_of_birth,
    family_details: travelsFormsData?.family_details,
    type_of_trip: travelsFormsData?.type_of_trip,
    plan_type: travelsFormsData?.plan_type,
    travel_insurance_for: travelsFormsData?.travel_insurance_for,
    passport_no: travelsFormsData?.passport_no,
    Beneficiary_name: travelsFormsData?.Beneficiary_name,
    Beneficiary_phoneno: travelsFormsData?.Beneficiary_phoneno,
    Beneficiary_email: travelsFormsData?.Beneficiary_email,
    Beneficiary_date_of_birth: travelsFormsData?.Beneficiary_date_of_birth,
    Beneficiary_passport_no: travelsFormsData?.Beneficiary_passport_no,
    nationality: travelsFormsData?.nationality,
    start_date: travelsFormsData?.start_date,
    end_date: travelsFormsData?.end_date,
    location: window.location.pathname.replace('/', ''),
    user: travelsFormsData?.user,
    businessentitytoken: travelsFormsData?.businessentitytoken,
    // personalterms: travelsFormsData.personalterms,

  }
  const saveTraveldata = {
    insuranceType: 'Travel',
    leadid: travelsFormsData?.leadid,
    name: travelsFormsData?.name,
    phoneno: travelsFormsData?.phoneno,
    email: travelsFormsData?.email,
    date_of_birth: travelsFormsData?.date_of_birth,
    passport_no: travelsFormsData?.passport_no,
    family_details: travelsFormsData?.family_details,
    type_of_trip: travelsFormsData?.type_of_trip,
    plan_type: travelsFormsData?.plan_type,
    updatePolicy_id: travelsFormsData?.updatePolicy_id,
    travel_insurance_for: travelsFormsData?.travel_insurance_for,
    Beneficiary_name: travelsFormsData?.Beneficiary_name,
    Beneficiary_phoneno: travelsFormsData?.Beneficiary_phoneno,
    Beneficiary_email: travelsFormsData?.Beneficiary_email,
    Beneficiary_date_of_birth: travelsFormsData?.Beneficiary_date_of_birth,
    Beneficiary_passport_no: travelsFormsData?.Beneficiary_passport_no,
    nationality: travelsFormsData?.nationality,
    start_date: travelsFormsData?.start_date,
    end_date: travelsFormsData?.end_date,
    location: window.location.pathname.replace('/', ''),
    user: travelsFormsData?.user,
    businessentitytoken: travelsFormsData?.businessentitytoken,
    // personalterms: travelsFormsData.personalterms,
  }
  const fillInsuranceTravel = async (obj) => {
    try {
      if (obj.businessTypeId && obj.businessTypeId === "") {
        delete obj.businessTypeId
      }
      const res = await axios.post(
        API_URL + "/api/fillInsurancePlan?email=" + travelsFormsData?.email,
        {
          ...obj,
          location: window.location.pathname.replace("/", "")
        }
      );
      settravelsFormsData((prev) => ({
        ...prev,
        leadid: res?.data?.data?._id
      }))
      localStorage.setItem('travelsFormsData', JSON.stringify(travelsFormsData))
    } catch (error) {
      if (error && error.response.status) {
        return error.response.status;
      }
    }
  }
  const HandleSubmitTravelFormdata = async (objData) => {
    console.log("check travel p[ersonal")
    console.log("travelsFormsData Location", travelsFormsData.locationname)
    console.log("travelsFormsData businessLeadid", travelsFormsData.businessLeadid)
    console.log("travelsFormsData leadid", travelsFormsData.leadid)
    let obj = {
      insuranceType: 'Travel',
      // location: window.location.pathname.replace("/", ""),
      ...objData,
    }
    if (travelsFormsData?.businessentitytoken) {
      obj["businessentitytoken"] = travelsFormsData?.businessentitytoken
    }
    if (travelsFormsData?.leadid) {
      obj["leadid"] = travelsFormsData?.leadid
    }
    if (travelsFormsData?.businessLeadid) {
      obj["businessLeadid"] = travelsFormsData?.businessLeadid
      console.log("check travel updatepolicy")
      await UpdatePolicy(travelsFormsData?.businessLeadid, obj)
    } else if (obj.locationname && obj.locationname === "Travelpersonalform") {
      console.log("check travel updatepolicy")
      await fillInsuranceTravel(obj)
    } else if (travelsFormsData?.leadid) {
      console.log("check travel updatepolicy")
      await UpdatePolicy(travelsFormsData?.leadid, obj)
    }
  }


  const handleBeforeunload = async (event) => {
    event.preventDefault()
    event.returnValue = ''
    //  For normal Customers
    HandleSubmitTravelFormdata()
  }
  // Save MotorForm Data On Changing details of Motoformdata field
  const Savedetails = async () => {
    HandleSubmitTravelFormdata()
  }


  const [location, setlocation] = useState(window.location.pathname.replace('/', ''))

  useEffect(() => {
    localStorage.setItem('travelsFormsData', JSON.stringify(travelsFormsData))
    localStorage.setItem('location', window.location.pathname.replace('/', ''))
    const value = localStorage.getItem('location')
    setlocation(value)
  }, [travelsFormsData])

  useEffect(() => {
    localStorage.setItem('travelsFormsData', JSON.stringify(travelsFormsData))
  }, [travelsFormsData])



  const getInitialCompareData = () => {
    // Check if data already exists in localStorage
    const storedCompareData = localStorage.getItem('compareselect')
    if (storedCompareData) {
      return JSON.parse(storedCompareData)
    } else {
      // Set your default values here
      return []
    }
  }
  const getInitialCompareMatchData = () => {
    // Check if data already exists in localStorage
    const storedCompareMatchData = localStorage.getItem('comparematch')
    if (storedCompareMatchData) {
      return JSON.parse(storedCompareMatchData)
    } else {
      // Set your default values here
      return []
    }
  }
  useEffect(() => {
    if (localStorage.getItem(`compareselect`)) {
      let clientCompareData = JSON.parse(localStorage.getItem('compareselect'))
      setCompareselect(clientCompareData)
    }
    if (localStorage.getItem(`comparematch`)) {
      let clientCompareMatchData = JSON.parse(localStorage.getItem('comparematch'))
      setComparematch(clientCompareMatchData)
    }
  }, [])

  const [compareselect, setCompareselect] = useState(getInitialCompareData)
  const [comparematch, setComparematch] = useState(getInitialCompareMatchData)

  useEffect(() => {
    localStorage.setItem('compareselect', JSON.stringify(compareselect))
    localStorage.setItem('comparematch', JSON.stringify(comparematch))
  }, [compareselect, comparematch])
  // Individual Insurance

  const getInitialIndividualFormData = () => {
    // Check if data already exists in localStorage
    const storedFormData = localStorage.getItem("IndividualInsurance");
    if (storedFormData) {
      return JSON.parse(storedFormData);
    } else {
      // Set your default values here
      return {
        isselecctcontactterms: false,
        medical_policy_active: true,
        medical_current_insurer: null,
        medical_current_insurer_expiry_date: null,
        full_name: null,
        email: null,
        phone_number: null,
        date: null,
        gender: null,
        nationality: null,
        nationality_id: null,
        insuranceType: "Medical",
        emirates_id: null,
        visa_id: [],
        salary_id: [],
        height: null,
        weight: null,
        insurance_company_id: null,
        nature_id: null,
        plan_category_id: null,
        additional_filter: null,
        selectFilter: null,
        company_id: null,
        final_price: null,
        plan_type_id: null,
        updatePolicy_id: null,
        leadid: null,
        symptom_condition: [],
        symptom_condition_visit: false,
        maternity_condition: [],
        maternity_condition_visit: false,
        medical_general_condition: [],
        general_condition_visit: false,
        medical_under_condition: [],
        underwritting_condition_visit: false,
        standard_condition: [],
        bank_name: null,
        policy_issued_date: new Date(),
        compare_date: [],
        compare_data: [],
        selected: [],
        location: window.location.pathname.replace("/", ""),
        price: "Lowest Price",
        termcondition: false,
        coupon_code: '',
        discountvalue: null,
        coupon_code_data: null,
        lastMenstrualPeriodDate: null,
      };
    }
  };
  const [IndividualInsurance, setIndividualInsurance] = useState(
    getInitialIndividualFormData
  );

  const handleIndividualInsurance = async(e, val, nam) => {
    const value = e.target.value === "Any" ? null : e.target.value;
    const name = e.target.name;
    console.log("name check",name)
    console.log("nam check", nam)
    if (nam) {
      setIndividualInsurance((prevState) => ({
        ...prevState,
        [nam]: val,
      }));
      localStorage.setItem(
        "IndividualInsurance",
        JSON.stringify(IndividualInsurance)
      );
    } else {
      setIndividualInsurance((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      localStorage.setItem(
        "IndividualInsurance",
        JSON.stringify(IndividualInsurance)
      );
    }
  };

  const handleIndividualDate = (date) => {
    setIndividualInsurance((prevState) => ({
      ...prevState,
      date: date,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  };

  const handleIndividualPhoneChange = (value) => {
    setIndividualInsurance((prevState) => ({
      ...prevState,
      phone_number: value,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  };

  useEffect(() => {
    if (localStorage.getItem("IndividualInsurance")) {
      setIndividualInsurance(
        JSON.parse(localStorage.getItem("IndividualInsurance"))
      );
    }
  }, []);
  // Submit IndividualForm Data On Next
  const fillInsuranceIndividual = async (obj) => {

    await axios.post(
      API_URL + "/api/fillInsurancePlan?email=" + obj.email,
      {

        ...obj,
        insuranceType: "Medical"

      }
    ).then((response) => {
      console.log("response", response?.status)
      console.log(" response.data.data._id", response?.data?.data?._id)
      if (response.status === 200) {
        setIndividualInsurance((prevState) => ({
          ...prevState,
          updatePolicy_id: response?.data?.data?._id,
          leadid: response?.data?.data?._id,
        }));
        // localStorage.setItem(
        //   "IndividualInsurance",
        //   JSON.stringify(IndividualInsurance)
        // );
        localStorage.setItem(
          "IndividualInsurance",
          JSON.stringify({ ...IndividualInsurance, updatePolicy_id: response?.data?.data?._id, leadid: response?.data?.data?._id })
        );
      }
    }).catch((error) => {
      if (error && error.response.status) {
        return error.response.status;
      }
    })
  }

  const getInitialGroupFormData = () => {
    // Check if data already exists in localStorage
    const storedFormData = localStorage.getItem("groupInsurance");
    if (storedFormData) {
      return JSON.parse(storedFormData);
    } else {
      // Set your default values here
      return {
        insuranceType: "Group Medical",
        lead_id: '',
        firstName: '',
        middleName: '',
        lastnName: '',
        employeeNumber: '',
        email: '',
        phoneno: '',
        dateOfBirth: null,
        gender: '',
        maritalStatus: '',
        relation: '',
        category: '',
        regino: '',
        LSB: '',
        nationality: '',
        passportNumber: '',
        EidNumber: '',
        UidNumber: '',
        visaIssuedLocation: '',
        actualSalryBand: '',
        personCommission: '',
        residentialLocation: '',
        workLocation: '',
        photoFileName: '',
        sponsorType: '',
        sponsorId: '',
        sponsorContactNumber: '',
        sponsorContactEmail: '',
        occupation: '',
        AdditionEffectiveDate: null,
        visaFileNumber:'',
        birthCertificateNumber: '',
        siNumber: '',
        lead_status: '',
        planName: '',
        type_of_policy: null,
        plan_company_id: null,
        plan_id: null,
      };
    }
  };
  const [groupInsurance, setGroupInsurance] = useState(
    getInitialGroupFormData
  );

  useEffect(() => {
    if (localStorage.getItem("groupInsurance")) {
      setGroupInsurance(
        JSON.parse(localStorage.getItem("groupInsurance"))
      );
    }
  }, []);
  // Submit IndividualForm Data On Next
  const fillInsuranceGroup = async (obj) => {

    await axios.post(
      API_URL + "/api/fillInsurancePlan?email=" + obj.email,
      {

        ...obj,
        insuranceType: "Medical"

      }
    ).then((response) => {
      console.log("response", response?.status)
      console.log(" response.data.data._id", response?.data?.data?._id)
      if (response.status === 200) {
        setIndividualInsurance((prevState) => ({
          ...prevState,
          updatePolicy_id: response?.data?.data?._id,
          leadid: response?.data?.data?._id,
        }));
        // localStorage.setItem(
        //   "IndividualInsurance",
        //   JSON.stringify(IndividualInsurance)
        // );
        localStorage.setItem(
          "IndividualInsurance",
          JSON.stringify({ ...IndividualInsurance, updatePolicy_id: response?.data?.data?._id, leadid: response?.data?.data?._id })
        );
      }
    }).catch((error) => {
      if (error && error.response.status) {
        return error.response.status;
      }
    })
  }
    





  const fillInsuranceYacht = async (obj) => {
    try {
      delete obj.leadid
      delete obj.personelform
      const res = await axios.post(
        API_URL + "/api/fillInsurancePlan?email=" + YachtFormsData?.email,
        {
          ...obj,
        }
      );
      handlYachteSelectFormValue("leadid", res?.data?.data?._id);
    } catch (error) {
      if (error && error.response.status) {
        return error.response.status;
      }
    }
  }


  const HandleSubmitIndividualFormdata = async (FormData, data) => {
    console.log("location", window.location.pathname.replace("/", ""))
    let obj = {
      location: window.location.pathname.replace("/", ""),
      insuranceType: "Medical",
      BECommission: IndividualInsurance.BECommission,
      ...FormData,
    }
    // 
    if (IndividualInsurance.businessentitytoken) {
      obj["businessentitytoken"] = IndividualInsurance.businessentitytoken
    }

    if (IndividualInsurance.updatePolicy_id) {
      obj["updatePolicy_id"] = IndividualInsurance.updatePolicy_id
    }
    if (IndividualInsurance.businessLeadid) {
      if (obj.location === "Individualinsurancepersonaldetails") {
        obj["location"] = "Individualcountry"
      }
      await UpdatePolicy(IndividualInsurance.businessLeadid, obj)
    } else if (obj.location === "Individualinsurancepersonaldetails") {
      obj["location"] = "Individualcountry"
      await fillInsuranceIndividual(obj)
    } else if (IndividualInsurance.leadid) {
      await UpdatePolicy(IndividualInsurance.leadid, obj)
    }
  }

  const HandleSubmitGroupFormdata = async (FormData, data) => {
    console.log("location", window.location.pathname.replace("/", ""))
    let obj = {
      location: window.location.pathname.replace("/", ""),
      insuranceType: "Medical",
      ...FormData,
    }
    // 
    if (groupInsurance.businessentitytoken) {
      obj["businessentitytoken"] = groupInsurance.businessentitytoken
    }

    if (groupInsurance.updatePolicy_id) {
      obj["updatePolicy_id"] = groupInsurance.updatePolicy_id
    }
    if (groupInsurance.businessLeadid) {
      if (obj.location === "Individualinsurancepersonaldetails") {
        obj["location"] = "Individualcountry"
      }
      await UpdatePolicy(groupInsurance.businessLeadid, obj)
    } else if (obj.location === "Individualinsurancepersonaldetails") {
      obj["location"] = "Individualcountry"
      await fillInsuranceGroup(obj)
    } else if (groupInsurance.leadid) {
      await UpdatePolicy(groupInsurance.leadid, obj)
    }
  }

  const handlYachteSelectFormValuedata = async (FormData) => {

    console.log("FormData>>>>>", FormData)
    if (YachtFormsData?.leadid) {
      FormData["leadid"] = YachtFormsData?.leadid
    }
    if (YachtFormsData?.businessentitytoken) {
      FormData["businessentitytoken"] = YachtFormsData?.businessentitytoken
    }
    console.log("FormData", FormData)
    FormData.insuranceType = "Yatch"
    if (YachtFormsData?.businessLeadid) {
      FormData["businessLeadid"] = YachtFormsData?.businessLeadid
      await UpdatePolicy(YachtFormsData?.businessLeadid, FormData)
    } else if (FormData?.personelform) {
      await fillInsuranceYacht(FormData)
    } else if (YachtFormsData?.leadid) {
      await UpdatePolicy(YachtFormsData?.leadid, FormData)
    }

  };
  //End  Submit IndividualForm Data On Next
  // Submit IndividualForm Data On Next
  const fillInsuranceHome = async (obj) => {
    obj.leadid && delete obj.leadid
    obj.leadid && delete obj.leadid
    await axios.post(
      API_URL + "/api/fillInsurancePlan?email=" + HomeInsurance.email,
      {
        location: window.location.pathname.replace("/", ""),
        ...obj,

      }
    ).then((response) => {
      console.log(response)
      setHomeInsurance((prevState) => ({
        ...prevState,
        updatePolicy_id: response?.data?.data?._id,
        leadid: response?.data?.data?._id,
      }));
      localStorage.setItem(
        "HomeInsurance",
        JSON.stringify(HomeInsurance)
      );
    }).catch((error) => {

    })
  }
  const HandleSubmitHomeFormdata = async (FormData) => {

    if (FormData?.content_value) {
      FormData["content_value"] = String(FormData["content_value"]).replace(",", "");
      FormData["content_value"] = parseInt(FormData["content_value"]);
    }
    if (FormData?.personal_belongings_value) {
      FormData["personal_belongings_value"] = String(FormData["personal_belongings_value"]).replace(",", "");
      FormData["personal_belongings_value"] = parseInt(FormData["personal_belongings_value"]);
    }
    if (FormData?.building_value) {
      FormData["building_value"] = String(FormData["building_value"]).replace(",", "");
      FormData["building_value"] = parseInt(FormData["building_value"]);
    }
    let obj = {
      ...FormData,
    };
    if (HomeInsurance.leadid) {
      obj["leadid"] = HomeInsurance.leadid
    }
    if (obj.businessTypeId) {
      obj["businessTypeId"] = obj.businessTypeId
    }
    if (HomeInsurance.businessentitytoken) {
      obj["businessentitytoken"] = HomeInsurance.businessentitytoken
    }
    obj["insuranceType"] = "Home"
    if (HomeInsurance.businessLeadid) {
      if (window.location.pathname === "/Homepersonaldetails") {
        obj["location"] = "Homeaddress"
      }
      await UpdatePolicy(HomeInsurance.businessLeadid, obj)
    } else if (window.location.pathname === "/Homepersonaldetails") {
      obj["location"] = "Homeaddress"
      await fillInsuranceHome(obj)
    } else if (HomeInsurance.leadid) {
      await UpdatePolicy(HomeInsurance.leadid, obj)
    }

  };
  //End  Submit IndividualForm Data On Next

  // other insurance
  const getInitialOtherFormData = () => {
    // Check if data already exists in localStorage
    const storedFormData = localStorage.getItem("OtherInsurance");
    if (storedFormData) {
      return JSON.parse(storedFormData);
    } else {
      // Set your default values here
      return {
        other_insurance_option: null,
        full_name: null,
        email: null,
        age: null,
        phone_number: null,
        brief_info: null,
        prefer_day_to_call: null,
        prefer_time_to_call: null,
        insuranceType: "Other",
      };
    }
  };
  const [OtherInsurance, setOtherInsurance] = useState(getInitialOtherFormData);



  const handleOtherInsurance = (e) => {
    const value = e.target.value;
    const name = e.target.name;


    setOtherInsurance((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    localStorage.setItem("OtherInsurance", JSON.stringify(OtherInsurance));
  };

  // useEffect(() => {
  //   if (localStorage.getItem("OtherInsurance")) {
  //     setOtherInsurance(JSON.parse(localStorage.getItem("OtherInsurance")));
  //   }
  // }, [OtherInsurance.leadid]);
  // get business token or leadid 


  useEffect(() => {
    setisLoading(true)
    const fetchData = async () => {
      try {

        const url = new URLSearchParams(window.location.search);

        if (url.get('leadid')) {

          await getCardetailsByLeadid(url.get('leadid')).then(async (response) => {
            switch (response.type_of_policy) {
              case insuranseTypids.Motor:
                dispatch(AddMotorforminitialState())
                localStorage.removeItem("MotoformData");
                dispatch(AddMotoformData({ name: 'user', value: 'customer' }))
                dispatch(AddMotoformData({ name: 'leadid', value: url.get('leadid') }))
                dispatch(AddMotoformData({ name: 'name', value: response.name }))
                dispatch(AddMotoformData({ name: 'aslider_value', value: response["minCarValue"] ? response["minCarValue"] : 0 }));
                for (const key in response) {
                  if (response.hasOwnProperty(key) && initialState.hasOwnProperty(key) && key !== "location") {
                    // Dispatch an action to update the Redux state
                    dispatch(AddMotoformData({ name: key, value: response[key] }));
                    dispatch(AddMotoformData({ name: "estimated" + key, value: response[key] }));
                  }
                }
                dispatch(AddMotoformData({ name: 'carMaker', value: response.car_maker ? response.car_maker : null }));
                dispatch(AddMotoformData({ name: 'carModel', value: response.car_model ? response.car_model : null }));
                dispatch(AddMotoformData({ name: 'carVariant', value: response.car_variant ? response.car_variant : null }));
                dispatch(AddMotoformData({ name: 'Years', value: response.model_year ? response.model_year : "2024" }));
                await axios.get(API_URL + "/api/getPlanFor").then((res) => {
                  let planFor = res?.data?.data;
                  if (res?.data?.data?.length > 0) {
                    const singlepantype = planFor[0]
                    let exist = planFor.find((item) => item.plan_for_name === response.polcy_type)

                    if (exist) {
                      dispatch(AddMotoformData({ name: 'estimatedmplan_type', value: exist.plan_for_name }));
                      dispatch(AddMotoformData({ name: 'polcy_type', value: exist.plan_for_name }));
                      dispatch(AddMotoformData({ name: 'policy_id', value: exist._id }));
                    } else {
                      dispatch(AddMotoformData({ name: 'estimatedmplan_type', value: singlepantype.plan_for_name }));
                      dispatch(AddMotoformData({ name: 'polcy_type', value: singlepantype.plan_for_name }));
                      dispatch(AddMotoformData({ name: 'policy_id', value: singlepantype._id }));
                    }
                  }
                }).catch((error) => {
                  console.log(error)
                })
                console.log("yes motor ", response.type_of_policy);
                break;
              case insuranseTypids.Travel:
                settravelsFormsData((prevState) => ({
                  ...prevState,
                  user: 'customer',
                  oldleadid: url.get('leadid'),
                  leadid: url.get('leadid'),
                  email: response.email !== null || "" ? response.email : null,
                  name: response.name !== null || "" ? response.name : "",
                  type_of_trip: response.travel_trip_type ? response?.travel_trip_type : "641d700e2e8acf350eaab204",
                  plan_type: response.travel_plan_type ? response?.travel_plan_type : "641d41e519807a3c58191f8a",
                  travel_insurance_for: response.travel_insurance_for ? response?.travel_insurance_for : "641c25df29b5921dc20ff9eb", date_of_birth: response.date_of_birth ? response.date_of_birth : new Date(),
                  phone_no: response.phoneno !== null || "" ? response.phoneno : null,
                  no_of_travel: response.no_of_travel ? response?.no_of_travel : "365",
                  start_date: response.travel_start_date ? response?.travel_start_date : new Date(),
                  end_date: response.travel_end_date ? response?.travel_end_date : new Date(),
                  Beneficiary_name: response.travel_beneficiary_details.length > 0 ? response?.travel_beneficiary_details[0].Name : null,
                  Beneficiary_phoneno: response.travel_beneficiary_details.length > 0 ? response?.travel_beneficiary_details[0].phoneNumber : null,
                  Beneficiary_email: response.travel_beneficiary_details.length > 0 ? response?.travel_beneficiary_details[0].email : null,
                  Beneficiary_passport_no: response.travel_beneficiary_details.length > 0 ? response?.travel_beneficiary_details[0].passportNumber : null,
                  nationality: response.nationality ? response.nationality : null,
                  family_details: response.travel_family_details.length > 0 ? response?.travel_family_details : [],
                  passport_no: response.passport_no !== null || "" ? response.passport_no : "",

                }))

                setTravelsFormsData1((prevState) => ({
                  ...prevState,
                  user: 'customer',
                  oldleadid: url.get('leadid'),
                  leadid: url.get('leadid'),
                  passport_no: response.passport_no !== null || "" ? response?.passport_no : "",
                  email: response.email !== null || "" ? response?.email : null,
                  name: response.name !== null || "" ? response?.name : "",
                  type_of_trip: response.travel_trip_type ? response?.travel_trip_type : "641d700e2e8acf350eaab204",
                  plan_type: response.travel_plan_type ? response?.travel_plan_type : "641d41e519807a3c58191f8a",
                  travel_insurance_for: response.travel_insurance_for ? response?.travel_insurance_for : "641c25df29b5921dc20ff9eb",
                  date_of_birth: response.date_of_birth ? response?.date_of_birth : new Date(),
                  phone_no: response.phoneno !== null || "" ? response?.phoneno : null,
                  no_of_travel: response.no_of_travel ? response.no_of_travel : "365",
                  start_date: response.travel_start_date ? response?.travel_start_date : new Date(),
                  end_date: response.travel_end_date ? response?.travel_end_date : new Date(),
                  Beneficiary_name: response.travel_beneficiary_details.length > 0 ? response?.travel_beneficiary_details[0].Name : null,
                  Beneficiary_phoneno: response.travel_beneficiary_details.length > 0 ? response?.travel_beneficiary_details[0].phoneNumber : null,
                  Beneficiary_email: response.travel_beneficiary_details.length > 0 ? response?.travel_beneficiary_details[0].email : null,
                  Beneficiary_passport_no: response.travel_beneficiary_details.length > 0 ? response?.travel_beneficiary_details[0].passportNumber : null,
                  nationality: response.nationality !== null || "" ? response?.nationality : null,
                  family_details: response.travel_family_details ? response?.travel_family_details : [],

                }))
                localStorage.setItem('travelsFormsData', JSON.stringify({ ...travelsFormsData }))
                console.log("yes travel ", response.type_of_policy);
                break;
              case insuranseTypids.Medical:
                setIndividualInsurance((prevState) => ({
                  ...prevState,
                  user: 'customer',
                  oldleadid: url.get('leadid'),
                  leadid: url.get('leadid'),
                  date: response.date_of_birth ? response.date_of_birth : null,
                  email: response.email ? response.email : null,
                  phone_number: response.phoneno ? response.phoneno : null,
                  full_name: response.name ? response.name : null,
                  gender: response.gender ? response.gender : null,
                  nationality: response.nationality ? response.nationality : null,
                  emirates_id: response.emirate_issuing_visa ? response.emirate_issuing_visa : null,
                  visa_id: response.visa_type ? response.visa_type : null,
                  salary_id: response.salary ? response.salary : null,
                  height: response.hight ? response.hight : null,
                  weight: response.weight ? response.weight : null,
                  medical_under_condition: response.medical_under_condition ? response.medical_under_condition : [],
                  medical_general_condition: response.medical_general_condition ? response.medical_general_condition : [],
                  medical_additional_condition: response.medical_additional_condition ? response.medical_additional_condition : [],
                  lastMenstrualPeriodDate: response.lastMenstrualPeriodDate ? response.lastMenstrualPeriodDate : null,
                }))
                localStorage.setItem("IndividualInsurance", JSON.stringify({ ...IndividualInsurance }));
                localStorage.setItem("currentPage",parseInt(response.medicalQuestionrrPage));


                console.log("yes Medical ", response.type_of_policy);
                break;
              case insuranseTypids.Home:
                setHomeInsurance((prevState) => ({
                  ...prevState,
                  user: 'customer',
                  oldleadid: url.get('leadid'),
                  email: response.email ? response.email : null,
                  leadid: url.get('leadid'),
                  address: response.homeAddress ? response.homeAddress : [],
                  date: response.date_of_birth ? response.date_of_birth : null,
                  phone_number: response.phoneno ? response.phoneno : null,
                  home_condition: response.home_condition ? response.home_condition : [],
                  full_name: response.name ? response.name : null,
                  property_type: response.home_property_type ? response.home_property_type : null,
                  ownership_status: response.home_ownership_status ? response.home_ownership_status : null,
                  plan_type: response.home_plan_type ? response.home_plan_type : null,
                  claim_status: response.home_claim_years ? response.home_claim_years : null,
                  building_value: response.building_value ? formatAmount(response.building_value) : null,
                  content_value: response.content_value ? formatAmount(response.content_value) : null,
                  personal_belongings_value: response.personal_belongings_value ? formatAmount(response.personal_belongings_value) : null,
                  domestic_value: response.domestic_value ? response.domestic_value : 0,
                  nationality: response.nationality ? response.nationality : null,
                  noOfClaimYear: response.last_year_claim ? response.last_year_claim : 0
                }))

                localStorage.setItem("HomeInsurance", JSON.stringify({ ...HomeInsurance }));

                console.log("yes Home ", response.type_of_policy);
                break;
              case insuranseTypids.Yacht:
                handlYachteSelectFormValue("leadid", url.get('leadid'))
                for (const key in response) {
                  // yacht Data Set
                  if (key == "boat_details" || key == "boat_engine_details" || key == "sumInsured") {
                    const childreponse = response[key]
                    for (const childkey in childreponse) {
                      console.log("Key>>>>", childkey, "Value>>>>>>", childreponse[childkey])
                      
                      handlYachteSelectFormValue(childkey, childreponse[childkey]);
                      handlYachtestimatedSelectFormValue(childkey, childreponse[childkey]);
                    }
                  }
                  else {
                    if (yachtinitialState.hasOwnProperty(key) && key !== "location") {
                      console.log({ key })
                      const ingnoreproperties = ["territoryCoverage", "buying_used_boat", "bot_brand_new", "bot_current_renewal", "bot_current_insurance_company_id"]
                      if (key == "yatchClaimsExperienceQuestions" || key == "YachtOperaterExperienceQuestions") {
                        handlYachteSelectFormValue(key + "data", response[key]);
                      } else {
                        if (ingnoreproperties.includes(key)) {
                          handlYachteSelectFormValue(key, response[key])
                        } else {
                          handlYachteSelectFormValue(key, response[key])
                          handlYachtestimatedSelectFormValue(key, response[key])
                        }
                      }
                    }
                  }
                  // End  yacht Data Set

                }
                console.log("yes Yacht ", response.type_of_policy);
                break;
              case insuranseTypids.Group_medical:
                setGroupInsurance((prevState) => ({
                  ...prevState,
                  user: 'customer',
                  oldleadid: url.get('leadid'),
                  leadid: url.get('leadid'),
                  firstName: response.firstName ? response.firstName : '',
                  middleName: response.middleName ? response.middleName : '',
                  lastnName: response.lastnName ? response.lastnName : '',
                  employeeNumber: response.employeeNumber ? response.employeeNumber : '',
                  email: response.email ? response.email : '',
                  phoneno: response.phoneno ? response.phoneno : '',
                  dateOfBirth: response.dateOfBirth ? response.dateOfBirth : null,
                  gender: response.gender ? response.gender : '',
                  maritalStatus: response.maritalStatus ? response.maritalStatus : '',
                  relation: response.relation ? response.relation : '',
                  category: response.category ? response.category : '',
                  regino: response.regino ? response.regino : '',
                  LSB: response.LSB ? response.LSB : '',
                  nationality: response.nationality ? response.nationality : '',
                  passportNumber: response.passportNumber ? response.passportNumber : '',
                  EidNumber: response.EidNumber ? response.EidNumber : '',
                  UidNumber: response.UidNumber ? response.UidNumber : '',
                  visaIssuedLocation: response.visaIssuedLocation ? response.visaIssuedLocation : '',
                  actualSalryBand: response.actualSalryBand ? response.actualSalryBand : '',
                  personCommission: response.personCommission ? response.personCommission : '',
                  residentialLocation: response.residentialLocation ? response.residentialLocation : '',
                  workLocation: response.workLocation ? response.workLocation : '',
                  photoFileName: response.photoFileName ? response.photoFileName : '',
                  sponsorType: response.sponsorType ? response.sponsorType : '',
                  sponsorId: response.sponsorId ? response.sponsorId : '',
                  sponsorContactNumber: response.sponsorContactNumber ? response.sponsorContactNumber : '',
                  sponsorContactEmail: response.sponsorContactEmail ? response.sponsorContactEmail : '',
                  occupation: response.occupation ? response.occupation : '',
                  AdditionEffectiveDate: response.AdditionEffectiveDate ? response.AdditionEffectiveDate : null,
                  visaFileNumber: response.visaFileNumber ? response.visaFileNumber : '',
                  birthCertificateNumber: response.birthCertificateNumber ? response.birthCertificateNumber : '',
                  siNumber: response.siNumber ? response.siNumber : '',
                  lead_status: response.lead_status ? response.lead_status : '',
                  planName: response.planName ? response.planName : '',
                  type_of_policy: response.type_of_policy ? response.type_of_policy : null,
                  plan_company_id: response.plan_company_id ? response.plan_company_id : null,
                  plan_id: response.plan_id ? response.plan_id : null,
                }))
                localStorage.setItem("groupInsurance", JSON.stringify({ ...groupInsurance }));

                console.log("yes Medical ", response.type_of_policy);
                break;
              case insuranseTypids.Other_Insurance:
                setOtherInsurance((prevState) => ({
                  ...prevState,
                  user: 'customer',
                  oldleadid: url.get('leadid'),
                  leadid: url.get('leadid'),
                  other_insurance_option: response.other_insurance_name ? response.other_insurance_name : null,
                  full_name: response.name ? response.name : [],
                  email: response.email ? response.email : null,
                  phone_number: response.phoneno ? response.phoneno : null,
                  brief_info: response.brief_information ? response.brief_information : '',
                  prefer_day_to_call: response.call_date ? response.call_date : null,
                  prefer_time_to_call: response.call_time ? response.call_time : null,
                }))

                localStorage.setItem("OtherInsurance", JSON.stringify({ ...OtherInsurance }));
                console.log("OtherInsurance ", OtherInsurance);
                console.log("yes other ", response.type_of_policy);
                break;

              default:
                // Handle default case if needed
                break;
            }


          }).catch((error) => {
            console.log(error)

          })
          // End Moto Data Set
        }
        if (url.get('user') === 'BE' && url.get('agentid')) {
          dispatch(AddMotoformData({ name: 'user', value: 'BE' }))
          dispatch(AddMotoformData({ name: 'businessentitytoken', value: url.get('agentid') }))
          settravelsFormsData((prevState) => ({
            ...prevState,
            user: "BE",
            businessentitytoken: url.get('agentid')
          }))
          setHomeInsurance((prevState) => ({
            ...prevState,
            user: "BE",
            businessentitytoken: url.get('agentid')
          }))
          setIndividualInsurance((prevState) => ({
            ...prevState,
            user: "BE",
            businessentitytoken: url.get('agentid')

          }))
          setOtherInsurance((prevState) => ({
            ...prevState,
            user: "BE",
            businessentitytoken: url.get('agentid')
          }))
          handlYachteSelectFormValue("businessentitytoken", url.get('agentid'))
          handlYachteSelectFormValue("user", url.get('BE'))
          localStorage.setItem("HomeInsurance", JSON.stringify({ ...HomeInsurance }));
          localStorage.setItem('travelsFormsData', JSON.stringify({ ...travelsFormsData }))
          localStorage.setItem("IndividualInsurance", JSON.stringify({ ...IndividualInsurance }));
          localStorage.setItem("OtherInsurance", JSON.stringify({ ...OtherInsurance }));
        }
        if (url.get('businessLeadid')) {
          await getCardetailsByLeadid(url.get('businessLeadid')).then((response) => {
            switch (response.type_of_policy) {
              case insuranseTypids.Motor:
                dispatch(AddMotorforminitialState())
                localStorage.removeItem("MotoformData");
                dispatch(AddMotoformData({ name: 'businessLeadid', value: url.get('businessLeadid') }))
                dispatch(AddMotoformData({ name: 'leadid', value: response._id }))
                dispatch(AddMotoformData({ name: 'name', value: response.name }))
                dispatch(AddMotoformData({ name: 'email', value: response.email }))
                dispatch(AddMotoformData({ name: 'phoneno', value: response.phoneno }))
                break;
              case insuranseTypids.Travel:
                settravelsFormsData((prevState) => ({
                  ...prevState,
                  businessLeadid: url.get('businessLeadid'),
                  leadid: response._id,
                  email: response.email !== null || "" ? response.email : null,
                  name: response.name !== null || "" ? response.name : "",
                  phone_no: response.phoneno !== null || "" ? response.phoneno : null,
                }))

                setTravelsFormsData1((prevState) => ({
                  ...prevState,
                  businessLeadid: url.get('businessLeadid'),
                  leadid: response._id,
                  email: response.email !== null || "" ? response?.email : null,
                  name: response.name !== null || "" ? response?.name : "",
                  phone_no: response.phoneno !== null || "" ? response?.phoneno : null,
                }))
                localStorage.setItem('travelsFormsData', JSON.stringify({ ...travelsFormsData }))
                break;
              case insuranseTypids.Medical:
                setIndividualInsurance((prevState) => ({
                  ...prevState,
                  businessLeadid: url.get('businessLeadid'),
                  leadid: response._id,
                  email: response.email ? response.email : null,
                  phone_number: response.phoneno ? response.phoneno : null,
                  full_name: response.name ? response.name : null,
                }))
                localStorage.setItem("IndividualInsurance", JSON.stringify({ ...IndividualInsurance }));
                break;
              case insuranseTypids.Home:
                setHomeInsurance((prevState) => ({
                  ...prevState,
                  businessLeadid: url.get('businessLeadid'),
                  leadid: response._id,
                  email: response.email ? response.email : null,
                  phone_number: response.phoneno ? response.phoneno : null,
                  full_name: response.name ? response.name : null,
                }))
                localStorage.setItem("HomeInsurance", JSON.stringify({ ...HomeInsurance }));
                break;
              case insuranseTypids.Yacht:
                handlYachteSelectFormValue("businessLeadid", url.get('businessLeadid'))
                handlYachteSelectFormValue("leadid", response._id)
                handlYachteSelectFormValue("email", response.email)
                handlYachteSelectFormValue("phoneno", response.phoneno)
                handlYachteSelectFormValue("name", response.name)
                handlYachtEstimatedSelect("email", response.email)
                handlYachtEstimatedSelect("phoneno", response.phoneno)
                handlYachtEstimatedSelect("name", response.name)
                break;
              case insuranseTypids.Group_medical:
                break;

            }
          })
        }

      } catch (error) {
        setisLoading(false)
        console.log(error)
        // Handle errors here
      }
      setisLoading(false)
    }
    fetchData()
  }, [

  ])




  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance])
  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance])
  useEffect(() => {
    localStorage.setItem('OtherInsurance', JSON.stringify(OtherInsurance))
  }, [OtherInsurance])
  useEffect(() => {
    localStorage.setItem('groupInsurance', JSON.stringify(groupInsurance))
  }, [groupInsurance])




  console.log("OtherInsurance", OtherInsurance)

  const [motortooltip, setMotortooltip] = useState([])



  const getmotortooltip = () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(`${API_URL}/api/getMotorToooltip`, requestoptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('data:', data);
          setMotortooltip(data?.data)
        })
        .catch((error) => {
          console.log('error:', error);
        });
    } catch (error) {
      console.log('error:', error);
    }
  }

  const [traveltootip, setTraveltootip] = useState([]);


  const getTraveltooltip = () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(`${API_URL}/api/getTravelToooltip`, requestoptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('data:', data);
          setTraveltootip(data?.data)
        })
        .catch((error) => {
          console.log('error:', error);
        });
    } catch (error) {
      console.log('error:', error);
    }
  }

  const [hometooltip, setHometooltip] = useState([]);


  const getHometooltip = () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(`${API_URL}/api/getHomeToooltip`, requestoptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('data:', data);
          setHometooltip(data?.data)
        })
        .catch((error) => {
          console.log('error:', error);
        });
    } catch (error) {
      console.log('error:', error);
    }
  }

  const [yachttooltip, setYachttooltip] = useState([]);


  const getYachttooltip = () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(`${API_URL}/api/getYachtToooltip`, requestoptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('data:', data);
          setYachttooltip(data?.data)
        })
        .catch((error) => {
          console.log('error:', error);
        });
    } catch (error) {
      console.log('error:', error);
    }
  }

  const [individualtooltip, setIndividualtooltip] = useState([]);
  const [otherInsuranceTooltip, setOtherInsuranceTooltip] = useState([])



  const getIndividualtooltip = () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(`${API_URL}/api/getIndividualToooltip`, requestoptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('data:', data);
          setIndividualtooltip(data?.data)
        })
        .catch((error) => {
          console.log('error:', error);
        });
    } catch (error) {
      console.log('error:', error);
    }
  }
  const getOhterInsurancestooltip = () => {
    try {
      const requestoptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(`${API_URL}/api/getOtherInsurancesToooltip`, requestoptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('data:', data);
          setOtherInsuranceTooltip(data?.data)
        })
        .catch((error) => {
          console.log('error:', error);
        });
    } catch (error) {
      console.log('error:', error);
    }
  }

  const state = {
    // motor States
    motorFormsData,
    saveMotodata,
    saveYachtdata,
    saveMotodataByBE,
    saveYachtdataByBE,
    HandleSubmitMotorFormdata,
    SaveDetails,
    handleBeforeUnload,
    handleSubmitMotorform,
    HandleSubmitTravelFormdata,
    travelsFormsData,
    settravelsFormsData,
    saveTraveldata,
    saveTraveldatabyBE,
    handleBeforeunload,
    Savedetails,
    UpdateTravelFormdata,
    YachtFormsData,
    handlYachteSelect,
    handlYachteSelectFormValue,
    handlYachtEstimatedSelect,
    handlYachtestimatedSelectFormValue,
    handlYachteSelectFormValuedata,
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
    handleIndividualDate,
    handleIndividualPhoneChange,
    OtherInsurance,
    setOtherInsurance,
    handleOtherInsurance,
    HomeInsurance,
    setHomeInsurance,
    handleHomeInsurance,
    handleHomePhoneChange,
    handleHomeDate,
    compareselect,
    setCompareselect,
    comparematch,
    setComparematch,
    location,
    HandleSubmitIndividualFormdata,
    HandleSubmitGroupFormdata,
    HandleSubmitHomeFormdata,
    travelsFormsData1, setTravelsFormsData1, isLoading,
    handlePushYacht, convertToCamelCase, isYachtConditionChecked,
    motortooltip,
    traveltootip,
    hometooltip,
    yachttooltip,
    individualtooltip,
    otherInsuranceTooltip,
  };

  return (
    <MotorContext.Provider value={state}>{children}</MotorContext.Provider>
  );
};
const UseMotorContext = () => {
  return useContext(MotorContext);
};
export { MotorContext, MotorContextAppProvider, UseMotorContext };
