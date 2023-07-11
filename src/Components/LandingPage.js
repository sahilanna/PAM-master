import React, { Component } from 'react';
import './LandingPage.css';
import { IconName } from "react-icons/fa";
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
    
            <div className='at-item'>Build</div>
            <div className='at-item'>Better</div>
            <div className='at-item'>Together</div>
    
       
        

     
    
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
        
        <Footer className="Footer" />
      </div>
    );
  }
}

export default LandingPage;
