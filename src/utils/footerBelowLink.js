import React from "react";

const FooterBelowLink = ({ label, url }) => (
  <a href={url}>
    <div>
      <p className="faq">{label}</p>
    </div>
  </a>
);

export default FooterBelowLink;
