import React from 'react';
import { List, InputItem, Button, NavBar, Icon ,WhiteSpace} from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import router from 'umi/router';
const styles = require('./index.less');
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
const arr = [
  { key: 'day_look', placeholder: '今日带看', label: '今日带看' },
  { key: 'day_gonnalook', placeholder: '今日约看', label: '今日约看' },
  { key: 'day_add', placeholder: '今日新增', label: '今日新增' },
  { key: 'day_order', placeholder: '今日单量', label: '今日单量' },
  { key: 'day_achievement', placeholder: '今日业绩', label: '今日业绩' },
  { key: 'im_consult', placeholder: 'im客户咨询量', label: 'im客户咨询量' },
  { key: 'im_noreply', placeholder: 'im未及时回复量', label: 'im未及时回复量' },
  { key: 'im_private', placeholder: 'im加私量', label: 'im加私量' },
  { key: 'im_privatelook', placeholder: 'im加私约看量', label: 'im加私约看量' },
];
class H5NumberInputExample extends React.Component {
  state = {
    type: 'money',
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        let obj = { ...values, user_id: this.props.app.user.id };
        if (this.props.app.info.id) {
          obj.id = this.props.app.info.id;
        }
        this.props.dispatch({
          type: 'app/fetchAdd',
          payload: obj,
        });
      }
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    const { info } = this.props.app;
    return (
      <div>
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => router.push('/home')}>
          今日数据
        </NavBar>
        <List className={styles.list}>
          {arr.map(ele => (
            <InputItem
              key={ele.key}
              {...getFieldProps(ele.key, {
                normalize: (v, prev) => {
                  if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                    if (v === '.') {
                      return '0.';
                    }
                    return prev;
                  }
                  return v;
                },
                initialValue: info[ele.key],
              })}
              type={type}
              placeholder={ele.placeholder}
              ref={el => (this.inputRef = el)}
              onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
              clear
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            >
              {ele.label}
            </InputItem>
          ))}
        </List>
        <div className={styles.subBtn}>
          <Button type="primary" onClick={this.handleSubmit}>
            {info.id ? '修改' : '添加'}
          </Button>
        </div>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}
const Index = createForm()(H5NumberInputExample);
export default connect(({ app }) => ({ app }))(Index);
