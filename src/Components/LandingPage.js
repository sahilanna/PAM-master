import React, { Component } from 'react';
import './LandingPage.css';
import { IconName } from "react-icons/fa";
 import styled from 'styled-components';
// import NoTransitionExample from './LandingPgCarousel';
import Carousel from 'react-bootstrap/Carousel';
import NavBar from './NavBar';
import Footer from './Footer';
import photo1 from '../Assets/photo.jpg';
import photo2 from '../Assets/photo2.avif';
import photo3 from '../Assets/photo3.avif';

export class LandingPage extends Component {
  
  render() {

const StyledText = styled.p`
font-family: 'Montserrat';
color: #ffffff;
;

`;

    return (
      <div className='sample'>
        <NavBar />

        <div>
          <div className='at-container'>
          <div className='at-item'> <StyledText> Build-Better-Together</StyledText></div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br/>
        <div className="container-fluid text-center bg-grey">
          <div className="row">
            <div className="col-md-6 text-left">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "centre" }}>
                <h2 style={{ color: "white" }}><StyledText>Manage Projects With One Tool</StyledText></h2>
                <h3 style={{ color: "white" }}><StyledText>What we have created :</StyledText></h3>
                <h3 style={{ color: "white" }}><StyledText>
                  All-in-one project management tool to streamline projects</StyledText>
                </h3>
                <h3 style={{ color: "white" }}> <StyledText>Collaborate with your team, and track progress effectively.</StyledText></h3>
              
              </div>
            </div>
            <div className="col-md-6">

              <div className="image-carousel-container">
                <Carousel slide={true}>
                  <Carousel.Item>
                    <img
                      src={photo1}
                      alt="First slide"
                      style={{ maxWidth: "90%", height: "370px" }}
                    />
                  </Carousel.Item>

                  <Carousel.Item>
                    <img
                      src={photo2}
                      alt="Second slide"
                      style={{ maxWidth: "90%", height: "370px" }}
                    />
                  </Carousel.Item>

                  <Carousel.Item>
                    <img
                      src={photo3}
                      alt="Third slide"
                      style={{ maxWidth: "90%", height: "370px" }}
                    />
                  </Carousel.Item>
                </Carousel>
              </div>

            </div>
          </div>
          <br />
        </div>

        <Footer className="Footer" />
      </div>
    );
  }
}

export default LandingPage;


