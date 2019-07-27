import React from 'react';
import { connect } from 'react-redux';
import {  Button, List, WhiteSpace, WingBlank } from 'antd-mobile';
import styles from './index.less';
import delSrc from '../../assets/del.png';
import editSrc from '../../assets/edit.png';
import router from 'umi/router';
const Item = List.Item;
class Main extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: 'user/getList' });
  }
  del = id => {
    this.props.dispatch({ type: 'user/del', payload: { id } });
  };
  edit = id => {
    if (id) {
      router.push(`/home/editUser?id=${id}`);
    } else {
      router.push('/home/editUser');
    }
  };
  render() {
    let { list } = this.props.user;
    list = list.filter(ele => ele.mobile !== '18222958232');
    list =[]
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        {list.length!==0?<List renderHeader={() => <span className={styles.blueColor}>人员列表</span>}>
          {list.map(ele => (
            <Item
              extra={
                <div className={styles.iconflex}>
                  <img src={editSrc} onClick={e => this.edit(ele.id)} alt="编辑" />
                  <img src={delSrc} onClick={e => this.del(ele.id)} alt="注销" />
                </div>
              }
              key={ele.id}
            >
              {ele.name} ：{ele.mobile}
            </Item>
          ))}
        </List>:<List><Item>暂无人员信息</Item></List>}
        <Button className={styles.logout} type="primary" onClick={e => this.edit()}>
          添加
        </Button>
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
      </WingBlank>
    );
  }
}
export default connect(({ user }) => ({ user }))(Main);
