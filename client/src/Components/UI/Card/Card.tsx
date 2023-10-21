import { FC } from "react";
import s from "./Card.module.scss";
import { ISuperhero } from "../../../interfaces";
import { Link } from "react-router-dom";

interface ICardProps {
  superhero: ISuperhero;
}

const Card: FC<ICardProps> = ({ superhero }) => {
  return (
    <Link to={`/details/${superhero.id}`} className={s.container}>
      <img
        src={
          superhero.pictureId
            ? `${import.meta.env.VITE_API_URL}/pictures/${superhero.pictureId}`
            : ""
        }
        alt={superhero.nickname}
        className={s.image}
      />
      <h4 className={s.nickname}>{superhero.nickname}</h4>
    </Link>
  );
};

export default Card;
