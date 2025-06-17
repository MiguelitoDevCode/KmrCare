/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";

export const FooterWrapper = ({
  className,
  text = "© 2025 KmrCare name All Rights Reserved by MIGUELITO DevCode & Team 91",
}) => {
  return (
    <div className={`bg-[#0b9444] text-white p-8 md:p-12 ${className}`}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Section Logo et Description */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-4xl font-yeseva-one text-[#0f425d] mb-2">
            KMRCARE
          </h2>
          <p className="font-body-2 text-sm">
            Votre santé, simplifiée à Douala
          </p>
        </div>

        {/* Section Liens Utiles */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold font-work-sans mb-4">
            Liens Utiles
          </h3>
          <ul className="space-y-2 font-body text-sm">
            <li><a href="#" className="hover:underline">A Propos</a></li>
            <li><a href="#" className="hover:underline">Dispensaires</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Section Contact Us */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold font-work-sans mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 font-body text-sm">
            <li>Call: (237) 657-755-890</li>
            <li>Email: www.kmrcare.com</li>
            <li>Address: 0123 Douala Akwa</li>
            <li>Support technique</li>
          </ul>
        </div>

        {/* Section Newsletter */}
        <div>
          <h3 className="text-lg font-semibold font-work-sans mb-4">
            Newsletter
          </h3>
          <div className="flex">
            <input
              id="newsletter-email"
              name="newsletter-email"
              type="email"
              className="outline-none p-3 w-full bg-[#fcfefe] text-primary font-semibold rounded-l-md text-sm placeholder-gray-500"
              placeholder="Enter your Email Address"
              autoComplete="email"
              required
            />
            <button
              type="button"
              className="bg-[#fcfefe] p-3 rounded-r-md hover:scale-110 transition-all"
            >
              <img
                className="w-6 h-6"
                alt="Submit"
                src="/assets/send.svg"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Séparateur et Copyright */}
      <div className="container mx-auto mt-8 pt-8 border-t border-white/50 flex flex-col md:flex-row justify-between items-center">
        <p className="font-work-sans text-base text-center md:text-left mb-4 md:mb-0">
          {text}
        </p>
        <div className="flex space-x-4">
          <motion.a
            href="#"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <img
              className="w-6 h-6"
              alt="Facebook"
              src="/assets/facebook.svg"
            />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <img
              className="w-6 h-6"
              alt="WhatsApp"
              src="/assets/whatsApp.svg"
            />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <img
              className="w-6 h-6"
              alt="Instagram"
              src="/assets/instagram.svg"
            />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <img
              className="w-6 h-6"
              alt="LinkedIn"
              src="/assets/linkedIn.svg"
            />
          </motion.a>
        </div>
      </div>
    </div>
  );
};