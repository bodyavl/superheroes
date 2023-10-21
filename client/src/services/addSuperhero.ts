import axios from "axios";

export const addSuperhero = async (formData: FormData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/superheroes/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
