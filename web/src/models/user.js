import {getList,del,editUser,getUser} from '../services/user'
import { Toast } from 'antd-mobile';
import router from 'umi/router'
export default {
  namespace: 'user',
  state: {
    list: [],
    info:{}
  },
  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname }) => {
        // if(pathname=='/home/editUser'){
        //   let id=history.location.query.id;
        //   if(id){
        //     dispatch({type:'getUser',payload:{id}})
        //   }else{
        //     dispatch({type:'save',payload:{info:{}}})
        //   }
        // }
      });
    },
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const res=yield call(getList)
      if(res.code===0){
        yield put({type:'save',payload:{list:res.data}})
      }
    },
    *del({payload},{call,put}){
      const res=yield call(del,payload.id);
      if(res.code===0){
        Toast.success('注销成功')
        yield put({type:'getList'})
      }
    },
    *editUser({payload},{call,put}){
      const res=yield call(editUser,payload);
      if(res.code===0){
        Toast.success(payload.id?'修改成功':'添加成功')
        router.push('/home')
      }
    },
    *getUser({ payload }, { call, put }) {
      const res=yield call(getUser,payload.id)
      if(res.code===0){
        return new Promise((resolve,reject)=>{
          resolve(res.data)
        })
      }
    },
    
  },
  reducers:{
    save(state,{payload}){
      return {
        ...state,
        ...payload
      }
    }
  }
};
