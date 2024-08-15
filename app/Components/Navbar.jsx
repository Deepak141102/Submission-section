import React from "react";
import Image from "next/image";

const head = () => {
  return (
    <div className="flex items-center w-full h-auto py-[5.8px] px-[20px] bg-[#333]">
      <Image
        src="/images/barabari_logo-CW6k3Oea.png"
        width={40}
        height={40}
        alt="Picture of the author"
      />
      <h1 className="text-[1.86vw] text-white font-normal flex-grow text-center pb-1 font-leagueSpartan max-md:text-[2.8vw]">
        Raksha x Barabari Donation Receipt Generator
      </h1>
    </div>
  );
};

export default head;
