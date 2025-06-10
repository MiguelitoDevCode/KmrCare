/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export const FooterWrapper = ({
  className,
  text = "© 2025 KmrCare name All Rights Reserved by MIGUELITO DevCode & Team 91",
}) => {
  return (
    <div className={`relative w-full h-[427px] bg-[#0b9444] ${className}`}>
      <div className="absolute w-[309px] h-[85px] top-[70px] left-[67px]">
        <div className="absolute w-[244px] top-0 left-0 [font-family:'Yeseva_One',Helvetica] font-normal text-[#0f425d] text-4xl tracking-[0] leading-[normal]">
          KMRCARE
        </div>

        <p className="absolute w-[305px] top-[60px] left-0 font-body-2 font-[number:var(--body-2-font-weight)] text-white text-[length:var(--body-2-font-size)] tracking-[var(--body-2-letter-spacing)] leading-[var(--body-2-line-height)] [font-style:var(--body-2-font-style)]">
          Votre santé, simplifiée à Douala
        </p>
      </div>

      <div className="absolute w-[182px] h-[140px] top-[70px] left-[394px]">
        <div className="absolute w-[180px] top-0 left-0 [font-family:'Work_Sans',Helvetica] font-semibold text-white text-lg tracking-[0] leading-[normal]">
          Liens Utiles
        </div>

        <div className="absolute w-[137px] h-20 top-[60px] left-0">
          <div className="absolute w-[130px] top-0 left-0 font-body font-[number:var(--body-font-weight)] text-white text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
            A Propos
          </div>

          <div className="absolute w-[109px] top-[29px] left-0 font-body font-[number:var(--body-font-weight)] text-white text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
            Dispensaires
          </div>

          <div className="absolute w-[99px] top-[58px] left-0 font-body font-[number:var(--body-font-weight)] text-white text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] whitespace-nowrap [font-style:var(--body-font-style)]">
            Contact
          </div>
        </div>
      </div>

      <div className="absolute w-[622px] h-[169px] top-[70px] left-[590px]">
        <div className="absolute w-[301px] h-[169px] top-0 left-0">
          <div className="absolute w-[125px] top-0 left-0 [font-family:'Work_Sans',Helvetica] font-semibold text-white text-lg tracking-[0] leading-[normal]">
            Contact Us
          </div>

          <div className="absolute w-[307px] h-[109px] top-[60px] left-0">
            <div className="absolute w-[226px] top-0 left-0 font-body font-[number:var(--body-font-weight)] text-white text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
              Call: (237) 657-755-890
            </div>

            <div className="absolute w-[299px] top-[29px] left-0 font-body font-[number:var(--body-font-weight)] text-white text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
              Email: www.kmrcare.com
            </div>

            <div className="absolute w-[262px] top-[58px] left-0 font-body font-[number:var(--body-font-weight)] text-white text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
              Address: 0123 Douala Akwa
            </div>

            <div className="absolute w-[169px] top-[87px] left-0 font-body font-[number:var(--body-font-weight)] text-white text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
              Support technique
            </div>
          </div>
        </div>

        <div className="absolute w-[346px] h-[110px] top-0 left-[276px]">
          <div className="absolute w-[124px] top-0 left-0 [font-family:'Work_Sans',Helvetica] font-semibold text-white text-lg tracking-[0] leading-[normal]">
            Newsletter
          </div>

          <div className="absolute w-[346px] h-[50px] top-[60px] left-0">
            <div className="relative w-[344px] h-[50px] bg-[#fcfefe] rounded-[5px]">
              <input
              id="name"
              name="name"
              type="text"
              className="outline-none p-3 w-[287px] h-[50px] bg-[#fcfefe] text-primary font-semibold rounded-[5px]"
              placeholder="Enter your Email Adrress"
              autoComplete="name"
              required
              />
              <img
                className="absolute w-[37px] h-[29px] top-[9px] left-[292px] hover:scale-110 transition-all"
                alt="Vector"
                src="https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-22.svg"
              />
            </div>
          </div>
        </div>
      </div>

      <img
        className="absolute w-[1255px] h-px top-[286px] left-[27px] object-cover"
        alt="Vector"
        src="https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-1-1.svg"
      />

      <img
        className="absolute w-6 h-6 top-[330px] left-[1110px]"
        alt="Vector"
        src="https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-16.svg"
      />

      <img
        className="absolute w-6 h-6 top-[330px] left-[1145px]"
        alt="Vector"
        src="https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-25.svg"
      />

      <img
        className="absolute w-6 h-6 top-[330px] left-[1181px]"
        alt="Vector"
        src="https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-21.svg"
      />

      <p className="absolute w-[579px] top-[331px] left-[37px] [font-family:'Work_Sans',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal]">
        {text}
      </p>
    </div>
  );
};
