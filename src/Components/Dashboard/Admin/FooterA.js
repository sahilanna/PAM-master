import React from "react";
//import "/home/nineleaps/Downloads/vc-pr/vc-pr/src/css/Footer.css";
import './FooterA.css';
const FooterA = () => {
  return (
    <div className="FooterContainer">
      <div className="Footer sb_footer_section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links_div">
            <h4>For Business</h4>
            <a href="https://www.linkedin.com/company/nineleaps/mycompany/">
              <p>LinkedIn</p>
            </a>
            <a href="https://github.com/">
              <p>GitHub</p>
            </a>   
            </div>
           <div className="sb_footer-links_div">
            <h4>Social media</h4>
            <a href="https://instagram.com/nineleaps_tech?igshid=MGU3ZTQzNzY=">
            <p>Instagram</p>
            </a>
            </div>
            <div className="sb_footer-links_div">
            <h4>Social media</h4>
            <a href="https://www.figma.com/">
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
                <p>Terms and conditions</p>
              </div>
            </a>
            <a href="/p">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="/s">
              <div>
                <p>security</p>
              </div>
            </a>
            <a href="/c">
              <div>
                <p>Cookie</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FooterA;