import { Link } from "react-router-dom";
import s from "./Error.module.scss";
import { Button } from "../../Components/UI";

const Error = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Lost Your way?</h1>
      <p>
        Oops! This is awkward. You are looking for something that doesn't
        actually exist.
      </p>
      <Link to={"/"}>
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

export default Error;
