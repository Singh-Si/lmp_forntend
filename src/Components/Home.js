import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from './Common/Header'
import Banner from './Banner/Banner'
import Offers from './Offers/Offers'
import Quoteslist from './Quotes/Quoteslist'
import Partners from './Ourpartners/Partners'
import Footer from './Common/Footer'
import Reachus from './Reachus/Reachus'
import Testimonials from './Testimonials/Testimonials'
import Knowmore from './Knowmore/Knowmore'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AddMotoformData } from '../redux/reducers/MotoformDataReducerSlice'
import { API_URL } from '..';
const Home = () => {
  const dispatch = useDispatch()
  const { token } = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    if (token) {
      dispatch(AddMotoformData({ name: "businessentity", value: token, }));
    } else {
      //console.log("no data")
    }
  }, [dispatch, token])

  // const getIDFromURL = () => {
  //   const searchParams = new URLSearchParams(useLocation().search);
  //   return searchParams.get("id");
  // };
  
  // const idFromURL = getIDFromURL();
  // if (idFromURL) {
  //   // localStorage.setItem("idFromURL", idFromURL);
  //   //console.log("idFromURL", idFromURL)
  // }

  useEffect(() => {
    getMainpageCmsdata()
    IamOnHomePage()
  }, [])

  const getMainpageCmsdata = async() => {
    try{
        const requestOptions = {
            method: 'GET',
        }
      await fetch(`${API_URL}/api/get_mainpage`, requestOptions)
        .then(response => response.json())
        .then((data) => {
          //console.log("data", data)
          if(data.status === 200){
            console.log("data", data.data)
            setData(data.data)
          } 
        })

    } catch (error) {
      console.log("error", error)
    }
  }

  const IamOnHomePage = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            lob: 'homepage'
        })
      }
      await fetch(`${API_URL}/api/updateViewingLob`, requestOptions)
        .then(response => response.json())
        .then((data) => {
          
        } )
    } catch (error) {
      console.log(error)
    }
  }
  



  return (
    <div>
      <Header />
      <Banner/>
      <Quoteslist />
      <Offers />
      <Partners />
      <Knowmore />
      <Testimonials />
      <Reachus />
      <Footer />
    </div>
  )
}

export default Home