import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faFigma, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import './Footer.css'
const Footer = () => {
  return (
    <div className="Footer">
      <div className="sb_footer_section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links_div">
            <h4>For Business</h4>
            <a href="https://www.linkedin.com/company/nineleaps/mycompany/">
              <p><FontAwesomeIcon icon={faLinkedin}/>LinkedIn</p>
            </a>
            <a href="https://github.com/">
            <p><FontAwesomeIcon icon={faGithub}/>LinkedIn</p>
              <p>GitHub</p>
            </a>   
            </div>
           <div className="sb_footer-links_div">
            <h4>Social media</h4>
            <a href="https://instagram.com/nineleaps_tech?igshid=MGU3ZTQzNzY=">
            <p>Instagram</p>
            <p><FontAwesomeIcon icon={faInstagram}/>LinkedIn</p>
            </a>
            </div>
            <div className="sb_footer-links_div">
            <h4>Social media</h4>
            <a href="https://www.figma.com/">
            <p><FontAwesomeIcon icon={faFigma}/>LinkedIn</p>
            <p>Figma</p>
            </a>
            <a href="https://www.atlassian.com/">
              <p>Jira</p>
            </a>
            
            
          </div>
        </div>
        <hr></hr>
        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>@{new Date().getFullYear()} All rigts reserved.</p>
          </div>
          <div className="sb_footer-below-links">
            <a href="/terms">
              
              <div>
                <p>FAQs</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;