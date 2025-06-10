/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "../../components/Accueil/Button";

export const Apparence = ({
  property1,
  className,
  physicianTrendsClassName,
  physicianTrendsClassNameOverride,
}) => {
  return (
    <div className={`w-full h-[639px] ${className}`}>
      <div
        className={`${property1 === "variant-2" ? "top-1" : ""} ${property1 === "variant-2" ? "h-[639px]" : "h-[724px]"} ${property1 === "variant-2" ? "relative" : ""}`}
      >
        <div
          className={`w-full relative ${property1 === "variant-2" ? "h-[639px]" : "h-[724px]"}`}
        >
          <div
            className={`w-full left-0 rotate-180 h-[639px] bg-[#02ddcd] absolute ${property1 === "default" ? "top-1" : "top-0"}`}
          />

          {property1 === "default" && (
            <img
              className={`h-[715px] top-1 absolute w-full left-0 ${physicianTrendsClassName}`}
              alt="Physician trends"
              src="https://c.animaapp.com/mbfwxdap4GBqLX/img/physician-trends-2021-merritt-hawkins-1-1.png"
            />
          )}

          <div
            className={`[background:linear-gradient(259deg,rgba(229,228,232,1)_9%,rgba(235,234,239,0)_100%)] w-full left-0 rotate-180 h-[639px] absolute ${property1 === "default" ? "top-1" : "top-0"}`}
          />

          <div
            className={`w-full left-0 h-[639px] overflow-hidden absolute ${property1 === "default" ? "top-1" : "top-0"}`}
          >
            {property1 === "variant-2" && (
              <img
                className="absolute w-full h-[738px] top-[-12929px] left-[11112px] object-cover"
                alt="Docteur JUNIOR"
                src="https://c.animaapp.com/mbfwxdap4GBqLX/img/docteur-junior.png"
              />
            )}

            <div className="w-[1542px] left-[347px] top-[152px] h-[734px] absolute">
              <div
                className={`w-[734px] left-[808px] opacity-50 top-0 h-[734px] rounded-[367px] absolute ${property1 === "default" ? "bg-[#0b9444]" : "bg-[#0f425d]"}`}
              />

              <div className="w-[843px] left-0 top-20 h-[269px] absolute">
                <p className="[font-family:'Yeseva_One',Helvetica] w-[839px] left-0 tracking-[0] text-[38px] top-[38px] text-[#0f425d] font-normal leading-[normal] absolute">
                  Votre santé, simplifiée. Prenez rendez-vous dans les
                  dispensaires de Douala en un instant.
                </p>

                <Button
                  className="absolute left-0.5 bg-[#0b9444] !top-56"
                  text="En Savoir Plus"
                />
                <div className="[font-family:'Work_Sans',Helvetica] w-[415px] left-0.5 tracking-[2.88px] text-lg top-0 text-[#0b9444] font-bold leading-[normal] absolute">
                  UN RENDEZ-VOUS, UNE SOLUTION
                </div>
              </div>
            </div>

            <div
              className={`w-[734px] left-[-387px] opacity-30 h-[734px] rounded-[367px] bg-[#0b9444] absolute ${property1 === "variant-2" ? "top-[-369px]" : "top-[-599px]"}`}
            />
          </div>

          {property1 === "default" && (
            <img
              className={`h-[719px] top-0 absolute w-full left-0 ${physicianTrendsClassNameOverride}`}
              alt="Physician trends"
              src="https://c.animaapp.com/mbfwxdap4GBqLX/img/physician-trends-2021-merritt-hawkins-2-1.png"
            />
          )}
        </div>
      </div>
    </div>
  );
};
