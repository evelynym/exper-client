import axios from "axios";

const url = "http://localhost:5000";

export const fetchExperiments = () => {
  return axios.get(`${url}/experiments`);
};

export const createExperiment = (newPost) => {
  return axios.post(`${url}/experiments/createExperiment`, newPost);
};

export const deleteExperimentById = (_id) => {
  return axios.delete(`${url}/experiments/delete/${_id}`);
};

export const fetchExperimentByName = (name) => {
  return axios.get(`${url}/experiments/fetchExperimentByName/${name}`);
};
export const isExistsExperimentByName = (name) => {
  return axios.get(`${url}/experiments/isExistsExperimentByName/${name}`);
};

export const updateExperiment = (_id, experiment) => {
  return axios.patch(`${url}/experiments/updateExperiment/${_id}`, experiment);
};

export const submitAns = (newAns) => {
  return axios.post(`${url}/answers/submitAns`, newAns);
};
