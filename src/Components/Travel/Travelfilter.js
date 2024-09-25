import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, InputGroup, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { UseMotorContext } from "../../MultiStepContextApi";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import swal from 'sweetalert'
import { API_URL } from '../..';
import axios from 'axios';
import moment from 'moment';
import { get, set } from 'firebase/database';

const Travelfilter = (props) => {

    const navigate = useNavigate();

    const { travelsFormsData, settravelsFormsData, travelsFormsData1, setTravelsFormsData1, HandleSubmitTravelFormdata } = UseMotorContext();
    useEffect(() => {
        localStorage.setItem('travelsFormsDataLocation', window.location.pathname);

        const familyDetailsFromLocalStorage = JSON.parse(localStorage.getItem('travelsFormsData'))?.family_details;

        setFormValues(familyDetailsFromLocalStorage || [{ name: '', email: '', phone: '', date: '', relation: '' }]);
    }, []);

    const data = props.matchTravelPlan;
    //console.log(data);

    const removeDuplicates = (arr) => {
        const uniqueItems = [];
        const uniqueLabels = new Set();

        for (const item of arr) {
            if (!uniqueLabels.has(item.planData?.additional_cover_label)) {
                uniqueItems.push(item);
                uniqueLabels.add(item.planData?.additional_cover_label);
            }
        }

        return uniqueItems;
    };

    const uniqueData = removeDuplicates(data);


    const [originalData, setOriginalData] = useState({});

    const storedData = JSON.parse(localStorage.getItem("travelsFormsData"));

    useEffect(() => {
        // Save the original data when the component mounts
        const storedData = JSON.parse(localStorage.getItem("travelsFormsData"));
        if(storedData){
        setOriginalData({
            no_of_travel: storedData?.no_of_travel,
            start_date: storedData?.start_date,
            end_date: storedData?.end_date,
            plan_type: storedData?.plan_type,
            nationality: storedData?.nationality,
            nationality_id : storedData.nationality_id,

            // no_of_travel: storedData?.no_of_travel,
            // Add other relevant properties
        });
    }
    }, 
    [travelsFormsData1?.no_of_travel,
    travelsFormsData1?.start_date,
    travelsFormsData1?.end_date,
    travelsFormsData1?.plan_type,
    travelsFormsData1?.nationality
    // travelsFormsData1?.no_of_travel,
 
    ]);

    console.log(originalData);

    const [travelinsuranceforname, settravelinsuranceforname] = useState("");
    const [tripperiodname, setTripperiodname] = useState("");
    const [triptype, setTriptype] = useState("");
    const [destination, setDestination] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        gettravelinsurancefor(travelsFormsData?.travel_insurance_for);
        gettripperiod(travelsFormsData?.plan_type);
        gettriptype(travelsFormsData?.type_of_trip);

        getinsureyourtraveldetails();
        getplantypedetails();
        gettypeoftripdetails();
        getCountrydetails();


        const nooftravel = travelsFormsData?.no_of_travel == [] ? (travelsFormsData?.plan_type == "641d418b19807a3c58191f7f" ? "" : "365") : travelsFormsData?.no_of_travel;
        setnooftravel(nooftravel);
    }, [])



    useEffect(() => {
        gettravelinsurancefor(travelsFormsData?.travel_insurance_for);
        gettriptype(travelsFormsData?.type_of_trip);
    }, [travelsFormsData?.travel_insurance_for, travelsFormsData?.type_of_trip])

    useEffect(() => {
        gettripperiod(travelsFormsData?.plan_type);
    }, [travelsFormsData?.plan_type])



    useEffect(() => {
        handleStartDateChange(new Date(travelsFormsData?.start_date));
    }, [travelsFormsData1?.no_of_travel])

    console.log(tripperiodname)
    console.log(triptype)
    const gettravelinsurancefor = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch(API_URL + '/api/get_travel_insurance_for_detailsbyid', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.data);
                settravelinsuranceforname(data.data[0]?.travel_insurance_for);
            })
    }

    const gettripperiod = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch(API_URL + '/api/get_travel_type_by_id', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data[0]?.travel_type, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>data");
                setTripperiodname(data.data[0]?.travel_type);
            })
    }

    const gettriptype = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch(API_URL + '/api/get_travel_plan_type_by_id', requestOptions)
            .then(response => response.json())
            .then(data => {
                //console.log(data.data.travel_plan_type);
                setTriptype(data.data[0]?.travel_plan_type);
            })
    }


    const [insureyourtravel, setinsureyourtravel] = useState([]);
    const [plantype, setplantype] = useState([]);
    const [nooftravel, setnooftravel] = useState("");
    const [typeoftrip, settypeoftrip] = useState([]);
    const [country, setCountry] = useState([]);

    const [newinsureyourtravel, setnewinsureyourtravel] = useState([]);
    const [newplantype, setnewplantype] = useState([]);
    const [newnooftravel, setnewnooftravel] = useState("");
    const [newstartdate, setnewstartdate] = useState([]);
    const [newenddate, setnewenddate] = useState([]);
    const [newtypeoftrip, setnewtypeoftrip] = useState([]);
    const [newcountry, setnewCountry] = useState([]);
    const [newcountryid, setnewCountryid] = useState([]);
    const [newnoofchild, setnewnoofchild] = useState([]);
    const [newnoofspouse, setnewnoofspouse] = useState([]);



    const getinsureyourtraveldetails = async () => {
        var requestOptions = {
            method: 'GET',
        };

        fetch(API_URL + "/api/getTravelsInsuranceFor", requestOptions)
            .then(response => response.json())
            .then(result => {
                setinsureyourtravel(result.data);
            })
            .catch(error => console.log('error', error));
    };

    const getplantypedetails = async () => {
        var requestOptions = {
            method: 'GET',
        };

        fetch(API_URL + "/api/getTravelTypes", requestOptions)
            .then(response => response.json())
            .then(result => {
                setplantype(result.data);
            })
            .catch(error => console.log('error', error));
    };

    console.log(plantype);

    const gettypeoftripdetails = async () => {
        var requestOptions = {
            method: 'GET',
        };

        fetch(API_URL + "/api/getTravelPlanTypes", requestOptions)
            .then(response => response.json())
            .then(result => {
                settypeoftrip(result.data);
            })
            .catch(error => console.log('error', error));
    };


    const getCountrydetails = async () => {
        var requestOptions = {
            method: 'GET',
        };

        fetch(API_URL + `/api/getAllNattionlity?lob=travel&planFor=${newinsureyourtravel == "" ? travelsFormsData.travel_insurance_for : newinsureyourtravel}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setCountry(result.data);
            })
            .catch(error => console.log('error', error));
    };


    useEffect(() => {
        // Fetch the data from localStorage whenever it changes
        const storedData = JSON.parse(localStorage.getItem("travelsFormsData"));
        setTravelsFormsData1(storedData);
    }, [localStorage.getItem("travelsFormsData")]);

    //console.log(travelsFormsData1);


    const [isEditMode, setIsEditMode] = useState(false);
    const [ispersonalEditMode, setIspersonalEditMode] = useState(false);

    const handleEditModeToggle = () => {
        setIsEditMode((prevEditMode) => !prevEditMode);
        if (!isEditMode) {
            gettravelinsurancefor(travelsFormsData1?.travel_insurance_for);
            gettripperiod(travelsFormsData1?.plan_type);
            gettriptype(travelsFormsData1?.type_of_trip);

            setTimeout(() => {
                const btdElement = document.getElementById("btd");
                if (btdElement) {
                    if (travelsFormsData1?.type_of_trip == "641d700e2e8acf350eaab204") {
                        btdElement.style.display = "block";
                    }
                    else {
                        btdElement.style.display = "none";
                    }
                }
            }, 300);
        }
        else if (isEditMode) {
            setTravelsFormsData1({
                ...travelsFormsData1,
                plan_type: originalData?.plan_type,
                no_of_travel: originalData?.no_of_travel,
                start_date: originalData?.start_date,
                end_date: originalData?.end_date,
                nationality: originalData?.nationality,
                nationality_id : originalData?.nationality_id 
            });
            settravelsFormsData({
                ...travelsFormsData,
                nationality: originalData?.nationality,
            nationality_id : originalData?.nationality_id 
            });
            setnewplantype(originalData?.plan_type);
            setnewCountry(originalData?.nationality);
            // setnewnooftravel(travelsFormsData1?.no_of_travel);
        }

    };

    const refreshdata = () => {
        gettravelinsurancefor(travelsFormsData1?.travel_insurance_for);
        gettripperiod(travelsFormsData1?.plan_type);
        gettriptype(travelsFormsData1?.type_of_trip);
    }


    const handlepersonalEditModeToggle = () => {
        setIspersonalEditMode((prevEditMode) => !prevEditMode);
    };

    useEffect(() => {
        getCountrydetails();
    }, [newinsureyourtravel])


    const handleTravelType = (id) => {
        // settravelsFormsData((prevData) => ({
        //     ...prevData,
        //     travel_insurance_for: id,
        // }));
        // localStorage.setItem("travelsFormsData", JSON.stringify({
        //     ...travelsFormsData, travel_insurance_for: id
        // })
        // );
        setnewinsureyourtravel(id);
        if(id === "641c25e929b5921dc20ff9ee")
        {
            setnewCountry("UNITED ARAB EMIRATES");
            setnewCountryid("652fa12c352b69d04cabe93c");
            setTravelsFormsData1((prevData) => ({
                ...prevData,
                nationality: "UNITED ARAB EMIRATES",
                nationality_id: "652fa12c352b69d04cabe93c"
            }));
            settravelsFormsData((prevData) => ({
                ...prevData,
                nationality: "UNITED ARAB EMIRATES",
                nationality_id: "652fa12c352b69d04cabe93c"
            }));
        }
        else
        {
            setnewCountry("INDIA");
            setnewCountryid("652fa12a352b69d04cabe3f1");
            setTravelsFormsData1((prevData) => ({
                ...prevData,
                nationality:"INDIA",
                nationality_id:"652fa12a352b69d04cabe3f1"
                }));
            settravelsFormsData((prevData) => ({
                    ...prevData,
                    nationality:"INDIA",
                nationality_id:"652fa12a352b69d04cabe3f1"
                }));
        };
    };

    const handlePlanChange = (id) => {
        // settravelsFormsData((prevData) => ({
        //     ...prevData,
        //     plan_type: id,
        // }));
        // localStorage.setItem("travelsFormsData", JSON.stringify({
        //     ...travelsFormsData, plan_type: id
        // })
        // );
        setnewplantype(id);
        console.log("id>>>>>>", id)
        if (id == "641d41e519807a3c58191f8a") {
            console.log("multiple trips i am here >>>>>>>>>>>>>")
            setnewnooftravel('365')
            setTravelsFormsData1((prevData) => ({
                ...prevData,
                no_of_travel: '365',
                plan_type: id,
            }));

        } else {
            console.log("single trips i am here >>>>>>>>>>>>>")

            setTravelsFormsData1((prevData) => ({
                ...prevData,
                // no_of_travel: 1,
                plan_type: id,
            }));

        }


    };

    console.log(travelsFormsData1, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>enfefffsdssfdsdfsd")

    console.log("no_of_days", newnooftravel)
    const handleNoOfTravelChange = (e) => {

        const id = e.target.value;
        setTravelsFormsData1((prevData) => ({
            ...prevData,
            no_of_travel: id,
        }));
        setnewnooftravel(id);
    };

    const handleStartDateChange = (date) => {
        // const travelsFormsData = JSON.parse(localStorage.getItem("travelsFormsData"));
        
        let no_of_days = travelsFormsData1?.no_of_travel == "365" ? parseInt(travelsFormsData1?.no_of_travel) : parseInt(travelsFormsData1?.no_of_travel) - 1
        
        // let no_of_days = travelsFormsData.no_of_travel == "365" ? parseInt(travelsFormsData.no_of_travel) : parseInt(travelsFormsData.no_of_travel) - 1

        const no_of_travel = no_of_days; // Convert to a number
        //console.log("no_of_travel", no_of_travel);
        setTravelsFormsData1((prevData) => ({
            ...prevData,
            start_date: date,
            end_date: new Date(date.getTime() + no_of_travel * 24 * 60 * 60 * 1000)
        }));
        // localStorage.setItem("travelsFormsData", JSON.stringify({
        //     ...travelsFormsData, start_date: date,
        //     end_date: new Date(date.getTime() + no_of_travel * 24 * 60 * 60 * 1000),
        // })
        // );
    };

    const handleEndDateChange = (date) => {
        settravelsFormsData((prevData) => ({
            ...prevData,
            end_date: date,
        }));
        // localStorage.setItem("travelsFormsData", JSON.stringify({
        //     ...travelsFormsData, end_date: date
        // })
        // );
    };

    const handleTypeOfTripChange = (id) => {
        // settravelsFormsData((prevData) => ({
        //     ...prevData,
        //     type_of_trip: id,
        // }));
        // localStorage.setItem("travelsFormsData", JSON.stringify({
        //     ...travelsFormsData, type_of_trip: id
        // })
        // );
        if (id == "641d700e2e8acf350eaab204") {
            document.getElementById("btd").style.display = "block";
        }
        else {
            document.getElementById("btd").style.display = "none";
            setFormValues([{ name: "", passport: "", date: "", relation: "" }])
            settravelsFormsData((prevData) => ({
                ...prevData,
                family_details: [],
            }));
        }
        setnewtypeoftrip(id);
    };

    const handleDestinationChange = (e) => {
        console.log(JSON.parse(e.target.value), ">>>>>>>>>>>>>>>>>>>>>>>>aswdqwdwddedew");
        const selectedOption = JSON.parse(e.target.value);
        // settravelsFormsData((prevData) => ({
        //     ...prevData,
        //     nationality: id,
        // }));
        // localStorage.setItem("travelsFormsData", JSON.stringify({
        //     ...travelsFormsData, nationality: id
        // })
        // );

        setnewCountry(selectedOption.nationality_name);
        setnewCountryid(selectedOption._id);
    };

    const handlePhoneChange = (phoneValue) => {
        setNewphone(phoneValue);
    };

    const handlemodal = () => {
        setShow(true);
    };
    const [startDate, setStartDate] = useState('');
    const Progress = 70;
    const [formValues, setFormValues] = useState([{ name: "", passport: "", date: "", relation: "" }])

    const handleChange = (e, index, date) => {
        // const { name, value } = e ? e.target : { name: 'date', value: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) };
        const field = e.target.name;
        const newFormValues = [...formValues];
        newFormValues[index][field] = e.target.value;
        setFormValues(newFormValues);
    }

    const handleTododateChange = (date, index) => {
        console.log(date, index)
        const isoString = date.toISOString();
        const formattedDate = isoString.split('T')[0];
        const field = 'date'
        const newFormValues = [...formValues];
        newFormValues[index][field] = formattedDate;
        setFormValues(newFormValues);
    }

    const handlefinalsubmit = async (e) => {
        e.preventDefault();

        console.log(newinsureyourtravel != "" ? newinsureyourtravel : travelsFormsData1?.travel_insurance_for);
        console.log(newplantype != "" ? newplantype : travelsFormsData1?.plan_type);
        console.log(newnooftravel != "" ? newnooftravel : travelsFormsData1?.no_of_travel);
        console.log(newstartdate != "" ? newstartdate : travelsFormsData1?.start_date);
        console.log(newenddate != "" ? newenddate : travelsFormsData1?.end_date);
        console.log("newtypeoftrip", newtypeoftrip != "" ? newtypeoftrip : travelsFormsData1?.type_of_trip);
        console.log(newcountry != "" ? newcountry : travelsFormsData1.nationality);
        console.log(">>>>>>>>>>newnooftravel", newnooftravel);
        console.log(">>>>>>>>>>>travelsFormsData1?.no_of_travel", travelsFormsData1?.no_of_travel);
        const invalidEntries = formValues.filter(
            (element) => element.name === '' || element.passport === '' || element.date === '' || element.relation === '',
        )
        // settravelsFormsData((prevData) => ({
        //     ...prevData,
        //     travel_insurance_for: newinsureyourtravel != "" ? newinsureyourtravel : travelsFormsData1?.travel_insurance_for,
        //     plan_type: newplantype != "" ? newplantype : travelsFormsData1?.plan_type,
        //     no_of_travel: newnooftravel != "" ? newnooftravel : nooftravel,
        //     start_date: newstartdate != "" ? newstartdate : travelsFormsData1?.start_date,
        //     end_date: newenddate != "" ? newenddate : travelsFormsData1?.end_date,
        //     type_of_trip: newtypeoftrip != "" ? newtypeoftrip : travelsFormsData1?.type_of_trip,
        //     nationality: newcountry != "" ? newcountry : travelsFormsData1.nationality,
        //     nationality_id: newcountryid != "" ? newcountryid : travelsFormsData1.nationality_id
        // }));

        // localStorage.setItem("travelsFormsData", JSON.stringify({
        //     ...travelsFormsData, travel_insurance_for: newinsureyourtravel != "" ? newinsureyourtravel : travelsFormsData1?.travel_insurance_for,
        //     plan_type: newplantype != "" ? newplantype : travelsFormsData1?.plan_type,
        //     no_of_travel: newnooftravel != "" ? newnooftravel : nooftravel,
        //     start_date: newstartdate != "" ? newstartdate : travelsFormsData1?.start_date,
        //     end_date: newenddate != "" ? newenddate : travelsFormsData1?.end_date,
        //     type_of_trip: newtypeoftrip != "" ? newtypeoftrip : travelsFormsData1?.type_of_trip,
        //     nationality: newcountry != "" ? newcountry : travelsFormsData1.nationality,
        //     nationality_id: newcountryid != "" ? newcountryid : travelsFormsData1.nationality_id


        // }));

        if (travelsFormsData1?.plan_type && newplantype == "641d418b19807a3c58191f7f" && parseInt(travelsFormsData1?.no_of_travel, 10) > 90) {
            swal("Please select less than 90 days of travel", "", "warning");
            return;
        }
        if (newtypeoftrip == "641d700e2e8acf350eaab204"
            && formValues.length == 0) {
            swal("Please add family details", "", "warning");
            return;
        }
        if (newtypeoftrip == "641d700e2e8acf350eaab204" && invalidEntries.length > 0) {
            swal({ text: "Please fill all fields in family details", icon: "warning" });

            return;
        }
        if(newcountry == "" && newinsureyourtravel == "641c25df29b5921dc20ff9eb")
        {
            swal({ text: "Please select destination", icon: "warning" });
            return;
        }
        // else if (travelsFormsData1?.plan_type == "641d418b19807a3c58191f7f" && parseInt(newnooftravel, 10) > 90) {
        //     swal("Please select less than 90 days of travel", "", "warning");
        //     return;
        // }
        // else if (parseInt(travelsFormsData1?.no_of_travel, 10) > 90
        // ) {
        //     swal("Please select less than 90 days of travel", "", "warning");
        //     return;
        // }

        else {
            const updatedData = {
                ...travelsFormsData,
                travel_insurance_for: newinsureyourtravel != "" ? newinsureyourtravel : travelsFormsData1?.travel_insurance_for,
                plan_type: newplantype != "" ? newplantype : travelsFormsData1?.plan_type,
                no_of_travel: newnooftravel == "" ? travelsFormsData1.no_of_travel : newnooftravel,
                start_date: newstartdate != "" ? newstartdate : travelsFormsData1?.start_date,
                end_date: newenddate != "" ? newenddate : travelsFormsData1?.end_date,
                type_of_trip: newtypeoftrip != "" ? newtypeoftrip : travelsFormsData1?.type_of_trip,
                nationality: newcountry != "" ? newcountry : travelsFormsData1.nationality,
                nationality_id: newcountryid != "" ? newcountryid : travelsFormsData1.nationality_id
            };
            console.log("updatedData", updatedData.no_of_travel);

            settravelsFormsData(updatedData);
            localStorage.setItem("travelsFormsData", JSON.stringify(updatedData));



            // refreshdata();
            gettravelinsurancefor(newinsureyourtravel != "" ? newinsureyourtravel : travelsFormsData1?.travel_insurance_for);
            gettripperiod(newplantype != "" ? newplantype : travelsFormsData1?.plan_type);
            gettriptype(newtypeoftrip != "" ? newtypeoftrip : travelsFormsData1?.type_of_trip);
            let obj = {
                insuranceType: "Travel",
                travel_insurance_for: updatedData.travel_insurance_for,
                travel_trip_type: updatedData.type_of_trip,
                travel_plan_type: updatedData.plan_type,
                no_of_travel: updatedData.no_of_travel,
                travel_start_date: updatedData.start_date,
                travel_end_date: updatedData.end_date,
                travel_region_country: updatedData.nationality
            }
            setnewplantype(travelsFormsData1?.plan_type);
            setnewnooftravel(newnooftravel ? updatedData.no_of_travel : travelsFormsData1?.no_of_travel);
            HandleSubmitMotorFormdata(obj, "/")
            setIsEditMode(false);
        }


    }

    console.log(travelsFormsData1);

    const handlecancelsubmit = (e) => {
        e.preventDefault();
        setnewinsureyourtravel(travelsFormsData?.travel_insurance_for);
        // setnewplantype(travelsFormsData?.plan_type);
        setnewtypeoftrip(travelsFormsData?.type_of_trip);
        setnewCountry(travelsFormsData?.nationality)

        setTravelsFormsData1({
            ...travelsFormsData1,
            plan_type: originalData?.plan_type,
            no_of_travel: originalData?.no_of_travel,
            start_date: originalData?.start_date,
            end_date: originalData?.end_date,
            nationality: originalData?.nationality,
            nationality_id : originalData?.nationality_id 
        });
        settravelsFormsData({
            ...travelsFormsData,
            nationality: originalData?.nationality,
            nationality_id : originalData?.nationality_id
        });
        setnewplantype(originalData?.plan_type);
        setnewCountry(originalData?.nationality);
        setnewnooftravel(travelsFormsData1?.no_of_travel);
        setIsEditMode(false);

    }




    const addFormFields = () => {
        setFormValues([...formValues, { name: "", passport: "", date: "", relation: "" }])
    }

    const removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const passport = travelsFormsData.passport
    const email = travelsFormsData?.email
    const insuranceType = travelsFormsData?.line_of_business;

    const sendFamilyDetailsToServer = async () => { // Prepare the data to be sent to the server
        const familyDetails = formValues.map((element) => ({
            name: element.name,
            passport: element.passport,
            date: element.date,
            relation: element.relation

        }))
        let obj = {
            travel_family_details: familyDetails,
            insuranceType: insuranceType,
            passport: passport,
            location: window.location.pathname.replace("/", "")
        }
        HandleSubmitMotorFormdata(obj, "/")
    };

    let handleSubmit = (event) => {
        const invalidEntries = formValues.filter(
            (element) => element.name === '' || element.passport === '' || element.date === '' || element.relation === '',
        )
        if (invalidEntries.length > 0) {
            swal("Please fill all fields correctly.", "", "warning");
            return;
        }
        else {
            event.preventDefault();
            settravelsFormsData((prevData) => ({
                ...prevData,
                family_details: formValues,
            }));
            localStorage.setItem(
                'travelsFormsData',
                JSON.stringify({ ...travelsFormsData, family_details: formValues }));
            //console.log(formValues);
            sendFamilyDetailsToServer();
            getRelationCounts();
            setShow(false);

        }
    }

    const [newname, setNewname] = useState('');
    const [newemail, setNewemail] = useState('');
    const [newphone, setNewphone] = useState('');
    const [newdate, setNewdate] = useState(travelsFormsData?.date_of_birth);
    const [newpassport, setNewpassport] = useState('');
    const fillInsurancePlan = async (obj) => {
        try {
            const res = await axios.post(
                API_URL + "/api/fillInsurancePlan?email=" + travelsFormsData.email,
                {
                    ...obj,
                }
            );
            settravelsFormsData((prevData) => ({
                ...prevData,
                leadid: res?.data?.data?._id
            }))
            localStorage.setItem('travelsFormsData', JSON.stringify(travelsFormsData))

            return res.status;
        } catch (error) {
            if (error && error.response.status) {
                return error.response.status;
            }
        }
    };
    const UpdatePolicy = async (id, obj) => {
        await axios
            .put(
                `${API_URL}/api/updatePolicyDetails?id=${id}`,
                {
                    ...obj,
                }
            )
            .then((res) => {
                return res.status;
            })
            .catch((error) => {
                if (error && error.response.status) {
                    return error.response.status;
                }
            });
    }
    const HandleSubmitMotorFormdata = async (obj, to) => {
        let id = travelsFormsData?.leadid
        console.log("business", id)
        if (
            travelsFormsData.oldleadid !== null &&
            travelsFormsData.user === "customer"
        ) {

            await UpdatePolicy(travelsFormsData.oldleadid, obj)

        }
        // Business Entity User
        else if (travelsFormsData.user === "BE" && id !== null) {
            obj["businessentitytoken"] = travelsFormsData?.businessentitytoken
            await UpdatePolicy(id, obj)


        }
        else if (id !== null) {

            await UpdatePolicy(id, obj)

        }
        else {
            await fillInsurancePlan(obj);

        }
    };
    const handlePersonalDetailsSave = async () => {
        const updatedData = {
            ...travelsFormsData,
            name: newname !== "" ? newname : travelsFormsData?.name,
            phone_no: newphone !== "" ? newphone : travelsFormsData?.phone_no,
            date_of_birth: newdate !== "" ? newdate : travelsFormsData?.date_of_birth,
            passport_no: newpassport !== "" ? newpassport : travelsFormsData?.passport_no,
        };
        // Update state with the modified data
        settravelsFormsData(updatedData);
        // Update local storage with the modified data
        localStorage.setItem("travelsFormsData", JSON.stringify(updatedData));

        // Prepare data to send to the API
        let obj = {
            insuranceType: "Travel",
            email: email,
            name: updatedData.name,
            phoneno: updatedData.phone_no,
            date_of_birth: updatedData.date_of_birth,
            passport_no: updatedData.passport_no,
            location: window.location.pathname.replace("/", ""),
        }
        // Make the POST API request to send the family details to the server
        HandleSubmitMotorFormdata(obj, "/")
        setIspersonalEditMode(false);
    };

    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('travelsFormsData'))
    //     if (data.family_details.length > 0) {
    //         setFormValues(data.family_details)
    //     }
    // }, [])


    const getRelationCounts = () => {
        // const relationCounts = formValues.reduce((acc, element) => {;
        // formValues.forEach((element) => {
        //     if (element.relation) {
        //         relationCounts[element.relation] = (relationCounts[element.relation] || 0) + 1;
        //     }
        // });

        const relationCounts = formValues.reduce((acc, todo) => {
            const relation = todo.relation;
            if (relation) {
                acc[relation] = (acc[relation] || 0) + 1;
            }
            return acc;
        }, {});
        setnewnoofchild(relationCounts.Child || 0);
        setnewnoofspouse(relationCounts.Spouse || 0);

        settravelsFormsData((prevData) => ({
            ...prevData,
            noOfChild: relationCounts.Child || 0,
            noOfSpouse: relationCounts.Spouse || 0,
        }));
        localStorage.setItem(
            'travelsFormsData',
            JSON.stringify({ ...travelsFormsData, noOfChild: relationCounts.Child || 0, noOfSpouse: relationCounts.Spouse || 0 }));

        return relationCounts;
    }

    // const relationCounts = getRelationCounts();
    // console.log(relationCounts);

    return (
        <div className='col-lg-4 col-md-12 col-sm-12 col-xs-12 filters'>

            <h4 className='car details'>Travel Details<i className="fa fa-edit" onClick={handleEditModeToggle}></i>
                <>
                    <Link
                        className="buttonactions"
                        style={{ padding: "6px 19px", marginLeft: "10%" }}
                        to={"/Beneficarydetails"}
                    >
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                    </Link>
                </>
            </h4>
            <div className='filterssas one'>
                <div className='row travel_detailss_form'>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Travel Type</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <select className='form-control'
                                onChange={(e) => handleTravelType(e.target.value)}
                                name='travel_insurance_for'
                            >
                                {insureyourtravel.map((item) => (
                                    <option key={item._id} selected={travelinsuranceforname == item.travel_insurance_for ? true : false} value={item._id}>
                                        {item.travel_insurance_for}
                                    </option>
                                ))}
                                {/* Add more options as needed */}
                            </select>
                        ) : (
                            <h6>{travelinsuranceforname}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Trip Period</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>

                        {isEditMode ? (
                            <select className='form-control'
                                onChange={(e) => handlePlanChange(e.target.value)}
                                name='plan_type'
                            >
                                {plantype.map((item) => (
                                    <option key={item._id} selected={tripperiodname == item.travel_type ? true : false} value={item._id}>
                                        {item.travel_type}
                                    </option>
                                ))}
                                {/* Add more options as needed */}
                            </select>
                        ) : (
                            <h6>{tripperiodname}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Number of Days</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <>
                                {/* {travelsFormsData1?.no_of_travel} */}
                                <input
                                    style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                                    type='text'
                                    className='form-control input-sm'
                                    value={travelsFormsData1?.no_of_travel}
                                    name='no_of_travel'
                                    onChange={handleNoOfTravelChange}
                                    disabled={
                                        travelsFormsData1?.plan_type !==
                                        "641d418b19807a3c58191f7f" && newplantype !==
                                        "641d418b19807a3c58191f7f"
                                    }
                                />
                            </>
                        ) : (
                            <h6>{travelsFormsData1?.no_of_travel} days</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Start date</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <DatePicker

                                className="form-control filterdate"
                                selected={travelsFormsData1?.start_date && !isNaN(new Date(travelsFormsData1?.start_date))
                                    ? new Date(travelsFormsData1?.start_date)
                                    : null}
                                placeholderText="DD/MM/YYYY"
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                onChange={handleStartDateChange}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                showTimeSelect={false}
                            />

                        ) : (
                            <h6>{moment(travelsFormsData?.start_date).format(
                                "DD/MM/YYYY"
                            )}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>End Date</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <DatePicker
                                className="form-control"
                                selected={travelsFormsData1?.end_date && !isNaN(new Date(travelsFormsData1?.end_date))
                                    ? new Date(travelsFormsData1?.end_date)
                                    : null}
                                placeholderText="DD/MM/YYYY"
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                showTimeSelect={false}
                                onChange={handleEndDateChange}
                                disabled
                            />
                        ) : (
                            <h6>{moment(travelsFormsData?.end_date).format(
                                "DD/MM/YYYY"
                            )}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Trip Type</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <div>
                                <select className='form-control'
                                    name='type_of_trip'
                                    onChange={(e) => handleTypeOfTripChange(e.target.value)}
                                >
                                    {typeoftrip.map((item) => (
                                        <option key={item._id} selected={triptype == item.travel_plan_type ? true : false} value={item._id}>
                                            {item.travel_plan_type}
                                        </option>
                                    ))}
                                    {/* Add more options as needed */}
                                </select>
                                <i onClick={handlemodal} id="btd" className='fa fa-eye'> <span> View Family Details</span></i>

                            </div>
                        ) : (
                            <h6>{triptype}</h6>
                        )}
                    </div>

                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Destination</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <select
                                className="form-control input-height"
                                placeholder="Select Country"
                                // defaultValue={travelsFormsData.nationality}
                                onChange={(e) => handleDestinationChange(e)}
                                name='nationality'
                            >
                                {travelsFormsData.nationality !== "" ? <option value="" hidden > { travelsFormsData1.nationality} </option> :
                                    <option value="" hidden > Select Country </option>
                                }
                                {country.length === 0 ? (
                                    <div>No options available</div>
                                ) : (
                                    country &&
                                    country.map((val, index) => (
                                        <option value={JSON.stringify(val)} key={index}>
                                            {val.nationality_name}
                                        </option>
                                    ))
                                )}
                            </select>
                        ) : (
                            <h6>{travelsFormsData?.nationality}</h6>
                        )}
                    </div>
                    {
                        isEditMode && (
                            // <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                            //     <button className='submit_select' onClick={handlefinalsubmit}>Save</button>
                            // </div>

                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <button
                                        className="profileupadtes"
                                        id="personalupdate"
                                        onClick={handlefinalsubmit}
                                    >
                                        Update
                                    </button>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <button
                                        className="profileupadtes"
                                        id="personalupdate"
                                        onClick={handlecancelsubmit}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )

                    }
                </div>
            </div>
            <h4 className='personal details'>Personal Details<i className="fa fa-edit" onClick={handlepersonalEditModeToggle}></i></h4>
            <div className='filterssas two mb-5'>
                <div className='row travel_detailss_form'>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Name</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 '>
                        {ispersonalEditMode ? (
                            <input
                                type='text'
                                className='form-control input-sm'
                                defaultValue={travelsFormsData1?.name}
                                onChange={(e) => setNewname(e.target.value)}

                            />
                        ) : (
                            <h6>{travelsFormsData1?.name}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Email Address</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {ispersonalEditMode ? (
                            <input
                                type='text'
                                className='form-control input-sm'
                                defaultValue={travelsFormsData1?.email}
                                disabled
                            />
                        ) : (
                            <h6>{travelsFormsData1?.email}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Phone Number</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {ispersonalEditMode ? (
                            // <input
                            //     type='text'
                            //     className='form-control input-sm'
                            //     defaultValue={travelsFormsData1?.phone_no}
                            //     onChange={(e) => setNewphone(e.target.value)}
                            // />
                            <PhoneInput
                                style={{ backgroundColor: "transparent", boxShadow: "none" }}
                                international
                                name="phone_no"
                                className="form-control phone_numberas"
                                defaultCountry="AE"
                                value={travelsFormsData1?.phone_no}
                                onChange={handlePhoneChange}
                            />
                        ) : (
                            <h6>{travelsFormsData1?.phone_no}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Date of Birth</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {ispersonalEditMode ? (
                            <DatePicker
                                className="form-control"
                                selected={newdate && !isNaN(new Date(newdate))
                                    ? new Date(newdate)
                                    : null}
                                placeholderText="/DD/MM/YYYY"
                                showTimeSelect={false}
                                maxDate={new Date()}
                                peekNextMonth
                                dateFormat="dd/MM/yyyy"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                onChange={(date) => setNewdate(date)}
                            />
                        ) : (
                            <h6>{moment(travelsFormsData?.date_of_birth).format(
                                "DD/MM/YYYY"
                            )}</h6>

                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Passport Number</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {ispersonalEditMode ? (
                            <input
                                type='text'
                                className='form-control input-sm'
                                defaultValue={travelsFormsData1?.passport_no}
                                onChange={(e) => setNewpassport(e.target.value)}
                            />
                        ) : (
                            <h6>{travelsFormsData1?.passport_no}</h6>
                        )}
                    </div>
                    {
                        ispersonalEditMode && (
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <button className="profileupadtes" id="personalupdate" onClick={handlePersonalDetailsSave}>Update</button>
                            </div>
                        )

                    }
                </div>
            </div>
            <Modal size="xl" show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Family Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <form >
                        {formValues.map((element, index) => (
                            <div className="row" key={index} style={{ justifyContent: 'space-around' }}>
                                {
                                    index ?
                                        <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                        : null
                                }
                                <div className='col-lg-4'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i className="fa fa-user" aria-hidden="true"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            name='name'
                                            defaultValue={element.name || ""}
                                            onChange={e => handleChange(index, e)}
                                            required
                                            placeholder="Full Name"
                                            aria-label="Full Name"
                                        />
                                    </InputGroup>
                                </div>
                                <div className='col-lg-4'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 448 512"
                            >
                              <path d="M0 64C0 28.7 28.7 0 64 0H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM183 278.8c-27.9-13.2-48.4-39.4-53.7-70.8h39.1c1.6 30.4 7.7 53.8 14.6 70.8zm41.3 9.2l-.3 0-.3 0c-2.4-3.5-5.7-8.9-9.1-16.5c-6-13.6-12.4-34.3-14.2-63.5h47.1c-1.8 29.2-8.1 49.9-14.2 63.5c-3.4 7.6-6.7 13-9.1 16.5zm40.7-9.2c6.8-17.1 12.9-40.4 14.6-70.8h39.1c-5.3 31.4-25.8 57.6-53.7 70.8zM279.6 176c-1.6-30.4-7.7-53.8-14.6-70.8c27.9 13.2 48.4 39.4 53.7 70.8H279.6zM223.7 96l.3 0 .3 0c2.4 3.5 5.7 8.9 9.1 16.5c6 13.6 12.4 34.3 14.2 63.5H200.5c1.8-29.2 8.1-49.9 14.2-63.5c3.4-7.6 6.7-13 9.1-16.5zM183 105.2c-6.8 17.1-12.9 40.4-14.6 70.8H129.3c5.3-31.4 25.8-57.6 53.7-70.8zM352 192A128 128 0 1 0 96 192a128 128 0 1 0 256 0zM112 384c-8.8 0-16 7.2-16 16s7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H112z" />
                            </svg>
                          </InputGroup.Text>
                                        <Form.Control name='passport' defaultValue={element.passport || ""} onChange={e => handleChange(index, e)} required
                                            placeholder="Passport No."
                                            aria-label="Passport No."
                                        />
                                    </InputGroup>
                                </div>
                                
                               
                                <div className='col-lg-4'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i className="fa fa-calendar" aria-hidden="true"></i></InputGroup.Text>
                                        <DatePicker
                                            selected={
                                                element.date ? new Date(element.date) : new Date()
                                            }
                                            onChange={(date) => handleChange(index, null, date)}
                                            name='date'
                                            placeholderText="Date of Birth"
                                            className='form-control'
                                        />
                                    </InputGroup>
                                </div>
                            </div>
                        ))}
                        <div className="button-section1">
                            <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                        </div>
                    </form> */}



                    <form>
                        {formValues.map((todo, index) => (
                            <div className='row custom_formss12' key={index}>
                                <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        className='form-control'
                                        value={todo.name}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    />
                                </div>
                                <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder="passport"
                                        name="passport"
                                        value={todo.passport}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    />
                                </div>
                                <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                                    <DatePicker
                                        name="date"
                                        className='form-control'
                                        selected={todo && todo.date ? new Date(todo.date) : null}
                                        onChange={(date) => handleTododateChange(date, index)}
                                        placeholderText="Date Of Birth"
                                        maxDate={new Date()}
                                        peekNextMonth
                                        dateFormat="dd/MM/yyyy"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        showTimeSelect={false}
                                        onKeyDown={(e) => e.preventDefault()}
                                    />
                                </div>
                                <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                                    <select
                                        className='form-control'
                                        name="relation"
                                        value={todo.relation}
                                        onChange={(e) => handleChange(e, index)}
                                    >
                                        <option value="" hidden>Relationship</option>
                                        <option value="Child">Child</option>
                                        {/* <option value="Daughter">Daughter</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Father">Father</option> */}
                                        <option value="Spouse">Spouse</option>
                                    </select>
                                </div>
                                {formValues.length > 1 && (
                                    <div className='col-lg-1 col-md-12 col-sm-12 col-xs-12'>
                                        <button
                                            type="button"
                                            onClick={() => removeFormFields(index)}
                                            className="fa fa-trash"
                                            style={{
                                                padding: '10px',
                                                backgroundColor: 'red',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                            }}
                                        ></button>
                                    </div>
                                )}

                            </div>
                        ))}
                        <div className="text-center">
                            <button
                                onClick={addFormFields}
                                type="submit"
                                className="btn-first btn-submit-fill text-center"
                                style={{ position: 'relative', textAlign: 'center' }}
                            >
                                Add member
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='submit_select' onClick={handleSubmit}>Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Travelfilter