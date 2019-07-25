import { TabBar } from 'antd-mobile';
import React from 'react';
import Today from './selfInfo';
import Self from './self'
import Group from './group'
import homeSrc from '../../assets/home.png'
import styles from './index.less'
const Item=TabBar.Item
const arr = [
  {
    title: '今日数据',
    key: 'today',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
    selectedIcon: 'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg',
    CPM: <Today />,
    hidden: false,
  },
  {
    title: '人员',
    key: 'person',
    icon: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
    CPM: <Group />,
    hidden: false,
  },
  {
    title: '个人中心',
    key: 'self',
    icon: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
    selectedIcon: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
    CPM: <Self />,
    hidden: false,
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
    return (
      <div style={{ position: 'fixed', height: '90%', width: '100%', top: 0 }}>
        <div className={styles.demoHome}>
          <img src={homeSrc} />
          <span> | </span>
          <span>{this.state.selectedTab}</span>
        </div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          {arr.map(ele => {
             return <Item
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
              // hidden={ele.hidden}
              onPress={() => {
                this.setState({
                  selectedTab: ele.title,
                });
              }}
            >
              {ele.CPM}
            </Item>;
          })}
        </TabBar>
      </div>
    );
  }
}
export default Main;
