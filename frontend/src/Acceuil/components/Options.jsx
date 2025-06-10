import { Goals } from "../../components/Accueil/Goals";

const Options = () => {
   return(
      <div className="absolute w-[1052px] h-[106px] top-[870px] left-[342px]">
            <Goals
              className="!h-[106px] !flex !left-0 !absolute !bg-[#0b9444] !w-[333px] !top-0"
              divClassName="!tracking-[0] !ml-[-0.36px] !text-lg ![font-style:unset] !font-normal ![font-family:'Work_Sans',Helvetica] !leading-[25.2px]"
              elementCalendarClassName="!mr-[-1.36px] !mt-[unset] !mb-[unset]"
              hasElementCash={false}
              hasElementTeam={false}
              text="Prendre Rendez-vous"
            />
            <Goals
              className="!border-[#000000] !h-[106px] !border !border-solid !flex !left-[359px] !absolute !bg-[#ffffff] !w-[333px] !top-0"
              hasDiv={false}
              hasElementCalendar={false}
              hasElementCash={false}
              hasElementTeam={false}
            />
            <Goals
              className="!h-[106px] !flex !left-[719px] !absolute !bg-[#0f425d] !w-[333px] !top-0"
              hasDiv={false}
              hasElementCalendar={false}
              hasElementCash={false}
              hasElementTeam={false}
            />
          </div>
   );
};

export default Options;
