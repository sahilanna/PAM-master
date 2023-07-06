import React, { Component } from 'react'
import './LandingPage.css'
import { IconName } from "react-icons/fa";
// import NoTransitionExample from './LandingPgCarousel';
import Carousel from 'react-bootstrap/Carousel';
import NavBar from './NavBar';
import Footer from'./Footer'



const Faq=()=>{
    return (
      <div className='sample'>
        <NavBar/>
        <div style={{paddingRight: '100px', textAlign: 'left'}} >
            <br/>
            <h3 style={{color:'white', alignItems:'left'}}>1) How to sign up for my account?</h3>
            <h4 style={{color:'white'}}>->You can login using Single-Sign-On with google. Add your google credentials and register.</h4>
            <h3 style={{color:'white', alignItems:'left'}}>2) What third party apps are present in the application?</h3>
            <h4 style={{color:'white'}}>->GitHub, Figma</h4>
            <h3 style={{color:'white'}}>3) If I am a PM, how do I grant access to a user for a specific project?</h3>
            <h4 style={{color:'white'}}>-> Login to your PM account, In the dashboard click on projects, List of projects is visible, click on Add User. Fill the details required and
            click on submit. The request will be sent to admin.</h4>
            <h3 style={{color:'white'}}>4) What is visible for the users?</h3>
            <h4 style={{color:'white'}}>-> Users can see the list of projects they are assgined to, list of repos and figma links associated with that project.</h4>
        </div>
        <br/>
        <br/><br/>
        <br/>
        <br/><br/>
      {/* <div className='at-container'>
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
      </Carousel.Item>
    </Carousel>
    <br>
    </br> */}
 <div>
   <Footer/>
   </div>
</div>
)
}
export default Faq
