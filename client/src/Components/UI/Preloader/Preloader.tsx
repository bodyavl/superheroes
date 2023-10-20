import { FC } from "react";
import s from "./Preloader.module.scss";
import { RotatingLines } from "react-loader-spinner";

interface IPreloaderProps {
  width?: number;
}

const Preloader: FC<IPreloaderProps> = ({ width }) => {
  return (
    <div className={s.container}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="4"
        animationDuration="0.75"
        width={`${width ? width : 30}`}
        visible={true}
      />
    </div>
  );
};

export default Preloader;
