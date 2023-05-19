import React, { Component } from 'react'
import './LandingPage.css'
import { IconName } from "react-icons/fa";
// import NoTransitionExample from './LandingPgCarousel';
import Carousel from 'react-bootstrap/Carousel';
import NavBar from './NavBar';
<<<<<<< HEAD
import Footer from'./Dashboard/Admin/Footer'
=======
import Footer from'./Footer'
>>>>>>> 503d1b91365c0db646b5ec0a5fb9a7b627a6faa6
import photo1 from '../Assets/photo1.jpeg'
import photo2 from '../Assets/photo2.avif'
import photo3 from '../Assets/photo3.avif'


export class LandingPage extends Component {
  render() {
    return (
      <div className='sample'>
        <NavBar/>
      <div>
      <div className='at-container'>
        <div className='at-item'>Build-Better-Together</div>
      </div>
      <h4 className='at-item1' style={{color:"white"}}>With this platform we can build a solution to manage and access across the projects with various tools. </h4></div>
      <br/>
      <br/>
      <br/>
    <div className="container-fluid text-center bg-grey">
    <h2 style={{color:"white"}}>Manage Projects With One Tool</h2>
    <h4 style={{color:"white"}}>What we have created</h4>
    <br/>

    <Carousel slide={true}>
      <Carousel.Item>
        <img  src={photo1}
              alt="First slide"
              max-width="100%"
              height="350"/>
      </Carousel.Item>

      <Carousel.Item>
        <img  src={photo2}
              alt="Second slide"
              max-width="100%"
              height="350"/>
      </Carousel.Item>

      <Carousel.Item>
        <img  src={photo3}
              alt="Third slide"
              max-width="100%"
              height="350"/>
      {/* <Carousel.Caption>
          <div>
          <h4 style={{color:"black"}} className='carousel-caption'>Boost your team’s alignment, efficiency, and productivity</h4><br/>
          </div>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>

    <br>
    </br>
  </div>
  <Footer/>
</div>

)
}
}

export default LandingPage
