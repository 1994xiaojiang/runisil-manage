import request from '@/utils/request'

export function getVerifyCode() {
  return request({
    url: '/verifycode/getVerifyCode',
    method: 'get'
  })
}

export function userLogin(params) {
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}

export function judgeCode(params) {
  return request({
    url: '/verifycode/judgeCode',
    method: 'post',
    data: params
  })
}
