import { Dimmer, Loader } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import "./loadingPage.css";

const LoadingPage = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <div className="loader-container">
     <Dimmer active={loading} data-testid="dimmer"> 
        <Loader  size="small" data-testid="loader">Loading</Loader> 
      </Dimmer>
    </div>
  );
};

export default LoadingPage;
