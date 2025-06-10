/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export const Button = ({ className, text = "Button" }) => {
  return (
    <button
      className={`all-[unset] box-border  hover:scale-105 cursor-pointer transition-all inline-flex items-start gap-2.5 px-[35px] py-[13px] relative bg-accent rounded-[50px] ${className}`}
    >
      <div className="relative w-fit mt-[-1.00px] [font-family:'Work_Sans',Helvetica] font-medium text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
        {text}
      </div>
    </button>
  );
};