import request from '@/utils/request'

// 查询预支任务列表
export function listAdvanceTask(query) {
  return request({
    url: '/advanceTask/advanceTask/list',
    method: 'get',
    params: query
  })
}

// 查询预支任务详细
export function getAdvanceTask(id) {
  return request({
    url: '/advanceTask/advanceTask/' + id,
    method: 'get'
  })
}

// 新增预支任务
export function addAdvanceTask(data) {
  return request({
    url: '/advanceTask/advanceTask',
    method: 'post',
    data: data
  })
}

// 修改预支任务
export function updateAdvanceTask(data) {
  return request({
    url: '/advanceTask/advanceTask',
    method: 'put',
    data: data
  })
}

// 删除预支任务
export function delAdvanceTask(id) {
  return request({
    url: '/advanceTask/advanceTask/' + id,
    method: 'delete'
  })
}
