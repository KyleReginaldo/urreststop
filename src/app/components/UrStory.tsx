import Image from "next/image";
import bake from "../../../public/images/bake.jpg";
const UrStory = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[16px] mb-[64px]">
      <h1 className="font-bold">&apos;UR REST STOP STORY</h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-[24px]">
        <Image
          src={bake}
          width={200}
          height={200}
          objectFit="cover"
          alt="Cookiega"
          className="flex-none"
        />
        <div className="flex-none max-w-[600px] mx-[16px] md:ml-0">
          <h1 className="text-[20px] font-bold">Our Passion for Food</h1>
          <p>
            At &apos;UR REST STOP,' we believe that food is not just sustenance;
            it's an experience. Our passion drives us to create desserts that
            reflect the rich flavors of using only the freshest ingredients and
            delivering them freshly to your door.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrStory;
