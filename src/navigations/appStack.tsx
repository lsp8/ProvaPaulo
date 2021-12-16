import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {FC} from 'react';
import HomeScreen from '../screens/Home';

const {Navigator, Screen} = createNativeStackNavigator();

const AppStack: FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="homeScreen" component={HomeScreen} />
    </Navigator>
  );
};

export default AppStack;
