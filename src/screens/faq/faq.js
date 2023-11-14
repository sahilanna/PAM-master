import React from "react";
import Footer from "../footer/footer";
import NavBar from "../navbar/navbar.js";
import "./faq.css";

const faqData = [
  {
    question: "How to sign up for my account?",
    answer:"You can login using Single-Sign-On with Google. Add your Google credentials and register.",
  },
  {
    question: "What third-party apps are present in the application?",
    answer: "GitHub, Figma",
  },
  {
    question:
      "If I am a PM, how do I grant access to a user for a specific project?",
    answer:
      "Login to your PM account, In the dashboard click on projects, List of projects is visible, click on Add User. Fill the details required and click on submit. The request will be sent to admin.",
  },
  {
    question: "What is visible for the users?",
    answer:
      "Users can see the list of projects they are assigned to, list of repos and Figma links associated with that project.",
  },
];

const Faq = () => {
  return (
    <div>
      <NavBar />
      <div className="faq-sample">
        <br />
        {faqData.map((item, index) => (
          <div key={item.id}>
            <li>
              <h3 className="faq-question">{`${index + 1}. ${
                item.question
              }`}</h3>
              <h4 className="faq-answer">{item.answer}</h4>
            </li>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Faq;
