import React from 'react';
import { Button, List, WhiteSpace, InputItem, Toast, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import styles from './index.less';
import editSrc from '../../assets/edit.png';
import saveSrc from '../../assets/save.png';
import { getOneTarget } from '../../services/user';
const Item = List.Item;
class Main extends React.Component {
  state = {
    target: 0,
    edit: true,
    id: undefined,
  };
  componentWillMount() {
    getOneTarget({ user_id: this.props.app.user.id }).then(res => {
      this.setState({ ...res.data });
    });
  }
  onChange = value => {
    this.setState({ target: value });
  };
  edit = () => {
    this.setState({ edit: false });
  };
  saveTarget = () => {
    const { target, id } = this.state;
    if (!target) {
      return Toast.info('未填写目标');
    }
    let obj = { target };
    if (id) {
      obj.id = id;
    }
    obj.user_id = this.props.app.user.id;
    this.props.dispatch({ type: 'user/editTarget', payload: obj }).then(res => {
      this.setState({ edit: true });
    });
  };
  logOut() {
    localStorage.removeItem('app');
    window.location.href = '/';
  }
  render() {
    const { user } = this.props.app;
    const { edit } = this.state;
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <List renderHeader={() => <span className={styles.blueColor}>个人信息</span>}>
          <Item extra={user.name}>姓名</Item>
          <Item extra={user.mobile}>手机号码</Item>
          <Item extra={user.admin ? '管理员' : '用户'}>角色</Item>
          
        </List>
        <WhiteSpace size="lg" />
        <List >
        {!user.admin && (
            <Item
              extra={
                <div className={styles.flex}>
                  <InputItem
                    type="text"
                    placeholder="本月目标/万"
                    maxLength={10}
                    onChange={e => this.onChange(e, 'target')}
                    value={this.state.target}
                    disabled={edit}
                  />
                  {edit && <img src={editSrc} onClick={this.edit} alt='编辑'/>}
                  {!edit && <img src={saveSrc} onClick={this.saveTarget} alt='完成' />}
                </div>
              }
            >
              本月目标/万
            </Item>
          )}
        </List>
        <Button className={styles.logout} type="warning" onClick={this.logOut}>
          退出
        </Button>
      </WingBlank>
    );
  }
}
export default connect(({ app, user }) => ({ app, user }))(Main);
