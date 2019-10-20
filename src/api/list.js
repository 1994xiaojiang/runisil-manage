import axios from './request'

export function getContactList(param,type) {
    return axios.get("manager/getContactList?current=" + param.current + "&size=" + param.size + "&type=" + type);
}