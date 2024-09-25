import React, { useState, useEffect } from 'react';
import '../Loader.css';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader-container ${isLoading ? 'visible' : ''}`}>
      <div className="loader" />
    </div>
  );
};

export default Loader;
