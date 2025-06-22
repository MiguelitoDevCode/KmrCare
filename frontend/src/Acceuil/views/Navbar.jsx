import { useState } from "react";                                                                                                                                                                                                                                                                                                                              
import { motion } from "motion/react";                                                                                                                                                                                                                                                                                                                              


function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a className="nav-link" href="#accueil">
          🏠 Accueil
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#apropos">
          ℹ️ À Propos
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#dispensaires">
          🏥 Dispensaires
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#services">
          💊 Services
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact">
          📞 Contact
        </a>
      </li>
      <li>
        <motion.button
        whileTap={{ scale: 1.05 }}
        whileHover={{ scale: 1.02, y: -1 }}
        className="btn bg-gradient-to-r from-[#0b9444] to-[#0a7c3a] hover:from-[#0a7c3a] hover:to-[#0b9444]" 
        href="#">
          📅 Prendre RDV
        </motion.button>
      </li>
      <li>
        <motion.button
        whileTap={{ scale: 1.05 }}
        whileHover={{ scale: 1.02, y: -1 }}
        className="btn-secondary border-2 border-[#0f425d] text-[#0f425d] hover:bg-[#0f425d] hover:text-white bg-transparent"
        href="#">
          🔐 Se Connecter
        </motion.button>
      </li>
    </ul>
  );
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="inset-x-0 z-20 w-full p-3 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <img
            alt="Logo"
            src="/assets/logo.png"
            className="w-40 h-30 cursor-pointer"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer bg-primary text-white hover:text-[#10425d] focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden font-bold sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5 font-bold">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
