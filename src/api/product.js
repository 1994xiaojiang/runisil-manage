import axios from './request'


export function getProjectPage(param) {
    return axios.post("manager/getProductsByPage",param);
}

export function getProductsPageByValue(param,selectValue,status) {
    return axios.post("manager/getProductsPageByValue?selectValue=" + selectValue + "&status=" + status,param);
}

export function getProductAllById(id) {
    return axios.get("manager/getProductAllById?id=" + id);
}

export function saveOrUpdateProduct(data) {
    return axios.post("manager/addOrEditProduct",data);
}

export function updateStatusProduct(data) {
    return axios.post("manager/updateStatusProduct",data);
}
