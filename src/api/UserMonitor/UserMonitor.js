import request from '@/utils/request'

// 查询用户监听列表
export function listUserMonitor(query) {
  return request({
    url: '/UserMonitor/UserMonitor/list',
    method: 'get',
    params: query
  })
}

// 查询用户监听详细
export function getUserMonitor(id) {
  return request({
    url: '/UserMonitor/UserMonitor/' + id,
    method: 'get'
  })
}

// 新增用户监听
export function addUserMonitor(data) {
  return request({
    url: '/UserMonitor/UserMonitor',
    method: 'post',
    data: data
  })
}

// 修改用户监听
export function updateUserMonitor(data) {
  return request({
    url: '/UserMonitor/UserMonitor',
    method: 'put',
    data: data
  })
}

// 删除用户监听
export function delUserMonitor(id) {
  return request({
    url: '/UserMonitor/UserMonitor/' + id,
    method: 'delete'
  })
}
