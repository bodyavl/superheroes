import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddHero, Details, EditHero, Home, Error } from "../../Pages";
import { homeLoader } from "../../Pages/Home/Home";
import { BasicLayout } from "../Layouts";
import { detailsLoader } from "../../Pages/Details/Details";
import { editHeroLoader } from "../../Pages/EditHero/EditHero";
import { FallbackElement } from "../../Widget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "details/:id",
        element: <Details />,
        loader: detailsLoader,
      },
      {
        path: "add",
        element: <AddHero />,
      },
      {
        path: "edit/:id",
        element: <EditHero />,
        loader: editHeroLoader,
      },
    ],
  },
]);

const Router = () => {
  return (
    <RouterProvider router={router} fallbackElement={<FallbackElement />} />
  );
};

export default Router;
