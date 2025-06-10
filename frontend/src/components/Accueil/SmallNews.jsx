/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export const SmallNews = ({
  property1,
  className,
  rectangle = "https://c.animaapp.com/mbfwxdap4GBqLX/img/rectangle-34-5.png",
  groupClassName,
  divClassName,
  text = "Monday 05, September 2021 | By Author",
  group = "https://c.animaapp.com/mbfwxdap4GBqLX/img/group-198-5.png",
  img = "https://c.animaapp.com/mbfwxdap4GBqLX/img/rectangle-34-4.png",
  group1 = "https://c.animaapp.com/mbfwxdap4GBqLX/img/group-198-4.png",
}) => {
  return (
    <div
      className={`w-[446px] h-[154px] rounded-[5px] bg-white relative ${property1 === "hovered" ? "shadow-[0px_0px_20px_#0000000d]" : ""} ${className}`}
    >
      <img
        className="w-40 left-0 top-0 h-[154px] absolute"
        alt="Rectangle"
        src={property1 === "hovered" ? rectangle : img}
      />

      <div
        className={`w-[278px] left-[180px] top-5 h-[114px] absolute ${groupClassName}`}
      >
        <p className="font-body-2 left-0 tracking-[var(--body-2-letter-spacing)] [font-style:var(--body-2-font-style)] text-[length:var(--body-2-font-size)] top-6 text-black font-[number:var(--body-2-font-weight)] leading-[var(--body-2-line-height)] absolute">
          This Article’s Title goes Here, <br />
          but not too long.
        </p>

        <p
          className={`font-small left-0 tracking-[var(--small-letter-spacing)] [font-style:var(--small-font-style)] text-[length:var(--small-font-size)] top-0 text-secondary font-[number:var(--small-font-weight)] leading-[var(--small-line-height)] whitespace-nowrap absolute ${divClassName}`}
        >
          {text}
        </p>

        <div className="w-[88px] left-0 top-[98px] h-4 absolute">
          <div className="w-[41px] left-0 top-0 h-4 absolute">
            <img
              className="w-[18px] -left-px top-0.5 h-3 absolute"
              alt="Group"
              src={property1 === "hovered" ? group : group1}
            />

            <div className="font-small left-[21px] tracking-[var(--small-letter-spacing)] [font-style:var(--small-font-style)] text-[length:var(--small-font-size)] top-0 text-black font-[number:var(--small-font-weight)] leading-[var(--small-line-height)] whitespace-nowrap absolute">
              68
            </div>
          </div>

          <div className="w-[41px] left-[49px] top-0 h-4 absolute">
            <img
              className="w-4 left-0 top-px h-3.5 absolute"
              alt="Vector"
              src="https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-11.svg"
            />

            <div className="font-small left-[21px] tracking-[var(--small-letter-spacing)] [font-style:var(--small-font-style)] text-[length:var(--small-font-size)] top-0 text-black font-[number:var(--small-font-weight)] leading-[var(--small-line-height)] whitespace-nowrap absolute">
              86
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
