import { addInfo } from '@/services/user';
import { Toast } from 'antd-mobile';
export default {
  namespace: 'app',
  state: {
    collapsed: false,
    notices: [],
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        // if (typeof window.ga !== 'undefined') {
        //   window.ga('send', 'pageview', pathname + search);
        // }
      });
    },
  },
  effects: {
    *fetchAdd({ payload }, { call, put, select }) {
      console.log(payload);
      const data = yield call(addInfo, payload);
      if (data.code === 0) {
        Toast.success('添加成功', 1);
      }
    },

    // *clearNotices({ payload }, { put, select }) {
    //   yield put({
    //     type: 'saveClearedNotices',
    //     payload,
    //   });
    //   const count = yield select(state => state.global.notices.length);
    //   const unreadCount = yield select(
    //     state => state.global.notices.filter(item => !item.read).length,
    //   );
    //   yield put({
    //     type: 'user/changeNotifyCount',
    //     payload: {
    //       totalCount: count,
    //       unreadCount,
    //     },
    //   });
    // },

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
