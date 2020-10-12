import axios from 'axios';

const host = 'http://localhost:5000/user';

export const register = user => {
    return axios
        .post(`${host}/register`, user)
        .then(res => {
            return 'User registered';
        })
        .catch(err => {
            return err;
        });
}

export const login = user => {
    return axios
        .post(`${host}/login`, user)
        .then(res => {
            localStorage.setItem('usertoken', res.data);
            return res.data;
        })
        .catch(err => {
            return err;
        });
}

export const profile = id => {
    if (id === undefined || id == null) {
        return undefined;
    }

    return axios
        .get(`${host}/profile/${id}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        })
}

export const search = kw => {
    return axios
        .get(`${host}/search/${kw}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return err;
        });
}