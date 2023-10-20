import { Link } from "react-router-dom";
import s from "./SquareLink.module.scss";
import { FC, ReactNode } from "react";

interface ISquareLinkProps {
  to: string;
  children?: ReactNode;
}

const NextButton: FC<ISquareLinkProps> = ({ to, children }) => {
  return (
    <Link className={s.link} to={to}>
      {children}
    </Link>
  );
};

export default NextButton;
