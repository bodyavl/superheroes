import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddHero, Details, EditHero, Home } from "../../Pages";
import { homeLoader } from "../../Pages/Home/Home";
import { BasicLayout } from "../Layouts";
import { detailsLoader } from "../../Pages/Details/Details";
import { editHeroLoader } from "../../Pages/EditHero/EditHero";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <div>404</div>,
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
  return <RouterProvider router={router} />;
};

export default Router;
