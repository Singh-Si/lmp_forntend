import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import GroupMedical from '../Banner/GroupMedical'
import { Col, Container, Form, Nav, Row, Table } from 'react-bootstrap'
import GroupSidebar from './GroupSidebar'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../..'
import * as XLSX from 'xlsx'
import swal from 'sweetalert'
import { set } from 'firebase/database'
import { CSpinner } from '@coreui/react'

const AddMembersExcel = () => {
    const Navigate = useNavigate();

    const [companyList, setCompanyList] = useState([]);
    const [TPAData, setTPAData] = useState([]);
    const [networkData, setNetworkData] = useState([]);
    const [planList, setPlanList] = useState([]);
    const [policyNumber, SetpolicyNumber] = useState('');
    const [pollicynumberlist, setPollicynumberlist] = useState([])

    const [planCompanyId, setPlanCompanyId] = useState('');
    const [planId, setPlanId] = useState('');
    const [TPAId, setTPAId] = useState('');
    const [networkListId, setNetworkListId] = useState('');

    const [excelData, setExcelData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // company_list();
        // getTPAData();
        // getNetworkData();
        GetGroupMedicalPlans();
    }, []);

   

    const GetGroupMedicalPlans = () => {
        const reqOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usertoken') 
            },
        };
        fetch(`${API_URL}/api/getGroupMedicalPlanName`, reqOptions)
            .then(response => response.json())
            .then(data => {
                setPlanList(data.data);
                console.log("planList>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
            });
    }

    // const company_list = () => {
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     };
    //     fetch(`${API_URL}/api/company_list`, requestOptions)
    //         .then(response => response.json())
    //         .then(data => {
    //             setCompanyList(data.data);
    //             console.log("companyList>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
    //         });
    // }

    // const getTPAData = () => {
    //     const requestOptions = {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }
    //     fetch(`${API_URL}/api/activeMedicalTPA`, requestOptions)
    //         .then(response => response.json())
    //         .then((data) => {
    //             setTPAData(data.data)
    //             console.log("setTPADatal>>>>>>>>>>>>>>>>>>>>>>>>", data.data)
    //         })
    // }

    // const getNetworkData = () => {
    //     const requestOptions = {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }
    //     fetch(`${API_URL}/api/activeMedicalNetwork`, requestOptions)
    //         .then(response => response.json())
    //         .then((data) => {
    //             setNetworkData(data.data)
    //             console.log("networkDatasetTPADatalllllllllllllllllllllllll", data.data)
    //         })
    // }

    const handlePlanChange = (evnt) => {
        console.log("handlePlanChange>>>>>>>>>>>>>>>>>>>>>>>>", evnt)
        setTPAData([])
        // setCompanyData('')
        setNetworkData([])
        SetpolicyNumber('')
        setPollicynumberlist([])

        setPlanId(evnt)
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(`${API_URL}/api/getRatesOfPlan?planId=${evnt}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                const ratesData = data.data
                const TPAdataARr = []
                for (let i = 0; i < ratesData.length; i++){
                    TPAdataARr.push(ratesData[i]?.TPAs[0])
                }
                    
                setTPAData(TPAdataARr)
                // setCompanyData(data.company)
                setCompanyList(data?.company[0]?.company_id[0])
                setPlanCompanyId(data?.company[0]?.company_id[0]?._id)
    
            })
            .catch(error => console.log('error', error));
    }

    const handleChange = (evnt) => {
        const value = evnt.target.value
        setTPAId(value)
        getLinkListByTPAid(value)
        
    }

    const getLinkListByTPAid = (tpaId) => {
        setNetworkData([])
        setNetworkListId('')
        SetpolicyNumber('')
        setPollicynumberlist([])
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        fetch(`${API_URL}/api/getNetworksOfPlanratebyTPA?tpaid=${tpaId}&planid=${planId}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                let networklist = data.data
                let networkArr = networklist.map((item) => ({
                    '_id': item?.networks?.map((item) => item._id).toString(),
                    'name': item?.networks?.map((item) => item.name).toString(),
                    'policy_name': item?.policy_name,
             }))

                setNetworkData(networkArr)
                setNetworkListId(networkArr?.map((val) => val._id))
                setPollicynumberlist(networkArr.map((val) => val.policy_name))
            })
            .catch(error => console.log('error', error));
    }

console.log("NetworkData>>>>>>>>>>>>>>>>>>>>>>>>", networkData)
    
