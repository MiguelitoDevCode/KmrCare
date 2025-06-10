import Navbar from "../Acceuil/components/Navbar";
import { Apparence } from "../Acceuil/components/Apparence";
import { Grouper } from "../Acceuil/components/Group";
import { GroupWrapper } from "../Acceuil/components/GroupWrapper";
import { DivWrapper } from "../Acceuil/components/DivWrapper";
import { NewsSection } from "../Acceuil/components/NewsSection";
import { Footer } from "../Acceuil/components/Footer";


const Acceuil = () => {
    return(
      <div>
        <Navbar/>
        <Apparence/>
        <Grouper/>
        <div className="absolute w-[1243px] h-[337px] top-[1271px] left-[42px] bg-[#e7e6e6] bg-[url(https://c.animaapp.com/mbfwxdap4GBqLX/img/blackdoctors-1.png)] bg-[100%_100%]">
            <div className="h-[337px]">
                <div className="relative w-[1245px] h-[340px]">
                <div className="absolute w-[724px] h-[337px] top-0 left-0 overflow-hidden">
                    <div className="relative w-[239px] h-[239px] top-[-119px] left-[-119px] bg-secondary rounded-[119.5px] opacity-42" />
                </div>

                <div className="absolute w-[724px] h-[11px] top-[326px] left-0">
                    <div className="absolute w-[417px] h-[11px] top-0 left-[415px] bg-[#0b9444]" />

                    <div className="absolute w-[417px] h-[11px] top-0 left-[825px] bg-[#a5c2f7]" />

                    <div className="absolute w-[417px] h-[11px] top-0 left-1 bg-[#0f425d]" />
                </div>
                </div>
            </div>
        </div>

        <GroupWrapper/>
        <DivWrapper/>
        
        <NewsSection/>

        <div className="absolute w-full h-[857px] top-[3638px] left-0">
          <Footer />
        </div>   
      </div>
    );
};

export default Acceuil;