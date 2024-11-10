import axios from "axios";

const API_BASE_URL = "http://stage-api.codenp.com/api";

export const authenticateUser = async (username, password) => {
  const response = await axios.get(`${API_BASE_URL}/shared/authenticate`, {
    params: { Username: username, Password: password },
  });
  return response.data;
};

export const getPublishedBlogs = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/shared/blog/getPublishedBlogs`
  );
  return response.data;
};
