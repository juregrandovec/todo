import axios from "axios";
import { getUserDetails } from "../util/GetUser";
require("dotenv").config();

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const authHeaders = () => {
  let userToken = getUserDetails()?.token;

  return { headers: { Authorization: `Bearer ${userToken}` } };
};

const create = (data) => {
  return axios.post(SERVER_URL + "/todo/create", data, authHeaders());
};

const list = (userId, type) => {
  return axios.get(SERVER_URL + `/todo/list/${userId}/${type}`, authHeaders());
};

const deleteToDo = (id) => {
  return axios.delete(SERVER_URL + "/todo/" + id, authHeaders());
};

const update = (id, data) => {
  return axios.patch(SERVER_URL + "/todo/" + id, data, authHeaders());
};

const ToDoServices = {
  create,
  list,
  deleteToDo,
  update,
};

export default ToDoServices;
