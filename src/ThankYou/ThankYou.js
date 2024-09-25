import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL, forntendurl } from '..';
import swal from 'sweetalert';
import "./thankyou.css"
import thankyou from "../Image/thankyou.svg"
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Common/Header';
import Footer from '../Components/Common/Footer';
import { useSelector } from 'react-redux';
import SubmitDocument from './SubmitDocument';
const ThankYou = () => {
  const counter = useSelector((state) => state.MotoformDataReducer);
  const [Message, setMessage] = useState("")
  const [insurancetype, setInsurancetype] = useState(null)
  const [Error, setError] = useState(false)
  const searchParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {


      const ciphertext = searchParams.get("status");
      //console.log(ciphertext)
      let id = searchParams.get("id")
      let plan_id = searchParams.get("plan_id")
      let plan_company_id = searchParams.get("plan_company_id")
      let final_price = searchParams.get("final_price") 
      let planRate = searchParams.get("planRate")
      let yachtRate = searchParams.get("thankyou")
      setInsurancetype(searchParams.get("lob"))


      if (ciphertext == "Pending") {
        UpdatePolicy(id, final_price, ciphertext, planRate, yachtRate)
      } else if (ciphertext == "Cancelled") {
        UpdatePolicy(id, final_price, ciphertext, planRate, yachtRate)

        navigate('/Payments', {
          state: { ...counter?.selectedplans },
          replace: true, // Add this to replace the current history entry
        });
      } else if (ciphertext == "Completed") {
        UpdatePolicy(id, final_price, ciphertext, planRate, yachtRate)
      }

    })()

  }, []);

  const UpdatePolicy = async (id, final_price, planRate, yachtRate) => {
    try {
      // localStorage.removeItem("clientmotorformdata","clientemail")
      // localStorage.removeItem("motorsFormsDataLocation")
      // localStorage.removeItem("clientemail")
      // localStorage.removeItem("minCarValue")
      axios.put(`${API_URL}/api/updatePolicyDetails?id=${id}`, {
        final_price: final_price == "null" ? null : final_price,
        planRate: planRate,
        yachtRate: yachtRate,
        // paymentStatus: ciphertext,
        // policy_issued_date: counter?.policy_issued_date ? counter?.policy_issued_date : new Date(Date.now),
        // bank_name: counter?.BankName,
        locationurl: forntendurl + "/" + window.location.pathname.replace("/", "") + window.location.search,
        insuranceType: searchParams.get("lob")
      }).then((res) => {
        //console.log({res})
        if (res.status === 200) {
          if (typeof final_price === "string") {
            setMessage("Our representative will contact you soon")
          } else {
            setMessage(res.data?.message)
          }

        } else if (res.status === 400) {
          setError(true)
          setMessage(res.data?.message)
        }
      }).catch((error) => {
        //console.log({error})
        setError(true)
        setMessage(error?.response.data?.message ? error?.response.data?.message : "Your Policy Is Not Activate")
      })
    } catch (error) {
      //console.error("Error decrypting data:", error.message);
      swal({
        title: `Error`,
        text: "Your Policy has been activated successfully",
        icon: "error"
      })
      // Handle the error here, such as showing an error message or fallback behavior.
    }
  }

  return (
    <>
      <Header />
      <section className="login-main-wrapper">
        <div className="main-container">
          <div className="login-process">
            <div className="login-main-container">
              <div className="thankyou-wrapper">
                <h1>
                  {Error ? (<span>something went wrong</span>) : (
                    <img
                      src={thankyou}
                      alt="thanks"
                    />
                  )}
                </h1>
                <p>{Message}</p>

                <p className='abcds123456 text-danger'>Upload your documents</p>
                <SubmitDocument />
                <div className="clr" />
              </div>
              <div className="clr" />
            </div>
          </div>
          <div className="clr" />
        </div>
      </section>
      <Footer />
    </>


  )
}

export default ThankYou
