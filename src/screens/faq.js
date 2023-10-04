import React from 'react'
import './LandingPage.css'
import NavBar from './NavBar';
import Footer from'./Footer'



const Faq=()=>{
    return (
      <div className='sample' >
        <NavBar/>
        <div style={{paddingRight: '100px', textAlign: 'left'}} >
            <br/>
            <h3 style={{color:'white', alignItems:'left'}} data-testid="faq-ele">1 How to sign up for my account?</h3>
            <h4 style={{color:'white'}}>1.You can login using Single-Sign-On with google. Add your google credentials and register.</h4>
            <h3 style={{color:'white', alignItems:'left'}}>2 What third party apps are present in the application?</h3>
            <h4 style={{color:'white'}}>2.GitHub, Figma</h4>
            <h3 style={{color:'white'}}>3. If I am a PM, how do I grant access to a user for a specific project?</h3>
            <h4 style={{color:'white'}}>4. Login to your PM account, In the dashboard click on projects, List of projects is visible, click on Add User. Fill the details required and
            click on submit. The request will be sent to admin.</h4>
            <h3 style={{color:'white'}}>5. What is visible for the users?</h3>
            <h4 style={{color:'white'}}>6. Users can see the list of projects they are assgined to, list of repos and figma links associated with that project.</h4>
        </div>
        <br/>
        <br/><br/>
        <br/>
        <br/><br/>
     
 <div>
   <Footer/>
   </div>
</div>
)
}
export default Faq;
