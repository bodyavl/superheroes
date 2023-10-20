import { FC } from "react";
import { ISuperhero } from "../../interfaces";
import s from "./Superheroes.module.scss";
import { Card } from "../../Components/UI";

interface ISuperheopesProps {
  superheroes: ISuperhero[];
}

const Superheopes: FC<ISuperheopesProps> = ({ superheroes }) => {
  return (
    <div className={s.container}>
      {superheroes.map((hero, index) => (
        <Card key={index} superhero={hero} />
      ))}
    </div>
  );
};

export default Superheopes;
