import { Link } from "react-router-dom";
import s from "./Header.module.scss";
import logo from "../../assets/logos/logo.svg";

const Header = () => {
  return (
    <header className={s.container}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className={s.menu}>
        <Link to="/add">Add Superhero &#43;</Link>
      </div>
    </header>
  );
};

export default Header;
