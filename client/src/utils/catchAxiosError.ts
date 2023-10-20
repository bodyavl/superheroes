import { isAxiosError } from "axios";

export const catchAxiosError = (error: unknown) => {
  if (isAxiosError(error)) {
    alert(error.response?.data.message);
  } else throw error;
};
