import s from "./InputText.module.scss";

interface IInputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputText: React.FC<IInputTextProps> = (props) => {
  return <input type="text" {...props} className={s.input} />;
};

export default InputText;
