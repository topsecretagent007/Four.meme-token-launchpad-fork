import { FC } from "react";
import Image from "next/image";
import Head from "next/head";
import Logo from "@/../public/assets/images/logo.png"
import Loading from "@/../public/assets/images/tools/loading.gif"

const Spinner: FC = () => {
  return (
    <>
      <div className="z-50 fixed w-screen h-screen">
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-[#161334] bg-opacity-50 backdrop-blur-lg">
          <div className="z-50 relative flex flex-col items-center">
            {/* Loading Title */}
            <div className="flex flex-col justify-center items-center bg-transparent h-48 font-raleway text-center">
              <Image src={Loading} alt="Loading" className="flex flex-col w-[80%]" />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Spinner;

