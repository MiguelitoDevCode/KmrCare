/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { SmallNews } from "./SmallNews";

export const NewsSectionWrapper = ({
  className,
  groupClassName,
  divClassName,
  text = "News",
  betterInformationClassName,
  text1 = "BETTER INFORMATION, BETTER HEALTH",
  smallNewsDivClassName,
  smallNewsGroupClassName,
  smallNewsText = "Monday 05, September 2021 | By Author",
  smallNewsGroup = "https://c.animaapp.com/mbfwxdap4GBqLX/img/group-198.png",
  smallNewsRectangle = "https://c.animaapp.com/mbfwxdap4GBqLX/img/rectangle-34.png",
  smallNewsImg = "https://c.animaapp.com/mbfwxdap4GBqLX/img/rectangle-34-1.png",
  smallNewsDivClassNameOverride,
  smallNewsGroupClassNameOverride,
  smallNewsText1 = "Monday 05, September 2021 | By Author",
  smallNewsGroup1 = "https://c.animaapp.com/mbfwxdap4GBqLX/img/group-198-1.png",
  smallNewsRectangle1 = "https://c.animaapp.com/mbfwxdap4GBqLX/img/rectangle-34-2.png",
  smallNewsDivClassName1,
  smallNewsGroupClassName1,
  smallNewsText2 = "Monday 05, September 2021 | By Author",
  smallNewsGroup2 = "https://c.animaapp.com/mbfwxdap4GBqLX/img/group-198-2.png",
  smallNewsRectangle2 = "https://c.animaapp.com/mbfwxdap4GBqLX/img/rectangle-34-3.png",
  smallNewsDivClassName2,
  smallNewsGroupClassName2,
  smallNewsText3 = "Monday 05, September 2021 | By Author",
  smallNewsGroup3 = "https://c.animaapp.com/mbfwxdap4GBqLX/img/group-198-3.png",
  rectangleClassName,
  rectangleClassNameOverride,
  divClassNameOverride,
}) => {
  return (
    <div className={`relative w-[1115px] h-[636px] bg-[#fafdfe] ${className}`}>
      <div
        className={`absolute w-[456px] h-[66px] top-16 left-[457px] ${groupClassName}`}
      >
        <div
          className={`absolute top-[29px] left-[183px] font-display-2 font-[number:var(--display-2-font-weight)] text-primary text-[length:var(--display-2-font-size)] text-center tracking-[var(--display-2-letter-spacing)] leading-[var(--display-2-line-height)] whitespace-nowrap [font-style:var(--display-2-font-style)] ${divClassName}`}
        >
          {text}
        </div>

        <div
          className={`absolute top-0 left-0 font-caption font-[number:var(--caption-font-weight)] text-secondary text-[length:var(--caption-font-size)] text-center tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] whitespace-nowrap [font-style:var(--caption-font-style)] ${betterInformationClassName}`}
        >
          {text1}
        </div>
      </div>

      <div className="absolute w-[992px] h-[328px] top-[194px] left-[57px]">
        <SmallNews
          className="!absolute !left-0 !top-0"
          divClassName={smallNewsDivClassName}
          group={smallNewsGroup}
          groupClassName={smallNewsGroupClassName}
          property1="hovered"
          rectangle={smallNewsRectangle}
          text={smallNewsText}
        />
        <SmallNews
          className="!absolute !left-0 !top-[174px]"
          divClassName={smallNewsDivClassNameOverride}
          group1={smallNewsGroup1}
          groupClassName={smallNewsGroupClassNameOverride}
          img={smallNewsImg}
          property1="default"
          text={smallNewsText1}
        />
        <SmallNews
          className="!absolute !left-[506px] !top-0"
          divClassName={smallNewsDivClassName1}
          group1={smallNewsGroup2}
          groupClassName={smallNewsGroupClassName1}
          img={smallNewsRectangle1}
          property1="default"
          text={smallNewsText2}
        />
        <SmallNews
          className="!absolute !left-[506px] !top-[174px]"
          divClassName={smallNewsDivClassName2}
          group1={smallNewsGroup3}
          groupClassName={smallNewsGroupClassName2}
          img={smallNewsRectangle2}
          property1="default"
          text={smallNewsText3}
        />
      </div>

      <div className="absolute w-[74px] h-[18px] top-[554px] left-[516px]">
        <div
          className={`absolute w-[18px] h-[18px] top-0 left-0 bg-accent rounded-[50px] ${rectangleClassName}`}
        />

        <div
          className={`absolute w-[18px] h-[18px] top-0 left-7 bg-primary rounded-[50px] ${rectangleClassNameOverride}`}
        />

        <div
          className={`absolute w-[18px] h-[18px] top-0 left-14 bg-accent rounded-[50px] ${divClassNameOverride}`}
        />
      </div>
    </div>
  );
};
