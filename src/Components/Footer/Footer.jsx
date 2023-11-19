import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";

function Footer() {
  return (
    <div className="mt-16 pb-16 text-white flex flex-col justify-center items-center">
      <div className="w-[140px] h-1 bg-slate-500"></div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.5 }}
        className="w-[80%] flex flex-col justify-center mt-12 items-center gap-10"
      >
        <div className="flex  flex-col justify-center items-center gap-8">
          <div className="text-4xl font-bold text-white text-center">
            Get In Touch
          </div>
          <div className="text-center text-lg text-slate-400">
            Get in touch anytime! I'm here, ready to connect
          </div>
          <div>
            <button
              type="button"
              className="py-2 px-2 outline-none  text-lg hover:scale-[1.02] ease-in-out flex justify-center items-center  bg-cyan-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition  duration-200 text-center  font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md"
            >
              <a href="mailto:llakshya63@gmail.com">
                Say Hello <span className="wave text-white">👋</span>
              </a>
            </button>
          </div>
          <div className="text-white flex justify-center items-center gap-5">
            <a href="https://portfolio-lakshya.vercel.app/" target="_blank">
              <button className="font-medium text-lg max-[1000px]:text-base cursor-pointer  p-1 px-2 outline-none border-none  hover:scale-[1.1]  rounded-md transition delay-150 duration-300 ease-in-out">
                My Portfolio
              </button>
            </a>
          </div>
          <div className="flex gap-5 justify-center items-center">
            <div className="text-white font-bold text-lg text-center">
              &copy; Lakshya 2023
            </div>
            <a
              href="https://www.linkedin.com/in/lakshya-254659204"
              target="_blank"
              className="cursor-pointer"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Footer;
