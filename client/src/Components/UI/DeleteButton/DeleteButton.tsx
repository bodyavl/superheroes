import { ButtonHTMLAttributes, FC } from "react";
import trash from "../../../assets/images/trash.png";
import s from "./DeleteButton.module.scss";

interface IDeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const DeleteButton: FC<IDeleteButtonProps> = ({ onClick }) => {
  return (
    <button className={s.button} onClick={onClick}>
      <img src={trash} alt="trash" />
    </button>
  );
};

export default DeleteButton;
