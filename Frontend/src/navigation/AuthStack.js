// module imports
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screen imports
import Login from '@Screen/Login';
import Register from '@Screen/Register';
import OnBoarding from '@Screen/OnBoarding';
import NewsDetails from '@Screen/NewsDetails';
import CategoryList from '@Screen/CategoryList';
import SplashScreen from '@Screen/SplashScreen';

// component imports
import Tabs from './Tabs';
import { SCREENS } from '@Constant/enums';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={SCREENS.TAB}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={SCREENS.SPLASH} component={SplashScreen} />
            <Stack.Screen name={SCREENS.TAB} component={Tabs} />
            <Stack.Screen name={SCREENS.LOGIN} component={Login} />
            <Stack.Screen name={SCREENS.REGISTER} component={Register} />
            <Stack.Screen name={SCREENS.ONBOARDING} component={OnBoarding} />
            <Stack.Screen name={SCREENS.NEWSDETAILS} component={NewsDetails} />
            <Stack.Screen name={SCREENS.CATEGORYLIST} component={CategoryList} />
        </Stack.Navigator>
    );
};

export default AuthStack;
