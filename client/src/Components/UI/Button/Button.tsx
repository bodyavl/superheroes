import { ButtonHTMLAttributes, FC } from "react";
import s from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className={s.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
