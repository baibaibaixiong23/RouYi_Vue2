import request from '@/utils/request'

// 查询兑换汇率列表
export function listExchangeRate(query) {
  return request({
    url: '/ExchangeRate/ExchangeRate/list',
    method: 'get',
    params: query
  })
}

// 查询兑换汇率详细
export function getExchangeRate(id) {
  return request({
    url: '/ExchangeRate/ExchangeRate/' + id,
    method: 'get'
  })
}

// 新增兑换汇率
export function addExchangeRate(data) {
  return request({
    url: '/ExchangeRate/ExchangeRate',
    method: 'post',
    data: data
  })
}

// 修改兑换汇率
export function updateExchangeRate(data) {
  return request({
    url: '/ExchangeRate/ExchangeRate',
    method: 'put',
    data: data
  })
}

// 删除兑换汇率
export function delExchangeRate(id) {
  return request({
    url: '/ExchangeRate/ExchangeRate/' + id,
    method: 'delete'
  })
}
