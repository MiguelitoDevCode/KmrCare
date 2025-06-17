/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";

export const Button = ({ className, text = "Button" }) => {
  return (
    <motion.button
    whileHover={{ y: -5 }}
    whileTap={{ scale: 1.05 }}
    className={`all-[unset] box-border cursor-pointer inline-flex items-start gap-2.5 px-[35px] py-[13px] relative bg-accent rounded-[50px] ${className}`}
    >
      <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins',sans-serif] font-medium text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
        {text}
      </div>
    </motion.button>
  );
};