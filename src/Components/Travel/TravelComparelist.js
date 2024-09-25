import React, { useEffect, useState } from 'react';
import finance from '../../Image/finance.svg';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import { API_URL } from '../..';

const TravelComparelist = ({nonMatchingPlans,onAddToCompare}) => {

    const [nonMatchingPlanslist, setNonMatchingPlanslist] = useState([nonMatchingPlans]);

    useEffect(() => {
        setNonMatchingPlanslist([...new Set(nonMatchingPlans)]);
        //console.log(nonMatchingPlanslist);
    }, [nonMatchingPlans]);

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

    // const [nonMatchingPlanslist, setNonMatchingPlanslist] = useState([]);
    // const [addcompare,setCompare]=useState([]);

    // useEffect(() => {
    //     setNonMatchingPlanslist(props.nonMatchingPlans);
    //     //console.log(nonMatchingPlanslist);
    // }, [props.nonMatchingPlans]);

   
    const addtocompare = (plan) => {
        onAddToCompare(plan);
    };


    // //console.log(addcompare);

    



    return (
        <div className='mt-4 compare_list'>
            <h3 className='mb-4 mt-2'>How about these ?</h3>
                <OwlCarousel
                     // Added a unique key to each OwlCarousel instance
                    margin={30}
                    autoplay={false}
                    loop={false}
                    nav={false}
                    dots={false}
                    items={2}
                    touchDrag={true}
                    lazyLoad={true}
                    responsive={state.responsive}
                >
            {nonMatchingPlans.map((item, index) => (
                    <div className='item' key={index}>
                        <div className='comparelistcarousel'>
                            {item.companies?.map((item1) =>
                                item1.company_logo.map((logo) => (
                                    <img
                                        key={logo.filename}
                                        src={`${API_URL}/uploads/${logo.filename}`}
                                        alt='logo'
                                    />
                                ))
                            )}
                            <p>{item.planData?.plan_name}</p>
                            <h4>AED {item.travelBasePremium}</h4>
                            <h5>
                                <strike>AED {item.travelBasePremium}</strike>
                            </h5>
                            <span>
                                <i className='fa fa-star' aria-hidden='true'></i>4.5
                            </span>
                            <button className='addtocomparebutton' onClick={()=>addtocompare(item)}>Add to compare</button>
                        </div>
                    </div>
                    ))}
                </OwlCarousel>
        </div>
    );
};

export default TravelComparelist;
