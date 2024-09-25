import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Topbar from './Topbar';
import logo from '../../Image/logo.png'
import { useEffect } from 'react';
import { useState } from 'react';
import mobile from '../../Image/mobile.svg';
import { Link, useNavigate } from "react-router-dom";
import { UseUserContext } from '../../UserContextAppProvider';
import { useSelector } from 'react-redux';
import Scrolltotop from './Scrolltotop';
import { API_URL } from '../..';
function Header() {
    const counter = useSelector((state) => state.ComapreListReducer);
    const { usertoken, Logout, UserData } = UseUserContext()
    useEffect(() => {

    }, [usertoken])
   
    console.log(UserData, "UserData")
    const Navigate = useNavigate();

    const handlelocalstorage = () => {
        console.log("Clearing localStorage...");
        localStorage.removeItem('MotoformData');
        localStorage.removeItem('travelsFormsData');
        localStorage.removeItem('HomeInsurance');
        localStorage.removeItem('Yacht');
        localStorage.removeItem('IndividualInsurance');
        localStorage.removeItem('OtherInsurance');
        localStorage.removeItem('selectedids');
        localStorage.removeItem('navlocation1');
        localStorage.removeItem('navlocation2');
        localStorage.removeItem('plandetails');
        localStorage.removeItem('selectedValues');
        localStorage.removeItem('selectedPlan');
        localStorage.removeItem('totaldueamount');
        localStorage.removeItem('currentPage');
    }


    return (
        <div>
            <Topbar />
            <Scrolltotop />
            <div className='nav-bg' >
                {['xl'].map((expand) => (
                    <Navbar key={expand} expand={expand} className="header">
                        <Container>
                            <Navbar.Brand href="/">
                                <Link to="/"><img className='nav_logo' src={logo} alt="logo" /></Link>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="end"
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        <img className='nav_logo' src={logo} alt="logo" />
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="flex-grow-1">
                                        <Nav.Link href='/' onClick={() => { if (window.confirm('All unsaved changes will be lost. Are you sure you want to leave? ')) handlelocalstorage() }}>Home</Nav.Link>
                                        {/* {counter.ComapreList.length > 0 ? (<Link  to="/Comparision" className='compares123' >Comparision({counter.ComapreList.length?counter.ComapreList.length:""})</Link>) : "" } */}

                                        <NavDropdown renderMenuOnMount={false}
                                            title="Personal Lines"
                                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        >
                                            <NavDropdown.Item href="/Chasisno">Motor</NavDropdown.Item>
                                            <NavDropdown.Item href="/Traveldetails">Travel</NavDropdown.Item>
                                            <NavDropdown.Item href="/Homeinsurance">Home</NavDropdown.Item>
                                            <NavDropdown.Item href="/Yachtdetails">Yacht/Pleasure Craft</NavDropdown.Item>
                                            <NavDropdown.Item href="/Individualinsurancepersonaldetails">Individual Medical</NavDropdown.Item>
                                            <NavDropdown.Item href="/Groupinsurance">Group Medical</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown renderMenuOnMount={false}
                                            title="Commercial Lines"
                                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        >
                                            <NavDropdown.Item href="/">Group Medical</NavDropdown.Item>
                                            <NavDropdown.Item href="/">Motor Fleet</NavDropdown.Item>
                                            <NavDropdown.Item href="/">Property All Risk</NavDropdown.Item>
                                            <NavDropdown.Item href="/">Workers Compensation</NavDropdown.Item>
                                            <NavDropdown.Item href="/">Life</NavDropdown.Item>
                                            <NavDropdown.Item href="/">Others</NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link href="/">Claims</Nav.Link>
                                        <Nav.Link href="/Helpsandtips">Help & Tips</Nav.Link>
                                        <Nav.Link href="/" className='transfer_abcd'><img src={mobile} />Transfer To Mobile</Nav.Link>
                                        {usertoken ? (
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <img
                                                        className='image_profile'
                                                        src={UserData && UserData.profile_image && UserData.profile_image[0]?.filename ? `${API_URL}/user_profile/${UserData.profile_image[0].filename}` : "https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png"}
                                                        alt="profile"
                                                    />

                                                    {UserData?.name}
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li><Link className="dropdown-item" to="/Mypolicies">Dashboard</Link></li>
                                                    <li><Link className="dropdown-item" to="/Mypolicies">My Policies</Link></li>
                                                    <li><Link className="dropdown-item" to="/Claimlist">My Claims</Link></li>
                                                    <li><Link className="dropdown-item" onClick={Logout}>Log Out</Link></li>
                                                </ul>
                                            </li>
                                        ) : (
                                            <Navbar.Brand href="#">
                                                <div className="cta-btn">
                                                    <Link style={{ color: 'white', textDecoration: 'none' }} to="/Login">
                                                        <button type="submit" className="btn-first btn-submit-fill logins">
                                                            Login
                                                        </button>
                                                    </Link>
                                                </div>
                                            </Navbar.Brand>
                                        )}
                                    </Nav>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                ))}
            </div>
        </div>
    )
}

export default Header
