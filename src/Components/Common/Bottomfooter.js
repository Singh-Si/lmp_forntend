import React from "react";
import { Link } from "react-router-dom";
const Bottomfooter = () => {
  return (
    <div>
      <ul className="menu menu--jdv-menu nav">
        <li className="first">
          <Link to="/Termsandcond">Terms and Conditions</Link>
        </li>
        <li>
          <Link to="/Privacypolicy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/Disclaimer">Disclaimers</Link>
        </li>
        <li>
          <Link to="/Complain">Complaints</Link>
        </li>
        <li className="last" style={{ borderRight: "0px" }}>
          <Link to="/Contactus">Contact Us</Link>
        </li>
        <li className="last" style={{ borderRight: "0px" }}>
          <a href="https://lmpfrontend.handsintechnology.in//login">Login</a>
        </li>
      </ul>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 bottom_footer">
            <p>
              Powered by Joie de Vivre International Insurance Brokerage LLC,
              Regulated by the UAE Insurance Authority{" "}
              <b> (Registration Number : 159)</b>
            </p>
          </div>
        </div>
        <div className="row" style={{ textAlign: "center" }}>
          <div className="col-lg-12">
            <p className="copyright12">© Company 2023 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottomfooter;
