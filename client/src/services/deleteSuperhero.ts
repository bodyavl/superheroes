import axios from "axios";

export const deleteSuperhero = async (id: number) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/superheroes/${id}`);
};
