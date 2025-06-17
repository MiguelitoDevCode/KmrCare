/* eslint-disable no-unused-vars */
import React from "react";
import { LinkButton } from "../../components/Accueil/LinkButton";
import { motion } from "motion/react";

const Grouper = () => {
  return (
    <motion.div
    initial={{ x: 100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="w-full max-w-2xl mx-auto my-12 md:my-24 px-4 text-center">
      <div className="mb-6 md:mb-8">
        <div className="font-caption font-bold text-[#0b9444] text-sm md:text-base tracking-wider uppercase mb-2">
          BIENVENUE SUR KMRCARE
        </div>
        <p className="font-display-2 font-semibold text-[#0f425d] text-2xl sm:text-3xl md:text-4xl leading-tight">
          Un Endroit Idéal pour Recevoir des Soins
        </p>
      </div>

      <p className="font-body text-black text-sm md:text-base leading-relaxed mb-8 md:mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor
        augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim
        et.
      </p>
      <LinkButton/>
      
      <div className="bg-gradient-to-r from-transparent via-secondary to-transparent h-[1px] w-full"/>
    </motion.div>
  );
};

export default Grouper;
