import React from 'react';
import { TabBar, Button, List,WhiteSpace,NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import styles from './index.less'
import router from 'umi/router';

const Item = List.Item;
class Main extends React.Component {
  logOut(){
    localStorage.removeItem('app')
    router.push('/')
    // window.location.href='/'
  }
  render() {
    const { user } = this.props.app;
    return (
      <div>
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <WhiteSpace size='lg' />
        <List renderHeader={() => <span className={styles.blueColor}>个人信息</span>} >
          <Item extra={user.name}>姓名</Item>
          <Item extra={user.mobile}>手机号码</Item>
          <Item extra={user.admin?'管理员':'用户'}>角色</Item>
        </List>
        <Button className={styles.logout} type='warning' onClick={this.logOut}>退出</Button>
      </div>
    );
  }
}
export default connect(({ app }) => ({ app }))(Main);
