import axios from "axios";
import { API_URL } from ".";
import { useState, useEffect } from "react";
import { AddYachtEstimatedValue } from "./redux/reducers/YachtDataReducerSlice";
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validate Email Id
const motorformLocations = [
  "/Carbasicinfo",
  "/Carpolicyinfo",
  "/Carmodelyear",
  "/Carmaker",
  "/Carmodel",
  "/Carvariant",
  "/Carregisterlocation",
  "/Carspecification",
  "/Personaldetails",
  "/Nationality",
  "/Getquote",
  "/Lastclaim",
  "/Uaedrivingexp",
  "/Chasisno",
  "/Quotes",
  "/Selectedquotes",
  "/Payments",
  "/Comparision",
];
export const getData = (url) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(url)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          { };
          reject(e);
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const PostData = async (url, data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(url, data)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          { };
          reject(e);
        });
    } catch (error) {
      reject(error);
    }
  });
};




export const getCardetailsByLeadid = async (leadid) => {
  return new Promise(async (resolve, reject) => {
    try {

      if (leadid) {
        await axios
          .get(API_URL + "/api/getMotorInsuranceDetails?newLeadId=" + leadid)
          .then(async (response) => {
            console.log(response.data.data, "response.data.data");
            let motorFormsData = response.data.data;

            resolve(motorFormsData);
          })
          .catch((e) => {
            reject(e);
          });
      }

    } catch (error) {
      reject(error);
    }
  });
};

export const getCardetailsById = async (id, plantype) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id && plantype === "Motor") {
        await axios
          .get(API_URL + "/api/getMotorInsuranceDetails?newLeadId=" + id)
          .then((res) => {

            resolve(res.data.data);
          })
          .catch((e) => {
            reject(e);
          });
      } else if (id && plantype === "Medical") {
        await axios
          .get(API_URL + "/api/getMedicalInsuranceDetails?newLeadId=" + id)
          .then((res) => {

            resolve(res.data.data);
          })
          .catch((e) => {
            reject(e);
          });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await axios
        .get(url)
        .then((res) => {
          setLoading(false);
          setData(res);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    })();
  }, [url]);

  return [data, Loading, Error];
};
export const AddFormData = () => {
  const [data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);

  useEffect(() => {
    // AddYachtEstimatedValue()
  }, []);

  return [data, Loading, Error];
};
export const UpdatePolicy = async (
  id,
  plan_company_id,
  plan_id,
  final_price,
  ciphertext,
  policy_issued_date,
  bank_name
) => {
  // try {
  //   await axios
  //     .put(`${API_URL}/api/updatePolicyDetails?id=${id}`, {
  //       plan_company_id,
  //       plan_id,
  //       insuranceType: "Motor",
  //       final_price,
  //       paymentStatus: ciphertext,
  //       policy_issued_date: policy_issued_date
  //         ? policy_issued_date
  //         : new Date(),
  //       bank_name: bank_name ? bank_name : null,
  //     })
  //     .then((res) => {

  //     })
  //     .catch((error) => {

  //     });
  // } catch (error) {
  //   ;
  //   // Handle the error here, such as showing an error message or fallback behavior.
  // }
};
export const UpdatePolicyByBE = async (id, motoformdata) => {
  try {
    await axios
      .put(`${API_URL}/api/updatePolicyDetails?id=${id}`, {
        ...motoformdata,
      })
      .then((res) => {

      })
      .catch((error) => {

      });
  } catch (error) {
    ;
    // Handle the error here, such as showing an error message or fallback behavior.
  }
};
export const getCarDetails = async (
  car_maker,
  model_year,
  car_model,
  car_variant
) => {
  return new Promise(async (resolve, reject) => {

    if (car_maker && model_year) {
      await axios
        .post(API_URL + "/api/getMotorDetails", {
          years: model_year,
          carMaker: car_maker,
        })
        .then((res) => {
          if (res && res.data.data?.length > 0) {
            resolve({ car_model: res?.data?.data });
          } else {
            reject("Data Not Found");
          }
        })
        .catch((error) => {
          ;
          reject(error.response.data.message || "Data Not Found");
        });
    }
    if (car_maker && model_year && car_model) {
      await axios
        .post(API_URL + "/api/getMotorDetails", {
          years: model_year,
          carMaker: car_maker,
          carModel: car_model,
        })
        .then((res) => {
          if (res && res.data.data?.length > 0) {
            resolve({ car_variend: res?.data?.data });
          } else {
            reject("Data Not Found");
          }
        })
        .catch((error) => {
          ;
          reject(error.response.data.message || "Data Not Found");
        });
    }
  });
};
export const ArrayofBusinesstypes = [
  "Select Business Type",
  "Sole Proprietorship",
  "Civil Company",
  "Limited Liability Company (LLC)",
  "Partnership",
  "Private Share Holding Company",
  "Public Share Holding Company",
  "Branch of Foreign Companies/Representative Office",
  "foreignBranch",
  "Branch of GCC Companies",
  "Branch of Free Zone Company",
  "Branch of Dubai Based Companies",
  "Branch of UAE Based Companies",
];
// if user goes to another page instead of motor form details remove motoform details
export const handleRemoveMotorFormdataChange = () => {
  const currentIndex = motorformLocations.indexOf(window.location.pathname);
  if (currentIndex === -1) {
    localStorage.removeItem("clientmotorformdata");
  }
};
export const yachtHullMaterials = [
  {
    name: "Fiberglass (GRP - Glass-Reinforced Plastic)",
    properties: "Lightweight, durable, easy to maintain",
  },
  {
    name: "Aluminum",
    properties: "Strength-to-weight ratio, corrosion-resistant",
  },
  {
    name: "Steel",
    properties: "Robust, durable, withstands impacts",
  },
  {
    name: "Wood",
    properties: "Classic, aesthetic appeal, requires maintenance",
  },
  {
    name: "Carbon Fiber",
    properties: "Lightweight, strong, high-performance",
  },
  {
    name: "Composite Materials",
    properties: "Lightweight, strong, efficient",
  },
  {
    name: "Ferrocement",
    properties: "Durable but labor-intensive",
  }
];
export function randomBasePremium(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}