import React, { Component } from 'react'
import './LandingPage.css'
import { IconName } from "react-icons/fa";
import NoTransitionExample from './LandingPgCarousel';
import Carousel from 'react-bootstrap/Carousel';



export class LandingPage extends Component {
  render() {
    return (
      <div className='sample'>
      <div>
      <div className='at-container'>
        <div className='at-item'>Build-Better-Together</div>
      </div>
      <br/>
      <h5 className='at-item1' style={{color:"white"}}>With this platform we can build a solution to manage and access across the projects with various tools. </h5></div>
<br/>
<br/>
<div className="container-fluid text-center bg-grey">
<h2 style={{color:"white"}}>Manage Projects With One Tool</h2><br/>
<h4 style={{color:"white"}}>What we have created</h4>
<br/>

     <Carousel slide={false}>
      <Carousel.Item>
        <img
          // className="d-block w-100"
          src="download.png"
          alt="First slide"
          max-width="100%"
          height="350"
        />
        <Carousel.Caption>
          <div>
          <h4 style={{color:"black"}} className='carousel-caption'>Boost your team’s alignment, efficiency, and productivity</h4><br/>
          </div>
          {/* <p><strong> <h3>Boost your team’s alignment, efficiency, and productivity </h3></strong></p>
          <p><strong><h3>by customizing any workflow to fit your needs.</h3></strong></p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          // className="d-block w-100"
          src="images.jpeg"
          alt="Second slide"
          max-width="900%"
          height="400"
        />

        <Carousel.Caption >
          <h3>Second slide label</h3>
          <p className='carousel-caption'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="images.png"
          alt="First slide"
          max-width="100%"
          height="350"
        />
        <Carousel.Caption>
          <div>
          <h4 style={{color:"black"}} className='carousel-caption'>Boost your team’s alignment, efficiency, and productivity</h4><br/>
          </div>
          {/* <p><strong> <h3>Boost your team’s alignment, efficiency, and productivity </h3></strong></p>
          <p><strong><h3>by customizing any workflow to fit your needs.</h3></strong></p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <br>
    </br>
  </div>
</div>

)
}
}

export default LandingPage