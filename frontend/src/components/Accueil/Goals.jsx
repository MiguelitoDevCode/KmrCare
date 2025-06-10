/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export const Goals = ({
  className,
  divClassName,
  text = "Book an Appointment",
  elementCalendarClassName,
  hasElementTeam = true,
  hasElementCash = true,
  hasDiv = true,
  hasElementCalendar = true,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center gap-14 px-5 py-[25px] relative bg-primary rounded-[5px] ${className}`}
    >
      {hasDiv && (
        <div
          className={`relative w-fit font-body font-[number:var(--body-font-weight)] text-white text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] whitespace-nowrap [font-style:var(--body-font-style)] ${divClassName}`}
        >
          {text}
        </div>
      )}

      {hasElementCalendar && (
        <img
          className={`relative w-[52px] h-[52px] mt-[-1.00px] mb-[-1.00px] ${elementCalendarClassName}`}
          alt="Element calendar"
          src="https://c.animaapp.com/mbfwxdap4GBqLX/img/39--calendar-1.png"
        />
      )}

      {hasElementTeam && (
        <img
          className="relative w-[52px] h-[44.24px]"
          alt="Element team"
          src="https://c.animaapp.com/mbfwxdap4GBqLX/img/27--team.png"
        />
      )}

      {hasElementCash && (
        <img
          className="relative w-[52px] h-[38.46px] mr-[-1.00px]"
          alt="Element cash"
          src="https://c.animaapp.com/mbfwxdap4GBqLX/img/15--cash.png"
        />
      )}
    </div>
  );
};
