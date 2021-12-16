import React, {FC, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './appStack'

const MainNav: FC = () => {

  return (
    <NavigationContainer>
       <AppStack />
    </NavigationContainer>
  );
};

export default MainNav;
