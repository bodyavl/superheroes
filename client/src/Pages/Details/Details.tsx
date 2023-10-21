import {
  Button,
  Carousel,
  DeleteButton,
  DetailsAbout,
  Preloader,
} from "../../Components/UI";
import { ISuperheroDetails } from "../../interfaces";
import { deleteSuperhero, getSuperheroDetails } from "../../services";
import { catchAxiosError } from "../../utils";
import s from "./Details.module.scss";
import {
  Link,
  LoaderFunction,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

const Details = () => {
  const details = useLoaderData() as ISuperheroDetails;

  const isLoading = useNavigation().state === "loading";
  const navigate = useNavigate();

  const imagesUrls =
    details.pictures &&
    details.pictures.map((picture) => {
      return `${import.meta.env.VITE_API_URL}/pictures/${picture.id}`;
    });

  const handleDelete = async () => {
    try {
      await deleteSuperhero(details.id);
      navigate("/");
    } catch (error) {
      catchAxiosError(error);
    }
  };

  return (
    <>
      {isLoading ? <Preloader /> : null}
      <div className={s.container}>
        {imagesUrls ? <Carousel images={imagesUrls} /> : null}
        <div className={s.details}>
          <div className={s.nickname}>{details.nickname}</div>
          <div className={s.descr}>{details.origin_description}</div>

          <DetailsAbout label="Real name" value={details.real_name} />

          <DetailsAbout label="Superpowers" value={details.superpowers} />
          <DetailsAbout label="Catch phrase" value={details.catch_phrase} />
          <div className={s.buttons}>
            <Link to={`/edit/${details.id}`}>
              <Button>Edit</Button>
            </Link>
            <DeleteButton onClick={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
};

export const detailsLoader: LoaderFunction = async ({ params }) => {
  try {
    if (!params.id) return null;
    const res = await getSuperheroDetails(+params.id);
    return res;
  } catch (error) {
    catchAxiosError(error);
    return null;
  }
};

export default Details;
