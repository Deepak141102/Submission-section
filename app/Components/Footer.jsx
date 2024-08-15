import React from "react";

const Footer = () => {
  return (
    <div className=" w-full h-[13.4vh] flex justify-center items-center flex-col  bg-[#333] p-[14.4px]">
      <p className=" text-[15px] font-normal text-white font-raleway">
        &copy;2024 Barabari Collective Developers.
      </p>
      <p className=" text-[15px] font-normal text-white">
        Built By{" "}
        <a href="https://github.com/drumil32" className="text-yellow-300">
          Drumil Akhenia.
        </a>
      </p>
      <p className=" text-[15px] font-normal text-white">
        {" "}
        Want us to build something for you?
        <a href="https://www.barabariproject.org/" className="text-yellow-300">
          Contact Us
        </a>
      </p>
    </div>
  );
};

export default Footer;
