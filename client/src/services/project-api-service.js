import axios from "./axios-config";

export const addProject = async (title) => {
  try {
    const keyRes = await axios.post("api/projects/create_project/", { title });
    return keyRes.data.apiKey;
  } catch (err) {
    throw new Exception(err.message);
  }
};
