import { http } from './http';

// Get posts on DOM load
const getPosts = () => {
  http
    .get('http://localhost:3000/posts')
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

document.addEventListener('DOMContentLoaded', getPosts);
