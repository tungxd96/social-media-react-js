import axios from 'axios';

const host = 'http://localhost:5000/like';

export const like = likeData => {
    return axios
        .post(`${host}/create`, likeData)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}

export const unlike = likeId => {
    return axios
        .delete(`${host}/delete/${likeId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}

export const likes = postId => {
    return axios
        .get(`${host}/all/${postId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}