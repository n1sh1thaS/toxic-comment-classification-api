import axios from "./axios-config";

export const addProject = async (title) => {
  try {
    const keyRes = await axios.post("api/projects/create_project/", { title });
    return keyRes.data.apiKey;
  } catch (err) {
    throw new Exception(err.message);
  }
};

export const getProjectTitles = async () => {
  try {
    const projectRes = await axios.get("api/projects/get_projects/");
    return projectRes.data.titles;
  } catch (err) {
    throw new Exception(err.message);
  }
};

export const updateKey = async (title) => {
  try {
    const keyRes = await axios.post("api/apikey/update_key/", { title });
    return keyRes.data.apiKey;
  } catch (err) {
    throw new Exception(err.message);
  }
};
