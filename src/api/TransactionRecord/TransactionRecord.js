import request from '@/utils/request'

// 查询TransactionRecord列表
export function listTransactionRecord(query) {
  return request({
    url: '/TransactionRecord/TransactionRecord/list',
    method: 'get',
    params: query
  })
}

// 查询TransactionRecord详细
export function getTransactionRecord(id) {
  return request({
    url: '/TransactionRecord/TransactionRecord/' + id,
    method: 'get'
  })
}

// 新增TransactionRecord
export function addTransactionRecord(data) {
  return request({
    url: '/TransactionRecord/TransactionRecord',
    method: 'post',
    data: data
  })
}

// 修改TransactionRecord
export function updateTransactionRecord(data) {
  return request({
    url: '/TransactionRecord/TransactionRecord',
    method: 'put',
    data: data
  })
}

// 删除TransactionRecord
export function delTransactionRecord(id) {
  return request({
    url: '/TransactionRecord/TransactionRecord/' + id,
    method: 'delete'
  })
}
