import React from "react";
//import "/home/nineleaps/Downloads/vc-pr/vc-pr/src/css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faFigma, faJira, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import './Footer.css'
const Footer = () => {
  return (
    <div className="Footer">
    <div className="sb_footer_section_padding">
      <div className="sb_footer-links">
        <div className="sb_footer-links_div">
          <h4>For Business</h4>
          <a href="https://www.linkedin.com/company/nineleaps/mycompany/">
            <p><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</p>
          </a>
          <a href="https://github.com/">
            <p><FontAwesomeIcon icon={faGithub} /> GitHub</p>
          </a>
          </div>
         <div className="sb_footer-links_div">
          <h4>Social media</h4>
          <a href="https://instagram.com/nineleaps_tech?igshid=MGU3ZTQzNzY=">
          <p><FontAwesomeIcon icon={faInstagram} /> Instagram</p>
          </a>
          </div>
          <div className="sb_footer-links_div">
          <h4>Tools</h4>
          <a href="https://www.figma.com/">
          <p> <FontAwesomeIcon icon={faFigma} /> Figma</p>
          </a>
          <a href="https://www.atlassian.com/">
            <p><FontAwesomeIcon icon={faJira} /> Jira</p>
          </a>
        </div>
      </div>
      <hr></hr>
      <div className="sb_footer-below">
        <div className="sb_footer-copyright">
          <p>@{new Date().getFullYear()} All rigts reserved.</p>
        </div>
        <div className="sb_footer-below-links">
          <a href="/faq">
            <div>
              <p style={{marginRight:'35px'}}> FAQs</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  );
};
export default Footer;