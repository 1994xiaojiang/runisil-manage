import axios from './request'

export function getContactPage(param) {
    let url = "manager/getContactPage?current=" + param.current + "&size=" + param.size;
    if(param.search) {
        url = url + "&search=" + param.search;
    }
    return axios.get(url);
}

export function saveOrUpdataContact(form) {
    return axios.post("manager/saveContactInfo",form)
}




