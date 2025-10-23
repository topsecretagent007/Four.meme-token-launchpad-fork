import { FC } from "react";

const LoadingButton: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 bg-transparent h-full font-raleway text-center">
        <span className="loader-button"></span>
      </div>
    </>
  );
};

export default LoadingButton;

