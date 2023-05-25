import request from '@/utils/request'

// 查询预支规则列表
export function listAdvanceRule(query) {
  return request({
    url: '/advanceRule/advanceRule/list',
    method: 'get',
    params: query
  })
}

// 查询预支规则详细
export function getAdvanceRule(id) {
  return request({
    url: '/advanceRule/advanceRule/' + id,
    method: 'get'
  })
}

// 新增预支规则
export function addAdvanceRule(data) {
  return request({
    url: '/advanceRule/advanceRule',
    method: 'post',
    data: data
  })
}

// 修改预支规则
export function updateAdvanceRule(data) {
  return request({
    url: '/advanceRule/advanceRule',
    method: 'put',
    data: data
  })
}

// 删除预支规则
export function delAdvanceRule(id) {
  return request({
    url: '/advanceRule/advanceRule/' + id,
    method: 'delete'
  })
}
