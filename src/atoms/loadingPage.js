import { Dimmer, Loader } from "semantic-ui-react";
import React from "react";
import "./loadingPage.css";

const LoadingPage = () => {
  
  return (
    <div className="loader-container">
     <Dimmer active data-testid="dimmer"> 
        <Loader  size="small" data-testid="loader">Loading</Loader> 
      </Dimmer>
    </div>
  );
};

export default LoadingPage;










