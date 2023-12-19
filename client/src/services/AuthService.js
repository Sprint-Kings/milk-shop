import axios from "axios";

const API_URL = "http://localhost:8083/api/auth/";

const register = (firstname, email, password, surname, patronymic, login) => {
  return axios.post(API_URL + "signup", {
    firstname,
    surname,
    patronymic,
    login,
    email,
    password,
  });
};

const login = (login, password) => {
  return axios
    .post(API_URL + "signin", {
      login,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("roles", JSON.stringify(response.data.roles));
        localStorage.setItem("login", JSON.stringify(response.data.login));
      }

      return response.data;
    });
};

const verifyPassword = (login, password) => {
  return axios
    .post(API_URL + "verify", {
      login,
      password,
    })
    .then(() => {
      return;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("roles");
  localStorage.removeItem("login");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("login"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  verifyPassword,
};

export default AuthService;