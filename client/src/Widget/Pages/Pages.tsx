import { FC } from "react";
import s from "./Pages.module.scss";
import { PageButton } from "../../Components/UI";

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pages: FC<IPaginationProps> = ({ totalPages, currentPage }) => {
  return (
    <div className={s.container}>
      {Array(totalPages)
        .fill(0)
        .map((_, index) => (
          <PageButton
            pageNumber={index + 1}
            isCurrent={currentPage === index + 1}
          />
        ))}
    </div>
  );
};

export default Pages;
