import axios from "./axios-config";

export const createUser = async (username, email, password) => {
  try {
    const userRes = await axios.post("auth/users/", {
      username,
      email,
      password,
    });
    if (userRes.data.email === email) {
      const jwtRes = await axios.post("auth/jwt/create/", { email, password });
      localStorage.setItem("token", jwtRes.data.access);
      if (localStorage.getItem("token")) return true;
    }
    return false;
  } catch (err) {
    throw new Exception(err.message);
  }
};
