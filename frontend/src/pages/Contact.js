import React, { useState } from "react";
import emailjs from "emailjs-com";
import contactBanner from "../assets/contactBanner.jpg";
import "./contact.css";

function Contact() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_p69pagq",
        "template_1z8kj6b",
        e.target,
        "OQrhdtm00j_1B-fek"
      )
      .then(
        (result) => {
          console.log("Correo electrónico enviado correctamente", result.text);
          setIsFormSubmitted(true); 
        },
        (error) => {
          console.error("Error al enviar el correo electrónico", error.text);
        }
      );
  };

  return (
    <div className="contact">
      <div
        className="leftSide imageLeft"
        style={{ backgroundImage: `url(${contactBanner})` }}
      ></div>
      <div className="rightSide">
        <h1 className="contactTitleH4">Contáctanos</h1>

        {isFormSubmitted ? (
            <div className="contactSent">
                <h4 className="scale-up-center ">Muchas gracias, nos pondremos en contacto contigo lo antes posible.💪</h4>
            </div>
        ) : (
          <form id="contact-form" className="contactForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre Completo</label>
            <input name="name" placeholder="Tu nombre..." type="text" required />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              placeholder="Tu correo..."
              type="email"
              required
            />
            <label htmlFor="title">Asunto</label>
            <input
              name="title"
              placeholder="Tu asunto..."
              type="text"
              required
            />
            <label htmlFor="message">Mensaje</label>
            <textarea
              rows="6"
              placeholder="Tu mensaje..."
              name="message"
              required
            ></textarea>
            <button type="submit">Enviar mensaje</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;