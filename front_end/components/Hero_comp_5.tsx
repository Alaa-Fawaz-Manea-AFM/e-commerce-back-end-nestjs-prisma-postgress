import { homePageEL5 } from "@/constant/Constant";
import Image from "next/image";

const Hero_comp_5 = () => (
  <div className="w-full flex sm:items-end gap-5 max-sm:flex-col justify-center mb-20 mt-44">
    {homePageEL5.map((page, i) => (
      <div key={i} className="flex items-center flex-col">
        <div className="relative w-20 h-16">
          <Image fill src={page.img} alt={page.titleImg} unoptimized />
        </div>
        <h2 className="font-semibold text-lg">{page.titleImg}</h2>
      </div>
    ))}
  </div>
);

export default Hero_comp_5;
