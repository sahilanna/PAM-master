import React from "react";
import Carousel from "react-bootstrap/Carousel";
import LandingPageDescription from "./landingPageDescription";
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

      <div>
        <div className="at-container">
          <div className="at-item">
            <p> Build-Better-Together</p>
          </div>
        </div>
      </div>

      <div className="container-fluid text-center bg-grey">
        <div className="row">
          <div className="col-md-6 text-left">
            <LandingPageDescription />
          </div>
          <div className="col-md-6">
            <div className="image-carousel-container">
              <Carousel slide={true}>
                <Carousel.Item>
                  <img
                    src={planning}
                    alt="First slide"
                    style={{
                      maxWidth: "90%",
                      height: "370px",
                    }}
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    src={strategy}
                    alt="Second slide"
                    style={{
                      maxWidth: "90%",
                      height: "370px",
                    }}
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    src={meeting}
                    alt="Third slide"
                    style={{
                      maxWidth: "90%",
                      height: "370px",
                    }}
                  />
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
