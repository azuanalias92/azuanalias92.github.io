import React, { useState } from "react";
import userData from "@constants/data";
import emailjs from "@emailjs/browser";
import SurveyMap from "./SurveyMap";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  async function onSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const templateParams = {
      from_name: formData.name,
      to_name: "Azuan Alias",
      from_email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send("service_becw5eh", "template_nf5omfq", templateParams, { publicKey: "GEmMNV66HPiLeCQG3" });
      setSubmitStatus({ success: true, message: "Email sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({ success: false, message: "Failed to send email. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <section className="contact">
      <SurveyMap seed={31} scrim="left" around=".entry" label={userData.address.replace(/\.$/, "")} />
      <div className="container contact__grid">
        <header>
          <h1>Contact</h1>
          <p className="lead contact__lead">Get in touch, let&rsquo;s talk.</p>
          <p className="contact__line">Let&rsquo;s join forces and code with a touch of humor. I&rsquo;m excited to stay in touch! You can find me below</p>
          <dl className="facts">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${userData.email}`} className="text-link">
                  {userData.email}
                </a>
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{userData.address.replace(/\.$/, "")}</dd>
            </div>
          </dl>
        </header>

        <form className="entry notebook" onSubmit={onSubmit}>
          <div className="entry__head">
            <span className="entry__kind">Email</span>
            <span className="entry__time">to Azuan Alias</span>
          </div>
          <div className="entry__cells">
            <div className="cell" data-invalid={errors.name ? "" : undefined}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={errors.name ? "true" : undefined}
                aria-describedby="name-error"
              />
              <p className="cell__error" id="name-error">{errors.name}</p>
            </div>
            <div className="cell" data-invalid={errors.email ? "" : undefined}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby="email-error"
              />
              <p className="cell__error" id="email-error">{errors.email}</p>
            </div>
            <div className="cell cell--wide" data-invalid={errors.message ? "" : undefined}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={errors.message ? "true" : undefined}
                aria-describedby="message-error"
              ></textarea>
              <p className="cell__error" id="message-error">{errors.message}</p>
            </div>
          </div>
          <div className="entry__foot">
            <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting ? "true" : undefined} className="btn btn--primary">
              {isSubmitting ? "Sending…" : "Email Me!"}
            </button>

            <p className={`status ${submitStatus ? (submitStatus.success ? "status--ok" : "status--fail") : ""}`} role="status" aria-live="polite" hidden={!submitStatus}>
              {submitStatus && submitStatus.message}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
