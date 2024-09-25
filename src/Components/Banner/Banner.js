import React, { useEffect, useState } from 'react'
import Banner1 from "../../Image/Banner/section2.png";
import Banner2 from "../../Image/Banner/section1.png";
import Motor from "../../Image/Insurance/motor.svg";
import Travel from "../../Image/Insurance/travel.svg";
import Yacht from "../../Image/Insurance/boat.svg";
import Home from "../../Image/Insurance/home.svg";
import Individual from "../../Image/Insurance/medical.svg";
import Group from "../../Image/Insurance/groups.svg";
import Terms from "../../Image/Insurance/Frame.svg";
import Other from "../../Image/Insurance/others.svg";
import Mobile from "../../Image/Insurance/mobile.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { API_URL } from '../..';
const state = {
  autoplay: false,
  loop: false,
  lazyLoad: true,
  responsive: {
    0: {
      items: 1,
    },
    450: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};

const state1 = {
  lazyLoad: true,
  responsive: {
    0: {
      items: 2,
    },
    450: {
      items: 2,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 6,
    },
  },
};

const state2 = {
  lazyLoad: true,
  responsive: {
    0: {
      items: 1,
    },
    450: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};
const Banner = () => {
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


  return (
    <div className="banner_all_one mb-5">

      {/* {cmsdata?.banner?.map((val, index) => {
        console.log("val", val)
        return (
        <div className="item" key={index}>
          <h1>{val.filename}</h1>
          <img src={`http://localhost:8000/Cmsuploads/banner/${val.filename}`} className="partners_abcd" />
        </div>
        )
      }
      )} */}

      {/* <OwlCarousel
        className="img_abcds desktop"
        margin={10}
        responsive={state.responsive}
      >
        { cmsdata ? cmsdata?.banner?.map((val, index) => {
        <div className="item" key={index}>
          <LazyLoadImage src={`http://localhost:8000/Cmsuploads/banner/${val.filename}`} className="partners_abcd" />
        </div>
        }) 
        
        :

        <>
         <div className="item">
          <LazyLoadImage src={Banner1} className="partners_abcd" />
        </div>
        <div className="item">
          <LazyLoadImage src={Banner2} className="partners_abcd" />
        </div>
          </>
         }
      </OwlCarousel> */}

      <OwlCarousel
        className="img_abcds desktop"
        margin={10}
        responsive={state.responsive}
      >
        {data  ? (
          data?.banner?.map((val, index) => (
            <div className="item" key={index}>
              <img
                src={`${API_URL}/Cmsuploads/banner/${val.filename}`}
                className="partners_abcd"
                alt={`Banner ${index}`}
              />
            </div>
          ))
        ) : (
          <>
            <div className="item">
              <LazyLoadImage src={Banner1} className="partners_abcd" alt="Default Banner 1" />
            </div>
            <div className="item">
              <LazyLoadImage src={Banner2} className="partners_abcd" alt="Default Banner 2" />
            </div>
          </>
        )}
      </OwlCarousel>
      <OwlCarousel
        style={{ display: "none" }}
        className="img_abcds mobile"
        margin={10}
        responsive={state2.responsive}
      >
        <div className="item">
          <LazyLoadImage src={Mobile} className="partners_abcd" />
        </div>
        <div className="item">
          <LazyLoadImage src={Mobile} className="partners_abcd" />
        </div>
        <div className="item">
          <LazyLoadImage src={Mobile} className="partners_abcd" />
        </div>
      </OwlCarousel>
      <div className="container banner_sliders">
        <h3>We Don't Only Compare, We Issue!</h3>
        <OwlCarousel margin={30} responsive={state1.responsive}>
          <div className="item">
            <Link to="/Chasisno">
              <div className="insuranc">
                <img src={Motor} alt="Motor Insurance" />
                <p>Motor</p>
              </div>
            </Link>
          </div>
          <div className="item">
            <Link to="/Traveldetails">
              <div className="insuranc">
                <img src={Travel} alt="Motor Insurance" />
                <p>Travel</p>
              </div>
            </Link>
          </div>
          <div className="item">
            <Link to="/Yachtdetails">
              <div className="insuranc">
                <img src={Yacht} alt="Motor Insurance" />
                <p>Yacht</p>
              </div>
            </Link>
          </div>
          <div className="item">
            <Link to="/Homeinsurance">
              <div className="insuranc">
                <img src={Home} alt="Motor Insurance" />
                <p>Home</p>
              </div>
            </Link>
          </div>
          <div className="item">
            <Link to="/Individualpolicy">
              <div className="insuranc">
                <img src={Individual} alt="Motor Insurance" />
                <p>Individual Medical</p>
              </div>
            </Link>
          </div>
          {/* <div className="item">
          <Link to="/Groupinsurance">
            <div className="insuranc">
              <img src={Group} alt="Motor Insurance" />
              <p>Group Medical</p>
            </div>
            </Link>
          </div> */}
          {/* <div className="item">
            <div className="insuranc">
              <img src={Terms} alt="Motor Insurance" />
              <p>Terms Life</p>
            </div>
          </div> */}
          <div className="item">
            <Link to="/Otherinsurance">
              <div className="insuranc">
                <img src={Other} alt="Motor Insurance" />
                <p>Other Insurance</p>
              </div>
            </Link>
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Banner;