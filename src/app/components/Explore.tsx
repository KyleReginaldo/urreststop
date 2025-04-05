import { Button } from "@/components/ui/button";
import Image from "next/image";
import cookie1 from "../../../public/images/cookie1.jpg";

const Explore = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center gap-[24px] items-center mt-[32px] mb-[64px]">
      <div className="max-w-[500px] mx-[16px] md:ml-[16px]">
        <h1 className="text-[40px] font-bold">
          Delicious Bites & Refreshing Drinks
        </h1>
        <p className="text-[24px] mb-[16px]">
          Savor flavors at &apos;UR REST STOP - Your food and drinks haven!
        </p>
        <Button className="rounded-none cursor-pointer">Explore Menu</Button>
      </div>
      <Image
        src={cookie1}
        width={450}
        height={450}
        objectFit="cover"
        alt="Cookiega"
      />
    </div>
  );
};

export default Explore;
