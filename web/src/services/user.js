import request from '@/utils/request';
export const addInfo = (obj) => request({
  url: '/day/modify',
  method: 'post',
  data: obj
})
export const getInfo = (id) => request({
  url: `/day/getDays/${id}`,
  method: 'get'
})
export const getTotalDay = () => request({
  url: `/day/totalDay`,
  method: 'get'
})
export const getTotalList = () => request({
  url: `/day/list`,
  method: 'get'
})
export const login = (obj) => request({
  url: '/login',
  method: 'post',
  data: obj
})
export const getList = () => request({
  url: `/user/getUserList`,
  method: 'get'
})
export const getUser = (id) => request({
  url: `/user/getUser/${id}`,
  method: 'get'
})
export const del = (id) => request({
  url: `/user/del/${id}`,
  method: 'post'
})
export const editUser = (obj) => request({
  url: `/user/addUser`,
  method: 'post',
  data:obj
})
export const editTarget = (obj) => request({
  url: `/target/modify`,
  method: 'post',
  data:obj
})
export const getOneTarget = (obj) => request({
  url: `/target/one`,
  method: 'post',
  data:obj
})


