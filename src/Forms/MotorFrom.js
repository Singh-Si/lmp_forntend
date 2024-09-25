import { Form, Dropdown, Col, Button, Row } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "..";
import { useCallback, useEffect, useState } from "react";
import { UseMotorContext } from "../MultiStepContextApi";
function CarDetailsPopUpForm({ setShowCarDetailsform }) {
  const [lastyearpolicies, setlastyearpolicies] = useState([]);
  const [policies, setpolicies] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { motorFormsData, setMotorFormsData, motornextStep } =
    UseMotorContext();
    const [Years, setYears] = useState([]);
  useEffect(() => {
    const date = new Date();
    const currentdate = date.getFullYear();
    const currentMonth = date.getMonth();
    if (currentMonth > 5) {
      const y = [];
      for (let i = currentdate + 1; i >= 2000; i--) {
        y.push({ year: i });
      }
      setYears(y);
  
    } else {
      const y = [];
      for (let i = currentdate; i >= 2000; i--) {
        y.push({ year: i });
      }
      setYears(y);
    }
    fetchdata();
  }, []);
  const getMotordata = async (data) => {
    setLoading(true);
      await axios
      .post(API_URL + "/api/getMotorDetails", )
      .then((response) => {
        //console.log(response.data.data)
        setLoading(false);
      })
      .catch((error) => {
        
        setLoading(false);
      });
};
  const SelectModelYear=async(eventKey) => {
    //console.log({ eventKey });
    setMotorFormsData((prevData) => ({
      ...prevData,
      model_year: eventKey.toString(),
    }));
    localStorage.setItem(
      `clientmotorformdata`,
      JSON.stringify(motorFormsData)
    );
    getMotordata({ years: motorFormsData?.model_year})
  }
  const fetchdata = async () => {
    try {
      const get_all_policiy_type = axios.get(
        API_URL + "/api/get_all_policiy_type"
      );
      const all_getPlanFor = axios.get(API_URL + "/api/getPlanFor");
      const [get_all_policiy_type_response, all_getPlanFor_response] =
        await axios.all([get_all_policiy_type, all_getPlanFor]);
      if (get_all_policiy_type_response?.data?.result?.length > 0) {
        setlastyearpolicies(get_all_policiy_type_response.data.result);
      }
      if (all_getPlanFor_response?.data?.data?.length > 0) {
        setpolicies(all_getPlanFor_response.data.data);
        const getindex = policies.findIndex(
          (item) => item.plan_for_name == motorFormsData?.polcy_type
        );
        if (policies.length > 0) {
          //console.log({ policies });
          //console.log({ getindex });
        }
      }
    } catch (error) {
      ;
    }
  };

  const SubmitCarDetails = useCallback(async () => {
    //console.log("run function");
    await axios.post(
      API_URL + "/api/saveMotorInsuranceDetails?" + motorFormsData.email,
      {
        ...motorFormsData,
        form_location: window.location.pathname,
      }
    );
    motornextStep();
    setShowCarDetailsform(false);
  }, []);
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Policy Type {motorFormsData?.polcy_type}</Form.Label>
        
          <Dropdown
            onSelect={(eventKey) => {
              setMotorFormsData((prevData) => ({
                ...prevData,
                polcy_type: eventKey,
              }));
              localStorage.setItem(
                `clientmotorformdata`,
                JSON.stringify(motorFormsData)
              );
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {motorFormsData?.polcy_type || "Select Policy Type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {policies.length > 0 ? (
                policies.map((v) => {
                  return (
                    <Dropdown.Item
                      key={v?.plan_for_name}
                      eventKey={v?.plan_for_name}
                    >
                      {v?.plan_for_name}
                    </Dropdown.Item>
                  );
                })
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Year Policy Type</Form.Label>
          <Dropdown
            onSelect={(eventKey) => {
              //console.log({ eventKey });
              setMotorFormsData((prevData) => ({
                ...prevData,
                last_year_policy_type: eventKey,
              }));
              localStorage.setItem(
                `clientmotorformdata`,
                JSON.stringify(motorFormsData)
              );
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {motorFormsData?.last_year_policy_type || "Select Last Year Policy Type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {lastyearpolicies.length > 0 ? (
                lastyearpolicies.map((v) => {
                  return (
                    <Dropdown.Item
                      key={v?.policy_type_name}
                      eventKey={v?.policy_type_name}
                    >
                      {v?.policy_type_name}
                    </Dropdown.Item>
                  );
                })
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
          <Form.Label>Current year policy still valid ?</Form.Label>
          {motorFormsData?.your_existing_policy_expired ? (
            <>
              <input
                type="checkbox"
                onChange={(e) => {
                  setMotorFormsData((prevData) => ({
                    ...prevData,
                    your_existing_policy_expired: e.target.checked,
                  }));
                  localStorage.setItem(
                    `clientmotorformdata`,
                    JSON.stringify(motorFormsData)
                  );
                }}
                checked="checked"
              />{" "}
              <span>Yes</span>
            </>
          ) : (
            <>
              <input
                onChange={(e) => {
                  setMotorFormsData((prevData) => ({
                    ...prevData,
                    your_existing_policy_expired: e.target.checked,
                  }));
                  localStorage.setItem(
                    `clientmotorformdata`,
                    JSON.stringify(motorFormsData)
                  );
                }}
                type="checkbox"
                checked=""
              />
              <span className="ml-2">No</span>
            </>
          )}
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
          <Form.Label>Model Year</Form.Label>
          <Dropdown
            onSelect={SelectModelYear}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {motorFormsData?.model_year || "Select Model Year"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Years.length > 0 ? (
                Years.map((v) => {
                  return (
                    <Dropdown.Item
                      key={v?.year}
                      eventKey={v?.year}
                    >
                      {v?.year}
                    </Dropdown.Item>
                  );
                })
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
          <Form.Label>Maker</Form.Label>
          <Dropdown
            onSelect={(eventKey) => {
              //console.log({ eventKey });
              setMotorFormsData((prevData) => ({
                ...prevData,
                last_year_policy_type: eventKey,
              }));
              localStorage.setItem(
                `clientmotorformdata`,
                JSON.stringify(motorFormsData)
              );
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {motorFormsData?.last_year_policy_type || "Select Last Year Policy Type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {lastyearpolicies.length > 0 ? (
                lastyearpolicies.map((v) => {
                  return (
                    <Dropdown.Item
                      key={v?.policy_type_name}
                      eventKey={v?.policy_type_name}
                    >
                      {v?.policy_type_name}
                    </Dropdown.Item>
                  );
                })
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
          <Form.Label>Model Detail</Form.Label>
          <Dropdown
            onSelect={(eventKey) => {
              //console.log({ eventKey });
              setMotorFormsData((prevData) => ({
                ...prevData,
                last_year_policy_type: eventKey,
              }));
              localStorage.setItem(
                `clientmotorformdata`,
                JSON.stringify(motorFormsData)
              );
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {motorFormsData?.last_year_policy_type || "Select Last Year Policy Type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {lastyearpolicies.length > 0 ? (
                lastyearpolicies.map((v) => {
                  return (
                    <Dropdown.Item
                      key={v?.policy_type_name}
                      eventKey={v?.policy_type_name}
                    >
                      {v?.policy_type_name}
                    </Dropdown.Item>
                  );
                })
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
          <Form.Label>first registration year</Form.Label>
          <Dropdown
            onSelect={(eventKey) => {
              //console.log({ eventKey });
              setMotorFormsData((prevData) => ({
                ...prevData,
                last_year_policy_type: eventKey,
              }));
              localStorage.setItem(
                `clientmotorformdata`,
                JSON.stringify(motorFormsData)
              );
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {motorFormsData?.last_year_policy_type || "Select Last Year Policy Type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {lastyearpolicies.length > 0 ? (
                lastyearpolicies.map((v) => {
                  return (
                    <Dropdown.Item
                      key={v?.policy_type_name}
                      eventKey={v?.policy_type_name}
                    >
                      {v?.policy_type_name}
                    </Dropdown.Item>
                  );
                })
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
          <Form.Label>Area of Registration</Form.Label>
          <Dropdown
            onSelect={(eventKey) => {
              //console.log({ eventKey });
              setMotorFormsData((prevData) => ({
                ...prevData,
                last_year_policy_type: eventKey,
              }));
              localStorage.setItem(
                `clientmotorformdata`,
                JSON.stringify(motorFormsData)
              );
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {motorFormsData?.last_year_policy_type || "Select Last Year Policy Type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {lastyearpolicies.length > 0 ? (
                lastyearpolicies.map((v) => {
                  return (
                    <Dropdown.Item
                      key={v?.policy_type_name}
                      eventKey={v?.policy_type_name}
                    >
                      {v?.policy_type_name}
                    </Dropdown.Item>
                  );
                })
              ) : (
                <></>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Button onClick={SubmitCarDetails} variant="primary">
          Submit
        </Button>
      </Row>
    </Form>
  );
}

export { CarDetailsPopUpForm };
