import s from "./FormAddHero.module.scss";
import {
  Button,
  InputFileImages,
  InputText,
  Textarea,
} from "../../Components/UI";
import useSuperhero, { SuperheroActionTypes } from "../../hooks/useSuperhero";
import { catchAxiosError } from "../../utils";
import { addSuperhero } from "../../services";
import { useNavigate } from "react-router-dom";
import { ISuperheroDetails } from "../../interfaces";
import { FC, useEffect } from "react";

interface IFormEditHeroProps {
  initialSuperhero: ISuperheroDetails;
}

const FormEditHero: FC<IFormEditHeroProps> = ({ initialSuperhero }) => {
  const [superhero, dispatch] = useSuperhero();

  const navigate = useNavigate();

  useEffect(() => {
    async function getSuperhero() {
      const pictures = await Promise.all(
        initialSuperhero.pictures.map(async (picture) => {
          const url = `${import.meta.env.VITE_API_URL}/pictures/${picture.id}`;
          const blob = await fetch(url).then((response) => response.blob());

          return new File([blob], "picture", { type: "image/png" });
        })
      );

      dispatch({
        type: SuperheroActionTypes.SET_NICKNAME,
        payload: initialSuperhero.nickname,
      });
      dispatch({
        type: SuperheroActionTypes.SET_REAL_NAME,
        payload: initialSuperhero.real_name,
      });
      dispatch({
        type: SuperheroActionTypes.SET_CATCH_PHRASE,
        payload: initialSuperhero.catch_phrase,
      });
      dispatch({
        type: SuperheroActionTypes.SET_ORIGIN_DESCRIPTION,
        payload: initialSuperhero.origin_description,
      });
      dispatch({
        type: SuperheroActionTypes.SET_SUPERPOWERS,
        payload: initialSuperhero.superpowers,
      });
      dispatch({
        type: SuperheroActionTypes.SET_PICTURES,
        payload: pictures,
      });
    }
    getSuperhero();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      Object.entries(superhero).forEach(([key, value]) => {
        if (key === "pictures") {
          value.forEach((picture: File) => {
            formData.append("pictures", picture);
          });
        } else {
          formData.append(key, value);
        }
      });

      await addSuperhero(formData);

      navigate("/");
    } catch (error) {
      catchAxiosError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <InputText
        name="nickname"
        placeholder="Nickname"
        value={superhero.nickname}
        onChange={(e) =>
          dispatch({
            type: SuperheroActionTypes.SET_NICKNAME,
            payload: e.target.value,
          })
        }
        required
      />
      <InputText
        name="real_name"
        placeholder="Real Name"
        value={superhero.real_name}
        onChange={(e) =>
          dispatch({
            type: SuperheroActionTypes.SET_REAL_NAME,
            payload: e.target.value,
          })
        }
        required
      />
      <InputText
        name="catch_phrase"
        placeholder="Catch Phrase"
        value={superhero.catch_phrase}
        onChange={(e) =>
          dispatch({
            type: SuperheroActionTypes.SET_CATCH_PHRASE,
            payload: e.target.value,
          })
        }
        required
      />
      <Textarea
        name="origin_description"
        placeholder="Origin Description"
        value={superhero.origin_description}
        onChange={(e) =>
          dispatch({
            type: SuperheroActionTypes.SET_ORIGIN_DESCRIPTION,
            payload: e.target.value,
          })
        }
        required
      />
      <Textarea
        name="superpowers"
        placeholder="Superpowers"
        value={superhero.superpowers}
        onChange={(e) =>
          dispatch({
            type: SuperheroActionTypes.SET_SUPERPOWERS,
            payload: e.target.value,
          })
        }
        required
      />
      <InputFileImages
        name="pictures"
        setValue={(files) =>
          dispatch({ type: SuperheroActionTypes.SET_PICTURES, payload: files })
        }
        value={superhero.pictures}
      />
      <Button type="submit">Add Hero</Button>
    </form>
  );
};

export default FormEditHero;
