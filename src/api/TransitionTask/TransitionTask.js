import request from '@/utils/request'

// 查询兑换任务记录列表
export function listTransitionTask(query) {
  return request({
    url: '/TransitionTask/TransitionTask/list',
    method: 'get',
    params: query
  })
}

// 查询兑换任务记录详细
export function getTransitionTask(id) {
  return request({
    url: '/TransitionTask/TransitionTask/' + id,
    method: 'get'
  })
}

// 新增兑换任务记录
export function addTransitionTask(data) {
  return request({
    url: '/TransitionTask/TransitionTask',
    method: 'post',
    data: data
  })
}

// 修改兑换任务记录
export function updateTransitionTask(data) {
  return request({
    url: '/TransitionTask/TransitionTask',
    method: 'put',
    data: data
  })
}

// 删除兑换任务记录
export function delTransitionTask(id) {
  return request({
    url: '/TransitionTask/TransitionTask/' + id,
    method: 'delete'
  })
}
