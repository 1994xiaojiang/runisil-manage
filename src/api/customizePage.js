import axios from './request'

export function getCustomizePageList(param) {
    return axios.get("manager/getCustomizePageList?current=" + param.current+"&size=" + param.size);
}

export function getCustomizeContent(id) {
    return axios.get("manager/getCustomizeInfoById?id=" + id);
}

export function saveOrupdate(data) {
    return axios.post("manager/saveOrUpdateCustomize",data);
}

export function addOrEditPage(data) {
    return axios.post("manager/addOrEditPage",data);
}

