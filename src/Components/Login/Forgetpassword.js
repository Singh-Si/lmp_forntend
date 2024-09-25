import React, { useState } from 'react';
import '../../Login.css'
import logo from '../../Image/logo.png'
import login from '../../Image/login.png'
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import Topbar from '../Common/Topbar';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL } from '../..';
const Forgetpassword = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   

    const handleSubmit = async (e) =>
    {  //console.log(formData.email)
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email))
        {
            swal({
                title: "Error!",
                text: "Please enter a valid email address.",
                type: "error",
                icon: "error"
            }).then(function()
            {
                return false;
            });
        }

        try
        {
            if (
                formData.email 
            )
            {
                const requestOptions =
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                await fetch(API_URL+'/api/emailVerification?email='+formData.email, requestOptions)
                .then(response => response.json())
                .then(data =>
                {
                    if (data.status === 200) 
                    {
                        swal({
                            title: "Success!",
                            text: data.message,
                            type: "success",
                            icon: "success"
                        }).then(function() 
                        {
                            navigate('/');
                        });
                    }
                    else
                    {
                        swal({
                            title: "Error!",
                            text: data.message,
                            type: "error",
                            icon: "error"
                        }).then(function() 
                        {
                            navigate('/');
                        });
                    }
                });
            }
        }
        catch (err)
        {
            {};
        }
    };
    return (
        <div className='login' style={{ background: '#F5F5F5' }}>
            <Topbar />
            <div className='row'>
                <div className='col-lg-6' style={{paddingRight: '0px'}}>
                    <div className='login_form'>
                        <img className='login_logo' src={logo} />
                        <div className='login_form1'>
                            <h2>Reset Your Password</h2>
                            <p className='emailaddress'>Enter your email address to reset your password</p>
                            <div className='col-lg-11' style={{ display: 'block', margin: 'auto' }}>
                                <InputGroup className="mb-4">
                                    <InputGroup.Text id="basic-addon1"><i className="fa fa-envelope-o" aria-hidden="true"></i></InputGroup.Text>
                                    <Form.Control required
                                          type="email"
                                          name="email"
                                        onChange={handleChange}
                                        placeholder="Email ID"
                                        aria-label="Email ID"
                                    />
                                </InputGroup>
                            </div>
                            <div className='col-lg-11' style={{ display: 'block', margin: 'auto' }}>
                                <button onClick={handleSubmit} className='login_btnup'>Submit</button>
                            </div>
                            <span className='login_forgot'>Already a user? <Link to="/Login">Sign In</Link></span>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6' style={{paddingLeft: '0px'}}>
                    <img style={{ width: '100%' }} src={login} />
                </div>
            </div>
        </div>
    )
}

export default Forgetpassword