import React, { useEffect, useState } from 'react'
import scroll from '../../Image/scroll.svg'

const Scrolltotop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 10) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div>
            {isVisible && (
                <img className="scroll-to-top-button" onClick={scrollToTop} src= {scroll} />
            )}
        </div>
    )
}

export default Scrolltotop
