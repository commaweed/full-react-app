import React from 'react';
import Logo from '../Logo';
import Banner from '../Banner';

const Header = () => {
   return (
      <div styleName="wrapper">
         <Banner/>
         <div styleName="header">
            <Logo />
         </div>
      </div>
   );
};

export { Header };