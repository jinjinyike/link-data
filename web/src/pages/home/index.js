import { TabBar } from 'antd-mobile';
import React from 'react';
import Today from './selfInfo';
import Self from './self';
import Group from './group';
import { connect } from 'react-redux';
import homeSrc from '../../assets/home.png';
import styles from './index.less';
const Item = TabBar.Item;
const arr = [
  {
    title: '今日数据',
    key: 'today',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
    selectedIcon: 'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg',
    CPM: <Today />,
  },
  {
    title: '人员',
    key: 'person',
    icon: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
    CPM: <Group />,
  },
  {
    title: '个人中心',
    key: 'self',
    icon: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
    CPM: <Self />,
  },
];
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '今日数据',
      hidden: false,
    };
  }

  render() {
    const { user } = this.props.app;
    let list=user.admin?arr:arr.filter(ele=>ele.key!=='person')
    return (
      <div  className={styles.contant} >
        <div className={styles.demoHome}>
          <img src={homeSrc} alt='首页'/>
          <span> | </span>
          <span>{this.state.selectedTab}</span>
        </div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          {list.map(ele => {
            return (
              <Item
                icon={
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${ele.icon}) center center /  21px 21px no-repeat`,
                    }}
                  />
                }
                selectedIcon={
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${ele.selectedIcon}) center center /  21px 21px no-repeat`,
                    }}
                  />
                }
                title={ele.title}
                key={ele.key}
                selected={this.state.selectedTab === ele.title}
                onPress={() => {
                  this.setState({
                    selectedTab: ele.title,
                  });
                }}
              >
                {ele.CPM}
              </Item>
            );
          })}
        </TabBar>
      </div>
    );
  }
}
export default connect(({ app }) => ({ app }))(Main);
