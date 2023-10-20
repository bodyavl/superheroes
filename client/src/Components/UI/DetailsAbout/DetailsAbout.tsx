import { FC } from "react";
import s from "./DetailsAbout.module.scss";

interface IDetailsAboutProps {
  label: string;
  value: string;
}
const DetailsAbout: FC<IDetailsAboutProps> = ({ label, value }) => {
  return (
    <div className={s.container}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default DetailsAbout;
