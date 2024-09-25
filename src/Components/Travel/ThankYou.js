// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import swal from 'sweetalert';
// // import "../../ThankYou/thankyou.css"
// import thankyou from "../../Image/thankyou.svg"
// import { Link, useNavigate } from 'react-router-dom';
// import Header from '../../Components/Common/Header';
// import Footer from '../../Components/Common/Footer';
// import { API_URL } from '../..'
// const ThankYou = () => {
//    const [Message, setMessage] = useState("")
//    const [Error, setError] = useState(false)
//    const navigate=useNavigate()

//    const id = JSON.parse(localStorage.getItem("leaddetails")); 

//    useEffect(() => {
//     handlePaymentstatus();
//     }, [])


//    const handlePaymentstatus = async() => {

//     const requestOptions = {
//         method: 'Put',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             paymentStatus : "Completed",
//         })
//     };

//     await fetch(`${API_URL}/api/updatePolicyDetails?id=${id}`, requestOptions)
//         .then(response => {
//             //console.log(response);
//             //console.log(response.data);
//         })
//         .catch(error => {
//             //console.log(error.response)
//         })

// }


//   return (
//     <>
//     <Header/>
//     <section className="login-main-wrapper">
//     <div className="main-container">
//       <div className="login-process">
//         <div className="login-main-container">
//           <div className="thankyou-wrapper">
//             <h1>Thankyou</h1>
//             <h1>
//              {Error ?(<span>something went wrong</span>):(
//                <img
//                src={thankyou}
//                alt="thanks"
//              />
//              )}
//             </h1>
//             <p>{Message}</p>
//             <p className='abcds123456'>To view policy click on the below button</p>
//             <Link  className="gotodashboard"to={"/"}>Back to Home</Link>
//             <div className="clr" />
//           </div>
//           <div className="clr" />
//         </div>
//       </div>
//       <div className="clr" />
//     </div>
//   </section>
//   <Footer/>
//     </>


//   )
// }

// export default ThankYou

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../..';
import swal from 'sweetalert';
import "../../ThankYou/thankyou.css"
import thankyou from "../../Image/thankyou.svg"
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import { useSelector } from 'react-redux';
import SubmitDocument from "../../ThankYou/SubmitDocument";
const ThankYou = () => {
  const counter = useSelector((state) => state.MotoformDataReducer);
  const [Message, setMessage] = useState("")
  const [insurancetype, setInsurancetype] = useState(null)
  const [Error, setError] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(window.location.search);

      const ciphertext = searchParams.get("status");
      //console.log(ciphertext)
      let id = searchParams.get("id")
      let plan_id = searchParams.get("plan_id")
      let plan_company_id = searchParams.get("plan_company_id")
      let final_price = searchParams.get("final_price")


      if (ciphertext == "Pending") {
        UpdatePolicy(id, plan_company_id, plan_id, final_price, ciphertext)
      } else if (ciphertext == "Cancelled") {
        UpdatePolicy(id, plan_company_id, plan_id, final_price, ciphertext)

        navigate('/Payments', {
          state: { ...counter?.selectedplans },
          replace: true, // Add this to replace the current history entry
        });
      } else if (ciphertext == "Completed") {
        UpdatePolicy(id, plan_company_id, plan_id, final_price, ciphertext)
      }

    })()

  }, []);

  const UpdatePolicy = async (id, plan_company_id,
    plan_id,
    final_price, ciphertext) => {
    try {
      // localStorage.removeItem("clientmotorformdata","clientemail")
      // localStorage.removeItem("motorsFormsDataLocation")
      // localStorage.removeItem("clientemail")
      // localStorage.removeItem("minCarValue")
      axios.put(`${API_URL}/api/updatePolicyDetails?id=${id}`, {
        plan_company_id,
        plan_id,
        final_price: final_price == "null" ? null : final_price,
        paymentStatus: ciphertext,
        policy_issued_date: counter?.policy_issued_date ? counter?.policy_issued_date : new Date(Date.now),
        bank_name: counter?.BankName
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

