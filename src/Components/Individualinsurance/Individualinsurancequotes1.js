import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import finance from '../../Image/finance.svg'
import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import tick from '../../Image/ticks.svg'
import cross from '../../Image/cross.svg'
import Individualmedicalfilter from './Individualmedicalfilter'
import { Link } from 'react-router-dom'
import Individualmedicalbanner from '../Banner/Individualmedicalbanner'
const Individualinsurancequotes = () => {
    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    return (
        <div>
            <Header />
            <Individualmedicalbanner />
            <div className='Quotes_info1'>
                <div className='container Quotes_info pt-4 pb-4'>
                    <div className='row quotes_all'>
                        <Individualmedicalfilter />
                        <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12'>
                            <div className='row quotes_selectoption'>
                                <div className='col'>
                                    <select className='quotes_select form-control'>
                                        <option>Repair Type</option>
                                        <option>Sort By</option>
                                        <option>Sort By</option>
                                    </select>
                                </div>
                                <div className='col'>
                                    <select className='quotes_select form-control'>
                                        <option>Ins Company</option>
                                        <option>Sort By</option>
                                        <option>Sort By</option>
                                    </select>
                                </div>
                                <div className='col'>
                                    <select className='quotes_select form-control'>
                                        <option>Plan Nature</option>
                                        <option>Sort By</option>
                                        <option>Sort By</option>
                                    </select>
                                </div>
                                <div className='col'>
                                    <select className='quotes_select form-control'>
                                        <option>Instant Policy</option>
                                        <option>Sort By</option>
                                        <option>Sort By</option>
                                    </select>
                                </div>
                                <div className='col'>
                                    <select className='quotes_select form-control'>
                                        <option>Price</option>
                                        <option>Sort By</option>
                                        <option>Sort By</option>
                                    </select>
                                </div>
                            </div>
                            <p>We have found 4 travel insurance quotes for your travel arrangements.</p>
                            <div className='scroll_abcds'>
                                <div className='quotes_inner'>
                                    <div className='row quotes_details pb-3'>
                                        <div className='col-lg-3'>
                                            <img src={finance} style={{ width: '100%' }} />
                                        </div>
                                        <div className='col-lg-6'>
                                            <h4>THIRD PARTY-SALOON/HATCHBACK-6 </h4>
                                            <ul className='benefits'>
                                                <li>Rent a Car (Free)</li>
                                                <li>Oman Coverage (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                            </ul>
                                        </div>
                                        <div className='col-lg-3 action_abcd'>
                                            <h2>AED 1200</h2>
                                            <h6 className='indicative' style={{paddingTop:'5px',paddingBottom:'0px',marginBottom:'0px'}}>(Indicative)</h6>
                                            <Form.Check className='abcds_abcs1' type="checkbox" label="Compare" />
                                            <Link to="/Selectedquotes"><button className='submit_select'>Select</button></Link>
                                            <p>T&C Apply</p>
                                        </div>
                                    </div>
                                    {showMore ? (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <div className='col-lg-6 abc'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                                                    <ul className='description'>
                                                        <li>24 Hour Roadside Assistance (Covered)</li>
                                                        <li>Ambulance Cover (Covered up to AED 6770/-)</li>
                                                        <li>Emergency Medical Expenses (Covered up to AED 2000/-)</li>
                                                        <li>Fire & Theft & Natural Calamity (Covered)</li>
                                                        <li>Own Damage Cover (Covered - Non Agency Repair)</li>
                                                    </ul>
                                                </div>
                                                <div className='col-lg-6 cde'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                                                    <ul className='description'>
                                                        <li>What is not Covered.</li>
                                                        <li>Off Road cover for 4x4</li>
                                                        <li>Rent a Car for 10 days</li>
                                                        <li>Valet Parking Theft</li>
                                                        <li>Oman Extension (Optional)</li>
                                                        <li>Personal Injury</li>
                                                        <li>Replacement of Locks</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>Hide Details</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>See Details</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='quotes_inner'>
                                    <div className='row quotes_details pb-3'>
                                        <div className='col-lg-3'>
                                            <img src={finance} style={{ width: '100%' }} />
                                        </div>
                                        <div className='col-lg-6'>
                                            <h4>THIRD PARTY-SALOON/HATCHBACK-6 </h4>
                                            <ul className='benefits'>
                                                <li>Rent a Car (Free)</li>
                                                <li>Oman Coverage (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                            </ul>
                                        </div>
                                        <div className='col-lg-3 action_abcd'>
                                            <h2>AED 1200</h2>
                                            <h6 className='indicative' style={{paddingTop:'5px',paddingBottom:'0px',marginBottom:'0px'}}>(Indicative)</h6>
                                            <Form.Check className='abcds_abcs1' type="checkbox" label="Compare" />
                                            <Link to="/Selectedquotes"><button className='submit_select'>Select</button></Link>
                                            <p>T&C Apply</p>
                                        </div>
                                    </div>
                                    {showMore ? (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <div className='col-lg-6 abc'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                                                    <ul className='description'>
                                                        <li>24 Hour Roadside Assistance (Covered)</li>
                                                        <li>Ambulance Cover (Covered up to AED 6770/-)</li>
                                                        <li>Emergency Medical Expenses (Covered up to AED 2000/-)</li>
                                                        <li>Fire & Theft & Natural Calamity (Covered)</li>
                                                        <li>Own Damage Cover (Covered - Non Agency Repair)</li>
                                                    </ul>
                                                </div>
                                                <div className='col-lg-6 cde'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                                                    <ul className='description'>
                                                        <li>What is not Covered.</li>
                                                        <li>Off Road cover for 4x4</li>
                                                        <li>Rent a Car for 10 days</li>
                                                        <li>Valet Parking Theft</li>
                                                        <li>Oman Extension (Optional)</li>
                                                        <li>Personal Injury</li>
                                                        <li>Replacement of Locks</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>Hide Details</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>See Details</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='quotes_inner'>
                                    <div className='row quotes_details pb-3'>
                                        <div className='col-lg-3'>
                                            <img src={finance} style={{ width: '100%' }} />
                                        </div>
                                        <div className='col-lg-6'>
                                            <h4>THIRD PARTY-SALOON/HATCHBACK-6 </h4>
                                            <ul className='benefits'>
                                                <li>Rent a Car (Free)</li>
                                                <li>Oman Coverage (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                            </ul>
                                        </div>
                                        <div className='col-lg-3 action_abcd'>
                                            <h2>AED 1200</h2>
                                            <h6 className='indicative' style={{paddingTop:'5px',paddingBottom:'0px',marginBottom:'0px'}}>(Indicative)</h6>
                                            <Form.Check className='abcds_abcs1' type="checkbox" label="Compare" />
                                            <Link to="/Selectedquotes"><button className='submit_select'>Select</button></Link>
                                            <p>T&C Apply</p>
                                        </div>
                                    </div>
                                    {showMore ? (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <div className='col-lg-6 abc'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                                                    <ul className='description'>
                                                        <li>24 Hour Roadside Assistance (Covered)</li>
                                                        <li>Ambulance Cover (Covered up to AED 6770/-)</li>
                                                        <li>Emergency Medical Expenses (Covered up to AED 2000/-)</li>
                                                        <li>Fire & Theft & Natural Calamity (Covered)</li>
                                                        <li>Own Damage Cover (Covered - Non Agency Repair)</li>
                                                    </ul>
                                                </div>
                                                <div className='col-lg-6 cde'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                                                    <ul className='description'>
                                                        <li>What is not Covered.</li>
                                                        <li>Off Road cover for 4x4</li>
                                                        <li>Rent a Car for 10 days</li>
                                                        <li>Valet Parking Theft</li>
                                                        <li>Oman Extension (Optional)</li>
                                                        <li>Personal Injury</li>
                                                        <li>Replacement of Locks</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>Hide Details</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>See Details</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='quotes_inner'>
                                    <div className='row quotes_details pb-3'>
                                        <div className='col-lg-3'>
                                            <img src={finance} style={{ width: '100%' }} />
                                        </div>
                                        <div className='col-lg-6'>
                                            <h4>THIRD PARTY-SALOON/HATCHBACK-6 </h4>
                                            <ul className='benefits'>
                                                <li>Rent a Car (Free)</li>
                                                <li>Oman Coverage (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                            </ul>
                                        </div>
                                        <div className='col-lg-3 action_abcd'>
                                            <h2>AED 1200</h2>
                                            <h6 className='indicative' style={{paddingTop:'5px',paddingBottom:'0px',marginBottom:'0px'}}>(Indicative)</h6>
                                            <Form.Check className='abcds_abcs1' type="checkbox" label="Compare" />
                                            <Link to="/Selectedquotes"><button className='submit_select'>Select</button></Link>
                                            <p>T&C Apply</p>
                                        </div>
                                    </div>
                                    {showMore ? (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <div className='col-lg-6 abc'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                                                    <ul className='description'>
                                                        <li>24 Hour Roadside Assistance (Covered)</li>
                                                        <li>Ambulance Cover (Covered up to AED 6770/-)</li>
                                                        <li>Emergency Medical Expenses (Covered up to AED 2000/-)</li>
                                                        <li>Fire & Theft & Natural Calamity (Covered)</li>
                                                        <li>Own Damage Cover (Covered - Non Agency Repair)</li>
                                                    </ul>
                                                </div>
                                                <div className='col-lg-6 cde'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                                                    <ul className='description'>
                                                        <li>What is not Covered.</li>
                                                        <li>Off Road cover for 4x4</li>
                                                        <li>Rent a Car for 10 days</li>
                                                        <li>Valet Parking Theft</li>
                                                        <li>Oman Extension (Optional)</li>
                                                        <li>Personal Injury</li>
                                                        <li>Replacement of Locks</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>Hide Details</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>See Details</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='quotes_inner'>
                                    <div className='row quotes_details pb-3'>
                                        <div className='col-lg-3'>
                                            <img src={finance} style={{ width: '100%' }} />
                                        </div>
                                        <div className='col-lg-6'>
                                            <h4>THIRD PARTY-SALOON/HATCHBACK-6 </h4>
                                            <ul className='benefits'>
                                                <li>Rent a Car (Free)</li>
                                                <li>Oman Coverage (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                            </ul>
                                        </div>
                                        <div className='col-lg-3 action_abcd'>
                                            <h2>AED 1200</h2>
                                            <h6 className='indicative' style={{paddingTop:'5px',paddingBottom:'0px',marginBottom:'0px'}}>(Indicative)</h6>
                                            <Form.Check className='abcds_abcs1' type="checkbox" label="Compare" />
                                            <Link to="/Selectedquotes"><button className='submit_select'>Select</button></Link>
                                            <p>T&C Apply</p>
                                        </div>
                                    </div>
                                    {showMore ? (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <div className='col-lg-6 abc'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                                                    <ul className='description'>
                                                        <li>24 Hour Roadside Assistance (Covered)</li>
                                                        <li>Ambulance Cover (Covered up to AED 6770/-)</li>
                                                        <li>Emergency Medical Expenses (Covered up to AED 2000/-)</li>
                                                        <li>Fire & Theft & Natural Calamity (Covered)</li>
                                                        <li>Own Damage Cover (Covered - Non Agency Repair)</li>
                                                    </ul>
                                                </div>
                                                <div className='col-lg-6 cde'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                                                    <ul className='description'>
                                                        <li>What is not Covered.</li>
                                                        <li>Off Road cover for 4x4</li>
                                                        <li>Rent a Car for 10 days</li>
                                                        <li>Valet Parking Theft</li>
                                                        <li>Oman Extension (Optional)</li>
                                                        <li>Personal Injury</li>
                                                        <li>Replacement of Locks</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>Hide Details</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>See Details</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='quotes_inner'>
                                    <div className='row quotes_details pb-3'>
                                        <div className='col-lg-3'>
                                            <img src={finance} style={{ width: '100%' }} />
                                        </div>
                                        <div className='col-lg-6'>
                                            <h4>THIRD PARTY-SALOON/HATCHBACK-6 </h4>
                                            <ul className='benefits'>
                                                <li>Rent a Car (Free)</li>
                                                <li>Oman Coverage (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                                <li>Passenger and Driver (Free)</li>
                                            </ul>
                                        </div>
                                        <div className='col-lg-3 action_abcd'>
                                            <h2>AED 1200</h2>
                                            <h6 className='indicative' style={{paddingTop:'5px',paddingBottom:'0px',marginBottom:'0px'}}>(Indicative)</h6>
                                            <Form.Check className='abcds_abcs1' type="checkbox" label="Compare" />
                                            <Link to="/Selectedquotes"><button className='submit_select'>Select</button></Link>
                                            <p>T&C Apply</p>
                                        </div>
                                    </div>
                                    {showMore ? (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <div className='col-lg-6 abc'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                                                    <ul className='description'>
                                                        <li>24 Hour Roadside Assistance (Covered)</li>
                                                        <li>Ambulance Cover (Covered up to AED 6770/-)</li>
                                                        <li>Emergency Medical Expenses (Covered up to AED 2000/-)</li>
                                                        <li>Fire & Theft & Natural Calamity (Covered)</li>
                                                        <li>Own Damage Cover (Covered - Non Agency Repair)</li>
                                                    </ul>
                                                </div>
                                                <div className='col-lg-6 cde'>
                                                    <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                                                    <ul className='description'>
                                                        <li>What is not Covered.</li>
                                                        <li>Off Road cover for 4x4</li>
                                                        <li>Rent a Car for 10 days</li>
                                                        <li>Valet Parking Theft</li>
                                                        <li>Oman Extension (Optional)</li>
                                                        <li>Personal Injury</li>
                                                        <li>Replacement of Locks</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>Hide Details</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='rowabcds'>
                                            <div className='row'>
                                                <button className='showadd_details' onClick={toggleShowMore}>See Details</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Individualinsurancequotes