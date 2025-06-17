/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import React from "react";

const Vitrine = ({ closeModal }) => {
  return (
    <motion.div
    initial={{ y: -200, opacity: 0 }}
    whileInView={{ 
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
     }}
    viewport={{ once: true, margin: "-100px" }}
      className="relative w-11/12 max-w-sm sm:max-w-md md:max-w-lg mx-auto my-8 shadow-2xl rounded-2xl bg-sky-50/50 overflow-hidden"
    >

      <div className="relative w-full h-64 sm:h-72 md:h-80">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://c.animaapp.com/mbfwxdap4GBqLX/img/blackdoctors-1.png)" }}
        />

        <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 transform -translate-x-1/2 -translate-y-1/2 z-0">
          <div className="w-full h-full bg-secondary rounded-full opacity-40" />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-3 flex">
          <div className="flex-grow bg-[#0f425d]" />
          <div className="flex-grow bg-[#0b9444]" />
          <div className="flex-grow bg-[#a5c2f7]" />
        </div>
      </div>
    </motion.div>
  );
};

export default Vitrine;