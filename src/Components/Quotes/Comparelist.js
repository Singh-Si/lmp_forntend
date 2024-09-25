/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import finance from "../../Image/finance.svg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { useDispatch, useSelector } from "react-redux";
import { AddToComapre } from "../../redux/reducers/MotoformDataReducerSlice";
import { useLocation } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
const Comparelist = ({AddList,filteredData,Loading}) => {
  const statecarousel = {
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
        items: 3,
      },
      1024: {
        items: 6,
      },
    },
  };
  return (
    <div className="mt-4 compare_list">
      <h3 className="mb-4 mt-2">How about these ?</h3>
       {Loading ?<>Loading</>:  <OwlCarousel
        margin={30}
        nav={false}
        dots={false}
        items={2}
        touchDrag={true}
        lazyLoad={true}
        responsive={statecarousel.responsive}
      >
        {filteredData && filteredData.length > 0 ? (
          <>
            {filteredData.map((c) => {
              const imagesrc =
                API_URL+"/" +
                // API_URL+"/"
                c?.companies?.company_logo[0]?.destination +
                "/" +
                c?.companies?.company_logo[0]?.filename;
              return (
                <div className="item">
                  <div className="comparelistcarousel">
                    <img src={imagesrc} />
                    <p> {c?.companies?.company_name} </p>
                    <h4>{c?.finallBasePremium}</h4>
                    <button
                      className="addtocomparebutton"
                      onClick={() => AddList(c)}
                    >
                      Add to compare
                    </button>
                    <h5>
                      <strike>{c?.finallBasePremium}!</strike>
                    </h5>
                    <span>
                      <i className="fa fa-star" aria-hidden="true"></i>4.5
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </OwlCarousel>}
    
    </div>
  );
};

export default Comparelist;
