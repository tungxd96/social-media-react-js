import axios from 'axios';

const host = 'http://localhost:5000/post';

export const posts = id => {
    return axios
        .get(`${host}/all/${id}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
}

export const createPost = post => {
    return axios
        .post(`${host}/create`, post)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}

export const removePost = id => {
    return axios
        .delete(`${host}/delete/${id}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
}

export const editPost = post => {
    return axios
        .post(`${host}/edit`, post)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
}