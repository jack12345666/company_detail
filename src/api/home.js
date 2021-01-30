import request from '../utils/request'
import { stringify } from 'qs'

// 获取平台列表
export function getServerDepts() {
  return request({
    url: '/companyHome/getServerDepts',
    method: 'post'
  })
}

// 获取平台下企业
export function getCompanys(data) {
  return request({
    url: '/companyHome/searchCompanys',
    method: 'post',
    data: stringify(data)
  })
}

// 获取企业详情
export function getCompanyDetail(id) {
  return request({
    url: '/companyHome/searchCompanyDetail',
    method: 'post',
    data: `id=${id}`
  })
}

// 获取行业列表
export function getIndustries() {
  return request({
    url: '/companyHome/getBigIndustries',
    method: 'post'
  })
}

// 根据行业获取企业列表
export function getCompanysByIndustry(data) {
  return request({
    url: '/companyHome/searchCompanysByIndustry',
    method: 'post',
    data: stringify(data)
  })
}
