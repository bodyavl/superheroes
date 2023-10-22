import { Header } from "..";
import { Preloader } from "../../Components/UI";
import s from "./FallbackElement.module.scss";

export const FallbackElement = () => {
  return (
    <>
      <Header />
      <div className={s.container}>
        <Preloader />
      </div>
    </>
  );
};

export default FallbackElement;
