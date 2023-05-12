import request from '@/utils/request'

// 查询MonitorList列表
export function listMonitorList(query) {
  return request({
    url: '/MonitorList/MonitorList/list',
    method: 'get',
    params: query
  })
}

// 查询MonitorList详细
export function getMonitorList(id) {
  return request({
    url: '/MonitorList/MonitorList/' + id,
    method: 'get'
  })
}

// 新增MonitorList
export function addMonitorList(data) {
  return request({
    url: '/MonitorList/MonitorList',
    method: 'post',
    data: data
  })
}

// 修改MonitorList
export function updateMonitorList(data) {
  return request({
    url: '/MonitorList/MonitorList',
    method: 'put',
    data: data
  })
}

// 删除MonitorList
export function delMonitorList(id) {
  return request({
    url: '/MonitorList/MonitorList/' + id,
    method: 'delete'
  })
}
