import React from 'react';
import { connect } from 'react-redux';
import { TabBar, Button, List, WhiteSpace, NavBar } from 'antd-mobile';
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
    }else{
      router.push('/home/editUser');
    }
  };
  render() {
    const { list } = this.props.user;
    return (
      <div>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <List renderHeader={() => <span className={styles.blueColor}>人员列表</span>}>
          {list.map(ele => (
            <Item
              extra={
                <div className={styles.iconflex}>
                  <img src={editSrc} onClick={e => this.edit(ele.id)} />
                  <img src={delSrc} onClick={e => this.del(ele.id)} />
                </div>
              }
              key={ele.id}
            >
              {ele.name} ：{ele.mobile}
            </Item>
          ))}
        </List>
        <Button className={styles.logout} type="primary" onClick={e => this.edit()}>
          添加
        </Button>
      </div>
    );
  }
}
export default connect(({ user }) => ({ user }))(Main);
