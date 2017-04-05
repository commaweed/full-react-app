import React, { Component } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchWidget from '../../views/SearchWidget';
import QueryResultsWidget from '../../views/QueryResultsWidget';

class MainPage extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      console.log(this.props);
      return (
         <div styleName="wrapper">
            <Header/>
            <div styleName="content">
               <SearchWidget/>
               <QueryResultsWidget/>
            </div>
            <Footer/>
         </div>
      );
   }
}

export { MainPage };