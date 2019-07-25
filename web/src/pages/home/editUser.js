import React from 'react';
import { List, InputItem, Button, NavBar, Icon, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import router from 'umi/router'
const styles = require('./index.less');

class H5NumberInputExample extends React.Component {
  state = {
    id: undefined,
    mobile: '',
    name: '',
  };
  componentWillMount() {
    let id = this.props.location.query.id;
    if (id) {
      this.props.dispatch({ type: 'user/getUser', payload: { id } }).then(res => {
        this.setState({ ...res });
      });
    }
  }
  onChange = (value, type) => {
    this.setState({
      [type]: value,
    });
  };
  handleSubmit = () => {
    const { mobile, name } = this.state;
    if (!name || !mobile) {
      return Toast.info('请填写完整信息');
    }
    if (!/^1[3456789]\d{9}$/.test(mobile.replace(/\s+/g, ''))) {
      return Toast.info('请输入正确的手机号码');
    }
    let obj = { mobile: mobile.replace(/\s+/g, ''), name };
    if (this.props.location.query.id) {
      obj.id = this.props.location.query.id;
    }
    this.props.dispatch({ type: 'user/editUser', payload: obj });
  };
  render() {
    const { info } = this.props.user;
    const { id } = this.state;
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => router.push('/home')}
        >
          人员信息
        </NavBar>
        <List className={styles.list}>
          <InputItem
            type="text"
            placeholder="请输入姓名"
            maxLength={6}
            onChange={e => this.onChange(e, 'name')}
            value={this.state.name}
          >
            姓名
          </InputItem>
          <InputItem
            type="text"
            placeholder="请输入手机号码"
            onChange={e => this.onChange(e, 'mobile')}
            value={this.state.mobile}
          >
            手机号码
          </InputItem>
        </List>
        <div className={styles.subBtn}>
          <Button type="primary" onClick={this.handleSubmit}>
            {id ? '修改' : '添加'}
          </Button>
        </div>
      </div>
    );
  }
}
// export default createForm()(H5NumberInputExample);
const Index = createForm()(H5NumberInputExample);
export default connect(({ user }) => ({ user }))(Index);
