import React from 'react';
import { List, InputItem, Button, Toast, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
const styles = require('./index.less');

class H5NumberInputExample extends React.Component {
  state = {
    hasError: false,
    value: '',
  };
  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('请输入11位手机号码');
    }
  };
  onChange = value => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      value,
    });
  };
  handleSubmit = () => {
    const { hasError, value } = this.state;
    if (hasError) {
      return Toast.info('请输入正确的手机号码');
    }
    this.props.dispatch({ type: 'app/login', payload: { mobile: value.replace(/\s+/g, '') } });
  };
  render() {
    return (
      <div className={styles.normal}>
        <WingBlank size="lg">
          <div style={{ height: '13rem' }} />
          <List className={styles.list}>
            <InputItem
              type="phone"
              placeholder="请输入手机号码"
              error={this.state.hasError}
              onErrorClick={this.onErrorClick}
              onChange={this.onChange}
              value={this.state.value}
            >
              手机号码
            </InputItem>
          </List>
          <div className={styles.subBtn}>
            <Button onClick={this.handleSubmit}>登陆</Button>
          </div>
        </WingBlank>
      </div>
    );
  }
}
const Index = createForm()(H5NumberInputExample);
export default connect(({ app }) => ({ app }))(Index);
