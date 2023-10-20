import { getSuperheroDetails } from "../../services";
import { catchAxiosError } from "../../utils";
import s from "./Details.module.scss";
import { LoaderFunction } from "react-router-dom";

const Details = () => {
  return <div>Details</div>;
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
