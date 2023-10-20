import { Outlet } from "react-router-dom";
import { Header } from "../../../Widget";
import s from "./BasicLayout.module.scss";

const BasicLayout = () => {
  return (
    <>
      <Header />
      <div className={s.outlet}>
        <Outlet />
      </div>
    </>
  );
};

export default BasicLayout;
