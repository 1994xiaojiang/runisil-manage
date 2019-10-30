import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '@/router/router'
import store from '@/store/store'

// 创建axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api的base_url
    timeout: 10000, // 请求超时时间
    withCredentials: true
})
let loading;
// request 拦截器
service.interceptors.request.use(
    config => {
        // 这里可以自定义一些config 配置
        loading = Loading.service({
            lock: true,
            text: '加载中……',
            background: 'rgba(0, 0, 0, 0.8)'
        })
        return config
    },
    error => {
        //  这里处理一些请求出错的情况
        loading.close();
        Promise.reject(error)
    }
);

// response 拦截器
service.interceptors.response.use(
    response => {
        // 这里处理一些response 正常放回时的逻辑
        loading.close();
        return response.data
    },
    error => {
        // 这里处理一些response 出错时的逻辑
        loading.close();
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回401 清除token信息并跳转到登陆页面
                    store.commit('DEL_TOKEN');
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                case 404:
                    Message.error('网络请求不存在');
                    break;
                default:
                    Message.error(error.response.data.message)
            }
        } else {
            // 请求超时或者网络有问题
            if (error.message.includes('timeout')) {
                Message.error('请求超时！请检查网络是否正常')
            } else {
                Message.error('请求失败，请检查网络是否已连接')
            }
        }
        return Promise.reject(error)
    }
);

export default service

