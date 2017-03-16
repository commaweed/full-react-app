import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import ToolBar from './components/ToolBar';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class SearchForm extends Component {

   constructor(props) {
      super(props);
      this.state = {
         expanded: false
      };
   }

   handleExpandChange = (expanded) => {
      this.setState({expanded: expanded});
   };

   render() {

      const styles = {
         cardContainerStyles: {
            padding: 0
         },
         cardStyles: {
            //marginLeft: "20px",
            //marginRight: "20px"
         },
         toolBarStyles: {
            //padding: "0px"
         },
         advancedStyles: {
            //height: 100,
            //width: 100,
            marginLeft: "20px",
            marginRight: "20px"
            //textAlign: 'center',
            //display: 'inline-block',
         }
      };

      return (
         <Paper style={styles.advancedStyles} zDepth={2} rounded={false}>
         <Card
            expanded={this.state.expanded}
            onExpandChange={this.handleExpandChange}
            containerStyle={styles.cardContainerStyles}
            style={styles.cardStyles}
         >
            <ToolBar onExpandChange={this.handleExpandChange.bind(this)} />
            <CardText expandable={true}>
               <div styleName="content-wrapper">
                  <Content style={{ padding: '0 50px' }}>
                     <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                     </Breadcrumb>
                     <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                           <Menu
                              mode="inline"
                              defaultSelectedKeys={['1']}
                              defaultOpenKeys={['sub1']}
                              style={{ height: '100%' }}
                           >
                              <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                                 <Menu.Item key="1">option1</Menu.Item>
                                 <Menu.Item key="2">option2</Menu.Item>
                                 <Menu.Item key="3">option3</Menu.Item>
                                 <Menu.Item key="4">option4</Menu.Item>
                              </SubMenu>
                              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                 <Menu.Item key="5">option5</Menu.Item>
                                 <Menu.Item key="6">option6</Menu.Item>
                                 <Menu.Item key="7">option7</Menu.Item>
                                 <Menu.Item key="8">option8</Menu.Item>
                              </SubMenu>
                              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                 <Menu.Item key="9">option9</Menu.Item>
                                 <Menu.Item key="10">option10</Menu.Item>
                                 <Menu.Item key="11">option11</Menu.Item>
                                 <Menu.Item key="12">option12</Menu.Item>
                              </SubMenu>
                           </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                           Content
                        </Content>
                     </Layout>
                  </Content>
               </div>

            </CardText>
         </Card>
         </Paper>
      );
   }
}

export { SearchForm };
