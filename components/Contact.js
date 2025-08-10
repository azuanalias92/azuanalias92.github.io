import React from "react";
import userData from "@constants/data";
import emailjs from "@emailjs/browser";

export default function Contact() {
  async function onSubmit(event) {
    event.preventDefault();
    const templateParams = {
      from_name: event.target.name.value,
      to_name: "Azuan Alias",
      from_email: event.target.email.value,
      message: event.target.message.value,
    };

    emailjs.send("service_becw5eh", "template_nf5omfq", templateParams, "GEmMNV66HPiLeCQG3").then(
      (response) => {
        alert("Email Sent!");
        document.getElementById("email").value = "";
        document.getElementById("name").value = "";
        document.getElementById("message").value = "";
      },
      (err) => {
        alert("Email Failed!");
      }
    );
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
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
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
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
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
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button type="submit" className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Email Me!
                  </button>
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
