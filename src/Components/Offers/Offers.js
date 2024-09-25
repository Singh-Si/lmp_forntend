import React, { useEffect, useState } from 'react'
import Offersimg from '../../Image/discount.png'
import { API_URL } from '../..';
const Offers = () => {

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
        <div className='offers'>
            <div className='container'>
                <div className='row'>
                    {/* <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                        <img data-aos="zoom-in-up" data-aos-duration="2000" src="https://img.freepik.com/free-vector/home-insurance-template-poster_53876-119128.jpg?size=626&ext=jpg&ga=GA1.2.351002229.1692250869&semt=ais" />
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                        <img data-aos="zoom-in-up" data-aos-duration="2000" src="https://img.freepik.com/free-vector/travel-insurance-template-poster_53876-119130.jpg?size=626&ext=jpg&ga=GA1.2.351002229.1692250869&semt=sph" />
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                        <img data-aos="zoom-in-up" data-aos-duration="2000" src="https://img.freepik.com/free-vector/auto-insurance-template-poster_53876-119129.jpg?size=626&ext=jpg&ga=GA1.2.351002229.1692250869&semt=ais" />
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
                        <img data-aos="zoom-in-up" data-aos-duration="2000" src="https://img.freepik.com/free-vector/health-insurance-template-vector-poster_53876-111249.jpg?size=626&ext=jpg&ga=GA1.2.351002229.1692250869&semt=ais" />
                    </div> */}
                    {data?.insurance_detail_banner?.map((val, index) => (
                        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={index}>
                            <img
                                data-aos="zoom-in-up"
                                data-aos-duration="2000"
                                src={`${API_URL}/Cmsuploads/insurancedetail/${val.filename}`}
                                alt={`Insurance Detail ${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Offers