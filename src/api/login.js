import axios from './request'

export function login(data) {
    return axios.post("login", data);
}

export function getProducts() {
    return axios.get("api/getProducts");
}

export function getResources(roleId) {
    return axios.get("manager/getResources?roleId=" + roleId);
}

export function uploadImage(formData) {
    return axios.post("manager/uploadImage",formData);
}

