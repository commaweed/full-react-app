import React from 'react'
import { Layout } from 'antd';
const { Header, Content } = Layout;

import Logo from '../../components/Logo';
import SearchWidget from '../../views/SearchWidget';
import QueryResultsWidget from '../../views/QueryResultsWidget';

const MainPage = () => (
   <Layout>
      <Header styleName="header"><Logo/></Header>
      <Content styleName="content">
         <br/>
         <SearchWidget/>
         <br/>
         <QueryResultsWidget/>
      </Content>
   </Layout>
);

export { MainPage };