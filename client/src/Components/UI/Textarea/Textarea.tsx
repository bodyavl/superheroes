import { FC, TextareaHTMLAttributes } from "react";
import s from "./Textarea.module.scss";

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: FC<ITextareaProps> = (props) => {
  return <textarea className={s.textarea} {...props} />;
};

export default Textarea;
