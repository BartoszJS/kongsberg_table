import React from "react";

import imageSvg from "../assets/Eclipse200px.svg";

interface LoaderProps {
  height?: number;
  width?: number;
}

const Loader: React.FC<LoaderProps> = ({ height, width }) => {
  return (
    <div className='w-full flex justify-center'>
      <img src={imageSvg} alt='loader' height={height} width={width} />
    </div>
  );
};

export default Loader;
