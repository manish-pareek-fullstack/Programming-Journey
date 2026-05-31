import React from 'react'
import "./Contact.css";
const Contact = ({obj}) => {
  return (
    <section className="contact">
      <div className="contact-container">
        <h1>Contact Me</h1>

        <p>{obj.Contact.Contactinfo}</p>
        <div className="contact-info">
          <div className="contact-card">
            <h3>Email</h3>
            <p>
              <a target="blank" href="mailto:manishpareek.3334@gmail.com">
                {obj.Contact.email}
              </a>
            </p>
          </div>

          <div className="contact-card">
            <h3>LinkedIn</h3>
            <p>
              <a
                target="blank"
                href="https://www.linkedin.com/in/manish-pareek-fullstack"
              >
                {obj.Contact.linkdin}
              </a>
            </p>
          </div>

          <div className="contact-card">
            <h3>GitHub</h3>
            <p>
              <a
                target="blank"
                href="https://github.com/manish-pareek-fullstack"
              >
                {obj.Contact.GitHub}
              </a>
            </p>
          </div>

          <div className="contact-card">
            <h3>LeetCode</h3>
            <p>
              <a target="blank" href="https://leetcode.com/u/ManishPareek">
                {obj.Contact.leedcode}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact
