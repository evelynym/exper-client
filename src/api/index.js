import axios from 'axios';

const url = 'http://localhost:5000/experiments';

export const fetchExperiments = () => {
    return axios.get(url);
}

export const createExperiment = (newPost) => {
    axios.post(`${url}/createExperiment`,newPost)
}

export const fetchExperimentByName = (name) => {
    return axios.get(`${url}/fetchExperimentByName/${name}`);
}

export const submitAns = (newAns) => {
    axios.post(`${url}/submitAns`,newAns)
}
