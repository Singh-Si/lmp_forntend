import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Travelfilter from './Travelfilter'
import { Link } from 'react-router-dom'
import Travelbanner from '../Banner/Travelbanner'
const Termsandcondition = () => {
  return (
    <div>
      <Header />
      <Travelbanner />
      <div className='Quotes_info1'>
        <div className='container Quotes_info1212 pt-4 pb-4'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-12'>
              <div className='row quotes_all'>
                <Travelfilter />
                <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 text_all_abcds'>
                  <h3>Terms of Acceptance</h3>
                  <h4>I here by declare that</h4>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label className="form-check-label text-abcdq" for="flexCheckChecked">
                      Any non-disclosure, misrepresentation, or concealment of material fact will make this policy void with immediate effect and premium refund will be as per insurer’s policy terms and conditions.
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label className="form-check-label text-abcdq" for="flexCheckChecked">
                      Any non-disclosure, misrepresentation, or concealment of material fact will make this policy void with immediate effect and premium refund will be as per insurer’s policy terms and conditions.
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label className="form-check-label text-abcdq" for="flexCheckChecked">
                      Any non-disclosure, misrepresentation, or concealment of material fact will make this policy void with immediate effect and premium refund will be as per insurer’s policy terms and conditions.
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label className="form-check-label text-abcdq" for="flexCheckChecked">
                      Any non-disclosure, misrepresentation, or concealment of material fact will make this policy void with immediate effect and premium refund will be as per insurer’s policy terms and conditions.
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label className="form-check-label text-abcdq" for="flexCheckChecked">
                      Any non-disclosure, misrepresentation, or concealment of material fact will make this policy void with immediate effect and premium refund will be as per insurer’s policy terms and conditions.
                    </label>
                  </div>
                  <div className="form-check mt-3 mb-3">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                    <label className="form-check-label text-abcdq" for="flexCheckChecked">
                      I have read and agree to Terms and Conditions
                    </label>
                  </div>
                </div>
                <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                  <Link to="/Travelquotes" className='buttonactions'><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</Link>
                </div>
                <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right' }}>
                  <Link to="/Payments" className='buttonactions'>Process to Payment</Link>
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

export default Termsandcondition