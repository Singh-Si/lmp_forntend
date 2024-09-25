import React, { useState,useEffect } from 'react'
import Reachusimg from '../../Image/reachus.svg'
import axios from 'axios';
import { API_URL } from '../..';
import swal from 'sweetalert';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Reachus = () => {
    const [formData, setformData] = useState({
      name: "",
      email: "",
      phone_number: "",
      query: "",
    });

  const [data, setData] = useState([])


  useEffect(() => {
    getMainpageCmsdata()
  }, [])

  const getMainpageCmsdata = async () => {
    try {
      const requestOptions = {
        method: 'GET',
      }
      await fetch(`${API_URL}/api/get_mainpage`, requestOptions)
        .then(response => response.json())
        .then((data) => {
          //console.log("data", data)
          if (data.status === 200) {
            console.log("data", data.data)
            setData(data.data)
          }
        })

    } catch (error) {
      console.log("error", error)
    }
  }


    const handleChange=(e)=>{
          setformData(()=>{
            return{...formData,[e.target.name]: e.target.value}
          })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
  //console.log(emailRegex.test(formData.email),"email check");
        if (formData.email===""){
            swal("Warning", "Please enter your Email", "warning");
        }
        else if (!emailRegex.test(formData.email)){
           
            swal("Warning", "Please enter a valid Email", "warning");
        }
       else  if (formData.query===""){
         
            swal("Warning", "Please enter Query", "warning");
        }else{
  await axios
    .post(API_URL + "/api/complaint", formData)
    .then((res) => {
      if (res.status === 200 || 201) {
        swal("Success", res.data.message, "success");
        setformData({
          name: "",
          email: "",
          phone_number: "",
          query: "",
        })
        
      } else {
        swal("Error", res.data.message, "error");
      }
    })
    .catch((error) => {
      if (error.response.status > 399) {
        swal("Error", error.response.data.message, "error");
      }
      ;
    });
        }
        
    }
    //console.log(":formData", formData);
    return (
      <div>
        <section className="reachus">
          <h3 className="text-center" data-aos="zoom-in">
            How to Reach Us
          </h3>
          <div className="container">
            <form method="post" onSubmit={handleSubmit}>
              <div className="row" style={{ alignItems: "center" }}>
                <div
                  className="col-lg-6 col-md-12 col-sm-12 col-xs-12"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                >
                  {/* <p>
                    Call us today, leave a message, email or find your nearest
                    office below and We are here for you 24 hours , 7 days a
                    week.
                  </p>
                  <h2>We are here for you 24 hours a day, 7 days a week</h2> */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.howToReachUs,
                    }}
                  />
                  <img className="Reachusimg" src={Reachusimg} alt="" />
                </div>
                <div
                  className="col-lg-6 col-md-12 col-sm-12 col-xs-12"
                  data-aos="fade-left"
                  data-aos-duration="2000"
                >
                  <div className="reachus_contact">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <input
                      placeholder="Enter Name"
                      name="name"
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <div className="reachus_contact">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <input
                      placeholder="Enter Phone"
                      name="phone_number"
                      type="text"
                      value={formData.phone_number}
                      className="form-control"
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <div className="reachus_contact">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <input
                      placeholder="Enter Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      className="form-control"
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <div className="reachus_contact">
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                    <textarea style={{background:'transparent',border: 'none'}}
                      placeholder="Enter Query"
                      name="query"
                      type="text"
                      value={formData.query}
                      className="form-control"
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <button className="submit_query">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
}
export default Reachus