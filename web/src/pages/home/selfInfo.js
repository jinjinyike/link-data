import React from 'react';
import { List, Button, Card, WingBlank, WhiteSpace, Flex } from 'antd-mobile';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './index.less';
import editSrc from '../../assets/edit.png';
import router from 'umi/router'
class Main extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: 'app/getInfo' });
  }
   edit=()=>{
    router.push('/home/editInfo')
  }
  renderItem = info => {
    return (
      <div className={styles.row} key={info.id}>
        <Flex justify="between">
          <span>
            今日带看：<i>{info.day_look || 0}</i>
          </span>
          <span>
            今日约看：<i>{info.day_gonnalook || 0}</i>
          </span>
        </Flex>
        <Flex justify="between">
          <span>
            今日新增：<i>{info.day_add || 0}</i>
          </span>
          <span>
            今日单量：<i>{info.day_order || 0}</i>
          </span>
        </Flex>
        <Flex justify="between">
          <span>
            今日业绩：<i>{info.day_achievement || 0}</i>
          </span>
          <span>
            今日客户咨询量：<i>{info.im_consult || 0}</i>
          </span>
        </Flex>
        <Flex justify="between">
          <span>
            今日未及时回复量：<i>{info.im_noreply || 0}</i>
          </span>
          <span>
            今日加私量：<i>{info.im_private || 0}</i>
          </span>
        </Flex>
        <Flex justify="between">
          <span>
            今日加私带看量：<i>{info.im_privatelook || 0}</i>
          </span>
        </Flex>
        <div className={styles.sub_title || 0}>本月累积</div>
        <Flex justify="between">
          <span>
            累积新增：<i>{info.total_add || 0}</i>
          </span>
          <span>
            累积带看：<i>{info.total_look || 0}</i>
          </span>
        </Flex>
        <Flex justify="between">
          <span>
            累积单量：<i>{info.total_order || 0}</i>
          </span>
          <span>
            累积业绩：<i>{info.total_achievement || 0}</i>
          </span>
        </Flex>
      </div>
    );
  };
  render() {
    const { info, user, infoTotal } = this.props.app;
    const list=user.admin?infoTotal.list:infoTotal.list.filter(ele=>ele.user_id!=user.id)
    console.log(user)
    return (
      <div>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          {user.admin ? (
            <Card className={styles.cardSelf} key={1}>
              <Card.Header
                title='今日累积'
                extra={<span>{moment().format('YYYY-MM-DD')}</span>}
              />
              <Card.Body>
                <div className={styles.row} key={11}>
                  <Flex justify="between">
                    <span>
                      累积新增：<i>{infoTotal.total_days_add}</i>
                    </span>
                    <span>
                      累积带看：<i>{infoTotal.total_days_look}</i>
                    </span>
                  </Flex>
                  <Flex justify="between">
                    <span>
                      累积单量：<i>{infoTotal.total_days_order}</i>
                    </span>
                    <span>
                      累积业绩：<i>{infoTotal.total_days_achievement}</i>
                    </span>
                  </Flex>
                  <Flex justify="between">
                    <span>
                      累积客户咨询量：<i>{infoTotal.total_days_im_consult}</i>
                    </span>
                    <span>
                      累积加私量：<i>{infoTotal.total_days_im_private}</i>
                    </span>
                  </Flex>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card className={styles.cardSelf} key={2}>
              <Card.Header title={user.name} extra={<div ><span>{info.createtime||moment().format('YYYY-MM-DD')}</span></div>} />
              <Card.Body>{this.renderItem(info)}</Card.Body>
              <Card.Footer content="footer content" extra={<div><img src={editSrc} style={{width:'2rem'}} onClick={e=>this.edit(info.id)} /></div>} />
            </Card>
          )}
          <WhiteSpace size="lg" />
          {list.length!==0 &&
            list.map(ele => (
              <div>
                <Card className={styles.cardSelf} key={3}>
                  <Card.Header title={ele.name} extra={<span>{ele.createtime}</span>} />
                  <Card.Body>{this.renderItem(ele)}</Card.Body>
                </Card>
                <WhiteSpace size="lg" />
              </div>
            ))}
          <WhiteSpace size="lg" />
        </WingBlank>
      </div>
    );
  }
}
export default connect(({ app }) => ({ app }))(Main);
