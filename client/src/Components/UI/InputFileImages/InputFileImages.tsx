import { FC, useRef } from "react";
import s from "./InputFileImages.module.scss";

interface IInputFileImagesProps {
  name?: string;
  setValue: (files: File[] | []) => void;
  value: File[];
  disabled?: boolean;
}

const InputFileImages: FC<IInputFileImagesProps> = ({
  name,
  value,
  setValue,
  disabled,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setValue([...value, ...e.target.files]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCloseClick = (index: number) => {
    if (disabled) return;
    setValue(value.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={s.container}>
      <div className={s.preview}>
        {value?.map((image, index) => (
          <div key={index} className={s.image}>
            <button
              type="button"
              className={s.close}
              onClick={() => handleCloseClick(index)}
              disabled={disabled}
            >
              &#x2715;
            </button>
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        ))}
      </div>
      <button
        className={s.button}
        type="button"
        disabled={disabled}
        onClick={handleSelectButtonClick}
      >
        Add image(s)
      </button>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        accept="image/*"
        name={name}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default InputFileImages;