const gotTosetPolicyNumber = (event) => {
    console.log("gotTosetPolicyNumber>>>>>>>>>>>>>>>>>>>>>>>>", event.target.value)
    let Arr = JSON.parse(event.target.value)
    console.log("gotTosetPolicyNumber>>>>>>>>>>>>>>>>>>>>>>>>", Arr)
    setNetworkListId(Arr.id)
    // SetpolicyNumber(Arr.policy_name)

}

    const submitData = () => {
        console.log("submitData>>>>>>>>>>>>>>>>>>>>>>>>", planCompanyId, planId, TPAId, networkListId,policyNumber, excelData)
        if (planId === '') {
            swal("Please fill all the fields", "", "warning");
        }
        else if (planCompanyId === '' ) {
            swal("Please select Insurance Company", "", "warning");
        }
        else if (TPAId === '' ) {
            swal("Please select Policy TPA", "", "warning");
        }
        else if (networkListId === '' ) {
            swal("Please select Network", "", "warning");
        }
        else if (policyNumber === '' ) {
            swal("Please Enter Policy Number", "", "warning");
        }
        else if (excelData.length === 0) {
            swal("Please select Excel file", "", "warning");
        }
        else {
             setLoading(true);
            const formData = new FormData();
            formData.append('planCompanyId', planCompanyId);
            formData.append('planId', planId);
            formData.append('TPAId', TPAId);
            formData.append('networkListId', networkListId);
            formData.append('policy_number', policyNumber);
            formData.append('file', excelData);
            console.log("submitData>>>>>>>>>>>>>>>>>>>>>>>>", Array.from({formData}))

            const requestOptions = {
                method: 'POST', 
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('usertoken') || ''
                },
                body: formData,
            };
            fetch(`${API_URL}/api/addBulkGroupMedicalLeadsByHr`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("submitData>>>>>>>>>>>>>>>>>>>>>>>>", data)
                    if (data.status === 201) {
                        swal("Members added successfully", "", "success");
                        setLoading(false);
                        Navigate('/AddMembers')

                    } else {
                        swal("Something went wrong", "", "error");
                    }
                });
        }
    }


  return (
    <div>
    <Header />
    <GroupMedical />
    {loading && (
        <div className="loader-overlay" style={{background:"transparent"}}>
          <div className="loader">
            <CSpinner color="danger" />
          </div>
        </div>
      )}
      <div className={`content ${loading ? 'loading' : ''}`}>
    <Row className='groupback' >
        <Container fluid className="group-medicalss mt-5">
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Col lg={12}>
                    <Row>
                        <Col lg="3">
                            <GroupSidebar />
                        </Col>
                        <Col lg="9">
                            
                            <div className='member'>
                                <h4>Add Member Details</h4>
                                <Row className='form-member'>
                                   
                                    <Col lg={4}>
                                        <label>Plan Name</label>
                                        <select
                                            className="form-control"
                                            name="planId"
                                            required
                                            onChange={(e) => handlePlanChange(e.target.value)}
                                        >
                                            <option value="" hidden>Select Plan</option>
                                            {planList?.map((item, index) => (
                                                <option key={index} value={item._id}>{item.plan_name}</option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col lg={4}>
                                        <label>Insurance Company Name</label>
                                        <select
                                            className="form-control"
                                            name="planCompanyId"
                                            required
                                            placeholder='Insurance Company Name'
                                            onChange={(e) => setPlanCompanyId(e)}
                                            value={companyList._id}
                                        >
                                            <option value="" hidden>Insurance Company Name</option>
                                            <option value={companyList._id} >{companyList.company_name}</option>
                                        </select>
                                        
                                    </Col>
                                    <Col lg={4}>
                                        <label>TPA</label>
                                        <select
                                            className="form-control"
                                            name="TPAId"
                                            required
                                            onChange={(e) => handleChange(e)}
                                        >
                                            <option value="" hidden>Select Plan</option>
                                            {TPAData?.map((item, index) => (
                                                <option key={index} value={item._id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col lg={4}>
                                        <label>Network</label>
                                        <select
                                            className="form-control"
                                            name="networkListId"
                                            required
                                            defaultValue={networkListId}
                                            onChange={(e) => gotTosetPolicyNumber(e)}
                                        >
                                            <option value="" hidden>Select Network</option>
                                            {networkData?.map((item, index) => (
                                                <option key={index} value={JSON.stringify({"id": item._id, "policy_name": item.policy_name})}>{item.name}</option>
                                            ))}
                                        </select>
                                    </Col>
                                    <Col lg={4}>
                                        <label>Policy Number</label>
                                        <select
                                                    className="form-control"
                                                    name="policyNumber"
                                                    placeholder='Select Policy Number'
                                                    required
                                                    onChange={(e) => SetpolicyNumber(e.target.value)}
                                                >
                                                    <option value="" hidden>Select Policy Number</option>
                                                    {pollicynumberlist?.map((item, index) => (
                                                        <option key={index} value={item}>{item}</option>
                                                    ))}
                                                </select>
                                    </Col>
                                    <Col lg={4}>
                                        <label>Upload Excel</label>
                                        {/* <input type="file" className="form-control" onChange={(e) => {
                                            const file = e.target.files[0];
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                const bstr = event.target.result;
                                                const workBook = XLSX.read(bstr, { type: "binary" });
                                                const workSheetName = workBook.SheetNames[0];
                                                const workSheet = workBook.Sheets[workSheetName];
                                                const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
                                                console.log("data>>>>>>>>>>>>>>>>>>>>>>>>", data)
                                                setExcelData(data);
                                            };
                                            reader.readAsBinaryString(file);
                                        }} /> */}
                                        <input type="file" className="form-control" onChange={(e) => setExcelData(e.target.files[0])} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                    
                                        </Col>
                                </Row>
           
                            </div>
                    <Row className='form-member' style={{justifyContent:'flex-end'}}>
                        <Col lg={4}>
                         <div>                                         
                        <Link className='docuview btn' onClick={submitData}>Submit</Link>

                        </div>
                         </Col>
                         <Col lg={4}>
                         <div>                                         
                        <Link to={'/AddMembers'} className='docuview btn'>Back</Link>

                        </div>
                         </Col>
                        </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
       
    </Row>
    </div>
    <Footer />
</div>
  )
}

export default AddMembersExcel