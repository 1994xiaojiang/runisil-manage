import axios from './request'

export function uploadfile(param) {
    return axios.post("manager/uploadFile",param);
}

export function createGroup(param) {
    return axios.post("manager/createNewGroup",param);
}

export function uploadImage(param) {
    return axios.post("manager/uploadImage",param);
}


