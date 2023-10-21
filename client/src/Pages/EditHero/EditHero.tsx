import { LoaderFunction, useLoaderData, useNavigation } from "react-router-dom";
import { FormEditHero } from "../../Widget";
import { catchAxiosError } from "../../utils";
import { getSuperheroDetails } from "../../services";
import { ISuperheroDetails } from "../../interfaces";
import { Preloader } from "../../Components/UI";

const EditHero = () => {
  const superhero = useLoaderData() as ISuperheroDetails;
  const isLoading = useNavigation().state === "loading";

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FormEditHero initialSuperhero={superhero} />
      )}
    </>
  );
};

export const editHeroLoader: LoaderFunction = async ({ params }) => {
  try {
    if (params.id) return await getSuperheroDetails(+params.id);
  } catch (error) {
    catchAxiosError(error);
    return null;
  }
};

export default EditHero;
