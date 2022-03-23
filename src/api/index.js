import axios from 'axios';

const url = 'https://localhost:5000/experiment';

export const fetchPosts = () => {
    axios.get(url);
}