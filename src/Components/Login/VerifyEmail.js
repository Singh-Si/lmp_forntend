import React, { useEffect, useState } from 'react';
import '../../Login.css'
import logo from '../../Image/logo.png'
import './verifyemail.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UseUserContext } from '../../UserContextAppProvider';
import { API_URL } from '../..';
const VerifyEmail = () => {
  const { usertoken, setToken } = UseUserContext()
  const navigate = useNavigate();
  const [Loading, setisLoading] = useState(false)
  const [Message, setMessage] = useState(null)
  const [Error, setError] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState(null)
  const { token } = useParams()
  useEffect(() => {
    handleSubmit()
  }, [])
  const handleSubmit = async () => {

    try {
      const requestOptions =
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
      };
      setisLoading(true)
      await fetch(API_URL + '/api/verifyuser', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.status === 200) {
            setMessage(data.message)
            setisLoading(false)
          }
          else if (data.status > 399) {
            setMessage(data.message)
            setError(true)
            setisLoading(false)
          }
        });

    }
    catch (err) {
      setisLoading(false)
      setError(true)
      {};
    }
  };
  return (
    <div>

      {/* thank-you-wrapper */}
      <section className="thank-you-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="thank-you-page-logo">
                <Link to="/"><img className="login_logo" src={logo} /></Link>
              </div>
              <div className="thank-you-page-content">
                {
                  Loading ? (<span>loading</span>) : Error ? (<h1 id='error'>{Message}</h1>) : (<h1>{Message}</h1>)
                }
                <a href="#" className="btn bg-black btn-primary arrow-icon"> Go back to Homepage </a>
              </div>
              <ul className="footer-nav bg-black">
                <li> <a className='text-white' href="#">Terms and Conditions </a> </li>
                <li> <a className='text-white' href="#"> Privacy Policy </a> </li>
                <li> <a className='text-white' href="#"> FAQ </a> </li>
                <li> <a className='text-white' href="#"> Contact Us </a> </li>
              </ul>
              <div className="thank-you-copy bg-white">
                <p > Your company © 2020 All Rights Reserved </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* thank-you-wrapper */}
      {/* Scripts */}
    </div>

  )
}

export default VerifyEmail                