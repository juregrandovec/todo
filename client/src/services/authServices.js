import axios from "axios";
require("dotenv").config();

// const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000/api";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const registerUser = (data) => {
  return axios.post(SERVER_URL + "/register", data);
};

const loginUser = (data) => {
  return axios.post(SERVER_URL + "/login", data);
};

const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;
