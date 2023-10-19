import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
  },
  {
    path: "add",
  },
  {
    path: "details/:id",
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
