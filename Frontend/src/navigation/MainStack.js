// module imports
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screen imports
import SplashScreen from '@Screen/SplashScreen';
import NewsDetails from '@Screen/NewsDetails';
import CategoryList from '@Screen/CategoryList';
import About from '@Screen/About';

// component imports
import Tabs from './Tabs';
import { SCREENS } from '@Constant/enums';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={SCREENS.SPLASH}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
            <Stack.Screen name={SCREENS.TAB} component={Tabs} />
            <Stack.Screen name={SCREENS.NEWSDETAILS} component={NewsDetails} />
            <Stack.Screen name={SCREENS.CATEGORYLIST} component={CategoryList} />
            <Stack.Screen name={SCREENS.ABOUT} component={About} />
        </Stack.Navigator>
    );
};

export default MainStack;
