/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export const LinkButton = ({
  className,
  linkButtonClassName,
  text = "Learn More",
}) => {
  return (
    <button
      className={`all-[unset] box-border inline-flex items-center justify-center gap-2.5 relative ${className}`}
    >
      <button
        className={`all-[unset] box-border relative w-fit mt-[-1.00px] font-body font-[number:var(--body-font-weight)] text-secondary text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] whitespace-nowrap [font-style:var(--body-font-style)] ${linkButtonClassName}`}
      >
        {text}
      </button>

      <img
        className="relative w-[12.83px] h-3 mr-[-1.00px]"
        alt="Vector"
        src="https://c.animaapp.com/mbfwxdap4GBqLX/img/vector.svg"
      />
    </button>
  );
};
