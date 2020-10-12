import axios from 'axios';

const host = 'http://localhost:5000/comment';

export const comment = post => {
    return axios
        .post(`${host}/post`, post)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
}

export const comments = postId => {
    return axios
        .get(`${host}/all/${postId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}

export const editComment = commentData => {
    return axios
        .post(`${host}/edit`, commentData)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}

export const removeComment = commentId => {
    return axios
        .delete(`${host}/delete/${commentId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}