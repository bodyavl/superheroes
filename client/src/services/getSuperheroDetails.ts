import axios from "axios";
import { ISuperheroDetails } from "../interfaces";

export const getSuperheroDetails = async (
  id: number
): Promise<ISuperheroDetails> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/superheroes/${id}`
  );

  return response.data;
};
