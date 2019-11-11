import axios from './request'

export function getCardsData() {
    return axios.get("manager/getCardsData");
}

export function getBarData() {
    return axios.get("manager/getBarData");
}
