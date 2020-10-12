import jwtDecode from 'jwt-decode';

export const userToken = () => {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return decoded._id;
}

export const validateNull = value => {
    return value !== undefined || value != null;
}

export const validateLength = value => {
    return !value.error && value.length !== 0;
}