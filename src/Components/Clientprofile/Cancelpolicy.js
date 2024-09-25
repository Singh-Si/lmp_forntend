import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
// import image4 from '../../Image/icon4.svg'
// import image3 from '../../Image/icon3.svg'
// import image2 from '../../Image/icon2.svg'
// import image1 from '../../Image/icon1.svg'
import pic from '../../Image/discount.png'
import { Form, InputGroup } from 'react-bootstrap'
const Cancelpolicy = () => {
    return (
        <div>
            <Header />
            <section className="page-header">
                <div className="page-header-bg1"></div>
                <div className="container">
                    <div className="page-header__inner">
                        <div className="innerbanner">
                            <h4 className="text-custom-white no-margin">Cancel Policy</h4>
                        </div>
                        <h6 className='para_absdasa'>Log Your Insurance Cancel Policy</h6>
                    </div>
                </div>
            </section>
            <div className='container pt-5 pb-5'>
                <div className='row form_textsa'>
                    <div className='col-lg-4'>
                        <div className="page-header__inner">
                            <div className="innerbanner">
                                <h4 className="form_textsa cancel_policy">Steps for Cancel Policy</h4>
                                <div className='row abcdsrows'>
                                    <div className='col-lg-3'>
                                        <img src={pic} alt='image1' />
                                    </div>
                                    <div className='col-lg-9 textabcd'>
                                        <h3>Step 1</h3>
                                        <p>Get info online</p>
                                        <h2>Shop with less worry We can cover a return</h2>
                                    </div>
                                </div>
                                <div className='row abcdsrows'>
                                    <div className='col-lg-3'>
                                        <img src={pic} alt='image1' />
                                    </div>
                                    <div className='col-lg-9 textabcd'>
                                        <h3>Step 2</h3>
                                        <p>Apply Cancel Policy Online</p>
                                        <h2>Shop with less worry We can cover a return</h2>
                                    </div>
                                </div>
                                <div className='row abcdsrows'>
                                    <div className='col-lg-3'>
                                        <img src={pic} alt='image1' />
                                    </div>
                                    <div className='col-lg-9 textabcd'>
                                        <h3>Step 3</h3>
                                        <p>Provide Details Online</p>
                                        <h2>Shop with less worry We can cover a return</h2>
                                    </div>
                                </div>
                                <div className='row abcdsrows'>
                                    <div className='col-lg-3'>
                                        <img src={pic} alt='image1' />
                                    </div>
                                    <div className='col-lg-9 textabcd'>
                                        <h3>Step 4</h3>
                                        <p>Cancel Policy Immidiately</p>
                                        <h2>Shop with less worry We can cover a return</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <div className="page-header__inner">
                            <div className="innerbanner">
                                <h4 className="form_textsa cancel_policy">Cancel Policy Form</h4>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-shield" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <select className="form-control">
                                    <option value="" hidden="">
                                        LOB
                                    </option>
                                    <option value="Motor">Motor</option>
                                    <option value="Home">Home</option>
                                </select>
                            </InputGroup>
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    name="email"
                                    placeholder="Policy Number"
                                    aria-label="Policy Number"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    name="email"
                                    placeholder="Full Name"
                                    aria-label="Full Name"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    required
                                    name="email"
                                    placeholder="Email Address"
                                    aria-label="Email Address"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-upload" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control
                                    style={{ paddingTop: '20px' }}
                                    required
                                    type='file'
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 formabcdsawee">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                </InputGroup.Text>
                                <Form.Control as="textarea" rows={3}
                                    required
                                />
                            </InputGroup>
                            <div className='buttonsubmit'>
                                <a className="buttonactions mtr5">Submit</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <div className="page-header__inner">
                            <div className="innerbanner">
                                <h4 className="form_textsa cancel_policy">Emergency Number</h4>
                            </div>
                        </div>
                        <div className='emergency notes'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                        <div className='emergency'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                        <div className='emergency'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                        <div className='emergency'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                        <div className='emergency'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                        <div className='emergency'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                        <div className='emergency'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                        <div className='emergency'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                        <div className='emergency'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                        <div className='emergency'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                        <div className='emergency'>
                            <i className='fa fa-phone'></i><span>1 200 333 800</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cancelpolicy