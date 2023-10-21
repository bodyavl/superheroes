import { FC } from "react";
import s from "./Pages.module.scss";
import { PageButton, SquareLink } from "../../Components/UI";

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pages: FC<IPaginationProps> = ({ totalPages, currentPage }) => {
  return (
    <div className={s.container}>
      {currentPage > 1 && (
        <SquareLink to={`?page=${currentPage - 1}`}>&larr;</SquareLink>
      )}
      {Array(totalPages)
        .fill(0)
        .map((_, index) => (
          <PageButton
            key={index}
            pageNumber={index + 1}
            isCurrent={currentPage === index + 1}
          />
        ))}
      {currentPage < totalPages && (
        <SquareLink to={`?page=${currentPage + 1}`}>&rarr;</SquareLink>
      )}
    </div>
  );
};

export default Pages;
