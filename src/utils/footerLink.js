import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterLink = ({ title, links }) => (
  <div className="footer-links-div">
    <h4>{title}</h4>
    {links.map(({ url, label, icon }) => (
      <a key={label} href={url}>
        <p>
          <FontAwesomeIcon icon={icon} /> {label}
        </p>
      </a>
    ))}
  </div>
);

export default FooterLink;
