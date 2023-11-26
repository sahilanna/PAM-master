import React from "react";
import Carousel from "react-bootstrap/Carousel";
import LandingPageDescription from "../../utils/landingPageDescription";
import NavBar from "../navbar/navbar";
import Footer from "../footer/footer";
import planning from "../../assets/images/planning.jpg";
import strategy from "../../assets/images/strategy.avif";
import meeting from "../../assets/images/meeting.avif";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page-background">
      <NavBar />

      <div className="at-container">
        <div className="at-item">
          <p> Build-Better-Together</p>
        </div>
      </div>

      <div className="container-fluid text-center bg-grey">
        <div className="row">
          <div className="col-md-6 text-left">
            <LandingPageDescription />
          </div>
          <div className="col-md-6">
            <div>
              <Carousel slide={true}>
                <Carousel.Item>
                  <img className="carousal-image" src={planning} alt="First slide" />
                </Carousel.Item>

                <Carousel.Item>
                  <img className="carousal-image" src={strategy} alt="Second slide" />
                </Carousel.Item>

                <Carousel.Item>
                  <img className="carousal-image" src={meeting} alt="Third slide" />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
