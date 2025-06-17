/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";

export const Apparence = ({
  property1,
  className,
  physicianTrendsClassName,
  physicianTrendsClassNameOverride,
}) => {
  return (
    <div className={`w-full min-h-[500px] md:min-h-[600px] lg:min-h-[560px] ${className}`}>
      <div
        className={`${property1 === "variant-2" ? "top-1" : ""} ${property1 === "variant-2" ? "min-h-[500px] md:min-h-[600px] lg:min-h-[560px]" : "min-h-[550px] md:min-h-[650px] lg:min-h-[724px]"} ${property1 === "variant-2" ? "relative" : ""}`}
      >
        <div
          className={`w-full relative ${property1 === "variant-2" ? "min-h-[500px] md:min-h-[600px] lg:min-h-[560px]" : "min-h-[550px] md:min-h-[650px] lg:min-h-[724px]"}`}
        >
          <div
            className={`w-full left-0 rotate-180 h-[560px] bg-[#02ddcd] absolute ${property1 === "default" ? "top-1" : "top-0"} -z-10`} // Added z-index
          />

          {property1 === "default" && (
            <img
              className={`h-[715px] top-1 absolute w-full left-0 object-cover ${physicianTrendsClassName} z-10`} // Added z-index and object-cover
              alt="Physician trends"
              src="https://c.animaapp.com/mbfwxdap4GBqLX/img/physician-trends-2021-merritt-hawkins-1-1.png"
            />
          )}

          <div
            className={`[background:linear-gradient(259deg,rgba(229,228,232,1)_9%,rgba(235,234,239,0)_100%)] w-full left-0 rotate-180 h-[560px] absolute ${property1 === "default" ? "top-1" : "top-0"} -z-10`} // Added z-index
          />

          <div
            className={`w-full left-0 h-[560px] overflow-hidden absolute ${property1 === "default" ? "top-1" : "top-0"} flex items-center`} // Use h-full and flex for alignment
          >
            {property1 === "variant-2" && (
              <img
                className="absolute w-full h-full md:h-[738px] top-0 left-0 object-cover z-10" // Adjusted for full cover and z-index
                alt="Docteur JUNIOR"
                src="https://c.animaapp.com/mbfwxdap4GBqLX/img/docteur-junior.png"
              />
            )}

            {/* Container for text content and decorative circle */}
            <div className="relative w-full h-full flex items-center justify-center lg:justify-start px-4 sm:px-8">
              {/* Decorative circle - hidden on small screens, adjusted for larger */}
              <div
                className={`hidden top-[140px] left-[1238px] lg:block w-[500px] h-[500px] xl:w-[734px] xl:h-[734px] opacity-50 rounded-full absolute transform -translate-x-1/2 ${property1 === "default" ? "bg-[#0b9444]" : "bg-[#0f425d]"}`}
              />

              {/* Text content block */}
              <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl lg:ml-[5%] xl:ml-[10%] text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start space-y-4 md:space-y-6 py-8">
                  <div className="[font-family:'Work_Sans',Helvetica] w-full tracking-[2.88px] text-lg md:text-xl text-[#0b9444] font-bold leading-[normal]">
                    UN RENDEZ-VOUS, UNE SOLUTION
                  </div>
                  <p className="[font-family:'Yeseva_One',Helvetica] w-full text-2xl sm:text-3xl md:text-4xl lg:text-[38px] text-[#0f425d] font-normal leading-[normal]">
                    Votre santé, simplifiée. Prenez rendez-vous dans les
                    dispensaires de Douala en un instant.
                  </p>
                </div>
              </motion.div>
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
