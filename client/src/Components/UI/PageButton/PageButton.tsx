import { FC } from "react";
import s from "./PageButton.module.scss";
import { Link } from "react-router-dom";

interface IPageButtonProps {
  isCurrent?: boolean;
  pageNumber: number;
}

const PageButton: FC<IPageButtonProps> = ({ isCurrent, pageNumber }) => {
  return (
    <Link
      className={isCurrent ? `${s.page} ${s.current}` : s.page}
      to={`?page=${pageNumber}`}
    >
      {pageNumber}
    </Link>
  );
};

export default PageButton;
