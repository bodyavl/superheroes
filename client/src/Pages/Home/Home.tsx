import { LoaderFunction, useLoaderData, useNavigation } from "react-router-dom";
import { Preloader } from "../../Components/UI";
import { Info, Pages, Superheroes } from "../../Widget";
import { catchAxiosError } from "../../utils";
import { getSuperheroes } from "../../services";
import { ISuperhero, Pagination } from "../../interfaces";
import s from "./Home.module.scss";

const Home = () => {
  const response = useLoaderData() as Pagination<ISuperhero>;
  const isLoading = useNavigation().state === "loading";

  return (
    <>
      {isLoading ? <Preloader /> : null}
      <div className={s.container}>
        <Info />
        {response.items.length < 1 ? (
          <span className={s.noheroes}>
            No superheroes yet. Be the first one to add a new!
          </span>
        ) : null}
        <Superheroes superheroes={response.items} />
        <Pages
          totalPages={response.meta.totalPages}
          currentPage={response.meta.currentPage}
        />
      </div>
    </>
  );
};

export const homeLoader: LoaderFunction = async ({ request }) => {
  try {
    const page = new URL(request.url).searchParams.get("page") || "1";
    const res = await getSuperheroes(+page);

    return res;
  } catch (error) {
    catchAxiosError(error);
    return null;
  }
};

export default Home;
