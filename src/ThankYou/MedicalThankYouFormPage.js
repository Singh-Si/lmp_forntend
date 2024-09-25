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
  OverlayTrigger,
  Row,
  Tooltip,
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
import { get, set } from "firebase/database";
import Homeinsurance from "../Components/Home/Homeinsurance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Moment from "react-moment";
import FamilyDocuments from "./FamilyDocuments";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Input from 'react-phone-number-input/input'

const Tesseract = require('tesseract.js');

const MedicalThankYouFormPage = () => {

  const params = new URLSearchParams(window.location.search);
  let insurancetype = params.get("lob")
  const lob = params?.get("lob");

  const { setToken, setUserData } = UseUserContext();
  const navigate = useNavigate();
  const [id, setId] = useState(params.get("id") || params.get("leadid"))
  const [hoemdata, sethoemdata] = useState({})
  const [documentdetaildata, setdocumentdetaildata] = useState([])
  const [show, setShow] = useState(false);
  const [policyData, setPolicyData] = useState([]);
  const [sponsorpolicyData, setsponsorpolicyData] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [docData, setDocData] = useState({});
  const [visible, setVisible] = useState(false);

  const [visa_type_id, setVisa_type_id] = useState("");
  const [loading, setLoading] = useState(false);
  const [filedata, setFiledata] = useState("");
  const [leadid, setleadid] = useState(params.get("id") ? params.get("id") : params.get("leadid") ? params.get("leadid") : "");
  const [details, setDetails] = useState([])
  const [travelagreementdata, setTravelagreementdata] = useState(false)

  const visa_type = lob == 'Medical' ? params?.get("visa_type_id") : '';


  
  const [emiratesid, setEmiratesid] = useState('')
  const [emiratesidissuedate, setEmiratesidissuedate] = useState('')
  const [emiratesidexpirydate, setEmiratesidexpirydate] = useState('')
  const [visafileno, setVisafileno] = useState('')
  const [visaissuedate, setVisaissuedate] = useState('')
  const [visaexpirydate, setVisaexpirydate] = useState('')
  const [passportnumber, setPassportnumber] = useState('')
  const [passportissuedate, setPassportissuedate] = useState('')
  const [passportexpirydate, setPassportexpirydate] = useState('')
  const [EstablishmentCardno, setEstablishmentCardno] = useState('')
  const [EstablishmentCardexpirydate, setEstablishmentCardexpirydate] = useState('')
  const [taxregistrationnumber, setTaxregistrationnumber] = useState('')
  const [tradelicensenumber, setTradelicensenumber] = useState('')
  const [tradelicenseexpirydate, setTradelicenseexpirydate] = useState('')
  const [sponsoremiratesid, setSponsoremiratesid] = useState('')
  const [sponsoremiratesidissuedate, setSponsoremiratesidissuedate] = useState('')
  const [sponsoremiratesidexpirydate, setSponsoremiratesidexpirydate] = useState('')
  const [sponsorvisa, setSponsorvisa] = useState('')
  const [sponsorvisaissuedate, setSponsorvisaissuedate] = useState('')
  const [sponsorvisaexpirydate, setSponsorvisaexpirydate] = useState('')
  const [sponsorpassportnumber, setSponsorpassportnumber] = useState('')
  const [sponsorpassportexpirydate, setSponsorpassportexpirydate] = useState('')
  
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
  const [trnnumber, setTrnnumber] = useState('')
  const [passportnumberdata, setPassportnumberdata] = useState('')
  const [emiratesiddata, setEmiratesiddata] = useState('')
  const [emiratesidexpirydatedata, setEmiratesidexpirydatedata] = useState('')
  const [visauidnumberdata, setVisauidnumberdata] = useState('')
  const [spomsornamedata, setSpomsornamedata] = useState('')
  const [spomsordobdata, setSpomsordobdata] = useState('')
  const [spomsorgenderdata, setSpomsorgenderdata] = useState('')
  const [spomsoruidnumberdata, setSpomsoruidnumberdata] = useState('')
  const [spomsorfilenumberdata, setSpomsorfilenumberdata] = useState('')
  const [spomsorpassportnumberdata, setSpomsorpassportnumberdata] = useState('')
  const [spomsoreidnumberdata, setSpomsoreidnumberdata] = useState('')
  const [spomsorsalarydata, setSpomsorsalarydata] = useState('')
  const [spomsoremailaddressdata, setSpomsoremailaddressdata] = useState('')
  const [spomsorphonenumberdata, setSpomsorphonenumberdata] = useState('')
  const [trnnumberdata, setTrnnumberdata] = useState('')
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);


  const [fieldValues, setFieldValues] = useState([]);
  const [individualtooltip, setIndividualtooltip] = useState({});
  useEffect(() => {
    getDocumentsLob()
    GetAllDocuments()
    getdetailbyid()
    getIndividualtooltip()

  }, [leadid]);
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
          console.log('individual tooltip data:', data);
          setIndividualtooltip(data?.data)
        })
        .catch((error) => {
          console.log('error:', error);
        });
    } catch (error) {
      console.log('error:', error);
    }
  }

 
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


  useEffect(() => {
    setleadid(params.get("id") ? params.get("id") : params.get("leadid") ? params.get("leadid") : "")
    handlePaymentstatus()

  }, [])

  console.log("hoemdata", hoemdata) 

  const handleLogin = async (e) => {
    // alert("handleLogin")
    e.preventDefault();

    const email = hoemdata.email
    if (email) {
      await axios.get(
        API_URL + "/api/documentSubmitLoginCustomer?email=" + email
      ).then((response) => {
        //console.log("response data", response);

        if (response.status === 200) {
          setToken(response.data?.token);
          localStorage.setItem("usertoken", response.data?.token);
          setUserData(response.data.data);
        
            // navigate("/Mypolicies");
            window.location.href = "/Mypolicies"
          
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


  useEffect(() => {
    getDocumentsLob()
    getsponsorDocumentsLob()
  }, [visa_type_id]);

  const getDocumentsLob = async () => {

    let insuranseLoby = insurancetype && insurancetype === "Yacht" ? "Yacht" : "Motor"
    console.log("insuranseLoby", insurancetype)
    console.log("visa_type_id", visa_type_id)
    await axios
      .get(`${API_URL}/api/getDocumentsLob?lob=${lob}&visTypeId=${visa_type}&documentFor=insuer`)
      .then((result) => {
        setPolicyData(result.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getsponsorDocumentsLob = async () => {


    console.log("visa_type_id", visa_type_id)
    await axios
      .get(`${API_URL}/api/getDocumentsLob?lob=${lob}&visTypeId=${visa_type}&documentFor=sponser`)
      .then((result) => {
        setsponsorpolicyData(result.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  console.log("policyData", policyData);
  console.log("sponsorpolicyData", sponsorpolicyData);

  const GetAllDocuments = async () => {
    try {

      await getCardetailsByLeadid(leadid)
        .then(async (response) => {
          setVisa_type_id(response?.visa_type)
          setDocuments(response.documents)
          console.log("response", documents)
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

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = async (event) => {
  //     const result = event.target.result;

  //     if (file.type === 'application/pdf') {
  //       const text = await extractTextFromPDF(result);
  //       setText(text);
  //     } else if (file.type.startsWith('image/')) {
  //       const text = await performOCR(result);
  //       setText(text);
  //     } else {
  //       console.error('Unsupported file format');
  //     }
  //   };

  //   if (file) {
  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  // const extractTextFromPDF = async (fileData) => {
  //   try {
  //     const pdf = await pdfjs.getDocument(fileData).promise;
  //     const text = [];

  //     for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
  //       const page = await pdf.getPage(pageNumber);
  //       const textContent = await page.getTextContent();
  //       text.push(textContent.items.map((item) => item.str).join(' '));
  //     }

  //     return text.join('\n');
  //   } catch (error) {
  //     console.error('Error extracting text from PDF:', error);
  //     throw error;
  //   }
  // };


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
    let lastProgress = 0;
    return new Promise((resolve, reject) => {
      Tesseract.recognize(
        imageFile,
        'eng', // Specify language (e.g., 'eng' for English)
        {
          logger: (info) => {
            console.log("info",info);
         
            // if (info.status === 'recognizing text') {
            //   console.log('Progress:', info.progress);
            //   const currentProgress = info.progress * 100;
            //   setProgress(currentProgress); // Update progress percentage
            // }
            if(info.status === 'recognizing text'){
              const currentProgress = info.progress * 100;
              if (currentProgress != lastProgress) { // Check if progress has changed 
                setProgress(currentProgress); // Update progress percentage
                lastProgress = currentProgress; // Update last progress value
              }
            }
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


  const extractPassportNumber = (ocrText) => {
    // const passportNumberRegex = /T(\d+)/;
    // const passportNumberRegex = /[A-Za-z](\d+)/;
    const passportNumberRegex = /[A-Z0-9]{9}[A-Z0-9]?/;

    const match = ocrText.match(passportNumberRegex);

    if (match) {
      const passportNumber = match[0]; // Extracted passport number
      return passportNumber;
    } else {
      return null; // Passport number not found
    }
  };

  const extractPassportIssueDate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    // const issueDateRegex = /(\d{2}\/\d{2}\/\d{4})/g; // Add 'g' flag for global search
    const issueDateRegex = /(\d{2}\/\d{2}\/\d{4})/g;
    const match = ocrText.match(issueDateRegex);

    if (match) {
      console.log('Match:', match);
      const issueDate = match[1]; // Extracted issue date
      console.log('Issue Date:', issueDate );
      return issueDate;
    } else {
      return null; // Issue date not found
    }
  };



  const extractpassportexpiryDate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const expiryDateRegex = /(\d{2}\/\d{2}\/\d{4})/g; // Add 'g' flag for global search
    const match = ocrText.match(expiryDateRegex);

    if (match) {
      
      const expiryDate = match[0]; // Extracted expiry date
      console.log('Expiry Date:', expiryDate);
      
      return expiryDate;
    } else {
      return null; // Expiry date not found
    }
  };

  const extractEmiratesId = (ocrText) => {
    const emirateidRegex = /\d{3}-\d{4}-\d{7}-\d/;
    const match = ocrText.match(emirateidRegex);

    if (match) {
      const emirateId = match[0]; // Extracted visa number
      console.log(emirateId)
      return emirateId;
    } else {
      return null; // Visa number not found
    }
  };
  const extractEmiratesIdIssueDate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const issueDateRegex =/(\d{2}\/\d{2}\/\d{4})/g; // Add 'g' flag for global search

    let match;
    let minIssueDate = null;

    console.log('dates', issueDateRegex.exec(ocrText))

    while ((match = issueDateRegex.exec(ocrText)) !== null) {
      const currentIssueDate = match[0];

      if (!minIssueDate || currentIssueDate <= minIssueDate) {
        minIssueDate = currentIssueDate;
        break;
      }
      else {
        console.log('Issue Date not found');
        return null;
    }
    }

    console.log('Min Issue Date:', minIssueDate);
    return minIssueDate;
  };
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
      else {
        console.log('Expiry Date not found');
        return null;
    }
    }

    console.log('Max Expiry Date:', maxExpiryDate);
    return maxExpiryDate;
  };

  const extractVisafileno = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const visaNumberRegex = /\d{3}\/\d{4}\/\d{1}\/\d{6}/g; // Add 'g' flag for global search
    const match = ocrText.match(visaNumberRegex);

    if (match) {
      const visaNumber = match[0]; // Extracted visa number
      console.log('Extracted Visa Number:', visaNumber);
      return visaNumber;
    } else {
      return null; // Visa number not found
    }
  };

  const extractVisaissuedate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const issueDateRegex = /(\d{2}\/\d{2}\/\d{4})/;
    let match;
    let minIssueDate = null;

    console.log('dates', issueDateRegex.exec(ocrText))

    while ((match = issueDateRegex.exec(ocrText)) !== null) {
      const currentIssueDate = match[1];

      if (!minIssueDate || currentIssueDate <= minIssueDate) {
        minIssueDate = currentIssueDate;
        break;
      }
      else {
        console.log('Issue Date not found');
        return null;
    }
    }

    console.log('Min Issue Date:', minIssueDate);
    return minIssueDate;
  };

  const extractVisaexpirydate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const expiryDateRegex = /(\d{2}\/\d{2}\/\d{4})/g; // Add 'g' flag for global search
    const match = ocrText.match(expiryDateRegex);

    if (match) {
      const expiryDate = match[0]; // Extracted expiry date
      console.log('Expiry Date:', expiryDate);
      
      return expiryDate;
    } else {
      return null; // Expiry date not found
    }
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

  const extracttaxregistrationnumber = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const taxRegistrationNumberRegex = /Tax Registration Number \d+/;
    const match = ocrText.match(taxRegistrationNumberRegex);

    if (match) {
      const taxRegistrationNumber = match[0]; // Extracted tax registration number
      console.log("tax registration number>>>", taxRegistrationNumber)
      return taxRegistrationNumber.replace("Tax Registration Number", "");
    } else {
      return null; // Tax registration number not found
    }
  };

  const extractSponsorEmiratesId = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const emirateidRegex = /\d{3}-\d{4}-\d{7}-\d/;
    const match = ocrText.match(emirateidRegex);

    if (match) {
      const emirateId = match[0]; // Extracted visa number
      console.log(emirateId)
      return emirateId;
    } else {
      return null; // Visa number not found
    }
  };

  const extractSponsorEmiratesIdIssueDate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const issueDateRegex = /(\d{2}\/\d{2}\/\d{4})/g; // Add 'g' flag for global search

    let match;
    let minIssueDate = null;

    console.log('dates', issueDateRegex.exec(ocrText))

    while ((match = issueDateRegex.exec(ocrText)) !== null) {
      const currentIssueDate = match[0];

      if (!minIssueDate || currentIssueDate <= minIssueDate) {
        minIssueDate = currentIssueDate;
        break;
      }
      else {
        console.log('Issue Date not found');
        return null;
    }
    }

    console.log('Min Issue Date:', minIssueDate);
    return minIssueDate;
  };
  const extractSponsorEmiratesIdExpiryDate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const expiryDateRegex = /(\d{2}\/\d{2}\/\d{4})/g; // Add 'g' flag for global search

    let match;
    let maxExpiryDate = null;

    while ((match = expiryDateRegex.exec(ocrText)) !== null) {
      const currentExpiryDate = match[0];

      if (!maxExpiryDate || currentExpiryDate >= maxExpiryDate) {
        maxExpiryDate = currentExpiryDate;

      }
      else {
        console.log('Expiry Date not found');
        return null;
    }
    }

    console.log('Max Expiry Date:', maxExpiryDate);
    return maxExpiryDate;
  };

  const extractSponsorVisa = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const visaNumberRegex = /\d{3}\/\d{4}\/\d{1}\/\d{6}/g; // Add 'g' flag for global search
    const match = ocrText.match(visaNumberRegex);

    if (match) {
      const visaNumber = match[0]; // Extracted visa number
      console.log('Extracted Visa Number:', visaNumber);
      return visaNumber;
    } else {
      return null; // Visa number not found
    }
  };

  const extractSponsorvisaIssuedate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const issueDateRegex = /(\d{2}\/\d{2}\/\d{4})/g; // Add 'g' flag for global search

    let match;
    let minIssueDate = null;

    console.log('dates', issueDateRegex.exec(ocrText))

    while ((match = issueDateRegex.exec(ocrText)) !== null) {
      const currentIssueDate = match[0];

      if (!minIssueDate || currentIssueDate <= minIssueDate) {
        minIssueDate = currentIssueDate;
        break;
      }
      else {
        console.log('Issue Date not found');
        return null;
    }
    }
  };



  const extractSponsorPassport = (ocrText) => {
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

  const extractSponsorPassportExpiryDate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const expiryDateRegex = /(\d{2}\/\d{2}\/\d{4})/g; // Add 'g' flag for global search
    const match = ocrText.match(expiryDateRegex);

    if (match) {
      const expiryDate = match[0]; // Extracted expiry date
      console.log('Expiry Date:', expiryDate);
      return expiryDate;
    } else {
      return null; // Expiry date not found
    }
  };

  const extractestablishmentCardNumber = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const establishmentCardNumberRegex = /\b\d{3}-\d{7}\b/;
    const match = ocrText.match(establishmentCardNumberRegex);
    
    if (match) {
      const establishmentCardNumber = match[0]; // Extracted trade license number
      return establishmentCardNumber;
    } else {
      return null; // Trade license number not found
    }
  };

  const extractestablishmentCardExpiryDate = (ocrText) => {
    console.log('OCR Text:', ocrText);
    const expiryDateRegex =/\b\d{4}-\d{2}-\d{2}\b/; 
    const match = ocrText.match(expiryDateRegex);

    if (match) {
      const expiryDate = match[0]; // Extracted expiry date
      console.log('Expiry Date:', expiryDate);
      return expiryDate;
    } else {
      return null; // Expiry date not found
    }
  };





 


  function formatDateeee(dateString) {
    if (dateString) {
      const parts = dateString.split('/');

      if (parts.length === 3) {
        const [day, month, year] = parts;
        const isoDateString = `${year}-${month}-${day}`;

        // Check if the formatted string is a valid date
        if (!isNaN(new Date(isoDateString).getTime())) {
          return new Date(isoDateString).toISOString();
        }
      }

      return ''; // Invalid date string
    }

  }


  const formatDatee = (dateString) => {
    const parts = dateString.split('-'); // Split the date string into parts
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    if(parts.length === 3){
      const isoDateString = `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD"
      return new Date(isoDateString).toISOString();
    }

    return ``; // Format the date as "DD/MM/YYYY"
};
    

  const uploadAllDocuments = async () => {
    try {
      setLoading(true);
    // for (let i = 0; i <= 100; i++) {
    //   setProgress(i);
    //   await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate delay
    // }

    let docId = params.get("id") || params.get("leadid")
    const formData = new FormData();
    const documentName = docData.fileName;
    const fileIndex = docData.index;
    const documentFile = uploadedDocuments[docData.index];

    console.log("documentFile", documentFile)


    if(documentFile.type != "application/pdf"){


    let ocrText = '';

    // Perform OCR only if the document is "Driving license Front Side"


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
      const passportissuedatedata = extractPassportIssueDate(ocrText);
      if (passportissuedatedata) {
        console.log('Extracted Passport Issue Date:',formatDateeee(passportissuedatedata));
        const date =  formatDateeee(passportissuedatedata)
        if(date){
          console.log('Extracted Passport Expiry Date12233434444:', date);
          setPassportissuedate(date);
        }
       
      }
      const passportexpirydatedata = extractpassportexpiryDate(ocrText);
      if (passportexpirydatedata) {
        console.log('Extracted Passport Expiry Date:', formatDateeee(passportexpirydatedata));
        const date =  formatDateeee(passportexpirydatedata)
        if(date){
          console.log('Extracted Passport Expiry Date12233434444:', date);
          setPassportexpirydate(date);
        }
      }
     
    }
    

    if (documentName === 'Visa') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const visaNumber = extractVisafileno(ocrText);
      if (visaNumber) {
        console.log('Extracted Visa Number:', visaNumber);
        setVisafileno(visaNumber);
        // setObjData({ ...objData,["visaNumber"]:visaNumber});
      }
      const visaIssueDate = extractVisaissuedate(ocrText);
      if (visaIssueDate) {
        console.log('Extracted Visa Issue Date:', formatDateeee(visaIssueDate));
        const date = formatDateeee(visaIssueDate);
        if(date){
          console.log('Extracted Visa Issue Date12233434444:', date);
          setVisaissuedate(date);
        }
      }
      const visaExpiryDate = extractVisaexpirydate(ocrText);
      if (visaExpiryDate) {
        console.log('Extracted Visa Expiry Date:', formatDateeee(visaExpiryDate));
        const date = formatDateeee(visaExpiryDate);
        if(date){
          console.log('Extracted Visa Expiry Date12233434444:', date);
          setVisaexpirydate(date);
        }
      }

    }

    if (documentName === 'Emirates ID') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const emiratesid = extractEmiratesId(ocrText);
      if (emiratesid) {
        console.log('Extracted Emirates ID:', emiratesid);
        setEmiratesid(emiratesid);
      }
      const Issuedate = extractEmiratesIdIssueDate(ocrText);
      if (Issuedate) {
        console.log('Extracted Issuedate date:', formatDateeee(Issuedate));
        const date = formatDateeee(Issuedate);
        if(date){
          console.log('Extracted Passport Issuedate Date12233434444:', date);
          setEmiratesidissuedate(date);
        }
        
      }
      const Expirydate = extractEmiratesIdExpiryDate(ocrText);
      if (Expirydate) {
        console.log('Extracted expiry date:', formatDateeee(Expirydate));
        const date = formatDateeee(Expirydate);
        if(date){
          console.log('Extracted Passport Expiry Date12233434444:', date);
          setEmiratesidexpirydate(date);
        }
        
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
        console.log('Extracted Trade License Expiry Date:', formatDateeee(tradeLicenseExpiryDate));
        const date = formatDateeee(tradeLicenseExpiryDate);
        if(date){
          console.log('Extracted Trade License Expiry Date12233434444:', date);
        setTradelicenseexpirydate(date);
        }
      }
    }

    if (documentName === 'VAT Certificate') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const taxRegistrationNumber = extracttaxregistrationnumber(ocrText);
      if (taxRegistrationNumber) {
        console.log('Extracted Tax Registration Number:', taxRegistrationNumber);
        setTaxregistrationnumber(taxRegistrationNumber);
        // setObjData({ ...objData,["visaNumber"]:visaNumber});
      }
    }

    if (documentName === 'Establishment Card') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const establishmentCardNumber = extracttradelicensenumber(ocrText);
      if (establishmentCardNumber) {
        console.log('Extracted Establishment Card Number:', establishmentCardNumber);
        setEstablishmentCardno(establishmentCardNumber);
        // setObjData({ ...objData,["visaNumber"]:visaNumber});
      }
      const establishmentCardExpiryDate = extracttradelicenseexpirydate(ocrText);
      if (establishmentCardExpiryDate) {
        console.log('Extracted Establishment Card Expiry Date:', formatDateeee(establishmentCardExpiryDate));
        const date = formatDateeee(establishmentCardExpiryDate);
        if(date){
          console.log('Extracted Establishment Card Expiry Date12233434444:', date);
          setEstablishmentCardexpirydate(date);
        }
      }
    }

    if (documentName === 'Sponsor Emirates ID') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const sponsorEmiratesId = extractSponsorEmiratesId(ocrText);
      if (sponsorEmiratesId) {
        console.log('Extracted Sponsor Emirates ID:', sponsorEmiratesId);
        setSponsoremiratesid(sponsorEmiratesId);
      }
      const sponsorEmiratesIdIssueDate = extractSponsorEmiratesIdIssueDate(ocrText);
      if (sponsorEmiratesIdIssueDate) {
        console.log('Extracted Sponsor Emirates ID Issue Date:', formatDateeee(sponsorEmiratesIdIssueDate));
        const date = formatDateeee(sponsorEmiratesIdIssueDate);
        if(date){
          console.log('Extracted Sponsor Emirates ID Issue Date12233434444:', date);
          setSponsoremiratesidissuedate(date);
        }
      }
      const sponsorEmiratesIdExpiryDate = extractSponsorEmiratesIdExpiryDate(ocrText);
      if (sponsorEmiratesIdExpiryDate) {
        console.log('Extracted Sponsor Emirates ID Expiry Date:', formatDateeee(sponsorEmiratesIdExpiryDate));
        const date = formatDateeee(sponsorEmiratesIdExpiryDate);
        if(date){
          console.log('Extracted Sponsor Emirates ID Expiry Date12233434444:', date);
          setSponsoremiratesidexpirydate(date);
        }
      }
    }

    if (documentName === 'Sponsor Visa') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const sponsorVisa = extractSponsorVisa(ocrText);
      if (sponsorVisa) {
        console.log('Extracted Sponsor Visa:', sponsorVisa);
        setSponsorvisa(sponsorVisa);
      }
      const sponsorVisaIssueDate = extractSponsorvisaIssuedate(ocrText);
      if (sponsorVisaIssueDate) {
        console.log('Extracted Sponsor Visa Issue Date:', formatDateeee(sponsorVisaIssueDate));
        const date = formatDateeee(sponsorVisaIssueDate);
        if(date){
          console.log('Extracted Sponsor Visa Issue Date12233434444:', date);
          setSponsorvisaissuedate(date);
        }
      }
      const sponsorVisaExpiryDate = extractSponsorEmiratesIdExpiryDate(ocrText);
      if (sponsorVisaExpiryDate) {
        console.log('Extracted Sponsor Visa Expiry Date:', formatDateeee(sponsorVisaExpiryDate));
        const date = formatDateeee(sponsorVisaExpiryDate);
        if(date){
          console.log('Extracted Sponsor Visa Expiry Date12233434444:', date);
          setSponsorvisaexpirydate(date);
        }
      }
    }

    if (documentName === 'Sponsor Passport') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);
      const sponsorPassport = extractSponsorPassport(ocrText);
      if (sponsorPassport) {
        console.log('Extracted Sponsor Passport:', sponsorPassport);
        setSponsorpassportnumber(sponsorPassport);
      }
      const sponsorPassportExpiryDate = extractSponsorPassportExpiryDate(ocrText);
      if (sponsorPassportExpiryDate) {
        console.log('Extracted Sponsor Passport Expiry Date:', formatDateeee(sponsorPassportExpiryDate));
        const date = formatDateeee(sponsorPassportExpiryDate);
        if(date){
          console.log('Extracted Sponsor Passport Expiry Date12233434444:', date);
          setSponsorpassportexpirydate(date);
        }
      }
    }

    if (documentName === 'Establishment card') {
      console.log('OCR Result');
      const ocrResult = await performOCR(documentFile);
      ocrText = ocrResult.text;
      console.log('OCR Result:', ocrText);

      const establishmentCardNumber = extractestablishmentCardNumber(ocrText);
      if (establishmentCardNumber) {
        console.log('Extracted Establishment Card Number:', establishmentCardNumber);
        setEstablishmentCardno(establishmentCardNumber);
      }
      const establishmentCardExpiryDate = extractestablishmentCardExpiryDate(ocrText);
      if (establishmentCardExpiryDate) {
        console.log('Extracted Establishment Card Expiry Date:', formatDatee(establishmentCardExpiryDate));
        const date = formatDatee(establishmentCardExpiryDate);
        if(date){
          console.log('Extracted Establishment Card Expiry Date12233434444:', date);
          setEstablishmentCardexpirydate(date);
        }
      }
    }



    console.log("documentFile.type", documentFile.type)
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
          setProgress(0);
        });
    } else {
      alert("Please select required document");
    }

  }
  else{
    console.log("documentFile.type", documentFile.type)
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
            setVisible(false)
            // swal({
            //   text: "Uploaded Successfully",
            //   icon: "success",
            //   button: false,
            // })
            // setTimeout(() => {
            //   swal.close();
            // }, 1000)
          } else {
            swal("Error!", "Something went wrong", "error");
          }
        })
        .catch((error) => {
          //console.error(error);
        })
        .finally(() => {
          setLoading(false);
          setProgress(0);
        });
    } else {
      alert("Please select required document");
    }
  }
  }
  
  catch (error) {
    console.log(error.message);
  }

  };

  console.log("documents", documents);




  console.log(passportissuedate,"passportissuedate")
  console.log(passportexpirydate,"passportexpirydate")
  console.log(emiratesidissuedate,"emiratesidissuedate")
  console.log(emiratesidexpirydate,"emiratesidexpirydate")


  //  const handleFieldChange = (field, value) => {
  //         setFieldValues((prev) => ({
  //             ...prev,
  //             [field]: value,

  //         }));
  //     };


  const handleFieldChange = (index, field, value) => {
    setFieldValues((prev) => {
      const updatedFieldValues = [...prev]; // Create a copy of the array
      if (!updatedFieldValues[index]) {
        updatedFieldValues[index] = {}; // Ensure the index exists
      }
      updatedFieldValues[index][field] = value; // Update the specific field
      return updatedFieldValues;
    });
  };



  console.log('fieldValues', fieldValues);


  const handleClose = () => {
    // setTravelagreementdata(true)
    setShow(false)
  };
  
  
  // const handleTravelClose = () => {
    // setTraveltermshow(false)
    // };
    
    useEffect(() => {
      setdocumentdetaildata(policyData)
    }, [policyData])

  const [TermsAndConditionsdata, setTermsAndConditionsdata] = useState("")
  const [showterms, setShowTerms] = useState(false)
  useEffect(() => {
    setId(params.get("id") || params.get("leadid"))
    getdetailbyid()
    getTermsANdConditions()
  }, [leadid])

  useEffect(() => {
    getdetailbyid()
  }, [])
  
  
  const getdetailbyid = async () => {
    try {
      await axios
      .get(API_URL + "/api/getMedicalNewLeadDetails?leadId=" + id,
      )
      .then((response) => {
        console.log("response>>>>>", response.data.data)
        sethoemdata(response.data.data ? response.data.data[0] : {})
        setPassportnumber(response.data.data[0]?.medicalPassport?.number)
        setPassportissuedate(response.data.data[0]?.medicalPassport?.issueDate)
        setPassportexpirydate(response.data.data[0]?.medicalPassport?.expiryDate)
        setEmiratesid(response.data.data[0]?.medicalEmiratesId?.number)
        setEmiratesidissuedate(response.data.data[0]?.medicalEmiratesId?.issueDate)
          setEmiratesidexpirydate(response.data.data[0]?.medicalEmiratesId?.expiryDate)
          setVisafileno(response.data.data[0]?.medicalVisa?.number)
          setVisaissuedate(response.data.data[0]?.medicalVisa?.issueDate)
          setVisaexpirydate(response.data.data[0]?.medicalVisa?.expiryDate)
          setEstablishmentCardno(response.data.data[0]?.medicalEstablishmentCard?.number)
          setEstablishmentCardexpirydate(response.data.data[0]?.medicalEstablishmentCard?.expiryDate)
          setTaxregistrationnumber(response.data.data[0]?.medicalVatCertificate?.number)
          setTradelicensenumber(response.data.data[0]?.medicalTradeLicense?.number)
          setTradelicenseexpirydate(response.data.data[0]?.medicalTradeLicense?.expiryDate)
          setSponsoremiratesid(response.data.data[0]?.medicalSponsorEid?.number)
          setSponsoremiratesidissuedate(response.data.data[0]?.medicalSponsorEid?.issueDate)
          setSponsoremiratesidexpirydate(response.data.data[0]?.medicalSponsorEid?.expiryDate)
          setSponsorvisa(response.data.data[0]?.medicalSponsorVisa?.number)
          setSponsorvisaissuedate(response.data.data[0]?.medicalSponsorVisa?.issueDate)
          setSponsorvisaexpirydate(response.data.data[0]?.medicalSponsorVisa?.expiryDate)
          setSponsorpassportnumber(response.data.data[0]?.medicalSponsorPassport?.number)
          setSponsorpassportexpirydate(response.data.data[0]?.medicalSponsorPassport?.expiryDate)
          console.log("response>>>>>", response.data.data[0]?.medicalPassport?.number)

          
        })
        .catch((error) => {
          console.log(error.message);
        });
      } catch (error) {
        console.log(error.message);
    }
  }
  const getTermsANdConditions = async () => {
    await axios
    .get(API_URL + "/api/termsAndCondition?insuranceType=Medical")
    .then((response) =>
    setTermsAndConditionsdata(response.data.data?.terms_constions)
    )
    .catch((error) => { })
  }

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

  const FormatYYYMMDDDatepicker = (data) => {
    // Assuming issueDate is in "YYYY-MM-DD" format
    // Create a Date object from the issueDate string
    const date = new Date(data);

    // Extract the day, month, and year components
    const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    // Format the date as "DD-MM-YYYY"
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
  }


  const HandleHomeSubmitThankYou = async (e) => {
    try {
      e.preventDefault();
console.log('emiratesid', emiratesid);
console.log('emiratesidissuedate', emiratesidissuedate);
console.log('emiratesidexpirydate', emiratesidexpirydate);
console.log('visafileno', visafileno);
console.log('passportnumber', passportnumber);
console.log('passportissuedate', passportissuedate);
console.log('passportexpirydate', passportexpirydate);
console.log('EstablishmentCardno', EstablishmentCardno);
console.log('EstablishmentCardexpirydate', EstablishmentCardexpirydate);
console.log('taxregistrationnumber', taxregistrationnumber);
console.log('tradelicensenumber', tradelicensenumber);
console.log('tradelicenseexpirydatedata', tradelicenseexpirydate);
console.log('sponsoremiratesid', sponsoremiratesid);
console.log('sponsoremiratesidissuedate', sponsoremiratesidissuedate);
console.log('sponsoremiratesidexpirydate', sponsoremiratesidexpirydate);
console.log('sponsorvisa', sponsorvisa);
console.log('sponsorvisaissuedate', sponsorvisaissuedate);
console.log('sponsorvisaexpirydate', sponsorvisaexpirydate);
console.log('sponsorpassportnumber', sponsorpassportnumber);
console.log('sponsorpassportexpirydate', sponsorpassportexpirydate);





      let objData = {
        medicalEmiratesId: {
          number: emiratesid,
          issueDate: emiratesidissuedate,
          expiryDate: emiratesidexpirydate,
        },
        medicalVisa: {
          number: visafileno,
          issueDate: visaissuedate,
          expiryDate: visaexpirydate,
        },
        medicalPassport: {
          number: passportnumber,
          issueDate: passportissuedate,
          expiryDate: passportexpirydate,
        },
        medicalEstablishmentCard: {
          number: EstablishmentCardno,
          expiryDate: EstablishmentCardexpirydate,
        },
        medicalVatCertificate: {
          number: taxregistrationnumber,
        },
        medicalTradeLicense: {
          number: tradelicensenumber,
          expiryDate: tradelicenseexpirydate,
        },
        medicalSponsorEid: {
          number: sponsoremiratesid,
          issueDate: sponsoremiratesidissuedate,
          expiryDate: sponsoremiratesidexpirydate,
        },
        medicalSponsorVisa: {
          number: sponsorvisa,
          issueDate: sponsorvisaissuedate,
          expiryDate: sponsorvisaexpirydate,
        },
        medicalSponsorPassport: {
          number: sponsorpassportnumber,
          expiryDate: sponsorpassportexpirydate,
        },

        locationurl: forntendurl + "/" + window.location.pathname.replace("/", "") + window.location.search,
        insuranceType: "Medical",
      }

      console.log('objData', objData)

     



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
          .put(API_URL + `/api/updatePolicyDetails?id=${id}`, objData, {
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
          .catch((error) => {
            console.log(error.message);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log("hoemdata>>>>", hoemdata)
  console.log("documentdetaildata>>>>", documentdetaildata)

  console.log('check condition', documentdetaildata?.map((con) => con.medicalId == undefined ? null : con.medicalId.level != "" ? con.medicalId.level : null))

  console.log('policyData', policyData)
  console.log('documents', documents)


  function formatDate(dateString) {
    if (dateString) {
      const parts = dateString.split('/');

      if (parts.length === 3) {
        const [day, month, year] = parts;
        const isoDateString = `${year}/${month}/${day}`;

        // Check if the formatted string is a valid date
        if (!isNaN(new Date(isoDateString).getTime())) {
          return isoDateString;
        }
      }

      return ''; // Invalid date string
    }

  }

  console.log('documents', documents)

  const handleShow = () => setShowTerms(true);


  return (
    <div>
      <p className="abcds123456 text-danger">Upload Insurer documents</p>
      <div className="policyrenewals">
        <div className="container myprofile1 pt-4 pb-4">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
             
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
              
            </div>


          </div>
        </div>
      </div>
      <p className="abcds123456 text-danger">Upload Sponsor documents</p>
      <div className="policyrenewals">
        <div className="container myprofile1 pt-4 pb-4">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
              {/* { lob === "Motor" && */}
              <div className="rowabcds">
                {sponsorpolicyData?.length > 0 && sponsorpolicyData.map((doc, indeX) => (
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
      <>
        <div className="container">

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body thankyoupage">
                  <form>
                    <div className="row">
                      <div className="col-md-4" style={{position:'relative'}}>
                        <div className="form-group">
                          <label className="form-label">
                            <strong>Name</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={hoemdata?.name}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4" style={{position:'relative'}}>
                        <div className="form-group">
                          <label className="form-label">
                            <strong>Phone No</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={hoemdata?.phoneno}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4" style={{position:'relative'}}>
                        <div className="form-group">
                          <label className="form-label">
                            <strong>Email</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={hoemdata?.email}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4" style={{position:'relative'}}>
                        <div className="form-group">
                          <label className="form-label">
                            <strong>Date Of Birth</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={moment(new Date(hoemdata?.date_of_birth)).format("DD/MM/YYYY")}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4" style={{position:'relative'}}>
                        <div className="form-group">
                          <label className="form-label">
                            <strong>Nationality</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={hoemdata?.nationality}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-md-4" style={{position:'relative'}}>
                        <div className="form-group">
                          <label className="form-label">
                            <strong>Gender</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="registration_year"
                            value={hoemdata?.gender}
                            readOnly
                          />
                        </div>
                      </div>
                      <>

                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                            <strong>Do you have an active medical policy in UAE ?

                            </strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={hoemdata.medical_policy_active ? "Yes" : "No"}
                            readOnly
                          />
                        </div>
                        {hoemdata.medical_policy_active && <>
                          <div className="col-md-4" style={{position:'relative'}}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Current Issurer</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="message"
                                value={hoemdata.medical_current_insurer_data && hoemdata.medical_current_insurer_data.length > 0 && hoemdata.medical_current_insurer_data[0]?.company_name}

                                readOnly
                              />
                            </div>
                          </div>
                          <div className="col-md-4" style={{position:'relative'}}>
                            <div className="form-group">
                              <label className="form-label">
                                <strong>Current Issurer Expiry Date</strong>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                name="message"
                                value={moment(new Date(hoemdata?.medical_current_insurer_expiry_date)).format("DD/MM/YYYY")}

                                readOnly
                              />
                            </div>
                          </div>
                        </>
                        }
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                            <strong>Emirate Issuing Visa</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={hoemdata.emirateData && hoemdata.emirateData.length > 0 ? hoemdata?.emirateData[0].area_of_registration_name : ""}
                            readOnly
                          />
                        </div>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                            <strong>Visa Type</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={hoemdata.visaTypeData && hoemdata.visaTypeData.length > 0 ? hoemdata.visaTypeData[0]?.medical_plan_condition : ""}
                            readOnly
                          />
                        </div>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                            <strong>Salary</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={hoemdata.salaryData && hoemdata.salaryData.length > 0 ? hoemdata.salaryData[0]?.medical_salary_range : ""}
                            readOnly
                          />
                        </div>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                            <strong>Height</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={hoemdata.hight}
                            readOnly
                          />
                        </div>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                            <strong>Weight</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            value={hoemdata.weight}
                            readOnly
                          />
                        </div>
                      </>



                      <>
                        {
                          hoemdata.medical_general_condition && hoemdata.medical_general_condition.length > 0 ? hoemdata.medical_general_condition.map((item, value) => (
                            <div className="col-md-4" style={{position:'relative'}}>
                              <div className="form-group">
                                <label className="form-label">
                                  <strong>{item?.name}</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="registration_year"
                                  value={item.vlaue ? "Yes" : "No"
                                  }
                                  readOnly
                                />
                              </div>
                            </div>
                          )) : <></>
                        }
                        {
                          hoemdata.medical_under_condition && hoemdata.medical_under_condition.length > 0 ? hoemdata.medical_under_condition.map((item, value) => (
                            <div className="col-md-4" style={{position:'relative'}}>
                              <div className="form-group">
                                <label className="form-label">
                                  <strong>{item?.name}</strong>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="registration_year"
                                  value={item.vlaue ? "Yes" : "No"
                                  }
                                  readOnly
                                />
                              </div>
                            </div>
                          )) : <></>
                        }
                      </>

                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        { policyData?.length > 0 &&
        <>
        <p style={{margin:'20px',color:'#003399'}}>Insurer Details</p>
        
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body thankyoupage">
                  <form>
                  <div className="col-md-12">
                      <div className="row">
                        {policyData?.length > 0 && policyData.map((doc, indeX) => (
                          <>
                            {doc._id == "65e1d8ddaa9f7b2755f27d62" ? (
                              <>
                                <div className="col-md-4" style={{position:'relative'}}>
                                  <label className="form-label">
                                    <strong>Emirates ID number</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {individualtooltip?.insuredDetails?.emiratesIdNumber}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="message"
                                    placeholder="784-XXXX-XXXXXXX"
                                    value={emiratesid}
                                    onChange={(e) => setEmiratesid(e.target.value)}
                                  />
                                  
                                </div>

                                <div className="col-md-4" style={{position:'relative'}}>
                                  <label className="form-label">
                                    <strong>Emirates Issue date</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {individualtooltip?.insuredDetails?.emiratesIssueDate}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                  </label>
                                  <DatePicker
                                    
                                    className="form-control"
                                    selected={emiratesidissuedate ? new Date(emiratesidissuedate) : ""}
                                    onChange={(date) => setEmiratesidissuedate(date)}
                                    onKeyDown={e => e.preventDefault()}
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    peekNextMonth
                                    placeholderText="DD/MM/YYYY"
                                    showTimeSelect={false}

                                  />
                                </div>
                                <div className="col-md-4" style={{position:'relative'}}>
                                  <label className="form-label">
                                    <strong>Emirates Expiry date</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {individualtooltip?.insuredDetails?.emiratesExpiryDate}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                  </label>
                                  <DatePicker
                                    className="form-control"
                                    selected={emiratesidexpirydate ? new Date(emiratesidexpirydate) : ""}
                                    onChange={(date) => setEmiratesidexpirydate(date)}
                                    onKeyDown={e => e.preventDefault()}
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    peekNextMonth
                                    placeholderText="DD/MM/YYYY"
                                    showTimeSelect={false}

                                  />
                                </div>
                              </>
                            ) : null
                            }
                            {doc._id == "65e1d896aa9f7b2755f27d5f" ? (
                              <>
                              <div className="col-md-4" style={{position:'relative'}}>
                                <label className="form-label">
                                    <strong>Visa File No</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {individualtooltip?.insuredDetails?.visaFileNumber}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="message"
                                  placeholder="XXX/XXXX/XXXXXX"
                                  value={visafileno}
                                  onChange={(e) => setVisafileno(e.target.value)}
                                />
                              </div>

                              <div className="col-md-4" style={{position:'relative'}}>
                                <label className="form-label">
                                    <strong>Visa Issue Date</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {individualtooltip?.insuredDetails?.visaIssueDate}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                </label>
                                <DatePicker
                                  className="form-control"
                                  selected={visaissuedate ? new Date(visaissuedate) : ""}
                                  onChange={(date) => setVisaissuedate(date)}
                                  onKeyDown={e => e.preventDefault()}
                                  dateFormat="dd/MM/yyyy"
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  peekNextMonth
                                  placeholderText="DD/MM/YYYY"
                                  showTimeSelect={false}
                                />
                              </div>

                              <div className="col-md-4" style={{position:'relative'}}>
                                <label className="form-label">
                                    <strong>Visa Expiry Date</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {individualtooltip?.insuredDetails?.visaExpiryDate}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                </label>
                                <DatePicker
                                  className="form-control"
                                  selected={visaexpirydate ? new Date(visaexpirydate) : ""}
                                  onChange={(date) => setVisaexpirydate(date)}
                                  onKeyDown={e => e.preventDefault()}
                                  dateFormat="dd/MM/yyyy"
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  peekNextMonth
                                  placeholderText="DD/MM/YYYY"
                                  showTimeSelect={false}
                                />
                              </div>
                            </>
                            ) : null
                            }
                            {doc._id == "65e1d800aa9f7b2755f27d3b" ? (
                              <>
                                <div className="col-md-4" style={{position:'relative'}} style={{position:'relative'}}>
                                  <label className="form-label">
                                    <strong>Passport Number1</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {individualtooltip?.insuredDetails?.passportNumber}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="message"
                                    placeholder="Enter your passport number"
                                    value={passportnumber}
                                    onChange={(e) => setPassportnumber(e.target.value)}
                                  />
                                </div>

                                <div className="col-md-4" style={{position:'relative'}} style={{position:'relative'}}>
                                  <label className="form-label">
                                    <strong>Passport issue date</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {individualtooltip?.insuredDetails?.passportIssueDate}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                  </label>
                                   <DatePicker
                                    className="form-control"
                                    selected={passportissuedate ? new Date(passportissuedate) : ""}
                                    onChange={(date) => setPassportissuedate(date)}
                                    onKeyDown={e => e.preventDefault()}
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    peekNextMonth
                                    placeholderText="DD/MM/YYYY"
                                    showTimeSelect={false}
                                  />
                                </div>

                                <div className="col-md-4" style={{position:'relative'}} style={{position:'relative'}}>
                                  <label className="form-label">
                                    <strong>Passport expiry date</strong>
                                    <OverlayTrigger
                                      key="right"
                                      placement="right"
                                      overlay={
                                        <Tooltip id="tooltip-right">
                                          {individualtooltip?.insuredDetails?.passportExpiryDate}
                                        </Tooltip>
                                      }
                                    >
                                      <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                  </label>
                                  
                                   <DatePicker
                                    className="form-control"
                                    selected={passportexpirydate ? new Date(passportexpirydate) : ""}
                                    onChange={(date) => setPassportexpirydate(date)}
                                    onKeyDown={e => e.preventDefault()}
                                    dateFormat="dd/MM/yyyy"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    peekNextMonth
                                    placeholderText="DD/MM/YYYY"
                                    showTimeSelect={false}
                                  />
                                   {/* <input
                                    className="form-control"
                                    type="date"
                                    name="issuedate"
                                    placeholder="DD/MM/YYYY"
                                    onChange={(e) => setPassportexpirydate(e.target.value)}
                                    defaultValue={formatDate(passportexpirydate)}
                                  /> */}
                               
                                </div>
                              </>
                            ) : null
                            }

                          </>
                        ))}
                       
                      </div>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
          }
          {sponsorpolicyData?.length > 0 &&
          <>
          <p style={{margin:'20px',color:'#003399'}}>Sponsor Details</p>
        
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body thankyoupage">
                  <form>
                  <div className="col-md-12">
                      <div className="row">
                       
                         {sponsorpolicyData?.length > 0 && sponsorpolicyData.map((doc, indeX) => (
                          <>
                          {doc._id == "65e1d795aa9f7b2755f27d11" ? (
                              <>
                        <div className="col-md-4" style={{position:'relative'}} style={{position:'relative'}}>
                          <label className="form-label">
                            <strong>Establishment card Number</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.sponsorDetials?.establishmentCardNumber}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>

                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            placeholder="Enter Establishment Card Number"
                            value={EstablishmentCardno}
                            onChange={(e) => setEstablishmentCardno(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4" style={{position:'relative'}} style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Establishment card Expiry date</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.sponsorDetials?.establishmentCardExpiryDate}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>

                          </label>
                          
                          <DatePicker
                          style={{zIndex:9999}}
                            className="form-control"
                            selected={EstablishmentCardexpirydate ? new Date(EstablishmentCardexpirydate) : ""}
                            onChange={(date) => setEstablishmentCardexpirydate(date)}
                            onKeyDown={e => e.preventDefault()}
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            peekNextMonth
                            placeholderText="DD/MM/YYYY"
                            showTimeSelect={false}
                          />
                        </div>
                        </>
                        ) : null
                        }
                          {doc._id == "65e1d76eaa9f7b2755f27cf6" ? (
                              <>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Tax Registration Number</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.sponsorDetials?.taxRegistrationNumber}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>

                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            placeholder="Enter Tax Registration Number"
                            value={taxregistrationnumber}
                            onChange={(e) => setTaxregistrationnumber(e.target.value)}
                          />
                        </div>
                            </>
                        ) : null  
                        }

                      {doc._id == "65e1d735aa9f7b2755f27cdb" ? (
                              <>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Trade License Number</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.sponsorDetials?.tradeLicenseNumber}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>

                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            placeholder="Enter Trade License Number"
                            value={tradelicensenumber}
                            onChange={(e) => setTradelicensenumber(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Trade License Expiry date</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.sponsorDetials?.tradeLicenseExpiryDate}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>

                          </label>
                        
                           <DatePicker
                            className="form-control"
                            selected={tradelicenseexpirydate ? new Date(tradelicenseexpirydate) : ""}
                            onChange={(date) => setTradelicenseexpirydate(date)}
                            onKeyDown={e => e.preventDefault()}
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            peekNextMonth
                            placeholderText="DD/MM/YYYY"
                            showTimeSelect={false}
                          />
                        </div>
                        </>
                        ) : null
                        }
                        {doc._id == "65e1d6c5aa9f7b2755f27c9f" ? (
                              <>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Sponsor Emirates ID</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.insuredDetails?.emiratesIdNumber}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            placeholder="784-xxxx-xxxxxxxxx"
                            value={sponsoremiratesid}
                            onChange={(e) => setSponsoremiratesid(e.target.value)}
                          />
                                 </div>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Sponsor Emirates ID issue date</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.insuredDetails?.emiratesIssueDate}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>

                          </label>
                         
                           <DatePicker
                            className="form-control"
                            selected={sponsoremiratesidissuedate ? new Date(sponsoremiratesidissuedate) : ""}
                            onChange={(date) => setSponsoremiratesidissuedate(date)}
                            onKeyDown={e => e.preventDefault()}
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            peekNextMonth
                            placeholderText="DD/MM/YYYY"
                            showTimeSelect={false}
                          />
                        </div>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Sponsor Emirates ID expiry date</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.insuredDetails?.emiratesExpiryDate}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>

                          </label>
                         
                           <DatePicker
                            className="form-control"
                            selected={sponsoremiratesidexpirydate ? new Date(sponsoremiratesidexpirydate) : ""}
                            onChange={(date) => setSponsoremiratesidexpirydate(date)}
                            onKeyDown={e => e.preventDefault()}
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            peekNextMonth
                            placeholderText="DD/MM/YYYY"
                            showTimeSelect={false}
                          />
                        </div>
                        </>
                        ) : null
                        }
                        {doc._id == "65e1d696aa9f7b2755f27c93" ? (
                              <>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Sponsor visa</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.insuredDetails?.sponsorVisa}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            placeholder="XXX/XXXX/XXXXXXX"
                            value={sponsorvisa}
                            onChange={(e) => setSponsorvisa(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Sponsor Visa issue date</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.insuredDetails?.visaIssueDate}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>
                          </label>
                         
                           <DatePicker
                            className="form-control"
                            selected={sponsorvisaissuedate ? new Date(sponsorvisaissuedate) : ""}
                            onChange={(date) => setSponsorvisaissuedate(date)}
                            onKeyDown={e => e.preventDefault()}
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            peekNextMonth
                            placeholderText="DD/MM/YYYY"
                            showTimeSelect={false}
                          />
                        </div>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Sponsor Visa expiry date</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.insuredDetails?.visaExpiryDate}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>
                          </label>
                         
                           <DatePicker
                            className="form-control"
                            selected={sponsorvisaexpirydate ? new Date(sponsorvisaexpirydate) : ""}
                            onChange={(date) => setSponsorvisaexpirydate(date)}
                            onKeyDown={e => e.preventDefault()}
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            peekNextMonth
                            placeholderText="DD/MM/YYYY"
                            showTimeSelect={false}
                          />
                        </div>
                          </>
                        ) : null
                        }
                         {doc._id == "65e1d63caa9f7b2755f27c76" ? (
                              <>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Sponsor Passport number</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.insuredDetails?.passportNumber}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="message"
                            placeholder="Passport number"
                            value={sponsorpassportnumber}
                            onChange={(e) => setSponsorpassportnumber(e.target.value)}
                          />
                        </div>
                        <div className="col-md-4" style={{position:'relative'}}>
                          <label className="form-label">
                                     <strong>Sponsor Passport Expiry Date</strong>
                                     <OverlayTrigger
                                       key="right"
                                       placement="right"
                                       overlay={
                                         <Tooltip id="tooltip-right">
                                           {individualtooltip?.insuredDetails?.passportExpiryDate}
                                         </Tooltip>
                                       }
                                     >
                                       <i className="fa fa-question-circle thanyou" aria-hidden="true"></i>
                                     </OverlayTrigger>
                          </label>
                          
                           <DatePicker
                            className="form-control"
                            selected={sponsorpassportexpirydate ? new Date(sponsorpassportexpirydate) : ""}
                            onChange={(date) => setSponsorpassportexpirydate(date)}
                            onKeyDown={e => e.preventDefault()}
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            peekNextMonth
                            placeholderText="DD/MM/YYYY"
                            showTimeSelect={false}
                          />
                        </div>
                        </>
                        ) : null
                        }
                       
                       </>
                       
                       ))}
                      </div>

                    
                    </div>

                  
                    </form>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
            }

          <div className="container mt-4">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body thankyoupage">
                  <form>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          className="checkbox mx-2"
                          type="checkbox"
                          defaultChecked={travelagreementdata}
                          onChange={(e) => setTravelagreementdata(e.target.checked)}
                        />
                        <strong>Agree with <a className="termscond" onClick={handleShow}>Terms and Conditions</a></strong>
                      </div>
                      <div className="col-md-6">
                        <div
                          type="submit"
                          className="btn-first btn-submit-fill logins"
                          style={{ float: "right" ,zIndex:0}}
                          onClick={HandleHomeSubmitThankYou}
                        >
                          Submit
                        </div>
                      </div>
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
          
      </>






      <CModal
        alignment="center"
        visible={visible}
        onClose={() => { setVisible(false); GetAllDocuments();setLoading(false)  }}

      >
        <CModalHeader onClose={() => { setVisible(false); GetAllDocuments(); setLoading(false) }}>
          <CModalTitle>Upload {docData.fileName}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            {loading ?
              <div className="overlay">
                <div className="loader-container">
                  <CProgress color="primary" variant="striped" animated  value={progress}/>
                 
                  <div><strong>Uploading, please wait...{progress.toFixed(2)}%</strong></div>
                  <div className="loader-text"><strong>Do Not Refresh The Page</strong></div>
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
        {
          loading ? "" :
          <>
        <CModalFooter>
          <CButton color="gotodashboard" onClick={uploadAllDocuments}>
            Upload
          </CButton>
          <CButton color="gotodashboard12" onClick={() => { setVisible(false); GetAllDocuments(); }}>
            Close
          </CButton>
        </CModalFooter>
          </>
          }
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
                          height: "450px",
                          border: "none",
                        }}
                        src={`${API_URL}/documents/${filedata}`}
                      />
                      <p>
                          If Your browser does not support PDFs. You can {" "}
                          <a href={`${API_URL}/documents/${filedata}`} target="_blank" rel="noopener noreferrer">Download</a>
                          {" "}the PDF.
                        </p>
                      {/* <embed src={`${API_URL}/documents/${filedata}`} type="application/pdf" width="400px" height="400px" />  */}
                    
                      
                     
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


  <Modal size="lg" show={showterms} onHide={() => setShowTerms(false)}>
        <Modal.Header closeButton ></Modal.Header>
        <Modal.Body>
        <p className="paragraph">{
            TermsAndConditionsdata
          }</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTerms(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
export default MedicalThankYouFormPage