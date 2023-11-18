import React from "react";
import Footer from "../footer/footer";
import NavBar from "../navbar/navbar.js";
import faqData from "../../utils/faqData";
import "./faq.css";

const Faq = () => {
  return (
    <div>
      <NavBar />
      <div className="faq-sample">
        {faqData.map((item, index) => (
          <div key={item.id}>
            <li>
              <h3 className="faq-question">{`${
                index + 1
              }. ${item.question}`}</h3>
              <h4 className="faq-answer">
                {item.answer}
              </h4>
            </li>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Faq;
