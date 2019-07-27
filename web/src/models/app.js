import { addInfo ,login,getInfo,getTotalDay,getTotalList} from '@/services/user';
import { Toast } from 'antd-mobile';
import router from 'umi/router';
export default {
  namespace: 'app',
  state: {
    user:JSON.parse(localStorage.getItem('user'))||{},
    info:{},
    infoTotal:{list:[]},
    list:[]
  },
  subscriptions: {
    setup({ history ,dispatch}) {
      history.listen(({ pathname, search }) => {
        if(pathname==='/home'){
          dispatch({type:'save',payload:{user:JSON.parse(localStorage.getItem('user'))||{}}})
        }
      });
    },
  },
  effects: {
    *fetchAdd({ payload }, { call, put, select }) {
      const data = yield call(addInfo, payload);
      if (data.code === 0) {
        Toast.success(payload.id?'修改成功':'添加成功');
        router.push('/home');
      }
    },
    *login({payload},{call,put}){
      const data=yield call(login,payload);
      if(data.code==0){
        localStorage.setItem('user',JSON.stringify(data.data))
        yield put({type:'save',payload:{user:data.data}})
        router.push('/home');
      }
    },
    *getInfo({payload},{call,put,select}){
      const user = yield select(state => state.app.user);
      if(user.admin){
        const res=yield call(getTotalDay);
        if(res.code===0){
          yield put({type:'save',payload:{infoTotal:res.data}})
        }
      }else{
        const data=yield call(getInfo,user.id);
        if(data.code===0){
          yield put({type:'save',payload:{info:data.data}})
        }
      }
      const rs=yield call(getTotalList);
      if(rs.code===0){
        yield put({type:'save',payload:{list:rs.data}})
      }
    }
    // *changeNoticeReadState({ payload }, { put, select }) {
    //   const notices = yield select(state =>
    //     state.global.notices.map(item => {
    //       const notice = { ...item };

    //       if (notice.id === payload) {
    //         notice.read = true;
    //       }

    //       return notice;
    //     }),
    //   );
    //   yield put({
    //     type: 'saveNotices',
    //     payload: notices,
    //   });
    //   yield put({
    //     type: 'user/changeNotifyCount',
    //     payload: {
    //       totalCount: notices.length,
    //       unreadCount: notices.filter(item => !item.read).length,
    //     },
    //   });
    // },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
