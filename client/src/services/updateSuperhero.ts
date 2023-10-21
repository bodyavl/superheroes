import axios from "axios";

export const updateSuperhero = async (id: number, formData: FormData) => {
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/superheroes/${id}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return res.data;
};
