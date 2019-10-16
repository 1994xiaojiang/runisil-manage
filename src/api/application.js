import axios from './request'


export function getApplicationPage(param) {
    return axios.post("manager/getApplicationsByPage",param);
}

export function getApplicationPageByValue(param,selectValue,status) {
    return axios.post("manager/getApplicationPageByValue?selectValue=" + selectValue + "&status=" + status,param);
}

export function getApplicationAllById(id) {
    return axios.get("manager/getApplicationAllById?id=" + id);
}

export function saveOrUpdateApplication(data) {
    return axios.post("manager/addOrEditApplication",data);
}

export function updateStatusApplication(data) {
    return axios.post("manager/updateStatusApplication",data);
}
