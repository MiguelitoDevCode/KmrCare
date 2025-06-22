import Navbar from "../Acceuil/views/Navbar";
import { Apparence } from "../Acceuil/views/Apparence";
import { GroupWrapper } from "../Acceuil/views/GroupWrapper";
import { DivWrapper } from "../Acceuil/views/DivWrapper";
import { NewsSection } from "../Acceuil/views/NewsSection";
import { Footer } from "../Acceuil/views/Footer";
import Grouper from "../Acceuil/views/Group";
import Vitrine from "../Acceuil/views/Vitrine";
import Descript from "../Acceuil/views/Descript";
import Testimonials from "../Acceuil/views/Testimonials";
import RealTimeStats from "../Acceuil/views/RealTimeStats";


const Acceuil = () => {
    return(
      <div className="custom-scrollbar">
        <Navbar/>
        <Apparence/>
        <Grouper/>
        <Vitrine/>
        <Descript/>
        <GroupWrapper/>
        <DivWrapper/>
        <RealTimeStats/>
        <Testimonials/>
        <NewsSection/>
        <Footer/>   
      </div>
    );
};

export default Acceuil;