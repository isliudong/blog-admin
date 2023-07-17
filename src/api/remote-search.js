import request from '@/utils/request'
import Mock from 'mockjs'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  /* return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  }) */
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 20000,
        data: {
          total: 8,
          items: [{
            orderNo: Mock.Random.guid(),
            timestamp: +Mock.Random.date('T'),
            username: Mock.Random.name(),
            price: Mock.Random.float(1000, 15000, 0, 2),
            status: 'success'
          },
          {
            orderNo: Mock.Random.guid(),
            timestamp: +Mock.Random.date('T'),
            username: Mock.Random.name(),
            price: Mock.Random.float(1000, 15000, 0, 2),
            status: 'pending'
          },
          {
            orderNo: Mock.Random.guid(),
            timestamp: +Mock.Random.date('T'),
            username: Mock.Random.name(),
            price: Mock.Random.float(1000, 15000, 0, 2),
            status: 'success'
          },
          {
            orderNo: Mock.Random.guid(),
            timestamp: +Mock.Random.date('T'),
            username: Mock.Random.name(),
            price: Mock.Random.float(1000, 15000, 0, 2),
            status: 'success'
          },
          {
            orderNo: Mock.Random.guid(),
            timestamp: +Mock.Random.date('T'),
            username: Mock.Random.name(),
            price: Mock.Random.float(1000, 15000, 0, 2),
            status: 'pending'
          },
          {
            orderNo: Mock.Random.guid(),
            timestamp: +Mock.Random.date('T'),
            username: Mock.Random.name(),
            price: Mock.Random.float(1000, 15000, 0, 2),
            status: 'success'
          },
          {
            orderNo: Mock.Random.guid(),
            timestamp: +Mock.Random.date('T'),
            username: Mock.Random.name(),
            price: Mock.Random.float(1000, 15000, 0, 2),
            status: 'success'
          },
          {
            orderNo: Mock.Random.guid(),
            timestamp: +Mock.Random.date('T'),
            username: Mock.Random.name(),
            price: Mock.Random.float(1000, 15000, 0, 2),
            status: 'pending'
          }
          ]
        }
      })
    }, 100)
  })
}
