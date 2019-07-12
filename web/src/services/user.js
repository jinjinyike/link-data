import request from '@/utils/request';
// export async function query() {
//   return request('/api/users');
// }
// export async function queryCurrent() {
//   return request('/api/currentUser');
// }
// export async function queryNotices() {
//   return request('/api/notices');
// }
export const addInfo = (obj) => request({
  url: '/chats/test',
  method: 'post',
  data: obj
})