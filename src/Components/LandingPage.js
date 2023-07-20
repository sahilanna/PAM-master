import React, { Component } from 'react';
import './LandingPage.css';
import Carousel from 'react-bootstrap/Carousel';
import NavBar from './NavBar';
import Footer from './Footer';
import photo1 from '../Assets/photo.jpg';
import photo2 from '../Assets/photo2.avif';
import photo3 from '../Assets/photo3.avif';

export class LandingPage extends Component {
  render() {
    return (
      <div className='sample'>
        <NavBar />

        <div>
          <div className='at-container'>
            <div className='at-item'>Build-Better-Together</div>
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
                <h2 style={{ color: "white" }}>Manage Projects With One Tool</h2>
                <h3 style={{ color: "white" }}>What we have created</h3>
                <h3 style={{ color: "white" }}>
                   All-in-one project management tool to streamline projects
                </h3>
                <h3 style={{ color: "white" }}> Collaborate with your team, and track progress effectively.</h3>
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


