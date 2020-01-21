import axios from './request'

export function getContactList(param,type,search) {
    if(search){
        return axios.get("manager/getContactList?current=" + param.current + "&size=" + param.size + "&type=" + type + "&search=" + search);
    }else{
        return axios.get("manager/getContactList?current=" + param.current + "&size=" + param.size + "&type=" + type);
    }
}

export function getSubscribeInquiryList(param) {
    if(param.search){
        return axios.get("manager/getSubscribeInquiryInfo?current=" + param.current + "&size=" + param.size + "&search=" + param.search);
    }else{
        return axios.get("manager/getSubscribeInquiryInfo?current=" + param.current + "&size=" + param.size);
    }
}

export function updateStatusSample(param) {
    return axios.post("manager/updateStatusSample",param);
}

export function getFileList(param) {
    let url = "manager/getFileList?current=" + param.current + "&size=" + param.size;
    if(param.search) {
        url = url + "&search=" + param.search;
    }
    if(param.selectGroup){
        url = url + "&selectGroup=" + param.selectGroup;
    }
    return axios.get(url);
}

export function getImageList(param) {
    let url = "manager/getImageList?current=" + param.current + "&size=" + param.size;
    if(param.search) {
        url = url + "&search=" + param.search;
    }
    if(param.selectGroup){
        url = url + "&selectGroup=" + param.selectGroup;
    }
    return axios.get(url);
}

export function getGroupList(type) {
    return axios.get("manager/selectGroupList?type=" + type)
}
