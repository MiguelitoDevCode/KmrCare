import Navbar from "../Acceuil/views/Navbar";
import { Apparence } from "../Acceuil/views/Apparence";
import { GroupWrapper } from "../Acceuil/views/GroupWrapper";
import { DivWrapper } from "../Acceuil/views/DivWrapper";
import { NewsSection } from "../Acceuil/views/NewsSection";
import { Footer } from "../Acceuil/views/Footer";
import Grouper from "../Acceuil/views/Group";
import Vitrine from "../Acceuil/views/Vitrine";


const Acceuil = () => {
    return(
      <div>
        <Navbar/>
        <Apparence/>
        <Grouper/>
        <Vitrine/>
        <GroupWrapper/>
        <DivWrapper/>
        <NewsSection/>
        <Footer/>   
      </div>
    );
};

export default Acceuil;