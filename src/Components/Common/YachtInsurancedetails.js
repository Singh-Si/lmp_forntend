import React, { useState, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import swal from 'sweetalert'
import { API_URL } from '../..'

const YachtInsurancedetails = () => {

    const [yachtContent, setYachtContent] = useState('')
    useEffect(() => {
        getYachtContent();
    }, []);

    const getYachtContent = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            };

            await fetch(`${API_URL}/api/getYachtContent`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200) {
                        setYachtContent(data.data.yachtContent);
                    } else {
                        swal("Error", "Error Fetching Yacht Content", "error");
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    console.log(yachtContent)

    return (
        <div>
            <div className='insurance_details pt-3 pb-3'>
                {/* <div className='container'>
                    <p>Looking for car insurance, please contact our team at lastminutepolicy.com to help you find the ideal Online Motor Insurance in Dubai and other emirates of UAE that covers all your basic needs and preferences, within your budget.
                        <br />Accidents on the road can occur anytime, anywhere. Be sure you are fully protected and covered with a comprehensive insurance policy from trusted and leading motor and Car Insurance Dubai, UAE</p>

                    <div className='row'>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                            <h3 className='abcd1234'>Types of Car Insurance in UAE | Buy Online Motor Insurance</h3>
                            <ul className='list_abcds'>
                                <li>Comprehensive Car Insurance</li>
                                <li>Third Party Liability (TPL) Insurance</li>
                            </ul>
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                            <h3 className='abcd1234'>Benefits to Buy online Motor Insurance</h3>
                            <ul className='list_abcds'>
                                <li>Covers for Your Car's Damages.</li>
                                <li>Cost Effective.</li>
                                <li>Get repairs in premium garages.</li>
                                <li>Protects your Car During Natural Disasters.</li>
                                <li>Compensates you in case of Car Theft.</li>
                                <li>You Can opt for additional covers such as Breakdown Assistance.</li>
                            </ul>
                        </div>
                    </div>
                    <h4 className='find_abcd'>Find the best motor insurance company Dubai for your unique needs</h4>
                    <p className='find_abcd'>With a large number of recognized Car Insurance Online in Dubai, sorting out various policies to find the most suitable one can be quite a challenge and a daunting task.
                        Based on your information, we will help you select and compare policies to find the one that best suits your specific needs and budget. We offer multiple options for online motor insurance Dubai and in other emirates for you to choose, and we shall help you in every step of the way.</p>
                    <h4 className='find_abcd'>Consult with our online motor insurance advisor today!</h4>
                    <p className='find_abcd'>As always, at lastminutepolicy.com, we make the process easy, smooth and simple. Choose your perfect insurance plan, decide on the payment method, and we shall promptly deliver your policy by email or to your home or office if you are buying a car under bank loan. You are also welcome to drop by our office to meet one of our sales advisors and collect your motor insurance policy.</p>
                </div> */}

                <div className='container' >
                    <div dangerouslySetInnerHTML={{ __html: yachtContent }} />
                </div>
            </div>
        </div>
    )
}

export default YachtInsurancedetails