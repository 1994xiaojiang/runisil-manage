import axios from './request'

export function getCardsData() {
    return axios.get("manager/getCardsData");
}

export function getBarData() {
    return axios.get("manager/getBarData");
}

export function getPieChartData() {
    return axios.get("manager/getPieChartData");
}

export function getTableData() {
    return axios.get("manager/getTableData");
}

export function getOsAndBrowersData() {
    return axios.get("manager/getOsAndBrowserDate")
}


