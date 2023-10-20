import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Details, Home } from "../../Pages";
import { homeLoader } from "../../Pages/Home/Home";
import { BasicLayout } from "../Layouts";
import { detailsLoader } from "../../Pages/Details/Details";

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
      },
      {
        path: "details/:id",
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
