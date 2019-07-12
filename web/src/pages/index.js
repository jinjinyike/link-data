import React from 'react';
import { List, InputItem, Button, NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
const styles = require('./index.css');
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class H5NumberInputExample extends React.Component {
  state = {
    type: 'money',
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.dispatch({ type: 'app/fetchAdd', payload: values });
      }
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div>
        <NavBar mode="light">今日数据</NavBar>
        <List className={styles.list}>
          <InputItem
            {...getFieldProps('money1', {
              normalize: (v, prev) => {
                if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                  if (v === '.') {
                    return '0.';
                  }
                  return prev;
                }
                return v;
              },
            })}
            type={type}
            placeholder="请输入金额"
            ref={el => (this.inputRef = el)}
            onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
            clear
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >
            数字键盘1
          </InputItem>
          <InputItem
            {...getFieldProps('money2', {
              normalize: (v, prev) => {
                if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                  if (v === '.') {
                    return '0.';
                  }
                  return prev;
                }
                return v;
              },
            })}
            type={type}
            placeholder="请输入金额"
            ref={el => (this.inputRef = el)}
            onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
            clear
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >
            数字键盘2
          </InputItem>
        </List>
        <div className={styles.subBtn}>
          <Button type="primary" onClick={this.handleSubmit}>
            提交
          </Button>
        </div>
      </div>
    );
  }
}
// export default createForm()(H5NumberInputExample);
const Index = createForm()(H5NumberInputExample);
export default connect(({ app }) => ({ app }))(Index);
