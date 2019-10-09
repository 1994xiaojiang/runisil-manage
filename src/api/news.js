import axios from './request'

export function getNewsByPage(param) {
    return axios.post("manager/getNewsByPage",param);
}

export function relesaseNews(data) {
    return axios.post("manager/relesaseNews",data);
}

export function addOrEditnews(data) {
    return axios.post("manager/addOrEditnews",data);
}

export function toDelete(data) {
    return axios.post("manager/toDelete",data);
}

export function searchNews(data,selectValue,status){
    return axios.post("manager/searchNews?selectValue=" + selectValue + "&status=" + status,data);
}

export function selectNewsById(id){
    return axios.get("api/getNewsById?id=" + id);
}

