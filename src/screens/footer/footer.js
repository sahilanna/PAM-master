import React from "react";
import {
  faGithub,
  faInstagram,
  faFigma,
  faJira,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import FooterLink from "../../utils/footerLink";
import FooterBelowLink from "../../utils/footerBelowLink";
import "./footer.css";

const Footer = () => {
  const businessLinks = [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/nineleaps/mycompany/",
      icon: faLinkedin,
    },
    { label: "GitHub", url: "https://github.com/", icon: faGithub },
  ];

  const socialMediaLinks = [
    {
      label: "Instagram",
      url: "https://instagram.com/nineleaps_tech?igshid=MGU3ZTQzNzY=",
      icon: faInstagram,
    },
  ];

  const toolsLinks = [
    { label: "Figma", url: "https://www.figma.com/", icon: faFigma },
    { label: "Jira", url: "https://www.atlassian.com/", icon: faJira },
  ];

  return (
    <div className="footer-background">
      <div className="footer-section-padding">
        <div className="footer-links">
          <FooterLink title="For Business" links={businessLinks} />
          <FooterLink title="Social Media" links={socialMediaLinks} />
          <FooterLink title="Tools" links={toolsLinks} />
        </div>

        <div className="footer-below">
          <div>
            <p>@{new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="footer-below-links">
            <FooterBelowLink label="FAQs" url="/faq" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
