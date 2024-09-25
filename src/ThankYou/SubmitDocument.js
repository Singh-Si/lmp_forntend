import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tick from "../Image/ticks.svg";
import cross from "../Image/cross.svg";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import axios from "axios";

import swal from "sweetalert";
import { UseMotorContext } from "../MultiStepContextApi";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CProgress,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { API_URL, forntendurl } from "..";
import { useSelector } from "react-redux";
import { getCardetailsByLeadid } from "../functions";
import { UseUserContext } from "../UserContextAppProvider";
import { set } from "firebase/database";
import Homeinsurance from "../Components/Home/Homeinsurance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Moment from "react-moment";
import FamilyDocuments from "./FamilyDocuments";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { emailRegex } from "../functions";
import HomeThankYouFormPage from "./HomeThankYouFormPage";
import YachtThankYouFormPage from "./YachtThankYouFormPage";
import MedicalThankYouFormPage from "./MedicalThankYouFormPage";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
// import 'moment-timezone'; // Include this if you need to set a specific timezone
const Tesseract = require('tesseract.js');




const SubmitDocument = (props) => {
  const { setToken, setUserData } = UseUserContext()
  const params = new URLSearchParams(window.location.search);
  let insurancetype = params.get("lob")
  const MotoformData = useSelector((state) => insurancetype && insurancetype === "Yacht" ? state.YachtReducer : state.MotoformDataReducer);
  const { travelsFormsData, IndividualInsurance, HomeInsurance, motortooltip, traveltootip } = UseMotorContext();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(true);
  const [policyData, setPolicyData] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [filedata, setFiledata] = useState("");
  const [leadid, setleadid] = useState(params.get("id") ? params.get("id") : params.get("leadid") ? params.get("leadid") : "");
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [docData, setDocData] = useState({});
  const [registrationYear, setRegistrationYear] = useState(null);
  const [motortermshow, setMotortermshow] = useState(false);
  const [travelfamilyeffect, settravelfamilyeffect] = useState([]);
  const [Beneficiary_name, setBeneficiary_name] = useState("");
  const [Beneficiary_phoneno, setBeneficiary_phoneno] = useState("");
  const [Beneficiary_email, setBeneficiary_email] = useState("");
  const [Beneficiary_passport_no, setBeneficiary_passport_no] = useState("");
  const [traveltermshow, setTraveltermshow] = useState(false)

  const [objData, setObjData] = useState({})






  const [agreement, setAgreement] = useState(false)
  const [TermsAndConditionsdata, setTermsAndConditionsdata] = useState("")
  useEffect(() => {
    axios
      .get(API_URL + `/api/termsAndCondition?insuranceType=${lob}`)
      .then((response) =>
        setTermsAndConditionsdata(response.data.data?.terms_constions)
      )
      .catch((error) => { })
  }, []);



  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  // const leadid = MotoformData.leadid


  const lob = params?.get("lob");

  const visa_type = lob == 'Medical' ? params?.get("visa_type_id") : '';

  console.log("visa_type", visa_type)

  const vehicleid = MotoformData.car_variant
  useEffect(() => {


    // setLeadID(leadid)
    getDocumentsLob()
    GetAllDocuments()
    getdetailsbyid()
    traveldetailsbyid()

    handleThirdpartycomission()

  }, [leadid]);




  const handlePaymentstatus = async () => {
    try {
      await axios
        .post(API_URL + `/api/updateLeadById?leadId=${leadid}`, { paymentStatus: "Completed", buisnessEntityCostomerLink: forntendurl + "/" + window.location.pathname.replace("/", "") + window.location.search })
        .then((response) => {
          console.log("response", response);
          if (response.length > 0) {
            console.log(response.paymentStatus)
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  }


  const handleThirdpartycomission = async () => {
    //     try {
    //       let obj = {
    //         leadId: leadid,
    //         lobType:lob,
    //       }
    //       console.log("obj",obj)
    //       await axios.post(API_URL + "/api/addThiredPartyComission", obj)
    //      .then((response) => {
    //        console.log(response.status)
    //      })
    //      .catch((error) => {
    //        console.log(error.message);
    //      });
    //  } catch (error) {
    //    console.log(error.message);
    //  }

  }

  const [visa_type_id, setVisa_type_id] = useState("");

  useEffect(() => {
    getDocumentsLob()
  }, [visa_type_id]);

  const getDocumentsLob = async () => {
    console.log(props)
    let insuranseLoby = insurancetype && insurancetype === "Yacht" ? "Yacht" : "Motor"
    console.log("insuranseLoby", insurancetype)
    console.log("visa_type_id", visa_type_id)
    await axios
      .get(`${API_URL}/api/getDocumentsLob?lob=${lob}&visTypeId=${visa_type}`)
      .then((result) => {
        setPolicyData(result.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  console.log("policyData", policyData?.map((val) => val.document_type));


  const GetAllDocuments = async () => {
    try {

      await getCardetailsByLeadid(leadid)
        .then(async (response) => {
          setVisa_type_id(response?.visa_type)
          setDocuments(response.documents)
          console.log("response", documents)
          // for (let docname of respoinnsedoc) {
          //   let documentName = docname.name
          //   let documentFile = docname.file[0]

          //   let ocrText = '';
          //   // Perform OCR only if the document is "Driving license Front Side"
          //   if (documentName === 'Driving license Front Side') {
          //     const ocrResult = await performOCR(documentFile);
          //     ocrText = ocrResult.text;
          //     console.log('OCR Result:', ocrText);

          //     const licenseNumber = extractLicenseNumber(ocrText);

          //     if (licenseNumber) {
          //       console.log('Extracted License Number:', licenseNumber);
          //       setLicensenumber(licenseNumber);
          //       // setObjData({ ...objData,["drivingDetails"]:{...objData.drivingDetails,licenseNumber:licenseNumber}});

          //     } else {
          //       console.log('License number not found in OCR text.');
          //     }

          //   }
          //   const { issueDate, expiryDate } = extractDates(ocrText);
          //   console.log('Issue Date:', issueDate);
          //   console.log('Expiry Date:', expiryDate);

          //   if (issueDate) {
          //     setIssueDate(issueDate);
          //     // setObjData({ ...objData,["drivingDetails"]:{...objData.drivingDetails,issueDate:issueDate}});

          //   }

          //   if (expiryDate) {
          //     setExpiryDate(expiryDate);

          //   }

          //   if (documentName === 'Driving license Back Side') {
          //     const ocrResult = await performOCR(documentFile);
          //     ocrText = ocrResult.text;
          //     console.log('OCR Result:', ocrText);

          //     const trafficCode = extractTrafficCode(ocrText);
          //     if (trafficCode) {
          //       console.log('Extracted Traffic Code:', trafficCode);
          //       setTcfno(trafficCode);
          //       setObjData({ ...objData, ["TCFno"]: trafficCode });

          //     }
          //   }
          // }


        })
        .catch((error) => {
          console.log("error", error.message)
        })


    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    const updatedDocuments = [...uploadedDocuments];
    updatedDocuments[index] = file;
    setUploadedDocuments(updatedDocuments);
    console.log("updatedDocuments", updatedDocuments);
  };
  const handleModal = (file) => {
    setFiledata(file);
    //console.log(filedata, "filedata");
    setShow(true);
  };
  const openModal = (id, index, name) => {
    setDocData({
      id: id,
      index: index,
      fileName: name,
    });

    console.log("docData", docData);

    try {
      axios
        .post(API_URL + "/api/get_Documents_listbyid", {
          method: "post",
          ParamValue: id,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
          console.log(result.data.data);
          setDocuments(result.data.data);
        });
    } catch (error) {
      //console.log(error.message);
    }

    setVisible(!visible);
  };

  const performOCR = async (imageFile) => {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(
        imageFile,
        'eng', // Specify language (e.g., 'eng' for English)
        {
          logger: (info) => {
            console.log(info);
          },
        }
      )
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const [tcfno, setTcfno] = useState("")
  const [licensenumber, setLicensenumber] = useState("")
  const [issueDate, setIssueDate] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [issuingEmirate, setIssuingEmirate] = useState("")
  const [chassisNumber, setChassisNumber] = useState("")
  const [idNumber, setIdNumber] = useState("")

  const [passportnumber, setPassportnumber] = useState('')
  const [emiratesid, setEmiratesid] = useState('')
  const [emiratesidexpirydate, setEmiratesidexpirydate] = useState('')
  const [visafile, setVisafile] = useState('')
  const [visauidnumber, setVisauidnumber] = useState('')
  const [spomsorname, setSpomsorname] = useState('')
  const [spomsordob, setSpomsordob] = useState('')
  const [spomsorgender, setSpomsorgender] = useState('')
  const [spomsoruidnumber, setSpomsoruidnumber] = useState('')
  const [spomsorfilenumber, setSpomsorfilenumber] = useState('')
  const [spomsorpassportnumber, setSpomsorpassportnumber] = useState('')
  const [spomsoreidnumber, setSpomsoreidnumber] = useState('')
  const [spomsorsalary, setSpomsorsalary] = useState('')
  const [spomsoremailaddress, setSpomsoremailaddress] = useState('')
  const [spomsorphonenumber, setSpomsorphonenumber] = useState('')
  const [tradelicensenumber, setTradelicensenumber] = useState('')
  const [tradelicenseexpirydate, setTradelicenseexpirydate] = useState('')
  const [trnnumber, setTrnnumber] = useState('')

  const [loading, setLoading] = useState(false);

  const extractLicenseNumber = (ocrText) => {
    const licenseNumberRegex = /\b(\d{7,})\b/;
    const match = ocrText.match(licenseNumberRegex);

    if (match) {
      const licenseNumber = match[1]; // Extracted license number
      return licenseNumber;
    } else {
      return null; // License number not found
    }
  };

  function extractDates(ocrText) {
    const dateRegex = /(\d{2}-\d{2}-\d{4})/g; // Assuming the date is in the format DD-MM-YYYY

    const dateMatches = ocrText.match(dateRegex);

    if (dateMatches && dateMatches.length >= 2) {
      const issueDate = dateMatches[1];
      const expiryDate = dateMatches[2];

      return { issueDate, expiryDate };
    }

    return { issueDate: null, expiryDate: null };
  }

  const extractTrafficCode = (ocrText) => {
    const trafficCodeRegex = /Traffic Code No\. (\d+)/;
    const match = ocrText.match(trafficCodeRegex);

    if (match) {
      const trafficCode = match[1]; // Extracted Traffic Code
      return trafficCode;
    }

    return null; // Traffic Code not found
  };


  function extractChassisNo(ocrText) {
    const chassisNoRegex = /ChassisNo\] ~~ (.+?) \[/;
    const match = ocrText.match(chassisNoRegex);

    if (match && match[1]) {
      const chassisNo = match[1].trim();
      return chassisNo;
    }

    return null; // ChassisNo not found
  }

  function extractSpecificNumber(ocrText) {
    const specificNumberRegex = /\b(\d{3}-\d{4}-\d{7}-\d{1})\b/;
    const match = ocrText.match(specificNumberRegex);

    if (match && match[1]) {
      const specificNumber = match[1].trim();
      return specificNumber;
    }

    return null; // Specific number not found
  }

  const extractPassportNumber = (ocrText) => {
    // const passportNumberRegex = /T(\d+)/;
    const passportNumberRegex = /[A-Za-z](\d+)/;
    const match = ocrText.match(passportNumberRegex);

    if (match) {
      const passportNumber = match[0]; // Extracted passport number
      return passportNumber;
    } else {
      return null; // Passport number not found
    }
  };



  const extractEmiratesId = (ocrText) => {
    const visaNumberRegex = /(\d{15,16})/;
    const match = ocrText.match(visaNumberRegex);

    if (match) {
      const visaNumber = match[1]; // Extracted visa number
      return visaNumber;
    } else {
      return null; // Visa number not found
    }
  };

  // const extractEmiratesIdExpiryDate = (ocrText) => {
  //   console.log('OCR Text:', ocrText);
  //   // const expiryDateRegex = /(\d{2}-\d{2}-\d{4})/;  26/02/2025 
  //   const expiryDateRegex = /(\d{2}\/\d{2}\/\d{4})/; // Assuming the date is in the format DD/MM/YYYY

  //   const match = ocrText.match(expiryDateRegex);
  //   console.log('Match:', match);

  //   if (match && match.length >= 2) {
  //     const issueDate = match[1];
  //     const expiryDate = match[2];
  //     console.log('Issue Date:', issueDate);
  //     console.log('Expiry Date:', expiryDate);
  //     return { issueDate, expiryDate };
  //   }

  //   return { issueDate: null, expiryDate: null };
  // };

  const extractEmiratesIdExpiryDate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const expiryDateRegex = /(\d{2}\/\d{2}\/\d{4})/g; // Add 'g' flag for global search

    let match;
    let maxExpiryDate = null;

    while ((match = expiryDateRegex.exec(ocrText)) !== null) {
      const currentExpiryDate = match[0];

      if (!maxExpiryDate || currentExpiryDate >= maxExpiryDate) {
        maxExpiryDate = currentExpiryDate;
      }
    }

    console.log('Max Expiry Date:', maxExpiryDate);
    return maxExpiryDate;
  };


  const extracttradelicensenumber = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const tradeLicenseNumberRegex = /License No. (\d+)/;
    // const tradelicenseexpirydate = 
    const match = ocrText.match(tradeLicenseNumberRegex);

    if (match) {
      const tradeLicenseNumber = match[1]; // Extracted trade license number
      return tradeLicenseNumber;
    } else {
      return null; // Trade license number not found
    }
  };

  const extracttradelicenseexpirydate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const expiryDateRegex = /Expiry Date (\d{2}\/\d{2}\/\d{4})/g; // Add 'g' flag for global search

    const match = ocrText.match(expiryDateRegex);

    if (match) {
      const expiryDate = match[0]; // Extracted expiry date
      console.log('Expiry Date:', expiryDate);
      return expiryDate;
    } else {
      return null; // Expiry date not found
    }

  };








  const uploadAllDocuments = async () => {

    setLoading(true);

    let docId = params.get("id") || params.get("leadid")

    const formData = new FormData();
    const documentName = docData.fileName;
    const fileIndex = docData.index;
    const documentFile = uploadedDocuments[docData.index];

    console.log("documentFile", documentFile)


    let ocrText = '';

    // Perform OCR only if the document is "Driving license Front Side"
    if (documentName === 'Driving license Front Side') {
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);

      const licenseNumber = extractLicenseNumber(ocrText);

      if (licenseNumber) {
        console.log('Extracted License Number:', licenseNumber);
        setLicensenumber(licenseNumber);
        // setObjData({ ...objData,["drivingDetails"]:{...objData.drivingDetails,licenseNumber:licenseNumber}});
        if (licenseNumber) {
          setLicenseNumberdata("")
        }
        // Add the license number to the formData or perform any other necessary action
        formData.append('licenseNumber', licenseNumber);
      } else {
        console.log('License number not found in OCR text.');
      }

    }
    const { issueDate, expiryDate } = extractDates(ocrText);
    console.log('Issue Date:', issueDate);
    console.log('Expiry Date:', expiryDate);

    if (issueDate) {
      setIssueDate(issueDate);
      // setObjData({ ...objData,["drivingDetails"]:{...objData.drivingDetails,issueDate:issueDate}});
      // Add the issue date to the formData or perform any other necessary action
      formData.append('issueDate', issueDate);
    }

    if (expiryDate) {
      setExpiryDate(expiryDate);
      // setObjData({ ...objData,["drivingDetails"]:{...objData.drivingDetails,expiryDate:expiryDate}});
      // Add the expiry date to the formData or perform any other necessary action
      formData.append('expiryDate', expiryDate);
    }

    if (documentName === 'Driving license Back Side') {
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);

      const trafficCode = extractTrafficCode(ocrText);
      if (trafficCode) {
        console.log('Extracted Traffic Code:', trafficCode);
        setTcfno(trafficCode);
        setObjData({ ...objData, ["TCFno"]: trafficCode });

      }
    }

    if (documentName === 'Mulkiya Front Side') {
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);

    }

    if (documentName === 'Mulkiya Back side') {
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const chassisNo = extractChassisNo(ocrText);
      if (chassisNo) {
        console.log('Extracted ChassisNo:', chassisNo);
        setChassisNumber(chassisNo);
        // setObjData({ ...objData,["chassisNumber"]:chassisNo});
      }
    }

    if (documentName === 'Emirates ID Front Side') {
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const idNumber = extractSpecificNumber(ocrText);
      if (idNumber) {
        console.log('Extracted ID Number:', idNumber);
        setIdNumber(idNumber);
        // setObjData({ ...objData,["emiratesIdNumber"]:idNumber});
      }
    }

    if (documentName === 'Passport') {
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const passportNumber = extractPassportNumber(ocrText);
      if (passportNumber) {
        console.log('Extracted Passport Number:', passportNumber);
        setPassportnumber(passportNumber);
        // setObjData({ ...objData,["passportNumber"]:passportNumber});
      }
    }

    if (documentName === 'Visa') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const visaNumber = extractEmiratesId(ocrText);
      if (visaNumber) {
        console.log('Extracted Visa Number:', visaNumber);
        setEmiratesid(visaNumber);
        // setObjData({ ...objData,["visaNumber"]:visaNumber});
      }
    }

    if (documentName === 'Emirates ID') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const Expirydate = extractEmiratesIdExpiryDate(ocrText);
      if (Expirydate) {
        console.log('Extracted expiry date:', Expirydate);
        setEmiratesidexpirydate(Expirydate);
        // setObjData({ ...objData,["visaNumber"]:visaNumber});
      }
    }

    if (documentName === 'Trade license') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const tradeLicenseNumber = extracttradelicensenumber(ocrText);
      if (tradeLicenseNumber) {
        console.log('Extracted Trade License Number:', tradeLicenseNumber);
        setTradelicensenumber(tradeLicenseNumber);
        // setObjData({ ...objData,["visaNumber"]:visaNumber});
      }
      const tradeLicenseExpiryDate = extracttradelicenseexpirydate(ocrText);
      if (tradeLicenseExpiryDate) {
        console.log('Extracted Trade License Expiry Date:', tradeLicenseExpiryDate);
        setTradelicenseexpirydate(tradeLicenseExpiryDate);
        // setObjData({ ...objData,["visaNumber"]:visaNumber});
      }
    }



    formData.append("id", docId);
    formData.append("name", documentName);
    formData.append("status", "");
    formData.append("reason", "");
    formData.append("file", documentFile);
    formData.append("fileindex", fileIndex);
    formData.append("totaldocs", docData.DocTotal);

    console.log(Array.from(formData), "formData");


    if (documentFile != null) {
      await axios
        .post(API_URL + "/api/update_single_documents", formData, {
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((data) => {
          console.log("data", data.data.status);
          if (data.data.status == 200) {
            // swal("Success!", "Updated", "success");
            console.log("data", data.data.data);
            console.log("data", data.data.data.documents);
            setDocuments(data.data.data.documents);
            GetAllDocuments();
            // setShow(false);
            setVisible(false)
          } else {
            swal("Error!", "Something went wrong", "error");
          }
        })
        .catch((error) => {
          //console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Please select required document");
    }
  };

  console.log("documents", documents);
  const handleLogin = async (e) => {
    // alert("handleLogin")
    e.preventDefault();

    const email = details?.map((item) => item.email)
    if (email) {
      await axios.get(
        API_URL + "/api/documentSubmitLoginCustomer?email=" + email
      ).then((response) => {
        //console.log("response data", response);

        if (response.status === 200) {
          setToken(response.data?.token);
          localStorage.setItem("usertoken", response.data?.token);
          setUserData(response.data.data);
          window.location.href = "/Mypolicies";
          // navigate("/Mypolicies");
        } else {
          swal({
            title: "Error!",
            text: response.data.message,
            type: "error",
            icon: "error",
          })
        }
      })
    }
  };

  console.log(issueDate, "issueDate")
  const [details, setDetails] = useState([])
  const [vehicledata, setVehicledata] = useState([])
  const [traveldata, setTraveldata] = useState([])


  const getdetailsbyid = async () => {
    try {
      await axios
        .post(API_URL + "/api/get_new_lead_detailsbyid", {
          ParamValue: params.get("id") || params.get("leadid"),
        }
        )
        .then((response) => {
          let r_year = response.data.data.length > 0 ? response.data.data[0]["registration_year"] : ""
          r_year && setRegistrationYear(+r_year)
          // Calculate the minimum date based on registration_year
          let data = response.data.data.length > 0 ? response.data.data[0] : null
          if (data) {
            try {

              setTCFnodata(data?.TCFno)
              setTcfno(data?.TCFno)

              setIssuingEmirate(data?.drivingDetails?.issuingEmirate)
              setLicensenumber(data?.drivingDetails?.licenseNumber)
              setExpiryDate(data?.drivingDetails?.expiryDate)
              setIssueDatedata(data?.drivingDetails?.issueDate)
              setIssueDate(data?.drivingDetails?.issueDate)
              setVehicleColourdata(data?.vehicleColour)
              setChassisNumber(data?.chassisNumber)
              setEnginNumberdata(data?.EnginNumber)
              setRegistrationNumberdata(data?.registrationNumber)
              setPlateCategorydata(data?.plateCategory)
              setGenderData(data?.gender)
              setCountryOfManufacturingdata(data?.countryOfManufacturing)
              setEmiratesIdNumberdata(data?.emiratesIdNumber)
              setIdNumber(data?.emiratesIdNumber)
              setIssuingEmiratedata(data?.drivingDetails?.issuingEmirate)
              setTradeLicenseNumberdata(data?.tradeLicenseNumber)
              setTRNNumberdata(data?.TRNNumber)


            } catch (error) {
              console.log("ERROR", error)
            }
          }
          let car_variant = data.car_variant
          r_year = new Date().setFullYear(+r_year)
          r_year = new Date(r_year)
          // r_year = moment(r_year).format("DD/MM/YYYY")
          setregistration_year(new Date(r_year))
          setDetails(response.data.data);
          car_variant && vehicledetails(car_variant)
          if (data.buying_used_car === true) {
            setUsedCar(true)
          }
          if (data.car_brand_new === true) {
            setCarnew(true)
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  }


  const vehicledetails = async (id) => {
    try {
      await axios
        .post(API_URL + "/api/get_Motor_model_detailsbyid", {

          method: "post",
          ParamValue: id,
          headers: {
            "Content-Type": "application/json",
          },
        }
        )
        .then((response) => {
          setVehicledata(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  }


  const traveldetailsbyid = async () => {
    try {

      const leadid = params.get("id") || params.get("leadid")
      await axios
        .post(API_URL + `/api/getTravelNewLeadDetails?leadId=${leadid}`
        )
        .then((response) => {
          setTraveldata(response.data.data);
          console.log("travelfamilydetails>>>>>>>>", response.data.data)
          settravelfamilyeffect(response.data.data[0]["travel_family_details"])
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    catch (error) {
      console.log(error.message);
    }

  }


  function formatDate(dateString) {
    if (dateString) {
      const parts = dateString.split('-');

      if (parts.length === 3) {
        const [day, month, year] = parts;
        const isoDateString = `${year}-${month}-${day}`;

        // Check if the formatted string is a valid date
        if (!isNaN(new Date(isoDateString).getTime())) {
          return isoDateString;
        }
      }

      return ''; // Invalid date string
    }

  }

  const [carnew, setCarnew] = useState(false)
  const [usedcar, setUsedCar] = useState(false)

  useEffect(() => {
    setleadid(params.get("id") ? params.get("id") : params.get("leadid") ? params.get("leadid") : "")
    handlePaymentstatus()


  }, [])
  const [TCFnodata, setTCFnodata] = useState("")
  const [licenseNumberdata, setLicenseNumberdata] = useState("")
  const [issueDatedata, setIssueDatedata] = useState("")
  const [expiryDatedata, setExpiryDatedata] = useState("")
  const [issuingEmiratedata, setIssuingEmiratedata] = useState("")
  const [chassisNumberdata, setChassisNumberdata] = useState("")
  const [EnginNumberdata, setEnginNumberdata] = useState("")
  const [registrationNumberdata, setRegistrationNumberdata] = useState("")
  const [plateCategorydata, setPlateCategorydata] = useState("")
  const [firstRegistrationDaatedata, setFirstRegistrationDaatedata] = useState("")
  const [countryOfManufacturingdata, setCountryOfManufacturingdata] = useState("")
  const [vehicleColourdata, setVehicleColourdata] = useState("")
  const [emiratesIdNumberdata, setEmiratesIdNumberdata] = useState("")
  const [genderdata, setGenderData] = useState("")
  const [tradeLicenseNumberdata, setTradeLicenseNumberdata] = useState("")
  const [agreementdata, setAgreementdata] = useState(false)
  const [travelagreementdata, setTravelagreementdata] = useState(false)
  const [TRNNumberdata, setTRNNumberdata] = useState("")
  const [current_uninsured, setcurrent_uninsured] = useState("yes")
  const [third_party_last_year_claim, setthird_party_last_year_claim] = useState("yes")
  const [registration_year, setregistration_year] = useState(new Date())



  const FormatYYYMMDDDate = (data) => {
    // Assuming issueDate is in "YYYY-MM-DD" format
    // Create a Date object from the issueDate string
    const date = new Date(data);

    // Extract the day, month, and year components
    const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    // Format the date as "DD-MM-YYYY"
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }

  const HandleSubmitThankYou = async (e) => {
    e.preventDefault();
    const formdata = new FormData()


    let objData = {
      drivingDetails: {
        licenseNumber: licenseNumberdata == "" ? licensenumber : licenseNumberdata,
        issueDate: issueDatedata == "" ? FormatYYYMMDDDate(issueDate) : FormatYYYMMDDDate(issueDatedata),
        expiryDate: expiryDatedata == "" ? expiryDate : expiryDatedata,
        issuingEmirate: issuingEmiratedata == "" ? issuingEmirate : issuingEmiratedata,
      },
      chassisNumber: chassisNumberdata == "" ? chassisNumber : chassisNumberdata,
      EnginNumber: EnginNumberdata == "" ? "" : EnginNumberdata,
      registrationNumber: registrationNumberdata == "" ? "" : registrationNumberdata,
      plateCategory: plateCategorydata == "" ? "" : plateCategorydata,
      firstRegistrationDaate: firstRegistrationDaatedata == "" ? "" : firstRegistrationDaatedata,
      countryOfManufacturing: countryOfManufacturingdata == "" ? "" : countryOfManufacturingdata,
      vehicleColour: vehicleColourdata == "" ? "" : vehicleColourdata,
      emiratesIdNumber: emiratesIdNumberdata == "" ? idNumber : emiratesIdNumberdata,
      gender: genderdata == "" ? "" : genderdata,
      tradeLicenseNumber: tradeLicenseNumberdata == "" ? "" : tradeLicenseNumberdata,
      TRNNumber: TRNNumberdata == "" ? "" : TRNNumberdata,
      TCFno: TCFnodata == "" ? tcfno : TCFnodata,
      current_uninsured: current_uninsured,
      third_party_last_year_claim: third_party_last_year_claim,
      date_of_first_registration: registration_year,
      locationurl: forntendurl + "/" + window.location.pathname.replace("/", "") + window.location.search,
      insuranceType: lob,

    }

    try {
      if (agreementdata === false) {
        swal({
          title: "Warning!",
          text: "Please check the agreement",
          type: "warning",
          icon: "warning",
        })
        return;
      }
      await axios
        .put(API_URL + `/api/updatePolicyDetails?id=${leadid}`, objData, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {

            // swal({
            //   title: "Success!",
            //   text: response.data.message,
            //   type: "success",
            //   icon: "success",

            // })
            handleLogin(e)
          }
          else {
            swal({
              title: "Error!",
              text: response.data.message,
              type: "error",
              icon: "error",
            })
          }
        })
        .then(() => {
          handleLogin(e)
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  const HandleTravelSubmitThankYou = async (e) => {
    try {
      e.preventDefault();

      if (Beneficiary_email != "" && !emailRegex.test(Beneficiary_email)) {
        swal({
          text: "Please enter valid Beneficiary email",
          type: "warning",
          icon: "warning",
        })
        return;
      }

      let objData = {
        travel_beneficiary_details: [
          {
            Name: Beneficiary_name,
            phoneNumber: Beneficiary_phoneno,
            email: Beneficiary_email,
            passportNumber: Beneficiary_passport_no,
          },
        ],
        locationurl: forntendurl + "/" + window.location.pathname.replace("/", "") + window.location.search,
        insuranceType: lob,
      }

      if (travelagreementdata === false) {
        swal({
          title: "Warning!",
          text: "Please check the agreement",
          type: "warning",
          icon: "warning",
        })
        return;
      }

      else {
        await axios
          .put(API_URL + `/api/updatePolicyDetails?id=${leadid}`, objData, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {

            if (response.status === 200) {

              // swal({
              //   title: "Success!",
              //   text: response.data.message,
              //   type: "success",
              //   icon: "success",

              // })
              handleLogin(e)
              console.log("response", response.data)
            }
            else {
              swal({
                title: "Error!",
                text: response.data.message,
                type: "error",
                icon: "error",
              })
            }

          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } catch (error) {
      console.log(error.message);
    }


  }



  const handleMedicalSubmit = async (e) => {

    e.preventDefault();
  }

  const handleShow = () => setMotortermshow(true);
  const handleClose = () => {
    setMotortermshow(false)
  };

  const handleTravelShow = () => setTraveltermshow(true);
  const handleTravelClose = () => {
    setTraveltermshow(false)
  };


  const Agreement = (e) => {
    e.preventDefault();
    if (e.target.checked == true) {
      setAgreement(true)
    }
    else if (e.target.checked == false) {
      setAgreement(false)
    }
  }


  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 6)
  const [startDate, setStartDate] = useState(new Date());
  console.log("issueDate>>>>>>", issueDate)

  const firstBeneficiaryPhoneNo = traveldata?.[0]?.travel_beneficiary_details?.[0]?.phoneNumber || '';


  console.log("motortooltip", motortooltip)
  console.log("traveltooltip", traveltootip)

  return (
    <div>
      <div className="policyrenewals">
        <div className="container myprofile1 pt-4 pb-4">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
              {/* { lob === "Motor" && */}
              <div className="rowabcds">
                {policyData?.length > 0 && policyData.map((doc, indeX) => (
                  <>
                    <div key={indeX} className="row policy_documents">
                      <div className="col-lg-6">
                        <p>{doc.document_type}</p>
                      </div>
                      <div className="col-lg-6">

                        <button
                          type="file"
                          className="uploaddocus"
                          onClick={() =>
                            openModal(
                              doc._id,
                              indeX,
                              doc.document_type,

                            )
                          }
                        >
                          Upload
                        </button>


                        {documents &&
                          documents.map((docItem, i) => {

                            return docItem.name === doc.document_type ? (
                              <>
                                {docItem.file ?
                                  <button
                                    type="file"
                                    className="text-primary uploaddocus mx-2"
                                    onClick={() =>
                                      handleModal(docItem.file)
                                    }
                                  >
                                    View
                                  </button> : ""}
                                {docItem.message != "" ? (
                                  <p className="text-danger">
                                    {docItem.reason}
                                  </p>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              ""
                            );
                          })}
                      </div>
                    </div>
                  </>
                ))}

              </div>
              {/* } */}
            </div>
            {
              lob === "Travel" && <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">

                <FamilyDocuments policyData={policyData} leadid={leadid} traveldata={traveldata} travelfamilyeffect={travelfamilyeffect} settravelfamilyeffect={settravelfamilyeffect}
                  handleModal={handleModal}
                />
              </div>
            }

          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="gotodashboard mb-3 mt-3"
          onClick={handleLogin}
        >
          Go To My Profile
        </button>
      </div>
      {lob === "Motor" &&

        <div className="container">

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body thankyoupage">
                  <form>
                    <div className="row">
                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <label className="form-label">
                            <strong>Insured Name</strong>
                          </label>
                          <input
                            className="form-control"
                            name="Name"
                            type="text"
                            value={item?.name}
                            readOnly
                          />
                        </div>
                      ))}

                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <label className="form-label">
                            <strong>Nationality</strong>
                          </label>
                          <input
                            className="form-control"
                            name="number"
                            type="text"
                            value={item?.nationality}
                            readOnly
                          />
                        </div>
                      ))}

                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <label className="form-label">
                            <strong>Driver Date Of Birth</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="email"
                            value={item?.date_of_birth?.toString().slice(0, 10).split("-").reverse().join("-")}
                            readOnly
                          />
                        </div>
                      ))}

                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <label className="form-label">
                            <strong>Mobile number</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={item?.phoneno}
                            readOnly
                          />
                        </div>
                      ))}

                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Email</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item?.email}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}

                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Model Year</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item?.model_year}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}

                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Make</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item?.car_maker}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}

                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Model</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item?.car_model}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}

                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Date of First Registration</strong>
                            </label>
                            {/* <DatePicker
                              className="form-control"
                              selected={registration_year}
                              onChange={(date) => setregistration_year(date)}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="DD/MM/YYYY"
                              minDate={registrationYear ? new Date(registrationYear, 0, 1) : null}
                              maxDate={registrationYear ? new Date(registrationYear + 1, 0, 0) : null}
                              peekNextMonth
                              showMonthDropdown
                              showTimeSelect={false}
                              showYearDropdown={false}
                            /> */}
                            <input
                              className="form-control"
                              type="date"
                              name="ThefirstRegistrationDate"
                              min={registrationYear ? `${registrationYear}-01-01` : null}
                              max={registrationYear ? `${registrationYear}-12-31` : null}
                              defaultValue={new Date(registration_year).toISOString().split('T')[0]}
                              onChange={(e) => setregistration_year(e.target.value)}

                            />
                          </div>
                        </div>
                      ))}

                      {vehicledata?.length > 0 && vehicledata.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Body type</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              defaultValue={
                                item?.bodTypes.map((item1, index) => (
                                  item1.body_type_name
                                ))
                              }
                              readOnly
                            />
                          </div>
                        </div>
                      ))}

                      {vehicledata?.length > 0 && vehicledata.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Number of Cylinders</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item?.motor_model_detail_cylinder}
                              readOnly
                            />

                          </div>
                        </div>
                      ))}

                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Sum Insured</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item.minCarValue ? item.minCarValue : item?.finalPriceRefferd}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Currently uninsured/break in insurance</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item.your_existing_policy_expired == true ? 'Yes' : 'No'}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Third party last year</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item.last_year_policy_type == 'Third Party Liability (TPL)' ? 'Yes' : 'No'}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}

                      {details.length > 0 && details.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Modified / Non-GCC Spec</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item?.vehicle_specification}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                      {details.length > 0 && details.map((item, index) => (
                        item.polcy_type.toLowerCase().includes("individual") ? (
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Profession (for individual)</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="message"

                              />
                            </div>
                          </div>
                        ) : (

                          <>
                            <div className="col-md-4" style={{position:'relative'}}> 
                              <div className="form-group">
                                <label className="form-label">
                                  <strong>Trade license number</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="tradeLicenseNumber"
                                  defaultValue={tradeLicenseNumberdata}
                                  onChange={(e) => setTradeLicenseNumberdata(e.target.value)}

                                />
                              </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.drivingDetails?.licenseNumber}
                                </Tooltip>
                              }
                              >
                                  <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                            </div>


                            <div className="col-md-4">
                              <div className="form-group">
                                <label className="form-label">
                                  <strong>TRN No</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="TRNNumber"
                                  defaultValue={TRNNumberdata}
                                  onChange={(e) => setTRNNumberdata(e.target.value)}

                                />
                              </div>
                            </div>
                          </>
                        )
                      ))}

                      {(carnew === true && usedcar === false) && (

                        <>
                          <p>New Vehicle Registration</p>
                          {details.length > 0 && details.map((item, index) => (
                            <>
                              <div className="col-md-4" style={{ position: 'relative' }}>
                                <div className="form-group">
                                  <label className="form-label">
                                    <strong>TCF No</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="TCFno"
                                    defaultValue={tcfno}
                                    onChange={(e) => setTCFnodata(e.target.value)}
                                  />

                                </div>
                                <OverlayTrigger
                                  key="right"
                                  placement="right"
                                  overlay={
                                    <Tooltip id="tooltip-right">
                                      {motortooltip?.insuredDetails?.TCFNo}
                                    </Tooltip>
                                  }
                                >
                                  <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                </OverlayTrigger>
                              </div>
                            </>
                          ))}
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">

                                <strong>Driving Details</strong>
                                <h6 style={{ fontSize: '12px', color: 'red' }} className="my-2 d-flex">*Please verify all driving details and proceed accordingly.</h6>
                              </label>
                              <div className="row">
                                <div className="col-md-3" style={{ position: 'relative' }}>
                                  <label className="form-label">
                                    <strong>license number</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="licenseNumber"
                                    defaultValue={licenseNumberdata == "" ? licensenumber : licenseNumberdata}
                                    onChange={(e) => setLicenseNumberdata(e.target.value)}

                                  />
                                  <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                      <Tooltip id="tooltip-right">
                                        {motortooltip?.insuredDetails?.drivingDetails?.licenseNumber}
                                      </Tooltip>
                                    }
                                  >
                                    <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                  </OverlayTrigger>
                                </div>
                                <div className="col-md-3" style={{ position: 'relative' }} >
                                  <label className="form-label">
                                    <strong> license  issue date</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="issuedate"
                                    onChange={(e) => setIssueDatedata(e.target.value)}
                                    defaultValue={formatDate(issueDate)}
                                  />

                                  <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                      <Tooltip id="tooltip-right">
                                        {motortooltip?.insuredDetails?.drivingDetails?.licenseIssueDate}
                                      </Tooltip>
                                    }
                                  >
                                    <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                  </OverlayTrigger>
                                </div>
                                <div className="col-md-3" style={{ position: 'relative' }}>
                                  <label className="form-label">
                                    <strong>license expiry date</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="expirydate"
                                    onChange={(e) => setExpiryDatedata(e.target.value)}
                                    defaultValue={formatDate(expiryDate)}
                                  />
                                  <OverlayTrigger
                                    key="right"
                                    placement="right"
                                    overlay={
                                      <Tooltip id="tooltip-right">
                                        {motortooltip?.insuredDetails?.drivingDetails?.licenseExpiryDate}
                                      </Tooltip>
                                    }
                                  >
                                    <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                  </OverlayTrigger>
                                </div>
                                <div className="col-md-3" style={{ position: 'relative' }}>
                                  <label className="form-label">
                                    <strong>license issuing Emirate</strong>
                                  </label>
                                  <select className="form-control"
                                    name="essuingEmirate"
                                    defaultValue={issuingEmiratedata}
                                    onChange={(e) => setIssuingEmiratedata(e.target.value)}
                                  >
                                    <option value="" hidden>--None--</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Abu Dhabi">Abu Dhabi</option>
                                    <option value="Sharjah">Sharjah</option>
                                    <option value="Ajman">Ajman</option>
                                    <option value="Fujairah">Fujairah</option>
                                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                    <option value="Umm Al Quwain">Umm Al Quwain</option>

                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>


                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Chassis number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="chassisNumber"
                                defaultValue={chassisNumber}
                                onChange={(e) => setChassisNumberdata(e.target.value)}

                              />
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.chassisNumber}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Engine number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="EnginNumber"
                                defaultValue={EnginNumberdata}
                                onChange={(e) => setEnginNumberdata(e.target.value)}

                              />
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.engineNumber}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Registration number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="registrationNumber"
                                defaultValue={registrationNumberdata}
                                onChange={(e) => setRegistrationNumberdata(e.target.value)}
                              />
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.registrationNumber}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Plate Category</strong>
                              </label>
                              <select onChange={(e) => setPlateCategorydata(e.target.value)} name="plateCategory" defaultValue={plateCategorydata} className="form-control">
                                <option value="">--None--</option>
                                <option value="Private">Private</option>
                                <option value="Commercial">Commercial</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-md-3" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Policy Issue Date1</strong>
                              </label>
                              <input
                                className="form-control"
                                type="date"
                                name="ThefirstRegistrationDate"
                                // min={minDate.toISOString().split('T')[0]}
                                // max={maxDate.toISOString().split('T')[0]}
                                defaultValue={startDate.toISOString().split('T')[0]}
                                onChange={(e) => setFirstRegistrationDaatedata(e.target.value)}

                              />
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.policyIssueDate}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" style={{right:'50px'}} aria-hidden="true"></i>
                            </OverlayTrigger>
                            </div>
                          
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Country of Manufacturing </strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="countryOfManufacturing"
                                defaultValue={countryOfManufacturingdata}
                                onChange={(e) => setCountryOfManufacturingdata(e.target.value)}

                              />
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.countryOfManufacturing}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Vehicle color</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="vehicleColour"
                                defaultValue={vehicleColourdata}
                                onChange={(e) => setVehicleColourdata(e.target.value)}
                              />
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.vehicleColor}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Emirates ID number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="emiratesIdNumber"
                                defaultValue={idNumber}
                                onChange={(e) => setEmiratesIdNumberdata(e.target.value)}

                              />
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.drivingDetails?.emiratesIDNumber}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                          <div className="col-md-4" >
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Gender</strong>
                              </label>
                              <select onChange={(e) => setGenderData(e.target.value)} name="gender" defaultValue={genderdata} className="form-control">
                                <option value="">--None--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>


                        </>
                      )}

                      {(carnew === false && usedcar === true) && (
                        <>
                          <p>Change vehicle ownership</p>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>TCF No</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="TCFno"
                                defaultValue={tcfno}
                                onChange={(e) => setTCFnodata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.TCFNo}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Driving Details</strong>
                                <h6 style={{ fontSize: '12px', color: 'red' }} className="my-2 d-flex">*Please verify all driving details and proceed accordingly.</h6>
                              </label>
                              <div className="row">
                                <div className="col-md-3" style={{ position: 'relative' }}>
                                  <label className="form-label">
                                    <strong>license number</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="licenseNumber"
                                    defaultValue={licenseNumberdata == "" ? licensenumber : licenseNumberdata}
                                    onChange={(e) => setLicenseNumberdata(e.target.value)}

                                  />
                                <OverlayTrigger
                                  key="right"
                                  placement="right"
                                  overlay={
                                    <Tooltip id="tooltip-right">
                                      {motortooltip?.insuredDetails?.drivingDetails?.licenseNumber}
                                    </Tooltip>
                                  }
                                >
                                  <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                </OverlayTrigger>
                                </div>
                                <div className="col-md-3" style={{ position: 'relative' }}>
                                  <label className="form-label">
                                    <strong>license issue date</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {motortooltip?.insuredDetails?.drivingDetails?.licenseIssueDate}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle mx-1" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="issuedate"
                                    onChange={(e) => setIssueDatedata(e.target.value)}
                                    defaultValue={formatDate(issueDate)}
                                  />
                                </div>
                                
                                <div className="col-md-3" style={{ position: 'relative' }}>
                                  <label className="form-label">
                                    <strong>license expiry date</strong>
                                <OverlayTrigger
                                  key="right"
                                  placement="right"
                                  overlay={
                                    <Tooltip id="tooltip-right">
                                      {motortooltip?.insuredDetails?.drivingDetails?.licenseExpiryDate}
                                    </Tooltip>
                                  }
                                >
                                  <i className="fa fa-question-circle mx-1" aria-hidden="true"></i>
                                </OverlayTrigger>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="expirydate"
                                    onChange={(e) => setExpiryDatedata(e.target.value)}
                                    defaultValue={formatDate(expiryDate)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <label className="form-label">
                                    <strong>license issuing Emirate</strong>
                                  </label>

                                  <select className="form-control"
                                    name="essuingEmirate"
                                    defaultValue={issuingEmiratedata}
                                    onChange={(e) => setIssuingEmiratedata(e.target.value)}
                                  >
                                    <option value="" hidden>--None--</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Abu Dhabi">Abu Dhabi</option>
                                    <option value="Sharjah">Sharjah</option>
                                    <option value="Ajman">Ajman</option>
                                    <option value="Fujairah">Fujairah</option>
                                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                    <option value="Umm Al Quwain">Umm Al Quwain</option>

                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Chassis number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="chassisNumber"
                                defaultValue={chassisNumber}
                                onChange={(e) => setChassisNumberdata(e.target.value)}
                              />
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.chassisNumber}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Engine number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="EnginNumber"
                                defaultValue={EnginNumberdata}
                                onChange={(e) => setEnginNumberdata(e.target.value)}

                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.engineNumber}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Registration number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="registrationNumber"
                                defaultValue={registrationNumberdata}
                                onChange={(e) => setRegistrationNumberdata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.registrationNumber}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Plate Category</strong>
                              </label>
                              <select onChange={(e) => setPlateCategorydata(e.target.value)} name="plateCategory" defaultValue={plateCategorydata} className="form-control">
                                <option value="">--None--</option>
                                <option value="Private">Private</option>
                                <option value="Commercial">Commercial</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>The first registration date</strong>
                              </label>
                              <input
                                className="form-control"
                                type="date"
                                name="ThefirstRegistrationDate"
                                min={minDate.toISOString().split('T')[0]}
                                max={maxDate.toISOString().split('T')[0]}
                                defaultValue={startDate.toISOString().split('T')[0]}
                                onChange={(e) => setFirstRegistrationDaatedata(e.target.value)}
                              />
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.policyIssueDate}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Country of Manufacturing </strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                defaultValue={countryOfManufacturingdata}
                                name="countryOfManufacturing"
                                onChange={(e) => setCountryOfManufacturingdata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.countryOfManufacturing}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Vehicle color</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="vehicleColour"
                                defaultValue={vehicleColourdata}
                                onChange={(e) => setVehicleColourdata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.vehicleColor}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Emirates ID number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="emiratesIdNumber"
                                defaultValue={idNumber}
                                onChange={(e) => setEmiratesIdNumberdata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.drivingDetails?.emiratesIDNumber}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Gender</strong>
                              </label>
                              <select onChange={(e) => setGenderData(e.target.value)} name="gender" defaultValue={genderdata} className="form-control">
                                <option value="">--None--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>


                        </>
                      )}

                      {(carnew === false && usedcar === false) && (
                        <>
                          <p>Vehicle renewal</p>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>TCF No</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="TCFno"
                                defaultValue={tcfno}
                                onChange={(e) => setTCFnodata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.TCFNo}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Driving Details</strong>
                                <h6 style={{ fontSize: '12px', color: 'red' }} className="my-2 d-flex">*Please verify all driving details and proceed accordingly.</h6>
                              </label>
                              <div className="row">
                                <div className="col-md-3" style={{ position: 'relative' }}> 
                                  <label className="form-label">
                                    <strong>license number</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="licenseNumber"
                                    defaultValue={licenseNumberdata == "" ? licensenumber : licenseNumberdata}
                                    onChange={(e) => setLicenseNumberdata(e.target.value)}
                                  />
                                <OverlayTrigger
                                  key="right"
                                  placement="right"
                                  overlay={
                                    <Tooltip id="tooltip-right">
                                      {motortooltip?.insuredDetails?.drivingDetails?.licenseNumber}
                                    </Tooltip>
                                  }
                                >
                                  <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                </OverlayTrigger>
                                </div>
                                <div className="col-md-3" style={{ position: 'relative' }}>
                                  <label className="form-label">
                                    <strong>license issue date</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {motortooltip?.insuredDetails?.drivingDetails?.licenseIssueDate}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle mx-1" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="issuedate"
                                    onChange={(e) => setIssueDatedata(e.target.value)}
                                    defaultValue={formatDate(issueDate)}
                                  />
                                
                                </div>
                                <div className="col-md-3" style={{ position: 'relative' }}>
                                  <label className="form-label">
                                    <strong>license expiry date</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {motortooltip?.insuredDetails?.drivingDetails?.licenseExpiryDate}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle mx-1" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="expirydate"
                                    onChange={(e) => setExpiryDatedata(e.target.value)}
                                    defaultValue={formatDate(expiryDate)}
                                  />
                                </div>
                                
                                <div className="col-md-3">
                                  <label className="form-label">
                                    <strong>license issuing Emirate</strong>
                                  </label>

                                  <select className="form-control"
                                    name="essuingEmirate"
                                    defaultValue={issuingEmiratedata}
                                    onChange={(e) => setIssuingEmiratedata(e.target.value)}
                                  >
                                    <option value="" hidden>--None--</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Abu Dhabi">Abu Dhabi</option>
                                    <option value="Sharjah">Sharjah</option>
                                    <option value="Ajman">Ajman</option>
                                    <option value="Fujairah">Fujairah</option>
                                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                    <option value="Umm Al Quwain">Umm Al Quwain</option>

                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Chassis number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="chassisNumber"
                                defaultValue={chassisNumber}
                                onChange={(e) => setChassisNumberdata(e.target.value)}
                              />
                            </div>

                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.chassisNumber}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Engine number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="EnginNumber"
                                defaultValue={EnginNumberdata}
                                onChange={(e) => setEnginNumberdata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.engineNumber}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Registration number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="registrationNumber"
                                defaultValue={registrationNumberdata}
                                onChange={(e) => setRegistrationNumberdata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.registrationNumber}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Plate Category</strong>
                              </label>
                              <select onChange={(e) => setPlateCategorydata(e.target.value)} name="plateCategory" defaultValue={plateCategorydata} className="form-control">
                                <option value="">--None--</option>
                                <option value="Private">Private</option>
                                <option value="Commercial">Commercial</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>The first registration date</strong>
                              </label>
                              <input
                                className="form-control"
                                type="date"
                                name="ThefirstRegistrationDate"
                                min={minDate.toISOString().split('T')[0]}
                                max={maxDate.toISOString().split('T')[0]}
                                defaultValue={startDate.toISOString().split('T')[0]}
                                onChange={(e) => setFirstRegistrationDaatedata(e.target.value)}
                              />
                            </div>
                            <OverlayTrigger
                              key="right"
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-right">
                                  {motortooltip?.insuredDetails?.policyIssueDate}
                                </Tooltip>
                              }
                            >
                              <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                            </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Country of Manufacturing </strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="countryOfManufacturing"
                                defaultValue={countryOfManufacturingdata}
                                onChange={(e) => setCountryOfManufacturingdata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.countryOfManufacturing}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Vehicle color</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="vehicleColour"
                                defaultValue={vehicleColourdata}
                                onChange={(e) => setVehicleColourdata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.vehicleColor}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle " aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-4" style={{ position: 'relative' }}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Emirates ID number</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="emiratesIdNumber"
                                defaultValue={idNumber}
                                onChange={(e) => setEmiratesIdNumberdata(e.target.value)}
                              />
                            </div>
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-right">
                                {motortooltip?.insuredDetails?.drivingDetails?.emiratesIDNumber}
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                          </OverlayTrigger>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Gender</strong>
                              </label>
                              <select onChange={(e) => setGenderData(e.target.value)} name="gender" defaultValue={genderdata} className="form-control">
                                <option value="">--None--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>


                        </>
                      )}

                      <div>
                        <input
                          className="checkbox mx-2"
                          type="checkbox"
                          onChange={(e) => setAgreementdata(e.target.checked)}
                        />
                        <strong>Agree with <a className="termscond" onClick={handleShow}>Terms and Conditions</a></strong>
                      </div>
                    </div>




                    <div className="row">
                      <div className="col-md-12">

                        <div
                          type="submit"
                          className="btn-first btn-submit-fill logins"
                          style={{ float: "right" }}
                          onClick={HandleSubmitThankYou}
                        >
                          Submit
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      }

      {
        lob === "Travel" &&
        <div className="container">



          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body thankyoupage">
                  <form>
                    <div className="row">
                      {traveldata?.length > 0 && traveldata?.map((item, index) => (
                        <div className="col-md-4">
                          <label className="form-label">
                            <strong>Travel Type</strong>
                          </label>
                          <input
                            className="form-control"
                            name="Name"
                            type="text"
                            value={item?.travel_insurance_for_data?.map((item1) => item1.travel_insurance_for)}
                            readOnly
                          />
                        </div>
                      ))}

                      {traveldata?.length > 0 && traveldata?.map((item, index) => (
                        <div className="col-md-4">
                          <label className="form-label">
                            <strong>Travel Plan Type</strong>
                          </label>
                          <input
                            className="form-control"
                            name="number"
                            type="text"
                            value={item?.travel_plan_type_data?.map((item1) => item1?.travel_type)}
                            readOnly
                          />
                        </div>
                      ))}

                      {traveldata.length > 0 && traveldata.map((item, index) => (
                        <div className="col-md-4">
                          <label className="form-label">
                            <strong>No of Travel Days</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="email"
                            value={item?.no_of_travel}
                            readOnly
                          />
                        </div>
                      ))}

                      {traveldata.length > 0 && traveldata.map((item, index) => (
                        <div className="col-md-4">
                          <label className="form-label">
                            <strong>Start Date</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={moment(new Date(item?.travel_start_date)).format("DD/MM/YYYY")}
                            readOnly
                          />
                        </div>
                      ))}

                      {traveldata.length > 0 && traveldata.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>End Date</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={moment(new Date(item?.travel_end_date)).format("DD/MM/YYYY")}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}


                      {traveldata.length > 0 && traveldata.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Type of trip</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item?.travel_trip_type_data?.map((item1) => item1?.travel_plan_type)}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}

                      {traveldata.length > 0 && traveldata.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Destination</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item?.nationality}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}

                      {traveldata.length > 0 && traveldata.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Name</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="registration_year"
                              value={item?.name}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                      {traveldata.length > 0 && traveldata.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Phone No</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item.phoneno}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}

                      {traveldata.length > 0 && traveldata.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Email</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={item?.email}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                      {traveldata.length > 0 && traveldata.map((item, index) => (
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">
                              <strong>Date Of Birth</strong>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="message"
                              value={moment(new Date(item?.date_of_birth)).format("DD/MM/YYYY")}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                      {traveldata.length > 0 && traveldata.map((item, index) => (
                        <>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Passport</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="registration_year"
                                value={item?.passport_no}
                                readOnly
                              />
                            </div>
                          </div>
                          <p>Beneficiary Details</p>
                          {
                            // item?.travel_beneficiary_details?.map((bd, indx) => (
                            <div className="row">

                              <div className="col-md-3" style={{position:'relative'}}>
                                <div className="form-group">
                                  <label className="form-label">
                                    <strong>Name</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="beneficiary_name"
                                    defaultValue={traveldata?.map((item) => item?.travel_beneficiary_details?.map((bd) => bd?.Name))}
                                    // readOnly
                                    onChange={(e) => setBeneficiary_name(e.target.value)}
                                  />
                                </div>
                                <OverlayTrigger
                                  key="right"
                                  placement="right"
                                  overlay={
                                    <Tooltip id="tooltip-right">
                                      {traveltootip?.beneficiaryDetails?.name}
                                    </Tooltip>
                                  }
                                >
                                  <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                </OverlayTrigger>
                              </div>
                              <div className="col-md-3" style={{ position: 'relative' }}>
                                <div className="form-group">
                                  <label className="form-label">
                                    <strong>Phone Number</strong>
                                  </label>
                                  {/* <input
                                      className="form-control"
                                      type="number"
                                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                      name="beneficiary_phone_no"
                                      defaultValue={traveldata?.map((item) => item?.travel_beneficiary_details?.map((bd) => bd?.phoneno))}
                                      // readOnly
                                      onChange={(e) => setBeneficiary_phoneno(e.target.value)}
                                    /> */}
                                  <PhoneInput
                                    international
                                    name="Beneficiary_phoneno"
                                    className="form-control"
                                    defaultCountry="AE"
                                    value={firstBeneficiaryPhoneNo}
                                    onChange={(value) => setBeneficiary_phoneno(value)}
                                  />
                                </div>
                                <OverlayTrigger
                                  key="right"
                                  placement="right"
                                  overlay={
                                    <Tooltip id="tooltip-right">
                                      {traveltootip?.beneficiaryDetails?.phone}
                                    </Tooltip>
                                  }
                                >
                                  <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                </OverlayTrigger>
                              </div>
                              <div className="col-md-3" style={{ position: 'relative' }}>
                                <div className="form-group">
                                  <label className="form-label">
                                    <strong>Email</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="email"
                                    name="beneficiary_email"
                                    defaultValue={traveldata?.map((item) => item?.travel_beneficiary_details?.map((bd) => bd?.email))}
                                    // readOnly
                                    onChange={(e) => setBeneficiary_email(e.target.value)}
                                  />
                                </div>
                                <OverlayTrigger
                                  key="right"
                                  placement="right"
                                  overlay={
                                    <Tooltip id="tooltip-right">
                                      {traveltootip?.beneficiaryDetails?.email}
                                    </Tooltip>
                                  }
                                >
                                  <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                </OverlayTrigger>
                              </div>
                              <div className="col-md-3" style={{ position: 'relative' }}>
                                <div className="form-group">
                                  <label className="form-label">
                                    <strong>Passport</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="beneficiary_passport_no"
                                    defaultValue={traveldata?.map((item) => item?.travel_beneficiary_details?.map((bd) => bd?.passportNumber))}
                                    // readOnly
                                    onChange={(e) => setBeneficiary_passport_no(e.target.value)}
                                  />
                                </div>
                                <OverlayTrigger
                                  key="right"
                                  placement="right"
                                  overlay={
                                    <Tooltip id="tooltip-right">
                                      {traveltootip?.beneficiaryDetails?.passport}
                                    </Tooltip>
                                  }
                                >
                                  <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                </OverlayTrigger>
                              </div>
                            </div>
                            // ))

                          }
                        </>

                      ))}




                      <div>
                        <input
                          className="checkbox mx-2"
                          type="checkbox"
                          onChange={(e) => setTravelagreementdata(e.target.checked)}
                        />
                        <strong>Agree with <a className="termscond" onClick={handleTravelShow}>Terms and Conditions</a></strong>
                      </div>
                    </div>




                    <div className="row">
                      <div className="col-md-12">

                        <div
                          type="submit"
                          className="btn-first btn-submit-fill logins"
                          style={{ float: "right" }}
                          onClick={HandleTravelSubmitThankYou}
                        >
                          Submit
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {lob === "Home" &&
        <HomeThankYouFormPage handleLogin={handleLogin} policyData={policyData} leadid={leadid} traveldata={traveldata} travelfamilyeffect={travelfamilyeffect} settravelfamilyeffect={settravelfamilyeffect}
          handleModal={handleModal} params={params} travelagreementdata={travelagreementdata} setTravelagreementdata={setTravelagreementdata} />
      }
      {/* {lob === "Medical" &&
        <MedicalThankYouFormPage
          handleLogin={handleLogin
          } policyData={policyData}
          leadid={leadid}
          traveldata={traveldata}
          travelfamilyeffect={travelfamilyeffect}
          settravelfamilyeffect={settravelfamilyeffect}
          handleModal={handleModal}
          params={params}
          travelagreementdata={travelagreementdata}
          setTravelagreementdata={setTravelagreementdata}

          passportnumber={passportnumber}
          emiratesid={emiratesid}
          emiratesidexpirydate={emiratesidexpirydate}
          visafile={visafile}
          spomsorname={spomsorname}
          spomsordob={spomsordob}
          spomsorgender={spomsorgender}
          spomsoruidnumber={spomsoruidnumber}
          spomsorfilenumber={spomsorfilenumber}
          tradelicensenumber={tradelicensenumber}
          tradelicenseexpirydate={tradelicenseexpirydate}
          trnnumber={trnnumber}
        />
      } */}
      {lob === "Yacht" &&
        <YachtThankYouFormPage handleLogin={handleLogin} policyData={policyData} leadid={leadid} traveldata={traveldata} travelfamilyeffect={travelfamilyeffect} settravelfamilyeffect={settravelfamilyeffect}
          handleModal={handleModal} params={params} travelagreementdata={travelagreementdata} setTravelagreementdata={setTravelagreementdata} />
      }
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => { setVisible(false); GetAllDocuments(); }}

      >
        <CModalHeader onClose={() => { setVisible(false); GetAllDocuments(); }}>
          <CModalTitle>Upload {docData.fileName}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            {loading ?
              <div className="overlay">
                <div className="loader-container">
                  <CProgress color="primary" variant="striped" animated value={100} />
                  <div>Uploading, please wait...</div>
                  <div className="loader-text">Do Not Refresh The Page</div>
                  {/* <ClipLoader color="green" loading={loading} size={100} /> */}
                </div>
              </div>
              :
              <label for="images" class="drop-container" id="dropcontainer">
                <span class="drop-title">Drag and Drop file here</span>
                or
                <input
                  type="file"
                  className="form-control"
                  id="DHA"
                  defaultValue=""
                  required
                  onChange={(e) => handleFileUpload(e, docData.index)}
                />
              </label>
            }
          </div>
        </CModalBody>
        <CModalFooter>

          <CButton color="gotodashboard" onClick={uploadAllDocuments}>
            Upload
          </CButton>
          <CButton color="gotodashboard12" onClick={() => { setVisible(false); GetAllDocuments(); }}>
            Close
          </CButton>

        </CModalFooter>
      </CModal>
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton ></Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <div className="col-md-12">
                <div className="form-group col-md-12">
                  {filedata?.includes(".pdf") ? (
                    <div>
                      <iframe
                        title="PDF Viewer"
                        style={{
                          width: "100%",
                          height: "300px",
                          border: "none",
                        }}
                        src={`${API_URL}/documents/${filedata}`}
                      />
                    </div>
                  ) : (
                    <img
                      style={{ width: "100%", height: "auto" }}
                      src={`${API_URL}/documents/${filedata}`}
                    />
                  )}
                </div>
              </div>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="md" centered
        aria-labelledby="contained-modal-title-vcenter" show={motortermshow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Motor T&C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="paragraph">{
            TermsAndConditionsdata
          }</p>

        </Modal.Body>
        <Modal.Footer style={{ padding: '5px 10px' }}>
          <a className="savechanges" onClick={handleClose}>
            Ok
          </a>
        </Modal.Footer>
      </Modal>

      <Modal size="md" centered
        aria-labelledby="contained-modal-title-vcenter" show={traveltermshow} onHide={handleTravelClose}>
        <Modal.Header closeButton>
          <Modal.Title>Travel T&C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="paragraph">{
            TermsAndConditionsdata
          }</p>

        </Modal.Body>
        <Modal.Footer style={{ padding: '5px 10px' }}>
          <a className="savechanges" onClick={handleTravelClose}>
            Ok
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubmitDocument;
