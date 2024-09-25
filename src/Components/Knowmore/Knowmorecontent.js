import React,{useState,useEffect} from 'react'
import { API_URL } from '../..'
import Header from '../Common/Header'
import Footer from '../Common/Footer'

const Knowmorecontent = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    getKnowmoredata()
  }, [])

  const getKnowmoredata = async () => {
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
    <div>
      <Header />
      <div className='container knowmorecontent' data-aos="zoom-in-up" data-aos-duration="2000">
        <div className='row'>
          <div className='col-md-12'>
            {data && (
              <p dangerouslySetInnerHTML={{ __html: data?.know_more_content }} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Knowmorecontent