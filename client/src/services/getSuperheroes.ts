import axios from "axios";
import { ISuperhero, Pagination } from "../interfaces";

export const getSuperheroes = async (
  page = 1,
  limit = 5
): Promise<Pagination<ISuperhero>> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/superheroes?page=${page}&limit=${limit}`
  );

  return response.data;
};
