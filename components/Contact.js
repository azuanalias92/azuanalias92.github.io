import React, { useState } from "react";
import userData from "@constants/data";
import emailjs from "@emailjs/browser";

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
      await emailjs.send("service_becw5eh", "template_nf5omfq", templateParams, "GEmMNV66HPiLeCQG3");
      setSubmitStatus({ success: true, message: "Email sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({ success: false, message: "Failed to send email. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <section>
        <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800 antialiased">
          <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left">Contact</h1>
        </div>
        <div className="bg-[#F1F1F1] dark:bg-gray-900 -mt-4">
          <div className="flex flex-row dark:bg-gray-900 pt-20 gap-8 mx-12">
            <div className="md:ml-4">
              <header className="">
                <h1 className="text-gray-50 font-semibold text-2xl">Get in touch, let's talk.</h1>
                <p className="font-light text-base text-gray-200 mt-2">Let's join forces and code with a touch of humor. I'm excited to stay in touch! You can find me below</p>
              </header>
              <form className="flex flex-wrap -m-2 mt-8" onSubmit={onSubmit}>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label for="name" className="leading-7 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-gray-100 rounded border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label for="email" className="leading-7 text-sm ">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-gray-100 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label for="message" className="leading-7 text-sm">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-gray-100 rounded border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`flex mx-auto text-white ${isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} border-0 py-2 px-8 focus:outline-none rounded text-lg transition-colors duration-300`}
                  >
                    {isSubmitting ? 'Sending...' : 'Email Me!'}
                  </button>
                  
                  {submitStatus && (
                    <div className={`mt-4 p-2 rounded text-center ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="hidden lg:block">
              <img
                className="object-cover rounded-3xl items-center justify-center "
                src="https://images.pexels.com/photos/4240444/pexels-photo-4240444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              ></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
