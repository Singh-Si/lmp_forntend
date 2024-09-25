import React, { useState, useEffect } from "react";
import finance from "../../Image/finance.svg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { UseMotorContext } from "../../MultiStepContextApi";

const Homecomparelist = () => {
  const state = {
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

  const { HomeInsurance, setHomeInsurance } = UseMotorContext();
  const [compareData, setCompareData] = useState([]);
  const [fullCompareData, setFullCompareData] = useState([]);

  const [filteredCompareData, setFilteredCompareData] = useState([]);

  useEffect(() => {
    // Filter the objects from fullCompareData that are not present in compareData
    const filteredData = fullCompareData.filter(
      (fullDataItem) =>
        !compareData.some(
          (compareDataItem) => compareDataItem._id === fullDataItem._id
        )
    );

    setFilteredCompareData(filteredData);
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("HomeInsurance");
    const parse = JSON.parse(data);
    if (parse) {
      setHomeInsurance(parse);
      setCompareData(parse.compare_data);
      setFullCompareData(parse.full_compare_data);
    }
  }, []);

  //console.log(fullCompareData, "");

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);

  return <h1>jlo</h1>;
};

export default Homecomparelist;
